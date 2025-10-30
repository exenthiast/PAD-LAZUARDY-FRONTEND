// src/api/axios.js
import axios from "axios";


const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // ganti kalau nanti pindah server
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ambil token dari localStorage kalau ada
const token = localStorage.getItem("token");
if (token) {
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default instance;
