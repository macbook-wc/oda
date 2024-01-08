<template>
  <div class="bgImg">
    <el-card class="cardTop">
      <div class="detailTitle">ODA-{{ productDetail.title }}</div>
      <el-row :gutter="24" class="overview">
        <el-col :span="18">
          <div class="viewLeft">
            <div class="viewTitle">Overview</div>
            <div
              class="viewContent"
              v-text="productDetail.overview"
              style="white-space: pre-wrap"
            ></div>
          </div>
        </el-col>
        <el-col :span="6">
          <img class="imgRight" :src="productDetail.overviewImg" alt="" />
        </el-col>
      </el-row>
    </el-card>
    <el-card class="cardTop">
      <el-row :gutter="24" class="overview">
        <el-col :span="18">
          <div class="viewLeft">
            <div class="viewTitle">Subsurface Moorings</div>
            <div class="viewContent">
              The subsurface mooring array currently consists of 5 subsurface moorings,
              numbered M1-M5 in chronological order of their deployment. Each year, a new
              mooring with instruments of the same specifications replaced the old one.
              The routine hydrographic moorings M1-M4 each equipped with two 75 kHz
              WorkHorse ADCPs, four SeaBird 37-SM CTDs, three Aquadopp-DW/Seaguard-RCM
              current meters and a chain of SeaBird56 temperature loggers.
            </div>
          </div>
        </el-col>
        <el-col :span="2">
          <img class="imgSmall" :src="productDetail.imgUrl" alt="" />
        </el-col>
      </el-row>
      <!-- <el-row :gutter="24">
        <el-col :span="24">
          <img src="../../assets/images/newImg2.png" alt="" />
        </el-col>
      </el-row> -->
    </el-card>

    <el-card class="cardTop">
      <el-row :gutter="24" class="overview">
        <el-col :span="18">
          <div class="viewLeft">
            <div class="viewTitle">Details</div>
            <div
              class="viewContent"
              v-html="productDetail.details"
              style="white-space: pre-wrap"
            ></div>
          </div>
        </el-col>
        <el-col :span="2">
          <img class="imgSmall" src="../../assets/images/newImg2.png" alt="" />
        </el-col>
      </el-row>
      <!-- <el-row :gutter="24">
        <el-col :span="24">
          <img src="../../assets/images/newImg2.png" alt="" />
        </el-col>
      </el-row> -->
    </el-card>

    <el-card class="cardTop">
      <el-row :gutter="24" class="overview">
        <el-col :span="24">
          <div class="viewLeft">
            <div class="viewTitle">Data access and cite</div>
            <div class="downloadList">
              <div class="downLoad" v-for="(item, index) in downLoadList" :key="index">
                <div class="loadItem">Platform {{ index + 1 }}:</div>
                <div
                  class="downItem"
                  @click="isLogin(item)"
                  v-text="item.downloadTitle"
                ></div>
              </div>
            </div>
          </div>
          <div class="viewDio">DOI: {{ productDetail.doi }}</div>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="cardTop">
      <el-row :gutter="24" class="overview">
        <el-col :span="24">
          <div class="viewLeft">
            <div class="viewTitle">Publications</div>
            <div class="downloadList">
              <div class="downLoad" v-for="(item, index) in 3" :key="index">
                <div class="loadItem1">{{ index + 1 }}:</div>
                <div class="downItem1">XXXXXX</div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>

    <el-dialog v-model="dialogFormVisible" width="35%" title="提交审核" center> 
      <el-form :model="form" >
        <el-form-item label="请输入邮箱:" :rules="[
        {
          required: true,
          message: 'Please input email',
          trigger: 'blur',
        }]">
          <el-input v-model="form.email" autocomplete="off" placeholder="Please input email" />
        </el-form-item>
      </el-form>
      <div class="tips">提示：审核通过后，附件发送到当前邮箱。</div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" class="btn_sub"  @click="dialogFormVisible = false" size="large">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
</template>

<script setup>
import { useUserStore } from "../../stores/user.js";
import { getProductDetail, downloadFile } from "../../utils/intefaceApi.js";
import { downloadApi } from "../../utils/index.js";
const Store = useUserStore();
const router = useRouter();
const route = useRoute();
Store.routeName = route.name;
const productDetail = ref([]);
const downLoadList = ref([]);
const rules = reactive({
  email: [
    { required: true, message: 'Please input email', trigger: 'blur' },
  ],
})
const form = reactive({
  name: '',
  region: '',
})
const formLabelWidth = '140px'
const dialogFormVisible = ref(false);
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
    dialogFormVisible.value = true;
    // const url = `/api/product/download/${item.id}`; // 下载文件的url
    // downloadFile(url).then((res) => {
    //   downloadApi(res);
    // });
  }
};
async function getDetail() {
  try {
    let response = await getProductDetail({ id: productId.value });
    productDetail.value = response.data;
    downLoadList.value = response.data.productDownloadUrlVOList;
    console.log(productDetail);
  } catch (error) {
    throw error;
  }
}
</script>

<style lang="less" scoped>
.cardTop {
  margin-top: 20px;
}
:deep(.btn_sub){
  width: 90px !important;
}
.bgImg {
  // background-image: url("../../assets/images/bg.png");
  // background-size: cover;
  // background-repeat: no-repeat;
  // min-height: calc(100vh - 100px);
  padding: 54px 20%;
}
.tips{
  color: rgba(16, 16, 16, 1);
    font-size: 16px;
    font-family: SourceHanSansSC-regular;
    margin-top: 40px;
}
.downLoad {
  display: flex;
  .loadItem {
    margin-right: 15px;
    width: 80px;
  }
  .loadItem1 {
    margin-right: 15px;
  }
  .downItem {
    text-decoration: none;
    color: #3894ff;
    transition: 0.4s;
    cursor: pointer;
  }
  .downItem {
    text-decoration: none;
    transition: 0.4s;
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
  margin-bottom: 39px;
}
.viewLeft {
  font-size: 14px;
  font-family: SourceHanSansSC-regular;
  color: rgba(16, 16, 16, 1);
  .viewTitle {
    margin: 35px 0;
    font-size: 20px;
    font-family: SourceHanSansSC-regular;
  }
  .viewContent {
    line-height: 2.4;
    margin-right: 3%;
  }
}
.imgRight {
  width: 171px;
  height: 183px;
  margin-top: 35px;
  margin-left: 3%;
}
.imgSmall {
  width: 90px;
  height: 90px;
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>
