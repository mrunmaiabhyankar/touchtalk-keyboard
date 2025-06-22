import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";

interface PageHeadingProps {
  title: string;
  onExit?: () => void;
}

const PageHeading: React.FC<PageHeadingProps> = ({ title, onExit }) => {
  const navigate = useNavigate();

  return (
    <header className="page-heading">
      <button  className="nav-btn" aria-label="Go back" onClick={() => navigate(-1)}>
        <ArrowLeft size={28} />
      </button>
      <h1 className="page-title">{title}</h1>
      <button className="nav-btn" aria-label="Exit tutorial" onClick={onExit}>
        <X size={28} />
      </button>
    </header>
  );
};

export default PageHeading;
