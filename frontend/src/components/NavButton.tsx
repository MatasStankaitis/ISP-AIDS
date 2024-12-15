import { FC } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

interface NavButtonProps {
  to: string;
  variant?: string;
  children: React.ReactNode;
}

const NavButton: FC<NavButtonProps> = ({ to, variant = "primary", children }) => (
  <Link to={to}>
    <Button variant={variant}>{children}</Button>
  </Link>
);

export default NavButton;