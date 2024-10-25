"use client";

import { usePlayerStore } from "@/hooks/usePlayerStore";
import { MusicCard } from "./MusicCard";

interface Song {
  title: string;
  audioSrc: string;
}

interface CardData {
  id: string;
  profileImage: string;
  description: string;
  songs: Song[];
}

interface CardListProps {
  cards: CardData[];
}

export function MusicCardList({ cards }: CardListProps) {
  const { playingCardIndex, setPlayingCardIndex } = usePlayerStore();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {cards.map((card, index) => (
        <MusicCard
          key={card.id}
          profileImage={card.profileImage}
          description={card.description}
          songs={card.songs}
          isPlaying={playingCardIndex === index}
          onPlay={() => setPlayingCardIndex(index)}
          onStop={() => setPlayingCardIndex(null)}
        />
      ))}
    </div>
  );
}
