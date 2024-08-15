"use server";

import { getCharacters } from "@/lib/actions";
import { NextApiRequest, NextApiResponse } from "next";

const handleCharacters = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await getCharacters();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch characters" });
  }
};

export default handleCharacters;
