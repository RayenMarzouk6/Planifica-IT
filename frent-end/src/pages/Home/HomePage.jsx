import { useEffect, useRef, useState } from 'react';
import './Home.css';
import NavBarHome from './navBarHome';
import { gsap, Power2 } from 'gsap';
import CSSRulePlugin from 'gsap/CSSRulePlugin';

// Initialisation des plugins GSAP
gsap.registerPlugin(CSSRulePlugin);

const HomePage = () => {
  let titleItem = useRef(null);
  let descItem = useRef(null);
  let containerImage = useRef(null);
  let image = useRef(null);
  let imageReveal = CSSRulePlugin.getRule('.img-container::after'); // Cible le pseudo-élément ::after

  const [currentImage, setCurrentImage] = useState(1); // État pour suivre l'image actuelle

  useEffect(() => {
    // Animation du titre et de la description
    gsap.to(titleItem, 0.8, {
      opacity: 1,
      y: -20,
      ease: 'power3.out',
      delay: 0.2,
    });
    gsap.to(descItem, 0.8, {
      opacity: 1,
      y: -20,
      ease: 'power3.out',
      delay: 0.4,
    });

    // Intervalle pour changer l'image toutes les 10 secondes (10100 ms)
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage % 14) + 1); // Change l'image de 1 à 14
    }, 10100);

    // Nettoyer l'intervalle lors du démontage du composant
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Animation de révélation de l'image (de droite à gauche)
    gsap.to(imageReveal, {
      width: '0%', // Réduit la largeur du masque à 0%
      duration: 1.4,
      ease: Power2.easeInOut,
    });
  }, [currentImage]); // Déclencher l'animation à chaque changement d'image

  return (
    <>
      <NavBarHome />
      <div className='p-20'>
        <div className='flex justify-evenly items-center pt-28'>
          <div className='max-w-lg'>
            <p className="libre-baskerville-bold opacity-0" ref={el => titleItem = el}>Optimize IT Projects</p>
            <p className="libre-baskerville-regular opacity-0" ref={el => descItem = el}>
            Streamline your IT project workflows with powerful tools and insights.
            Plan, track, and deliver efficiently—all in one platform.            </p>
            <div className='py-10'>
              <button className='bg-slate-950 px-9 py-4 text-white rounded-lg mr-4'>Get Started</button>
              <button className='border-2 border-solid border-slate-950 px-4 py-4 rounded-lg'>Learn More</button>
            </div>
          </div>

          
          <div className='max-w-lg img-container' ref={el => containerImage = el}>
            {/* Utilisez l'état currentImage pour changer l'image */}
            <img src={`./Design/${currentImage}.webp`} alt={`Design ${currentImage}`} ref={el => image = el} />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;