import React, { useState } from 'react';
import '../../styles/OriginalGame.css';
import { calculateWinner, findForcedMove } from '../../utils/gameLogic';


const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90,
};

function Profile() {
  return (
    <div>
      <h1>{user.name}</h1>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={'Photo of ' + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize
        }}
      />
    </div>
  );
}

function MyCheckbox({label, isChecked, onclick}) {

  function handleClick( ){
    alert("MyCheckbox ");
  }

  if ( !onclick ){
    onclick = handleClick;
  }
  
  return (
  <div>
    <input type="checkbox"
		name="{name}"	
		checked={isChecked} 
		onClick={onclick} />
    <label onClick={onclick} for="{name}">{label}</label>
  </div>
  
  );
}

function MyButton(props) {

  function handleClick(){
    alert("Button {props.label} ");
  }
  var myclick = props.onClick;
  if ( myclick == null){
    myclick = handleClick;
  }

  return (
    <button onClick={myclick}>
      {props.label}
    </button>
  );
}

function AboutPage() {
  return (
    <div>
      <h1>About</h1>
      <p>Hello there.<br />How do you do?</p>
    </div>
  );
}

function Square({value, onSquareClick}){

  var boxvalue = (value==null)?" ":value;

  return (
    <>
      <button 
        onClick={onSquareClick} 
        className="square">
          {boxvalue}
      </button>
    </>
  )
}

function OriginalGame() {

  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXPlayer, setPlayer] = useState(true);
  const [computerPlayer, setComputerPlayer] = useState(false);
  const [computerPlayFirst, setComputerPlayFirst] = useState(false);
  const [winner, setWinner] = useState(null);
  
  function resetBoard(){
    setPlayer(true);
    setWinner(null);
	setComputerPlayer(false);
	setComputerPlayFirst(false);
    setSquares(Array(9).fill(null));
  }

  function startPlay(){
	resetBoard();
    setComputerPlayFirst(computerPlayFirst);
	setComputerPlayer(computerPlayer);
	if ( computerPlayFirst ){
		setPlayer(false);
		handleClick(randomPos(), Array(9).fill(null), true);
	}
  }

  function randomPos(){
	let max = 9 ;
	let ran = Math.floor(Math.random() * max);
	return ran;
  } 
  
  function calcBestPosition(squares){
      // Now use random move.
    let pos = findForcedMove ( squares );
	if ( pos == null ){
		let p = randomPos();
	
	  	while ( p < 10 && squares[p] != null) p++;
	  	if ( squares[p] != null){
		  // cannot find empty one, start from 0
		  let np= p; 
		  for(let p=0; p < np && squares[p] != null ; p++);
		  if (p === np ) return 10 ; // error should not move
	  	}
  		return p;
	}
	return pos;
  }
  
  function callAutoPlayer( squares, i ){

	const nextSquares = squares.slice();
	
	let pos = calcBestPosition ( squares );
	if ( pos < 10 ){
		if ( isXPlayer )
			nextSquares[pos] = "O";
		else
			nextSquares[pos] = "X";
		setSquares(nextSquares);
    setWinner(calculateWinner(nextSquares));
	}
  };



  function handleClick(i, initial, xp) {
	let csquares = squares;
    if ( winner && !initial) {
		alert("Please reset or click start to replay the game.")
		return;
	}
	if ( initial ) csquares = initial;
    if ( csquares[i]) return;

    const nextSquares = csquares.slice();
	let cplayer = ( xp )?xp:isXPlayer;
//alert("c"+xp+" xp:"+isXPlayer);
    if ( cplayer )
      nextSquares[i] = "X";
    else
      nextSquares[i] = "O";
     
	setSquares(nextSquares);
    //if ( !winner ) setSquares(nextSquares);
	if (!computerPlayer)
	    setPlayer(!cplayer);
    setWinner(calculateWinner(nextSquares));
	
	if ( !winner && computerPlayer && !initial )  
		callAutoPlayer(nextSquares);

  }

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
	if ( computerPlayer ){
	    status = "Play against computer" ;
		if ( computerPlayFirst ){
			status += " - X";
		}else{
			status += " - O";
		}
	}else{
	    status = "Next player: "+ (isXPlayer ? "X" : "O");
	}
  }


  return (
    <>
      <div className="game-container">
        <div className="sidebar">
          <AboutPage/>
          <Profile/>
        </div>
        <div className="main-content">
          <h2>Tic tac Toe</h2>
          <div className="game-board">
            <div className="board-row">
              <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
              <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
              <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
              <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
              <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
              <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
              <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
              <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
              <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
          </div>
        </div>
      </div>
      <br/>
      <div>
      <MyButton onClick={resetBoard} label="Reset" />
	  <MyButton onClick={startPlay} label="Start" />
      <MyCheckbox 
	  	onclick={()=>{
		  setComputerPlayer(!computerPlayer);
		 }}
		 isChecked={computerPlayer}
		 label="Play with Computer" />
      <MyCheckbox 
	  	isChecked={computerPlayFirst}  
	  	onclick={()=>{
			if( !computerPlayer) return;
		  setComputerPlayFirst(!computerPlayFirst);
     	 }}
	    label="Computer play first" /></div>
      <div> {status} </div>
    </>
  );
}


  // use calculateWinner and findForcedMove from utils instead of duplicating here

  // Note: findForcedMove is imported from utils as findForcedMove

  function findForcedMoved(squares) {
	// Force moved need to be executed to avoid loosing
	// for example:  x x _ or x _ x or _ x x
	// The computer need to fill in _ with O
	
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  let force_position = -1 ;
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
	
	if ( !squares[a] ) {
		// _ ? ?
		force_position = a;
		if ( (squares[b] && squares[c]) && (squares[b] == squares[c]) ){
			return force_position;
		}
		// b or c is empty skipped it
		continue;
	
	}else{

		// + ? ?
		if ( !squares[b] ) {
			// + _ ?
			force_position = b;
			if ( squares[a] && squares[c] && (squares[a] == squares[c]) ){
				return force_position;
			}
			continue ;
		}
		if ( !squares[c] ){
			// + + _
			force_position = c;
			if (squares[a] == squares[b]) 
				return force_position;
		}
	}
  }// for
  return null;
}

export default OriginalGame;