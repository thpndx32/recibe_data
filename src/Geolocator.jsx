import { Canvas, useLoader } from "@react-three/fiber";
import * as THREE from 'three'
import mapamundo from "./img/8k_earth_daymap.jpg"
import { useSpring } from '@react-spring/core'
import { PerspectiveCamera, Environment, MeshDistortMaterial, ContactShadows, OrbitControls } from '@react-three/drei'
import {a} from "@react-spring/three";
import { Cuerpo, TheButton } from "./styles/cuerpo";
import { useRef, useState, useEffect } from "react";
import { useFrame } from '@react-three/fiber'

const LightSphere = ({
  color="#FFFFFF", intensity=1, position=[0, 0, 0]
})=>{
  const emissiveMaterial = new THREE.MeshBasicMaterial({
    emissive: color, // Set the emissive color
    emissiveIntensity: intensity, // Set the emissive intensity
    side: THREE.DoubleSide, // DoubleSide to make sure it's visible from both sides
  });
  return(
    <>
      <a.mesh position={position}
      >
        <sphereGeometry args={[0.005,32,32]} />
        <a.meshBasicMaterial attach="material" {...emissiveMaterial}/>
      </a.mesh>
      <pointLight castShadow={true} position={position} intensity={0.2} color={color}/>
    </>
  )
}

const Sphere = ({
  latitude,longitude
}) => {
  const colorMap = useLoader(THREE.TextureLoader, mapamundo);
  const sphereRef = useRef();

  // Define rotation animation using react-spring
  const phi = (latitude - 90) * (Math.PI / 180);
  const theta = (longitude - 37) * (Math.PI / 180);

  const radius = 2; // Adjust the radius as needed

  // Calculate 3D coordinates on the sphere
  const x = radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  console.log(x, y, z);
  const { rotation } = useSpring({
    from: { rotation: [0, 0, 0] },
    to: { rotation: [0, 2 * Math.PI, 0] },
    config: { duration: 10000, loop: true }, // Adjust duration and loop as needed
  });
    return (
      <>
      <a.mesh ref={sphereRef} rotation={rotation} >
        <sphereGeometry args={[radius, 32, 32]}/>
        <meshStandardMaterial attach="material" map={colorMap}/>
        <LightSphere position={[x,y,z]} intensity={20} color="#0000FF"/>
      </a.mesh>
      </>
    );
  };
export const Geolocator = () => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [listaConductores, setListaConductores] = useState([]);
    navigator.geolocation.getCurrentPosition(function(position) {
        console.log("Position is :", position);
        console.log("Latitude is :", position.coords.latitude);
        setLatitude(position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        setLongitude(position.coords.longitude);
      })
    return (
        <Cuerpo>
          <TheButton>
            RECIBIR LOCALIZACIONES
          </TheButton>
          <Canvas>
                <ambientLight intensity={0.6} />
                <Sphere latitude={latitude} longitude={longitude}/>       
              <OrbitControls/>
              {listaConductores.map((e)=>{
                return(
                  <LightSphere position={e} intensity={20}/>
                )
              })}
            </Canvas>
        </Cuerpo>
    )
}