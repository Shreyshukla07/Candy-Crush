import React, { useEffect,useState } from "react";
import yellow from './images/candies/Yellow.webp'
import green from './images/candies/Green.webp'
import purple from './images/candies/Purple.webp'
import red from './images/candies/Red.webp'
import orange from './images/candies/Orange.webp'
import blue from './images/candies/blue.webp'
import Draggable from "react-draggable";

const width=8 
const candyColor=[
  blue,
  green,
  orange,
  purple,
  red,
  yellow

]

const App=() => {
  const [currentColorArrangement, setCurrentColorArrangement]=useState([])
  const [SquareBeingDragged,setSquareBeingDragged]=useState(null)
  const [SquareBeingReplaced,setSquareBeingReplaced]=useState(null)
  
  const checkForColumnOfFour=( )=>{
    for (let i=0;i<=39;i++){
        const columnOfFour = [i,i+width,i+width*2,i+width*3]
        const decidedColor= currentColorArrangement[i]
        if (columnOfFour.every(square =>currentColorArrangement[square]===decidedColor)){
          columnOfFour.forEach(square=>currentColorArrangement[square]='')
          return true
        }
    }
    
  }



  const checkForColumnOfThree=( )=>{
    for (let i=0;i<=47;i++){
        const columnOfThree = [i,i+width,i+width*2]
        const decidedColor= currentColorArrangement[i]
        if (columnOfThree.every(square =>currentColorArrangement[square]===decidedColor)){
          columnOfThree.forEach(square=>currentColorArrangement[square]='')
          return true
        }
    }
  }

  const checkForRowOfFour=( )=>{
    for (let i=0;i<=64;i++){
        const rowOfFour = [i,i+1,i+2]
        const decidedColor= currentColorArrangement[i]
        const notValid=[6,7,14,15,22,23,30,31,38,39,46,47,54,55,63,64,5,13,21,29,37,45,53,62]
        if (notValid.includes(i)) continue
        if (rowOfFour.every(square =>currentColorArrangement[square]===decidedColor)){
          rowOfFour.forEach(square=>currentColorArrangement[square]='')
          return true
        }
    }
  }


  const checkForRowOfThree=( )=>{
    for (let i=0;i<=64;i++){
        const rowOfThree = [i,i+1,i+2]
        const decidedColor= currentColorArrangement[i]
        const notValid=[6,7,14,15,22,23,30,31,38,39,46,47,54,55,63,64]
        if (notValid.includes(i)) continue
        if (rowOfThree.every(square =>currentColorArrangement[square]===decidedColor)){
          rowOfThree.forEach(square=>currentColorArrangement[square]='')
          return true
        }
    }
  }


  const moveSquareBelow=()=>{
    for(let i=0;i<=55;i++){
        const firstRow=[0,1,2,3,4,5,6,7]
        const isFirstRow=firstRow.includes(i)

        if (isFirstRow && currentColorArrangement[i]===''){
            let randomNunber=Math.floor(Math.random()*candyColor.length)
            currentColorArrangement[i]=candyColor[randomNunber]
        }
        if ((currentColorArrangement[i+width])===''){
            currentColorArrangement[i+width]=currentColorArrangement[i]
            currentColorArrangement[i]=''
        }  
    }
  }

  
 const dragStart =(e)=>{
   setSquareBeingDragged(e.target)
   console.log('drag start')
 }

 const dragDrop=(e)=>{
    setSquareBeingReplaced(e.target)
    console.log('drop')
 }

 const dragEnd=(e)=>{
    console.log('end')
    const squareBeingDraggedId=parseInt(SquareBeingDragged.getAttribute('data-id'))
    const squareBeingReplacedId=parseInt(SquareBeingReplaced.getAttribute('data-id'))
    
    currentColorArrangement[squareBeingReplacedId]=SquareBeingDragged.getAttribute('src')
    currentColorArrangement[squareBeingDraggedId]=SquareBeingReplaced.getAttribute('src')
 

   const validMoves=[
    squareBeingDraggedId -1,
    squareBeingDraggedId +1,
    squareBeingDraggedId + width,
    squareBeingDraggedId - width
   ]
   const validMove=validMoves.includes(squareBeingReplacedId)

   const isAColumnOfFour=checkForColumnOfFour()
    const isARowOfFour=checkForRowOfFour()
    const isAColumnOfThree=checkForColumnOfThree()
    const isARowOfThree=checkForRowOfThree()   

    if(squareBeingReplacedId && validMove &&
        (isAColumnOfFour|| isAColumnOfThree|| isARowOfFour|| isARowOfThree)){
            setSquareBeingDragged(null)
            setSquareBeingReplaced(null)
        }
        else{
            currentColorArrangement[squareBeingReplacedId]=SquareBeingReplaced.getAttribute('src')
            currentColorArrangement[squareBeingDraggedId]=SquareBeingDragged.getAttribute('src')
            setCurrentColorArrangement([...currentColorArrangement])

        }

 }


  const createBoard =() => {
  const randomColorArrangement=[]
    for (let i=0; i<width*width;i++){
      const randomNumberFrom0to5=Math.floor(Math.random()* candyColor.length)
      const randomcolor =candyColor[randomNumberFrom0to5]
      randomColorArrangement.push(randomcolor)
    }
    setCurrentColorArrangement(randomColorArrangement)
  }
  
    useEffect(() =>{
      createBoard()
    },[])


    useEffect(() =>{
        const timer=setInterval(()=>{
            checkForColumnOfFour()
           checkForColumnOfThree() 
           checkForRowOfFour()
           checkForRowOfThree()
           moveSquareBelow()
          
           setCurrentColorArrangement([...currentColorArrangement])
        },75)
        return()=> clearInterval(timer)

      },[checkForColumnOfFour,checkForRowOfFour,checkForColumnOfThree,checkForRowOfThree,moveSquareBelow,currentColorArrangement])

    
    

  return (
  <div className="app">
    <div className="game">
      
        {currentColorArrangement.map((candyColor,index)=>(
            <img alt={" "}
              key={index}
              src={candyColor}
              data-id={index}
              draggable={true}
              onDragStart={dragStart}
              onDragOver={(e) =>e.preventDefault()}
              onDragEnter={(e) =>e.preventDefault()}
              onDragLeave={(e) =>e.preventDefault()}
              onDrop={dragDrop}  
              onDragEnd={dragEnd}
            />
        ))}
      

     
    </div>
  </div>
  )
}

export default App;
