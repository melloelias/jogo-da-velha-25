import { useState } from "react";
import PlayerForm from "@/components/PlayerForm";
import GameBoard from "@/components/GameBoard";
import WinnerModal from "@/components/WinnerModal";
import { useToast } from "@/components/ui/use-toast";
import { saveGame } from "@/services/api";

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
        title: "Erro",
        description: "Os jogadores precisam ter nomes diferentes",
        variant: "destructive",
      });
      return;
    }

    setGameState({ player1, player2, started: true });
  };

  const handleWin = async (winner: string) => {
    setWinner(winner);
    
    try {
      await saveGame({
        player1: gameState.player1,
        player2: gameState.player2,
        winner,
      });
    } catch (error) {
      console.error("Error saving game result:", error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar o resultado do jogo",
        variant: "destructive",
      });
    }
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