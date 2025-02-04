import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

type Game = {
  id: string;
  winner_name: string | null;
  created_at: string;
};

type SortConfig = {
  key: keyof Game | null;
  direction: 'asc' | 'desc';
};

export const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [search, setSearch] = useState("");
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

  return {
    games: filteredGames,
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    sortConfig,
    handleSort,
  };
};