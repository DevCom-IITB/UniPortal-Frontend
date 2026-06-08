<template>
  <div class="mentor-questions-view">
    <section class="questions-header" aria-label="Questions header">
      <div class="questions-tabs" role="tablist" aria-label="Mentor content tabs">
        <button
          v-for="tab in tabs"
          :key="tab"
          class="questions-tabs__button"
          :class="{ 'questions-tabs__button--active': activeTab === tab }"
          type="button"
          role="tab"
          :aria-selected="activeTab === tab"
          @click="activeTab = tab"
        >
          {{ tab }}
        </button>
      </div>

      <button class="create-button" type="button" @click="showCreateModal = true">
        <QuestionIcon class="create-button__icon" />
        Create Announcement
      </button>
    </section>

    <section class="questions-toolbar" aria-label="Question filters">
      <div v-if="activeTab === 'Questions'" class="category-list" aria-label="Categories">
        <button
          v-for="category in categories"
          :key="category.id"
          class="category-chip"
          :class="{ 'category-chip--active': selectedCategory === category.name }"
          type="button"
          @click="toggleCategory(category.name)"
        >
          <span>{{ category.name }}</span>
          <span class="category-chip__count">{{ category.count }}</span>
        </button>
      </div>

      <label class="search-box" for="mentor-question-search">
        <span class="search-box__icon">Search</span>
        <input
          id="mentor-question-search"
          v-model.trim="searchQuery"
          type="search"
          placeholder="Search"
        />
      </label>

      <div class="sort-pills" aria-label="Sort questions">
        <button class="sort-pill sort-pill--menu" type="button">
          Sort by
          <MenuIcon class="sort-pill__icon" />
        </button>
        <button
          v-for="option in sortOptions"
          :key="option.value"
          class="sort-pill"
          :class="{ 'sort-pill--active': selectedSort === option.value }"
          type="button"
          @click="selectedSort = option.value"
        >
          {{ option.label }}
        </button>
      </div>
    </section>

    <section v-if="activeTab === 'Questions'" class="questions-list" aria-label="Questions">
      <article v-if="isLoading" class="empty-state">Loading questions...</article>
      <article v-else-if="loadError" class="empty-state">{{ loadError }}</article>

      <template v-else>
        <article
          v-for="question in filteredQuestions"
          :key="question.id"
          class="question-card"
          :class="{ 'question-card--answered': question.isAnswered }"
        >
          <div class="question-card__top">
            <span class="question-card__status-dot" aria-hidden="true"></span>
            <span class="question-card__author">{{ question.author }}</span>
            <span class="question-card__separator">&middot;</span>
            <time class="question-card__date">{{ question.date }}</time>
          </div>

          <div class="question-card__body">
            <h2 class="question-card__title">{{ question.title }}</h2>
            <div class="question-card__footer">
              <span class="question-card__category">{{ question.category }}</span>
              <div class="question-card__actions">
                <button class="metric-button" type="button" aria-label="Like question">
                  <LikeIcon class="metric-button__icon" />
                  <span>{{ question.upvotes }}</span>
                </button>
                <button class="metric-button" type="button" aria-label="View comments">
                  <CommentIcon class="metric-button__icon" />
                  <span>({{ question.comments }})</span>
                </button>
                <button
                  class="answer-button"
                  :class="{ 'answer-button--answered': question.isAnswered }"
                  type="button"
                  @click="openAnswer(question)"
                >
                  {{ question.isAnswered ? 'Answered' : 'Answer' }}
                </button>
              </div>
            </div>
          </div>

          <div v-if="answerDrafts[question.id]?.open" class="answer-composer">
            <textarea v-model="answerDrafts[question.id].text" placeholder="Answer a question"></textarea>
            <div class="answer-composer__actions">
              <input class="sr-only" type="file" multiple @change="setAnswerFiles(question, $event)" />
              <button class="answer-composer__attach" type="button" @click="$event.currentTarget.previousElementSibling.click()">
                <EditIcon />
                {{ answerDrafts[question.id].attachments?.length ? `${answerDrafts[question.id].attachments.length} file(s)` : 'Add attachment' }}
              </button>
              <button class="send-button" type="button" @click="sendAnswer(question)">
                Send
                <SendIcon class="send-button__icon" />
              </button>
              <button class="cancel-button" type="button" @click="answerDrafts[question.id].open = false">Cancel</button>
            </div>
          </div>

          <div v-if="question.answer" class="answer-preview">
            <div class="answer-preview__box">
              <div class="card-icon-actions card-icon-actions--overlay">
                <button class="card-icon-actions__btn" type="button" aria-label="Edit answer" @click="openAnswer(question)">
                  <EditIcon />
                </button>
                <button class="card-icon-actions__btn" type="button" aria-label="Delete answer" @click="confirmDeleteAnswer(question)">
                  <DeleteIcon />
                </button>
              </div>
              <p>{{ question.answer.text }}</p>
            </div>
            <span class="answer-preview__meta">
              Answered by <strong>{{ question.answer.answeredBy }}</strong>
            </span>
          </div>
        </article>

        <article v-if="filteredQuestions.length === 0" class="empty-state">
          No questions match the current filters.
        </article>
      </template>
    </section>

    <section v-else class="questions-list" aria-label="Announcements">
      <article v-for="announcement in announcements" :key="announcement.id" class="question-card announcement-card">
        <div class="question-card__top">
          <span class="question-card__author">SMP Mentor</span>
          <span class="question-card__separator">&middot;</span>
          <time class="question-card__date">{{ announcement.date }}</time>
        </div>
        <div class="announcement-card__head">
          <h2 class="question-card__title announcement-card__title">{{ announcement.title }}</h2>
          <div class="card-icon-actions">
            <button class="card-icon-actions__btn" type="button" aria-label="Edit announcement" @click="startEditAnnouncement(announcement)">
              <EditIcon />
            </button>
            <button
              class="card-icon-actions__btn"
              type="button"
              aria-label="Delete announcement"
              @click="confirmDeleteAnnouncement(announcement)"
            >
              <DeleteIcon />
            </button>
          </div>
        </div>
        <div class="answer-preview__box announcement-card__body">
          <textarea v-if="announcement.isEditing" v-model="announcement.editBody" class="announcement-card__textarea"></textarea>
          <p v-else>{{ announcement.body }}</p>
        </div>
        <div v-if="announcement.isEditing" class="announcement-card__footer">
          <button class="send-button" type="button">
            Send
            <SendIcon class="send-button__icon" />
          </button>
          <button class="cancel-button" type="button" @click="cancelEditAnnouncement(announcement)">Cancel</button>
        </div>
      </article>
    </section>

    <div v-if="showCreateModal" class="modal-backdrop">
      <form class="create-modal" @submit.prevent="postAnnouncement">
        <h2>Create an announcement</h2>
        <label>Title</label>
        <input v-model="announcementDraft.title" type="text" placeholder="Ask a question" />
        <textarea v-model="announcementDraft.body" placeholder="Ask a question"></textarea>
        <input ref="announcementFileInput" class="sr-only" type="file" multiple @change="setAnnouncementFiles" />
        <button class="attachment-button" type="button" @click="announcementFileInput?.click()">
          <EditIcon />
          {{ announcementDraft.attachments.length ? `${announcementDraft.attachments.length} file(s)` : 'Add attachment' }}
        </button>
        <div class="modal-actions">
          <button class="modal-post" type="submit">Post</button>
          <button class="modal-cancel" type="button" @click="showCreateModal = false">Cancel</button>
        </div>
      </form>
    </div>

    <div v-if="showDeleteModal" class="modal-backdrop">
      <div class="delete-modal">
        <h2>Are you sure you want to<br />delete this {{ deleteTarget.type }}</h2>
        <div class="modal-actions">
          <button class="modal-post" type="button" @click="confirmDelete">Delete</button>
          <button class="modal-cancel" type="button" @click="showDeleteModal = false">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * MentorQuestions.vue
 *
 * Main Questions tab view for the Mentor Portal.
 * Phase 2 UI slice: tabs, filters, search, sorting and question cards.
 */
