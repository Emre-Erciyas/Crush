'use client';

import React, { createContext, useContext } from 'react';

const board = createContext({});

export default function CurrentScore({ children }) {
    const score = React.useRef(0);

    function increment (s){
        score.current += s;
    }

    return (
        <board.Provider value={{score, increment}}>
            {children}
        </board.Provider>
  );
}

export function useGlobalScoreBoard(){
    return useContext(board)
}