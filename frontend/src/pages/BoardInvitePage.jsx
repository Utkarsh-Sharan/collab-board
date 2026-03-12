import { useEffect, useState } from "react";
import icon from "../assets/collab-board-icon.png";
import { useNavigate, useParams } from "react-router-dom";
import PageLoader from "../components/PageLoader";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

function BoardInvitePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [boardTitle, setBoardTitle] = useState("");
  const [isInviteInvalid, setIsInviteInvalid] = useState(false);

  const { inviteToken } = useParams();
  const navigate = useNavigate();

  const goToWorkspace = () => {
    navigate("/workspace");
  };

  // const handleSubmit = () => {};

  useEffect(() => {
    const onLoadHandler = async () => {
      try {
        const res = await axiosInstance.get(`/boards/invite/${inviteToken}`);
        setBoardTitle(res.data.data.boardTitle);
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
                  <em>{boardTitle}</em>
                </strong>
                . Do you want to accept this invitaion?
              </p>
            </div>

            <div className="flex justify-center items-center gap-2 mt-5">
              <button className="bg-teal-500 text-white rounded-md w-1/2 py-2 text-xl">
                Yes
              </button>
              <button className="bg-red-400 text-white rounded-md w-1/2 py-2 text-xl">
                No
              </button>
            </div>
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
