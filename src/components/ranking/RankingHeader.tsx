import { Trophy, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CardTitle } from "@/components/ui/card";

type RankingHeaderProps = {
  onExport: (format: 'csv' | 'xls' | 'pdf') => void;
};

export const RankingHeader = ({ onExport }: RankingHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <CardTitle className="flex items-center gap-2">
        <Trophy className="w-6 h-6 text-yellow-500" />
        <span>Ranking de Vencedores</span>
      </CardTitle>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => onExport('csv')}>
            CSV
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onExport('xls')}>
            Excel
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onExport('pdf')}>
            PDF
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};