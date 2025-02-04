import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { RankingHeader } from "@/components/ranking/RankingHeader";
import { RankingTable } from "@/components/ranking/RankingTable";
import { RankingPagination } from "@/components/ranking/RankingPagination";
import { useGames } from "@/hooks/useGames";
import { useExport } from "@/hooks/useExport";

const ITEMS_PER_PAGE = 8;

const Ranking = () => {
  const {
    games: filteredGames,
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    sortConfig,
    handleSort,
  } = useGames();

  const { exportData } = useExport(filteredGames);

  const totalPages = Math.ceil(filteredGames.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedGames = filteredGames.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen pt-20 px-4 pb-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="px-4 sm:px-6">
          <RankingHeader onExport={exportData} />
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
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
        <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4 sm:px-6">
          <div className="text-sm text-muted-foreground order-2 sm:order-1">
            Total de registros: {filteredGames.length}
          </div>
          <div className="w-full sm:w-auto order-1 sm:order-2">
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