import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Circle } from "lucide-react";

interface GameBoardProps {
  player1: string;
  player2: string;
  onWin: (winner: string) => void;
}

type Player = "X" | "O";
type Board = (Player | null)[];

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
];

const GameBoard = ({ player1, player2, onWin }: GameBoardProps) => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [winningCells, setWinningCells] = useState<number[]>([]);

  const handleClick = (index: number) => {
    if (board[index] || winningCells.length > 0) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  useEffect(() => {
    const checkWinner = () => {
      for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          setWinningCells(combination);
          onWin(board[a] === "X" ? player1 : player2);
          return;
        }
      }
    };

    checkWinner();
  }, [board, player1, player2, onWin]);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">
          {currentPlayer === "X" ? (
            <div className="flex items-center justify-center gap-2">
              <X className="w-5 h-5" />
              <span>{player1}'s Turn</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Circle className="w-5 h-5" />
              <span>{player2}'s Turn</span>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="game-board">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className={`game-cell ${winningCells.includes(index) ? "winning" : ""}`}
              disabled={!!cell || winningCells.length > 0}
            >
              {cell === "X" ? (
                <X className="w-8 h-8" />
              ) : cell === "O" ? (
                <Circle className="w-8 h-8" />
              ) : null}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GameBoard;