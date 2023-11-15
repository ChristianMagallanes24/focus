import React, { useState, useEffect, useRef } from "react";
import "./focus.css";

const Pomodoro = () => {
    const storedTime = JSON.parse(localStorage.getItem("pomodoroTime")) || { minutes: 60, seconds: 0 };

    const [minutes, setMinutes] = useState(storedTime.minutes);
    const [seconds, setSeconds] = useState(storedTime.seconds);
    const [isActive, setIsActive] = useState(false);
    const intervalRef = useRef(null);
    const url = "https://open.spotify.com/embed/album/35DIb6j45YmbHAfyN7HgaG?utm_source=generator&theme=0";
    useEffect(() => {
        if (isActive) {
            intervalRef.current = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(intervalRef.current);
                        setIsActive(false);
                    } else {
                        setMinutes((prevMinutes) => prevMinutes - 1);
                        setSeconds(59);
                    }
                } else {
                    setSeconds((prevSeconds) => prevSeconds - 1);
                }
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [isActive, minutes, seconds]);

    const toggleTimer = () => {
        if (isActive) {
            clearInterval(intervalRef.current);
            setIsActive(false);
        } else {
            setIsActive(true);
        }
    };

    const continueTimer = () => {
        setIsActive(true);
    };

    useEffect(() => {
        // Almacena el tiempo en localStorage cuando se pausa
        if (!isActive) {
            localStorage.setItem("pomodoroTime", JSON.stringify({ minutes, seconds }));
        }
    }, [isActive, minutes, seconds]);

    return (
        <div className="focus-container">
            <h1 className="titulo">Focuss</h1>
            <p className="count-number">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </p>
            <div className="btn-container"> 
            <button className="btn" onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</button>
            <button className="btn" onClick={continueTimer} disabled={isActive}>
                Continue
            </button>
            </div>
            <div className="ifm" >
            <iframe
  title="Contenido embebido único"
  width="600"
  height="400"
  src={url}
  frameBorder="0"
  allowFullScreen
></iframe>
            </div>
            
        </div>
        
    );
};

export default Pomodoro;
