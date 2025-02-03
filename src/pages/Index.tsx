import { useState } from "react";
import PlayerForm from "@/components/PlayerForm";
import GameBoard from "@/components/GameBoard";
import WinnerModal from "@/components/WinnerModal";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [gameState, setGameState] = useState<{
    player1: string;
    player2: string;
    started: boolean;
  }>({
    player1: "",
    player2: "",
    started: false,
  });
  const [winner, setWinner] = useState<string | null>(null);
  const { toast } = useToast();

  const handleStart = (player1: string, player2: string) => {
    if (player1 === player2) {
      toast({
        title: "Error",
        description: "Players must have different names",
        variant: "destructive",
      });
      return;
    }
    setGameState({ player1, player2, started: true });
  };

  const handleWin = (winner: string) => {
    setWinner(winner);
    // Here we would save the winner to the ranking
  };

  const handleNewGame = () => {
    setWinner(null);
    setGameState({ player1: "", player2: "", started: false });
  };

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        {!gameState.started ? (
          <PlayerForm onStart={handleStart} />
        ) : (
          <GameBoard
            player1={gameState.player1}
            player2={gameState.player2}
            onWin={handleWin}
          />
        )}
        <WinnerModal winner={winner} onNewGame={handleNewGame} />
      </div>
    </div>
  );
};

export default Index;