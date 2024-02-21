<template>
  <div class="changeItem">
    <el-card class="cardTop">
      <div class="introduction">
        <div class="mainTitle">Data Request</div>
        <div class="text" style="white-space: pre-wrap">
          This website provides data for scientific research purposes and can be
          downloaded for free. Please select the variable names and the time period below,
          and click the submit button to generate a request form that will be sent to the
          data center. We will notify you via email within 3-5 business days with a data
          link. Please note that the personal information collected on this website will
          only be used for the purpose of reviewing data requests.
        </div>
      </div>
      <!-- 循环产品 -->
      <div class="introduction" v-for="(item, index) in checkData">
        <el-form :model="form" :key="index" ref="formRef">
          <div v-for="(ite, ind) in item.labelList">
            <div class="mainTitle" :key="ind">{{ ite.productTitle }}</div>
            <el-form-item :label="ite.category" :key="ind">
              <el-checkbox-group
                v-model="form[ind].labelList"
                @change="handleCheckboxChange(ind)"
              >
                <div v-for="(it, i) in ite.labelList">
                  <el-checkbox :label="it" :name="it" :key="i" />
                </div>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item
              label="选择时间"
              style="margin-left: 20px"
              :key="ind"
              :rules="form[ind].dateRules"
            >
              <div class="block">
                <el-date-picker
                  v-model="form[ind].itemDate"
                  type="monthrange"
                  range-separator="To"
                  start-placeholder="Start month"
                  end-placeholder="End month"
                  value-format="YYYY-MM"
                  unlink-panels
                />
              </div>
            </el-form-item>
          </div>
          <el-form-item class="sub_btn">
            <el-button type="primary" @click="submitForm(formRef)">确认</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
  <el-dialog v-model="dialogFormVisible" width="55%" title="提交审核" center>
    <div class="introduction_model" v-for="(item, index) in checkData">
      <el-form :model="form" :key="index" class="demo-ruleForm">
        <div v-for="(ite, ind) in item.labelList">
          <div
            class="mainTitle"
            :key="ind"
            v-if="form[ind].labelList.length || form[ind].itemDate.length"
          >
            {{ ite.productTitle }}
          </div>
          <el-form-item
            :label="ite.category"
            :key="ind"
            v-if="form[ind].labelList.length"
          >
            <el-checkbox-group v-model="form[ind].labelList">
              <div v-for="(it, i) in ite.labelList">
                <el-checkbox :label="it" :name="it" :key="i" :disabled="isDisable" />
              </div>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item
            label="选择时间"
            style="margin-left: 20px"
            :key="ind"
            v-if="form[ind].itemDate.length > 0"
          >
            <div class="iconInput nameForm">
              <el-date-picker
                v-model="form[ind].itemDate"
                type="monthrange"
                range-separator="To"
                start-placeholder="Start month"
                end-placeholder="End month"
                value-format="YYYY-MM"
                unlink-panels
                :disabled="isDisable"
              />
            </div>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <el-form ref="formRef" :model="formData" class="demo-ruleForm introduction_model">
      <div class="name">
        <el-form-item
          prop="firstName"
          :rules="[{ required: true, message: 'First name is required' }]"
        >
          <div class="iconInput nameForm">
            <img src="@/assets/user.svg" width="24" height="24" />
            <el-input
              v-focus
              v-model="formData.firstName"
              type="text"
              autocomplete="off"
              style="margin-right: 8px"
              placeholder="First name"
            />
          </div>
        </el-form-item>
        <el-form-item
          class="formError"
          prop="lastName"
          :rules="[{ required: true, message: 'Last name is required' }]"
        >
          <div class="nameForm">
            <el-input
              v-model="formData.lastName"
              placeholder="Last name"
              type="text"
              autocomplete="off"
            />
          </div>
        </el-form-item>
      </div>

      <el-form-item
        prop="email"
        :rules="[{ required: true, message: 'Email is required' }]"
      >
        <div class="iconInput">
          <img src="@/assets/email.svg" width="24" height="24" />
          <el-input
            v-model="formData.email"
            placeholder="Email as Login Account"
            type="text"
            autocomplete="off"
          />
        </div>
      </el-form-item>
      <el-form-item
        prop="country"
        :rules="[{ required: true, message: 'country is required' }]"
      >
        <div class="iconInput">
          <img src="@/assets/lock.svg" width="24" height="24" />
          <el-input
            v-model="formData.country"
            placeholder="country"
            type="text"
            autocomplete="off"
          />
        </div>
      </el-form-item>
      <!-- <el-form-item
        prop="confirmPassword"
        :rules="[{ required: true, message: 'confirmPassword is required' }]"
      >
        <div class="iconInput">
          <img src="@/assets/lock.svg" width="24" height="24" />
          <el-input
            v-model="formData.confirmPassword"
            type="text"
            autocomplete="off"
            placeholder="Confirm Password"
          />
        </div>
      </el-form-item> -->
      <el-form-item
        prop="organization"
        :rules="[{ required: true, message: 'organization is required' }]"
      >
        <div class="iconInput">
          <img src="@/assets/zz.svg" width="24" height="24" />
          <el-input
            v-model="formData.organization"
            placeholder="Organization"
            type="text"
            autocomplete="off"
          />
        </div>
      </el-form-item>
      <el-form-item
        prop="researchField"
        :rules="[{ required: true, message: 'researchField field is required' }]"
      >
        <div class="iconInput">
          <img src="@/assets/search.svg" width="24" height="24" />
          <el-input
            v-model="formData.researchField"
            placeholder="Research field"
            type="text"
            autocomplete="off"
          />
        </div>
      </el-form-item>
      <el-form-item> </el-form-item>
      <div class="sub_btn">
        <el-button type="primary" class="btn_sub" @click="submit" size="large">
          确认
        </el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { getCheckData, submitDataRequest } from "../../utils/intefaceApi.js";
