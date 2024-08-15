"use server";

import { getDetailCharacter } from "@/lib/actions";
import { NextApiRequest, NextApiResponse } from "next";

const handleDetailCharacters = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const query = req.query.id as string;
    const response = await getDetailCharacter(query);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch detail character" });
  }
};

export default handleDetailCharacters;
