/**
 * mentorApi.js
 *
 * Mock data service for the ISMP Mentor Portal.
 * Provides the same shape as the real API so swapping is trivial.
 *
 * Usage:
 *   import { getMentorProfile, getQuestions, getCategories, getAnnouncements } from '@/mentor/services/mentorApi'
 */

import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const API_BASE = import.meta.env.VITE_API_BASE

// ─── Mock Data ──────────────────────────────────────────────

const MOCK_MENTOR = {
  name: 'Varada Gajare',
  rollNo: '24B3632',
  profileImage: null, // null → use default avatar
}

const MOCK_CATEGORIES = [
  { id: 1, name: 'Admission', count: 23 },
  { id: 2, name: 'Hostel', count: 23 },
  { id: 3, name: 'Placements', count: 23 },
  { id: 4, name: 'Scholarships', count: 23 },
  { id: 5, name: 'Sports', count: 23 },
]

const MOCK_QUESTIONS = [
  {
    id: 1,
    author: 'Rahul Sharma',
    authorAvatar: null,
    date: '12 May 26 07:45 pm',
    title: 'What are the best electives for first-year CS students?',
    category: 'Campus Life',
    upvotes: 25,
    comments: 2,
    isAnswered: false,
    answer: null,
  },
  {
    id: 2,
    author: 'Rahul Sharma',
    authorAvatar: null,
    date: '12 May 26 07:45 pm',
    title: 'What are the best electives for first-year CS students?',
    category: 'Campus Life',
    upvotes: 25,
    comments: 2,
    isAnswered: true,
    answer: {
      text: 'The answer will be here. The answer will be here. The answer will be here. The answer will be here. The answer will be here.',
      answeredBy: 'ISMP Priya',
    },
  },
  {
    id: 3,
    author: 'Rahul Sharma',
    authorAvatar: null,
    date: '12 May 26 07:45 pm',
    title: 'What are the best electives for first-year CS students?',
    category: 'Campus Life',
    upvotes: 25,
    comments: 2,
    isAnswered: false,
    answer: null,
  },
  {
    id: 4,
    author: 'Rahul Sharma',
    authorAvatar: null,
    date: '12 May 26 07:45 pm',
    title: 'What are the best electives for first-year CS students?',
    category: 'Campus Life',
    upvotes: 25,
    comments: 2,
    isAnswered: true,
    answer: {
      text: 'The answer will be here. The answer will be here. The answer will be here. The answer will be here. The answer will be here.',
      answeredBy: 'ISMP Priya',
    },
  },
]

const MOCK_PENDING_COUNT = 134

// ─── Helpers ────────────────────────────────────────────────

/** Simulate network delay */
function delay(ms = 300) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const USE_MOCK = import.meta.env.VITE_NODE_ENV === 'DEV'
const authHeaders = () => ({ Authorization: `Bearer ${useAuthStore().accessToken}` })
async function requestWithRefresh(request) {
  try {
    return await request()
  } catch (err) {
    if (err.response?.status !== 403 || err.response?.data?.message !== 'Access token expired') throw err
    await useAuthStore().Refresh()
    return request()
  }
}
const fmtDate = (d) => new Date(d).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: '2-digit', hour: '2-digit', minute: '2-digit' })
const mapQ = (q) => ({ id: q._id, _raw: q, author: q.user_Name || q.user_ID || 'Student', date: fmtDate(q.asked_At), title: q.body, category: 'Campus Life', upvotes: q.upvotes || 0, comments: q.comments?.length || 0, isAnswered: !!q.status, answer: q.answers?.[0] ? { id: q.answers[0]._id, text: q.answers[0].body, answeredBy: q.answers[0].user_Name || q.answers[0].user_ID || 'ISMP Mentor' } : null })

// ─── Service Functions ──────────────────────────────────────

/**
 * Get mentor profile for the currently logged-in user.
 * @returns {Promise<{ name: string, rollNo: string, profileImage: string|null }>}
 */
export async function getMentorProfile() {
  if (USE_MOCK) {
    await delay(200)
    return { ...MOCK_MENTOR }
  }
  const res = await axios.get(`${API_BASE}/mentor/profile`)
  return res.data
}

/**
 * Get categories with question counts.
 * @returns {Promise<Array<{ id: number, name: string, count: number }>>}
 */
export async function getCategories() {
  if (USE_MOCK) {
    await delay(150)
  }
  return [...MOCK_CATEGORIES]
}

/**
 * Get questions, optionally filtered by category and sorted.
 * @param {{ category?: string, sort?: string }} params
 * @returns {Promise<Array>}
 */
export async function getQuestions(params = {}) {
  const res = await requestWithRefresh(() => axios.get(`${API_BASE}/question`, { params, headers: authHeaders() }))
  return res.data.map(mapQ)
}

const mapAnnouncement = (item) => ({ id: item._id, date: fmtDate(item.asked_At), title: 'Announcement title', body: item.body, attachments: item.images || [], isEditing: false })

export async function getAnnouncements() {
  const res = await requestWithRefresh(() => axios.get(`${API_BASE}/info/get`, { headers: authHeaders() }))
  return res.data.map(mapAnnouncement)
}

/**
 * Get pending question count for the sidebar.
 * @returns {Promise<number>}
 */
export async function getPendingCount() {
  const res = await requestWithRefresh(() => axios.get(`${API_BASE}/question/unansweredQ`, { headers: authHeaders() }))
  return res.data.length
}

/**
 * Submit an answer to a question.
 * @param {number} questionId
 * @param {{ text: string, attachment?: File }} payload
 * @returns {Promise<object>}
 */
export async function submitAnswer(questionId, payload) {
  const body = new FormData()
  body.append('answers[user_ID]', useAuthStore().user_ID)
  body.append('answers[body]', payload.text)
  ;(payload.attachments || []).forEach((file) => body.append('images', file))
  const res = await requestWithRefresh(() => axios.patch(`${API_BASE}/question/answerQ/${questionId}`, body, { headers: authHeaders() }))
  return res.data
}

export async function createAnnouncement(payload) {
  const body = new FormData()
  body.append('body', payload.body)
  ;(payload.attachments || []).forEach((file) => body.append('images', file))
  const res = await requestWithRefresh(() => axios.post(`${API_BASE}/info/post`, body, { headers: authHeaders() }))
  return res.data
}

export async function hideAnnouncement(id) {
  if (USE_MOCK) {
    await delay(200)
    return { success: true }
  }
  const res = await requestWithRefresh(() => axios.put(`${API_BASE}/info/hide/${id}`, {}, { headers: authHeaders() }))
  return res.data
}
