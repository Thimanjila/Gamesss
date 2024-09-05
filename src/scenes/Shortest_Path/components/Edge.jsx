import React, { useState } from "react";

const Edge = ({
  index,
  x1,
  y1,
  x2,
  y2,
  length,
  onMouseEnter,
  onMouseLeave,
  highlightedEdges,
  isInPath = false,
}) => {
  const isHovered = highlightedEdges.has(index);
  const isHoverState = highlightedEdges.size > 0;

  const lineStyle = {
    transition: "stroke-width 0.3s, stroke 0.3s",
    cursor: isHovered ? "pointer" : "default",
    opacity: isHoverState && !isHovered ? 0.3 : 1,
  };

  const getStrokeColor = () => {
    if (isHovered) return "red";
    if (isInPath) return "#ffaa00";
    return isHoverState ? "grey" : "black";
  };
  const getStrokeWidth = () => {
    if (isHovered) return 6;
    if (isInPath) return 6;
    return 3;
  }

  const textStyle = {
    fontSize: isHovered ? "1.2em" : "1em",
    fontWeight: isHovered ? "bold" : "normal",
    transition: "transform 0.3s",
    cursor: "pointer",
    opacity: isHoverState && !isHovered ? 0.3 : 1,
  };
  const textDx = isHovered ? "10" : "5";
  const textDy = isHovered ? "10" : "3";
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;

  return (
    <g onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={getStrokeColor()}
        strokeWidth={getStrokeWidth()}
        style={lineStyle}
      />
      <text
        x={midX}
        y={midY}
        fill="black"
        dx={`${textDx}px`}
        dy={`${textDy}px`}
        style={textStyle}
      >
        {length}
      </text>
    </g>
  );
};

export default Edge;


