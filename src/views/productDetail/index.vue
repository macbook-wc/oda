<template>
  <el-card class="bgImg">
    <div class="detailTitle">ODA-{{ productDetail.title }}</div>
    <el-row :gutter="24" class="overview">
      <el-col :span="18">
        <div class="viewLeft">
          <div class="viewTitle">Overview</div>
          <div class="viewContent">
            {{ productDetail.overview }}
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <img class="imgRight" :src="productDetail.overviewImg" alt="" />
      </el-col>
    </el-row>
    <el-row :gutter="24" class="overview">
      <el-col :span="18">
        <div class="viewLeft">
          <div class="viewTitle">Details</div>
          <div class="viewContent">
            {{ productDetail.details }}
          </div>
        </div>
      </el-col>
      <el-col :span="2">
        <!-- <img class="imgSmall" :src="productDetail.imgUrl" alt="" /> -->
      </el-col>
    </el-row>
    <el-row :gutter="24" class="overview">
      <el-col :span="24">
        <div class="viewLeft">
          <div class="viewTitle">Data access and cite</div>
          <div class="downloadList">
            <div class="downLoad">
              <div class="loadItem">Platform 1:</div>
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
import { getProductDetail, downloadFile } from "../../utils/intefaceApi.js";
import { downloadApi } from "../../utils/index.js";
import axios from "axios";
const Store = useUserStore();
import { useRouter,useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
console.log(route.name,"route")
Store.routeName = route.name
const productDetail = ref([]);
let productId = ref(router.currentRoute.value.query.productId);
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
      router.push({
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
    const url = `/api/product/download/${productDetail.value.id}`; // 下载文件的url
    let response = await axios({
      method: "get",
      url: url,
      responseType: "blob", // 返回类型为blob
      headers: {
        token: Store.userInfo.token,
      },
    });
    downloadApi(response);
  } catch (error) {
    throw error;
  }
}
</script>

<style lang="less" scoped>
.bgImg {
  background-image: url("../../assets/images/bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  min-height: -moz-calc(100vh - 100px);
  min-height: -webkit-calc(100vh - 100px);
  min-height: calc(100vh - 100px);
  padding: 54px 0 0 0;
}
.downLoad {
  display: flex;
  .loadItem {
    margin-right: 15px;
    width: 80px;
  }
  .downItem {
    text-decoration: none;
    color: rgba(16, 16, 16, 1);
    transition: 0.4s;
    cursor: pointer;
  }
}
.viewDio {
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  font-family: SourceHanSansSC-regular;
  margin-top: 10px;
}
.overview {
}
.detailTitle {
  text-align: center;
  height: 40px;
  font-weight: 500;
  color: rgba(16, 16, 16, 1);
  font-size: 28px;
  font-family: SourceHanSansSC-regular;
  margin-bottom: 79px;
}
.viewLeft {
  font-size: 14px;
  font-family: SourceHanSansSC-regular;
  color: rgba(16, 16, 16, 1);
  .viewTitle {
    margin: 15px 0;
    font-size: 14px;
    font-family: SourceHanSansSC-regular;
  }
  .viewContent {
    line-height: 2.4;
    margin-right: 154px;
  }
}
.imgRight {
  width: 171px;
  height: 183px;
}
.imgSmall {
  width: 90px;
  height: 90px;
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>
