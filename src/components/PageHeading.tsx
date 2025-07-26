import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";

interface PageHeadingProps {
  title: string;
  onExit?: () => void;
  focusRef: React.RefObject<HTMLHeadingElement | null>;
}

const PageHeading: React.FC<PageHeadingProps> = ({ title, onExit, focusRef }) => {
  const navigate = useNavigate();
  const headingRef = focusRef;
  const location = useLocation();

 useEffect(() => {
    // Wait until after screen transition
    const timeout = setTimeout(() => {
      if (headingRef.current) {
        headingRef.current.focus();
      }
    }, 100); // Slight delay helps on mobile

    return () => clearTimeout(timeout);
  }, [location.pathname]); // Re-focus on route change

  return (
    <div  className="page-heading">
      <button  className="nav-btn" aria-label="Go back" onClick={() => navigate(-1)}>
        <ArrowLeft size={28} />
      </button>
      <h1 ref={headingRef} className="page-title" tabIndex={0}>{title}</h1>
      <button className="nav-btn" aria-label="Exit" onClick={onExit}>
        <X size={28} />
      </button>
    </div>
  );
};

export default PageHeading;
