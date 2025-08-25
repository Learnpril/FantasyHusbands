/**
 * AudioControls - Reusable audio control component
 * Provides music toggle functionality with customizable styling
 */

import { Music, VolumeX, Zap } from 'lucide-react';
import { useAudio } from '../../lib/stores/useAudio';

interface AudioControlsProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'minimal';
}

/**
 * Audio control button component with size and variant options
 * Displays current music state and allows toggling background music
 */
export function AudioControls({ 
  className = "", 
  size = 'md',
  variant = 'default' 
}: AudioControlsProps) {
  const { 
    toggleMusicMute, 
    isMusicMuted, 
    isMuted,
    toggleMute, 
    playButtonHover,
    playButtonClick,
    toggleBackgroundMusic,
    isBackgroundMusicPlaying
  } = useAudio();

  const sizeClasses = {
    sm: 'w-6 h-6 p-1 text-xs',
    md: 'w-8 h-8 p-1.5 text-sm',
    lg: 'w-10 h-10 p-2 text-base'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4', 
    lg: 'w-5 h-5'
  };

  const buttonClass = variant === 'minimal' 
    ? `${sizeClasses[size]} text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 rounded-md flex items-center justify-center`
    : `${sizeClasses[size]} text-purple-200 hover:text-white hover:bg-white/10 transition-all duration-300 rounded-lg border border-white/20 backdrop-blur-sm bg-white/5 flex items-center justify-center`;

  return (
    <div className={`flex gap-1 ${className}`}>
      {/* Music Toggle */}
      <button
        onClick={() => {
          playButtonClick();
          toggleMusicMute();
        }}
        onMouseEnter={() => playButtonHover()}
        className={buttonClass}
        title={isMusicMuted ? 'Turn Fantasy Music On' : 'Turn Fantasy Music Off'}
      >
        {isMusicMuted || !isBackgroundMusicPlaying ? (
          <VolumeX className={iconSizes[size]} />
        ) : (
          <Music className={iconSizes[size]} />
        )}
      </button>
      
      {/* Master Audio Toggle */}
      <button
        onClick={() => {
          playButtonClick();
          toggleMute();
        }}
        onMouseEnter={() => playButtonHover()}
        className={buttonClass}
        title={isMuted ? 'Turn All Audio On' : 'Turn All Audio Off'}
      >
        {isMuted ? (
          <VolumeX className={iconSizes[size]} />
        ) : (
          <Zap className={iconSizes[size]} />
        )}
      </button>
    </div>
  );
}