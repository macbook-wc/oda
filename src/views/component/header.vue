<template>
  <div class="loginHeader">
    <div @click="toLogin" class="loginShow1" v-if="!store.userInfo.token">Login</div>
    <div @click="toRegister" class="loginShow" v-if="!store.userInfo.token">Register</div>
    <div class="showNmae" v-else>{{ userInfo.email }}</div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, computed, onMounted } from "vue";
import { useUserStore } from "../../stores/user";
import { useRouter } from "vue-router";
import { storeToRefs } from 'pinia'
const route = useRouter();
const store = useUserStore();
console.log(storeToRefs(store));
const { userInfo } = storeToRefs(store);
const  toRegister = () => {
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
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 25px;
  color: #000;
  font-weight: 700;
  font-size: 20px;
  .loginShow {
    cursor: pointer;
    color: #000;
    margin-left: 20px;
    position: relative;
    &::before {
      content: "";
      width: 2px;
      height: 19px;
      border-radius: 12px;
      position: absolute;
      top: 7px;
      left: -10px;
      background: #000;
    }
  }
  .loginShow:hover {
    cursor: pointer;
    color: #409eff;
  }

  .loginShow {
    cursor: pointer;
    color: #000;
    margin-left: 20px;
  }
  .loginShow1:hover {
    cursor: pointer;
    color: #409eff;
  }
 
}
</style>
