import { Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

type Game = {
  id: string;
  winner_name: string | null;
  created_at: string;
};

type SortConfig = {
  key: keyof Game | null;
  direction: 'asc' | 'desc';
};

type RankingTableProps = {
  games: Game[];
  sortConfig: SortConfig;
  onSort: (key: keyof Game) => void;
};

export const RankingTable = ({ games, sortConfig, onSort }: RankingTableProps) => {
  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 px-2 sm:px-4"></TableHead>
            <TableHead className="min-w-[120px]">
              <Button
                variant="ghost"
                onClick={() => onSort('winner_name')}
                className="font-semibold hover:text-primary"
              >
                Vencedor
              </Button>
            </TableHead>
            <TableHead className="min-w-[100px]">
              <Button
                variant="ghost"
                onClick={() => onSort('created_at')}
                className="font-semibold hover:text-primary"
              >
                Data
              </Button>
            </TableHead>
            <TableHead className="min-w-[80px]">
              <Button
                variant="ghost"
                onClick={() => onSort('created_at')}
                className="font-semibold hover:text-primary"
              >
                Hora
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {games.map((game) => {
            const date = new Date(game.created_at);
            return (
              <TableRow key={game.id}>
                <TableCell className="px-2 sm:px-4">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                </TableCell>
                <TableCell className="font-medium">
                  {game.winner_name}
                </TableCell>
                <TableCell>{format(date, "dd/MM/yyyy")}</TableCell>
                <TableCell>{format(date, "HH:mm")}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};