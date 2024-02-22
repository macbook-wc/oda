<template>
  <div class="changeItem">
    <el-card class="cardTop">
      <div class="introduction">
        <div class="mainTitle">Data Request</div>
      </div>
      <!-- 循环产品 -->
      <el-form :model="form" ref="formRef">
        <div class="introduction" v-for="(item, index) in checkData">
          <div class="text" style="white-space: pre-wrap">
          {{ item.productTitle }}
        </div>
          <!-- <el-form :model="form" :key="index" ref="formRef"> -->
          <div v-for="(ite, ind) in item.labelList" class="check_content">
            <el-form-item :label="ite.category" :key="ind">
              <el-checkbox-group v-model="form[index].labelList[ind].labelList">
                <div v-for="(it, i) in ite.labelList">
                  <el-checkbox :label="it" :name="it" :key="i" />
                </div>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item
              label="选择时间"
              :key="ind"
              :rules="{
                required: form[index].labelList[ind].labelList.length ? true : false,
                message: '请选择开始结束时间',
                trigger: 'blur',
              }"
            >
              <div class="block">
                <el-date-picker
                  v-model="form[index].labelList[ind].itemDate"
                  type="monthrange"
                  range-separator="To"
                  start-placeholder="Start month"
                  end-placeholder="End month"
                  value-format="YYYY-MM"
                  unlink-panels
                />
                <!-- disabled-date="(form[ind].itemStartDate,form[ind].itemEndDate)=>disabledDate(time,form[ind].itemStartDate,form[ind].itemEndDate)" -->
              </div>
            </el-form-item>
          </div>
        </div>
        <div class="sub_btn">
          <el-button type="primary" @click="submitForm(formRef)">确认</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
  <el-dialog v-model="dialogFormVisible" width="80%" title="提交审核" center>
    <el-form :model="form" ref="formRef">
        <div class="introduction_model" v-for="(item, index) in checkData">
          <div class="text" style="white-space: pre-wrap" >
              {{ item.productTitle }}
           </div>
          <!-- <el-form :model="form" :key="index" ref="formRef"> -->
          <div v-for="(ite, ind) in item.labelList" class="check_content" >
            <el-form-item :label="ite.category" :key="ind"  >
              <el-checkbox-group v-model="form[index].labelList[ind].labelList">
                <div v-for="(it, i) in ite.labelList">
                  <el-checkbox  :disabled="isDisable" :label="it" :name="it" :key="i" />
                </div>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item
              label="选择时间"
              style="margin-left: 20px"
              :key="ind"
              :rules="{
                required: form[index].labelList[ind].labelList.length ? true : false,
                message: '请选择开始结束时间',
                trigger: 'blur',
              }"
            >
              <div class="block">
                <el-date-picker
                :disabled="isDisable"
                  v-model="form[index].labelList[ind].itemDate"
                  type="monthrange"
                  range-separator="To"
                  start-placeholder="Start month"
                  end-placeholder="End month"
                  value-format="YYYY-MM"
                  unlink-panels
                />
                <!-- disabled-date="(form[ind].itemStartDate,form[ind].itemEndDate)=>disabledDate(time,form[ind].itemStartDate,form[ind].itemEndDate)" -->
              </div>
            </el-form-item>
          </div>
        </div>
        <!-- <div class="sub_btn">
          <el-button type="primary" @click="submitForm(formRef)">确认</el-button>
        </div> -->
      </el-form>
    <!-- <div class="introduction_model" v-for="(item, index) in checkData">
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
    </div> -->
    <el-form ref="formRef" :model="formData" class="demo-ruleForm introduction_model">
      <div class="name">
        <el-form-item
          prop="firstName"
          label-width="100"
          label="name"
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
        label="email"
        label-width="100"
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
        label-width="100"
        label="country"
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
        label="organization"
        label-width="100"
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
        label="researchField"
        label-width="100"
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

