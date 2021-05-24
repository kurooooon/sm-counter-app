import type { NextApiRequest, NextApiResponse } from "next";

export interface Lottery {
  lottery: string;
}

export default (_: NextApiRequest, res: NextApiResponse<Lottery>) => {
  const reel = () => Math.floor(Math.random() * 9 + 1);
  const lottery = `${reel()}${reel()}${reel()}`;
  res.status(200).json({ lottery });
};
