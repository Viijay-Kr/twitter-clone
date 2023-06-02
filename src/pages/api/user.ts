import type { NextApiRequest, NextApiResponse } from "next";

export default function handle(req: NextApiRequest, res: NextApiResponse) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const data = req.body.data satisfies { id: string };
    console.log(data);
    res.send("Success");
  } catch (e) {
    console.error(e);
    res.end(500);
  }
}
