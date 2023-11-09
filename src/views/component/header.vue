<template>
  <div class="loginHeader">
    <div @click="toLogin" class="loginShow" v-if="!store.userInfo.token">Login</div>
    <div @click="toRegister" class="loginShow" v-if="!store.userInfo.token">Register</div>
    <div class="showNmae" v-else>{{ userInfo.email }}</div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, computed, onMounted } from "vue";
import { useUserStore } from "../../stores/user";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
const route = useRouter();
const store = useUserStore();
console.log(storeToRefs(store));
const { userInfo } = storeToRefs(store);
const toRegister = () => {
  route.push({
    path: "/register",
  });
};
const toLogin = () => {
  route.push({
    path: "/login",
  });
};
</script>

<style lang="less" scoped>
.loginHeader {
  position: absolute;
  right: 5px;
  top: 5px;
  z-index: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 25px;
  color: #000;
  font-weight: 700;
  font-size: 20px;
  .loginShow {
    cursor: pointer;
    width: 104px;
    height: 40px;
    line-height: 40px;
    border-radius: 25px;
    background-color: rgba(255, 255, 255, 1);
    color: rgba(16, 16, 16, 1);
    font-size: 14px;
    text-align: center;
    font-family: Roboto;
    border: 1px solid rgba(220, 224, 231, 1);
  }
  .loginShow:hover {
    cursor: pointer;
    background-color: rgba(56, 148, 255, 1);
    color: rgba(255, 255, 255, 1);
  }

  .loginShow {
    cursor: pointer;
    color: #000;
    margin-left: 5px;
  }
}
</style>
