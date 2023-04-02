"use client"
import styles from "./Game.module.css"
import React from "react"
import { boardLength, fruits, blank, watermelon, bomb, pineapple, animationDuration, lightning } from "./constants"
import Image from "next/image"
import "../globals.css"
import Link from "next/link"
import { db } from "@/firebase"
import {doc, setDoc,getDoc} from "firebase/firestore"; 
import { useRouter } from "next/navigation"

export default function Game(){

    //Current Board of the game.
    const [board, setBoard] = React.useState([])

    //if currently selected a square to swap or not.
    const [isClicked, setIsClicked] = React.useState(false)

    //stops making moves and loading animations before content is loaded
    const [loading, setLoading] = React.useState(true);

    //window object loaded or not. in next.js this is needed.
    const windowLoaded = React.useRef(false)

    //Save the squares that are chosen by the player without re-render.
    const firstSquare = React.useRef(null);
    const endSquare = React.useRef(null);

    //swapped is a boolean that will revert the move if it was not correct.
    const swapped = React.useRef(false)
    
    //next.js router
    const router = useRouter();

    //The Score
    const score = React.useRef(0);

    const increment  = s => {
        score.current += s;
    }
    //Remaining Moves
    const moves = React.useRef(10)

    //Reference to all elements in the array
    const BoardRef = React.useRef(new Array(boardLength ** 2))

    //image width is determined by screen size
    const imageWidth = React.useRef(0)

    //if all the images loaded at the start, then set loading to false.
    const loadCount = React.useRef(0)

    //Reference to lines
    const horizontalRef = React.useRef(null)
    const verticalRef = React.useRef(null)
    const rotated45Ref = React.useRef(null)
    const rotated135Ref = React.useRef(null)
    const rotated225Ref = React.useRef(null)
    const rotated315Ref = React.useRef(null)
    const explosionRef = React.useRef(null)
    const explosion2Ref = React.useRef(null)
    const pineappleExplosionHorizontalRef = React.useRef(null)
    const pineappleExplosionVerticalRef = React.useRef(null)
    //bolts for watermelon
    const boltsRef = React.useRef(new Array(boardLength ** 2))
    //animation going on
    const isAnimation = React.useRef(false);

    const gameEnd = React.useRef(false)
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
            else if( i % boardLength < boardLength - 2 && i % boardLength > 0 && board[i + 1] && board[i + 2] && board[i - boardLength] && board[i - 2 * boardLength] &&  board[i - 1] &&
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
            if(i % boardLength === boardLength - 1 || i % boardLength === boardLength - 2 || i % boardLength === boardLength -3 || i % boardLength === boardLength - 4) continue;
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
            if(i % boardLength === boardLength - 1 || i % boardLength === boardLength - 2 || i % boardLength === boardLength - 3) continue;
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
                        if(parseInt(firstSquare.current.getAttribute('data-gameid')) === i || parseInt(endSquare.current.getAttribute('data-gameid')) === i ) newBoard[i] = pineapple;
                        else if(parseInt(firstSquare.current.getAttribute('data-gameid')) === i + 1 || parseInt(endSquare.current.getAttribute('data-gameid')) === i + 1) newBoard[i + 1] = pineapple;
                        else if(parseInt(firstSquare.current.getAttribute('data-gameid')) === i + 2 || parseInt(endSquare.current.getAttribute('data-gameid')) === i + 2) newBoard[i + 2] = pineapple;
                        else if(parseInt(firstSquare.current.getAttribute('data-gameid')) === i + 3 || parseInt(endSquare.current.getAttribute('data-gameid')) === i + 3) newBoard[i + 3] = pineapple;
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
            if(i % boardLength === boardLength - 1 || i % boardLength === boardLength - 2) continue;
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
                        if(parseInt(firstSquare.current.getAttribute('data-gameid')) === i || parseInt(endSquare.current.getAttribute('data-gameid')) === i ) newBoard[i] = pineapple;
                        else if(parseInt(firstSquare.current.getAttribute('data-gameid')) === i + boardLength || parseInt(endSquare.current.getAttribute('data-gameid')) === i + boardLength) newBoard[i + boardLength] = pineapple;
                        else if(parseInt(firstSquare.current.getAttribute('data-gameid')) === i + (2 * boardLength) || parseInt(endSquare.current.getAttribute('data-gameid')) === i + (2 * boardLength)) newBoard[i + (2 * boardLength)] = pineapple;
                        else if(parseInt(firstSquare.current.getAttribute('data-gameid')) === i + (3 * boardLength) || parseInt(endSquare.current.getAttribute('data-gameid')) === i + (3 * boardLength)) newBoard[i + (3 * boardLength)] = pineapple;
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
        if(loading) return
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
                newBoard[endSquare.current.getAttribute('data-gameid')] = prevBoard[firstSquare.current.getAttribute('data-gameid')]
                newBoard[firstSquare.current.getAttribute('data-gameid')] = prevBoard[endSquare.current.getAttribute('data-gameid')]
                return newBoard
            })
            swapped.current = false;
        }
    }

    //Fill the board when there are blank squares.
    const fillBoard = () =>{
        if(loading) return
        for(let i = boardLength ** 2 - 1; i >= 0 ; i--){
            if(board[i] === blank){
                if(i < boardLength){
                    setBoard((prevBoard) =>{
                        const newBoard = [...prevBoard];
                        newBoard[i] = fruits[Math.floor(Math.random() * fruits.length)]
                        return newBoard
                    })
                }else{
                    setBoard((prevBoard) => {
                        const newArray = [...prevBoard];
                        const temp = newArray[i];
                        newArray[i] = newArray[i - boardLength];
                        newArray[i - boardLength] = temp;
                        return newArray;
                    })
                }
            }
        }
    }
    //make the moves slower
    React.useEffect(()=>{
        const waitTime = isAnimation.current ? animationDuration : 30;
        const fill  = setTimeout(fillBoard, waitTime);
        checkBoard();
        return () => {
            clearTimeout(fill)
        }
        
    }, [board, loading])
    React.useEffect(() => {
        if(moves.current > 0) return 
        if(!isReady()) return
        if(gameEnd.current) return
        gameEnd.current = true;
        let arr = []
        async function leaderBoardAddition(){
            alert()
            try{
                let exists = false;
                const docRef = doc(db, "Leaderboard", "First10");
                const docSnap = await getDoc(docRef);
                if(docSnap && docSnap.data()) arr = docSnap.data().leaderboard;
                const temp = {
                    id: "id" + Math.random().toString(16).slice(2),
                    name: (windowLoaded && sessionStorage.getItem("nickname")),
                    score: score.current
                };
                (arr && arr.length > 0  && arr.sort((a,b) => a.score - b.score).reverse())
                for(let i = 0;i < arr.length; i++){
                    if(arr[i].name === temp.name){
                        arr[i].score = Math.max(temp.score, arr[i].score);
                        exists = true;
                        break;
                    }
                }
                if(!exists && (arr.length < 10)) arr.push(temp);
                else if((!exists && arr[arr.length - 1].score < score.current)){
                    arr.pop();
                    arr.push(temp);
                };
                try {
                    await setDoc(doc(db, 'Leaderboard', 'First10'), {leaderboard: arr})
                } catch (e) {
                    console.log('Oops, something went wrong: ' + error.message);                }
            }
            catch(e){
                console.log('Oops, something went wrong: ' + error.message);            }
        }
        const changer = () =>{
            router.push('/Endpage')
        }
        leaderBoardAddition()
        setTimeout(changer, 600);
        return () => clearTimeout(changer)
    })
    React.useEffect(()=>{
        if((windowLoaded.current) && (sessionStorage.getItem('nickname') === '' || !sessionStorage.getItem('nickname'))){
            router.push('/')
        } 
        score.current = 0;
        createBoard();
        windowLoaded.current = (typeof window !== 'undefined')
        if(windowLoaded.current) {
            if(innerWidth >= 656 ) imageWidth.current = 80;
            else if(innerWidth >= 496) imageWidth.current = 60; 
            else if(innerWidth >= 348) imageWidth.current = 40
            else imageWidth.current = 33
        }
    }, [])
    

    React.useEffect(()=>{
        if(windowLoaded.current) sessionStorage.setItem("score", score.current)
    },[score.current])

    React.useEffect(() => {
        function handleResize() {
            if(innerWidth >= 656) imageWidth.current = 80;
            else if(innerWidth >= 496) imageWidth.current = 60; 
            else if(innerWidth >= 348) imageWidth.current = 40
            else imageWidth.current = 33
        }
        if(windowLoaded.current) window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    const makeInvisible = (currentRef) =>{
        isAnimation.current = false;
        if(!currentRef) return
        currentRef.style.visibility = 'hidden';
    }
    
    const pineapple1 = (id) =>{
        verticalRef.current.style.visibility = 'visible'
        verticalRef.current.style.left = `${(id % boardLength) * imageWidth.current + (0.375 * imageWidth.current)}px`
        horizontalRef.current.style.visibility = 'visible'
        isAnimation.current = true;
        horizontalRef.current.style.top = `${Math.floor(id / boardLength) * imageWidth.current + (0.375 * imageWidth.current)}px`
        setTimeout(() => makeInvisible(verticalRef.current), animationDuration);
        setTimeout(() => makeInvisible(horizontalRef.current), animationDuration);
        
    }
    const pineapple2 = (id) =>{
        verticalRef.current.style.visibility = 'visible'
        horizontalRef.current.style.visibility = 'visible'
        rotated45Ref.current.style.visibility = 'visible'
        rotated135Ref.current.style.visibility = 'visible'
        rotated225Ref.current.style.visibility = 'visible'
        rotated315Ref.current.style.visibility = 'visible'
        verticalRef.current.style.left = `${(id % boardLength) * imageWidth.current + (0.375 * imageWidth.current)}px`
        horizontalRef.current.style.top = `${Math.floor(id / boardLength) * imageWidth.current + (0.3125 * imageWidth.current)}px`
        rotated45Ref.current.style.left = `${(id % boardLength) * imageWidth.current + (0.4 * imageWidth.current)}px`
        rotated135Ref.current.style.left = `${(id % boardLength) * imageWidth.current + (0.75 * imageWidth.current)}px`
        rotated225Ref.current.style.left = `${(id % boardLength) * imageWidth.current + (0.25 * imageWidth.current)}px`
        rotated315Ref.current.style.left = `${(id % boardLength) * imageWidth.current + (0.625 * imageWidth.current)}px`
        rotated45Ref.current.style.top = `${Math.floor(id / boardLength) * imageWidth.current + (0.325 * imageWidth.current)}px`
        rotated135Ref.current.style.top = `${Math.floor(id / boardLength) * imageWidth.current + (0.5 * imageWidth.current)}px`
        rotated225Ref.current.style.top = `${Math.floor(id / boardLength) * imageWidth.current + (0.5 * imageWidth.current)}px`
        rotated315Ref.current.style.top = `${Math.floor(id / boardLength) * imageWidth.current + (0.625 * imageWidth.current)}px`
        isAnimation.current = true;
        setTimeout(() => makeInvisible(verticalRef.current), animationDuration);
        setTimeout(() => makeInvisible(horizontalRef.current), animationDuration);
        setTimeout(() => makeInvisible(rotated45Ref.current), animationDuration);
        setTimeout(() => makeInvisible(rotated135Ref.current), animationDuration);
        setTimeout(() => makeInvisible(rotated225Ref.current), animationDuration);
        setTimeout(() => makeInvisible(rotated315Ref.current), animationDuration);
        setTimeout(() => makeInvisible(rotated315Ref.current), animationDuration);
    }

    const explosion = (id) => {
        explosionRef.current.style.visibility = 'visible'
        explosionRef.current.style.left = `${(id % boardLength) * imageWidth.current + (0.12 * imageWidth.current) }px`
        explosionRef.current.style.top = `${Math.floor(id / boardLength) * imageWidth.current + (0.12 * imageWidth.current) }px`
        isAnimation.current = true;
        setTimeout(() => makeInvisible(explosionRef.current), animationDuration);

    }
    const explosion2 = (id) => {
        explosion2Ref.current.style.visibility = 'visible'
        explosion2Ref.current.style.left = `${(id % boardLength) * imageWidth.current + (0.12 * imageWidth.current) }px`
        explosion2Ref.current.style.top = `${Math.floor(id / boardLength) * imageWidth.current + (0.12 * imageWidth.current)}px`
        isAnimation.current = true;
        setTimeout(() => makeInvisible(explosion2Ref.current), animationDuration);
    }
    const pineappleExplosion = (id) =>{
        pineappleExplosionVerticalRef.current.style.visibility = 'visible'
        pineappleExplosionVerticalRef.current.style.left = `${(id % boardLength) * imageWidth.current + (0.37 * imageWidth.current)}px`
        pineappleExplosionHorizontalRef.current.style.visibility = 'visible'
        pineappleExplosionHorizontalRef.current.style.top = `${Math.floor(id / boardLength) * imageWidth.current + (0.37 * imageWidth.current)}px`
        isAnimation.current = true;
        setTimeout(() => makeInvisible(pineappleExplosionHorizontalRef.current), animationDuration);
        setTimeout(() => makeInvisible(pineappleExplosionVerticalRef.current), animationDuration);
    }
    const lightningTime = (id, endId) => {
        if(!boltsRef.current[endId]) return
        const x1 = id % boardLength;
        const x2 = endId % boardLength;
        const y1 = Math.floor(id / boardLength);
        const y2 = Math.floor(endId / boardLength);
        boltsRef.current[endId].style.visibility = 'visible'
        boltsRef.current[endId].style.left = `${x1 * imageWidth.current + (0.5 * imageWidth.current)}px`
        boltsRef.current[endId].style.top = `${y1 * imageWidth.current + (0.5 * imageWidth.current)}px`
        boltsRef.current[endId].style.height = `${Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) * imageWidth.current}px`
        const angleRadians = Math.atan2(y2 - y1, x2 - x1);
        const angleDegrees = angleRadians * (180 / Math.PI);
        boltsRef.current[endId].style.transform = `rotate(${angleDegrees - 90}deg)`;
        isAnimation.current = true;
        setTimeout(() => makeInvisible(boltsRef.current[endId]), animationDuration);
    }
    const handleStart = (e) =>{
        firstSquare.current = e.target
    }
    const handleDrop = (e) =>{
        endSquare.current = e.target
    }

    const handleEnd = () =>{
        setIsClicked(false)
        if(!isReady()) return
        if(moves.current <= 0) return
        if((endSquare.current === null || firstSquare.current === null || endSquare.current === undefined ||firstSquare.current === undefined )) return
        const fId = parseInt(firstSquare.current.getAttribute('data-gameid'))
        const lId = parseInt(endSquare.current.getAttribute('data-gameid'))
        const isNeighbour = Math.abs(lId - fId);
        if((isNeighbour !== boardLength && isNeighbour !== 1) || (isNeighbour === 1 && ((lId % boardLength === 0 && fId % boardLength === boardLength - 1) || (fId % boardLength === 0 && lId % boardLength === boardLength - 1)))) return;
        setBoard(prevBoard => {
            const newBoard = [...prevBoard];
            if(endSquare.current.name === "Watermelon" && firstSquare.current.name !== "Watermelon" && firstSquare.current.name !== "Bomb" && firstSquare.current.name !== "Pineapple" ){
                increment(150);
                moves.current--;
                for(let i = 0; i < boardLength ** 2; i++){
                    if(firstSquare.current.name === prevBoard[i].name){
                        lightningTime(fId, i)
                        newBoard[i] = blank
                        increment(10);
                    }
                }
                newBoard[lId] = blank
            }
            else if(firstSquare.current.name === "Watermelon" && endSquare.current.name !== "Watermelon" && endSquare.current.name !== "Bomb" && endSquare.current.name !== "Pineapple"){
                increment(150);
                moves.current--;
                for(let i = 0; i < boardLength ** 2; i++){
                    if(endSquare.current.name === prevBoard[i].name){
                        lightningTime(lId, i)
                        newBoard[i] = blank;
                        increment(10);
                    }
                }
                newBoard[fId] = blank
            }
            else if(endSquare.current.name === "Bomb" && firstSquare.current.name !== "Watermelon" && firstSquare.current.name !== "Bomb" && firstSquare.current.name !== "Pineapple"){
                increment(100);
                explosion(fId)
                moves.current--;
                if(prevBoard[fId]) {newBoard[fId] = blank; increment(10);};
                if(prevBoard[fId - 1]) if((fId - 1) % boardLength !== boardLength - 1){newBoard[fId - 1] = blank; increment(10);};
                if(prevBoard[fId + 1]) if((fId + 1) % boardLength !== 0){newBoard[fId + 1] = blank; increment(10);};
                if(prevBoard[fId + boardLength]) {newBoard[fId + boardLength] = blank; increment(10);};
                if(prevBoard[fId - boardLength]) {newBoard[fId - boardLength] = blank; increment(10);};
                if(prevBoard[fId + boardLength + 1]) if((fId + boardLength + 1) % boardLength !== 0){newBoard[fId + boardLength + 1] = blank; increment(10);};
                if(prevBoard[fId + boardLength - 1]) if((fId + boardLength - 1) % boardLength !== boardLength - 1){newBoard[fId + boardLength - 1] = blank; increment(10);};
                if(prevBoard[fId - boardLength - 1]) if((fId - boardLength - 1) % boardLength !== boardLength - 1){newBoard[fId - boardLength - 1] = blank; increment(10);};
                if(prevBoard[fId - boardLength + 1]) if((fId - boardLength + 1) % boardLength !== 0){newBoard[fId - boardLength + 1] = blank; increment(10);};
               
            }
            else if(firstSquare.current.name === "Bomb" && endSquare.current.name !== "Watermelon" && endSquare.current.name !== "Bomb" && endSquare.current.name !== "Pineapple"){
                increment(100);
                explosion(lId)
                moves.current--;
                if(prevBoard[lId]) {newBoard[lId] = blank; increment(10);};
                if(prevBoard[lId - 1]) if((lId - 1) % boardLength !== boardLength-1 ){newBoard[lId - 1] = blank; increment(10);};
                if(prevBoard[lId + 1]) if((lId + 1) % boardLength !== 0){newBoard[lId + 1] = blank; increment(10);};
                if(prevBoard[lId + boardLength]) {newBoard[lId + boardLength] = blank; increment(10);};
                if(prevBoard[lId - boardLength]) {newBoard[lId - boardLength] = blank; increment(10);};
                if(prevBoard[lId + boardLength + 1]) if((lId + boardLength + 1) % boardLength !== 0){newBoard[lId + boardLength + 1] = blank; increment(10);};
                if(prevBoard[lId + boardLength - 1]) if((lId + boardLength - 1) % boardLength !== boardLength - 1){newBoard[lId + boardLength - 1] = blank; increment(10);};
                if(prevBoard[lId - boardLength - 1]) if((lId - boardLength - 1) % boardLength !== boardLength - 1){newBoard[lId - boardLength - 1] = blank; increment(10);};
                if(prevBoard[lId - boardLength + 1]) if((lId - boardLength + 1) % boardLength !== 0){newBoard[lId - boardLength + 1] = blank; increment(10);};
               
            }
            else if(firstSquare.current.name === "Pineapple" && endSquare.current.name !== "Watermelon" && endSquare.current.name !== "Bomb" && endSquare.current.name !== "Pineapple"){
                increment(50);
                pineapple1(lId)
                moves.current--;
                for(let i = 0; i < boardLength ** 2; i++){
                    if(i % boardLength === lId % boardLength || Math.floor(i / boardLength) === Math.floor(lId / boardLength)){
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
                    if(i % boardLength === fId % boardLength || Math.floor(i / boardLength) === Math.floor(fId / boardLength)){
                        newBoard[i] = blank
                        increment(10);
                    }
                }
            }
            else if((endSquare.current.name === "Pineapple" && firstSquare.current.name === "Bomb") || (firstSquare.current.name === "Pineapple" && endSquare.current.name === "Bomb")){
                increment(250);
                moves.current--;
                pineappleExplosion(lId)
                for(let i = 0; i < boardLength ** 2; i++){
                    if((i % boardLength === lId % boardLength || Math.floor(i / boardLength) === Math.floor(lId / boardLength)) || 
                    (i % boardLength === lId % boardLength - 1 || Math.floor(i / boardLength) === Math.floor(lId / boardLength) - 1) ||
                    (i % boardLength === lId % boardLength + 1 || Math.floor(i / boardLength) === Math.floor(lId / boardLength) + 1)){
                        newBoard[i] = blank
                        increment(10);
                    }
                }
            }
            else if(endSquare.current.name === "Bomb" && firstSquare.current.name === "Bomb"){
                increment(350);
                moves.current--;
                explosion2(lId);
                if(prevBoard[lId]) {newBoard[lId] = blank; increment(10);};
                if(prevBoard[lId - 1]) if((lId - 1) % boardLength !== boardLength - 1){newBoard[lId - 1] = blank; increment(10);};
                if(prevBoard[lId + 1]) if((lId + 1) % boardLength !== 0){newBoard[lId + 1] = blank; increment(10);};
                if(prevBoard[lId + boardLength]) {newBoard[lId + boardLength] = blank; increment(10);};
                if(prevBoard[lId - boardLength]) {newBoard[lId - boardLength] = blank; increment(10);};
                if(prevBoard[lId + boardLength + 1]) if((lId + boardLength + 1) % boardLength !== 0){newBoard[lId + boardLength + 1] = blank; increment(10);};
                if(prevBoard[lId + boardLength - 1]) if((lId + boardLength - 1) % boardLength !== boardLength - 1){newBoard[lId + boardLength - 1] = blank; increment(10);};
                if(prevBoard[lId - boardLength - 1]) if((lId - boardLength - 1) % boardLength !== boardLength - 1){newBoard[lId - boardLength - 1] = blank; increment(10);};
                if(prevBoard[lId - boardLength + 1]) if((lId - boardLength + 1) % boardLength !== 0){newBoard[lId - boardLength + 1] = blank; increment(10);};

                if(prevBoard[lId - 2]) if((lId - 2) % boardLength !== boardLength - 1 && (lId - 2) % boardLength !== 6) {newBoard[lId - 2] = blank; increment(10);};
                if(prevBoard[lId + 2]) if((lId + 2) % boardLength !== 0 && (lId + 2) % boardLength !== 1){newBoard[lId + 2] = blank; increment(10);};

                if(prevBoard[lId + 2 * boardLength]) {newBoard[lId + 2 * boardLength] = blank; increment(10);};
                if(prevBoard[lId - 2 * boardLength]) {newBoard[lId - 2 * boardLength] = blank; increment(10);};

                if(prevBoard[lId + boardLength + 2]) if((lId + boardLength + 2) % boardLength !== 0 && (lId + boardLength + 2) % boardLength !== 1){newBoard[lId + boardLength + 2] = blank; increment(10);};
                if(prevBoard[lId + boardLength - 2]) if((lId + boardLength - 2) % boardLength !== boardLength - 1 && (lId + boardLength - 2) % boardLength !== 6){newBoard[lId + boardLength - 2] = blank; increment(10);};
                if(prevBoard[lId - boardLength - 2]) if((lId - boardLength - 2) % boardLength !== boardLength - 1 && (lId - boardLength - 2) % boardLength !== 6){newBoard[lId - boardLength - 2] = blank; increment(10);};
                if(prevBoard[lId - boardLength + 2]) if((lId - boardLength + 2) % boardLength !== 0 && (lId - boardLength + 2) % boardLength !== 1){newBoard[lId - boardLength + 2] = blank; increment(10);};

                if(prevBoard[lId + 2 * boardLength + 1]) if((lId + 2 * boardLength + 1) % boardLength !== 0){newBoard[lId + 2 * boardLength + 1] = blank; increment(10);};
                if(prevBoard[lId + 2 * boardLength - 1]) if((lId + 2 * boardLength - 1) % boardLength !== boardLength - 1){newBoard[lId + 2 * boardLength - 1] = blank; increment(10);};
                if(prevBoard[lId - 2 * boardLength - 1]) if((lId - 2 * boardLength - 1) % boardLength !== boardLength - 1){newBoard[lId - 2 * boardLength - 1] = blank; increment(10);};
                if(prevBoard[lId - 2 * boardLength + 1]) if((lId - 2 * boardLength + 1) % boardLength !== 0){newBoard[lId - 2 * boardLength + 1] = blank; increment(10);};

                if(prevBoard[lId + 2 * boardLength + 2]) if((lId + 2 * boardLength + 2) % boardLength !== 0 && (lId + 2 * boardLength + 2) % boardLength !== 1) {newBoard[lId + 2 * boardLength + 2] = blank; increment(10);};
                if(prevBoard[lId + 2 * boardLength - 2]) if((lId + 2 * boardLength - 2) % boardLength !== boardLength - 1 && (lId + 2 * boardLength - 2) % boardLength !== 6) {newBoard[lId + 2 * boardLength - 2] = blank; increment(10);};
                if(prevBoard[lId - 2 * boardLength - 2]) if((lId - 2 * boardLength - 2) % boardLength !== boardLength - 1 && (lId - 2 * boardLength - 2) % boardLength !== 6) {newBoard[lId - 2 * boardLength - 2] = blank; increment(10);};
                if(prevBoard[lId - 2 * boardLength + 2]) if((lId - 2 * boardLength + 2) % boardLength !== 0 && (lId - 2 * boardLength + 2) % boardLength !== 1) {newBoard[lId - 2 * boardLength + 2] = blank; increment(10);};

            }
            else if((endSquare.current.name === "Watermelon" && firstSquare.current.name === "Watermelon")){
                increment(500);
                moves.current--;
                for(let i = 0; i < boardLength ** 2; i++){
                    lightningTime(lId, i)
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
                        lightningTime(lId, i)
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
                        lightningTime(lId, i)
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
                    const temp1 = i % boardLength;
                    const temp2 = Math.floor(i / boardLength)
                    if((temp1 === lId % boardLength || temp2 === Math.floor(lId / boardLength)) || (Math.abs(temp1 - lId % boardLength) === Math.abs(temp2 - Math.floor(lId / boardLength)))){
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

    const clickHandler = (e) => {
        if(!isClicked){ 
            firstSquare.current = e.target
            setIsClicked(prev => !prev)
        }
        else{
            endSquare.current = e.target
            handleEnd()
        }
    }
    const reset = () => {
        if(windowLoaded.current) window.location.reload();
    }
    const handleLoad = () =>{
        if(loadCount.current >= 64) return
        loadCount.current++;
        if(loadCount.current === 64) setLoading(false)
    }
    return (
        <div className={styles.container}>
            {!loading && <nav className={styles.navbar}>
                <div className={styles.left}>
                <h1 className={styles.score} >{(windowLoaded.current) && sessionStorage.getItem('nickname')}</h1>
                    <h1 className={styles.score}>Score: {score.current}</h1>
                    <h1 className={styles.score}>Moves: {moves.current}</h1>
                    
                </div>
            </nav>}
            <div className={styles.game} >
                {board.map((element, index)=>(
                    <div key = {index} style ={isClicked ? ((firstSquare.current && parseInt(index) === parseInt(firstSquare.current.getAttribute('data-gameid')) )? {backgroundColor: 'rgba(180,180,180,0.7)'}:{backgroundColor: 'rgba(60,60,60, 0.7)'} ):{backgroundColor: 'rgba(180,180,180, 0.7)'}} className={styles.fruitHolder}>
                        <Image 
                            className={styles.fruit}
                            ref={el => BoardRef.current[index] = el}
                            draggable = {true}
                            onDragStart = {handleStart}
                            onDragEnd = {handleEnd}
                            onDragOver = {(e) => { e.preventDefault()}}
                            onDragEnter = {(e) => { e.preventDefault()}}
                            onDragLeave = {(e) => { e.preventDefault()}}
                            onTouchStart = {(e) =>console.log(e.targetTouches[0])}
                            onTouchMove = {(e) =>console.log()}
                            onTouchEnd = {(e) =>console.log(e.targetTouches[0])}
                            onDrop = {handleDrop}
                            onClick = {clickHandler}
                            src = {element.src}  
                            data-gameid = {index}
                            name = {element.name} 
                            onLoad= {handleLoad} 
                            priority
                            alt= {element.name} />
                    </div>   
                ))}
                {!loading &&
                <>
                    <div ref = {horizontalRef} className={styles.horizontal} />
                    <div ref = {verticalRef} className={styles.vertical} />
                    <div ref = {rotated45Ref} className={styles.rotated45} />
                    <div ref = {rotated135Ref} className={styles.rotated135} />
                    <div ref = {rotated225Ref} className={styles.rotated225} />
                    <div ref = {rotated315Ref} className={styles.rotated315} />
                    <div ref = {explosionRef} className={styles.explosion} />
                    <div ref = {explosion2Ref} className={styles.explosion2} />
                    <div ref = {pineappleExplosionHorizontalRef } className={styles.pineappleExplosionHorizontal} />
                    <div ref = {pineappleExplosionVerticalRef} className={styles.pineappleExplosionVertical} />
                </>
                }
                {!loading && board.map((element, index)=>(
                      <Image 
                            ref={el => boltsRef.current[index] = el}
                            className={styles.bolt}
                            src = {lightning.src} 
                            key = {index} 
                            id = {index}
                            alt={"Lightning"}/>
                ))}
                
            </div>
            <div className={styles.menu}>
                <button onClick={reset} className={styles.refresh}>Refresh</button>
                <Link href='/Menu' className={styles.quit}>Quit</Link>
            </div>
        </div>
    )
}

