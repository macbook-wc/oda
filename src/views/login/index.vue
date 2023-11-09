<template>
  <div class="loginPage">
    <el-card class="card">
      <div class="registerPage">Login Page</div>
      <el-row :gutter="24" class="">
        <el-col :span="24">
          <el-form
            :size="size"
            ref="formRef"
            :model="formData"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item
              label="Email"
              prop="email"
              :rules="[{ required: true, message: 'Email is required' }]"
            >
              <el-input v-model="formData.email" type="text" autocomplete="off" />
            </el-form-item>
            <el-form-item
              label="Password"
              prop="password"
              :rules="[{ required: true, message: 'Password is required' }]"
            >
              <el-input v-model="formData.password" type="text" autocomplete="off" />
            </el-form-item>
            <el-form-item class="btnMiddle">
              <el-button
                :size="size"
                class="btn"
                type="primary"
                @click="submitForm(formRef)"
                >Login</el-button
              >
            </el-form-item>
            <el-form-item class="btnMiddle">
              <el-button :size="size" class="btn" @click="toRegister"
                >Quick Register</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
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
.btn {
  width: 100%;
}
.card {
  width: 45%;
  padding-right: 2%;
}
.loginPage {
  width: 100%;
  height: 93vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.registerPage {
  color: #000;
  font-weight: 700;
  font-size: 25px;
  text-align: center;
}

.demo-ruleForm {
  padding-top: 8%;
}
</style>
