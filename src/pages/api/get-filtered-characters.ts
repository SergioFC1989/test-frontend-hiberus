"use server";

import { getFilteredCharacters } from "@/lib/actions";
import { NextApiRequest, NextApiResponse } from "next";

const handleFilteredCharacters = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const query = req.query.nameStartsWith as string;
    const response = await getFilteredCharacters(query);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch filtered characters" });
  }
};

export default handleFilteredCharacters;
