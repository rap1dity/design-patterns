import pino from 'pino';
import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const logsDir = join(process.cwd(), 'logs');

if (!existsSync(logsDir)) {
  mkdirSync(logsDir);
}

export const logger = pino({
  transport: {
    targets: [
      {
        target: 'pino/file',
        options: { destination: join(logsDir, 'app.log') },
      },
      {
        target: 'pino-pretty',
        options: { colorize: true },
      },
    ],
  },
});