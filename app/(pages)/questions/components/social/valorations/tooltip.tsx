"use client"
import { useEffect, useRef, useState } from "react";
interface TooltipProps {
    content: React.ReactNode;
    children: React.ReactNode;
  }

export default function Tooltip ({content,children}:TooltipProps){ 
    const [isHovered, setIsHovered] = useState(false);
    const tooltipRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleTooltipMouseEnter = () => {
    setIsHovered(true);
  };

  const handleTooltipMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    if (tooltipRef.current) {
      tooltipRef.current.addEventListener("mouseenter", handleTooltipMouseEnter);
      tooltipRef.current.addEventListener("mouseleave", handleTooltipMouseLeave);

      return () => {
        tooltipRef.current!.removeEventListener("mouseenter", handleTooltipMouseEnter);
        tooltipRef.current!.removeEventListener("mouseleave", handleTooltipMouseLeave);
      };
    }
  }, []);

  return (
    <div className="relative inline-block" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div>
        {children}
      </div>
      {isHovered && (
        <div ref={tooltipRef} className="absolute bottom-0 mb-6">
          {content}
        </div>
      )}
    </div>
  );
};