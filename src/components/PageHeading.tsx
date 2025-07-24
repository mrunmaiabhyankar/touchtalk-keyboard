import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";

interface PageHeadingProps {
  title: string;
  onExit?: () => void;
  ref: React.RefObject<HTMLHeadingElement | null>;
}

const PageHeading: React.FC<PageHeadingProps> = ({ title, onExit, ref }) => {
  const navigate = useNavigate();
  const headingRef = ref;
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
      <h1 ref={headingRef} className="page-title">{title}</h1>
      <button className="nav-btn" aria-label="Exit tutorial" onClick={onExit}>
        <X size={28} />
      </button>
    </div>
  );
};

export default PageHeading;
