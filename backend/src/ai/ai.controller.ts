import { Controller, Post, Body } from '@nestjs/common';

@Controller('ai')
export class AiController {
  @Post('chat')
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
}
