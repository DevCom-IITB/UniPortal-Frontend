<template>
    <div class="anonymous-box">
      <div class="title-large">Ask Question As</div>
      <div class="named-identity" :style="{ background: colourStore.primary }" @click="handleNamedIdentityClick">{{ authStore.name }}</div>
      <div class="anonymous-identity" :style="{ color: colourStore.grey }" @click="handleAnonIdentityClick">Anonymous</div>
    </div>
  </template>
  
  <script>
  import { useAuthStore } from "@/stores/auth";
  import { useColourStore } from "../../stores/colour";
  import { defineComponent } from "vue";
  
  export default defineComponent({
    name: "anonymousBox",
    setup(_, { emit }) {
      const authStore = useAuthStore();
      const colourStore = useColourStore();
  
      const handleNamedIdentityClick = () => {
        emit('namedIdentityClick');
      };

      const handleAnonIdentityClick = () => {
        emit('anonIdentityClick');
      };
  
      return { authStore, colourStore, handleNamedIdentityClick, handleAnonIdentityClick};
    },
  });
  </script>
  
  <style scoped>
  .anonymous-box {
    padding: 0.8rem;
    border-radius: 24px;
    font-family: "Inter";
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  .title-large {
      color: #201e2f;
      font-weight: 700;
      font-size: 22px;
      line-height: 28px;
      margin-bottom: 1.5rem;
  }
  .named-identity {
      color: #201e2f;
      align-content: center;
      font-weight: 500;
      font-size: 20px;
      line-height: 20px;
      letter-spacing: 0.25px;
      text-align: center;
      width: 323px;
      height: 48px;
      border-radius: 100px;
      padding: 14px, 100px, 14px, 100px;
      cursor: pointer;
      margin-bottom: 1rem;
  }
  .anonymous-identity{
      color: #201e2f;
      align-content: center;
      font-weight: 500;
      font-size: 20px;
      line-height: 20px;
      letter-spacing: 0.25px;
      text-align: center;
      width: 323px;
      height: 48px;
      border-radius: 100px;
      padding: 14px, 100px, 14px, 100px;
      border: 1px solid;
      cursor: pointer;
  }
  </style>
  