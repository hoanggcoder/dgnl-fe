export const COLORS = {
    DGNL_GREEN: "#066506",
    DGNL_RED: "#fa0404",
    DGNL_GRAY: "#7b7c7b"
  };
  
  export function getColorName(color) {
    return Object.keys(COLORS).find(key => COLORS[key] === color) || "Unknown Color";
  }