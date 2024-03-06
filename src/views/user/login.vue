<template>
  <div>
    <div class="login">
      <el-form class="form" :model="account" :rules="rules" ref="loginForm" style="margin: 14% 0% 0% 35%">
        <h1 class="title">Electron-Vue3-Vite</h1>
        <el-form-item prop="userName">
          <el-input class="text" v-model="account.userName" clearable placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input class="text" v-model="account.password" show-password clearable placeholder="请输入密码"
            @keyup.enter="login" />
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="account.checked" label="记住密码" name="type"></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { getUserInfo } from "../../api";
import { ElMessage, ElLoading } from "element-plus";
const account = reactive({
  userName: localStorage.getItem('account') || "",
  password: localStorage.getItem('password') || "",
  checked: localStorage.getItem('account') ? true : false,
});
//校验规则
const rules = reactive({
  userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});
const router = useRouter();
const loginForm = ref(null);
const login = async () => {
  // 记住密码
  if (account.checked === true) {
    localStorage.setItem('account', account.userName)
    localStorage.setItem('password', account.password)
  } else {
    localStorage.removeItem('account')
    localStorage.removeItem('password')
  }
  const loading = ElLoading.service({
    lock: true,
    text: '登录中......',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  try {
    let valid = await loginForm.value.validate();
    if (!valid) return;
    let { result } = await getUserInfo({
      account: account.userName,
      password: account.password,
    });
    if (result) {
      localStorage.setItem("user", JSON.stringify(result));
      localStorage.setItem('time', new Date().getTime())
      router.push("/");
    }
  }
  catch (e) {
    console.log(e);
  }
  finally {
    loading.close()
  }
};

onMounted(() => { });
</script>

<style lang="scss" scoped>
.login {
  transition: transform 1s;
  transform: scale(1);
  width: 100%;
  height: 100%;
  overflow: hidden;
  //background: #2d3a4b;
  position: fixed;
  background-size: 100% 100%;
  background-repeat: no-repeat;

  //background-image: url("../../assets/bei_jing_tu.jpeg");
  .form {
    //margin-left:500px;
    width: 450px;
    max-width: 60%;
    padding: 10px 24px 10px 24px;
    box-sizing: border-box;
    margin: 160px auto 50px;
    background: #ffffff;

    -webkit-border-radius: 5px;
    border-radius: 5px;

    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;

    .title {
      color: #000;
      text-align: center;
      font-size: 24px;
      margin: 0 0 24px;
    }

    .text {
      font-size: 16px;

      :deep(.el-input__inner) {
        border: 1px solid rgba(255, 255, 255, 0.1);
        //background: rgba(0, 0, 0, 0.1);
        color: #000;
        height: 48px;
        line-height: 48px;
        //&::placeholder {
        //  color: rgba(255, 255, 255, 0.2);
        //}
      }
    }

    .btn {
      width: 100%;
    }
  }
}
</style>
