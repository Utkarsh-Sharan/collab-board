import { useEffect, useState } from "react";
import icon from "../assets/collab-board-icon.png";
import { useNavigate, useParams } from "react-router-dom";
import PageLoader from "../components/PageLoader";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import DecisionButtons from "../components/buttons/DecisionButtons.jsx";
import { Check, Loader2, X } from "lucide-react";

function BoardInvitePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [boardData, setBoardData] = useState({
    boardId: "",
    boardTitle: "",
  });
  const [isInviteInvalid, setIsInviteInvalid] = useState(false);
  const [isResponding, setIsResponding] = useState(false);
  const [hasResponded, setHasResponded] = useState(false);
  const [inviteResponse, setInviteResponse] = useState({
    isAccepted: false,
    response: "",
  });

  const { inviteToken } = useParams();
  const navigate = useNavigate();

  const goToWorkspace = () => {
    navigate("/workspace");
  };

  const acceptInvite = async () => {
    setIsResponding(true);

    try {
      const res = await axiosInstance.post(
        `boards/${boardData.boardId}/accept-invite/${inviteToken}`,
      );

      setInviteResponse({ isAccepted: true, response: res.data.message });
    } catch (error) {
      const backend = error?.response?.data;
      const message =
        (backend?.errors && Object.values(backend.errors)[0]) ||
        backend?.message ||
        "Something went wrong!";

      toast.error(message);
    } finally {
      setIsResponding(false);
      setHasResponded(true);
    }
  };

  const rejectInvite = async () => {
    setIsResponding(true);

    try {
      const res = await axiosInstance.post(
        `boards/${boardData.boardId}/reject-invite/${inviteToken}`,
      );

      setInviteResponse({ isAccepted: false, response: res.data.message });
    } catch (error) {
      const backend = error?.response?.data;
      const message =
        (backend?.errors && Object.values(backend.errors)[0]) ||
        backend?.message ||
        "Something went wrong!";

      toast.error(message);
    } finally {
      setIsResponding(false);
      setHasResponded(true);
    }
  };

  const renderContent = () => {
    if (isResponding) {
      return (
        <div className="flex justify-center items-center gap-2 text-teal-500">
          <Loader2 className="animate-spin" />
          <p>Sending Response...</p>
        </div>
      );
    } else if (hasResponded) {
      return (
        <>
          <div
            className={`flex justify-center items-center gap-2 ${inviteResponse.isAccepted ? "text-teal-500" : "text-red-400"} mt-5`}
          >
            {inviteResponse.isAccepted ? <Check /> : <X />}
            <p>{inviteResponse.response}</p>
          </div>

          <button
            className="bg-orange-400 rounded-md w-full py-2 text-xl mt-5"
            onClick={goToWorkspace}
          >
            Go to workspace
          </button>
        </>
      );
    }

    return <DecisionButtons onYes={acceptInvite} onNo={rejectInvite} />;
  };

  useEffect(() => {
    const onLoadHandler = async () => {
      try {
        const res = await axiosInstance.get(`/boards/invite/${inviteToken}`);
        setBoardData({
          boardId: res.data.data.boardId,
          boardTitle: res.data.data.boardTitle,
        });
      } catch (error) {
        const backend = error?.response?.data;
        const message =
          (backend?.errors && Object.values(backend.errors)[0]) ||
          backend?.message ||
          "Something went wrong!";

        toast.error(message);
        setIsInviteInvalid(true);
      } finally {
        setIsLoading(false);
      }
    };

    onLoadHandler();
  }, []);

  return isLoading ? (
    <PageLoader />
  ) : (
    <main className="h-screen light-background flex items-center justify-center">
      <section className="flex-col items-center w-11/12 md:max-w-xl gap-2 border-2 border-orange-200 rounded-2xl px-10 py-20">
        <div className="flex items-center gap-2">
          <img src={icon} alt="app-image" className="w-6" />
          <h3 className="text-xl font-semibold">CollabBoard</h3>
        </div>

        {!isInviteInvalid ? (
          <>
            <div className="mt-10">
              <h1 className="text-3xl">Hey there!</h1>
              <p className="text-orange-400 text-lg">
                You have been invited to a board named{" "}
                <strong className="text-teal-500">
                  <em>{boardData.boardTitle}</em>
                </strong>
                . Do you want to accept this invitaion?
              </p>
            </div>

            {renderContent()}
          </>
        ) : (
          <div className="mt-10">
            <h1 className="text-3xl">Oops!</h1>
            <p className="text-orange-400 text-lg">
              Looks like the invite is invalid. Please request the board admin
              for a new invite.
            </p>
            <button
              className="bg-orange-400 rounded-md w-full py-2 text-xl mt-5"
              onClick={goToWorkspace}
            >
              Go to workspace
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default BoardInvitePage;
