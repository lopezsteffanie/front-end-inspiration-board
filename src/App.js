import Board from "./components/Board";
import "./App.css";
import NewBoardForm from "./components/NewBoardForm";
import NewCardForm from "./components/NewCardForm";
import axios from "axios";
import { useState, useEffect } from "react";

// const BaseUrl = "http://localhost:5000";

function App() {
  // const boardData = [
  //   {
  //     title: "Board 1",
  //     author: "Author 1",
  //   },
  //   {
  //     title: "Board 2",
  //     author: "Author 2",
  //   },
  //   {
  //     title: "Board 3",
  //     author: "Author 3",
  //   },
  // ];

  const [boardsData, setBoardsData] = useState([]);
  const [cardsData, setCardsData] = useState([]);
  const createNewBoard = (newBoardData) => {
    axios
      .post("http://localhost:5000/boards", newBoardData)
      .then((response) => {
        const newBoards = [...boardsData];
        // const newId = Math.max(...newBoards.map(board => board.id))+1
        newBoards.push({
          // id: newId,
          board_id: response.data.id,
          title: response.data.title,
          owner: response.data.owner,
          ...boardsData,
        });
        setBoardsData(newBoards);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addCardCallBack = (newCardsData) => {
    axios
      .post("http://localhost:5000//boards/<board_id>/cards", newCardsData)
      .then((response) => {
        const newCards = [...cardsData];
        // const newId = Math.max(...newBoards.map(board => board.id))+1
        newCards.push({
          // id: newId,
          board_id: response.data.board_id,
          message: response.data.message,
          card_id: response.data.card_id,
          ...cardsData,
        });
        setCardsData(newCards);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <NewBoardForm createNewBoard={createNewBoard} />
        <NewCardForm addCardCallBack={addCardCallBack} />

        {/* <Board>Board</Board> */}
      </header>
      <main>
        <Board entries={boardsData}></Board>
      </main>
    </div>
  );

  // return (
  // <div>
  //   <header>
  //     <h1>Inspiration Board</h1>
  //   </header>
  //   <main>
  //     <Board
  //       entries={boardData}
  //     ></Board>
  //   </main>
  // </div>
  // );
}

export default App;
