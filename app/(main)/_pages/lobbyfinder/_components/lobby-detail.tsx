"use client";
import { MdMeetingRoom } from "react-icons/md";


const LobbyDetail = () => {
  return (
    <>
      {true && (
        <div className="flex flex-col w-full dark:bg-custom-slate-800 justify-center items-center">
          <MdMeetingRoom className="h-7 w-7 text-custom-slate-300 animate-pulse my-4" />
          <p className="text-xs text-custom-slate-300">
            placeholder // show lob info // spec or join button bottom
          </p>
        </div>
      )}
    </>
  );
};

export default LobbyDetail;