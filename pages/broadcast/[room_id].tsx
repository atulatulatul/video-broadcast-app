import { first, isArray } from "lodash";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Loader from "../../components/common/Loader";

const ClientSideBroadcastProvider = dynamic(
  () => {
    return import("../../hooks/useBroadcast");
  },
  { ssr: false }
);
const ClientSideBroadcast = dynamic(
  () => {
    return import("../../components/broadcast");
  },
  { ssr: false }
);

const BroadcastPage = () => {
  const router = useRouter();
  const { room_id } = router.query;
  const roomId = isArray(room_id) ? first(room_id) : room_id;

  if (!roomId) return <Loader isFullScreen />;

  return (
    <ClientSideBroadcastProvider roomId={roomId}>
      <ClientSideBroadcast />
    </ClientSideBroadcastProvider>
  );
};

export default BroadcastPage;
