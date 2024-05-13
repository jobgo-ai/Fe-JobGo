<template>
  <div class="voice-chat-container">
    <div style="min-width: 50%;">
      <div style="display: flex;justify-content: center;flex-direction: column;align-items: center;">
        <button @click="createJson" class="end-chat">
          End Chat
        </button>


        <div id="speech" class="btn m-left type2" style="display: flex;align-items: center;justify-content: center"
          @click="startRecording">
          <div class="pulse-ring"></div>
          <hp-icon size="70" name="micro"></hp-icon>
        </div>
      </div>
      <!-- <div class="title">Jobgo AI Voice Chat Demo</div> -->
      <!-- <div class="voice-chat-button" >
        <img style="width: 100px;" alt="microphone"
          src="https://icon-library.com/images/microphone-icon-png/microphone-icon-png-1.jpg" />
      </div> -->


    </div>

    <div style="min-width: 50%;background-color: black;height: 100vh;">
      <div v-for="(item, index) in conversationMsg" :key="index">

        <div v-if="item.role == 'hiring-manager'" style="display: flex;justify-content: start;    text-align: left;margin-bottom: 10px;
}">
          {{ item.msg }}
        </div>
        <div v-if="item.role == 'assistent'" style="display: flex;justify-content: end;    text-align: right;margin-bottom: 10px;
}">
          {{ item.msg }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import HpIcon from "@/components/hp-icon.vue";
import useAuth from "@/composables/useAuth";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
import { state } from "../../composables/useAuth";

const { logout, organization, user } = useAuth();

let threadId = ref(null);
let roomId = ref(null);
const conversationMsg = ref([
  { "role": "assistant", "msg": "Hello! I'm here to assist you in gathering information swiftly for the position you're looking to fill. How can I help you with the details of the job you have in mind?😊" }

]);
const outputText = ref([]);
const currentUser = ref(null)
let webSocket = null
const backendURL = 'http://localhost:3000'; // Removed trailing slash
onMounted(async () => {
  if (route.query?.room && route.query?.thread && route.query?.user) {
    currentUser.value = route.query?.user

  } else {
    currentUser.value = user.value.name

  }
  connectWebsocket()
});
const connectWebsocket = () => {
  console.log("currentUser.value", webSocket)
  webSocket = new WebSocket(import.meta.env.VITE_SOCKET_URL);

  // Establishing a WebSocket connection
  // Check WebSocket state at intervals

  if (!threadId.value && !roomId.value && webSocket) {
    webSocket.onopen = function (event) {
      if (!(route.query?.room && route.query?.thread && route.query?.user)) {
        webSocket.send(JSON.stringify(
          { event: "register", role: "hiring manager", userName: currentUser.value }));
      } else {
        webSocket.send(JSON.stringify(
          { event: "add-member", room: route.query?.room, thread: route.query?.thread, userName: currentUser.value }));
      }
    };
  }

  // Event listener for incoming messages
  webSocket.onmessage = (event) => {
    // Handle incoming messages here
    const data = JSON.parse(event.data);
    console.log("data", data)
    if (route.query?.room && route.query?.thread && route.query?.user) {
      roomId.value = route.query?.room
      threadId.value = route.query?.thread
    } else {
      if (data.event === 'register') {
        roomId.value = data.roomId
        threadId.value = data.threadId
      }
    }

    if (data.event === 'get-message') {
      conversationMsg.value.push({
        role: data.role,
        msg: data.msg,
        userName: data.userName,
      });
    }
    else if (data.event === 'ai-response') {
      isChatLoading.value = false;

      speak(data.msg)
      conversationMsg.value.push({
        role: data.role,
        msg: data.msg
      });
    }
    else if (data.event === 'complete-chat') {
      const msg1 = JSON.parse(data.msg)
      const data1 = msg1.data.reverse()
      for (let index = 0; index < data1.length; index++) {
        const element = data1[index];
        conversationMsg.value.push({
          role: element.role,
          msg: element.content[0].text.value,
          userName: element.metadata.user
        }
        )
      }
    }
  };

  // Event listener for when the WebSocket connection is closed
  webSocket.onclose = () => {

    // Try to reconnect after a delay
    setTimeout(connectWebsocket, 100); // Reconnect after 3 seconds
  };

  // Event listener for WebSocket errors
  webSocket.onerror = (error) => {
    socektState.value = "errro"

    console.error('WebSocket error:', error);
    // Handle WebSocket errors here
  };
}
const stopRecording = () => {
  recognition.stop();
  document.getElementsByClassName('pulse-ring')[0].classList.remove('pulse-ring-animation');
  console.log('Stopped recording.');
};

const handleRecognitionResult = (event) => {
  const lastItem = event.results[event.results.length - 1];
  const transcript = lastItem[0].transcript;
  outputText.value.unshift({
    role: 'user',
    message: transcript
  });
  stopRecording()

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
  const synthesis = 'speechSynthesis' in window ? window.speechSynthesis : null;
  if (!synthesis) {
    console.log('Text-to-speech not supported.');
  }
  return synthesis;
};

const recognition = setupRecognition();
const synthesis = setupSynthesis();



const startRecording = () => {
  recognition.start();
  console.log("speak start")
  console.log(" document.getElementsByClassName('pulse-ring')", document.getElementsByClassName('pulse-ring'))
  document.getElementsByClassName('pulse-ring')[0].classList.add('pulse-ring-animation');
};
const isChatLoading = ref(false)
const sendMessage = async (message) => {

  isChatLoading.value = true;
  webSocket.send(JSON.stringify(
    { event: "send-message", role: "hiring-manager", userName: currentUser.value, msg: message, room: roomId.value, threadId: threadId.value }));

  webSocket.send(JSON.stringify(
    { event: "send-ai-message", role: "hiring-manager", userName: currentUser.value, msg: message, room: roomId.value, threadId: threadId.value }));
};

const speak = async (message) => {
  // if (synthesis) {
  //   const utterance = new SpeechSynthesisUtterance(message);
  //   synthesis.speak(utterance);
  // }
  const requestOptions = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_OPEN_AI}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "model": "tts-1",
      "input": message,
      "voice": "alloy"
    })
  };
  fetch('https://api.openai.com/v1/audio/speech', requestOptions)
    .then(response => {
      console.log("111111111111", response);
      if (!response.ok) {
        console.log("22222222222222");
        throw new Error('Network response was not ok');
      }
      // console.log("333333333333333", response.blob());
      return response.blob();
    }).then(blob => {
      console.log("blob :- ", blob);
      const audioURL = URL.createObjectURL(blob);

      // Create an <audio> element and set its source to the audio blob
      const audioElement = new Audio(audioURL);

      // Play the audio
      audioElement.play().catch(error => {
        console.error('Error playing audio:', error);
      });
      startRecording()
    })

}
const API_URL = import.meta.env.VITE_API_URL;

