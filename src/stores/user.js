import { ref, computed, reactive } from 'vue';
import { defineStore } from 'pinia';
export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = reactive({
      token:"",
      email:""
    });
    return { userInfo};
  },
  {
    persist: {
      enabled: true,
      strategies: [{ storage: sessionStorage, paths: ['userInfo'] }]
    }
  }
);
