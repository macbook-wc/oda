<template>
  <el-card>
    <div class="registerPage">Register Page</div>
    <el-row :gutter="24" class="">
      <el-col :span="11">
        <div class="registerTitle">
          Sign up quickly to download all data on this website
        </div>
        <el-form
          :size="size"
          ref="formRef"
          :model="formData"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item
            label-width="150"
            label="First name"
            prop="firstName"
            :rules="[{ required: true, message: 'First name is required' }]"
          >
            <el-input
              v-focus
              v-model="formData.firstName"
              type="text"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item
            label-width="150"
            label="Last name"
            prop="lastName"
            :rules="[{ required: true, message: 'Last name is required' }]"
          >
            <el-input
              v-model="formData.lastName"
              type="text"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item
            label-width="150"
            label="Email"
            prop="email"
            :rules="[{ required: true, message: 'Email is required' }]"
          >
            <el-input
              v-model="formData.email"
              type="text"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item
            label-width="150"
            label="Password"
            prop="password"
            :rules="[{ required: true, message: 'Password is required' }]"
          >
            <el-input
              v-model="formData.password"
              type="text"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item
            label-width="150"
            label="Country"
            prop="country"
            :rules="[{ required: true, message: 'Country is required' }]"
          >
            <el-input
              v-model="formData.country"
              type="text"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item
            label="Organization"
            label-width="150"
            prop="organization"
            :rules="[{ required: true, message: 'Organization is required' }]"
          >
            <el-input
              v-model="formData.organization"
              type="text"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item
            label-width="150"
            label="Research field"
            prop="researchField"
            :rules="[{ required: true, message: 'researchField field is required' }]"
          >
            <el-input
              v-model="formData.researchField"
              type="text"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item  label-width="150" class="btnMiddle" >
            <el-button
              :size="size"
              class="btn"
              type="primary"
              @click="submitForm(formRef)"
              >Submit</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
      <el-divider direction="vertical" border-style="dashed" class="divider" />
      <el-col :span="12">
        <div class="registerTitle">Privacy Pohcy</div>
        <div v-for="(item, index) in registerText" :key="index" class="registerText">
          <div class="title">{{ item.title }}</div>
          <div class="content">{{ item.content }}</div>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
import { ref, reactive } from "vue";
import axios from 'axios';
import { useUserStore } from "../../stores/user.js";
import { register } from "../../utils/intefaceApi.js";
const Store = useUserStore()
import { useRouter } from "vue-router";
const route = useRouter()
const formData = reactive(
  {
  "firstName": "",
  "lastName": "",
  "email": "",
  "password": "",
  "country": "",
  "organization": "",
  "researchField": ""
});
const registerText = reactive([
  {
    title: "",
    content:
      "this pryacy policy explains how we collect, use, and protect your personal information.",
  },
  {
    title: "Information We Collect",
    content:
      "We collect information you provide directly to us, such as when you create an account ordownload data, We also automatically collect information about your device and your use of ouservices through cookies and other tracking technologics.The types of information we collect may include your name, cmail address, country.Organization, Research field, and other usage data.",
  },
  {
    title: "How We Use Information",
    content:
      "-We use your information to provide, maintain, and improve our services, We may also use youinformation for other purposes like sending you promotional emails about new features.products or special offers.We use cookies and other tracking technologies to understand how you interact with ourservices so we can improve your experience.",
  },
  {
    title: "Information Sharing",
    content:
      "-We do not sell or rent your personal information to third parties. We only share it with servicc providers who help us operate our services.",
  },
  {
    title: "Your Choices",
    content:
      "You can adjust cookie settings and other tracking tools through your browser settings. Limitin cookies may impact your experience on our services.",
  },
  {
    title: "Security",
    content:
      "-We use appropriate security measures to help protect your information against unauthorizedaccess, disclosure, modification or destruction.",
  },
  {
    title: "Contact Us",
    content:
      "-If you have any questions about our privacy practices or this policy, please contact us at [xxx@xxx].",
  },
  {
    title: "Changes to this Policy",
    content:
      ". We may occasionally update this privacy policy to reflect changes in our practices or servicesWe encourage you to check this policy periodically for any updates",
  },
]);
const size = ref("large");
const formRef = ref();
const submitForm = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      registerUser()
      
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
async function registerUser() {
  try {
    let response = await register(formData);
    if(response.code==200){
      ElMessage({
      showClose: true,
      message: "register success",
      type: "success",
      duration: 1500,
    });
    setTimeout(() => {
      route.push({
        path:"/login"
      })
    }, 1500);
    }
  } catch (error) {
    throw error ;
  }
}
</script>

<style lang="less" scoped>
.registerText {
  color: #000;
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 5px;
  font-size: 20px;
  .title {
    font-size: 16px;
    font-weight: 500;
  }
  .content {
    font-size: 14px;
    font-weight: 500;
  }
}
.registerTitle {
  text-align: center;
  line-height: 1.5;
  color: #000;
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 15px;
}
.registerPage {
  color: #000;
  font-weight: 700;
  font-size: 25px;
  text-align: center;
  margin-bottom: 5%;
}
.btnMiddle {
  width: 100%;
}
.divider {
  height: 80vh;
}
.demo-ruleForm {
  margin-top: 25%;
}
.btn{
  width: 100%;
}
</style>
