import { useEffect, useState } from "react";
import { Audio } from "expo-av";

export const useSound = (soundFile) => {
  const [sound, setSound] = useState(null);

  useEffect(() => {
    const loadSound = async () => {
      try {
        const { sound: loadedSound } = await Audio.Sound.createAsync(soundFile);
        setSound(loadedSound);
      } catch (error) {
        console.error("Erreur lors du chargement du son", error);
      }

      return () => {
        if (sound) {
          sound.unloadAsync().catch((err) => console.error(err));
        }
      };
    };

    loadSound();
  }, [soundFile]);

  const playSound = async () => {
    if (sound) {
      await sound.replayAsync();
    }
  };

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
    }
  };

  return { playSound, stopSound };
};