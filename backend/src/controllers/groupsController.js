import { getGroups } from "../repository/getGroups.js";

export const getGroupsController = async (req, res) => {
  try {
    const faculties = await getGroups();

    res.status(200).json(faculties);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch groups" });
  }
};
