// frontend/src/pages/DormsPage/DormManagement/DormEdit.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DormForm from "./DormForm";
import { baseUrl } from "../../../constants";
import { Container, Table, Button } from "react-bootstrap";

interface Dorm {
  id: number;
  number: number;
  address: string;
  room_count: number;
}

const DormEdit = () => {
  const [dorms, setDorms] = useState<Dorm[]>([]);
  const [selectedDormId, setSelectedDormId] = useState<number | null>(null);
  const [initialValues, setInitialValues] = useState<{
    dormName: number | "";
    dormAddress: string;
    roomCount: number;
  }>({
    dormName: "",
    dormAddress: "",
    roomCount: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDorms = async () => {
      try {
        const response = await fetch(`${baseUrl}/dorms`);
        if (!response.ok) {
          throw new Error("Failed to fetch dorms");
        }
        const data = await response.json();
        setDorms(data);
      } catch (error) {
        console.error("Error fetching dorms:", error);
        alert("Nepavyko gauti bendrabučių sąrašo");
      }
    };

    fetchDorms();
  }, []);

  const handleDormSelect = async (id: number) => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/dorms/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch dorm data");
      }
      const data = await response.json();
      setInitialValues({
        dormName: data.number,
        dormAddress: data.address,
        roomCount: data.room_count,
      });
      setSelectedDormId(id);
    } catch (error) {
      console.error("Error fetching dorm data:", error);
      alert("Nepavyko gauti bendrabučio duomenų");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (
    dormName: number | "",
    dormAddress: string,
    roomCount: number
  ) => {
    if (!selectedDormId) return;
    try {
      const response = await fetch(`${baseUrl}/dorms/${selectedDormId}`, {
        method: "PUT",
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
        throw new Error(errorData.message || "Failed to update dorm");
      }

      alert("Bendrabučio informacija sėkmingai atnaujinta!");
      // Refresh dorms list
      const updatedDorms = dorms.map((dorm) =>
        dorm.id === selectedDormId
          ? { ...dorm, number: dormName, address: dormAddress, room_count: roomCount }
          : dorm
      );
      setDorms(updatedDorms);
      setSelectedDormId(null);
    } catch (error) {
      console.error("Error updating dorm:", error);
      alert(error.message);
    }
  };

  return (
    <Container>
      {!selectedDormId ? (
        <>
          <h2>Pasirinkite bendrabutį redagavimui</h2>
          {/* Return Button */}
          <Button variant="secondary" onClick={() => navigate(-1)} className="mb-3">
            Grįžti atgal
          </Button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Numeris</th>
                <th>Adresas</th>
                <th>Kambarių skaičius</th>
                <th>Veiksmai</th>
              </tr>
            </thead>
            <tbody>
              {dorms.map((dorm) => (
                <tr key={dorm.id}>
                  <td>{dorm.number}</td>
                  <td>{dorm.address}</td>
                  <td>{dorm.room_count}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => handleDormSelect(dorm.id)}
                    >
                      Redaguoti
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : loading ? (
        <p>Kraunama...</p>
      ) : (
        <>
          <DormForm
            onSubmit={handleSubmit}
            submitButtonText="Išsaugoti pakeitimus"
            title="Redaguoti bendrabutį"
            initialValues={initialValues}
          />
          {/* Return Button */}
          <Button
            variant="secondary"
            onClick={() => setSelectedDormId(null)}
            className="mt-3"
          >
            Grįžti atgal
          </Button>
        </>
      )}
    </Container>
  );
};

export default DormEdit;