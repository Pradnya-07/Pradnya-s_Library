import express from "express"
import dotenv from "dotenv"
import { connectToDB } from "./config/db.js";
import User from "./models/user.model.js";
import bcryptjs from "bcryptjs"
import Jwt from "jsonwebtoken";
import cors from "cors";

dotenv.config();


const app = express();

const PORT = process.env.PORT || 4000;

//Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json())

// Sign Up
app.post("/api/signup", async (req, res) => {
   
    const { username, email, password } = req.body;

    try {
        if (!username || !email || !password) {
            throw new Error("All fields are required");
        }

        const emailExists = await User.findOne({ email });

        if (emailExists) {
            return res.status(400).json({ message: "User already exists." })
        }

        const usernameExists = await User.findOne({ username });

        if (usernameExists) {
            return res.status(400).json({ message: "User is taken, plesase try another name." })
        }

        //hash the password
        const hashedPassword = await bcryptjs.hash(password, 10);
        // console.log("hashedPassword: ", hashedPassword);
        const userDoc = await User.create({
            username,
            email,
            password: hashedPassword,
        });
        // console.log("userDoc: ", userDoc);
        //JWT 
        if (userDoc) {
            const token = Jwt.sign({ id: userDoc._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
            console.log("token:", token);
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
        }


        //console.log("outside userDoc:", userDoc);


        return res.status(200).json({ user: userDoc, message: "User created successfully." });

    } catch (error) {
        return res.status(401).json({ message: error.message.Error });
    }
});

app.post("/api/login", async (req, res) => {
    console.log("Received body:", req.body);
    const { email, password } = req.body;

    try {
        const userDoc = await User.findOne({ email });

        if (!userDoc) {
            return res.json(400).status({ message: "Invalid Credentials." });
        }

        const isPasswordValid = await bcryptjs.compareSync(password, userDoc.password);

        console.log("isPasswordValid",isPasswordValid);
        if (!isPasswordValid) {
            return res.json(400).status({ message: "Invalid Credentials." });
        }

        //JWT 
        if (userDoc) {
            const token = Jwt.sign({ id: userDoc._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
            console.log("token:", token);
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
        }

        console.log("outside userDoc:", userDoc);
        return res.status(200).json({ user: userDoc, message: "User Logged in successfully." });
    } catch (error) {
        return res.status(401).json({ message: error.message.Error });
    }

});

app.listen(PORT, async () => {
    connectToDB();
    console.log("server started at :", PORT)
})


