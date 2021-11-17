import React, {useState, useEffect} from 'react';
import bombe1 from './assets/img/bombe1.png';
import bombe2 from './assets/img/bombe2.png';
import explosion from './assets/img/explosion.mp3'



export default function App() {
        const[minutes, setMinuts] = useState(1);
        const[seconds, setSeconds] = useState(0);
        const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;
        const[start, setStart] = useState(false)
        let sound = new Audio(explosion)
        
       
        
        useEffect(() => {
            explode()
            let interval = null;
            if(start){
                interval = setInterval(()=> {
                    if(seconds===0){
                        if(minutes !==0){
                            setSeconds(59);
                            setMinuts(minutes - 1);  
                        } else{
                            setStart(false)
                        }
                    }else{
                        setSeconds(seconds-1)
                    }
                }, 1000)
            }

            return ()=>{
                clearInterval(interval);
            }
        }, [start, seconds])

        function reset() {
            setSeconds(0);
            setMinuts(1);
            let exp=document.getElementById("bombeone");
                exp.style.display = 'flex';
                let expt=document.getElementById("bombetwo");
                expt.style.display='none';
        }

        function incr() {
            setMinuts(minutes + 1)
        }

        function decr() {
            if (minutes > 0)
                setMinuts(minutes - 1)
        }

        function toggleStart() {
            setStart(!start);
        }

        function explode(){

            if(minutes === 0 && seconds === 0){
               
                let exp=document.getElementById("bombeone");
                exp.style.display = 'none';
                let expt=document.getElementById("bombetwo");
                expt.style.display='flex';
                sound.play();
                  
            }
        }
       
      return (
          
        <div className="pomodoro">
           
                
            <div className="title">
                <h1>Pomodoro</h1>
            </div>
            <img className="bombeone" id='bombeone' src={bombe1}/>
            <img className="bombetwo" id='bombetwo' src={bombe2}/>
            <div className="timer">
                <div className="partone">
                    <button className="btn" onClick={() => decr()} ><span className="btntime">-</span></button>

                    <div className="timerText">{timerMinutes}<span className="dot">:</span>{timerSeconds}</div>

                    <button className="btn"  onClick={()=> incr()} ><span className="btntime">+</span></button>

                </div>

                <div className="parttwo">

                    <button onClick={() => toggleStart()} className="Start">{ start ? "stop" : "start" }</button>

                    <button onClick={() => reset()} className="Reset">Reset</button>
                </div>
            </div>
        </div>
        
    )
}
