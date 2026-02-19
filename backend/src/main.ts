import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import { AppModule } from "./app.module";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import helmet from "helmet";
import { SecurityMiddleware } from "./common/middleware/security.middleware";

async function bootstrap() {
  try {
    console.log('🔧 Starting application bootstrap...');
    
    const app = await NestFactory.create(AppModule, { bufferLogs: true });
    console.log('✅ NestJS application created');

    const configService = app.get(ConfigService);
    const logger = app.get(WINSTON_MODULE_NEST_PROVIDER as any);
    app.useLogger(logger as any);
    console.log('✅ Logger and config service initialized');

  console.log('🔧 Setting up middleware...');
    
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
    console.log('✅ Helmet middleware configured');

    // Custom security middleware
    app.use(new SecurityMiddleware().use);
    console.log('✅ Security middleware configured');

    // CORS
    app.enableCors({
      origin: [
        "http://localhost:3000",
        "https://trionex-tecnhnologies.onrender.com",
        "https://trionex.onrender.com"
      ],
      credentials: true,
    });
    console.log('✅ CORS configured');

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
    console.log('✅ Validation pipe configured');

    // API prefix
    const apiPrefix = configService.get("API_PREFIX") || "api/v1";
    app.setGlobalPrefix('api/v1');
    console.log('✅ API prefix configured');

    // Swagger documentation
    if (configService.get("NODE_ENV") !== "production") {
      console.log('🔧 Setting up Swagger documentation...');
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
      console.log('✅ Swagger documentation configured');
    }

  const port = 10000;
    console.log(`🔧 Starting server on port: ${port}`);
    
    const server = await app.listen(port, '0.0.0.0');
    console.log(`✅ Server started successfully on port: ${port}`);
    console.log(`🚀 Application is running on port: ${port}`);
    console.log(`📚 API Documentation: http://localhost:${port}/api/docs`);
    console.log(`🌐 Server address: ${server.address()}`);
    
  } catch (error) {
    console.error('❌ Failed to start application:', error);
    process.exit(1);
  }
}

bootstrap().catch(error => {
  console.error('❌ Bootstrap failed:', error);
  process.exit(1);
});
