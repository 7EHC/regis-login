<script setup>
import { ref, computed, onMounted } from "vue";
import { getUser } from "../composable/fetch.js";
import { useRouter, RouterLink } from "vue-router";
import { useUserStore } from "../stores/userStore.js";

const router = useRouter();
const loginUser = ref({
  email: "",
  password: "",
});
const registrationError = ref("");
const registrationSuccess = ref();
const allUser = ref();
const currentUser = ref();
const userStore = useUserStore();

const loginCheck = async (user) => {
  let loggedIn = false;
  for (let i = 0; i < allUser.value.length; i++) {
    const loopUser = allUser.value[i];

    if (loopUser.email === user.email) {
      if (loopUser.password === user.password) {
        currentUser.value = loopUser;
        // console.log(user.email);
        // console.log(user.password);
        loggedIn = true;
      }
    }
  }

  if (loggedIn) {
    registrationError.value = "";
    registrationSuccess.value = true;
    userStore.setUserLogin(currentUser.value.username);
    setTimeout(() => {
      router.push("/home");
    }, 1000);
  } else {
    registrationError.value = "Email doesn't exist or Password is incorrect.";
  }
};

onMounted(async () => {
  allUser.value = await getUser();
});
</script>

<template>
  <div class="all">
    <h1>Login</h1>
    <br />
    <div id="app" class="login-container">
      <form class="login-form" @submit.prevent="loginCheck(loginUser)">
        <label for="email">Email: </label>
        <input type="email" id="email" v-model="loginUser.email" required />

        <label for="password">Password: </label>
        <input
          type="password"
          id="password"
          v-model="loginUser.password"
          required
        /><br />

        <label for="register" class="register"
          >Do not have an account?&nbsp;<RouterLink
            :to="{ name: 'register' }"
          >
            Register now</RouterLink
          >
          <span class="msg" v-if="registrationError" style="color: red">{{
            registrationError
          }}</span>
          <span
            class="msg-login"
            v-if="registrationSuccess"
            style="color: green"
          >
            <img
              class="img"
              src="../assets/Checkmark.svg"
              alt="checkMark"
            />&nbsp;Login Successful
          </span></label
        >
        <div class="login">
          <button type="submit" @keydown="enter">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
img {
  width: 15px;
}
h1 {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
}
.all {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  margin-top: 5%;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.msg {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding-left: 225px;
  font-size: smaller;
}

.msg-login {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding-left: 350px;
  font-size: normal;
}

.login-container {
  margin-top: 40px;
}

.login-form {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

label {
  display: flex;
  margin-bottom: 10px;
  font-weight: bold;
  color: #333;
}

.register {
    font-weight: normal;
}

input {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 12px 18px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
  transition: background-color 0.3s ease;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}

.login {
  display: flex;
  justify-content: center;
}

button:hover {
  background-color: #45a049;
}
</style>
