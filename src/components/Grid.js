import Plane from "./Plane";


const Grid = ({planeClick}) => {

    const size = 5;
    const grid = [];
    for(let i = -size/2; i < size/2; i++){
        for(let j = -size/2; j <size/2; j++){
            grid.push([i,0,j]); // -5 to match gridhelper
        }
    }
    const mappedGrid = grid.map((coord, index) => {
        return <Plane brick={null} origin={coord} rotation = {[-Math.PI / 2, 0, 0]}  planeClick={planeClick} key={index} />  
    })    
    
    console.log("Scene man")

    return(
        <>
        {mappedGrid}
        </>
    )
}

export default Grid;