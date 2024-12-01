import express from "express";
import cors from "cors";
import { OpenAI } from "openai";
import dotenv from "dotenv"

dotenv.config(); // Load environment variables from .env

const app = express();
const port = process.env.port || 3000;
const apiKey = process.env.VITE_OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: apiKey });

app.use(cors);
app.use(express.json());
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.post("/chatbot", async (req, res) => {
    const { question } = req.body;
    const response = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant",
          },
          {
            role: "user",
            content: question
          },
        ],
        model: "gpt-3.5-turbo",
        max_tokens: 300,
    });
    res.send(response.choices[0].message.content);
})