'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Message } from '@/types/chatbot'
import { formatTime } from '@/lib/chatbot-utils'

interface ChatMessageProps {
  message: Message
  isTyping?: boolean
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isTyping = false }) => {
  const isBot = message.sender === 'bot'

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const typingVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  if (isTyping) {
    return (
      <motion.div
        variants={typingVariants}
        initial="hidden"
        animate="visible"
        className="flex items-start space-x-2 mb-4"
      >
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white text-sm font-bold">AI</span>
        </div>
        <div className="bg-gray-100 text-gray-900 rounded-2xl rounded-tl-none px-4 py-3 max-w-xs">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={messageVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.3 }}
      className={`flex items-start space-x-2 mb-4 ${isBot ? '' : 'flex-row-reverse space-x-reverse'}`}
    >
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isBot ? 'bg-blue-600' : 'bg-gray-400'
      }`}>
        <span className="text-white text-sm font-bold">
          {isBot ? 'AI' : 'U'}
        </span>
      </div>

      {/* Message Bubble */}
      <div className={`max-w-xs lg:max-w-md ${
        isBot 
          ? 'bg-gray-100 text-gray-900 rounded-2xl rounded-tl-none' 
          : 'bg-blue-600 text-white rounded-2xl rounded-tr-none'
      } px-4 py-3`}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.text}
        </p>
        <span className={`text-xs mt-1 block ${
          isBot ? 'text-gray-600' : 'text-blue-200'
        }`}>
          {formatTime(message.timestamp)}
        </span>
      </div>
    </motion.div>
  )
}

export default ChatMessage