let formData = reactive({
  firstName: "1",
  lastName: "2",
  email: "123@163.com",
  country: "4",
  organization: "5",
  researchField: "6",
});
const focusDate = (datePicker) => {};
// 自定义的 disabledDate 方法，控制禁用日期的逻辑
const disabledDate = (current, start, end) => {
  // 获取当前选择的月份
  const selectedMonth = new Date(current).getMonth();
  const selectedYear = new Date(current).getFullYear();
  let select = Number(selectedYear + selectedMonth);
  start = Number(start.replace("-", ""));
  end = Number(end.replace("-", ""));
  return start < select < end ? true : false;
};

let form = reactive([]);
onBeforeMount(() => {
  fetchData();
});
const submitForm = (formEl) => {
  if (!formEl) return;
  let i = 0;
  let isNull = form.every((item, index) => {
    return item.labelList.every((int) => {
      return int.labelList.length == 0;
    });
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
  outerLoop : while (i < form.length) {
    let index = 0;
    while (index < form[i].labelList.length) {
      console.log(form[i].labelList[index].labelList.length)
      if (
        form[i].labelList[index].labelList.length > 0 &&
        form[i].labelList[index].itemDate.length == 0
      ) {
      console.log(789);
        ElMessage({
          message: `${form[i].labelList[index].category}类型，请选择开始结束时间！`,
          showClose: true,
          type: "warning",
          duration: 2000,
        });
        break outerLoop;
      }
      console.log(123);
      index++
    }
    console.log(456);
    i++;
  }
  if (i == form.length) {
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
  let odaProductDataVoIns = []
  form.forEach((item) => {
    let obj ={categoryList:[]}
    item.labelList.forEach(ite=>{
      let obj1 = {}
      if(ite.labelList.length>0){
        obj.productId = item.productId
        obj.productTitle = item.productTitle
        obj1 = {category:ite.category,itemStartDate:ite.itemDate[0].replace("-", " "),itemEndDate:ite.itemDate[1].replace("-", " "),labelList:ite.labelList}
        obj.categoryList.push(obj1) 
      }
    })
    odaProductDataVoIns.push(obj)
  });
  console.log(odaProductDataVoIns,"--odaProductDataVoIns--");
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
  //   console.log(form, "--form--");
    form.forEach((item) => {
      item.labelList.forEach(ite=>{
          ite.itemDate = []
          ite.labelList = []
      })
    });
    for (const key in formData) {
      if (Object.hasOwnProperty.call(formData, key)) {
        formData[key] = "";
      }
    }
  }
}
async function fetchData() {
  try {
    let response = await getCheckData();
    checkData.value = response.data;
    checkData.value.forEach((item) => {
      let obj = {
        labelList: [],
        productId: item.productId,
        productTitle: item.productTitle,
      };
      item.labelList.forEach((ite, ind) => {
        let obj1 = { itemDate: [] };
        for (let key in ite) {
          if (ite.hasOwnProperty(key)) {
            obj1.labelList = [];
            obj1.category = ite.category ? ite.category : item.productTitle ;
            obj1.itemStartDate = ite.itemStartDate;
            obj1.itemEndDate = ite.itemEndDate;
            obj1.itemEndDate = ite.itemEndDate;
            // itemStartDate:item.itemStartDate,itemEndDate:item.itemEndDate,category:item.category
          }
        }
        obj.labelList.push(obj1);
      });
      form.push(obj);
    });
    console.log(form, "--form--");
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
.el-checkbox__label {
    display: inline-block;
    margin:0 6px !important;
    line-height: 1;
    font-size: var(--el-checkbox-font-size);
}
.sub_btn {
  display: flex;
  justify-content: center;
}
.check_content {
  display: flex;
  align-items: center;
}
.introduction_model {
  padding: 0px 6% ;
  .mainTitle {
    color: rgba(64, 149, 229, 1);
    font-size: 28px;
    text-align: center;
    font-family: SourceHanSansSC-bold;
    height: 62px;
    margin-bottom: 7px;
    font-weight: 700;
  }
}

.text {
  color: rgba(64, 149, 229, 1);
  font-size: 16px;
  text-align: left;
  font-family: SourceHanSansSC-regular;
  line-height: 2.5;
}
.introduction {
  padding: 0px 18% ;
  .mainTitle {
    color: rgba(64, 149, 229, 1);
    font-size: 28px;
    text-align: left;
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
.el-checkbox-group{
  display: flex;
  flex-wrap: wrap;
}
</style>
