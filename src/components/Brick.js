import * as THREE from "three";
import Plane from "./Plane";

const Brick = ({ brick, planeClick, updateBricks }) => {

  const CubeFromPlanes = () => {

if(brick.faces.rotations == null)
{

    const rotations = []
    const positions = []

    const quaternion = new THREE.Quaternion();

    for (let i = 0; i < 4; i++) {
      const vector = new THREE.Euler((-Math.PI / 2) * i, 0, 0);
      quaternion.setFromEuler(vector);

      //rotation doesn't take a THREE vector
      rotations.push([vector.x, vector.y, vector.z]);

      //z is .5 for half of brick size
      const position = new THREE.Vector3(0, 0, .5).applyQuaternion(quaternion);
      positions.push(position)

    }

    //now front and back panels
    for (let i = 0; i < 4; i += 2) {
      //spin round y axis this time +plus half  step
      const vector = new THREE.Euler(0, Math.PI / 2 + (-Math.PI / 2) * i, 0);
      quaternion.setFromEuler(vector);

      //rotation doesn't take a THREE vector
      rotations.push([vector.x, vector.y, vector.z]);

      //z is .5 for half of brick size
      const position = new THREE.Vector3(0, 0, 0.5).applyQuaternion(quaternion);

      positions.push(position)
    }

    //adjust positions
    for (let i = 0; i < positions.length; i++) {
      positions[i].x += brick.position.x;
      positions[i].y += brick.position.y + .5;//brick size
      positions[i].z += brick.position.z;

    }

    //add to brick and pass down? only if we are creating a new brick..
    
    brick.faces.positions = positions;
    brick.faces.rotations = rotations;
  }

    //updateBricks(brick); //when to add brick to list in state?
    return brick.faces.rotations.map((rot, index) => {
      return <Plane brick={brick} origin={brick.faces.positions[index]} rotation={rot} planeClick={planeClick} updateBricks={updateBricks}  key={index} />
    })

  }

  return (
    <>
      <CubeFromPlanes />
    </>
  )
}
export default Brick;