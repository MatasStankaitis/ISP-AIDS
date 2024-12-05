import { getFaculties } from "../repository/getFaculties.js";

export const getFacultiesController = async (req, res) => {
  try {
    const faculties = await getFaculties();

    res.status(200).json(faculties);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch faculties" });
  }
};
