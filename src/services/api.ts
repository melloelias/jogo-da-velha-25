const API_URL = "https://api-jogo-da-velha-lovable.atelie.app.br";

export type Game = {
  id: string;
  winner_name: string | null;
  created_at: string;
};

export const getGames = async (): Promise<Game[]> => {
  try {
    const response = await fetch(`${API_URL}/games`);
    if (!response.ok) {
      throw new Error("Failed to fetch games");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching games:", error);
    throw new Error("Failed to fetch games");
  }
};

export const createGame = async (player1: string, player2: string): Promise<Game> => {
  try {
    const response = await fetch(`${API_URL}/games`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ player1_name: player1, player2_name: player2 }),
    });
    
    if (!response.ok) {
      throw new Error("Failed to create game");
    }
    
    return response.json();
  } catch (error) {
    console.error("Error creating game:", error);
    throw new Error("Failed to create game");
  }
};

export const updateGame = async (gameId: string, winner: string): Promise<Game> => {
  try {
    const response = await fetch(`${API_URL}/games/${gameId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ winner_name: winner }),
    });
    
    if (!response.ok) {
      throw new Error("Failed to update game");
    }
    
    return response.json();
  } catch (error) {
    console.error("Error updating game:", error);
    throw new Error("Failed to update game");
  }
};