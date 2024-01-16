import "boxicons";
import React, { useEffect, useRef, useState } from "react";
import video from './assets/1.mp4'
import music from './assets/2.m4a'
import useSound from "use-sound";

const Player = () => {
  const [position, setPosition] = useState({x: 192, y: 209})
  const person = useRef()
  const block = useRef()
  const videoRef = useRef()
  const bg = useRef()
  const game = useRef()

  const [play, { pause, duration, sound }] = useSound(music);

  const [canMove, setCanMove] = useState(false)


  useEffect(() => {
    person.current.style.left = `170px`;
      person.current.style.top = `206px`;  

      
  }, [])
  
 

  useEffect(() => {
    const elements = document.querySelectorAll('.element'); // получаем все элементы с классом 'element'

    if (canMove) {
      person.current.style.left = `${position.x+window.scrollX-24}px`;
      person.current.style.top = `${position.y+window.scrollY-24}px`;  
    }

    
     const personIten = person.current.getBoundingClientRect();

     for (let i = 0; i < elements.length; i++) {
      const blockItem = elements[i].getBoundingClientRect();
      if (
        personIten.left < blockItem.right &&
        personIten.right > blockItem.left &&
        personIten.top < blockItem.bottom &&
        personIten.bottom > blockItem.top
      ) {
        setPosition({x: 192, y: 209})
        window.scrollTo(0, 0);
        console.log(true)
      } else {
        console.log(false)
      }
     }

     
    
  }, [position])

  const updatePosition = (e) => {
    
    setPosition({x: e.clientX, y: e.clientY });
    console.log(position)
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Получаем текущие позиции мыши и размеры окна
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Задаем порог для прокрутки
      const threshold = 100;
      // Проверяем, если курсор мыши приблизился к границам окна, прокручиваем страницу
      if (mouseX < threshold) {
        window.scrollBy(-5, 0);
        
         // Прокручиваем влево
      } else if (mouseX > windowWidth - threshold) {
        window.scrollBy(5, 0); // Прокручиваем вправо
        

      }

      if (mouseY < threshold) {
        window.scrollBy(0, -5); // Прокручиваем вверх
      } else if (mouseY > windowHeight - threshold) {
        window.scrollBy(0, 5); // Прокручиваем вниз
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

   

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [position]);

  useEffect(() => {
    const elements = document.querySelectorAll('.playScreamer'); // получаем все элементы с классом 'element'

    if (canMove) {
      person.current.style.left = `${position.x+window.scrollX-24}px`;
      person.current.style.top = `${position.y+window.scrollY-24}px`;  
    }

    
     const personIten = person.current.getBoundingClientRect();

     for (let i = 0; i < elements.length; i++) {
      const blockItem = elements[i].getBoundingClientRect();
      if (
        personIten.left < blockItem.right &&
        personIten.right > blockItem.left &&
        personIten.top < blockItem.bottom &&
        personIten.bottom > blockItem.top
      ) {
        finish()
      
      } else {
       
      }
     }

     
     
    
  }, [position])

  const finish = () => {
    bg.current.style.width = '100%';
      bg.current.style.height = '100%';
      game.current.style.display = 'none';

      videoRef.current.style.display = 'block';
      play()
      
   }

  return (
    <div className="w-full h-full bg-slate-800 bg"  onMouseMove={updatePosition} ref={bg}>
      <video className="hidden w-auto h-full mx-auto z-30" autoPlay muted ref={videoRef}>
        <source src={video} type="video/mp4"/>
        
      </video>
      <div className="" ref={game}>
      <div className="person w-12 h-12 absolute top-0 left-0 z-10" ref={person} onMouseOver={() => setCanMove(true)} onMouseLeave={() => setCanMove(false)}></div>


      <div className="element h-full bg-blue-900 w-36 absolute"></div>
      <div className="element w-full bg-blue-900 h-36 absolute" ></div>
      <div className="element w-full bg-blue-900 h-10 absolute bottom-0"></div>
      <div className="element  bg-blue-900 w-56 absolute left-64 h-5/6"></div>
      <div className="element  bg-blue-900 w-36 absolute left-1/3 h-4/6 bottom-0"></div>
      <div className="element  bg-blue-900 w-36 absolute left-1/2 h-3/6 bottom-0"></div>
      <div className="element  bg-blue-900 w-36 absolute left-1/2 h-3/6 -top-24"></div>
      <div className="element  bg-blue-900 w-36 absolute left-2/3 h-48 bottom-0"></div>
      <div className="element  bg-blue-900 w-36 absolute left-2/3 h-2/3 top-46"></div>
      <div className="element  bg-blue-900 w-20 absolute right-48 h-2/3 top-46"></div>
      <div className="element  bg-blue-900 w-20 absolute right-48 h-48 bottom-0"></div>
      <div className="element  bg-blue-900 w-28 absolute right-0 h-full bottom-0"></div>
      <div className="playScreamer  bg-red-900 w-10 absolute right-32 h-10 top-48"></div>
      </div>
      
    </div>
  );
};

export default Player;
