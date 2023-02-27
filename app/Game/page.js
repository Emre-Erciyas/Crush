"use client"
import styles from "./Game.module.css"
import React, { useRef } from "react"
import { boardLength, fruits, blank, watermelon, bomb, pineapple, animationDuration } from "./constants"
import Image from "next/image"
import "../globals.css"
import Link from "next/link"

export default function Game(){

    //Current Board of the game.
    const [board, setBoard] = React.useState([])

    //Save squares without re-render.
    const firstSquare = React.useRef(null);
    const endSquare = React.useRef(null);

    //swapped is a boolean that will revert the move if it was not correct.
    const swapped = React.useRef(false)

    //The Score
    const score = React.useRef(0);

    const increment  = s => {
        score.current += s;
    }
    //Remaining Moves
    const moves = React.useRef(30)

    //Ref to Link component
    const linkRef = React.useRef(null)

    //Reference to all elements in the array xd
    const BoardRef = React.useRef(new Array(boardLength ** 2))

    //Reference to lines
    const horizontalRef = React.useRef(null)
    const verticalRef = React.useRef(null)
    const rotated45Ref = React.useRef(null)
    const rotated135Ref = React.useRef(null)
    const rotated225Ref = React.useRef(null)
    const rotated315Ref = React.useRef(null)
    //animation going on
    let isAnimation = useRef(false);
    
    //This Function creates the board when the game starts. It is used in useEffect and only runs once.
    const createBoard = () =>{
        const arr = []

        for(let i = 0; i < boardLength ** 2; i++){
            arr.push(fruits[Math.floor(Math.random() * fruits.length)])
        }
        setBoard(arr)
        
    }
    const isReady = () =>{
        if(board === null) return false
        for(let i = 0; i < boardLength ** 2; i++){
            if(board[i] === blank){
                return false
            }
        }
        return true
    }
    //The following functions are used in checkBoard. This will be a long one.
    const L = () => {
        for(let i = 0; i < boardLength ** 2; i++){
            if( i % boardLength < boardLength - 2 && board[i + 1] && board[i + 2] && board[i + boardLength] && board[i + 2 * boardLength] && board[i - 1] &&
                board[i].name === board[i - 1].name && 
                board[i].name === board[i + 1].name && 
                board[i].name === board[i + 2].name && 
                board[i].name === board[i + boardLength].name && 
                board[i].name === board[i + 2 * boardLength].name && 
                board[i] !== blank && board[i] !== pineapple && board[i] !== bomb && board[i] !== watermelon){
                setBoard((prevBoard) => {
                    const newBoard = [...prevBoard];
                    newBoard[i - 1] = blank;
                    newBoard[i] = bomb;
                    newBoard[i + 1] = blank;
                    newBoard[i + 2] = blank;
                    newBoard[i + boardLength] = blank;
                    newBoard[i + 2 * boardLength] = blank;
                    return newBoard;
                  });
                  increment(60);
                  return true
            }
            else if( i % boardLength < boardLength - 2 && board[i + 1] && board[i + 2] && board[i + boardLength] && board[i + 2 * boardLength] && board[i - boardLength] &&
                board[i].name === board[i - boardLength].name && 
                board[i].name === board[i + 1].name && 
                board[i].name === board[i + 2].name && 
                board[i].name === board[i + boardLength].name && 
                board[i].name === board[i + 2 * boardLength].name && 
                board[i] !== blank && board[i] !== pineapple && board[i] !== bomb && board[i] !== watermelon){
                setBoard((prevBoard) => {
                    const newBoard = [...prevBoard];
                    newBoard[i - boardLength] = blank;
                    newBoard[i] = bomb;
                    newBoard[i + 1] = blank;
                    newBoard[i + 2] = blank;
                    newBoard[i + boardLength] = blank;
                    newBoard[i + 2 * boardLength] = blank;
                    return newBoard;
                  });
                  increment(60);
                  return true
            }
            else if( i % boardLength < boardLength - 2 && board[i + 1] && board[i + 2] && board[i - boardLength] && board[i - 2 * boardLength] &&  board[i + boardLength] &&
                board[i].name === board[i + boardLength].name &&
                board[i].name === board[i + 1].name && 
                board[i].name === board[i + 2].name && 
                board[i].name === board[i - boardLength].name && 
                board[i].name === board[i - 2 * boardLength].name && 
                board[i] !== blank && board[i] !== pineapple && board[i] !== bomb && board[i] !== watermelon){
                setBoard((prevBoard) => {
                    const newBoard = [...prevBoard];
                    newBoard[i + boardLength]
                    newBoard[i] = bomb;
                    newBoard[i + 1] = blank;
                    newBoard[i + 2] = blank;
                    newBoard[i - boardLength] = blank;
                    newBoard[i - 2 * boardLength] = blank;
                    return newBoard;
                  });
                  increment(60);
                  return true
            }
            else if( i % boardLength < boardLength - 2 && i % 8 > 0 && board[i + 1] && board[i + 2] && board[i - boardLength] && board[i - 2 * boardLength] &&  board[i - 1] &&
                board[i].name === board[i - 1].name &&
                board[i].name === board[i + 1].name && 
                board[i].name === board[i + 2].name && 
                board[i].name === board[i - boardLength].name && 
                board[i].name === board[i - 2 * boardLength].name && 
                board[i] !== blank && board[i] !== pineapple && board[i] !== bomb && board[i] !== watermelon){
                setBoard((prevBoard) => {
                    const newBoard = [...prevBoard];
                    newBoard[i - 1]
                    newBoard[i] = bomb;
                    newBoard[i + 1] = blank;
                    newBoard[i + 2] = blank;
                    newBoard[i - boardLength] = blank;
                    newBoard[i - 2 * boardLength] = blank;
                    return newBoard;
                  });
                  increment(60);
                  return true
            }
            else if( i % boardLength > 1 && board[i - 1] && board[i - 2] && board[i + boardLength] && board[i + 2 * boardLength] && board[i - boardLength] &&
                board[i].name === board[i - boardLength].name && 
                board[i].name === board[i - 1].name && 
                board[i].name === board[i - 2].name && 
                board[i].name === board[i + boardLength].name && 
                board[i].name === board[i + 2 * boardLength].name && 
                board[i] !== blank && board[i] !== pineapple && board[i] !== bomb && board[i] !== watermelon){
                setBoard((prevBoard) => {
                    const newBoard = [...prevBoard];
                    newBoard[i - boardLength] = blank;
                    newBoard[i] = bomb;
                    newBoard[i - 1] = blank;
                    newBoard[i - 2] = blank;
                    newBoard[i + boardLength] = blank;
                    newBoard[i + 2 * boardLength] = blank;
                    return newBoard;
                  });
                  increment(60);
                  return true
            }
            else if( i % boardLength > 1 && i % boardLength < boardLength - 1 && board[i - 1] && board[i - 2] && board[i + boardLength] && board[i + 2 * boardLength] && board[i + 1] &&
                board[i].name === board[i + 1].name && 
                board[i].name === board[i - 1].name && 
                board[i].name === board[i - 2].name && 
                board[i].name === board[i + boardLength].name && 
                board[i].name === board[i + 2 * boardLength].name && 
                board[i] !== blank && board[i] !== pineapple && board[i] !== bomb && board[i] !== watermelon){
                setBoard((prevBoard) => {
                    const newBoard = [...prevBoard];
                    newBoard[i + 1] = blank;
                    newBoard[i] = bomb;
                    newBoard[i - 1] = blank;
                    newBoard[i - 2] = blank;
                    newBoard[i + boardLength] = blank;
                    newBoard[i + 2 * boardLength] = blank;
                    return newBoard;
                  });
                  increment(60);
                  return true
            }
            else if(i % boardLength > 1 && i % boardLength < boardLength - 1 && board[i - 1] && board[i - 2] && board[i - boardLength] && board[i - 2 * boardLength] && board[i + 1] &&
                board[i].name === board[i + 1].name && 
                board[i].name === board[i - 1].name && 
                board[i].name === board[i - 2].name && 
                board[i].name === board[i - boardLength].name && 
                board[i].name === board[i - 2 * boardLength].name && 
                board[i] !== blank && board[i] !== pineapple && board[i] !== bomb && board[i] !== watermelon){
                setBoard((prevBoard) => {
                    const newBoard = [...prevBoard];
                    newBoard[i + 1] = blank;
                    newBoard[i] = bomb;
                    newBoard[i - 1] = blank;
                    newBoard[i - 2] = blank;
                    newBoard[i - boardLength] = blank;
                    newBoard[i - 2 * boardLength] = blank;
                    return newBoard;
                  });
                  increment(60);
                  return true
            }
            else if(i % boardLength > 1 && board[i - 1] && board[i - 2] && board[i - boardLength] && board[i - 2 * boardLength] && board[i + boardLength] &&
                board[i].name === board[i + boardLength].name && 
                board[i].name === board[i - 1].name && 
                board[i].name === board[i - 2].name && 
                board[i].name === board[i - boardLength].name && 
                board[i].name === board[i - 2 * boardLength].name && 
                board[i] !== blank && board[i] !== pineapple && board[i] !== bomb && board[i] !== watermelon){
                setBoard((prevBoard) => {
                    const newBoard = [...prevBoard];
                    newBoard[i + boardLength] = blank;
                    newBoard[i] = bomb;
                    newBoard[i - 1] = blank;
                    newBoard[i - 2] = blank;
                    newBoard[i - boardLength] = blank;
                    newBoard[i - 2 * boardLength] = blank;
                    return newBoard;
                  });
                  increment(60);
                  return true
            }
            else if(i % boardLength < boardLength - 2 && board[i + 1] && board[i + 2] && board[i + boardLength] && board[i + 2 * boardLength] &&
                board[i].name === board[i + 1].name && 
                board[i].name === board[i + 2].name && 
                board[i].name === board[i + boardLength].name && 
                board[i].name === board[i + 2 * boardLength].name && 
                board[i] !== blank && board[i] !== pineapple && board[i] !== bomb && board[i] !== watermelon){
                setBoard((prevBoard) => {
                    const newBoard = [...prevBoard];
                    newBoard[i] = bomb;
                    newBoard[i + 1] = blank;
                    newBoard[i + 2] = blank;
                    newBoard[i + boardLength] = blank;
                    newBoard[i + 2 * boardLength] = blank;
                    return newBoard;
                  });
                  increment(50);
                  return true
            }
            else if(i % boardLength < boardLength - 2 && board[i + 1] && board[i + 2] && board[i - boardLength] && board[i - 2 * boardLength] &&
                board[i].name === board[i + 1].name && 
                board[i].name === board[i + 2].name && 
                board[i].name === board[i - boardLength].name && 
                board[i].name === board[i - 2 * boardLength].name && 
                board[i] !== blank && board[i] !== pineapple && board[i] !== bomb && board[i] !== watermelon){
                setBoard((prevBoard) => {
                    const newBoard = [...prevBoard];
                    newBoard[i] = bomb;
                    newBoard[i + 1] = blank;
                    newBoard[i + 2] = blank;
                    newBoard[i - boardLength] = blank;
                    newBoard[i - 2 * boardLength] = blank;
                    return newBoard;
                  });
                  increment(50);
                  return true
            }
            else if( i % boardLength > 1 && board[i - 1] && board[i - 2] && board[i + boardLength] && board[i + 2 * boardLength] &&
                board[i].name === board[i - 1].name && 
                board[i].name === board[i - 2].name && 
                board[i].name === board[i + boardLength].name && 
                board[i].name === board[i + 2 * boardLength].name && 
                board[i] !== blank && board[i] !== pineapple && board[i] !== bomb && board[i] !== watermelon){
                setBoard((prevBoard) => {
                    const newBoard = [...prevBoard];
                    newBoard[i] = bomb;
                    newBoard[i - 1] = blank;
                    newBoard[i - 2] = blank;
                    newBoard[i + boardLength] = blank;
                    newBoard[i + 2 * boardLength] = blank;
                    return newBoard;
                  });
                  increment(50);
                  return true
            }
            else if(i % boardLength > 1 && board[i - 1] && board[i - 2] && board[i - boardLength] && board[i - 2 * boardLength] &&
                board[i].name === board[i - 1].name && 
                board[i].name === board[i - 2].name && 
                board[i].name === board[i - boardLength].name && 
                board[i].name === board[i - 2 * boardLength].name && 
                board[i] !== blank && board[i] !== pineapple && board[i] !== bomb && board[i] !== watermelon){
                setBoard((prevBoard) => {
                    const newBoard = [...prevBoard];
                    newBoard[i] = bomb;
                    newBoard[i - 1] = blank;
                    newBoard[i - 2] = blank;
                    newBoard[i - boardLength] = blank;
                    newBoard[i - 2 * boardLength] = blank;
                    return newBoard;
                  });
                  increment(50);
                  return true
            }
            else if( i % boardLength > 0 && i % boardLength < boardLength - 1 && board[i + 1] && board[i - 1] && board[i + boardLength] && board[i + 2 * boardLength] &&
                board[i].name === board[i + 1].name && 
                board[i].name === board[i - 1].name && 
                board[i].name === board[i + boardLength].name && 
                board[i].name === board[i + 2 * boardLength].name && 
                board[i] !== blank && board[i] !== pineapple && board[i] !== bomb && board[i] !== watermelon){
                setBoard((prevBoard) => {
                    const newBoard = [...prevBoard];
                    newBoard[i] = bomb;
                    newBoard[i + 1] = blank;
                    newBoard[i - 1] = blank;
                    newBoard[i + boardLength] = blank;
                    newBoard[i + 2 * boardLength] = blank;
                    return newBoard;
                  });
                  increment(50);
                  return true
            }
            else if(i % boardLength < boardLength - 2 && board[i + 1] && board[i + 2] && board[i - boardLength] && board[i + boardLength] &&
                board[i].name === board[i + 1].name && 
                board[i].name === board[i + 2].name && 
                board[i].name === board[i - boardLength].name && 
                board[i].name === board[i + boardLength].name && 
                board[i] !== blank && board[i] !== pineapple && board[i] !== bomb && board[i] !== watermelon){
                setBoard((prevBoard) => {
                    const newBoard = [...prevBoard];
                    newBoard[i] = bomb;
                    newBoard[i + 1] = blank;
                    newBoard[i + 2] = blank;
                    newBoard[i - boardLength] = blank;
                    newBoard[i + boardLength] = blank;
                    return newBoard;
                  });
                  increment(50);
                  return true
            }
            else if( i % boardLength > 0 && i % boardLength < boardLength - 1 && board[i - 1] && board[i + 1] && board[i - boardLength] && board[i - 2 * boardLength] &&
                board[i].name === board[i - 1].name && 
                board[i].name === board[i + 1].name && 
                board[i].name === board[i - boardLength].name && 
                board[i].name === board[i - 2 * boardLength].name && 
                board[i] !== blank && board[i] !== pineapple && board[i] !== bomb && board[i] !== watermelon){
                setBoard((prevBoard) => {
                    const newBoard = [...prevBoard];
                    newBoard[i] = bomb;
                    newBoard[i - 1] = blank;
                    newBoard[i + 1] = blank;
                    newBoard[i - boardLength] = blank;
                    newBoard[i - 2 * boardLength] = blank;
                    return newBoard;
                  });
                  increment(50);
                  return true
            }
            else if(i % boardLength > 1 && board[i - 1] && board[i - 2] && board[i - boardLength] && board[i + boardLength] &&
                board[i].name === board[i - 1].name && 
                board[i].name === board[i - 2].name && 
                board[i].name === board[i - boardLength].name && 
                board[i].name === board[i + boardLength].name && 
                board[i] !== blank && board[i] !== pineapple && board[i] !== bomb && board[i] !== watermelon){
                setBoard((prevBoard) => {
                    const newBoard = [...prevBoard];
                    newBoard[i] = bomb;
                    newBoard[i - 1] = blank;
                    newBoard[i - 2] = blank;
                    newBoard[i - boardLength] = blank;
                    newBoard[i + boardLength] = blank;
                    return newBoard;
                  });
                  increment(50);
                  return true
            }
        }
        return false
    }
    const row5 = ()=>{
        for(let i = 0; i < boardLength ** 2; i++){
            if(i % 8 === 7 || i % 8 === 6 || i % 8 === 5 || i % 8 === 4) continue;
            if(board[i].name === board[i + 1].name && 
                board[i].name === board[i + 2].name && 
                board[i].name === board[i + 3].name && 
                board[i].name === board[i + 4].name && 
                board[i] !== blank && board[i] !== pineapple && board[i] !== bomb && board[i] !== watermelon){
                setBoard((prevBoard) => {
                    const newBoard = [...prevBoard];
                    newBoard[i] = blank;
                    newBoard[i + 1] = blank;
                    newBoard[i + 2] = watermelon;
                    newBoard[i + 3] = blank;
                    newBoard[i + 4] = blank;
                    return newBoard;
                  });
                  increment(50);
                  return true
            }
        }
        return false
    }
    const row4 = ()=>{
        for(let i = 0; i < boardLength ** 2; i++){
            if(i % 8 === 7 || i % 8 === 6 || i % 8 === 5) continue;
            if(board[i].name === board[i + 1].name && 
                board[i].name === board[i + 2].name && 
                board[i].name === board[i + 3].name && 
                board[i] !== blank && board[i] !== pineapple && board[i] !== bomb && board[i] !== watermelon){
                setBoard((prevBoard) => {
                    const newBoard = [...prevBoard];
                    newBoard[i] = blank;
                    newBoard[i + 1] = blank;
                    newBoard[i + 2] = blank;
                    newBoard[i + 3] = blank;
                    if(firstSquare.current === null && endSquare.current === null){
                        newBoard[i] = pineapple;
                    }
                    else{
                        if(parseInt(firstSquare.current.id) === i || parseInt(endSquare.current.id) === i ) newBoard[i] = pineapple;
                        else if(parseInt(firstSquare.current.id) === i + 1 || parseInt(endSquare.current.id) === i + 1) newBoard[i + 1] = pineapple;
                        else if(parseInt(firstSquare.current.id) === i + 2 || parseInt(endSquare.current.id) === i + 2) newBoard[i + 2] = pineapple;
                        else if(parseInt(firstSquare.current.id) === i + 3 || parseInt(endSquare.current.id) === i + 3) newBoard[i + 3] = pineapple;
                        else newBoard[i] = pineapple;
                    }
                    return newBoard;
                  });
                  increment(40);
                  return true
            }
        }
        return false
    }
    const row3 = ()=>{
        for(let i = 0; i < boardLength ** 2; i++){
            if(i % 8 === 7 || i % 8 === 6) continue;
            if(board[i].name === board[i + 1].name && board[i].name === board[i + 2].name && board[i] !== blank && board[i] !== pineapple && board[i] !== bomb && board[i] !== watermelon ){
                setBoard((prevBoard) => {
                    const newBoard = [...prevBoard];
                    newBoard[i] = blank;
                    newBoard[i + 1] = blank;
                    newBoard[i + 2] = blank;
                    return newBoard;
                  });
                  increment(30);
                return true
            }
        }
        return false
    }
    const col3 = ()=>{
        for(let i = 0; i < boardLength ** 2 - (boardLength * 2); i++){
            if(board[i].name === board[i + boardLength].name && 
                board[i].name === board[i + (2 * boardLength)].name && 
                board[i] !== blank && board[i] !== pineapple && board[i] !== bomb && board[i] !== watermelon ){
                setBoard((prevBoard) => {
                    const newBoard = [...prevBoard];
                    newBoard[i] = blank;
                    newBoard[i + boardLength] = blank;
                    newBoard[i + (2 * boardLength)] = blank;
                    return newBoard;
                  });
                  increment(30);
                return true
            }
        }
        return false
    }
    const col4 = ()=>{
        for(let i = 0; i < boardLength ** 2 - (boardLength * 3); i++){
            if(board[i].name === board[i + boardLength].name && 
                board[i].name === board[i + (2 * boardLength)].name && 
                board[i].name === board[i + (3 * boardLength)].name &&
                board[i] !== blank && board[i] !== pineapple && board[i] !== bomb && board[i] !== watermelon ){
                setBoard((prevBoard) => {
                    const newBoard = [...prevBoard];
                    newBoard[i] = blank;
                    newBoard[i + boardLength] = blank;
                    newBoard[i + (2 * boardLength)] = blank;
                    newBoard[i + (3 * boardLength)] = blank;
                    if(firstSquare.current === null && endSquare.current === null){
                        newBoard[i] = pineapple;
                    }
                    else{
                        if(parseInt(firstSquare.current.id) === i || parseInt(endSquare.current.id) === i ) newBoard[i] = pineapple;
                        else if(parseInt(firstSquare.current.id) === i + boardLength || parseInt(endSquare.current.id) === i + boardLength) newBoard[i + boardLength] = pineapple;
                        else if(parseInt(firstSquare.current.id) === i + (2 * boardLength) || parseInt(endSquare.current.id) === i + (2 * boardLength)) newBoard[i + (2 * boardLength)] = pineapple;
                        else if(parseInt(firstSquare.current.id) === i + (3 * boardLength) || parseInt(endSquare.current.id) === i + (3 * boardLength)) newBoard[i + (3 * boardLength)] = pineapple;
                        else newBoard[i] = pineapple;
                    }
                    return newBoard;
                  });
                  increment(40);
                return true
            }
        }
        return false
    }
    const col5 = ()=>{
        for(let i = 0; i < boardLength ** 2 - (boardLength * 4); i++){
            if(board[i].name === board[i + boardLength].name && 
                board[i].name === board[i + (2 * boardLength)].name && 
                board[i].name === board[i + (3 * boardLength)].name &&
                board[i].name === board[i + (4 * boardLength)].name &&
                board[i] !== blank && board[i] !== pineapple && board[i] !== bomb && board[i] !== watermelon ){
                setBoard((prevBoard) => {
                    const newBoard = [...prevBoard];
                    newBoard[i] = blank;
                    newBoard[i + boardLength] = blank;
                    newBoard[i + (2 * boardLength)] = watermelon;
                    newBoard[i + (3 * boardLength)] = blank;
                    newBoard[i + (4 * boardLength)] = blank;
                    return newBoard;
                  });
                  increment(50);
                return true
            }
        }
        return false
    }

    //This Function Checks the board for matches. If there is a match state is changed and component is re-rendered.
    //Since setState only affects the next re-render, do only one change after every re-render.
    const checkBoard = () =>{
        if(swapped.current) moves.current--;
        //make so that if there is a blank currently do not make a match.
        if(!isReady()) return
        //If board is not created do nothing
        if(board.length <= 0) return;
        //if a match is found then check no more. If there are more matches check it in the next re-render.
        if(row5()){ swapped.current = false; return}
        else if(col5()){ swapped.current = false; return}
        else if(L()){ swapped.current = false; return}
        else if(row4()){ swapped.current = false; return}
        else if(col4()){ swapped.current = false; return}
        else if(row3()){ swapped.current = false; return}
        else if(col3()){ swapped.current = false; return}
        //if swapped is true but no match found then revert the move, it was not correct.
        if(swapped.current){
            moves.current++;
            setBoard(prevBoard => {
                const newBoard = [...prevBoard];
                newBoard[endSquare.current.id] = prevBoard[firstSquare.current.id]
                newBoard[firstSquare.current.id] = prevBoard[endSquare.current.id]
                return newBoard
            })
            swapped.current = false;
        }
    }

    //Fill the board when there are blank squares.
    const fillBoard = () =>{
        for(let i = boardLength ** 2 - 1; i >= 0 ; i--){
            if(board[i] === blank){
                if(i <= 7){
                    setBoard((prevBoard) =>{
                        const newBoard = [...prevBoard];
                        newBoard[i] = fruits[Math.floor(Math.random() * fruits.length)]
                        return newBoard
                    })
                }else{
                    setBoard((prevBoard) => {
                        const newArray = [...prevBoard];
                        const temp = newArray[i];
                        newArray[i] = newArray[i - 8];
                        newArray[i - 8] = temp;
                        return newArray;
                    })
                }
            }
        }
    }
    React.useEffect(()=>{
        createBoard();
    }, [])
    //make the moves slower
    React.useEffect(()=>{
        const waitTime = isAnimation.current ? animationDuration : 50;
        const fill  = setTimeout(fillBoard, waitTime);
        const check  = setTimeout(checkBoard, 10);
        return () => {
            clearTimeout(check)
            clearTimeout(fill)
        }
        
    }, [board])
    React.useEffect(() => {
        if(moves.current > 0) return 
        if(!isReady()) return
        const clicker = () =>{
            if(linkRef.current) linkRef.current.click();
        }
        setTimeout(clicker, 300);
        return () => clearTimeout(clicker)
    })
    React.useEffect(()=>{
        score.current = 0;
    }, [])

    React.useEffect(()=>{
        if(typeof window !== undefined) sessionStorage.setItem("score", score.current)
    },[score.current])

    const makeInvisible = (currentRef) =>{
        currentRef.current.style.visibility = 'hidden';
        isAnimation.current = false;
    }

    const pineapple1 = (id) =>{
        verticalRef.current.style.visibility = 'visible'
        verticalRef.current.style.left = `${(id % 8) * 80 + 30}px`
        horizontalRef.current.style.visibility = 'visible'
        isAnimation.current = true;
        horizontalRef.current.style.top = `${Math.floor(id / 8) * 80 + 30}px`
        setTimeout(() => makeInvisible(verticalRef), animationDuration);
        setTimeout(() => makeInvisible(horizontalRef), animationDuration);
        
    }
    const pineapple2 = (id) =>{
        verticalRef.current.style.visibility = 'visible'
        horizontalRef.current.style.visibility = 'visible'
        rotated45Ref.current.style.visibility = 'visible'
        rotated135Ref.current.style.visibility = 'visible'
        rotated225Ref.current.style.visibility = 'visible'
        rotated315Ref.current.style.visibility = 'visible'
        verticalRef.current.style.left = `${(id % 8) * 80 + 27}px`
        horizontalRef.current.style.top = `${Math.floor(id / 8) * 80 + 30}px`
        rotated45Ref.current.style.left = `${(id % 8) * 80 + 27}px`
        rotated135Ref.current.style.left = `${(id % 8) * 80 + 60}px`
        rotated225Ref.current.style.left = `${(id % 8) * 80 + 20}px`
        rotated315Ref.current.style.left = `${(id % 8) * 80 + 45}px`
        rotated45Ref.current.style.top = `${Math.floor(id / 8) * 80 + 40}px`
        rotated135Ref.current.style.top = `${Math.floor(id / 8) * 80 + 40}px`
        rotated225Ref.current.style.top = `${Math.floor(id / 8) * 80 + 40}px`
        rotated315Ref.current.style.top = `${Math.floor(id / 8) * 80 + 60}px`
        isAnimation.current = true;
        setTimeout(() => makeInvisible(verticalRef), animationDuration);
        setTimeout(() => makeInvisible(horizontalRef), animationDuration);
        setTimeout(() => makeInvisible(rotated45Ref), animationDuration);
        setTimeout(() => makeInvisible(rotated135Ref), animationDuration);
        setTimeout(() => makeInvisible(rotated225Ref), animationDuration);
        setTimeout(() => makeInvisible(rotated315Ref), animationDuration);
    }

    const handleStart = (e) =>{
        firstSquare.current = e.target
    }
    const handleDrop = (e) =>{
        endSquare.current = e.target
    }

    const handleEnd = () =>{
        if(!isReady()) return
        if((endSquare.current === null || firstSquare.current === null)) return
        const fId = parseInt(firstSquare.current.id)
        const lId = parseInt(endSquare.current.id)
        const isNeighbour = Math.abs(lId - fId);
        //if((isNeighbour !== boardLength && isNeighbour !== 1) || (isNeighbour === 1 && ((lId % boardLength === 0 && fId % boardLength === boardLength - 1) || (fId % boardLength === 0 && lId % boardLength === boardLength - 1)))) return;
        setBoard(prevBoard => {
            const newBoard = [...prevBoard];
            if(endSquare.current.name === "Watermelon" && firstSquare.current.name !== "Watermelon" && firstSquare.current.name !== "Bomb" && firstSquare.current.name !== "Pineapple" ){
                increment(150);
                moves.current--;
                for(let i = 0; i < boardLength ** 2; i++){
                    if(firstSquare.current.name === prevBoard[i].name){
                        newBoard[i] = blank
                        increment(10);
                    }
                }
                newBoard[endSquare.current.id] = blank
            }
            else if(firstSquare.current.name === "Watermelon" && endSquare.current.name !== "Watermelon" && endSquare.current.name !== "Bomb" && endSquare.current.name !== "Pineapple"){
                increment(150);
                moves.current--;
                for(let i = 0; i < boardLength ** 2; i++){
                    if(endSquare.current.name === prevBoard[i].name){
                        newBoard[i] = blank
                        increment(10);
                    }
                }
                newBoard[firstSquare.current.id] = blank
            }
            else if(endSquare.current.name === "Bomb" && firstSquare.current.name !== "Watermelon" && firstSquare.current.name !== "Bomb" && firstSquare.current.name !== "Pineapple"){
                increment(100);
                moves.current--;
                if(prevBoard[fId]) {newBoard[fId] = blank; increment(10);};
                if(prevBoard[fId - 1]) if((fId - 1) % boardLength !== 7){newBoard[fId - 1] = blank; increment(10);};
                if(prevBoard[fId + 1]) if((fId + 1) % boardLength !== 0){newBoard[fId + 1] = blank; increment(10);};
                if(prevBoard[fId + boardLength]) {newBoard[fId + boardLength] = blank; increment(10);};
                if(prevBoard[fId - boardLength]) {newBoard[fId - boardLength] = blank; increment(10);};
                if(prevBoard[fId + boardLength + 1]) if((fId + boardLength + 1) % boardLength !== 0){newBoard[fId + boardLength + 1] = blank; increment(10);};
                if(prevBoard[fId + boardLength - 1]) if((fId + boardLength - 1) % boardLength !== 7){newBoard[fId + boardLength - 1] = blank; increment(10);};
                if(prevBoard[fId - boardLength - 1]) if((fId - boardLength - 1) % boardLength !== 7){newBoard[fId - boardLength - 1] = blank; increment(10);};
                if(prevBoard[fId - boardLength + 1]) if((fId - boardLength + 1) % boardLength !== 0){newBoard[fId - boardLength + 1] = blank; increment(10);};
               
            }
            else if(firstSquare.current.name === "Bomb" && endSquare.current.name !== "Watermelon" && endSquare.current.name !== "Bomb" && endSquare.current.name !== "Pineapple"){
                increment(100);
                moves.current--;
                if(prevBoard[lId]) {newBoard[lId] = blank; increment(10);};
                if(prevBoard[lId - 1]) if((lId - 1) % boardLength !== 7){newBoard[lId - 1] = blank; increment(10);};
                if(prevBoard[lId + 1]) if((lId + 1) % boardLength !== 0){newBoard[lId + 1] = blank; increment(10);};
                if(prevBoard[lId + boardLength]) {newBoard[lId + boardLength] = blank; increment(10);};
                if(prevBoard[lId - boardLength]) {newBoard[lId - boardLength] = blank; increment(10);};
                if(prevBoard[lId + boardLength + 1]) if((lId + boardLength + 1) % boardLength !== 0){newBoard[lId + boardLength + 1] = blank; increment(10);};
                if(prevBoard[lId + boardLength - 1]) if((lId + boardLength - 1) % boardLength !== 7){newBoard[lId + boardLength - 1] = blank; increment(10);};
                if(prevBoard[lId - boardLength - 1]) if((lId - boardLength - 1) % boardLength !== 7){newBoard[lId - boardLength - 1] = blank; increment(10);};
                if(prevBoard[lId - boardLength + 1]) if((lId - boardLength + 1) % boardLength !== 0){newBoard[lId - boardLength + 1] = blank; increment(10);};
               
            }
            else if(firstSquare.current.name === "Pineapple" && endSquare.current.name !== "Watermelon" && endSquare.current.name !== "Bomb" && endSquare.current.name !== "Pineapple"){
                increment(50);
                pineapple1(lId)
                moves.current--;
                for(let i = 0; i < boardLength ** 2; i++){
                    if(i % 8 === lId % 8 || Math.floor(i / 8) === Math.floor(lId / 8)){
                        newBoard[i] = blank
                        increment(10);
                    }
                }
            }
            else if(endSquare.current.name === "Pineapple" && firstSquare.current.name !== "Watermelon" && firstSquare.current.name !== "Bomb" && firstSquare.current.name !== "Pineapple"){
                increment(50);
                pineapple1(fId)
                moves.current--;
                for(let i = 0; i < boardLength ** 2; i++){
                    if(i % 8 === fId % 8 || Math.floor(i / 8) === Math.floor(fId / 8)){
                        newBoard[i] = blank
                        increment(10);
                    }
                }
            }
            else if((endSquare.current.name === "Pineapple" && firstSquare.current.name === "Bomb") || (firstSquare.current.name === "Pineapple" && endSquare.current.name === "Bomb")){
                increment(250);
                moves.current--;
                for(let i = 0; i < boardLength ** 2; i++){
                    if((i % 8 === lId % 8 || Math.floor(i / 8) === Math.floor(lId / 8)) || 
                    (i % 8 === lId % 8 - 1 || Math.floor(i / 8) === Math.floor(lId / 8) - 1) ||
                    (i % 8 === lId % 8 + 1 || Math.floor(i / 8) === Math.floor(lId / 8) + 1)){
                        newBoard[i] = blank
                        increment(10);
                    }
                }
            }
            else if(endSquare.current.name === "Bomb" && firstSquare.current.name === "Bomb"){
                increment(350);
                moves.current--;
                if(prevBoard[lId]) {newBoard[lId] = blank; increment(10);};
                if(prevBoard[lId - 1]) if((lId - 1) % boardLength !== 7){newBoard[lId - 1] = blank; increment(10);};
                if(prevBoard[lId + 1]) if((lId + 1) % boardLength !== 0){newBoard[lId + 1] = blank; increment(10);};
                if(prevBoard[lId + boardLength]) {newBoard[lId + boardLength] = blank; increment(10);};
                if(prevBoard[lId - boardLength]) {newBoard[lId - boardLength] = blank; increment(10);};
                if(prevBoard[lId + boardLength + 1]) if((lId + boardLength + 1) % boardLength !== 0){newBoard[lId + boardLength + 1] = blank; increment(10);};
                if(prevBoard[lId + boardLength - 1]) if((lId + boardLength - 1) % boardLength !== 7){newBoard[lId + boardLength - 1] = blank; increment(10);};
                if(prevBoard[lId - boardLength - 1]) if((lId - boardLength - 1) % boardLength !== 7){newBoard[lId - boardLength - 1] = blank; increment(10);};
                if(prevBoard[lId - boardLength + 1]) if((lId - boardLength + 1) % boardLength !== 0){newBoard[lId - boardLength + 1] = blank; increment(10);};

                if(prevBoard[lId - 2]) if((lId - 2) % boardLength !== 7 && (lId - 2) % boardLength !== 6) {newBoard[lId - 2] = blank; increment(10);};
                if(prevBoard[lId + 2]) if((lId + 2) % boardLength !== 0 && (lId + 2) % boardLength !== 1){newBoard[lId + 2] = blank; increment(10);};

                if(prevBoard[lId + 2 * boardLength]) {newBoard[lId + 2 * boardLength] = blank; increment(10);};
                if(prevBoard[lId - 2 * boardLength]) {newBoard[lId - 2 * boardLength] = blank; increment(10);};

                if(prevBoard[lId + boardLength + 2]) if((lId + boardLength + 2) % boardLength !== 0 && (lId + boardLength + 2) % boardLength !== 1){newBoard[lId + boardLength + 2] = blank; increment(10);};
                if(prevBoard[lId + boardLength - 2]) if((lId + boardLength - 2) % boardLength !== 7 && (lId + boardLength - 2) % boardLength !== 6){newBoard[lId + boardLength - 2] = blank; increment(10);};
                if(prevBoard[lId - boardLength - 2]) if((lId - boardLength - 2) % boardLength !== 7 && (lId - boardLength - 2) % boardLength !== 6){newBoard[lId - boardLength - 2] = blank; increment(10);};
                if(prevBoard[lId - boardLength + 2]) if((lId - boardLength + 2) % boardLength !== 0 && (lId - boardLength + 2) % boardLength !== 1){newBoard[lId - boardLength + 2] = blank; increment(10);};

                if(prevBoard[lId + 2 * boardLength + 1]) if((lId + 2 * boardLength + 1) % boardLength !== 0){newBoard[lId + 2 * boardLength + 1] = blank; increment(10);};
                if(prevBoard[lId + 2 * boardLength - 1]) if((lId + 2 * boardLength - 1) % boardLength !== 7){newBoard[lId + 2 * boardLength - 1] = blank; increment(10);};
                if(prevBoard[lId - 2 * boardLength - 1]) if((lId - 2 * boardLength - 1) % boardLength !== 7){newBoard[lId - 2 * boardLength - 1] = blank; increment(10);};
                if(prevBoard[lId - 2 * boardLength + 1]) if((lId - 2 * boardLength + 1) % boardLength !== 0){newBoard[lId - 2 * boardLength + 1] = blank; increment(10);};

                if(prevBoard[lId + 2 * boardLength + 2]) if((lId + 2 * boardLength + 2) % boardLength !== 0 && (lId + 2 * boardLength + 2) % boardLength !== 1) {newBoard[lId + 2 * boardLength + 2] = blank; increment(10);};
                if(prevBoard[lId + 2 * boardLength - 2]) if((lId + 2 * boardLength - 2) % boardLength !== 7 && (lId + 2 * boardLength - 2) % boardLength !== 6) {newBoard[lId + 2 * boardLength - 2] = blank; increment(10);};
                if(prevBoard[lId - 2 * boardLength - 2]) if((lId - 2 * boardLength - 2) % boardLength !== 7 && (lId - 2 * boardLength - 2) % boardLength !== 6) {newBoard[lId - 2 * boardLength - 2] = blank; increment(10);};
                if(prevBoard[lId - 2 * boardLength + 2]) if((lId - 2 * boardLength + 2) % boardLength !== 0 && (lId - 2 * boardLength + 2) % boardLength !== 1) {newBoard[lId - 2 * boardLength + 2] = blank; increment(10);};

            }
            else if((endSquare.current.name === "Watermelon" && firstSquare.current.name === "Watermelon")){
                increment(500);
                for(let i = 0; i < boardLength ** 2; i++){
                    newBoard[i] = blank
                    increment(10);
                }
            }
            else if((endSquare.current.name === "Watermelon" && firstSquare.current.name === "Pineapple") || (endSquare.current.name === "Pineapple" && firstSquare.current.name === "Watermelon")){
                increment(400);
                moves.current--;
                const temp = fruits[Math.floor(Math.random() * fruits.length)]
                for(let i = 0; i < boardLength ** 2; i++){
                    if(prevBoard[i] === temp ){
                        newBoard[i] = pineapple
                        increment(10);
                    }
                }
                newBoard[lId] = blank
                newBoard[fId] = blank
            }
            else if((endSquare.current.name === "Watermelon" && firstSquare.current.name === "Bomb") || (endSquare.current.name === "Bomb" && firstSquare.current.name === "Watermelon")){
                increment(450);
                moves.current--;
                const temp = fruits[Math.floor(Math.random() * fruits.length)]
                for(let i = 0; i < boardLength ** 2; i++){
                    if(prevBoard[i] === temp ){
                        newBoard[i] = bomb
                        increment(10);
                    }
                }
                newBoard[lId] = blank
                newBoard[fId] = blank
            }
            else if((endSquare.current.name === "Pineapple" && firstSquare.current.name === "Pineapple")){
                increment(200);
                moves.current--;
                pineapple2(lId)
                for(let i = 0; i < boardLength ** 2; i++){
                    const temp1 = i % 8;
                    const temp2 = Math.floor(i / 8)
                    if((temp1 === lId % 8 || temp2 === Math.floor(lId / 8)) || (Math.abs(temp1 - lId % 8) === Math.abs(temp2 - Math.floor(lId / 8)))){
                        newBoard[i] = blank
                        increment(10);
                    }
                }
            }
            else{
                swapped.current = true;
                newBoard[fId] = prevBoard[lId]
                newBoard[lId] = prevBoard[fId]
            }
            return newBoard

        })
    }

    return (
        <div className={styles.container}>
            <nav className={styles.navbar}>
                <div className={styles.left}>
                    <h1 className={styles.score}>Score: {score.current}</h1>
                    <h1 className={styles.score}>Moves: {moves.current}</h1>
                    
                </div>
                <div>
                    <Link href='/Endpage' ref={linkRef} className={styles.quit}>Quit</Link>
                </div>
            </nav>
            <div className={styles.game}>
                <div ref = {horizontalRef} className={styles.horizontal} />
                <div ref = {verticalRef} className={styles.vertical} />
                <div ref = {rotated45Ref} className={styles.rotated45} />
                <div ref = {rotated135Ref} className={styles.rotated135} />
                <div ref = {rotated225Ref} className={styles.rotated225} />
                <div ref = {rotated315Ref} className={styles.rotated315} />
                {board.map((element, index)=>(
                      <Image 
                            ref={el => BoardRef.current[index] = el}
                            draggable = {true}
                            onDragStart = {handleStart}
                            onDragEnd = {handleEnd}
                            onDragOver = {(e) => e.preventDefault()}
                            onDragEnter = {(e) => e.preventDefault()}
                            onDragLeave = {(e) => e.preventDefault()}
                            onDrop = {handleDrop}
                            src = {element.src} 
                            key = {index} 
                            id = {index}
                            name = {element.name}  
                            alt="no"/>
                            
                ))
                }
            </div>
        </div>
    )
}

