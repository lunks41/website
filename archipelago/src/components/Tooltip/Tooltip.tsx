import React from 'react';
import './Tooltip.scss';


interface TooltipProps {
  x: number;
  y: number;
  text: string;
}

const Tooltip: React.FC<TooltipProps> = ({ x, y, text }) => {
  return (
    <div className="tooltip" style={{ left: x, top: y }}>
      {text}
    </div>
  );
};

export default Tooltip;
