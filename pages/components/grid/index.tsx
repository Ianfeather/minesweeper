import { useState } from "react";
import updateData from "./updateData";


let Cell = ({ isMine = false, solved = false, x, y, sweep, value }) => {
  let status = isMine ? "M" : "";
  const handleClick = () => {
    sweep(x, y);
  }
  return (
    <div onClick={handleClick}
      style={{
        width: "19px",
        height: "19px",
        marginLeft: "1px",
        marginBottom: "1px",
        background: isMine ? 'red' : "#b4a7a7",
        fontSize: "12px",
        fontWeight: "bold",
        fontFamily: "arial",
        justifyContent: "center",
        alignItems: "center",
        display: "flex"
      }}
    >
      {solved ? status : value}
    </div>
  );
};


function Grid({ data: rows, sweep, gameOver }) {
  let [solved, setSolved] = useState(false);
  return (
    <>
      <button onClick={() => setSolved(!solved)}>Toggle Solution</button>
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
    })
  }

  return <Grid data={data} sweep={sweep} gameOver={gameOver} />;
}
