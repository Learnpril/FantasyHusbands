/**
 * API Routes - Currently minimal as Fantasy Hearts is a client-side game
 * Can be extended for future multiplayer features or cloud saves
 */

import type { Express } from "express";
import { createServer, type Server } from "http";

/**
 * Registers API routes for the application
 * Currently minimal as the dating sim runs entirely client-side
 */
export async function registerRoutes(app: Express): Promise<Server> {
  // API routes would go here with /api prefix
  // Currently unused as the game is entirely client-side
  
  const httpServer = createServer(app);
  return httpServer;
}
