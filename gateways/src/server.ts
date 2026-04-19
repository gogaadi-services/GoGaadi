import dotenv from 'dotenv';
dotenv.config();

// Import Express app instance
import app from './app';

// Custom Winston logger
import { logger } from '@gogaadi/config';

// Prisma client for database access
import { prisma } from '@gogaadi/database';

// Server configuration
const PORT = parseInt(process.env.PORT || '3001', 10);
const HOST = process.env.HOST || '0.0.0.0';

/**
 * --------------------------------
 * Database Connection Check
 * --------------------------------
 * Ensures database is reachable
 * before starting the server
 */
async function checkDatabaseConnection() {
  try {
    await prisma.$connect();
    logger.info('✅ Database connection established');
  } catch (error) {
    logger.error('❌ Failed to connect to database:', error);
    process.exit(1); // Stop app if DB is unavailable
  }
}

/**
 * --------------------------------
 * Server Startup
 * --------------------------------
 */
async function startServer() {
  try {
    // Verify database connectivity
    await checkDatabaseConnection();

    // Start HTTP server
    const server = app.listen(PORT, HOST, () => {
      logger.info('='.repeat(60));
      logger.info(`🚀 Unified gogaadi Backend API Server Started`);
      logger.info('='.repeat(60));
      logger.info(`📍 Server running on: http://${HOST}:${PORT}`);
      logger.info(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      logger.info(`📚 Swagger docs: http://localhost:${PORT}/api/docs`);
      logger.info(`💚 Health check: http://localhost:${PORT}/health`);
      logger.info('='.repeat(60));

    });

    /**
     * --------------------------------
     * Graceful Shutdown Handler
     * --------------------------------
     * Ensures server and DB close cleanly
     */
    const gracefulShutdown = async (signal: string) => {
      logger.info(`${signal} signal received: initiating graceful shutdown`);

      // Stop accepting new HTTP requests
      server.close(async () => {
        logger.info('HTTP server closed');

        try {
          // Close Prisma DB connection
          await prisma.$disconnect();
          logger.info('Database connection closed');
          logger.info('✅ Graceful shutdown completed');
          process.exit(0);
        } catch (error) {
          logger.error('Error during shutdown:', error);
          process.exit(1);
        }
      });

      // Force shutdown after 30 seconds
      setTimeout(() => {
        logger.error('Forced shutdown after timeout');
        process.exit(1);
      }, 30000);
    };

    // Handle OS-level shutdown signals
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // Catch uncaught synchronous errors
    process.on('uncaughtException', (error: Error) => {
      logger.error('Uncaught Exception:', error);
      gracefulShutdown('uncaughtException');
    });

    // Catch unhandled promise rejections
    process.on('unhandledRejection', (reason: unknown, promise: Promise<unknown>) => {
      logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
      gracefulShutdown('unhandledRejection');
    });

    return server;
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Bootstrap the application
startServer().catch((error) => {
  logger.error('Failed to start server:', error);
  process.exit(1);
});
