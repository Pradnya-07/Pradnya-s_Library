import { create } from "zustand";
import axios from "axios";


const API_URL = "http://localhost:4000/api";
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    // initial states
    user: null,
    isLoading: false,
    error: null,
    message: null,
    fetchingUser: true,

    //functions

    signup: async (username, email, password) => {
        set({ isLoading: true, message: null, error: null });

        try {
            const response = await axios.post(`${API_URL}/signup`,
                { username, email, password, },
                { headers: { "Content-Type": "application/json" } });

            set({ user: response.data.user, isLoading: false, message: response.data.message });

        } catch (error) {
            console.error("Signup error:", error.response?.data);

            set({
                isLoading: false,
                error: error.response.data.message || "Error signing up.",
            });
            throw error;
        }
    },

    login: async (email, password) => {
        set({ isLoading: true, message: null, error: null });

        try {
            console.log("Sending request with in login function:", { email, password });
            const response = await axios.post(`${API_URL}/login`,
                { email, password });
            const { user, message } = response.data;
            set({ user, isLoading: false, message });
            return { user, message };

        } catch (error) {
            //console.error("Login error:", error.response.data);

            set({
                isLoading: false,
                error: error.response.data.message || "Error Logging in.",
            });
            throw error;
        }
    },


    fetchUser: async()=>{
        set({fetchingUser:true, error:null});

        try {
            const response=await axios.get(`${API_URL}/fetch-user`);

            set({user:response.data.user, fetchingUser:false});

        } catch (error) {
            set({
                fetchingUser: false,
                error: null,
                user: null,
            });
            throw error; 
        }
    },

    logout:async ()=>{
set({isLoading:true, error:null, message:null});
try {
    const response= await axios.post(`${API_URL}/logout`);

    const{message}= response.data;

    set({message, isLoading:false,user:null,error:null});

    return {message};
} catch (error) {
       set({
                isLoading: false,
                error: error.response.data.message || "Error Logging out.",
            });
            throw error;
}
    }
}));