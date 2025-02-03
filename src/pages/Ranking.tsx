import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { RankingHeader } from "@/components/ranking/RankingHeader";
import { RankingTable } from "@/components/ranking/RankingTable";
import { RankingPagination } from "@/components/ranking/RankingPagination";
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

const ITEMS_PER_PAGE = 8;

const Ranking = () => {
  const [search, setSearch] = useState("");
  const [games, setGames] = useState<Game[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ 
    key: 'created_at', 
    direction: 'desc' 
  });

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    const { data, error } = await supabase
      .from("games")
      .select("*")
      .not("winner_name", "is", null)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching games:", error);
      return;
    }

    setGames(data || []);
  };

  const handleSort = (key: keyof Game) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const exportData = (format: 'csv' | 'xls' | 'pdf') => {
    const data = filteredGames.map(game => ({
      Vencedor: game.winner_name,
      Data: format(new Date(game.created_at), "yyyy-MM-dd"),
      Hora: format(new Date(game.created_at), "HH:mm"),
    }));

    if (format === 'csv' || format === 'xls') {
      const headers = ['Vencedor', 'Data', 'Hora'];
      const separator = format === 'csv' ? ',' : '\t';
      const fileExtension = format === 'csv' ? 'csv' : 'xls';
      
      const csvContent = [
        headers.join(separator),
        ...data.map(row => Object.values(row).join(separator))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/plain;charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `ranking.${fileExtension}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (format === 'pdf') {
      console.log('Exportação PDF ainda não implementada');
    }
  };

  const sortedGames = [...games].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue === null || bValue === null) return 0;
    
    const comparison = aValue > bValue ? 1 : -1;
    return sortConfig.direction === "asc" ? comparison : -comparison;
  });

  const filteredGames = sortedGames.filter((game) =>
    game.winner_name?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredGames.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedGames = filteredGames.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen pt-20 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <RankingHeader onExport={exportData} />
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              placeholder="Buscar vencedores..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <RankingTable 
            games={paginatedGames}
            sortConfig={sortConfig}
            onSort={handleSort}
          />
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Total de registros: {filteredGames.length}
          </div>
          <div className="ml-auto">
            <RankingPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Ranking;