<template>
  <div class="navbar" :style="{ background: colourStore.unselected }">
    <router-link
      :to="authStore.vite_base + '/'"
      class="btn"
      id="info"
      @click="selected1"
      @hover="hover1"
      :style="
        colourStore.currentPage == 1
          ? {
              background: colourStore.primary,
              color: colourStore.emphasis_text,
            }
          : { color: colourStore.grey }
      "
      ><div class="route">Infopost</div></router-link
    >
    <router-link
      v-if="authStore.role == 1980 || authStore.role == 7669"
      :to="authStore.vite_base + '/questions'"
      class="btn"
      @click="selected2"
      @hover="hover2"
      :style="
        colourStore.currentPage == 2
          ? {
              background: colourStore.primary,
              color: colourStore.emphasis_text,
            }
          : { color: colourStore.grey }
      "
      ><div class="route">Questions</div></router-link
    >
    <router-link
      v-if="authStore.role == 1980 || authStore.role == 7669"
      :to="authStore.vite_base + '/myquestions'"
      class="btn"
      @click="selected3"
      @hover="hover3"
      :style="
        colourStore.currentPage == 3
          ? {
              background: colourStore.primary,
              color: colourStore.emphasis_text,
            }
          : { color: colourStore.grey }
      "
      ><div class="route">My Questions</div></router-link
    >
    <router-link
      v-if="
        authStore.role == 5980 ||
        authStore.role == 6311 ||
        authStore.role == 1980
      "
      :to="authStore.vite_base + '/unanswered'"
      class="btn"
      @click="selected2"
      @hover="hover2"
      :style="
        colourStore.currentPage == 2
          ? {
              background: colourStore.primary,
              color: colourStore.emphasis_text,
            }
          : { color: colourStore.grey }
      "
      ><div class="route">UnAnswered</div></router-link
    >
    <router-link
      v-if="
        authStore.role == 5980 ||
        authStore.role == 6311 ||
        authStore.role == 1980
      "
      :to="authStore.vite_base + '/answered'"
      class="btn"
      @click="selected3"
      @hover="hover3"
      :style="
        colourStore.currentPage == 3
          ? {
              background: colourStore.primary,
              color: colourStore.emphasis_text,
            }
          : { color: colourStore.grey }
      "
      ><div class="route">Answered</div></router-link
    >
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import { useColourStore } from '../../stores/colour';

export default {
  name: 'Navbar',
  setup() {
    const authStore = useAuthStore();
    const colourStore = useColourStore();
    return { authStore, colourStore };
  },
  emits: ['selected1', 'selected2', 'selected3'],

  data() {
    return {
      hovering: 0,
    };
  },
  methods: {
    async selected1() {
      this.$emit('selected1');
      this.currentPage = 1;
    },
    async selected2() {
      this.$emit('selected2');
      this.currentPage = 2;
    },
    async selected3() {
      this.$emit('selected3');
      this.currentPage = 3;
    },
    async hover1() {
      this.hovering = 1;
    },
    async hover2() {
      this.hovering = 2;
    },
    async hover3() {
      this.hovering = 3;
    },
  },
};
</script>

<style scoped>
.navbar {
  width: 100%;

  border-radius: 52px;
  background: #faf4e1;
  display: flex;
  flex-direction: row;
  font-size: 18px;
  justify-content: space-around;
  align-items: stretch;
}

.btn {
  padding: 24px 0px;
  width: 33.33%;
  border-radius: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: #ccb160;
  padding: 10px 0px;
}

.route {
  font-weight: 500;
}

@media only screen and (max-width: 1150px) {
  .navbar {
    font-size: 16px;
    height: 45%;
  }
}

@media only screen and (max-width: 750px) {
  .navbar {
    font-size: 14px;
  }
}
</style>
