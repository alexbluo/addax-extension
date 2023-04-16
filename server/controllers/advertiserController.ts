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

  const bidders = await prisma.category.findMany({
    where: {
      category,
    },
    include: {
      advertisers: true,
    },
  });

  res.status(200).json(bidders);
};

export { getAdvertisers };
