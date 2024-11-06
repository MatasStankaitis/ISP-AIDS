import { FC } from "react";
import { ListGroup, Button, Collapse } from "react-bootstrap";

interface Request {
  text: string;
  type: string;
  approved: boolean | null;
  timeCreated: string;
}

interface RequestListProps {
  requests: Request[];
  expandedRequest: number | null;
  onToggleExpand: (index: number) => void;
  onApprove: (index: number, approved: boolean) => void;
}

const RequestList: FC<RequestListProps> = ({
  requests,
  expandedRequest,
  onToggleExpand,
  onApprove,
}) => (
  <ListGroup>
    {requests.map((request, index) => (
      <ListGroup.Item key={index} onClick={() => onToggleExpand(index)}>
        <div>
          <strong>{request.type}</strong>: {request.text}
        </div>
        <Collapse in={expandedRequest === index}>
          <div>
            <p>Laikas sukurtas: {request.timeCreated}</p>
            <div>
              {request.approved === null ? (
                <>
                  <Button
                    variant="success"
                    onClick={(e) => {
                      e.stopPropagation();
                      onApprove(index, true);
                    }}
                  >
                    Patvirtinti
                  </Button>
                  <Button
                    variant="danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      onApprove(index, false);
                    }}
                  >
                    Atmesti
                  </Button>
                </>
              ) : request.approved ? (
                <span style={{ color: "green" }}>Patvirtinta</span>
              ) : (
                <span style={{ color: "red" }}>Atmesta</span>
              )}
            </div>
          </div>
        </Collapse>
      </ListGroup.Item>
    ))}
  </ListGroup>
);

export default RequestList;