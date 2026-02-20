import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction, TransactionType } from './entities/transaction.entity';

@Injectable()
export class FinancialService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async createTransaction(data: {
    type: TransactionType;
    amount: number;
    category: string;
    description?: string;
    date: Date;
  }): Promise<Transaction> {
    const transaction = this.transactionRepository.create(data);
    return this.transactionRepository.save(transaction);
  }

  async getTransactions(): Promise<Transaction[]> {
    return this.transactionRepository.find({
      order: { date: 'DESC', createdAt: 'DESC' },
    });
  }

  async getTransactionById(id: string): Promise<Transaction> {
    return this.transactionRepository.findOne({ where: { id } });
  }

  async updateTransaction(
    id: string,
    data: Partial<{
      type: TransactionType;
      amount: number;
      category: string;
      description: string;
      date: Date;
    }>,
  ): Promise<Transaction> {
    await this.transactionRepository.update(id, data);
    return this.getTransactionById(id);
  }

  async deleteTransaction(id: string): Promise<void> {
    await this.transactionRepository.delete(id);
  }

  async getFinancialSummary() {
    const transactions = await this.transactionRepository.find();

    let totalIncome = 0;
    let totalExpenses = 0;
    const categoryBreakdown = {};

    transactions.forEach((transaction) => {
      if (transaction.type === TransactionType.INCOME) {
        totalIncome += parseFloat(transaction.amount.toString());
      } else {
        totalExpenses += parseFloat(transaction.amount.toString());
      }

      const category = transaction.category;
      if (!categoryBreakdown[category]) {
        categoryBreakdown[category] = { income: 0, expenses: 0 };
      }

      if (transaction.type === TransactionType.INCOME) {
        categoryBreakdown[category].income += parseFloat(transaction.amount.toString());
      } else {
        categoryBreakdown[category].expenses += parseFloat(transaction.amount.toString());
      }
    });

    const netProfit = totalIncome - totalExpenses;

    return {
      totalIncome,
      totalExpenses,
      netProfit,
      categoryBreakdown,
      transactionCount: transactions.length,
    };
  }
}
