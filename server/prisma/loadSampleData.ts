import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Advertiser {
  name: string;
  endpoint: string;
}

(async () => {
  const advertiserPool: Advertiser[] = [
    { name: "Jacob", endpoint: "/api/jacob" },
    { name: "Adam", endpoint: "/api/adam" },
    { name: "Alex", endpoint: "/api/alex" },
    { name: "Ethan", endpoint: "/api/ethan" },
  ];

  const categories = Array.from({ length: 349 }, (_, i) => i + 1);
  const data = advertiserPool.map(({ name, endpoint }) => {
    const shuffled = categories.sort(() => 0.5 - Math.random());

    const n = Math.floor(Math.random() * 349);
    const selected = shuffled.slice(0, n);

    return {
      name,
      endpoint,
      categories: {
        connectOrCreate: selected.map((id) => ({
          where: { category: id },
          create: { category: id },
        })),
      },
    };
  });

  for (let i = 0; i < data.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    await prisma.advertiser.create({data: data[i]})
  }
})();
