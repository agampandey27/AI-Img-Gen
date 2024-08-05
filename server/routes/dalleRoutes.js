import express from "express";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const router = express.Router();

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.error("API key not found in environment variables.");
  process.exit(1); // Exit process if API key is not found
}

// Define the base URL for the hypothetical FreeImageAPI
const apiBaseUrl = "https://api.limewire.com/api/image/generation"; // Replace with the actual base URL from FreeImageAPI

router.route("/").get((req, res) => {
  res.send("Hello from Dalle");
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await axios.post(
      `${apiBaseUrl}`,
      {
        prompt,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Api-Version': 'v1',
        },
      }
    );

    const imageData = response.data;

    // Assuming imageData contains the 'data' array with 'url' field in each object
    res.status(200).json(imageData);

  } catch (error) {
    console.error(error);
    const errorMessage = error?.response?.data?.error?.message || 'An error occurred';
    res.status(500).json({ error: errorMessage });
  }
});

export default router;