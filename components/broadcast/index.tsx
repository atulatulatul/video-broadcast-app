import { Box, Button } from "@chakra-ui/react";
import { useBroadcast } from "../../hooks/useBroadcast";
import Loader from "../common/Loader";
import MediaStreamPlayer from "../common/MediaStreamPlayer";

const Broadcast = () => {
  const { myStream, joinBroadcast } = useBroadcast();

  // useLayoutEffect(() => {
  //   joinBroadcast();
  // }, []);

  if (!myStream) return <Loader isFullScreen />;

  return (
    <Box h="100%">
      <MediaStreamPlayer stream={myStream} isMuted />
      <Button onClick={joinBroadcast}>Start Broadcast</Button>
    </Box>
  );
};

export default Broadcast;
