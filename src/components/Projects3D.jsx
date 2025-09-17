// import React, { Suspense, useState } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, useGLTF, Html } from '@react-three/drei';
// import '../styles/projects3D.css';
//
// const TestModel = () => {
//     return (
//         <mesh>
//             <boxGeometry args={[1, 1, 1]} />
//             <meshStandardMaterial color="orange" />
//         </mesh>
//     );
// };
//
// // Используйте вместо Model компонента для проверки
// <TestModel />
//
// const Model = ({ modelPath, onLoaded }) => {
//     const { scene } = useGLTF(
//         process.env.PUBLIC_URL + modelPath,
//         undefined,
//         undefined,
//         (e) => onLoaded(e.type === 'load')
//     );
//     return <primitive object={scene} scale={0.5} />;
// };
//
// const Projects3D = () => {
//     const [errorStates, setErrorStates] = useState({
//         house1: false,
//         house2: false,
//         apartment: false
//     });
//
//     const models = [
//         {
//             path: '/models/house1.glb',
//             title: 'Загородный дом',
//             info: 'Площадь: 150 м² | Срок: 6 месяцев'
//         },
//         {
//             path: '/models/house2.glb',
//             title: 'Коттедж премиум-класса',
//             info: 'Площадь: 240 м² | Срок: 9 месяцев'
//         },
//         {
//             path: '/models/apartment.glb',
//             title: 'Квартира в новостройке',
//             info: 'Площадь: 85 м² | Срок: 12 месяцев'
//         }
//     ];
//
//     return (
//         <section id="projects">
//             <h2>Наши проекты в 3D</h2>
//
//             <div className="models-grid">
//                 {models.map((model) => (
//                     <div key={model.path} className="model-card">
//                         <h3>{model.title}</h3>
//                         <div className="canvas-wrapper">
//                             <Canvas>
//                                 <ambientLight intensity={0.5} />
//                                 <Suspense fallback={
//                                     <Html center>
//                                         <div className="loader">Загрузка...</div>
//                                     </Html>
//                                 }>
//                                     <Model
//                                         modelPath={model.path}
//                                         onLoaded={(success) =>
//                                             setErrorStates(prev => ({
//                                                 ...prev,
//                                                 [model.path.split('/').pop().split('.')[0]]: !success
//                                             }))
//                                         }
//                                     />
//                                     <OrbitControls enableZoom={true} />
//                                 </Suspense>
//                             </Canvas>
//                             {errorStates[model.path.split('/').pop().split('.')[0]] && (
//                                 <div className="error-message">
//                                     Не удалось загрузить модель
//                                 </div>
//                             )}
//                         </div>
//                         <p>{model.info}</p>
//                     </div>
//                 ))}
//             </div>
//         </section>
//     );
// };
//
// export default Projects3D;