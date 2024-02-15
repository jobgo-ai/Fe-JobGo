// useSocket.js
import { ref, onMounted, onUnmounted } from 'vue';
import io from 'socket.io-client';

export default function useSocket(url) {
  const socket = ref(null);
  const message=ref(null)

  // Connect to the WebSocket server when component is mounted
  onMounted(() => {
    socket.value = io("http://localhost:3000");

    socket.on("connect", () => {
      console.log("connected", socket.id);
    });
    socket.on("receive-message", (data) => {
      console.log(data);
      // setMessages((messages) => [...messages, data]);
    });
  });

  // Disconnect from the WebSocket server when component is unmounted
  onUnmounted(() => {
    if (socket.value) {
      socket.value.disconnect();
    }
  });

  // Function to send a message to the server
  const sendMessage = (message) => {
    console.log("send message", message);
    if (socket.value) {
      socket.value.emit('message', message);
    }
  };

  // Function to close the WebSocket connection
  const closeConnection = () => {
    if (socket.value) {
      socket.value.close();
    }
  };

  // Return the socket object, sendMessage and closeConnection functions
  return {
    socket,
    sendMessage,
    closeConnection
  };
}
