import React, { useState, useEffect, useRef } from 'react';
import "./AlarmClock.css"

const AlarmClock = () => {
  const [alarmTime, setAlarmTime] = useState("");
  const [alarmSet, setAlarmSet] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // State to track if alarm is playing
//   const [alarmMessage, setAlarmMessage] = useState(""); // State to show alarm message
  const audioRef = useRef(null); // Reference to the audio object

  // Function to handle time input change
  const handleTimeChange = (e) => {
    setAlarmTime(e.target.value);
  };

  // Function to check if current time matches alarm time
  const checkTime = () => {
    const current = new Date();
    const currentTime = current.toTimeString().slice(0, 5); // Format: HH:MM
    if (alarmSet && currentTime === alarmTime) {
      playAlarm();
    }
  };

  // Function to play alarm sound
  const playAlarm = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/shuvo_mahalaya.mp3"); // Path to audio file in the public folder
    }
    audioRef.current.loop = true;
    audioRef.current.play().catch((error) => {
      console.error("Audio playback failed", error);
    });
    setIsPlaying(true); // Alarm is now playing
    // setAlarmMessage("💖🙏Happy Mahalaya🙏💖"); // Show message instead of alert
  };

  // Function to stop the alarm sound
  const stopAlarm = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset audio to start
      setIsPlaying(false); // Alarm is no longer playing
      setAlarmSet(false); // Reset alarm
    //   setAlarmMessage(""); // Clear the alarm message
    }
  };

  // Check the time every second
  useEffect(() => {
    const interval = setInterval(checkTime, 1000);
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [alarmTime, alarmSet]);

  return (
    <div style={{ position: 'relative', overflow: 'hidden',width: '100%', height: '100vh' , display:"flex", justifyContent:"center",  }}>
      {/* Background video */}
      <video 
        autoPlay 
        loop 
        muted 
        style={{ position: 'absolute', top: 0,  height: '100%', objectFit: 'cover', zIndex: -1 }}
      >
        <source src="/maa.mp4" type="video/mp4" /> {/* Path to your video file */}
        Your browser does not support the video tag.
      </video>

      <div style={{  position: 'absolute', zIndex: 1, bottom: 0, marginBottom:"20px"  }}>
        
        <input
          type="time"
          value={alarmTime}
          onChange={handleTimeChange}
          className='gradient-input'
        />
        <button className="gradient-button" onClick={() => (isPlaying ? stopAlarm() : setAlarmSet(true))}>
          {isPlaying ? "Stop Alarm" : "Set Alarm"}
        </button>
        {/* <p>{alarmMessage}</p> Display the alarm message here */}
      </div>
    </div>
  );
};

export default AlarmClock;
