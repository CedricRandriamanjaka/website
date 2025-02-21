// src/pages/home/ChatGemini.jsx
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  Box,
  Flex,
  Text,
  Button, 
  Input,
  VStack,
  HStack,
  Spinner,
  IconButton,
  Grid,
  GridItem
} from '@chakra-ui/react';
import { FaRegComment, FaPalette, FaImage, FaCode, FaMagic, FaUser, FaProjectDiagram, FaHandshake } from 'react-icons/fa';
import { Tooltip } from '@/components/ui/tooltip';
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import data from "../../locales/content.json"
// Correction du mapping des icônes
const iconMapping = {
  FaPalette: FaPalette,
  FaImage: FaImage,
  FaCode: FaCode,
  FaMagic: FaMagic,
  FaUser: FaUser,
  FaProjectDiagram: FaProjectDiagram,
  FaHandshake: FaHandshake
};

export const ChatGemini = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const quickSuggestions = t("myia.quickSuggestions", { returnObjects: true }) || [];

  // Récupérer la clé API depuis .env.local
  const apiKey = "AIzaSyD55-2RiankhFkTrfSwQ1ml8S3RvDE7AHM";
  const genAI = new GoogleGenerativeAI(apiKey); // Initialisation de l'API

  // Fonction d'envoi des messages à Google Gemini
  const systemInstruction = data.fr.myia.systemInstruction + " voici mes donnees : " + JSON.stringify(data.fr);

  const handleSend = async (question) => {
    const userMessage = question || inputValue.trim();
    if (!userMessage) return;
  
    const newMessage = { role: 'user', content: userMessage };
    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');
    setIsLoading(true);
  
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
      // Création du contexte de conversation en ajoutant l'instruction cachée
      const messagesToSend = [
        { role: "system", content: systemInstruction }, // Message système invisible
        ...messages,
        newMessage
      ];
  
      const result = await model.generateContent(messagesToSend.map(msg => msg.content).join("\n"));
      const botAnswer = result.response.text();
      const botMessage = { role: 'bot', content: botAnswer };
  
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Erreur lors de l’appel API Gemini :', error);
      setMessages((prev) => [...prev, { role: 'bot', content: t("myia.noResult") }]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (messages.length !== 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <Flex direction="column" height="80vh" width={{ base: "95%", md: "60%" }}>
      {/* Zone des messages */}
      <Box flex="1" maxH="70vh" overflowY="auto" p={4}>
        {messages.length === 0 && (
          <VStack spacing={4} mb={8}>
            <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="semibold" textAlign="center">
              {t("myia.introIA")}
            </Text>
            <Grid
              templateColumns={{
                base: 'repeat(auto-fit, minmax(150px, 1fr))',
                md: 'repeat(2, 1fr)'
              }}
              gap={4}
              width="100%"
            >
              {quickSuggestions.map((sug, idx) => {
                const IconComponent = iconMapping[sug.icon] || FaRegComment;
                return (
                  <GridItem key={idx}>
                    <Button
                      w="100%"
                      h={{ base: "70px", md: "70px", lg: "60px" }}
                      justifyContent="flex-start"
                      variant="outline"
                      textAlign="left"
                      p={4}
                      onClick={() => handleSend(sug.description)}
                    >
                      <HStack spacing={3}>
                        <IconComponent />
                        <Box>
                          <Text fontWeight="bold">{sug.label}</Text>
                          <Flex maxW="100%">
                            <Text
                              fontSize="sm"
                              color="gray.500"
                              whiteSpace="normal"
                              wordBreak="break-word"
                              overflowWrap="break-word"
                            >
                              {sug.description}
                            </Text>
                          </Flex>
                        </Box>
                      </HStack>
                    </Button>
                  </GridItem>
                );
              })}
            </Grid>
          </VStack>
        )}

        {/* Affichage des messages */}
        <VStack align="stretch" spacing={4}>
          {messages.map((msg, i) => (
            <Flex
              key={i}
              alignSelf={msg.role === 'user' ? 'flex-end' : 'flex-start'}
              maxW={{ base: "90%", md: "70%" }}
              bg="bg.muted"
              p={3}
              borderRadius="md"
              boxShadow="sm"
              flexDir="column"
            >
              <Text fontSize="sm" color="gray.500" mb={1}>
                {msg.role === 'user' ? '🧔‍♂️ Me' : '🤖 Hozaari'}
              </Text>
              <Text><ReactMarkdown>{msg.content}</ReactMarkdown></Text>
            </Flex>
          ))}

          {isLoading && (
            <HStack>
              <Spinner size="sm" />
              <Text>{t("myia.thinkingMsg")}</Text>
            </HStack>
          )}

          <div ref={messagesEndRef} />
        </VStack>
      </Box>

      {/* Zone de saisie */}
      <Box
        as="form"
        p={4}
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(null);
        }}
      >
        <HStack>
          <Input
            placeholder={t("myia.inputPlacholder")}
            value={inputValue}
            borderRadius={1000}
            onChange={(e) => setInputValue(e.target.value)}
            flex="1"
          />
          <Tooltip label="Envoyer" placement="top">
            <IconButton
              borderRadius={1000}
              aria-label="Send message"
              colorScheme="blue"
              type="submit"
              isLoading={isLoading}
            >
              <FaRegComment />
            </IconButton>
          </Tooltip>
        </HStack>
      </Box>
    </Flex>
  );
};
