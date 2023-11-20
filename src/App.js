
import { useState } from 'react';
//import { StrictMode } from 'react';
//import { createRoot } from 'react-dom/client';
import './styles.css';


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

function MyCheckbox({label, cbvalue, onclick}) {

  function handleClick( ){
    alert("MyCheckbox ");
  }

  if ( !onclick ){
    onclick = handleClick;
  }

  return (
  <div>
    <input type="checkbox" name="{name}" onClick={onclick} />
    <label for="{name}">{label}</label>
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

export default function Board() {

  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isPlayer1, setPlayer] = useState(true);
  const [computerPlayer, setComputerPlayer] = useState(false);
  const [computerPlayFirst, setComputerPlayFirst] = useState(false);
  const [winner, setWinner] = useState(null);
  
  function resetBoard(){
    setPlayer(true);
    setWinner(null);
	setComputerPlayer(false);
    setSquares(Array(9).fill(null));
  }

  function letComputerPlay(){
	resetBoard();
    setComputerPlayer(true);
	if ( computerPlayFirst ){
		setPlayer(false);
		handleClick(randomPos());
	}else
		setPlayer(true);
  }

  function letComputerPlayFirst(){
	setComputerPlayFirst(!computerPlayFirst);
  }


  function randomPos(){
	let max = 9 ;
	let ran = Math.floor(Math.random() * max);
	return ran;
  } 
  
  function calcBestPosition(squares, i){
	
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
	
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

	if ( lines[a] ){
		if ( lines[a] === lines[b]){
			return c;
		}
	}
	
  }
  	let p = randomPos();
  	while ( p < 10 && squares[p] != null) p++;
  	if ( squares[p] != null){
	  // cannot find empty one, start from 0
	  let np= p; 
	  for(let p=0; p < np && squares[p] != null ; p++);
	  if (p === np ) return 10 ; // error should not move
  	}else{
  	  return p;
	}
	
  }
  
  function callAutoPlayer( squares, i ){

	const nextSquares = squares.slice();
	
	let pos = calcBestPosition(squares, i);
	if ( isPlayer1 )
		nextSquares[pos] = "O";
	else
		nextSquares[pos] = "X";
	setSquares(nextSquares);
};
  

  function handleClick(i) {
    if ( winner ) return;
    if ( squares[i]) return;
    const nextSquares = squares.slice();
    if ( isPlayer1)
      nextSquares[i] = "X";
    else
      nextSquares[i] = "O";
    
    setSquares(nextSquares);
	if (!computerPlayer)
	    setPlayer(!isPlayer1);
    setWinner(calculateWinner(nextSquares));
	
	if ( !winner && computerPlayer )
		callAutoPlayer(nextSquares,i);
  }

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
	if ( computerPlayer ){
	    status = "Play against computer (O)" ;	
	}else{
	    status = "Next player: "+ (isPlayer1 ? "X" : "O");
	}
  }


  return (
    <>
      <div>
        <span align="right">
          <AboutPage/>
          <Profile/>
        </span>
        <span align="left">
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
        </span>
      </div>
      <br/>
      <div><MyButton onClick={resetBoard} label="Reset" />
	  <MyButton onClick={letComputerPlay} label="Play with computer" />
      <MyCheckbox onclick={letComputerPlayFirst} cbvalue="" label="Computer play first" /></div>
      <div> {status} </div>
    </>
  );
}


function calculateWinner(squares) {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}