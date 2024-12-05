import { getGenders } from "../repository/getGenders.js";

export const getGendersController = async (req, res) => {
  try {
    const faculties = await getGenders();

    res.status(200).json(faculties);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch genders" });
  }
};
