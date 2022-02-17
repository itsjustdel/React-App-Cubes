import * as THREE from "three";
import React, {useRef, useState, useEffect} from "react"
import { useFrame, useThree} from "@react-three/fiber"
import { useDrag,useHover, viewport, size } from '@use-gesture/react'

const Plane = ({brick, origin, rotation, planeClick, updateBricks }) => {
  
  //window size fpr drag scaling - ??
  const aspect = useRef()
  useFrame((state) => {
    const { mouse, viewport, size } = state    
    aspect.current = size.width/ viewport.width;
  })

     const [hovered, setHovered] = useState(false)
  //   const [clicked, setClicked] = useState(false)
     const [position, setPosition] = useState(origin)
     const mesh = useRef()
      const outline = useRef()
    //const aspect = useRef();
    //  const { size, viewport } = useThree();
    //  const aspect = size.width / viewport.width;
  


    const handleClick = (event) => {
        console.log("Clicked");
        event.eventObject.material.color.set(0xff0000); 
        
        //const { position } = mesh.current
        planeClick(event);
        
        // const vector = new THREE.Vector3(0,.5,0)
    
        // mesh.current.position.x += vector.x
        // mesh.current.position.y += vector.y
        // mesh.current.position.z += vector.z

        // outline.current.position.x += vector.x;
        // outline.current.position.y += vector.y;
        // outline.current.position.z += vector.z;

    }
    

  //   const hover = useHover(({ hovering }) => {
  //     setHovered(hovering);
  //   });

  //   const handleHover = (event) => {
  //       console.log("Hover");
  //      // setHovered( true );
  //   }

  //   const handlePointerLeave = (event) => {
  //       console.log("Hover Leave");
  //       //console.log(event);
  //       //event.eventObject.material.color.set(0xff2300); 
  //       //setHovered(false);
  //   }



    const drag = useDrag(({ offset: [x, y] }) => {
      //const [,, z] = position;
      const d = aspect.current;
      
      //console.log(d);
      mesh.current.position.y = -y/ d;
      outline.current.position.y = -y/d;//1000;/// / aspect;



      //setPosition([x / aspect, -y / aspect, z]);
  }, { pointerEvents: true});


    const handleMouseUp = (event) =>{

      //force a state refresh
      console.log("mouse up");

      //if we were dragging a mesh point, we need to set bricks on scene manager in state
      //meshes are only refs so we need to detail the size and shape for saving
      if(brick !=null)
        updateBricks(brick);
    }
    const Model = () => {

       console.log("Model");
         const geometry = new THREE.PlaneGeometry(1, 1);
         const edgesGeometry = new THREE.EdgesGeometry(geometry,.1);
         const outlineColour = hovered ? "grey" : "black";
         const mainColour = hovered ? "cyan" : "orange";
      //   //forces hovered lines over other outlines
         const renderOrder =0// hovered ? 100 : 50;
        return (
          <group dispose={null} >
            <mesh geometry={geometry} position = {position} rotation={rotation}  ref={mesh} 
             {...drag()} 
            //  onPointerUp = {handleMouseUp}
            // onPointerOver={handleHover} onPointerOut={handlePointerLeave} 
            onClick = {handleClick}
            >
              <meshStandardMaterial color={mainColour} />
            </mesh>
            
                <lineSegments geometry={edgesGeometry} renderOrder={renderOrder} position = {position} rotation={rotation} ref={outline}>
                <lineBasicMaterial color={outlineColour} />
                </lineSegments>
            
          </group>
        )
      }

    return (
        <>
        <Model />
        </>
    )



}

export default Plane;