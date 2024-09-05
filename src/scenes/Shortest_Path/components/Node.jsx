import React from "react";
import { useTheme } from "@mui/material/styles";

const darkenHex = (colorStr) => {
    // if not hex color string, return
    if (!colorStr.match(/^#[0-9A-F]{6}$/i)) return colorStr;
    // remove hash
    colorStr = colorStr.slice(1);
    // convert to rgb
    let r = parseInt(colorStr.slice(0, 2), 16);
    let g = parseInt(colorStr.slice(2, 4), 16);
    let b = parseInt(colorStr.slice(4, 6), 16);
    // darken
    r = Math.floor(r * 0.8);
    g = Math.floor(g * 0.8);
    b = Math.floor(b * 0.8);
    // convert back to hex
    r = r.toString(16).padStart(2, "0");
    g = g.toString(16).padStart(2, "0");
    b = b.toString(16).padStart(2, "0");
    return `#${r}${g}${b}`;
}

const Node = ({
  x,
  y,
  text,
  type = "default",
  onMouseEnter,
  onMouseLeave,
  onClick,
  isHovered,
  isInPath = false,
}) => {
  const theme = useTheme();

  const getFillColor = () => {
    switch (type) {
      case "start":
        return theme.palette.primary.main;
      case "end":
        return theme.palette.secondary.main;
      default:
        return "#ADD8E6";
    }
  };

  const nodeStyle = {
    transition: "fill 0.3s",
    stroke: isInPath ? "#ffaa00" : "none",
  };

  return (
    <g
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={{ cursor: isHovered ? "pointer" : "default"}}
    >
      <circle cx={x} cy={y} r={20} fill={isHovered ? darkenHex(getFillColor()) : getFillColor()} style={nodeStyle} strokeWidth={isInPath ? 6 : 0} />
      <text x={x} y={y} dy=".3em" textAnchor="middle" fill="black">
        {text}
      </text>
    </g>
  );
};

export default Node;
