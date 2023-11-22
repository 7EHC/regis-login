<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { getUser } from "../composable/fetch.js";

const registrationError = ref("");
const registrationSuccess = ref();
const router = useRouter();
const existUser = ref();

const regisCheck = () => {
if (user.value.password !== user.value.confirmPassword) {
    registrationError.value = "Passwords do not match.";
  } else {
    registrationError.value = "";
    let usernameTaken = false
    let emailTaken = false

    existUser.value.forEach((u) => {
      if (user.value.username.toLocaleLowerCase() === u.username.toLocaleLowerCase()) {
        usernameTaken = true;
      }
      if (user.value.email.toLocaleLowerCase() === u.email.toLocaleLowerCase()) {
        emailTaken = true;
      }
    });

    if (usernameTaken) {
      registrationError.value = "The username is already taken.";
    } else if (emailTaken) {
      registrationError.value = "The email is already taken.";
    } else {
      registrationError.value = "";
      registrationSuccess.value = true;
      addNewUser(user.value);
    }
}
}

const addNewUser = async (newUser) => {
  try {
    registrationError.value = "";
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    const res = await axios.post("http://localhost:5000/users", {
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      username: newUser.username,
      email: newUser.email,
      dob: newUser.dob,
      password: newUser.password,
    });
    if (res.ok) {
      const user = await res.json();
      return user;
    }
  } catch (e) {
    console.log(e);
  }
};

onMounted(async () => {
  existUser.value = await getUser();
//   console.log(existUser.value);
});

const user = ref({
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  dob: "",
  password: "",
  confirmPassword: "",
});
</script>

<template>
  <div class="all">
    <h1>Registration Form</h1>
    <br />
    <div id="app" class="form-container">
      <form @submit.prevent="regisCheck" class="form-info">
        <label for="firstname">Firstname<span class="star">*</span></label>
        <input type="text" id="firstname" v-model="user.firstname" required />

        <label for="lastname">Lastname<span class="star">*</span></label>
        <input type="text" id="lastname" v-model="user.lastname" required />

        <label for="username">Username<span class="star">*</span></label>
        <input type="text" id="username" v-model="user.username" required />

        <label for="email">Email<span class="star">*</span></label>
        <input type="email" id="email" v-model="user.email" required />

        <label for="dob">Date of birth<span class="star">*</span></label>
        <input type="date" id="dob" v-model="user.dob" required />

        <label for="password">Password<span class="star">*</span></label>
        <input type="password" id="password" v-model="user.password" required />

        <label for="confirmPassword"
          >Confirm Password<span class="star">*</span></label
        >
        <input
          type="password"
          id="confirmPassword"
          v-model="user.confirmPassword"
          required
        /><br />
        <button type="submit" @keydown="enter">Register</button>
        <span class="msg" v-if="registrationError" style="color: red">{{
          registrationError
        }}</span>
        <span class="msg" v-if="registrationSuccess" style="color: green">
          <img src="../assets/Checkmark.svg" alt="checkMark"> Registration Successful
        </span>
      </form>
    </div>
  </div>
</template>

<style scoped>
img {
    width: 14px;
}
.all {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  max-width: 600px;
  margin: 0 auto;
  margin-top: 20px;
  padding: 15px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
    display: flex;
    justify-content: center;
  }

.form-container {
  margin-bottom: 20px;
  background-color: #fff;
  padding: 20px;
  max-height: 800px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  color: #333;
}

input {
  width: 100%;
  padding: 10px;
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
  transition: background-color 0.3s ease;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}

button:hover {
  background-color: #45a049;
}

.msg {
  /* display: flex; */
  justify-content: flex-end;
  align-items: flex-end;
  padding-left: 285px;
  font-size: smaller;
}

.star {
  color: red;
  margin-left: 4px;
}
</style>
