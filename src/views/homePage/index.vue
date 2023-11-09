<template>
  <el-card >
    <div class="block text-center" style="text-align: center">
      <el-carousel>
        <el-carousel-item
          v-for="item in homeImages"
          :key="item"
          @click="jumpBanner(item)"
        >
          <img class="banner" :src="item.url" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="introduction">
      <div class="mainTitle">Introduction</div>
      <div class="text">
        {{ homeIntroductionStr }}
      </div>
    </div>
    <div class="lists">
      <div class="mainTitle">Resources</div>
      <div v-for="(item, index) in odaProducts" :key="index" class="listItems">
        <div class="item" @click="toDetail(item)">
          <div class="imgs">
            <img class="img" :src="item.imgUrl" />
          </div>
          <div class="content">
            <!-- <div class="title">{{ item.title }}</div> -->
            <div class="contentText">{{ item.info }}</div>
            <div class="contentText">{{ item.overview }}</div>
            <div @click="down" class="loadItem">
              <div class="loadIcon">
                <div class="svg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 48 48"
                    width="53"
                    height="53"
                    style="
                      border-color: rgba(0, 0, 0, 0);
                      border-width: bpx;
                      border-style: undefined;
                    "
                    filter="none"
                  >
                    <g>
                      <path
                        d="M5 24L24 42L43 24H31V6H17V24H5Z"
                        fill="none"
                        stroke="rgba(214.965,171.10500000000002,6.885,1)"
                        stroke-width="4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </g>
                  </svg>
                </div>

                <div class="loadBtn">Download</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>
<script setup>
// import {getAssetsFile} from "../../utils/index.js";
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { getHomepageInfo } from "../../utils/intefaceApi.js";

const route = useRouter();
let homeImages = ref([]);
let odaProducts = ref([]);
let homeIntroductionStr = ref();

const toDetail = (item) => {
  route.push({
    path: "/productDetail",
    query: {
      productId: item.id,
    },
  });
};

const jumpBanner = (item) => {
  if (!item.jumpUrl) return;
  window.location.href = item.jumpUrl;
};

const scroll = () => {
  const scrollHeight = document.documentElement.scrollHeight; // 可滚动区域的高
  const scrollTop = document.documentElement.scrollTop; // 已经滚动区域的高
  const clientHeight = document.documentElement.clientHeight; // 可视区高度
  // 以滚动高度 + 当前视口高度  >= 可滚动高度 = 触底
  if (clientHeight + scrollTop >= scrollHeight) {
    // 此处可书写触底刷新代码
    console.log("触底");
  }
};
// 挂载dom后注册scroll事件
onMounted(() => {
  window.addEventListener("scroll", scroll);
  fetchData();
});
async function fetchData() {
  try {
    let response = await getHomepageInfo();
    homeImages.value = response.data.homeImages;
    homeIntroductionStr.value = response.data.homeIntroductionStr;
    odaProducts.value =response.data.odaProducts
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
}
// 页面销毁移除scroll事件
onUnmounted(() => window.removeEventListener("scroll", scroll));
</script>
<style lang="less" scoped>



.loadItem {
  position: absolute;
  right: 25px;
  bottom: -27px;
}
.loadIcon {
  display: flex;
  justify-content: flex-end;
  position: relative;
  padding-top: 27px;
  .svg {
    right: 130px;
    top: 0px;
    position: absolute;
  }
  .loadBtn {
    width: 202px;
    height: 41px;
    line-height: 40px;
    border-radius: 21px;
    background-color: rgba(189, 189, 189, 1);
    text-align: right;
    border: 1px solid rgba(187, 187, 187, 1);
    padding-right: 35px;
  }
}
.banner {
  cursor: pointer;
}
.listItems {
  cursor: pointer;
  margin-bottom: 20px;
}
.item {
  display: flex;
  .img {
    width: 243px;
    height: 250px;
  }
  .imgs {
    width: 243px;
    height: 250px;
  }
  .content {
    margin-left: 25px;
    position: relative;
    .title {
      font-family: SourceHanSansSC-regular;
      margin-bottom: 15px;
      overflow: hidden;
      -webkit-line-clamp: 1;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }
    .contentText {
      color: rgba(64, 149, 229, 1);
      font-size: 16px;
      overflow: hidden;
      -webkit-line-clamp: 3;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      line-height: 2.3;
    }
  }
}

.introduction {
  padding: 21px 157px 0px 139px;
  .mainTitle {
    color: rgba(64, 149, 229, 1);
    font-size: 28px;
    text-align: left;
    font-family: SourceHanSansSC-bold;
    height: 62px;
    margin-bottom: 7px;
  }
  .text {
    color: rgba(64, 149, 229, 1);
    font-size: 16px;
    text-align: left;
    font-family: SourceHanSansSC-regular;
    line-height: 2.5;
  }
}
.lists {
  padding: 37px 157px 38px 139px;
  position: relative;
  .mainTitle {
    color: rgba(64, 149, 229, 1);
    font-size: 28px;
    text-align: left;
    font-family: SourceHanSansSC-bold;
    height: 62px;
  }
  .text {
    color: rgba(64, 149, 229, 1);
    font-size: 16px;
    text-align: left;
    font-family: SourceHanSansSC-regular;
  }
}
</style>
<style scoped>
.el-carousel {
  /* width: 1200px; */
}
.el-carousel__item img {
  width: 100%;
  height: 100%;
  color: #475669;
  margin: 0;
  text-align: center;
}
/* 需要改变vue自带的样式时需要在元素前面加上::v-deep*/
/* 左箭头 */
:deep(.el-carousel__arrow--left) {
  top: 150px;
  left: 0px;
  font-size: 24px;
  font-weight: 900;
  color: greenyellow;

  /* 设置背景图片 */
  /* background: url("http://www.w3.org/2000/svg") no-repeat center center; */
  background-size: auto 40px;
}

/* 右箭头 */
:deep(.el-carousel__arrow--right) {
  top: 150px;
  right: 0;
  font-size: 24px;
  color: greenyellow;
}

/* 水平指示器 */
:deep(.el-carousel__indicators--horizontal) {
  /* background: red; */
  /* background: transparent; */
  bottom: 0px;
  border-radius: 20%;
}

/* 将轮播图指示器变成圆点 */
:deep(.el-carousel__indicator--horizontal .el-carousel__button) {
  width: 10px;
  height: 10px;
  /* background: transparent; */
  background: greenyellow;
  border: 1px solid #ffffff;
  border-radius: 50%;
  /*不透明度 */
  opacity: 0.5;
}

/* 当前被选中的指示器样式 */
:deep(.el-carousel__indicator--horizontal.is-active .el-carousel__button) {
  width: 10px;
  height: 10px;
  background: yellow;
  border-radius: 50%;
  opacity: 1;
}

:deep(.el-carousel__container) {
  width: 100%;
}
:deep(.el-card__body) {
  padding: 0;
}
</style>
