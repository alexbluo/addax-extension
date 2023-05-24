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
  numberAds: string;
  interest: string;
  auctionId: string;
}

const getWinner = async (
  req: Request<{}, {}, {}, GetWinnerRequestQuery>,
  res: Response
) => {
  const { advertisers, numberAds, interest, auctionId } = req.query;


  // run addax protocol with aux server

  res.status(200).json();
};

export { getAdvertisers, getWinner };
