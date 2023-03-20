import { useState } from "react";
import updateData from "./updateData";


let Cell = ({ isMine = false, solved = false, x, y, sweep, value }) => {
  let status = isMine ? "M" : "";
  const handleClick = () => {
    sweep(x, y);
  }

  let styles = {
    background: "#b4a7a7"
  }

//   if (isMine) {
//     styles.background = 'red';
//   }

  if (value === 0) {
    styles.background = '#8b8a8a';
  }

  let text = value === 0 ? '' : value;

  return (
    <div onClick={handleClick}
      style={{
        width: "19px",
        height: "19px",
        marginLeft: "1px",
        marginBottom: "1px",
        fontSize: "12px",
        fontWeight: "bold",
        fontFamily: "arial",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        ...styles
      }}
    >
      {solved ? status : text}
    </div>
  );
};


function Grid({ data: rows, sweep, gameOver, solved }) {
  return (
    <>
      { gameOver && <span>Game Over :(</span>}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          height: `${rows.length * 20}px`,
          width: `${rows.length * 20}px`
        }}
      >
        {rows.map((row, y) => row.map((c, x) => <Cell key={`${x}${y}`} isMine={c.isMine} value={c.value} solved={solved || gameOver} x={x} y={y} sweep={sweep} />))}
      </div>
    </>
  );
}



export default function MyApp({ data: _data }) {
  let [data, setData] = useState(_data);
  let [gameOver, setGameOver] = useState(false);

  const sweep = (x: number, y: number) => {
    if (data[y][x].isMine) {
        setGameOver(true);

        return;

    }
    setData(prevData => {
        let newData = [...prevData];
        let grid = updateData(newData, {x, y });
        return grid;
    });
  }

  let solved = true;
  let breakLoop = false;

  for (var y = 0; y < data.length; y++) {
    for (var x = 0; x < data.length; x++) {
        if (data[y][x].isSeen === false && data[y][x].isMine === false) {
            solved = false;
            breakLoop = true;
            break;
        }
    }
    if (breakLoop) { break ;}
  }

  return (
    <div>
        {/* <button onClick={() => setSolved(!solved)}>Toggle Solution</button> */}
        { solved ? <span>Congrats!!!!</span> : ''}
        <Grid data={data} sweep={sweep} gameOver={gameOver} solved={solved}/>
    </div>
  )
  ;
}
