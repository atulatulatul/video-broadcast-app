import { first, isArray } from "lodash";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Loader from "../../components/common/Loader";

const ClientSideAttendeeBroadcastProvider = dynamic(
  () => {
    return import("../../hooks/useBroadcastAttendee");
  },
  { ssr: false }
);
const ClientSideAttendBroadcast = dynamic(
  () => {
    return import("../../components/attend-broadcast");
  },
  { ssr: false }
);

const AttendBroadcastPage = () => {
  const router = useRouter();
  const { room_id } = router.query;
  const roomId = isArray(room_id) ? first(room_id) : room_id;

  if (!roomId) return <Loader isFullScreen />;

  return (
    <ClientSideAttendeeBroadcastProvider roomId={roomId}>
      <ClientSideAttendBroadcast />
    </ClientSideAttendeeBroadcastProvider>
  );
};

export default AttendBroadcastPage;
