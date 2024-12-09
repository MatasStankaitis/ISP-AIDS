// frontend/src/pages/DormsPage/DormManagement/DormAdd.tsx
import { useState, } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DormForm from "./DormForm";
import { baseUrl } from "../../../constants";
import DormRoomForm from "./DormRoomForm";
import { Container } from "react-bootstrap";

const DormAdd = () => {
  const navigate = useNavigate();
  const [dormId, setDormId] = useState<number | null>(null);
  const [roomCount, setRoomCount] = useState<number>(0);
  const [currentRoomIndex, setCurrentRoomIndex] = useState<number>(0);

  const handleSubmit = async (
    dormName: number | "",
    dormAddress: string,
    roomCount: number
  ) => {
    try {
      const response = await fetch(`${baseUrl}/dorms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          number: dormName,
          address: dormAddress,
          room_count: roomCount,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add dorm");
      }

      const data = await response.json();
      console.log("Dorm added successfully:", data);

      if (roomCount > 0) {
        setDormId(data.dormId);
        setRoomCount(roomCount);
      } else {
        alert("Bendrabutis sėkmingai pridėtas!");
        navigate("/home/dorms"); // Navigate after adding the dorm with zero rooms
      }
    } catch (error) {
      console.error("Error adding dorm:", error);
      alert(error.message); // Display the error message to the user
    }
  };

  const handleRoomSubmit = async (roomData: {
    roomNumber: number;
    floorNumber: number;
    price: number;
    quality: number;
    status: number;
  }) => {
    try {
      const response = await fetch(`${baseUrl}/dorms/rooms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...roomData,
          fk_Dormid: dormId,
        }),
      });
      if (!response.ok) {
        throw new Error(response.message);
      }

      console.log("Dorm room added successfully");
      if (currentRoomIndex + 1 < roomCount) {
        setCurrentRoomIndex(currentRoomIndex + 1);
      } else {
        alert("Visi kambariai sėkmingai pridėti!");
        navigate("/home/dorms"); // Navigate after adding all rooms
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container className="mb-3 justify-content-center">
      {!dormId ? (
        <DormForm
          onSubmit={handleSubmit}
          submitButtonText="Pridėti bendrabutį"
          title="Pridėti bendrabutį"
        />
      ) : (
        <DormRoomForm
          onSubmit={handleRoomSubmit}
          submitButtonText={`Pridėti kambarį (${currentRoomIndex + 1}/${roomCount})`}
          title="Pridėti bendrabučio kambarį"
        />
      )}
      <Button variant="secondary" onClick={() => navigate(-1)}>
        Grįžti atgal
      </Button>
    </Container>
  );
};

export default DormAdd;