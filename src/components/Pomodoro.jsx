import React, { useState, useEffect, useRef } from "react";
import "./focus.css";

const Pomodoro = () => {
    const [minutes, setMinutes] = useState(30);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const intervalRef = useRef(null);
    const url = "https://open.spotify.com/embed/album/35DIb6j45YmbHAfyN7HgaG?utm_source=generator&theme=0";

    useEffect(() => {
        if (isActive) {
            intervalRef.current = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        setMinutes(30);
                        setSeconds(0);
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

  

    return (
        <div className="focus-container">
            <h1 className="titulo">Focuss</h1>
            <p className="count-number">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </p>
            <div className="btn-container">
                <button className="btn" onClick={toggleTimer}>{isActive ? 'Pausar' : 'Iniciar'}</button>
               
            </div>
            <div className="ifm">
                <iframe
                    className="if"
                    title="Contenido embebido único"
                    width="auto"
                    height="auto"
                    src={url}
                    frameBorder="0"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};

export default Pomodoro;
