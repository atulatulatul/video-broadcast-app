import { useToast } from "@chakra-ui/react";
import Peer from "peerjs";
import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://signalling--app.herokuapp.com/"); // Create an .env for the same
// const socket = io("http://localhost:5000"); // Create an .env for the same

const receiverPeer = new Peer(undefined, {
  // host: "signalling--app.herokuapp.com",
  path: "/",
  secure: true,
  debug: 3,
});

interface RoomProps {
  remoteStream?: MediaStream;
  leaveBroadcast: () => void;
  attendBroadcast: () => void;
}

const BroadAttendeeContext = createContext<RoomProps>({
  remoteStream: undefined,
  leaveBroadcast: () => {},
  attendBroadcast: () => {},
});

const AttendeeProvider: React.FC<{
  roomId: string;
  children: React.ReactNode;
}> = ({ roomId, children }) => {
  const toast = useToast();

  const [remoteStream, setRemoteStream] = useState<MediaStream>();
  const [peerId, setPeerId] = useState<string>();

  useEffect(() => {
    receiverPeer.on("call", (remoteMediaConnection) => {
      console.log("Inside the receiverPeer thing: ", { remoteMediaConnection });
      remoteMediaConnection.answer();
      remoteMediaConnection.on("stream", (remoteMediaStream) => {
        setRemoteStream(remoteMediaStream);
      });
    });

    receiverPeer.on("open", (id) => {
      console.log("Is this being invoked ever?", { id });
      setPeerId(id);
    });
  }, [socket, receiverPeer]);

  const attendBroadcast = () => {
    console.log("Attendee want to join the room: ", { roomId, peerId });

    if (peerId) socket.emit("join-room", roomId, peerId);
  };

  const leaveBroadcast = () => {};

  return (
    <BroadAttendeeContext.Provider
      value={{
        remoteStream,
        attendBroadcast,
        leaveBroadcast,
      }}
    >
      {children}
    </BroadAttendeeContext.Provider>
  );
};

export const useBroadcastAttendee = () => useContext(BroadAttendeeContext);

export default AttendeeProvider;
