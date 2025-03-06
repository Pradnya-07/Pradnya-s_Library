import { create } from "zustand";
import axios from "axios";


const API_URL = "http://localhost:4000/api";
axios.defaults.withCredentials = true;

export const useBookStore = create((set) => ({

}));