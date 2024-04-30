import React, { useRef, useEffect, useState } from 'react';
import petSprite from "../../petSprite/PetSprte.png";
// import petSprite from "../../petSprite/petSprite2.jpeg";

type AnimationState = {
    [key: string]: [row:number, col:number, repeat:number];
};

interface PetCanvasProps {
    givenaction: string;
    resetaction: ()=>void;
  }
  
function PetCanvas(props: PetCanvasProps) {
    const givenAction = props.givenaction;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [currentAction, setCurrentAction] = useState<string>(givenAction);
    const resetaction = props.resetaction;
    useEffect(()=>{
        setCurrentAction(givenAction);
    },[givenAction]);

    
    const animationState: AnimationState = {
        "Idle": [0, 64, -1],
        "Feed": [1, 64, 1],
        "Excited": [2, 64, 1],
        "Sleep":[3,64,1],
        "Talk": [4, 64, 2],
        "Greet": [5, 46, 2],
        "Nap": [6, 63, 3],
        "Play": [7, 62, 5],
       
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const petImage = new Image();
        if (!canvas || !petImage) return;
        petImage.src = petSprite;
        const context = canvas.getContext('2d');
        if (!context) return;

        const CANVAS_WIDTH = canvas.width = 400;
        const CANVAS_HEIGHT = canvas.height = 400;
        const spriteWidth = 400;
        const spriteHeight = 400;

        const framesPerSecond = 25; // Each frame runs once every 1/60 second
        const frameTime = 1000/framesPerSecond; // Interval between frames in milliseconds
        let animationId: number;
        let fn = 0;

        function animate(timestamp: number) {
            if (!context) return;
            context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

            const elapsedTime = timestamp - lastTimestamp;
            
            if (elapsedTime > frameTime){ 
                    lastTimestamp = timestamp;
                    fn = (fn + 1) % animationState[currentAction][1];
                    if (fn === 0) {
                        if (animationState[currentAction][2] === -1) animationState[currentAction][2] = -1;
                        
                        animationState[currentAction][2]--;
                        if (animationState[currentAction][2] === 0) {
                            if (currentAction == "Nap"){
                                setCurrentAction("Excited");
                                return;
                            }

                            cancelAnimationFrame(animationId);
                            setCurrentAction("Idle");
                            resetaction();
                            return;
                        }
                    }
                    
                    if (currentAction === "Sleep"){
                        if (fn == 62){
                           setCurrentAction("Nap")
                        }
                    }
                
            }
            
           

            const xIndex = fn;
            const yIndex = animationState[currentAction][0];
            context.drawImage(
                petImage,
                xIndex * spriteWidth,
                yIndex * spriteHeight,
                spriteWidth,
                spriteHeight,
                0,
                0,
                spriteWidth,
                spriteHeight
            );

            animationId = requestAnimationFrame(animate);
        }

        let lastTimestamp = performance.now();
        animate(lastTimestamp);

        return () => cancelAnimationFrame(animationId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentAction]);

    return (
        <>
            <canvas ref={canvasRef} {...props} onMouseOverCapture={()=>setCurrentAction("Excited")} />
          
        </>
    );
}

export default PetCanvas;
