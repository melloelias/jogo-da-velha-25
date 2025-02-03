import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Circle } from "lucide-react";

interface PlayerFormProps {
  onStart: (player1: string, player2: string) => void;
}

const PlayerForm = ({ onStart }: PlayerFormProps) => {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (player1.trim() && player2.trim()) {
      onStart(player1.trim(), player2.trim());
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Enter Player Names</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <X className="w-5 h-5" />
              <Input
                placeholder="Player 1 Name"
                value={player1}
                onChange={(e) => setPlayer1(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Circle className="w-5 h-5" />
              <Input
                placeholder="Player 2 Name"
                value={player2}
                onChange={(e) => setPlayer2(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={!player1.trim() || !player2.trim()}
          >
            Start Game
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PlayerForm;