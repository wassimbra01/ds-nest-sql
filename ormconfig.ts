import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

// Nkgarjou el variables mel .env
config();

// Instance ConfigService bech ne9raw mel .env
const configService = new ConfigService();

// Configuration el database bech nesta3mlouh fil migrations
export default new DataSource({
  type: 'mysql',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'), // ✅ DB_DATABASE mch DB_NAME
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
});
