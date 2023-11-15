<template>
  <div  v-if= "routeName !== 'homePage'" class="backHome" @click="jumpHome">
    <el-icon><HomeFilled /></el-icon>
    <span>Home</span>
  </div>
</template>

<script setup>

import { useUserStore } from "../../stores/user.js";
const Store = useUserStore()
import { storeToRefs } from "pinia";
const {  routeName } = storeToRefs(Store);
const router = useRouter();
const jumpHome = ()=>{
  router.push("/")
}
</script>

<style lang="less" scoped>
.backHome {
  font-size: 45px;
  position: fixed;
  right: 45px;
  bottom: 105px;
  color: rgba(47, 125, 226, 0.806);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  span {
    font-size: 15px;
  }
}
</style>
