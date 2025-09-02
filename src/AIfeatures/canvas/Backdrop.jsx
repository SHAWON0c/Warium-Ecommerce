import React, { useRef } from 'react'
import * as THREE from 'three'
import { AccumulativeShadows, RandomizedLight, GradientTexture } from '@react-three/drei'

const Backdrop = () => {
  const shadows = useRef();

  return (
    <>
      {/* 🌈 Gradient Background (keeps structure intact) */}
      <mesh scale={100}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial side={THREE.BackSide}>
          <GradientTexture
            stops={[0, 0.5, 1]} // gradient stops
            colors={['#ff7e5f', '#feb47b', '#86a8e7']} // multiple colors
            size={1024}
          />
        </meshBasicMaterial>
      </mesh>

      {/* 🔦 Your Original Shadows Setup */}
      <AccumulativeShadows
        ref={shadows}
        temporal
        frames={60}
        alphaTest={0.50}  // lighter shadows
        scale={10}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, -0.14]}
      >
        <RandomizedLight 
          amount={4}
          radius={9}
          intensity={1.0}   // stronger light
          ambient={0.5}     // brighter ambient
          position={[5, 5, -10]}
        />
        <RandomizedLight 
          amount={4}
          radius={5}
          intensity={0.8}
          ambient={0.5}
          position={[-5, 5, -9]}
        />
      </AccumulativeShadows>
    </>
  )
}

export default Backdrop