import { computed, onMounted, ref } from 'vue'
import { createAnnouncement, getAnnouncements, getCategories, getQuestions, submitAnswer } from '@/mentor/services/mentorApi'
import CommentIcon from '@/components/icons/comment-icon.svg'
import DeleteIcon from '@/components/icons/delete-icon.svg'
import EditIcon from '@/components/icons/edit-icon.svg'
import LikeIcon from '@/components/icons/like-icon.svg'
import MenuIcon from '@/components/icons/menu.svg'
import QuestionIcon from '@/components/icons/question.svg'
import SendIcon from '@/components/icons/send.svg'

const tabs = ['Announcements', 'Questions']
const activeTab = ref('Questions')
const categories = ref([])
const questions = ref([])
const isLoading = ref(true)
const loadError = ref('')
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedSort = ref('pending')
const showCreateModal = ref(false)
const showDeleteModal = ref(false)
const answerDrafts = ref({})
const announcementFileInput = ref(null)
const deleteTarget = ref({ type: 'announcement', id: null, questionId: null })
const announcementDraft = ref({ title: '', body: '', attachments: [] })
const announcements = ref([])

const sortOptions = [
  { label: 'Pending', value: 'pending' },
  { label: 'Latest', value: 'latest' },
  { label: 'Most commented', value: 'comments' },
  { label: 'Most upvoted', value: 'upvotes' },
]

