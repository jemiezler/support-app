import React, { useState, useRef, useLayoutEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, Alert, useColorScheme, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { Colors } from "@/constants/Colors";

type Message = {
  id: number;
  text: string;
  isUser: boolean;
  liked?: boolean;
};

const API_KEY = "YOUR_API_KEY";
const systemMessage = { role: "system", content: "Explain things like you're talking to a software professional with 2 years of experience." };

const ChatScreen: React.FC = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView>(null);
  const isDarkMode = useColorScheme() === 'dark';

  const initialMessages: Message[] | null = null;

  const [messages, setMessages] = useState<Message[]>(initialMessages || []);
  const [inputText, setInputText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const sendMessage = async () => {
    if (inputText.trim() !== '') {
      const newMessage: Message = { id: messages.length + 1, text: inputText, isUser: true };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputText('');
      setIsTyping(true);

      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);

      await processMessageToChatGPT([...messages, newMessage]);
    }
  };

  async function processMessageToChatGPT(chatMessages: Message[]) {
    const apiMessages = chatMessages.map((messageObject) => {
      const role = messageObject.isUser ? "user" : "assistant";
      return { role: role, content: messageObject.text };
    });

    const apiRequestBody = {
      model: "gpt-2.0",
      messages: [systemMessage, ...apiMessages]
    };

    try {
      const response = await axios.post("https://api.openai.com/v1/chat/completions", apiRequestBody, {
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        }
      });
      const gptMessage = response.data.choices[0].message.content;

      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, text: gptMessage, isUser: false }
      ]);
    } catch (error) {
      Alert.alert("Error", "Unable to connect to GPT API.");
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <LinearGradient
      colors={[
        isDarkMode
          ? Colors.dark.backgroundgradientStart
          : Colors.light.backgroundGradientStart,
        isDarkMode
          ? Colors.dark.backgroundgradientEnd
          : Colors.light.backgroundgradientEnd,
      ]}
      style={styles.background}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Chat</Text>
          </View>

          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            ref={scrollViewRef}
            style={styles.scrollView}
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          >
            <View style={styles.messageContainer}>
              {messages.map((message) => (
                <View key={message.id} style={[styles.messageBubble, message.isUser ? styles.userBubble : styles.botBubble]}>
                  <Text style={styles.messageText}>{message.text}</Text>
                </View>
              ))}
              {isTyping && (
                <Text style={styles.typingText}>ChatGPT is typing...</Text>
              )}
            </View>
          </ScrollView>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type here!"
              placeholderTextColor="#ccc"
              value={inputText}
              onChangeText={setInputText}
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <Icon name="send" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: 'transparent',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  scrollView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 10,
  },
  messageContainer: {
    padding: 10,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#495BC3',
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF18',
  },
  messageText: {
    color: 'white',
  },
  typingText: {
    color: 'gray',
    fontStyle: 'italic',
    alignSelf: 'flex-start',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 20,
    backgroundColor: 'transparent',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 40,
    marginRight: 10,
    color: 'black',
  },
  sendButton: {
    backgroundColor: '#495BC3',
    borderRadius: 20,
    padding: 10,
  },
});

export default ChatScreen; 