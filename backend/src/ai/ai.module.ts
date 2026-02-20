import { Module } from '@nestjs/common';
import { FinancialModule } from '../financial/financial.module';
import { AiController } from './ai.controller';

@Module({
  imports: [FinancialModule],
  controllers: [AiController],
})
export class AiModule {}
