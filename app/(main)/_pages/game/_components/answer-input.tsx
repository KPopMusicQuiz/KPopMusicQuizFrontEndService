"use client";

import { cn } from "@/lib/utils";
import React, { useState, useEffect, useRef } from "react";

interface AnswerInputProps {
  songs: string[]; // Preloaded list of song names
  onGuess: (song: string) => void; // Function to handle the song guess
}

const AnswerInput: React.FC<AnswerInputProps> = ({ songs, onGuess }) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredSongs, setFilteredSongs] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (inputValue) {
      const filtered = songs.filter((song) =>
        song.toLowerCase().includes(inputValue.toLowerCase())
      ).slice(0, 20); // Limit the filtered results to 20 items
      setFilteredSongs(filtered);
      setShowDropdown(true);
      setSelectedIndex(-1);
    } else {
      setFilteredSongs([]);
      setShowDropdown(false);
    }
  }, [inputValue, songs]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) => {
        const nextIndex = (prevIndex !== filteredSongs.length - 1) ? prevIndex + 1 : 0;
        scrollToItem(nextIndex);
        return nextIndex;
      });
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prevIndex) => {
        const nextIndex = (prevIndex !== 0) ? prevIndex - 1 : filteredSongs.length -1;
        scrollToItem(nextIndex);
        return nextIndex;
      });
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      handleGuess(filteredSongs[selectedIndex]);
    } else if (e.key === "Enter") {
      setShowDropdown(false);
    }
  };

  const handleGuess = (song: string) => {
    setInputValue(song);
    setFilteredSongs([]);
    setShowDropdown(false);
    onGuess(song);
  };

  const scrollToItem = (index: number) => {
    const dropdown = dropdownRef.current;
    const item = dropdown?.children[index] as HTMLElement;
    if (dropdown && item) {
      const dropdownRect = dropdown.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();

      if (itemRect.bottom > dropdownRect.bottom) {
        dropdown.scrollTop += itemRect.bottom - dropdownRect.bottom;
      } else if (itemRect.top < dropdownRect.top) {
        dropdown.scrollTop -= dropdownRect.top - itemRect.top;
      }
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowDropdown(false);
    }, 100); // Delay to allow click event to register
  };

  return (
    <div className="relative w-full max-w-md mx-auto mt-4">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setShowDropdown(true)}
        onBlur={handleBlur}
        className="w-full p-2 border rounded-md"
        placeholder="Type the song name..."
      />
      {showDropdown && filteredSongs.length > 0 && (
        <ul ref={dropdownRef} className="absolute left-0 w-full bg-slate-700 border border-gray-300 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto custom-scrollbar">
          {filteredSongs.map((song, index) => (
            <li
              key={song}
              className={cn(
                "p-2 cursor-pointer hover:bg-gray-100",
                { "bg-gray-200" : selectedIndex === index, "" : selectedIndex !== index }
              )}
              onClick={() => handleGuess(song)}
            >
              {song}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AnswerInput;