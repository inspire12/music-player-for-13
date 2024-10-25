"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { PlayerControls } from "./PlayerControls";
import { PlayingBar } from "./PlayingBar";

interface Song {
  title: string;
  audioSrc: string;
}

interface CardProps {
  profileImage: string;
  personName: string;
  description: string;
  songs: Song[];
  isPlaying: boolean;
  onPlay: () => void;
  onStop: () => void;
}

export function MusicCard({
  profileImage,
  personName,
  description,
  songs,
  isPlaying,
  onPlay,
  onStop,
}: CardProps) {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSongIndex]);

  const togglePlayPause = () => {
    if (isPlaying) {
      onStop();
    } else {
      onPlay();
    }
  };

  const playNextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    onPlay();
  };

  const playPreviousSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
    onPlay();
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center space-x-4">
        <motion.div
          animate={
            isPlaying
              ? {
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }
              : {}
          }
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          <Avatar className="w-16 h-16 border-2 border-gray-200 overflow-hidden rounded-full">
            <AvatarImage src={profileImage} alt="Profile" className="w-full h-full object-cover" />
            <AvatarFallback className="animate-pulse">
              <div className="w-full h-full bg-gray-300 rounded-full" />
            </AvatarFallback>
          </Avatar>
        </motion.div>
        <div>
          <CardTitle className="min-w-8">{personName}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <ul className="space-y-2">
            {songs.map((song, index) => (
              <li
                key={index}
                className={`flex items-center p-2 rounded-md transition-all duration-300 ${
                  index === currentSongIndex
                    ? "font-bold text-primary gradient-wave"
                    : "hover:bg-gray-100"
                }`}
              >
                <PlayingBar isPlaying={index === currentSongIndex && isPlaying} />
                <span>{song.title}</span>
              </li>
            ))}
          </ul>
        </div>
        <PlayerControls
          isPlaying={isPlaying}
          onPlayPause={togglePlayPause}
          onPrevious={playPreviousSong}
          onNext={playNextSong}
        />
      </CardContent>
      <audio ref={audioRef} src={songs[currentSongIndex ?? 0].audioSrc} onEnded={playNextSong} />
    </Card>
  );
}
