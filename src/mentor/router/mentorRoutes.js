/**
 * mentorRoutes.js
 *
 * Mentor-specific route definitions.
 *
 * DEV Auth Bypass:
 *   When VITE_NODE_ENV === 'DEV', the beforeEnter guard auto-seeds the
 *   existing Pinia auth store with mock mentor credentials so you can
 *   access mentor pages without SSO. Zero backend changes.
 *
 *   To clear: call Auth.Logout() or clear localStorage.
 */

import { useAuthStore } from '@/stores/auth'

const VITE_BASE = import.meta.env.VITE_BASE // e.g. "/newbee"

/**
 * Guard that runs before entering any mentor route.
 * - In DEV mode: seeds mock auth if not already logged in.
 * - In production: redirects to login if not authenticated.
 */
function mentorAuthGuard(to, from, next) {
  const auth = useAuthStore()

  if (import.meta.env.VITE_NODE_ENV === 'DEV') {
    if (!auth.loggedIn || !auth.accessToken) {
      // Seed mock mentor data — no backend call
      auth.$patch({
        loggedIn: true,
        user_ID: '24B3632',
        name: 'Varada Gajare',
        role: 5980, // Mentor role code
        accessToken: 'dev-mock-token-mentor',
      })
      console.log('[Mentor DEV] Auto-seeded mock mentor auth:', auth.name)
    }
    return next()
  }

  // Production: must be logged in with mentor role
  if (!auth.loggedIn || (auth.role !== 5980 && auth.role !== 6311)) {
    return next({ path: VITE_BASE + '/' })
  }

  next()
}

/**
 * Mentor route definitions.
 * These get merged into the main router in src/router/index.js
 */
const mentorRoutes = [
  {
    path: VITE_BASE + '/mentor',
    component: () => import('@/mentor/MentorApp.vue'),
    beforeEnter: mentorAuthGuard,
    children: [
      {
        path: '',
        name: 'MentorQuestions',
        component: () => import('@/mentor/views/MentorQuestions.vue'),
      },
      // Future: Announcements view, etc.
    ],
  },
]

export default mentorRoutes
