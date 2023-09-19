'use client'
import React, { useRef, Suspense } from 'react'
import { Canvas, extend, useFrame } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'

const ColorShiftMaterial = shaderMaterial(
  { time: 0, color: new THREE.Color(0.2, 0.0, 0.1) },
  // vertex shader
  /*glsl*/ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment shader
  /*glsl*/ `
    uniform float time;
    uniform vec3 color;
    varying vec2 vUv;
    void main() {
      gl_FragColor.rgba = vec4(0.5 + 0.3 * sin(vUv.yxx + time) + color, 1.0);
    }
  `
)

// declaratively
extend({ ColorShiftMaterial })
const Scene = () => {
  return (
    <Canvas>
      <mesh>
        <ambientLight position={[10, 10, 10]} />
        <planeGeometry args={[3, 5]} />
        <colorShiftMaterial color='hotpink' time={5} />
      </mesh>
    </Canvas>
  )
}
export default function Home() {
  return <Scene />
}
