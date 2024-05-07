<template>
    <div class="voice-chat-container">
        <div>
            <div class="title">
                Jobgo AI Voice Chat Demo
            </div>
            <div class="voice-chat-button">
                <button @click="startRecording">
                <img src="https://icon-library.com/images/microphone-icon-png/microphone-icon-png-1.jpg" />    
                </button>
                <!-- <button @click="stopRecording">Stop</button> -->
            </div>
    
          <div id="output">
            <p v-for="(text, index) in outputText" :key="index">{{ text }}</p>
          </div>
        </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  let threadId = null;
  const outputText = ref([]);
  const backendURL = 'http://128.199.26.206:5020'; // or 'http://localhost:3000'

  const stopRecording = () => {
    recognition.stop();
    console.log('Stopped recording.');
  };
  

  
  const handleRecognitionResult = (event) => {
    const lastItem = event.results[event.results.length - 1];
    const transcript = lastItem[0].transcript;
    outputText.value.unshift(transcript);
    sendMessage(transcript);
  };
  
  const setupRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
  
    recognition.onresult = handleRecognitionResult;
    recognition.onspeechend = stopRecording;
  
    return recognition;
  };
  
  const setupSynthesis = () => {
    let synthesis = null;
    if ('speechSynthesis' in window) {
      synthesis = window.speechSynthesis;
    } else {
      console.log('Text-to-speech not supported.');
    }
    return synthesis;
  };
  
  const recognition = setupRecognition();
  const synthesis = setupSynthesis();
  
  const fetchThreadId = () => {
    fetch(`${backendURL}/thread`)
      .then(response => response.json())
      .then(data => {
        threadId = data.threadId;
      });
  };
  
  const startRecording = () => {
    recognition.start();
  };
  
  const sendMessage = async (message) => {
    const response = await fetch(`${backendURL}/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message, threadId })
    });
  
    const data = await response.json();
    outputText.value.unshift(data.message);
    speak(data.message);
  };
  
  const speak = (message) => {
    if (synthesis) {
      const utterance = new SpeechSynthesisUtterance(message);
      synthesis.speak(utterance);
    }
  };
  
  fetchThreadId();
  </script>
  
  <style scoped>
  body {
      margin: 50px auto;
      width: 500px;
  }
  
  #output {
      margin-top: 20px;
      border: 1px solid #000;
      padding: 10px;
      height: 200px;
      overflow-y: auto;
      background-color: white;
      width: 500px;
      border-radius: 15px;
      color: black;
      text-align: start;
  }
  
  #output p:nth-child(even) {
      background-color: #f8f6b1;
  }

  .voice-chat-container {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .voice-chat-container .title{
    margin-top: 50px;
    font-size: 25px;
  }

  .voice-chat-container .voice-chat-button{
    margin-top: 50px;
  }

  .voice-chat-container .voice-chat-button button{
    margin-right: 20px;
    background: transparent;
    border: 0;
  }

  .voice-chat-container .voice-chat-button button img {
    height: 50px;
    width: 50px;
    background: white;
    border-radius: 50%;
  }
  </style>  