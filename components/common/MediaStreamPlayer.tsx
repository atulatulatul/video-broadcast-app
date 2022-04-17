import styled from "@emotion/styled";
import { useCallback, VideoHTMLAttributes } from "react";

const StyledVideo = styled.video`
  height: 100%;
  width: 100%;
`;

type PropsType = VideoHTMLAttributes<HTMLVideoElement> & {
  stream: MediaStream;
  isMuted?: boolean;
};

const MediaStreamPlayer = ({ stream, isMuted = true, ...props }: PropsType) => {
  const refVideo = useCallback(
    (node: HTMLVideoElement) => {
      if (node) node.srcObject = stream;
    },
    [stream]
  );

  return (
    <StyledVideo
      ref={refVideo}
      {...props}
      playsInline
      muted={isMuted}
      autoPlay
    />
  );
};

export default MediaStreamPlayer;