const filteredQuestions = computed(() => {
  const query = searchQuery.value.toLowerCase()

  const matches = questions.value.filter((question) => {
    const matchesCategory = !selectedCategory.value || question.category === selectedCategory.value
    const matchesSearch = !query || question.title.toLowerCase().includes(query)
    return matchesCategory && matchesSearch
  })

  return [...matches].sort((a, b) => {
    if (selectedSort.value === 'pending') return Number(a.isAnswered) - Number(b.isAnswered)
    if (selectedSort.value === 'comments') return b.comments - a.comments
    if (selectedSort.value === 'upvotes') return b.upvotes - a.upvotes
    return b.id - a.id
  })
})

onMounted(async () => {
  await loadMentorData()
})

async function loadMentorData() {
  isLoading.value = true
  loadError.value = ''
  try {
    const [categoryData, questionData] = await Promise.all([getCategories(), getQuestions()])
    categories.value = categoryData
    questions.value = questionData
    getAnnouncements().then((data) => { announcements.value = data }).catch(() => {})
  } catch (err) {
    loadError.value = err.response?.data?.message || 'Could not load questions from backend.'
  } finally {
    isLoading.value = false
  }
}

function toggleCategory(category) {
  selectedCategory.value = selectedCategory.value === category ? '' : category
}

function openAnswer(question) {
  answerDrafts.value[question.id] = { open: true, text: question.answer?.text || answerDrafts.value[question.id]?.text || '', attachments: answerDrafts.value[question.id]?.attachments || [] }
}

async function sendAnswer(question) {
  const text = answerDrafts.value[question.id]?.text?.trim() || 'The answer will be here.'
  await submitAnswer(question.id, { text, attachments: answerDrafts.value[question.id]?.attachments || [] })
  answerDrafts.value[question.id].open = false
  await loadMentorData()
}

function confirmDeleteAnswer(question) {
  deleteTarget.value = { type: 'answer', questionId: question.id }
  showDeleteModal.value = true
}

function confirmDeleteAnnouncement(announcement) {
  deleteTarget.value = { type: 'announcement', id: announcement.id }
  showDeleteModal.value = true
}

function startEditAnnouncement(announcement) {
  announcement.editBody = announcement.body
  announcement.isEditing = true
}

function cancelEditAnnouncement(announcement) {
  announcement.editBody = ''
  announcement.isEditing = false
}

async function confirmDelete() {
  if (deleteTarget.value.type === 'answer') {
    const question = questions.value.find((item) => item.id === deleteTarget.value.questionId)
    if (question) {
      question.answer = null
      question.isAnswered = false
    }
    activeTab.value = 'Questions'
  } else {
    activeTab.value = 'Announcements'
  }
  showDeleteModal.value = false
}

