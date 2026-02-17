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

import { User } from "./users/entities/user.entity";
import { Project } from "./projects/entities/project.entity";
import { Testimonial } from "./testimonials/entities/testimonial.entity";
import { Contact } from "./contact/entities/contact.entity";
import { Feedback } from "./feedback/entities/feedback.entity";

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

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("DB_HOST") || "localhost",
        port: +(configService.get("DB_PORT") || "5432"),
        username: configService.get("DB_USERNAME") || "postgres",
        password: configService.get("DB_PASSWORD") || "password",
        database: configService.get("DB_DATABASE") || "trionex_db",
        entities: [User, Project, Testimonial, Contact, Feedback],
        synchronize: configService.get("NODE_ENV") === "development",
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
