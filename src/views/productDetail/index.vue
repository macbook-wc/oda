<template>
  <el-card>
    <Header></Header>
    <div class="detailTitle">{{ productDetail.title }}</div>
    <el-row :gutter="24" class="overview">
      <el-col :span="20">
        <div class="viewLeft">
          <div class="viewTitle">Overview</div>
          <div class="viewContent">
            {{ productDetail.overview }}
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <img class="imgRight" :src="productDetail.overviewImg" alt="" />
      </el-col>
    </el-row>
    <el-row :gutter="24" class="overview">
      <el-col :span="22">
        <div class="viewLeft">
          <div class="viewTitle">Details</div>
          <div class="viewContent">
            {{ productDetail.details }}
          </div>
        </div>
      </el-col>
      <el-col :span="2">
        <img class="imgSmall" :src="productDetail.imgUrl" alt="" />
      </el-col>
    </el-row>
    <el-row :gutter="24" class="overview">
      <el-col :span="24">
        <div class="viewLeft">
          <div class="viewTitle">Data access and cite</div>
          <div class="downloadList">
            <div class="downLoad">
              <div class="loadItem">download:</div>
              <div class="downItem" @click="isLogin()">{{ productDetail.title }}</div>
            </div>
          </div>
        </div>
        <div class="viewDio">DOI: {{ productDetail.doi }}</div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
import { ref, reactive, watch, computed, onMounted } from "vue";
import { useUserStore } from "../../stores/user.js";
import Header from "../component/header.vue";
import { getProductDetail, downloadFile } from "../../utils/intefaceApi.js";
import { downloadApi } from "../../utils/index.js";
import axios from "axios";
const Store = useUserStore();
import { useRouter } from "vue-router";
const route = useRouter();
const productDetail = ref([]);
let productId = ref(route.currentRoute.value.query.productId);
console.log(productId, "productId");

onMounted(() => {
  getDetail();
});
const isLogin = (item) => {
  if (!Store.userInfo.token) {
    ElMessage({
      showClose: true,
      message: "Warning, pleace login",
      type: "warning",
      duration: 1500,
    });
    setTimeout(() => {
      route.push({
        path: "/login",
      });
    }, 1500);
  } else {
    download(item);
  }
};
async function getDetail() {
  try {
    let response = await getProductDetail({ id: productId.value });
    productDetail.value = response.data;
  } catch (error) {
    throw error;
  }
}
async function download() {
  try {
    const url = `/api/product/download/${productDetail.value.id}` // 下载文件的url
    let response = await axios({
      method: "get",
      url: url,
      responseType: "blob", // 返回类型为blob
      headers:{
        token:Store.userInfo.token
      }
    });
    downloadApi(response);

  } catch (error) {
    throw error;
  }
}
</script>

<style lang="less" scoped>
.downLoad {
  display: flex;
  .loadItem {
    margin-right: 15px;
    width: 80px;
  }
  .downItem {
    text-decoration: none;
    color: hsla(160, 100%, 37%, 1);
    transition: 0.4s;
    cursor: pointer;
  }
}
.viewDio {
  color: #000;
  font-weight: 700;
  font-size: 20px;
  margin-top: 25px;
}
.overview {
  padding: 15px;
  margin-bottom: 20px;
}
.detailTitle {
  color: #000;
  font-weight: 700;
  font-size: 20px;
}
.viewLeft {
  color: #000;
  font-weight: 700;
  font-size: 16px;
  .viewTitle {
    font-weight: 700;
    margin-bottom: 15px;
  }
}
.imgRight {
  width: 130px;
  height: 130px;
}
.imgSmall {
  width: 90px;
  height: 90px;
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>
