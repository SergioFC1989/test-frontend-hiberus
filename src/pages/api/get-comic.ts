"use server";

import { getComic } from "@/lib/actions";
import { NextApiRequest, NextApiResponse } from "next";

const handleComic = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const query = req.query.url as string;
    const response = await getComic(query);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comic" });
  }
};

export default handleComic;
