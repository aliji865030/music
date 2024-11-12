import React, { useState, useRef, useEffect } from 'react';
import { Howl } from 'howler';
import { IconButton, Slider } from '@mui/material';
import { PlayArrow, Pause, SkipPrevious, SkipNext, Shuffle } from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { songsData } from './songData';

const MusicPlayer = () => {
  const [tracks, setTracks] = useState(songsData);

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const soundRef = useRef(null);
  const progressInterval = useRef(null);
  const [currentPosition, setCurrentPosition] = useState(0);

  useEffect(() => {
    loadTrack(0);

    return () => {
      if (soundRef.current) {
        soundRef.current.stop();
      }
      clearInterval(progressInterval.current);
    };
  }, []);

  const loadTrack = (index) => {
    setLoading(true);

    const newTrack = new Howl({
      src: [tracks[index].src],
      onload: () => {
        setLoading(false);
      },
      onplay: () => {
        progressInterval.current = setInterval(() => {
          if (soundRef.current) {
            setProgress((soundRef.current.seek() / soundRef.current.duration()) * 100);
            setCurrentPosition(soundRef.current.seek());
          }
        }, 1000);
      },
      onend: () => {
        setIsPlaying(false);
        clearInterval(progressInterval.current);
      }
    });

    soundRef.current = newTrack;
    soundRef.current.pause();
    setCurrentTrackIndex(index);
  };

  const playTrack = (index) => {
    if (currentTrackIndex !== index) {
      if (soundRef.current) {
        soundRef.current.stop(); 
      }
      loadTrack(index);  
      soundRef.current.play();
      setIsPlaying(true);  
    } else {
      if (isPlaying) {
        soundRef.current.pause(); 
        setIsPlaying(false);  
        clearInterval(progressInterval.current); 
      } else {
        soundRef.current.seek(currentPosition);  
        soundRef.current.play();  
        setIsPlaying(true); 
  
        // Set interval to update the progress of the track
        progressInterval.current = setInterval(() => {
          if (soundRef.current) {
            setProgress((soundRef.current.seek() / soundRef.current.duration()) * 100);
            setCurrentPosition(soundRef.current.seek());
          }
        }, 1000);
      }
    }
  };
  
  const playNextTrack = () => {
    if (soundRef.current) {
      soundRef.current.stop();  
    }
    const nextIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(nextIndex); 
    soundRef.current.play();  
    setIsPlaying(true);  
  };
  
  const playPreviousTrack = () => {
    if (soundRef.current) {
      soundRef.current.stop();  
    }
    const prevIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(prevIndex);  
    soundRef.current.play();  
    setIsPlaying(true); 
  };
  
  const playRandomTrack = () => {
    if (soundRef.current) {
      soundRef.current.stop(); 
    }
    const randomIndex = Math.floor(Math.random() * tracks.length);
    loadTrack(randomIndex);  
    soundRef.current.play(); 
    setIsPlaying(true); 
  };
  

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;

    const items = Array.from(tracks);
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);

    setTracks(items);
  };

  return (
    <div className="music flex px-6">
      <div className="w-[70%] p-4 mt-[3rem]">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="tracks">
            {(provided) => (
              <table
                className="w-full bg-transparent rounded-md"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <thead>
                  <tr>
                    <th className="text-white">Title</th>
                    <th className="text-white">Artist</th>
                    <th className="text-white">Album</th>
                    <th className="text-white">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {tracks.map((track, index) => (
                    <Draggable key={track.src} draggableId={track.src} index={index}>
                      {(provided, snapshot) => (
                        <tr
                          className={`cursor-pointer ${currentTrackIndex === index ? 'bg-red-500' : ''} ${
                            !snapshot.isDragging ? 'hover:bg-gray-300 hover:text-black' : ''
                          }`}
                          onClick={() => playTrack(index)}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <td className="text-white">{track.title}</td>
                          <td className="text-white">{track.artist}</td>
                          <td className="text-white">{track.album}</td>
                          <td className="text-white">{track.time}</td>
                        </tr>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </tbody>
              </table>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {/* Sidebar Player Section */}
      <div className="w-[25%] p-4 bg-gray-900 bg-opacity-35 flex flex-col items-center text-white space-y-2 rounded-lg mt-[3rem]">
        {loading ? (
          <div className="text-white text-2xl">Loading...</div>
        ) : (
          <>
            <div className="w-40 h-40 bg-gray-700 rounded-md overflow-hidden">
              <img
                src={tracks[currentTrackIndex].image_src}
                alt="Album Cover"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center text-xl">{tracks[currentTrackIndex].title}</div>
            <div className="text-center">{tracks[currentTrackIndex].artist}</div>
            <div className="w-full flex gap-4 items-center mt-2">
              <div className="text-sm">{formatTime(currentPosition)}</div>
              <Slider
                value={progress}
                onChange={(e, value) => {
                  if (soundRef.current) {
                    soundRef.current.seek((value / 100) * soundRef.current.duration());
                  }
                }}
                sx={{
                  color: '#f50057',
                  height: 4,
                  '& .MuiSlider-thumb': {
                    width: 16,
                    height: 16,
                    backgroundColor: '#f50057',
                  },
                }}
              />
              <div className="text-sm">{formatTime(soundRef.current ? soundRef.current.duration() : 0)}</div>
            </div>
            <div className="w-full flex items-center justify-center space-x-4 mt-2">
              <IconButton onClick={playRandomTrack}>
                <Shuffle className="text-white" />
              </IconButton>
              <IconButton onClick={playPreviousTrack}>
                <SkipPrevious className="text-white" />
              </IconButton>
              <IconButton onClick={() => playTrack(currentTrackIndex)}>
                {isPlaying ? <Pause className="text-white" /> : <PlayArrow className="text-white" />}
              </IconButton>
              <IconButton onClick={playNextTrack}>
                <SkipNext className="text-white" />
              </IconButton>
            </div>
            
          </>
        )}
      </div>
    </div>
  );
};

export default MusicPlayer;
