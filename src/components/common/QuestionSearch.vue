<template>
  <div class="search-wrap" ref="searchWrap">
    <div class="search-input-row" :class="{ focused: isFocused }">
      <span class="search-icon">
        <svg v-if="!loading" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <span v-else class="spinner"></span>
      </span>
      <input
        v-model="query"
        type="text"
        class="search-input"
        :placeholder="placeholder"
        aria-label="Search questions"
        autocomplete="off"
        @input="onInput"
        @focus="onFocus"
        @keydown.escape="closeDropdown"
        @keydown.down.prevent="moveHighlight(1)"
        @keydown.up.prevent="moveHighlight(-1)"
        @keydown.enter.prevent="selectHighlighted"
      />
      <button
        v-if="query"
        type="button"
        class="clear-btn"
        @click="clearSearch"
        aria-label="Clear search"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>

    <transition name="dropdown-fade">
      <div
        v-if="showDropdown && (loading || results.length > 0 || (query.length >= 2 && !loading))"
        class="search-dropdown"
        role="listbox"
        aria-label="Search results"
      >
        <!-- Loading state -->
        <div v-if="loading" class="search-status">
          <span class="pulse-dot"></span>
          <span class="pulse-dot"></span>
          <span class="pulse-dot"></span>
        </div>

        <!-- Empty state -->
        <div
          v-else-if="results.length === 0 && query.length >= 2"
          class="search-status empty-state"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#aaa" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            <line x1="8" y1="11" x2="14" y2="11"/>
          </svg>
          <span>No similar questions found</span>
        </div>

        <!-- Results -->
        <button
          v-for="(item, index) in results"
          :key="item._id"
          type="button"
          role="option"
          class="search-result"
          :class="{
            highlighted: index === highlightedIndex,
            'has-answer': item.answered,
          }"
          @click="openQuestion(item)"
          @mouseenter="highlightedIndex = index"
        >
          <!-- Answer indicator stripe -->
          <span v-if="item.answered" class="answer-stripe"></span>

          <div class="result-content">
            <p class="result-body" v-html="highlightMatch(item.body)"></p>
            <div class="result-meta">
              <span v-if="item.type === 'infopost'" class="badge badge-infopost">
                📌 Infopost
              </span>
              <span v-if="item.answered" class="badge badge-answered">
                ✓ Answered
              </span>
              <span v-if="!item.answered && item.type !== 'infopost'" class="badge badge-open">
                Open
              </span>
              <span class="meta-author">{{ item.user_Name }}</span>
              <span class="meta-sep">·</span>
              <span class="meta-upvotes">▲ {{ item.upvotes || 0 }}</span>
            </div>
          </div>

          <span v-if="item.answered" class="go-arrow answered-arrow">→</span>
          <span v-else class="go-arrow">→</span>
        </button>

        <!-- Footer hint -->
        <div v-if="results.length > 0" class="dropdown-footer">
          <kbd>↑</kbd><kbd>↓</kbd> navigate &nbsp; <kbd>↵</kbd> open &nbsp; <kbd>Esc</kbd> close
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import { useColourStore } from "@/stores/colour";
import { useQuestionStore } from "@/stores/question";
import { useListStore } from "@/stores/list";

