import { PrismaClient } from "@prisma/client";
import ContentCategory from "../categories";

const prisma = new PrismaClient();

interface Advertiser {
  name: string;
}

// interface CategoryRecord {
//   category: string;
//   advertisers: {
//     connectOrCreate: Advertiser[];
//   };
// }

(async () => {
  const advertiserPool: Advertiser[] = [
    { name: "Jacob" },
    { name: "Adam" },
    { name: "Alex" },
    { name: "Ethan" },
  ];

  const categoryPoolLength = Object.values(ContentCategory).length / 2;

  const promises = [];
  for (let id = 0; id < categoryPoolLength; id++) {
    const nAdvertisers = id % advertiserPool.length;
    const advertisers = advertiserPool.slice(0, nAdvertisers);

    const categoryRecord = {
      category: id.toString(),
      advertisers: {
        connectOrCreate: advertisers.map(({ name }) => ({
          where: {
            name,
          },
          create: {
            name,
          },
        })),
      },
    };

    promises.push(prisma.category.create({ data: categoryRecord }));
  }

  await Promise.all(promises);
})();
