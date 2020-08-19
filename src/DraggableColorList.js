import React from 'react';
import {SortableContainer} from "react-sortable-hoc";
import DraggableColorBox from "./DraggableColorBox";


const DraggableColorList=SortableContainer(({colors,removeColors})=>{
    return(
        <div style={{height:"100%"}}>
            
            {colors.map((color,i)=>(
            <DraggableColorBox
                color={color.color}
                index={i} 
                name={color.name} 
                key={color.name} 
                handleClick={()=>removeColors(color.name)}
            />
            ))}
        </div>


    );




}



);
export default DraggableColorList;

