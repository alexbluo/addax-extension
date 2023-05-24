import express from "express";
import logger from "morgan";
import cors from "cors";
import { getAdvertisers, getWinner } from "./controllers/publisherController";

const app = express();

app.use(cors());
app.use(logger("dev"));

app.get("/api/publisher/advertisers", getAdvertisers);
app.get("/api/publisher/winner", getWinner);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`LISTENING ON PORT ${port}`));