function setAnnouncementFiles(event) {
  announcementDraft.value.attachments = Array.from(event.target.files || [])
}

function setAnswerFiles(question, event) {
  answerDrafts.value[question.id].attachments = Array.from(event.target.files || [])
}

async function postAnnouncement() {
  await createAnnouncement({ body: announcementDraft.value.body || announcementDraft.value.title, attachments: announcementDraft.value.attachments })
  announcements.value = await getAnnouncements()
  announcementDraft.value = { title: '', body: '', attachments: [] }
  showCreateModal.value = false
  activeTab.value = 'Announcements'
}
</script>

<style scoped>
.mentor-questions-view {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1.25rem;
}

.questions-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.questions-tabs {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem;
  background: var(--mentor-bg-white);
  border: 1px solid var(--mentor-border-card);
  border-radius: 999px;
}

.questions-tabs__button,
.sort-pill,
.category-chip,
.create-button,
.answer-button,
.metric-button {
  border: 0;
  font-family: var(--mentor-font-family);
  cursor: pointer;
  transition:
    background var(--mentor-transition-fast),
    box-shadow var(--mentor-transition-fast),
    transform var(--mentor-transition-fast);
}

.questions-tabs__button {
  min-width: 7.25rem;
  padding: 0.625rem 1rem;
  border-radius: 999px;
  background: transparent;
  color: var(--mentor-text-secondary);
  font-size: var(--mentor-font-size-base);
  font-weight: 700;
}

.questions-tabs__button--active {
  background: var(--mentor-primary);
  color: var(--mentor-text-primary);
  box-shadow: var(--mentor-shadow-card);
}

.create-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 2.625rem;
  padding: 0 1rem;
  border-radius: 999px;
  background: var(--mentor-primary);
  color: var(--mentor-text-emphasis);
  font-size: var(--mentor-font-size-base);
  font-weight: 800;
  box-shadow: var(--mentor-shadow-card);
}

.create-button:hover,
.question-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 30px rgba(33, 29, 18, 0.08);
}

.create-button__icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}

.questions-toolbar {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.category-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
  margin-top: 0.625rem;
}

.category-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 2rem;
  padding: 0 0.875rem;
  border: 1px solid var(--mentor-bg-cream);
  border-radius: 999px;
  background: var(--mentor-bg-cream);
  color: var(--mentor-text-primary);
  font-size: var(--mentor-font-size-sm);
  font-weight: 700;
}

.category-chip--active {
  border-color: var(--mentor-primary-hover);
  background: var(--mentor-primary);
}

.category-chip__count {
  color: var(--mentor-text-secondary);
  font-weight: 600;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  width: 100%;
  min-height: 2.125rem;
  padding: 0 0.875rem;
  border: 0;
  border-radius: 999px;
  background: #F0F0F0;
}

.search-box__icon {
  color: var(--mentor-text-secondary);
  font-size: var(--mentor-font-size-xs);
  font-weight: 800;
  text-transform: uppercase;
}

.search-box input {
  width: 100%;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--mentor-text-primary);
  font-family: var(--mentor-font-family);
  font-size: var(--mentor-font-size-base);
}

.sort-pills {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: flex-start;
}

.sort-pill {
  min-height: 1.75rem;
  padding: 0 0.75rem;
  border: 1px solid var(--mentor-text-primary);
  border-radius: 999px;
  background: var(--mentor-bg-white);
  color: var(--mentor-text-light);
  font-size: var(--mentor-font-size-sm);
  font-weight: 700;
}

.sort-pill--active {
  border-color: var(--mentor-text-primary);
  background: var(--mentor-bg-white);
  color: var(--mentor-text-primary);
}

.sort-pill--menu {
  border-color: transparent;
  background: var(--mentor-primary);
}

.sort-pill__icon {
  display: block;
  width: 0.75rem;
  height: 0.75rem;
  flex-shrink: 0;
  margin-left: 0.25rem;
}

