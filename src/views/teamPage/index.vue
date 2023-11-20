<template>
  <div class="">
    <el-card>
      <div class="lists">
        <div class="mainTitle">Team</div>
        <div class="itemTeam" v-for="index in 6" :key="index">
          <el-card class="teams" style="width: 100%">
            <div class="team">
              <div class="itemLeft">
                <img
                  src="../../assets/images/1.1.png"
                  @click="router.push({ path: '/teamPage' })"
                  alt=""
                />
              </div>
              <div class="itemRight">
                <div class="name">Zhaohui Chen</div>
                <div class="country">Ocean University of China</div>
                <div class="country">Principal Investigator</div>
                <div class="country">chenzhaohui@ouc.edu.cn</div>
                <div class="country">Homepage</div>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { useUserStore } from "../../stores/user.js";
const Store = useUserStore();
const route = useRoute();
Store.routeName = route.name;
onMounted(() => {});
</script>

<style lang="less" scoped>
.lists {
  padding: 41px 20% 38px;
  .mainTitle {
    font-weight: 700;
    color: rgba(64, 149, 229, 1);
    font-size: 28px;
    text-align: left;
    font-family: SourceHanSansSC-bold;
    height: 62px;
  }
  .itemTeam {
    display: flex;
    align-items: flex-start;
    .teams {
      margin-bottom: 20px;
    }
  }
  .team {
    display: flex;
    .itemLeft {
      margin-right: 20px;
      img {
        height: 175px;
        width: 130px;
        border-radius: 3px;
      }
    }
    .itemRight {
      color: rgba(64, 149, 229, 1);
      font-size: 16px;
      text-align: left;
      font-family: SourceHanSansSC-regular;
      line-height: 2;
      .name {
        color: #101010;
        font-size: 20px;
        font-weight: 600;
        font-family: SourceHanSansSC-regular;
      }
      .country {
        font-size: 14px;
        font-family: SourceHanSansSC-regular;
        color: #101010;
      }
    }
  }
}
</style>
