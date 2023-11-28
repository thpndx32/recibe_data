import { Canvas, useLoader } from "@react-three/fiber";
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import * as THREE from 'three'
import mapamundo from "./img/8k_earth_daymap.jpg"
import { useSpring } from '@react-spring/core'
import { PerspectiveCamera, Environment, MeshDistortMaterial, ContactShadows, OrbitControls } from '@react-three/drei'
import {a} from "@react-spring/three";
import { Cuerpo, TheButton } from "./styles/cuerpo";
import { useRef, useState, useEffect } from "react";
import { useFrame } from '@react-three/fiber'
import { firestore } from "./config/firebase";
import { collection, doc } from "firebase/firestore";

const LightSphere = ({
  color = "#FFFFFF",
  intensity = 1,
  position = [0, 0, 0],
  delay = 0, // Agrega una propiedad de delay con un valor predeterminado de 0
}) => {
  const [showSphere, setShowSphere] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowSphere(true);
    }, delay);

    return () => clearTimeout(timeoutId); // Limpiar el timeout al desmontar el componente
  }, [delay]);

  const emissiveMaterial = new THREE.MeshBasicMaterial({
    emissive: color,
    emissiveIntensity: intensity,
    side: THREE.DoubleSide,
  });

  return (
    <>
      {showSphere && (
        <>
          <a.mesh position={position}>
            <sphereGeometry args={[0.005, 32, 32]} />
            <a.meshBasicMaterial attach="material" {...emissiveMaterial} />
          </a.mesh>
          <pointLight castShadow={true} position={position} intensity={intensity} color={color} />
        </>
      )}
    </>
  );
};
const coordinates = (
  latitude,longitude,radius
) =>{
  const phi = (latitude - 90) * (Math.PI / 180);
  const theta = (longitude - 37) * (Math.PI / 180);
  // Calculate 3D coordinates on the sphere
  const x = radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return [x,y,z]
}

const Sphere = ({
  latitude,longitude, radius
}) => {
  const colorMap = useLoader(THREE.TextureLoader, mapamundo);
  const sphereRef = useRef();
  const coordenadas = coordinates(latitude,longitude,radius);
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
        <LightSphere position={coordenadas} intensity={2} color="#0000FF"/>
      </a.mesh>
      </>
    );
  };
export const Geolocator = () => {
  const [latitude, setLatitude] = useState();
  const [showCSV, setShowCSV] = useState(true);
  const [longitude, setLongitude] = useState();
  const radius = 2;
  const [data, loadingData, errData] = useCollection(collection(firestore,'client_data'));
  const [document, loadingDoc, errDoc] = useDocument(doc(firestore,'csv_files','data_generator_client'));
  const [listaConductores, setListaConductores] = useState([]);
  const [listaConductoresAdicionales, setListaConductoresAdicionales] = useState([]);
  useEffect(()=>{
    if(!loadingDoc&&document.data()){
    const cadena = document.data().content;
    const palabras = cadena.split(/[,\s]+/);
    const numeros = palabras.filter(function(e){
      return (!isNaN(e)&&e!='');
    })
    let coordenadas = [];
    numeros.forEach((e,index)=>{
      if((index+2)%4===0){
        coordenadas.push({
          Latitude:e,
        });
      } else if ((index+1)%4===0){
        coordenadas[coordenadas.length-1].Longitude=e;
      }
    })
    console.log(coordenadas);
    setListaConductores(coordenadas);
  }
  },[loadingDoc,document])
  useEffect(()=>{
    if(!loadingData){const array = data.docs.map((e)=>{
      console.log(e.data());
      return e.data();
    });
    setListaConductoresAdicionales(array);}
  },[loadingData,data])
    navigator.geolocation.getCurrentPosition(function(position) {
        //console.log("Position is :", position);
        //console.log("Latitude is :", position.coords.latitude);
        setLatitude(position.coords.latitude);
        //console.log("Longitude is :", position.coords.longitude);
        setLongitude(position.coords.longitude);
      })
    return (
        <Cuerpo>
          <TheButton onClick={()=>{
            setShowCSV(!showCSV);
          }}>
            Ocultar data csv
          </TheButton>
          <Canvas>
                <ambientLight intensity={0.6} />
                <Sphere latitude={latitude} longitude={longitude} radius={radius}/>       
              <OrbitControls/>
              {showCSV&&listaConductores.map((e,index)=>{
                const cordenadas = e.coordenadas?e.coordenadas:coordinates(e.Latitude,e.Longitude,radius);
                console.log("coordenadas", cordenadas);
                return(
                  <LightSphere key={index} position={cordenadas} intensity={2} color="#FF0000" delay={index*100}/>
                )
              })}
              {listaConductoresAdicionales.map((e,index)=>{
                const cordenadas = e.coordenadas?e.coordenadas:coordinates(e.latitude,e.longitude,radius);
                console.log("e la baina de lima",e);
                console.log("coordenadas", cordenadas);
                return(
                  <LightSphere key={index} position={cordenadas} intensity={2} color="#008f39" delay={index*100}/>
                )
              })}
            </Canvas>
        </Cuerpo>
    )
}