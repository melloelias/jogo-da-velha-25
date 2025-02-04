import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { useEffect } from "react";

interface WinnerModalProps {
  winner: string | null;
  onNewGame: () => void;
}

const WinnerModal = ({ winner, onNewGame }: WinnerModalProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (winner) {
      // Play applause sound
      try {
        const audio = new Audio("/applause.mp3");
        audio.volume = 1.0;
        audio.play().catch((error) => {
          console.error("Error playing audio:", error);
        });

        // Trigger confetti
        const duration = 3 * 1000;
        const end = Date.now() + duration;

        const colors = ["#0d4bbd", "#ea384c", "#FFD700"];

        (function frame() {
          confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors,
          });
          confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors,
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        })();
      } catch (error) {
        console.error("Error setting up audio:", error);
      }
    }
  }, [winner]);

  if (!winner) return null;

  return (
    <Dialog open={!!winner} onOpenChange={() => onNewGame()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center flex flex-col items-center gap-4">
            <Trophy className="w-12 h-12 text-yellow-500 animate-bounce" />
            <span className="animate-fade-in">Parabéns, {winner}!</span>
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