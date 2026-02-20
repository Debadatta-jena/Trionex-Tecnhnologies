import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ThrottlerModule } from "@nestjs/throttler";
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from "nest-winston";
import * as winston from "winston";

import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { ProjectsModule } from "./projects/projects.module";
import { TestimonialsModule } from "./testimonials/testimonials.module";
import { ContactModule } from "./contact/contact.module";
import { StatsModule } from "./stats/stats.module";
import { FeedbackModule } from "./feedback/feedback.module";
import { HealthModule } from "./health/health.module";
import { AiModule } from "./ai/ai.module";

import { User } from "./users/entities/user.entity";
import { Project } from "./projects/entities/project.entity";
import { Testimonial } from "./testimonials/entities/testimonial.entity";
import { Contact } from "./contact/entities/contact.entity";
import { Feedback } from "./feedback/entities/feedback.entity";

// Import security modules
import { CsrfService } from "./common/services/csrf.service";
import { SecurityMiddleware } from "./common/middleware/security.middleware";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),

    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transports: [
          new winston.transports.Console({
            level:
              configService.get("NODE_ENV") === "production" ? "info" : "debug",
            format:
              configService.get("NODE_ENV") !== "production"
                ? winston.format.combine(
                    winston.format.colorize(),
                    nestWinstonModuleUtilities.format.nestLike(),
                  )
                : winston.format.json(),
          }),
        ],
      }),
      inject: [ConfigService],
    }),

    // SQLite Database Configuration
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "sqlite",
        database: "database.sqlite",
        entities: [User, Project, Testimonial, Contact, Feedback],
        synchronize: true,
        logging: configService.get("NODE_ENV") === "development",
        migrations: ["dist/migrations/*.js"],
        migrationsRun: true,
      }),
      inject: [ConfigService],
    }),

    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => [
        {
          ttl: +(configService.get("RATE_LIMIT_TTL") || "60000"),
          limit: +(configService.get("RATE_LIMIT_MAX") || "100"),
        },
      ],
      inject: [ConfigService],
    }),

    AuthModule,
    UsersModule,
    ProjectsModule,
    TestimonialsModule,
    ContactModule,
    StatsModule,
    FeedbackModule,
    HealthModule,
    AiModule,
  ],
  controllers: [],
  providers: [
    CsrfService,
    SecurityMiddleware,
  ],
})
export class AppModule {}
