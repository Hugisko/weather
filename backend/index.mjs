import axios from "axios";
import express from "express";
import cors from "cors";
import dotevn from "dotenv";
dotevn.config();

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.listen(port, () => {
  console.log(`listening at ${port}`);
});
app.use(express.json({limit: '1mb'}));

app.post("/api/data", async (req, res) => {
    const city = req.body.valueSearch; 
    const url =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.API_KEY}`;
    try {
      const response = await axios.get(url);
      const data = response.data;
      console.log(data);
      res.json({
        status: "success",
        body: data,
      });
    } catch (error) {
      res.json({
        status: "failure",
        body: null,
        error: error.message,
      });
    }
  });