import { useState } from "react";
import VideoPlayer from "./_components/video-player";
import AnswerInput from "./_components/answer-input";
import Standings from "./_components/standings";
import SongInfo from "./_components/song-info";

interface GameQuizContainerProps {
  volume: number;
};

const GameQuizContainer = ({
  volume,
}: GameQuizContainerProps) => {
  const searchList = [
    "IU + Yoon Hyun-sang | When would it be",
    "IU + HIGH4 | Not Spring, Love or Cherry Blossoms",
    "IU | Good day",
    "IU | You & I",
    "IU | SOGYEOKDONG",
    "IU | The red shoes",
    "IU | Friday",
    "Girls' Generation | Bad Girl", "소녀시대 | Bad Girl",
    "Girls' Generation | The Boys", "소녀시대 | 더 보이즈",
    "Girls' Generation | Gee", "소녀시대 | 지",
    "Girls' Generation | Chocolate Love", "소녀시대 | 초콜릿 러브",
    "Girls' Generation | Oh!", "소녀시대 | 오",
    "Girls' Generation | Run Devil Run", "소녀시대 | 런 데빌 런",
    "Girls' Generation | All my love is for you", "소녀시대 | All my love is for you",
    "Girls' Generation | Oh!", "소녀시대 | 오",
    "Girls' Generation | Paparazzi", "소녀시대 | Paparazzi",
    "Girls' Generation TTS | Twinkle", "소녀시대-태티서 | 트윙클",
    "Girls' Generation | I got a boy", "소녀시대 | 아이 갓 어 보이",
    "Girls' Generation | Hoot", "소녀시대 | 훗",
    "Girls' Generation | Time Machine", "소녀시대 | Time Machine",
    "Girls' Generation | Mr. Taxi", "소녀시대 | Mr. Taxi",
    "Girls' Generation | Dancing Queen", "소녀시대 | 댄싱퀸",
    "Girls' Generation | Genie", "소녀시대 | 소원을 말해봐",
    "Girls' Generation | Love & Girls", "소녀시대 | Love & Girls",
    "Girls' Generation | Flower Power", "소녀시대 | Flower Power",
    "Girls' Generation | Galaxy Supernova", "소녀시대 | Galaxy Supernova",
    "Girls' Generation | My oh My", "소녀시대 | My oh My",
    "Girls' Generation | Mr.Mr.", "소녀시대 | 미스터미스터",
    "Girls' Generation | Visual Dreams", "소녀시대 | 비주얼드림",
    "Girls' Generation | Genie", "소녀시대 | 소원을 말해봐",
  ];

  const test = [
    "BzYnNdJhZQw",
    "nn1pbxe8bAI",
    "ytXm2wdab-A",
    "XyzaMpAVm3s",
  ];

  const testStandings = [
    { userName: "abcd1234abcd1234", currentScore: 300 },
    { userName: "Andy", currentScore: 250 },
    { userName: "Blish", currentScore: 200 },
    { userName: "한국어테스트", currentScore: 150 },
    { userName: "abcd1234abcd1234", currentScore: 300 },
    { userName: "Andy", currentScore: 2250 },
    { userName: "Blish", currentScore: 200 },
    { userName: "한국어테스트", currentScore: 1450 },
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [guessedSong, setGuessedSong] = useState<string | null>(null);

  const handleGuess = (song: string) => {
    if (song === searchList[currentVideoIndex]) {
      setGuessedSong(song);
      if (currentVideoIndex < test.length - 1) {
        setCurrentVideoIndex(currentVideoIndex + 1);
      } else {
        // Handle end of playlist, for example, by showing a message or resetting
        alert("You've guessed all the songs!");
        setCurrentVideoIndex(0); // Reset to the first video if you want to loop
      }
    } else {
      setGuessedSong("Incorrect! Try again.");
    }
  };

  return (
    <div className="absoulte top-[5%] flex w-full flex-col justify-center items-center">
      {/** TODO: header needs to show prog */}
      <h1 className="text-3xl font-bold mt-4 mb-4">Guess the K-Pop Song</h1>
      <div className="flex items-center justify-center relative space-x-[10%]">
        <Standings userData={testStandings.sort((a, b) => b.currentScore - a.currentScore)} />
        <VideoPlayer videoId={test[currentVideoIndex]} volume={volume} />
        <SongInfo
          songName={"Good Day"}
          aritstName={"IU"}
          releaseYear={"2009"}
          videoLink={test[currentVideoIndex]}
          viewCount={1234567890}
        />
      </div>
      <AnswerInput songs={searchList} onGuess={handleGuess} />
    </div>
  );
};

export default GameQuizContainer;
