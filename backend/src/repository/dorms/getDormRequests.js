import connection from "#config/sqlConnection.js";

export const getDormRequests = async () => {
  try {
    const [results] = await connection.execute(
      `SELECT dr.*, u.name, u.surname, rt.name as request_type, rs.name as status
       FROM Dorm_requests dr
       JOIN Students s ON dr.fk_Studentusername = s.username
       JOIN Users u ON s.username = u.username
       JOIN Request_types rt ON dr.type = rt.id
       JOIN Request_statuses rs ON dr.status = rs.id`
    );
    return results;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch dorm requests");
  }
};