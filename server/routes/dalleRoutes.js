import express from "express";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const router = express.Router();

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.error("API key not found in environment variables.");
  process.exit(1);
}

const apiBaseUrl = "https://api.limewire.com/api/image/generation";

router.route("/").get((req, res) => {
  res.send("Hello from Dalle");
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt, samples = 1, quality = "HIGH", aspect_ratio = "1:1" } = req.body;

    const response = await axios.post(`${apiBaseUrl}`, {
      prompt,
      samples,
      quality,
      aspect_ratio,
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Api-Version': 'v1',
      },
    });

    const imageData = response.data;

    res.status(200).json(imageData);

  } catch (error) {
    console.error(error);
    const errorMessage = error?.response?.data?.error?.message || 'An error occurred';
    res.status(500).json({ error: errorMessage });
  }
});

export default router;