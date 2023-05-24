import { Request, Response } from "express";

const jacob = (req: Request, res: Response) =>
  res.json("https://i.redd.it/kflfysh17d541.jpg");

const adam = (req: Request, res: Response) =>
  res.json(
    "https://i.redd.it/u5jwlxt1k43a1.jpg?s=93fcaa5dfdb259bd049a1bff4bdaece00257caff"
  );

const alex = (req: Request, res: Response) =>
  res.json(
    "https://i.redd.it/hwurhp7crzf81.png?s=55dcc550d2d49a4bdee4e6b6d582365fb9300bc6"
  );

const ethan = (req: Request, res: Response) =>
  res.json("https://i.redd.it/i7uualgitie91.jpg");

export { jacob, adam, alex, ethan };
