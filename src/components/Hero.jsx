import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import '../styles/hero.css';

const Model = ({ scale, autoRotate }) => {
    const meshRef = useRef();

    useFrame(() => {
        if (meshRef.current && autoRotate) {
            meshRef.current.rotation.y += 0.005;
        }
    });

    return (
        <mesh ref={meshRef} scale={scale}>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color="orange" />
        </mesh>
    );
};

const Hero = () => {
    const [activeBg, setActiveBg] = useState(1);
    const [scale, setScale] = useState(1);
    const [autoRotate, setAutoRotate] = useState(true);

    useEffect(() => {
        let lastScrollY = window.scrollY;
        let ticking = false;

        const updateBg = () => {
            const windowHeight = window.innerHeight;
            if (lastScrollY > windowHeight * 1) {
                setActiveBg(2);
            } else {
                setActiveBg(1);
            }
            ticking = false;
        };

        const handleScroll = () => {
            lastScrollY = window.scrollY;
            if (!ticking) {
                window.requestAnimationFrame(updateBg);
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="hero-scroll-container">
            <div className={`background-image bg1 ${activeBg === 1 ? 'active' : ''}`}></div>
            <div className={`background-image bg2 ${activeBg === 2 ? 'active' : ''}`}></div>

            <div className="content-scroll-wrapper">
                <section className="content-section" style={{ height: '100vh' }}>
                    <div className="hero-content">
                        <h1>Строительство под ключ</h1>
                        <p>Профессиональный подход к каждому проекту</p>
                        <button className="cta-button">Оставить заявку</button>
                    </div>
                </section>

                <div className="model-container" style={{ height: '100vh' }}>
                    <button
                        onClick={() => setAutoRotate(!autoRotate)}
                        className="rotation-control"
                    >
                        {autoRotate ? '■ Остановить' : '▶ Вращать'}
                    </button>
                    <Canvas
                        camera={{ position: [0, 0, 5], fov: 50 }}
                        performance={{ min: 0.1 }}
                        frameloop="demand"
                    >
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} />
                        <Model scale={scale} />
                        <OrbitControls
                            enablePan={false}
                            enableZoom={false}
                            enableRotate={true}
                        />
                    </Canvas>
                </div>

                <section className="content-section" style={{ height: '100vh' }}>
                    <div className="hero-content">
                        <h1>Наши проекты</h1>
                        <p>Лучшие реализованные объекты</p>
                        <button className="cta-button">Смотреть проекты</button>
                    </div>
                </section>
            </div>

            <div className="main-content">
                {/* Основной контент страницы */}
            </div>
        </div>
    );
};

export default Hero;