import express from "express";
import logger from "morgan";
import cors from "cors";
import { getAdvertisers, getWinner } from "./controllers/publisherController";
import { jacob, adam, alex, ethan } from "./controllers/advertiserController";

const app = express();

app.use(cors());
app.use(logger("dev"));

app.get("/api/publisher/advertisers", getAdvertisers);
app.get("/api/publisher/winner", getWinner);
app.get("/api/advertiser/jacob", jacob);
app.get("/api/advertiser/adam", adam);
app.get("/api/advertiser/alex", alex);
app.get("/api/advertiser/ethan", ethan);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`LISTENING ON PORT ${port}`));
