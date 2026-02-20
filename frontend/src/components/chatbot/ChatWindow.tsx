'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Message, QuickReply, LeadData, ConversationState } from '@/types/chatbot'
import { 
  CHATBOT_CONFIG, 
  SERVICES, 
  QUICK_REPLIES, 
  PRICING_INFO 
} from '@/lib/chatbot-data'
import { 
  generateId, 
  delay, 
  storage,
  sanitizeInput 
} from '@/lib/chatbot-utils'
import { generateAIResponse } from '@/lib/api'
import { 
  generateResponse, 
  getTimeBasedGreeting, 
  extractName,
  isGoodbye,
  COMPANY_INFO 
} from '@/lib/chatbot-brain'
import ChatMessage from './ChatMessage'
import QuickReplies from './QuickReplies'
import LeadForm from './LeadForm'

interface ChatWindowProps {
  isOpen: boolean
  onClose: () => void
}

const ChatWindow: React.FC<ChatWindowProps> = ({ isOpen, onClose }) => {
  const [conversation, setConversation] = useState<ConversationState>({
    currentStep: 'greeting',
    messages: [],
    leadData: {}
  })
  const [isTyping, setIsTyping] = useState(false)
  const [showLeadForm, setShowLeadForm] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    scrollToBottom()
  }, [conversation.messages.length, isTyping])

  // Load conversation history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('chatbot_history');
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        if (Array.isArray(parsed)) {
          setConversation({ ...conversation, messages: parsed });
        }
      } catch (error) {
        console.error('Failed to load chat history:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Save conversation history to localStorage
    localStorage.setItem('chatbot_history', JSON.stringify(conversation.messages));
  }, [conversation.messages]);

  // Initialize conversation when chat opens
  useEffect(() => {
    if (isOpen && conversation.messages.length === 0) {
      initializeConversation()
    }
  }, [isOpen, conversation.messages.length])

  const initializeConversation = async () => {
    // Use time-based greeting for more human-like experience
    const greetingText = getTimeBasedGreeting()
    
    const greetingMessage: Message = {
      id: generateId(),
      text: greetingText,
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    }

    setConversation(prev => ({
      ...prev,
      messages: [greetingMessage],
      currentStep: 'service-selection'
    }))

    // Show quick replies after a delay
    await delay(500)
  }

  const addMessage = async (text: string, sender: 'bot' | 'user') => {
    const message: Message = {
      id: generateId(),
      text: sanitizeInput(text),
      sender,
      timestamp: new Date(),
      type: 'text'
    }

    setConversation(prev => ({
      ...prev,
      messages: [...prev.messages, message]
    }))
  }

  const showTypingIndicator = () => {
    setIsTyping(true)
  }

  const hideTypingIndicator = () => {
    setIsTyping(false)
  }

  const handleQuickReply = async (reply: QuickReply) => {
    // Add user message
    await addMessage(reply.text, 'user')

    // Show typing indicator
    showTypingIndicator()
    await delay(CHATBOT_CONFIG.typingDelay)

    switch (reply.action) {
      case 'service':
        await handleServiceSelection(reply.payload!)
        break
      
      case 'pricing':
        await handlePricingRequest(reply.payload)
        break
      
      case 'consultation':
        await handleConsultationRequest()
        break
      
      case 'contact':
        await handleContactRequest()
        break
      
      case 'back':
        await handleBackToMenu()
        break
    }

    hideTypingIndicator()
  }

  const handleServiceSelection = async (serviceId: string) => {
    const service = SERVICES.find(s => s.id === serviceId)
    if (!service) return

    // Add service description
    await addMessage(service.description, 'bot')
    
    // Add features
    if (service.features.length > 0) {
      await delay(500)
      const featuresText = `Key Features:\n${service.features.map(f => `• ${f}`).join('\n')}`
      await addMessage(featuresText, 'bot')
    }

    // Add pricing info
    if (service.pricing) {
      await delay(500)
      await addMessage(`Starting from ${service.pricing}`, 'bot')
    }

    setConversation(prev => ({
      ...prev,
      currentStep: 'service-details',
      selectedService: serviceId
    }))
  }

  const handlePricingRequest = async (serviceId?: string) => {
    if (serviceId && PRICING_INFO[serviceId as keyof typeof PRICING_INFO]) {
      const pricing = PRICING_INFO[serviceId as keyof typeof PRICING_INFO]
      const pricingText = `Pricing Options:\n${Object.entries(pricing).map(([key, value]) => `• ${value}`).join('\n')}`
      await addMessage(pricingText, 'bot')
    } else {
      const generalPricing = `Our pricing varies based on your requirements:\n\n• Website Development: Starting at $499\n• AI Solutions: Starting at $999\n• App Development: Starting at $799\n• Academic Projects: Starting at $199\n\nAs a new company, we offer competitive rates and personalized service. Contact us for a custom quote!`
      await addMessage(generalPricing, 'bot')
    }
  }

  const handleConsultationRequest = async () => {
    await addMessage('Great! I\'d be happy to help you book a consultation. Please fill out the form below:', 'bot')
    setShowLeadForm(true)
    setConversation(prev => ({
      ...prev,
      currentStep: 'lead-collection'
    }))
  }

  const handleContactRequest = async () => {
    const contactInfo = `You can reach us through:\n\n📧 Email: ${COMPANY_INFO.email}\n📞 Phone: ${COMPANY_INFO.phone}\n📍 Location: ${COMPANY_INFO.location}\n\nOr fill out the consultation form and we'll get back to you within 24 hours!`
    await addMessage(contactInfo, 'bot')
  }

  const handleBackToMenu = async () => {
    await addMessage('What else can I help you with?', 'bot')
    setConversation(prev => ({
      ...prev,
      currentStep: 'service-selection',
      selectedService: undefined
    }))
    setShowLeadForm(false)
  }

  const handleLeadSubmit = async (leadData: LeadData) => {
    // Save lead to local storage
    storage.saveLead(leadData)

    // Add confirmation message
    await addMessage(`Thank you ${leadData.name}! Your consultation request has been received.\n\nWe'll contact you within 24 hours at ${leadData.email} or ${leadData.phone}.\n\nIs there anything else I can help you with?`, 'bot')

    // Reset form and state
    setShowLeadForm(false)
    setConversation(prev => ({
      ...prev,
      currentStep: 'service-selection',
      leadData: {}
    }))
  }

  const handleLeadFormCancel = async () => {
    await addMessage('No problem! Feel free to ask if you change your mind.', 'bot')
    setShowLeadForm(false)
    setConversation(prev => ({
      ...prev,
      currentStep: 'service-details'
    }))
  }

  // Handle free text input using the smart brain
  const handleFreeText = async (userInput: string) => {
    // Check for goodbye
    if (isGoodbye(userInput)) {
      await addMessage(userInput, 'user')
      showTypingIndicator()
      await delay(CHATBOT_CONFIG.typingDelay)
      await addMessage("Bye for now! It was great chatting with you! Come back anytime! 👋", 'bot')
      hideTypingIndicator()
      return
    }

    // Add user message
    await addMessage(userInput, 'user')

    // Show typing
    showTypingIndicator()
    await delay(CHATBOT_CONFIG.typingDelay)

    // Generate response using backend AI
    const response = await generateAIResponse(userInput, context)

    // Add bot response
    await addMessage(response.text, 'bot')

    // Handle actions from response
    if (response.action) {
      await delay(300)
      switch (response.action) {
        case 'show-services':
        case 'show-pricing':
          await handlePricingRequest()
          break
        case 'service-website':
          await handleServiceSelection('website-development')
          break
        case 'service-ai':
          await handleServiceSelection('ai-solutions')
          break
        case 'service-app':
          await handleServiceSelection('app-development')
          break
      }
    }

    hideTypingIndicator()
  }

  const resetConversation = () => {
    setConversation({
      currentStep: 'greeting',
      messages: [],
      leadData: {}
    })
    setShowLeadForm(false)
    initializeConversation()
  }

  // Save conversation to local storage
  useEffect(() => {
    if (conversation.messages.length > 0) {
      storage.saveConversation('current', conversation.messages)
    }
  }, [conversation.messages])

  const getCurrentQuickReplies = (): QuickReply[] => {
    if (showLeadForm) return []
    
    switch (conversation.currentStep) {
      case 'service-selection':
        return QUICK_REPLIES
      
      case 'service-details':
        const service = SERVICES.find(s => s.id === conversation.selectedService)
        return service?.actionButtons || []
      
      default:
        return []
    }
  }

  const windowVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={windowVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-24 right-6 w-96 max-w-[90vw] h-[600px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">AI</span>
              </div>
              <div>
                <h3 className="font-semibold">{CHATBOT_CONFIG.companyName}</h3>
                <p className="text-xs text-blue-100">Always here to help</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={resetConversation}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                title="Reset conversation"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-white dark:bg-gray-900">
            {conversation.messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            
            {isTyping && (
              <ChatMessage
                message={{
                  id: 'typing',
                  text: '',
                  sender: 'bot',
                  timestamp: new Date()
                }}
                isTyping={true}
              />
            )}

            {showLeadForm && (
              <LeadForm
                onSubmit={handleLeadSubmit}
                onCancel={handleLeadFormCancel}
                disabled={isTyping}
              />
            )}

            {!showLeadForm && (
              <QuickReplies
                replies={getCurrentQuickReplies()}
                onReplyClick={handleQuickReply}
                disabled={isTyping}
              />
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-3 bg-white border-t border-gray-200 rounded-b-2xl">
            <form 
              onSubmit={async (e) => {
                e.preventDefault()
                const form = e.target as HTMLFormElement
                const input = form.elements.namedItem('message') as HTMLInputElement
                const message = input.value.trim()
                if (message && !isTyping) {
                  input.value = ''
                  await handleFreeText(message)
                }
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                name="message"
                placeholder="Type a message..."
                disabled={isTyping}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={isTyping}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
            <p className="text-xs text-gray-500 text-center mt-2">
              Powered by GLYVEXA • Your data is secure
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ChatWindow

