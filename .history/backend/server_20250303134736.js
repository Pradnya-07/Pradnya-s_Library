import express from "express"
import dotenv from "dotenv"
import { connectToDB } from "./config/db.js";
import User from "./models/user.model.js";
import bcryptjs from "bcryptjs"
import Jwt from "jsonwebtoken";
import cors from "cors";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import Book from "./models/book.model.js";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const app = express();

const PORT = process.env.PORT || 4000;

//Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json({ limit: "20mb" }));
app.use(cookieParser());


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
    console.log("Received body in post api:", req.body);
    const { email, password } = req.body;

    try {
        const userDoc = await User.findOne({ email });

        if (!userDoc) {
            return res.status(400).json({ message: "Invalid Credentials." });
        }

        const isPasswordValid = await bcryptjs.compareSync(password, userDoc.password);

        console.log("isPasswordValid", !isPasswordValid);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid Credentials." });
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

app.get("/api/fetch-user", async (req, res) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ message: "No token provided." });
    }
    try {
        const decoded = Jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ message: "Invalid token" });
        }

        const userDoc = await User.findById(decoded.id).select("-password"); // Find all fields except the password

        if (!userDoc) {
            return res.status(400).json({ message: "User not found." });
        }

        res.status(200).json({
            user: userDoc,
        });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

app.post("/api/logout", async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully." });
});

app.post("/api/add-book", async (req, res) => {
    const { image, title, subtitle, author, link, review } = req.body;
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ message: "No token provided." });
    }
    try {
        //Image processes
        const imageResponse = await cloudinary.uploader.upload(image, {
            folder: "/library",
        });

        const decoded = Jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ message: "Invalid token" });
        }

        console.log("imageResponse: ", imageResponse);
        const userDoc = await User.findById(decoded.id).select("-password");

        const book = await Book.create({
            image: imageResponse.secure_url,
            title,
            subtitle,
            author,
            link,
            review,
            user: userDoc,
        });
        return res.status(200).json({ book, message: "Book added successfully." });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }

});

app.get("/api/fetch-books", async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });

        return res.status(200).json({ books });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get("/api/search", async (req, res) => {
    try {
        const searchTerm = req.query.searchTerm || "";
        console.log("Search: ", searchTerm);
        const books = await Book.find({
            title: { $regex: searchTerm, $options: "i" },
        }).sort({ createdAt: -1 });

        return res.status(200).json({ books });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get("/api/fetch-book/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id).populate("user", ["username"]);
        return res.status(200).json({ book });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete("/api/delete-book/:id", async (req, res) => {
    const { id } = req.params;
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ message: "No token provided." });
    }
    try {
        const decoded = Jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ message: "Invalid token" });
        }

        const book = await Book.findById(id);

        // Delete the image first
        const parts = book.image.split("/");
        const fileName = parts[parts.length - 1]; // Extract the last part: "ihwklaco9wt2d0kqdqrs.png"
        const imageId = fileName.split(".")[0];
        cloudinary.uploader
            .destroy(`library/${imageId}`)
            .then((result) => console.log("result: ", result));

        // Then delete from database
        await Book.findByIdAndDelete(id);

        return res.status(200).json({ message: "Book deleted successfully." });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error.message });
    }
});

app.listen(PORT, async () => {
    connectToDB();
    console.log("server started at :", PORT)
})


