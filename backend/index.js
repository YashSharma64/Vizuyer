import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

app.post("/feedback", async (req, res) => {
  const { rating, confidence, comment } = req.body;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ 
      success: false, 
      error: "Database configuration missing." 
    });
  }

  try {
    const isConfident = confidence === "Very Confident";
    
    const { error } = await supabase
      .from("feedback")
      .insert([{ rating, confidence: isConfident, comment }]);

    if (error) {
      console.error("Feedback submission error:", error.message);
      return res.status(500).json({ success: false, error: error.message });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

app.listen(5001, () => {
  console.log("Server running on port 5001");
});
