import connection from "#config/sqlConnection.js";
import { NotFoundError } from "#utils/errors.js";

export const reserveDormRoom = async (roomId, studentUsername) => {
  try {
    const [roomCheck] = await connection.execute(
      `SELECT status FROM Dorm_rooms WHERE id = ?`,
      [roomId]
    );

    if (roomCheck.length === 0) {
      throw new NotFoundError("Room not found");
    }
    console.log(studentUsername);
    const [student] = await connection.execute(
      `SELECT s.year, u.gender, s.state_funded 
       FROM Students s 
       JOIN Users u ON s.username = u.username 
       WHERE s.username = ?`,
      [studentUsername]
    );

    if (student.length === 0) {
      throw new NotFoundError("Student not found");
    }

    const priorityNumber = calculatePriorityNumber(student[0]);

    // Check if the student already has a reservation
    const [existingReservation] = await connection.execute(
      `SELECT * FROM Room_reservations WHERE fk_Studentusername = ?`,
      [studentUsername]
    );
    console.log(existingReservation);
    if (existingReservation.length > 0) {
      console.log("You already have a reservation");
      return { message: `Jau esate užrezervavęs kambarį nr. ${existingReservation[0].fk_Roomid}` };
    }

    // Insert the reservation
    await connection.execute(
      `INSERT INTO Room_reservations (fk_Roomid, fk_Studentusername, priority_number)
       VALUES (?, ?, ?)`,
      [roomId, studentUsername, priorityNumber]
    );

    if (roomCheck[0].status === 1) {
      // Room is free
      await connection.execute(
        `UPDATE Dorm_rooms SET status = 3 WHERE id = ?`,
        [roomId]
      ); 
      return { message: `Kambarys nr. ${roomId} užrezervuotas sėkmingai` };
    } else if (roomCheck[0].status === 2) {
      // Room is taken
      return { message: `Įstojote į eilę, kambario nr. ${roomId} kuris užimtas. 1 eilėje.` };
    } else if (roomCheck[0].status === 3) {
      // Room is reserved
      const [reservations] = await connection.execute(
        `SELECT priority_number FROM Room_reservations WHERE fk_Roomid = ? AND fk_Studentusername != ? ORDER BY priority_number DESC`,
        [roomId, studentUsername]
      );
      console.log(reservations);
      if (priorityNumber > reservations[0].priority_number) {
        console.log("You have higher priority");
        return { message: `Kambarys nr. ${roomId} užrezervuotas sėkmingai` };
      } else {
        console.log("You have lower priority");
        return { message: "Įstojote į laukiančių eilę. 2 eilėje." };
      }
    }
  } catch (err) {
    if (err instanceof NotFoundError) {
      throw err;
    }
    console.error(err);
    throw new Error("Failed to reserve room");
  }
};

const calculatePriorityNumber = (student) => {
  const { year, gender, state_funded } = student;
  return year * 10 + (gender === 1 ? 5 : 3) + (state_funded ? 2 : 1);
};