import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, ExternalLink } from 'lucide-react';
import { InstagramIcon } from './Icons';

export default function VideoReelPlayer({ videoSrc, posterSrc, instagramUrl, title }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  if (!videoSrc) return null;

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative group rounded-lg overflow-hidden bg-black shadow-lg aspect-[9/16] max-w-sm mx-auto">
      <video
        ref={videoRef}
        src={videoSrc}
        poster={posterSrc}
        loop
        playsInline
        muted={isMuted}
        onClick={togglePlay}
        className="w-full h-full object-cover cursor-pointer"
      />

      {/* Overlay Play / Pause Icon Button */}
      {!isPlaying && (
        <div
          onClick={togglePlay}
          className="absolute inset-0 bg-black/30 flex items-center justify-center cursor-pointer transition-opacity"
        >
          <div className="w-14 h-14 rounded-full bg-[#111111]/80 text-[#e4ce9e] flex items-center justify-center pl-1 shadow-2xl border border-[#c5a059]/40 hover:scale-110 transition-transform">
            <Play className="w-7 h-7 fill-current" />
          </div>
        </div>
      )}

      {/* Top badges & controls */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-white">
        <span className="bg-[#111111]/80 text-[#e4ce9e] text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded backdrop-blur">
          Real Reel @kj_.collection
        </span>
        <button
          onClick={toggleMute}
          className="w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black transition"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Bottom Title & Link */}
      <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black via-black/60 to-transparent text-white">
        <p className="text-xs font-semibold truncate">{title}</p>
        {instagramUrl && (
          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-[11px] text-[#e4ce9e] hover:underline mt-1 font-medium"
          >
            <InstagramIcon className="w-3 h-3" />
            <span>Open in Instagram</span>
            <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
          </a>
        )}
      </div>
    </div>
  );
}