import { Music, VolumeX, Zap } from 'lucide-react';
import { useAudio } from '../../lib/stores/useAudio';

interface AudioControlsProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'minimal';
}

export function AudioControls({ 
  className = "", 
  size = 'md',
  variant = 'default' 
}: AudioControlsProps) {
  const { 
    toggleMusicMute, 
    toggleSoundMute, 
    isMusicMuted, 
    isSoundMuted, 
    playButtonHover,
    playButtonClick 
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
        title={isMusicMuted ? 'Turn Music On' : 'Turn Music Off'}
      >
        {isMusicMuted ? (
          <VolumeX className={iconSizes[size]} />
        ) : (
          <Music className={iconSizes[size]} />
        )}
      </button>
      
      {/* Sound Effects Toggle */}
      <button
        onClick={() => {
          playButtonClick();
          toggleSoundMute();
        }}
        onMouseEnter={() => playButtonHover()}
        className={buttonClass}
        title={isSoundMuted ? 'Turn Sound Effects On' : 'Turn Sound Effects Off'}
      >
        {isSoundMuted ? (
          <VolumeX className={iconSizes[size]} />
        ) : (
          <Zap className={iconSizes[size]} />
        )}
      </button>
    </div>
  );
}