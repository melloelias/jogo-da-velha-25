import { useState } from "react";
import PlayerForm from "@/components/PlayerForm";
import GameBoard from "@/components/GameBoard";
import WinnerModal from "@/components/WinnerModal";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [gameState, setGameState] = useState<{
    player1: string;
    player2: string;
    started: boolean;
    gameId?: string;
  }>({
    player1: "",
    player2: "",
    started: false,
  });
  const [winner, setWinner] = useState<string | null>(null);
  const { toast } = useToast();

  const handleStart = async (player1: string, player2: string) => {
    if (player1 === player2) {
      toast({
        title: "Error",
        description: "Players must have different names",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from("games")
        .insert({
          player1_name: player1,
          player2_name: player2,
        })
        .select()
        .single();

      if (error) throw error;

      setGameState({ 
        player1, 
        player2, 
        started: true,
        gameId: data.id 
      });
    } catch (error) {
      console.error("Error creating game:", error);
      toast({
        title: "Error",
        description: "Failed to start the game. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleWin = async (winner: string) => {
    setWinner(winner);
    
    if (gameState.gameId) {
      try {
        const { error } = await supabase
          .from("games")
          .update({ winner_name: winner })
          .eq("id", gameState.gameId);

        if (error) throw error;
      } catch (error) {
        console.error("Error updating winner:", error);
        toast({
          title: "Error",
          description: "Failed to save the game result. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleNewGame = () => {
    setWinner(null);
    setGameState({ player1: "", player2: "", started: false });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="container max-w-4xl mx-auto">
        {!gameState.started ? (
          <div className="flex justify-center">
            <PlayerForm onStart={handleStart} />
          </div>
        ) : (
          <div className="flex justify-center">
            <GameBoard
              player1={gameState.player1}
              player2={gameState.player2}
              onWin={handleWin}
            />
          </div>
        )}
        <WinnerModal winner={winner} onNewGame={handleNewGame} />
      </div>
    </div>
  );
};

export default Index;
