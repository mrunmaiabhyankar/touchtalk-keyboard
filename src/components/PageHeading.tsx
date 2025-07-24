import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";

interface PageHeadingProps {
  title: string;
  onExit?: () => void;
  ref: React.RefObject<HTMLHeadingElement | null>;
}

const PageHeading: React.FC<PageHeadingProps> = ({ title, onExit, ref }) => {
  const navigate = useNavigate();
  const headingRef = ref;

  useEffect(() => {
        if (headingRef.current) {
          headingRef.current.focus();
        }
      }, []);

  return (
    <div  className="page-heading">
      <button  className="nav-btn" aria-label="Go back" onClick={() => navigate(-1)}>
        <ArrowLeft size={28} />
      </button>
      <h1 ref={headingRef} className="page-title">{title}</h1>
      <button className="nav-btn" aria-label="Exit tutorial" onClick={onExit}>
        <X size={28} />
      </button>
    </div>
  );
};

export default PageHeading;
