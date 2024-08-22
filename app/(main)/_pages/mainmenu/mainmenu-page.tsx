"use client";

import Link from 'next/link';

const MainPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <header className="bg-gray-800 text-white p-4 text-center">
        <h1 className="text-3xl font-bold">Kpop Music Quiz</h1>
      </header>
      <main className="flex-1 w-full max-w-2xl mx-auto p-4 flex flex-col items-center gap-4">
        <div>
          <a className="block w-full py-4 px-6 bg-blue-500 text-white text-lg font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-300 ease-in-out text-center">
            {"SinglePlayer"}
          </a>
        </div>
        <div>
          <a className="block w-full py-4 px-6 bg-blue-500 text-white text-lg font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-300 ease-in-out text-center">
            {"Multiplayer"}
          </a>
        </div>
      </main>
    </div>
  );
};

export default MainPage;