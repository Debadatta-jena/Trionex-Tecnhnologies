import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { FinancialService } from './financial.service';
import { Transaction, TransactionType } from './entities/transaction.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('financial')
@Controller('financial')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Roles(UserRole.ADMIN)
export class FinancialController {
  constructor(private readonly financialService: FinancialService) {}

  @Post('transaction')
  @ApiOperation({ summary: 'Create a new financial transaction' })
  @ApiResponse({ status: 201, description: 'Transaction created successfully' })
  async createTransaction(
    @Body() data: {
      type: TransactionType;
      amount: number;
      category: string;
      description?: string;
      date: Date;
    },
  ): Promise<Transaction> {
    return this.financialService.createTransaction(data);
  }

  @Get('transactions')
  @ApiOperation({ summary: 'Get all financial transactions' })
  @ApiResponse({ status: 200, description: 'Transactions retrieved successfully' })
  async getTransactions(): Promise<Transaction[]> {
    return this.financialService.getTransactions();
  }

  @Get('transaction/:id')
  @ApiOperation({ summary: 'Get a specific transaction by ID' })
  @ApiResponse({ status: 200, description: 'Transaction retrieved successfully' })
  async getTransactionById(@Param('id') id: string): Promise<Transaction> {
    return this.financialService.getTransactionById(id);
  }

  @Put('transaction/:id')
  @ApiOperation({ summary: 'Update a financial transaction' })
  @ApiResponse({ status: 200, description: 'Transaction updated successfully' })
  async updateTransaction(
    @Param('id') id: string,
    @Body() data: Partial<{
      type: TransactionType;
      amount: number;
      category: string;
      description: string;
      date: Date;
    }>,
  ): Promise<Transaction> {
    return this.financialService.updateTransaction(id, data);
  }

  @Delete('transaction/:id')
  @ApiOperation({ summary: 'Delete a financial transaction' })
  @ApiResponse({ status: 200, description: 'Transaction deleted successfully' })
  async deleteTransaction(@Param('id') id: string): Promise<void> {
    return this.financialService.deleteTransaction(id);
  }

  @Get('summary')
  @ApiOperation({ summary: 'Get financial summary and analytics' })
  @ApiResponse({ status: 200, description: 'Financial summary retrieved successfully' })
  async getFinancialSummary() {
    return this.financialService.getFinancialSummary();
  }
}
