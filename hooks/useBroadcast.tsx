import { useToast } from "@chakra-ui/react";
import Peer, { MediaConnection } from "peerjs";
import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://signalling--app.herokuapp.com/"); // Create an .env for the same
// const socket = io("http://localhost:5000"); // Create an .env for the same

const allPeers: { [key: string]: MediaConnection } = {};

const broadcastPeer = new Peer(undefined, {
  // host: "signalling--app.herokuapp.com",
  path: "/",
  secure: true,
  debug: 3,
});

interface BroadcastProps {
  myStream?: MediaStream;
  leaveBroadcast: () => void;
  joinBroadcast: () => void;
}

const BroadcastContext = createContext<BroadcastProps>({
  myStream: undefined,
  leaveBroadcast: () => {},
  joinBroadcast: () => {},
});

const BroadcastProvider: React.FC<{
  roomId: string;
  children: React.ReactNode;
}> = ({ roomId, children }) => {
  const toast = useToast();

  const [stream, setStream] = useState<MediaStream>();
  const [peerId, setPeerId] = useState<string>();

  const connectToNewUser = ({
    userId,
    stream,
  }: {
    userId: string;
    stream?: MediaStream;
  }) => {
    if (!stream) return;

    const newUser = broadcastPeer.call(userId, stream);

    newUser.on("close", () => {
      toast({
        title: "Attendee Left",
        description: "One attendee left",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    });

    allPeers[userId] = newUser;
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        socket.on("user-connected", (userId) => {
          connectToNewUser({ userId, stream: currentStream });
        });
      });

    socket.on("user-disconnected", (userId) => {
      if (allPeers[userId]) allPeers[userId].close();
    });

    broadcastPeer.on("open", (id) => {
      console.log("Is this being invoked ever?", { id });
      setPeerId(id);
    });
  }, [socket, broadcastPeer]);

  const joinBroadcast = () => {
    console.log("Inside the join broadcast method: ", { peerId });

    if (peerId) socket.emit("join-room", roomId, peerId);
  };

  const leaveBroadcast = () => {};

  return (
    <BroadcastContext.Provider
      value={{
        myStream: stream,
        joinBroadcast,
        leaveBroadcast,
      }}
    >
      {children}
    </BroadcastContext.Provider>
  );
};

export const useBroadcast = () => useContext(BroadcastContext);

export default BroadcastProvider;