let checkData = ref([]);
const dialogFormVisible = ref(false);
const isDisable = ref(true);
const formRef = ref();
const route = useRoute();

const formData = reactive({
  firstName: "1",
  lastName: "2",
  email: "cw_2211589@163.com",
  country: "123",
  organization: "2",
  researchField: "2",
});
const focusDate = (datePicker) => {};

const form = reactive([]);
onBeforeMount(() => {
  fetchData();
});
const submitForm = (formEl) => {
  if (!formEl) return;
  let i = 0;

  let isNull = form.every((item, index) => {
    return item.labelList.length == 0;
  });
  if (isNull) {
    ElMessage({
      message: "请选择要下载的文件！",
      showClose: true,
      type: "warning",
      duration: 2000,
    });
    return;
  }
  while (i < form.length) {
    console.log(form[i],"form[i].");
    if (form[i].labelList.length > 0 && form[i].itemDate.length == 0) {
      ElMessage({
        message: `${form[i].category}类型下，请选择时间！`,
        showClose: true,
        type: "warning",
        duration: 2000,
      });
      break;
    } 
    i++;
  }
  if(i == form.length){
    dialogFormVisible.value = true;
  }
};

const handleCheckboxChange = (index) => {
  form[index].dateRules = [
    { required: form[index].labelList.length > 0, message: "请选择开始结束时间!" },
  ];
};

async function submit() {
  let formFormate = [];
  form.forEach((item) => {
    let obj = {};
    if (item.labelList.length > 0) {
      obj.itemStartDate = item.itemDate[0].replace("-", " ");
      obj.itemEndDate = item.itemDate[1].replace("-", " ");
      obj.labelList = item.labelList;
      obj.category = item.category;
      formFormate.push(obj);
    }
  });
  const productId = route.query.productId;
  const productTitle = route.query.productTitle;
  let odaProductDataVoIns = [{ productId, productTitle, categoryList: formFormate }];
  let userVoIn = formData;
  let odaDateRequestVoIn = { odaProductDataVoIns, userVoIn };
  let response = await submitDataRequest(odaDateRequestVoIn);
  if (response.code == 200) {
    dialogFormVisible.value = false;
    ElMessage({
      message: "已提交成功，请在邮箱查收！",
      showClose: true,
      type: "success",
      duration: 2000,
    });
  }
}
async function fetchData() {
  try {
    let response = await getCheckData();
    checkData.value = response.data;
    checkData.value.forEach((item) => {
      item.labelList.forEach((ite, ind) => {
        let obj = { itemDate: [] };
        for (let key in ite) {
          if (ite.hasOwnProperty(key)) {
            Object.prototype.toString.call(ite[key]) == "[object Array]"
              ? (obj[key] = [])
              : key == "category"
              ? (obj[key] = ite[key])
              : "";
          }
        }
        form.push(obj);
      });
    });
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
}

const resetForm = (formEl) => {
  // formEl.resetFields()
};
</script>

<style lang="less" scoped>
.sub_btn {
  display: flex;
  justify-content: center;
}
.check_content {
  display: flex;
  align-items: center;
}
.introduction_model {
  padding: 41px 5% 38px;
  .mainTitle {
    color: rgba(64, 149, 229, 1);
    font-size: 28px;
    text-align: center;
    font-family: SourceHanSansSC-bold;
    height: 62px;
    margin-bottom: 7px;
    font-weight: 700;
  }
  .text {
    color: rgba(64, 149, 229, 1);
    font-size: 16px;
    text-align: left;
    font-family: SourceHanSansSC-regular;
    line-height: 2.5;
  }
}
.introduction {
  padding: 41px 18% 38px;
  .mainTitle {
    color: rgba(64, 149, 229, 1);
    font-size: 28px;
    text-align: center;
    font-family: SourceHanSansSC-bold;
    height: 62px;
    margin-bottom: 7px;
    font-weight: 700;
  }
  .text {
    color: rgba(64, 149, 229, 1);
    font-size: 16px;
    text-align: left;
    font-family: SourceHanSansSC-regular;
    line-height: 2.5;
  }
}
:deep(.el-input__wrapper) {
  width: 280px;
  height: 31px;
}
.nameForm {
  :deep(.el-input__wrapper) {
    width: 204px;
    height: 31px;
  }
}
:deep(.el-form-item__error) {
  color: var(--el-color-danger);
  font-size: 12px;
  line-height: 1;
  padding-top: 2px;
  position: absolute;
  top: 100%;
  left: 50px;
}
.formError {
  :deep(.el-form-item__error) {
    color: var(--el-color-danger);
    font-size: 12px;
    line-height: 1;
    padding-top: 2px;
    position: absolute;
    top: 100%;
    left: 0;
  }
}
:deep(.el-form-item) {
  display: flex;
  --font-size: 14px;
  margin-bottom: 22px;
}
.name {
  display: flex;
}
.iconInput {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  img {
    margin-right: 16px;
    margin-left: 20px;
  }
}
</style>
