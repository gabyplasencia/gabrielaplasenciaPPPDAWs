import { createContext, useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        audioRef.current = new Audio("/assets/background/music.mp3");
        audioRef.current.loop = true;
        audioRef.current.volume = 0.4;

        const savedState = localStorage.getItem('musicPlaying') === 'true';
        if (savedState) {
            const playPromise = audioRef.current.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => setIsPlaying(true))
                    .catch(e => {
                        console.log("Autoplay prevented:", e);
                        document.body.addEventListener('click', handleFirstInteraction, { once: true });
                    });
            }
        }

        return () => {
            if (audioRef.current) {
                localStorage.setItem('musicPlaying', !audioRef.current.paused);
                audioRef.current.pause();
            }
        };
    }, []);

    const handleFirstInteraction = () => {
        if (audioRef.current && localStorage.getItem('musicPlaying') === 'true') {
            audioRef.current.play()
                .then(() => setIsPlaying(true))
                .catch(e => console.log("Playback failed after interaction:", e));
        }
    };

    const toggleMusic = () => {
        if (!audioRef.current) return;

        if (audioRef.current.paused) {
            audioRef.current.play()
                .then(() => {
                    setIsPlaying(true);
                    localStorage.setItem('musicPlaying', true);
                })
                .catch(e => {
                    console.log("Playback failed:", e);
                    document.body.addEventListener('click', handleFirstInteraction, { once: true });
                });
        } else {
            audioRef.current.pause();
            setIsPlaying(false);
            localStorage.setItem('musicPlaying', false);
        }
    };

    return (
        <AudioContext.Provider value={{ 
            audioRef, 
            isPlaying, 
            toggleMusic 
        }}>
            {children}
        </AudioContext.Provider>
    );
};

AudioProvider.propTypes = {
    children: PropTypes.node.isRequired,
};