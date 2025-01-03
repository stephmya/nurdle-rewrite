import React, { useRef, useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

const NumberGuess = ({ onGuessesTaken }) => {
  const [chipRows, setChipRows] = useState([Array(3).fill("")]);
  const [result, setResult] = useState("");
  const [randomNumber, setRandomNumber] = useState("");
  const [rowColors, setRowColors] = useState([Array(3).fill(null)]);
  const inputRefs = useRef([Array(3).fill(null)]);

  //reset game state
  const resetGame = () => {
    setChipRows([Array(3).fill("")]);
    setRowColors([Array(3).fill(null)]);
    setResult("");
    const newRandomNumber = String(Math.floor(100 + Math.random() * 900));
    console.log("New Generated Number:", newRandomNumber);
    setRandomNumber(newRandomNumber);
  };

  useEffect(() => {
    resetGame();
  }, []);

  const handleChipChange = (rowIndex, chipIndex, value) => {
    if (!/^\d?$/.test(value)) return;

    const newRows = [...chipRows];
    newRows[rowIndex][chipIndex] = value;
    setChipRows(newRows);

    if (value && chipIndex < newRows[rowIndex].length - 1) {
      inputRefs.current[rowIndex][chipIndex + 1]?.focus();
    }
  };

  const handleKeyDown = (event, rowIndex) => {
    if (event.key === "Enter") {
      const currentRow = chipRows[rowIndex];

      if (currentRow.some((val) => val === "")) {
        setResult("Fill all 3 digits first.");
        return;
      }

      const enteredNumber = currentRow.join("");
      const colors = Array(3).fill(null);
      const randomNumberArray = randomNumber.split("");
      const randomNumberCheck = [...randomNumberArray];

      currentRow.forEach((digit, index) => {
        if (digit === randomNumberArray[index]) {
          colors[index] = "green";
          randomNumberCheck[index] = null;
        }
      });

      currentRow.forEach((digit, index) => {
        if (
          digit !== randomNumberArray[index] &&
          randomNumberCheck.includes(digit)
        ) {
          colors[index] = "orange";
          randomNumberCheck[randomNumberCheck.indexOf(digit)] = null;
        }
      });

      const newRowColors = [...rowColors];
      newRowColors[rowIndex] = colors;
      setRowColors(newRowColors);

      if (enteredNumber === randomNumber) {
        setResult("Correct! You guessed the number!");
        onGuessesTaken(rowIndex + 1);
        resetGame();
      } else {
        if (chipRows.length < 6) {
          setChipRows([...chipRows, Array(3).fill("")]);
          inputRefs.current.push(Array(3).fill(null));
          setRowColors([...newRowColors, Array(3).fill(null)]);

          setTimeout(() => {
            inputRefs.current[chipRows.length][0]?.focus();
          }, 0);
        } else {
          setResult(`The correct number was ${randomNumber}.`);
          resetGame();
        }
      }
    } else if (
      event.key === "Backspace" &&
      !chipRows[rowIndex][event.target.dataset.index] &&
      event.target.dataset.index > 0
    ) {
      const previousIndex = parseInt(event.target.dataset.index, 10) - 1;
      inputRefs.current[rowIndex][previousIndex]?.focus();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        padding: 2,
      }}
    >
      <Typography variant="h6" textAlign="center" sx={{ marginBottom: 2 }}>
        Guess the 3 digit number
      </Typography>
      {chipRows.map((chips, rowIndex) => (
        <Box key={rowIndex} sx={{ display: "flex", gap: 1 }}>
          {chips.map((value, chipIndex) => (
            <Box
              key={chipIndex}
              sx={{
                width: 50,
                height: 50,
                borderRadius: 2,
                backgroundColor:
                  rowColors[rowIndex]?.[chipIndex] === "green"
                    ? "green"
                    : rowColors[rowIndex]?.[chipIndex] === "orange"
                    ? "orange"
                    : "#f0f0f0",
                color:
                  rowColors[rowIndex]?.[chipIndex] === "green" ||
                  rowColors[rowIndex]?.[chipIndex] === "orange"
                    ? "white"
                    : "black",
              }}
            >
              <input
                ref={(el) => {
                  if (!inputRefs.current[rowIndex]) {
                    inputRefs.current[rowIndex] = [];
                  }
                  inputRefs.current[rowIndex][chipIndex] = el;
                }}
                type="text"
                value={value}
                onChange={(e) =>
                  handleChipChange(rowIndex, chipIndex, e.target.value)
                }
                onKeyDown={(e) => handleKeyDown(e, rowIndex)}
                maxLength={1}
                data-index={chipIndex}
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  outline: "none",
                  textAlign: "center",
                  background: "transparent",
                  fontSize: "1.5rem",
                  fontFamily: "inherit",
                  color: "inherit",
                }}
              />
            </Box>
          ))}
        </Box>
      ))}
      <Typography variant="h6" textAlign="center">
        {result}
      </Typography>
    </Box>
  );
};

export default NumberGuess;
