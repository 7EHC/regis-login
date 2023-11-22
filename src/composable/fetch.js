import axios from 'axios';

const getUser = async () => {
try {
  const res = await axios.get("http://localhost:5000/users");
  const user = await res.data
  return user;
}
catch (e) {
    console.log(e);
}
};

export { getUser }
