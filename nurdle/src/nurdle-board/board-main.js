import React, { useRef, useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import chutesImage from "./chutes.PNG";

//yum
const ladders = {
  1: 38,
  4: 14,
  9: 31,
  21: 42,
  28: 84,
  36: 44,
  51: 67,
  71: 91,
  80: 100,
};
const chutes = {
  16: 6,
  47: 26,
  49: 11,
  56: 53,
  62: 19,
  64: 60,
  87: 24,
  93: 73,
  95: 75,
  98: 78,
};

const BoardMain = () => {
  const [playerPosition, setPlayerPosition] = useState(1);

  const moveTest = () => {
    let newPosition = playerPosition + Math.floor(Math.random() * 12) + 1; //rand 1-12 spaces
    if (ladders[newPosition]) newPosition = ladders[newPosition];
    if (chutes[newPosition]) newPosition = chutes[newPosition];
    setPlayerPosition(Math.min(newPosition, 100));
  };

  const getPlayerPosition = () => {
    const row = 9 - Math.floor((playerPosition - 1) / 10);
    const col =
      row % 2 === 0
        ? 9 - ((playerPosition - 1) % 10) //even rows
        : (playerPosition - 1) % 10; //odd rows

    return {
      top: `calc(${row * 10}% + 22px)`,
      left: `calc(${col * 10}% + 25px)`,
    };
  };

  return (
    <Box sx={{ position: "relative", width: 500, height: 500, margin: "auto" }}>
      <img
        src={chutesImage}
        alt="Chutes and Ladders Board"
        style={{ width: "100%", height: "100%" }}
      />

      <Box
        sx={{
          position: "absolute",
          width: 30,
          height: 30,
          borderRadius: "50%",
          backgroundColor: "blue",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.5rem",
          transform: "translate(-50%, -50%)",
          ...getPlayerPosition(),
        }}
      >
        ☻
      </Box>

      {/* //debussy */}
      <Box sx={{ textAlign: "center", marginTop: 2 }}>
        <Typography variant="h6">Current Position: {playerPosition}</Typography>

        <Button variant="contained" sx={{ marginTop: 2 }} onClick={moveTest}>
          Move Test (1-12 Spaces)
        </Button>

        <Button
          variant="contained"
          sx={{ marginTop: 2, marginLeft: 2 }}
          onClick={() => setPlayerPosition(1)}
        >
          Reset Position
        </Button>
      </Box>
    </Box>
  );
};

export default BoardMain;
