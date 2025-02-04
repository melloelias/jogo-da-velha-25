const API_URL = "https://api-jogo-da-velha-lovable.atelie.app.br";
const CORS_PROXY = "https://corsproxy.io/?"

export const saveGame = async (gameData: {
  player1: string;
  player2: string;
  winner: string;
}) => {
  try {
    const response = await fetch(`${CORS_PROXY}${encodeURIComponent(API_URL)}/games`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gameData),
    });

    if (!response.ok) {
      throw new Error("Failed to save game");
    }

    return await response.json();
  } catch (error) {
    console.error("Error saving game:", error);
    throw error;
  }
};

export const getGames = async () => {
  try {
    const response = await fetch(`${CORS_PROXY}${encodeURIComponent(API_URL)}/games`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch games");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching games:", error);
    throw error;
  }
};