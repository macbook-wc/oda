<template>
  <div class="loginPage">
    <div class="register">
      <div class="registerLeft">
        <div class="registerTitle">Privacy Pohcy</div>
        <div v-for="(item, index) in registerText" :key="index" class="registerText">
          <div class="title">{{ item.title }}</div>
          <div class="content">{{ item.content }}</div>
        </div>
      </div>
      <div class="registerRight">
        <div class="registerForm">
          <el-icon class="icons"><WarningFilled /></el-icon>
          Sign up quickly to download all data on this website
        </div>
        <el-form ref="formRef" :model="formData" class="demo-ruleForm">
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
            prop="password"
            :rules="[{ required: true, message: 'Password is required' }]"
          >
            <div class="iconInput">
              <img src="@/assets/lock.svg" width="24" height="24" />
              <el-input
                v-model="formData.password"
                placeholder="Password"
                type="text"
                autocomplete="off"
              />
            </div>
          </el-form-item>
          <el-form-item
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
          </el-form-item>
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
          <div class="radioContent"  >
            <div :class="isChange ? 'change' : 'noChange'" @click="isChange = !isChange">
              <div></div>
              <div ></div>
            </div>
            <div class="text">I accept the privacy policy</div>
          </div>
          <el-form-item class="btnMiddle">
            <el-button
              :size="size"
              class="btn"
              type="primary"
              @click="submitForm(formRef)"
              >Register</el-button
            >
          </el-form-item>
          <div class="registerBottom">
            <div class="text">Or I Have an Account</div>
            <div @click="toLogin" class="toLogin">Login</div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive,watch } from "vue";
import axios from "axios";
import { useUserStore } from "../../stores/user.js";
import { register } from "../../utils/intefaceApi.js";
const Store = useUserStore();
import { useRouter,useRoute } from "vue-router";
let isChange = ref(false);
const router = useRouter();
const route = useRoute();
console.log(route.name,"route")
Store.routeName = route.name
const formData = reactive({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword:"",
  organization: "",
  researchField: "",
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
      if(formData.password !== formData.confirmPassword){
        ElMessage({
          showClose: true,
          message: "The two passwords entered do not match",
          type: "warning",
          duration: 1500,
        });
        return;
      }
      if (!isChange.value) {
        ElMessage({
          showClose: true,
          message: "please accept the privacy policy",
          type: "warning",
          duration: 1500,
        });
        return;
      }
      registerUser();
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
async function registerUser() {
  try {
    let params ={ ...formData}
    delete params['confirmPassword'];
    let response = await register(params);
    if (response.code == 200) {
      ElMessage({
        showClose: true,
        message: "register success",
        type: "success",
        duration: 1500,
      });
      setTimeout(() => {
        router.push({
          path: "/login",
        });
      }, 1500);
    }
  } catch (error) {
    throw error;
  }
}
const toLogin = () => {
  router.push({
    path: "/login",
  });
};
</script>

<style lang="less" scoped>
.registerBottom {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .text {
    color: rgba(16, 16, 16, 1);
    font-size: 14px;
    text-align: left;
    font-family: SourceHanSansSC-regular;
  }
  .toLogin {
    color: rgba(150, 200, 255, 1);
    font-size: 14px;
    text-align: left;
    font-family: SourceHanSansSC-regular;
    margin-left: 10px;
    cursor: pointer;
  }
}
.radioContent {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 26px;
  cursor: pointer;
  .noChange {
    position: relative;
    div:nth-child(1) {
      width: 37px;
      height: 16px;
      border-radius: 8px;
      background: #b8bab4;
    }
    div:nth-child(2) {
      left: 0;
      top: -2px;
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #5a7bf4;
    }
  }
  .change {
    position: relative;
    div:nth-child(1) {
      width: 37px;
      height: 16px;
      border-radius: 8px;
      background: #adbcf9;
    }
    div:nth-child(2) {
      left: 17px;
      top: -2px;
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #5a7bf4;
      cursor: pointer;
    }
  }
  .text {
    color: rgba(16, 16, 16, 1);
    font-size: 14px;
    text-align: left;
    font-family: SourceHanSansSC-regular;
    margin-left: 9px;
  }
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
  }
}
.loginPage {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  background-image: url("../../assets/images/loginbg.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  min-height: -moz-calc(100vh - 100px);
  min-height: -webkit-calc(100vh - 100px);
  min-height: calc(100vh - 100px);
  padding: 54px 0 20px 0;
}
.register {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.registerLeft {
  width: 656px;
  margin-right: 3%;
  opacity: 0.85;
  background-color: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(187, 187, 187, 1);
  padding: 20px 16px 56px 31px;
  border-radius: 8px;

}
.registerRight {
  border-radius: 8px;
  margin-left: 3%; 
  width: 527px;
  background-color: rgba(255, 255, 255, 1);
  border: 1px solid rgba(187, 187, 187, 1);
  padding: 14px 11px 35px 29px;
  .registerForm {
    height: 48px;
    width: 400px;
    line-height: 48px;
    border-radius: 3px;
    background-color: rgba(234, 240, 252, 1);
    color: rgba(133, 136, 142, 1);
    font-size: 14px;
    text-align: left;
    font-family: Roboto;
    border: 1px solid rgba(224, 227, 234, 1);
    margin: 0 0 53px 0;
    white-space: nowrap;
    display: flex;
    align-items: center;
    .icons {
      font-size: 16px;
      margin: 0 10px 0 20px;
    }
  }
}
.registerText {
  color: #000;
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 5px;
  font-size: 20px;
  .title {
    font-weight: 700;
    color: rgba(16, 16, 16, 1);
    font-size: 18px;
    text-align: left;
    font-family: SourceHanSansSC-regular;
  }
  .content {
    color: rgba(16, 16, 16, 1);
    font-size: 14px;
    text-align: left;
    font-family: SourceHanSansSC-regular;
  }
}
.registerTitle {
  color: rgba(16, 16, 16, 1);
  font-weight: 700;
  font-size: 20px;
  text-align: left;
  font-family: SourceHanSansSC-regular;
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
.btn {
  width: 104px;
  height: 40px;
  border-radius: 20px;
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  text-align: center;
  font-family: Roboto;
  border: 1px solid rgba(56, 148, 255, 1);
  margin-left: 216px;
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
</style>