.questions-list {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.question-card,
.empty-state {
  border: 1px solid var(--mentor-border-card);
  border-radius: 1rem;
  background: #FFFDF5;
  box-shadow: var(--mentor-shadow-card);
}

.question-card {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  padding: 0.75rem 0.875rem;
  transition:
    transform var(--mentor-transition-fast),
    box-shadow var(--mentor-transition-fast);
}

.question-card--answered {
  background: #FFFDF5;
}

.question-card__top,
.question-card__actions {
  display: flex;
  align-items: center;
}

.question-card__top {
  gap: 0.5rem;
  color: var(--mentor-text-secondary);
  font-size: var(--mentor-font-size-sm);
}

.question-card__status-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: #2bb673;
}

.question-card__author {
  color: var(--mentor-text-primary);
  font-weight: 800;
}

.question-card__separator {
  color: var(--mentor-border);
}

.question-card__title {
  margin: 0;
  color: var(--mentor-text-primary);
  font-size: var(--mentor-font-size-md);
  font-weight: 800;
  line-height: 1.45;
}

.answer-preview__box {
  position: relative;
  padding: 0.75rem 4.75rem 0.75rem 0.75rem;
  border: 1px solid #BDBDBD;
  border-radius: 0.75rem;
  background: var(--mentor-bg-white);
}

.answer-preview__box p {
  margin: 0;
  font-size: var(--mentor-font-size-base);
  line-height: 1.5;
}

.card-icon-actions {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  flex-shrink: 0;
}

.card-icon-actions--overlay {
  position: absolute;
  top: 0.625rem;
  right: 0.625rem;
}

.card-icon-actions__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  padding: 0;
  border: 1px solid var(--mentor-text-primary);
  border-radius: 50%;
  background: var(--mentor-bg-white);
  color: var(--mentor-text-primary);
  cursor: pointer;
}

.card-icon-actions__btn :deep(svg) {
  display: block;
  width: 0.875rem;
  height: 0.875rem;
}

.answer-preview {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  padding: 0;
  color: var(--mentor-text-light);
}

.answer-composer {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.answer-composer textarea {
  width: 100%;
  min-height: 4.25rem;
  border: 1px solid #BDBDBD;
  border-radius: 0.75rem;
  background: var(--mentor-bg-white);
  padding: 0.75rem;
  font-family: var(--mentor-font-family);
  resize: vertical;
}

.answer-composer__actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.answer-composer__attach {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  min-height: 1.75rem;
  padding: 0 0.875rem;
  border: 1px solid var(--mentor-text-primary);
  border-radius: 999px;
  background: var(--mentor-bg-white);
  font-family: var(--mentor-font-family);
  font-weight: 700;
  cursor: pointer;
}

.answer-composer__attach svg {
  width: 0.875rem;
  height: 0.875rem;
}

.answer-preview__meta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--mentor-font-size-xs);
  font-weight: 500;
  color: var(--mentor-text-secondary);
  padding-left: 0.125rem;
}

.answer-preview__meta strong {
  color: var(--mentor-text-primary);
}

.question-card__body {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.question-card__footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 0.625rem;
}

.question-card__category {
  display: inline-flex;
  align-items: center;
  min-height: 1.75rem;
  padding: 0 0.75rem;
  border-radius: 999px;
  border: 1px solid var(--mentor-text-primary);
  background: var(--mentor-bg-white);
  color: var(--mentor-text-primary);
  font-size: var(--mentor-font-size-xs);
  font-weight: 800;
}

.question-card__actions {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  color: var(--mentor-text-secondary);
  font-size: var(--mentor-font-size-sm);
  font-weight: 800;
}

.metric,
.metric-button {
  white-space: nowrap;
}

.metric-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  min-height: 1.75rem;
  padding: 0 0.75rem;
  border: 1px solid var(--mentor-text-primary);
  border-radius: 999px;
  background: var(--mentor-bg-white);
  color: var(--mentor-text-primary);
  font-size: var(--mentor-font-size-sm);
  font-weight: 700;
}

