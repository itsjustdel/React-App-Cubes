import * as THREE from "three";
import Brick from "./Brick";

const Bricks = ({bricks, planeClick, updateBricks}) =>{

    const renderBricks = bricks.map((brick, index) => {        
        return <Brick brick={brick} planeClick={planeClick} updateBricks={updateBricks} key={index}/>
    });



    return(
        <>
            {renderBricks}
        </>
    )
}

export default Bricks;