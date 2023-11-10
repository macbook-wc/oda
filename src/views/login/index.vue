<template>
  <div class="loginPage">
    <div class="registerPage">
      Observationa Data Access for Kuroshio-Oyashio Extension Region（ODA-KOER）
    </div>

    <el-form ref="formRef" :model="formData" style="width: 317px">
      <el-form-item
        prop="email"
        :rules="[{ required: true, message: 'Email is required' }]"
      >
        <div class="input_content">
          <img class="imgIcon" src="../../assets/user.png" alt="" />
          <el-input
            v-model="formData.email"
            type="text"
            autocomplete="off"
            placeholder="Account (Your Register Email)"
          />
        </div>
      </el-form-item>
      <el-form-item
        prop="password"
        :rules="[{ required: true, message: 'Password is required' }]"
      >
        <div class="input_content">
          <img class="imgIcon" src="../../assets/lock.png" alt="" />
          <el-input
            v-model="formData.password"
            type="text"
            autocomplete="off"
            placeholder="Password"
          />
        </div>
      </el-form-item>
      <el-form-item class="btnMiddle1">
        <el-button :size="size" class="btn" type="primary" @click="submitForm(formRef)"
          >Login</el-button
        >
      </el-form-item>
      <el-form-item class="btnMiddle2">
        <div class="register">
          I Donot Have an Account
          <el-button class="registerBtn" :size="size" type="primary" @click="toRegister"
            >Register</el-button
          >
        </div>
      </el-form-item>
    </el-form>

    <div></div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, computed, onMounted } from "vue";
import { login } from "../../utils/intefaceApi.js";
import { useUserStore } from "../../stores/user.js";
import { useRouter } from "vue-router";
const route = useRouter();
const store = useUserStore();
const formData = reactive({
  email: "",
  password: "",
});
const size = ref("large");
const formRef = ref();
const submitForm = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      loginUser();
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

const toRegister = () => {
  route.push({
    path: "/register",
  });
};
async function loginUser() {
  try {
    let response = await login(formData);
    if (response.code == 200) {
      store.$patch((state) => {
        state.userInfo.token = response.data;
        state.userInfo.email = formData.email;
      });
      ElMessage({
        showClose: true,
        message: "login success",
        type: "success",
        duration: 1500,
      });
      setTimeout(() => {
        route.push({
          path: "/",
        });
      }, 1500);
    }
  } catch (error) {
    throw error;
  }
}
</script>

<style lang="less" scoped>
.btnMiddle1 {
  align-items: center;
  justify-content: flex-end;
  display: flex;
  width: 363px;
  padding-right: 46px;
}
.btnMiddle2 {
  align-items: center;
  justify-content: flex-end;
  display: flex;
  width: 363px;
  padding-right: 18px;
  margin-left: 12px;
  height: 53px;
  line-height: 53px;
  background-color: rgba(255, 255, 255, .63);
  text-align: center;
  border: 1px solid rgba(187, 187, 187, 1);

  .registerBtn {
    width: 104px;
    height: 40px;
    border-radius: 40px;
    margin-left: 32px;
  }
}

.input_content {
  align-items: center;
  justify-content: center;
  display: flex;
  .imgIcon {
    margin-right: 13px;
  }
}
.btn {
  width: 104px;
  height: 40px;
  border-radius: 40px;
  margin-left: 32px;
}
.card {
  // width: 45%;
  // padding-right: 2%;
  // height: 100%;
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
  padding: 54px 0 0 0;
}

.registerPage {
  height: 40px;
  color: #1e2122;
  font-size: 28px;
  font-family: SourceHanSansSC-regular;
  text-align: center;
}


:deep(.el-input) {
  width: 280px;
  height: 32px;
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
:deep(.el-form-item__content) {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex: 1;
  line-height: 32px;
  position: relative;
  font-size: var(--font-size);
  min-width: 0;
  justify-content: flex-end;
}
</style>
