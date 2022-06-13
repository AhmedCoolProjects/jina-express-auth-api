import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routers/index.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://jina-enime.vercel.app",
      "https://code-esi-admin.vercel.app",
      "https://admin.codeesi.com",
      "https://codeesi.com",
      "https://www.codeesi.com",
      "https://ahmedbargady.me",
      "https://www.ahmedbargady.me",
      "https://admin.ahmedbargady.me",
    ],
    methods: ["GET", "POST"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
