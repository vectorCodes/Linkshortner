// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import shortid from "shortid";
import { prisma } from "../../providers/prisma";

export default async function handler(req, res) {
  const { link } = req.body;
  const result = await prisma.link.create({
    data: {
      link,
      code: shortid.generate(),
    },
  });

  res.status(200).json(result);
}
