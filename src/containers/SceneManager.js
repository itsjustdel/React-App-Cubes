import * as THREE from "three"
import React, {useEffect, useState} from 'react';
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, OrthographicCamera} from "@react-three/drei"
import Grid from "../components/Grid"
import Bricks from "../components/Bricks";
import Brick from "../components/Brick";

const SceneManager = () => {
    
    
    //keeps a list of all bricks in the scene
    const [bricks, setBricks] = useState([]);
          
    const CameraDolly = ({ isZoom }) => {
        const vec = new THREE.Vector3()
    
        useFrame((state) => {
        const step = 0.1
        const x = isZoom ? 0 : 5
        const y = isZoom ? 10 : 5
        const z = isZoom ? 10 : 5
    
        state.camera.position.lerp(vec.set(x, y, z), step)
        state.camera.lookAt(0, 0, 0)
        state.camera.updateProjectionMatrix()
        })
    
        return null
    } 

    const Setup = () => {
        return(
            <>
                {/* <OrthographicCamera  zoom={40}  makeDefault/> */}
                {/* <OrbitControls/> */}
                <ambientLight intensity={0.51} />
                <spotLight position={[10,15,10]} angle={0.3} />
            </>
        )
    }

    const planeClick = (event) => {
        console.log("plane clicked");
        console.log(event);
        const newBrick = {
             position: event.eventObject.position,
             faces: {
                 positions: null,
                 rotations: null
            }
        };
        
        const newBricks = [...bricks,newBrick];
        
        
        //adds to list, but maybe want to create cube first then add?
        setBricks(newBricks);
        
    }

    const updateBricks = (brick) => {
        // console.log("updating bricks");
        // //find brick in state
        // const bricksInState = [...bricks];
        // console.log("bricks in state =" + bricks);
        // //modify
        // const editBrick = bricksInState.find(brick);
        // editBrick.faces = brick.faces;
        
        // setBricks(bricksInState);
    }


    console.log("Scene man")
    return(
        <>
        
           <Canvas style={{touchAction: 'none' }}>
                <Setup/>
                <CameraDolly/>

                <Grid planeClick={planeClick}/>
                <Bricks bricks={bricks} planeClick={planeClick} updateBricks={updateBricks}/>
                
            </Canvas>
        </>
    )
}

export default SceneManager;