export default {
  name: "QuestionSearch",
  props: {
    placeholder: {
      type: String,
      default: "Search questions…",
    },
  },
  emits: ["select"],
  setup() {
    const authStore = useAuthStore();
    const colourStore = useColourStore();
    const questionStore = useQuestionStore();
    const listStore = useListStore();
    return { authStore, colourStore, questionStore, listStore };
  },
  data() {
    return {
      query: "",
      results: [],
      loading: false,
      showDropdown: false,
      highlightedIndex: -1,
      debounceTimer: null,
      isFocused: false,
    };
  },
  mounted() {
    document.addEventListener("click", this.onClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.onClickOutside);
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
  },
  methods: {
    onFocus() {
      this.isFocused = true;
      if (this.query.trim().length >= 2) {
        this.showDropdown = true;
      }
    },
    onInput() {
      this.highlightedIndex = -1;
      if (this.debounceTimer) clearTimeout(this.debounceTimer);

      if (this.query.trim().length < 2) {
        this.results = [];
        this.loading = false;
        this.showDropdown = false;
        return;
      }

      this.loading = true;
      this.showDropdown = true;
      this.debounceTimer = setTimeout(() => this.runSearch(), 280);
    },
    async runSearch() {
      const q = this.query.trim();
      if (q.length < 2) {
        this.loading = false;
        this.results = [];
        return;
      }
      this.results = await this.questionStore.SearchQuestions(q, 10);
      this.loading = false;
    },
    async openQuestion(item) {
      if (item.type === "infopost") {
        this.$emit("select", item);
        this.closeDropdown();
        this.$router.push(this.authStore.vite_base + "/");
        return;
      }

      const full = await this.questionStore.FetchQuestionById(item._id);
      if (!full) return;

      this.listStore.UpsertQuestion(full);
      await this.questionStore.SetQuestion(full);
      await this.questionStore.SetQuestionID(full._id);

      this.$emit("select", full);
      this.closeDropdown();

      // Navigate to the question view; if answered, add hash so view can scroll
      const target = this.authStore.vite_base + "/question";
      if (item.answered) {
        this.$router.push({ path: target, hash: "#answer" });
      } else {
        this.$router.push(target);
      }
    },
    selectHighlighted() {
      if (
        this.highlightedIndex >= 0 &&
        this.highlightedIndex < this.results.length
      ) {
        this.openQuestion(this.results[this.highlightedIndex]);
      }
    },
    moveHighlight(delta) {
      if (!this.results.length) return;
      if (this.highlightedIndex < 0) {
        this.highlightedIndex = delta > 0 ? 0 : this.results.length - 1;
        return;
      }
      this.highlightedIndex =
        (this.highlightedIndex + delta + this.results.length) %
        this.results.length;
    },
    highlightMatch(text, max = 140) {
      if (!text) return "";
      const displayText = text.length > max ? text.slice(0, max) + "…" : text;
      const q = this.query.trim();
      if (!q || q.length < 2) return this.escapeHtml(displayText);
      // Highlight individual words
      const words = q.split(/\s+/).filter((w) => w.length >= 2);
      let result = this.escapeHtml(displayText);
      words.forEach((word) => {
        const escaped = this.escapeHtml(word);
        const regex = new RegExp(`(${escaped.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
        result = result.replace(regex, '<mark class="hl">$1</mark>');
      });
      return result;
    },
    escapeHtml(text) {
      return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    },
    clearSearch() {
      this.query = "";
      this.results = [];
      this.loading = false;
      this.showDropdown = false;
      this.highlightedIndex = -1;
    },
    closeDropdown() {
      this.showDropdown = false;
      this.highlightedIndex = -1;
      this.isFocused = false;
    },
    onClickOutside(event) {
      if (
        this.$refs.searchWrap &&
        !this.$refs.searchWrap.contains(event.target)
      ) {
        this.closeDropdown();
      }
    },
  },
};
</script>

<style scoped>
.search-wrap {
  position: relative;
  width: 100%;
  font-family: Inter, sans-serif;
}

/* ── Input row ─────────────────────────────────────────────── */
.search-input-row {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #ffffff;
  border: 1.5px solid #e0ddd5;
  border-radius: 52px;
  padding: 10px 18px;
  min-height: 52px;
  transition: border-color 0.18s ease, box-shadow 0.18s ease;
}

.search-input-row.focused {
  border-color: #c9a227;
  box-shadow: 0 0 0 3px rgba(255, 223, 128, 0.35);
}

.search-icon {
  display: flex;
  align-items: center;
  color: #888;
  flex-shrink: 0;
}

.search-icon svg {
  width: 20px;
  height: 20px;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  font-weight: 500;
  color: #1c1b1f;
  min-width: 0;
  font-family: Inter, sans-serif;
}

.search-input::placeholder {
  color: #aaa;
}

.clear-btn {
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #888;
  padding: 2px;
  border-radius: 50%;
  transition: background 0.15s;
}

.clear-btn:hover {
  background: rgba(0, 0, 0, 0.08);
  color: #333;
}

/* ── Spinner ───────────────────────────────────────────────── */
.spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #e0ddd5;
  border-top-color: #c9a227;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ── Dropdown ──────────────────────────────────────────────── */
.search-dropdown {
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  width: min(580px, calc(100vw - 32px));
  z-index: 200;
  background: #ffffff;
  border: 1px solid #e8e4d8;
  border-radius: 18px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.14), 0 4px 12px rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

/* dropdown transition */
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-6px);
}

/* ── Status ────────────────────────────────────────────────── */
.search-status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 18px 16px;
  font-size: 13px;
  color: #aaa;
}

.empty-state {
  flex-direction: column;
  gap: 8px;
}

/* Pulse dots for loading */
.pulse-dot {
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #c9a227;
  animation: pulse 1s ease-in-out infinite;
}
.pulse-dot:nth-child(2) { animation-delay: 0.15s; }
.pulse-dot:nth-child(3) { animation-delay: 0.3s; }

@keyframes pulse {
  0%, 80%, 100% { transform: scale(0.7); opacity: 0.5; }
  40% { transform: scale(1); opacity: 1; }
}

/* ── Result item ───────────────────────────────────────────── */
.search-result {
  position: relative;
  width: 100%;
  text-align: left;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  padding: 12px 14px 12px 16px;
  cursor: pointer;
  background: #ffffff;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background 0.12s ease;
}

.search-result:last-of-type {
  border-bottom: none;
}

.search-result.highlighted,
.search-result:hover {
  background: #fffdf5;
}

.search-result.has-answer.highlighted,
.search-result.has-answer:hover {
  background: #f0faf0;
}

/* Left accent stripe for answered */
.answer-stripe {
  position: absolute;
  left: 0;
  top: 10%;
  bottom: 10%;
  width: 3px;
  border-radius: 0 2px 2px 0;
  background: #3aaa5c;
}

.result-content {
  flex: 1;
  min-width: 0;
}

.result-body {
  margin: 0 0 6px;
  font-size: 13.5px;
  line-height: 1.45;
  color: #1c1b1f;
  font-weight: 500;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Fuzzy highlight */
:deep(.hl) {
  background: #fff0a0;
  border-radius: 2px;
  padding: 0 1px;
  font-weight: 700;
  color: #7a5500;
}

.result-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  font-size: 11.5px;
}

.badge {
  padding: 2px 8px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 0.01em;
}

.badge-answered {
  background: #e6f7ec;
  color: #1d7a3f;
  border: 1px solid #b3e6c7;
}

.badge-infopost {
  background: #fff7e0;
  color: #9e6c00;
  border: 1px solid #ffe09a;
}

.badge-open {
  background: #ffeef2;
  color: #d63864;
  border: 1px solid #ffb8cb;
  font-size: 10.5px;
}

.meta-author {
  color: #777;
}

.meta-sep {
  color: #ccc;
}

.meta-upvotes {
  color: #aaa;
}

.go-arrow {
  font-size: 16px;
  color: #ccc;
  flex-shrink: 0;
  transition: transform 0.15s ease, color 0.15s ease;
}

.answered-arrow {
  color: #3aaa5c;
}

.search-result:hover .go-arrow {
  transform: translateX(3px);
  color: #888;
}

.search-result.has-answer:hover .go-arrow {
  color: #1d7a3f;
}

/* ── Footer ────────────────────────────────────────────────── */
.dropdown-footer {
  padding: 7px 14px;
  font-size: 11px;
  color: #bbb;
  background: #fafaf8;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 2px;
}

kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
  font-size: 10px;
  font-family: Inter, sans-serif;
  color: #888;
}

/* ── Mobile ────────────────────────────────────────────────── */
@media only screen and (max-width: 750px) {
  .search-input-row {
    border-radius: 14px;
  }

  .search-dropdown {
    left: 50%;
    transform: translateX(-50%);
    width: calc(100vw - 24px);
    border-radius: 14px;
  }

  .dropdown-fade-enter-from,
  .dropdown-fade-leave-to {
    transform: translateX(-50%) translateY(-4px);
  }

  .dropdown-footer {
    display: none;
  }
}
</style>
