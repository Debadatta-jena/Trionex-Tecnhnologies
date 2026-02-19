import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import { AppModule } from "./app.module";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import helmet from "helmet";
import { SecurityMiddleware } from "./common/middleware/security.middleware";

// Force port binding
process.env.PORT = process.env.PORT || '10000';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const configService = app.get(ConfigService);
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER as any);
  app.useLogger(logger as any);

  // Security middleware
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:"],
        },
      },
    }),
  );

  // Session configuration for CSRF protection (temporarily disabled)
  /*
  app.use(
    session({
      secret: configService.get('SESSION_SECRET') || 'fallback-session-secret-change-in-production',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      },
    }),
  );
  */

  // Custom security middleware
  app.use(new SecurityMiddleware().use);

  // Compression
  // Compression disabled
  // app.use(compression());

  // CORS
  app.enableCors({
    origin: configService.get("CORS_ORIGIN") || "http://localhost:3000",
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // API prefix
  const apiPrefix = configService.get("API_PREFIX") || "api/v1";
  app.setGlobalPrefix('api/v1');

  // Swagger documentation
  if (configService.get("NODE_ENV") !== "production") {
    const config = new DocumentBuilder()
      .setTitle("AI Solutions API")
      .setDescription("AI Solutions Company Backend API Documentation")
      .setVersion("1.0")
      .addBearerAuth()
      .addTag("auth")
      .addTag("users")
      .addTag("projects")
      .addTag("testimonials")
      .addTag("contact")
      .addTag("stats")
      .addTag("clients")
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api/docs", app, document);
  }

  const port = 10000;
  await app.listen(port);

  console.log(`🚀 Application is running on port: ${port}`);
  console.log(`📚 API Documentation: http://localhost:${port}/api/docs`);
}

bootstrap();
