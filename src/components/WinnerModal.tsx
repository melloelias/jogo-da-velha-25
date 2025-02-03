import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface WinnerModalProps {
  winner: string | null;
  onNewGame: () => void;
}

const WinnerModal = ({ winner, onNewGame }: WinnerModalProps) => {
  const navigate = useNavigate();

  if (!winner) return null;

  return (
    <Dialog open={!!winner} onOpenChange={() => onNewGame()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center flex flex-col items-center gap-4">
            <Trophy className="w-12 h-12 text-yellow-500" />
            <span>Parabéns, {winner}!</span>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 mt-4">
          <Button onClick={onNewGame}>Novo Jogo</Button>
          <Button variant="outline" onClick={() => navigate("/ranking")}>
            Ver Ranking
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WinnerModal;