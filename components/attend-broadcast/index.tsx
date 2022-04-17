import { Box, Button } from "@chakra-ui/react";
import { useBroadcastAttendee } from "../../hooks/useBroadcastAttendee";
import MediaStreamPlayer from "../common/MediaStreamPlayer";

const AttendBroadcast = () => {
  const { remoteStream, attendBroadcast } = useBroadcastAttendee();

  return (
    <Box h="100%">
      {remoteStream && <MediaStreamPlayer stream={remoteStream} />}
      <Button onClick={attendBroadcast}>Attend Broadcast</Button>
    </Box>
  );
};

export default AttendBroadcast;
