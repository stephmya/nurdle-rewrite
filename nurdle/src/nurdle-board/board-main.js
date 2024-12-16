import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import chutesImage from "./chutes.PNG";
import NumberGuess from "./number-guess";

// Ladder and chute mappings
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

const movesByGuesses = {
  1: 12,
  2: 10,
  3: 8,
  4: 6,
  5: 4,
  6: 2,
};

const BoardMain = () => {
  const [playerPosition, setPlayerPosition] = useState(1);
  const [rngPlayerPosition, setRngPlayerPosition] = useState(1);
  const [guessesTaken, setGuessesTaken] = useState(null);
  const [correctGuess, setCorrectGuess] = useState(false);
  const [winner, setWinner] = useState(null);

  //p1 guesses
  const handleGuessesTaken = (guesses) => {
    console.log(`Player 1 guesses taken: ${guesses}`);
    setGuessesTaken(guesses);

    const moves = movesByGuesses[guesses] || 0;
    let newPosition = playerPosition + moves;

    if (ladders[newPosition]) newPosition = ladders[newPosition];
    if (chutes[newPosition]) newPosition = chutes[newPosition];

    // Pause before moving the player to let the correct answer be displayed
    setCorrectGuess(true);
    setTimeout(() => {
      setPlayerPosition(Math.min(newPosition, 100));
      setCorrectGuess(false);

      if (Math.min(newPosition, 100) === 100) {
        setWinner("Player 1");
      }
    }, 1500); //pause
  };

  //RNG Player move logic
  const handleRngPlayerMove = () => {
    const rngMoves = Math.floor(Math.random() * 12) + 1; //1-12
    let newPosition = rngPlayerPosition + rngMoves;

    if (ladders[newPosition]) newPosition = ladders[newPosition];
    if (chutes[newPosition]) newPosition = chutes[newPosition];

    setRngPlayerPosition(Math.min(newPosition, 100));

    if (Math.min(newPosition, 100) === 100) {
      setWinner("RNG Player");
    }
  };

  const getPlayerPosition = (position) => {
    const row = 9 - Math.floor((position - 1) / 10);
    const col =
      row % 2 === 0
        ? 9 - ((position - 1) % 10) //even
        : (position - 1) % 10; //odd

    return {
      top: `calc(${row * 10}% + 22px)`,
      left: `calc(${col * 10}% + 25px)`,
    };
  };

  const resetGame = () => {
    setPlayerPosition(1);
    setRngPlayerPosition(1);
    setGuessesTaken(null);
    setWinner(null);
  };

  return (
    <Box sx={{ position: "relative", width: 500, height: 500, margin: "auto" }}>
      {winner && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {winner} Wins!
          </Typography>
        </Box>
      )}
      <img
        src={chutesImage}
        alt="Chutes and Ladders Board"
        style={{ width: "100%", height: "100%" }}
      />

      {/* //Player 1 Icon */}
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
          ...getPlayerPosition(playerPosition),
        }}
      >
        ☻
      </Box>

      {/* //RNG Player Icon */}
      <Box
        sx={{
          position: "absolute",
          width: 30,
          height: 30,
          borderRadius: "50%",
          backgroundColor: "red",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.5rem",
          transform: "translate(-50%, -50%)",
          ...getPlayerPosition(rngPlayerPosition),
        }}
      >
        ☻
      </Box>

      {/* // Game UI */}
      <Box sx={{ textAlign: "center", marginTop: 2 }}>
        <Typography variant="h6">
          Player 1 Position: {playerPosition}
        </Typography>
        <Typography variant="h6">
          RNG Player Position: {rngPlayerPosition}
        </Typography>

        {!winner && <NumberGuess onGuessesTaken={handleGuessesTaken} />}
        <Button
          variant="contained"
          sx={{ marginTop: 2 }}
          onClick={handleRngPlayerMove}
          disabled={!!winner}
        >
          RNG Player Move (RED)
        </Button>

        <Button
          variant="contained"
          sx={{ marginTop: 2, marginLeft: 2 }}
          onClick={resetGame}
        >
          Reset Whole Game
        </Button>
      </Box>
    </Box>
  );
};

export default BoardMain;
