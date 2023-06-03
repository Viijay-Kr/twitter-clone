/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const data = req.body.data satisfies { id: string };
    await prisma.user.create({
      data: { id: data.id },
    });
    res.send("Success");
  } catch (e) {
    console.error(e);
    res.end(500);
  }
}
