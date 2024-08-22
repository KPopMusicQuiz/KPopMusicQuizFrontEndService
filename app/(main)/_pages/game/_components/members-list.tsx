import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { FaCrown } from "react-icons/fa6";


const test = {
  "songCount": 10,
  "players": [
    {
      "id": "0",
      "userName": "Andy"
    },
    {
      "id": "1",
      "userName": "Blish"
    },
    {
      "id": "2",
      "userName": "abcd1234abcd1234"
    },
    {
      "id": "3",
      "userName": "한국어테스트"
    },
    {
      "id": "0",
      "userName": "Andy"
    },
    {
      "id": "1",
      "userName": "Blish"
    },
    {
      "id": "2",
      "userName": "abcd1234abcd1234"
    },
    {
      "id": "3",
      "userName": "한국어테스트"
    }
  ],
  "difficulty": "Easy"
};

interface MemberEntryProps {
  avatar: string;
  userName: string;
}

const MemberEntry = ({
  avatar,
  userName,
}: MemberEntryProps) => {
  return (
    <div className="relative bg-gray-900 p-2 rounded-lg shadow-lg text-white w-32 border-stone-400 border">
      <FaCrown className="absolute top-0 right-0 text-yellow-300 text-md text-foreground"/>
      <div className="flex justify-center">
        <img
          src="https://via.placeholder.com/80"
          alt="Character Image"
          className="w-20 h-28 object-cover"
        />
      </div>
      
      <div className="absolute top-2 left-2 bg-black bg-opacity-75 text-white text-lg font-bold px-2 py-1 rounded-md">
        0
      </div>
      
      <div className="mt-2 flex justify-center bg-gray-800 rounded-lg py-1 overflow-hidden">
        <div className="text-center">
          <p className="text-sm font-bold">{userName}</p>
          <p className="text-xs text-gray-400">155</p>
        </div>
      </div>
    </div>
  )
};

const MembersList = () => {
  return (
    <div className="relative mx-auto mt-8 flex space-x-6">
      {test.players.map((member, index) => {
        return (
          <MemberEntry key={index} avatar="" userName={member.userName} />
        )
      })}
    </div>
  );
};

export default MembersList;


/**
 * <div className="flex items-center space-x-2 p-2 bg-transparent rounded-lg">
      <div className="relative">
        <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs font-bold rounded-tr-md rounded-bl-md px-2 py-0.5">
          Host
        </div>
        <Avatar className="h-14 w-14">
          <AvatarImage src={avatar} />
          <AvatarFallback className="bg-slate-500">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col items-start">
        <span className="text-white text-xl font-semibold">{userName}</span>
        <span className="text-gray-400 text-sm">15</span>
      </div>
    </div>
 */