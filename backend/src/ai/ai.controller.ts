import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { FinancialService } from '../financial/financial.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('ai')
@ApiTags('ai')
export class AiController {
  constructor(private readonly financialService: FinancialService) {}

  @Post('chat')
  @ApiOperation({ summary: 'General AI chat endpoint' })
  @ApiResponse({ status: 200, description: 'AI response generated' })
  async chat(@Body() body: { message: string; context?: any }) {
    const { message, context } = body;

    // Enhanced AI response logic
    let response = '';

    // Simple pattern matching for better responses
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      response = 'Hello! Welcome to GLYVEXA. How can I help you with AI and software solutions today?';
    } else if (lowerMessage.includes('service') || lowerMessage.includes('what do you do')) {
      response = 'We offer comprehensive AI and software solutions including:\n\n• Website Development\n• AI Chatbots\n• Mobile Applications\n• Cloud Solutions\n• AI Agents\n• Voice Bots\n\nWhich service interests you most?';
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      response = 'Our pricing depends on your specific requirements. We offer competitive rates:\n\n• Website Development: Starting at $499\n• AI Solutions: Starting at $999\n• App Development: Starting at $799\n• Academic Projects: Starting at $199\n\nContact us for a personalized quote!';
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('email')) {
      response = 'You can reach us at:\n📧 debadattajena552@gmail.com\n📞 +91 9692292496\n\nWe\'d love to discuss your project!';
    } else {
      // Default AI-like response
      response = `Thank you for your message: "${message}". At GLYVEXA, we're passionate about creating innovative AI and software solutions. Could you tell me more about what you're looking for?`;
    }

    return { text: response };
  }

  @Post('financial-insights')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Generate AI-powered financial insights' })
  @ApiResponse({ status: 200, description: 'Financial insights generated' })
  async getFinancialInsights() {
    const summary = await this.financialService.getFinancialSummary();

    // Generate AI insights based on financial data
    const insights = [];

    if (summary.netProfit > 0) {
      insights.push({
        type: 'positive',
        message: `Great! Your business is profitable with a net profit of $${summary.netProfit.toFixed(2)}. Consider reinvesting in growth areas.`,
      });
    } else if (summary.netProfit < 0) {
      insights.push({
        type: 'warning',
        message: `Caution: Your expenses exceed income by $${Math.abs(summary.netProfit).toFixed(2)}. Review cost-cutting opportunities.`,
      });
    }

    if (summary.totalExpenses > summary.totalIncome * 0.7) {
      insights.push({
        type: 'warning',
        message: 'High expense ratio detected. Expenses are over 70% of income. Consider optimizing operational costs.',
      });
    }

    const topExpenseCategory = Object.entries(summary.categoryBreakdown).reduce((a, b) =>
      summary.categoryBreakdown[a[0]].expenses > summary.categoryBreakdown[b[0]].expenses ? a : b
    );

    if (topExpenseCategory) {
      insights.push({
        type: 'info',
        message: `Your highest expense category is "${topExpenseCategory[0]}" with $${summary.categoryBreakdown[topExpenseCategory[0]].expenses.toFixed(2)}.`,
      });
    }

    if (insights.length === 0) {
      insights.push({
        type: 'info',
        message: 'Your financial data looks balanced. Keep monitoring trends for optimal performance.',
      });
    }

    return {
      summary,
      insights,
      recommendations: [
        'Regular financial reviews help identify trends early',
        'Consider diversifying income streams',
        'Track expenses by category for better budgeting',
      ],
    };
  }
}
