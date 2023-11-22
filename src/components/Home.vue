<script setup>
import { onMounted, ref } from "vue";
import { useUserStore } from "../stores/userStore";
import { getUser } from "../composable/fetch";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const allUser = ref();
const currentUser = ref([]);
const router = useRouter();

const dateFormat = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Date(date).toLocaleString("en-US", options);
  return formattedDate;
};
// console.log(currentUser.value);
const logOut = () => {
  userStore.setUserLogin("");
  router.push("/login");
};

onMounted(async () => {
  allUser.value = await getUser();
  allUser.value.forEach((e) => {
    if (e.username === userStore.userLogin) {
      currentUser.value.push(e);
    }
  });
  const local = localStorage.getItem("user");
  if (local.length === 0) {
    // alert("Please, Login first.");
    router.push("/login");
  }
});
</script>

<template>
   <div class="all">
    <div class="user-info" v-for="(user, index) in currentUser" :key="index">
      <div class="content">
        <h1>Welcome, {{ user.username }}</h1>
        <br />
        <h3 class="info">Personal information</h3>
        <p><b>Name:</b> {{ user.firstname }} {{ user.lastname }}</p>
        <p><b>Date of Birth:</b> {{ dateFormat(user.dob) }}</p>
        <p><b>Email:</b> {{ user.email }}</p>
        <button class="logout" @click="logOut">Logout</button>
      </div>
      <img class="img" src="../assets/AddressBook.svg" alt="addressBookImg" />
    </div>
  </div>
</template>

<style scoped>
.img {
  width: 200px;
  opacity: 0.1;
  /* height: 100%; */
}

.all {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif;
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  left: 0;
  top: 0;
  justify-content: center;
  align-items: center;
}

.user-info {
  display: flex;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  max-width: 600px;
  width: 100%;
}

.content {
  flex: 1; /* Take up remaining space */
}

.user-info h1 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
}

.user-info .info {
  font-size: large;
  margin-bottom: 15px;
  color: #555;
}

.user-info p {
  margin-bottom: 8px;
  color: #555;
}

.logout {
  background-color: #d9534f;
  color: white;
  padding: 12px 18px;
  margin-top: 5%;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif;
}

.logout:hover {
  background-color: #c9302c;
}
</style>
