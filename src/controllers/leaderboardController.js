import { getLeaderboard, createScore, updateScore, deleteScore } from '../api';

export const loadLeaderboard = async () => {
  try {
    return await getLeaderboard();
  } catch (error) {
    console.error('Error loading leaderboard:', error);
    return [];
  }
};

export const addScore = async (username, score) => {
  try {
    return await createScore(username, score);
  } catch (error) {
    console.error('Error adding score:', error);
    return null;
  }
};

export const updateLeaderboardScore = async (id, score) => {
  try {
    return await updateScore(id, score);
  } catch (error) {
    console.error('Error updating score:', error);
    return null;
  }
};

export const removeLeaderboardScore = async (id) => {
  try {
    return await deleteScore(id);
  } catch (error) {
    console.error('Error deleting score:', error);
    return null;
  }
};

export { createScore }; // Make sure createScore is exported