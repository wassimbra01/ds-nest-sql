import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

// Fonction bootstrap = entry point mta3 l'application
async function bootstrap() {
  // Na3mlou instance el app
  const app = await NestFactory.create(AppModule);

  // Global prefix lel routes = kol el routes yabdew b /api
  // Exemple: /auth/login -> /api/auth/login
  app.setGlobalPrefix('api');

  // Validation automatique lel DTOs
  // Hedha ya3ml validation 3la kol request b class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,          // Y7athef el propriétés li mch fel DTO
      forbidNonWhitelisted: true, // Yraja3 error ken famma propriétés zéydin
      transform: true,          // Transform el data lel types el ça7i7in (ex: "123" -> 123)
    }),
  );

  // CORS - bech frontend men domaine akher y9adder ya3ml requests
  // Ken backend w frontend 3la nefs el domaine, ma t7tajjch hedha
  app.enableCors({
    origin: '*',        // '*' = kol domaine (dev berk), lel production 7ott el domaine mta3 frontend
    credentials: true,  // Allow cookies w credentials
  });

  // Port el server mel .env walla 3000 par défaut
  const port = process.env.PORT || 3000;

  // Nlancew el server
  await app.listen(port);

console.log('\n');
console.log('🚀 Repair Backend API is running!');
console.log(`\n📍 Server: http://localhost:${port}/api`);
console.log('\n📚 Available endpoints:');
console.log('   • POST /api/auth/register');
console.log('   • POST /api/auth/login');
console.log('   • GET  /api/parts');
console.log('   • POST /api/devices');
console.log('   • POST /api/interventions');
console.log('\n💡 Ready to accept requests!\n');
}
// Nlanciw el server
bootstrap();