const createJson = async () => {
  // isEndChat.value = true
  await createParameterJSON();
  // await createConversationSummary()
  // isEndChat.value = false
}

const createParameterJSON = async () => {
  const res = await fetch(`${API_URL}/self/profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + state.token,
      "Csrf-Token": "nocheck",
    },
    body: JSON.stringify({ conversation: JSON.stringify(conversationMsg.value) }),
  });
  const { jobId } = await res.json()
  router.push(`/presentation?jobId=${jobId}`);
};
// fetchThreadId();
</script>

<style scoped lang="scss">
.voice-chat-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}

.voice-chat-container .title {
  margin-top: 50px;
  font-size: 25px;
}

.voice-chat-container .voice-chat-button {
  margin-top: 50px;
}

.voice-chat-container .voice-chat-button img {
  height: 70px;
  width: 30px;
  background: white;
  border-radius: 100%;
}

.btn {
  border: none;
  padding: 0;
  border-radius: 100%;
  width: 100px;
  height: 100px;
  font-size: 3em;
  color: #fff;
  padding: 0;
  margin: 0;
  background: red;
  position: relative;
  z-index: 999;
  display: inline-block;
  line-height: 100px;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-image: none;
}

.pulse-ring {
  content: '';
  width: 100px;
  height: 100px;
  background: #189BFF;
  border: 5px solid #189BFF;
  border-radius: 50%;
  position: absolute;
  top: 0px;
  left: 0px;
}

.pulse-ring-animation {

  animation: pulsate infinite 1.5s;
}

.pulse-ring.delay {
  animation-delay: 1s;
}

@-webkit-keyframes pulsate {
  0% {
    -webkit-transform: scale(1, 1);
    opacity: 1;
  }

  100% {
    -webkit-transform: scale(1.3, 1.3);
    opacity: 0;
  }
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #d8d8d8;
}

.end-chat {
  color: white;
  padding: 0.4rem 1rem;
  cursor: pointer;
  width: 150px;
  margin-bottom: 10px;
  border-radius: 0.5rem;
  background-color: transparent;
  outline: none;
  border: 2px solid white;
}

.m-left {
  // margin-left: 100px * 3;
}

.type2 {
  background: #189BFF;
}

.type2 .pulse-ring {
  background: transparent;
}
</style>
