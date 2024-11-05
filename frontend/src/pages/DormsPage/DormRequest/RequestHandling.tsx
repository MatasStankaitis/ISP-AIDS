import { useState, ChangeEvent, FormEvent } from "react";
import { Container } from "react-bootstrap";
import RequestForm from "./RequestForm";
import RequestList from "./RequestList";

interface Request {
  text: string;
  type: string;
  approved: boolean | null;
  timeCreated: string;
}

const RequestHandling = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [newRequest, setNewRequest] = useState<string>("");
  const [requestType, setRequestType] = useState<string>("");
  const [expandedRequest, setExpandedRequest] = useState<number | null>(null);

  const handleAddRequest = (e: FormEvent) => {
    e.preventDefault();
    const newRequestObj: Request = {
      text: newRequest,
      type: requestType,
      approved: null,
      timeCreated: new Date().toLocaleString(),
    };
    setRequests([...requests, newRequestObj]);
    setNewRequest("");
    setRequestType("");
  };

  const handleApproval = (index: number, approved: boolean) => {
    const updatedRequests = requests.map((request, i) =>
      i === index ? { ...request, approved } : request
    );
    setRequests(updatedRequests);
  };

  const toggleExpand = (index: number) => {
    setExpandedRequest(expandedRequest === index ? null : index);
  };

  return (
    <Container>
      <h1>Prašymų valdymas</h1>
      <RequestForm
        newRequest={newRequest}
        requestType={requestType}
        onRequestChange={(e: ChangeEvent<HTMLInputElement>) => setNewRequest(e.target.value)}
        onTypeChange={(e: ChangeEvent<HTMLSelectElement>) => setRequestType(e.target.value)}
        onSubmit={handleAddRequest}
      />
      <h2>Prašymų sąrašas</h2>
      <RequestList
        requests={requests}
        expandedRequest={expandedRequest}
        onToggleExpand={toggleExpand}
        onApprove={handleApproval}
      />
    </Container>
  );
};

export default RequestHandling;