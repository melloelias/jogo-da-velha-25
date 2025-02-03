import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

type Game = {
  id: string;
  winner_name: string | null;
  created_at: string;
};

const Ranking = () => {
  const [search, setSearch] = useState("");
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
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

    fetchGames();
  }, []);

  const filteredGames = games.filter((game) =>
    game.winner_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-20 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <span>Ranking de Vencedores</span>
          </CardTitle>
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
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Vencedor</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Hora</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGames.map((game) => {
                  const date = new Date(game.created_at);
                  return (
                    <TableRow key={game.id}>
                      <TableCell>
                        <Trophy className="w-4 h-4 text-yellow-500" />
                      </TableCell>
                      <TableCell className="font-medium">
                        {game.winner_name}
                      </TableCell>
                      <TableCell>{format(date, "yyyy-MM-dd")}</TableCell>
                      <TableCell>{format(date, "HH:mm")}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Ranking;