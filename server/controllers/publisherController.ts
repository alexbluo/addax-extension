import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface GetAdvertisersRequestQuery {
  category: string;
}

const getAdvertisers = async (
  req: Request<{}, {}, {}, GetAdvertisersRequestQuery>,
  res: Response
) => {
  const { category } = req.query;

  const advertisers = await prisma.category.findUnique({
    where: {
      category: parseInt(category, 10),
    },
    include: {
      advertisers: true,
    },
  });

  res.status(200).json(advertisers);
};

interface GetWinnerRequestQuery {
  advertisers: string;
  interest: string;
  auctionId: string;
}

const getWinner = async (
  req: Request<{}, {}, {}, GetWinnerRequestQuery>,
  res: Response
) => {
  const { query } = req;
  const advertisers = JSON.parse(query.advertisers);

  const winner = advertisers[Math.floor(Math.random() * advertisers.length)];

  // run addax protocol with aux server
  const ad = await fetch(winner.endpoint).then((response) => response.json());

  res.status(200).json(ad);
};

export { getAdvertisers, getWinner };