.metric-button__icon :deep(svg) {
  display: block;
  width: 0.875rem;
  height: 0.875rem;
}

.answer-button--answered {
  background: var(--mentor-answered-bg);
  color: var(--mentor-answered-text);
}

.answer-button {
  min-height: 2rem;
  padding: 0 0.875rem;
  border-radius: 999px;
  background: var(--mentor-primary);
  color: var(--mentor-text-emphasis);
  font-size: var(--mentor-font-size-sm);
  font-weight: 800;
}

.announcement-card__body {
  padding: 0.75rem;
}

.announcement-card__textarea {
  width: 100%;
  min-height: 3.75rem;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--mentor-text-primary);
  font-family: var(--mentor-font-family);
  font-size: var(--mentor-font-size-base);
  line-height: 1.5;
  resize: vertical;
}

.announcement-card__head,
.announcement-card__footer,
.modal-actions,
.send-button,
.cancel-button,
.attachment-button {
  display: flex;
  align-items: center;
}

.announcement-card__body {
  padding: 0.75rem;
}

.announcement-card__head {
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.announcement-card__title {
  flex: 1;
  min-width: 0;
  max-width: none;
  margin: 0;
}

.announcement-card__footer {
  gap: 0.5rem;
}

.send-button,
.cancel-button,
.attachment-button,
.modal-post,
.modal-cancel {
  border: 1px solid #B98B00;
  border-radius: 999px;
  background: var(--mentor-bg-white);
  color: var(--mentor-text-primary);
  font-family: var(--mentor-font-family);
  font-weight: 700;
  cursor: pointer;
}

.send-button {
  gap: 0.375rem;
  min-height: 1.75rem;
  padding: 0 0.75rem;
  background: var(--mentor-primary);
}

.send-button__icon {
  width: 0.875rem;
  height: 0.875rem;
}

.cancel-button {
  min-height: 1.75rem;
  padding: 0 0.875rem;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.32);
}

.create-modal,
.delete-modal {
  width: min(46rem, calc(100vw - 2rem));
  border-radius: 1.75rem;
  background: var(--mentor-bg-white);
  padding: 2rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.16);
}

.create-modal {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.create-modal h2,
.delete-modal h2 {
  margin: 0 0 1rem;
  color: var(--mentor-text-primary);
}

.create-modal input,
.create-modal textarea {
  width: 100%;
  border: 0;
  border-radius: 1rem;
  background: #F0F0F0;
  padding: 0.875rem 1rem;
  font-family: var(--mentor-font-family);
}

.create-modal textarea {
  min-height: 8rem;
  resize: vertical;
}

.attachment-button {
  width: fit-content;
  gap: 0.375rem;
  min-height: 2rem;
  margin-top: -3.75rem;
  padding: 0 0.875rem;
}

.attachment-button svg {
  width: 0.875rem;
  height: 0.875rem;
}

.modal-actions {
  gap: 1rem;
  margin-top: 1rem;
}

.modal-post,
.modal-cancel {
  min-width: 10.5rem;
  min-height: 2.5rem;
}

.modal-post {
  border-color: var(--mentor-primary);
  background: var(--mentor-primary);
}

.delete-modal {
  width: min(22rem, calc(100vw - 2rem));
  text-align: center;
}

.delete-modal .modal-actions {
  justify-content: center;
}

.question-card--answered .answer-button,
.answer-button--answered {
  background: var(--mentor-answered-bg);
  color: var(--mentor-answered-text);
}

.empty-state {
  padding: 2rem;
  color: var(--mentor-text-secondary);
  font-size: var(--mentor-font-size-base);
  font-weight: 700;
  text-align: center;
}

@media (max-width: 980px) {
  .questions-header {
    align-items: stretch;
    display: flex;
    flex-direction: column;
  }

  .question-card__footer {
    justify-content: flex-start;
  }

  .questions-tabs,
  .create-button,
  .search-box {
    width: 100%;
  }

  .questions-tabs__button {
    flex: 1;
    min-width: 0;
  }

  .question-card__actions {
    justify-content: space-between;
  }
}
</style>
