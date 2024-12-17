document.addEventListener('DOMContentLoaded', () => {
  const gridDisplay = document.querySelector('.grid');
  const scoreDisplay = document.querySelector('#score');
  const resultDisplay = document.querySelector('#result');
  const width = 4;
  let squares = [];
  let score = 0;

  /* Creating the playing board */

  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement('div');

      square.innerHTML = 0;
      gridDisplay.appendChild(square);
      squares.push(square);
    }
    generateNumber();
    generateNumber();
  }

  createBoard();

  /* Generating a new number */

  function generateNumber() {
    const randomNumber = Math.floor(Math.random() * squares.length);

    if (squares[randomNumber].innerHTML == 0) {
      squares[randomNumber].innerHTML = 2;
      checkForGameOver();
    } else {
      generateNumber();
    }
  }

  function moveRight() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + 1].innerHTML;
        let totalThree = squares[i + 2].innerHTML;
        let totalFour = squares[i + 3].innerHTML;
        let row = [totalOne, totalTwo, totalThree, totalFour];

        let filteredRow = row.filter((num) => num);
        let missing = 4 - filteredRow.length;
        let zeros = Array(missing).fill(0);
        let newRow = zeros.concat(filteredRow);
        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
  }

  function moveLeft() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + 1].innerHTML;
        let totalThree = squares[i + 2].innerHTML;
        let totalFour = squares[i + 3].innerHTML;
        let row = [totalOne, totalTwo, totalThree, totalFour];

        let filteredRow = row.filter((num) => num);
        let missing = 4 - filteredRow.length;
        let zeros = Array(missing).fill(0);
        let newRow = filteredRow.concat(zeros);
        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
  }

  function moveUp() {
    for (let i = 0; i < 4; i++) {
      let totalOne = squares[i].innerHTML;
      let totalTwo = squares[i + width].innerHTML;
      let totalThree = squares[i + width * 2].innerHTML;
      let totalFour = squares[i + width * 3].innerHTML;
      let column = [totalOne, totalTwo, totalThree, totalFour];

      let filteredColumn = column.filter((num) => num);
      let missing = 4 - filteredColumn.length;
      let zeros = Array(missing).fill(0);
      let newColumn = filteredColumn.concat(zeros);
      squares[i].innerHTML = newColumn[0];
      squares[i + width].innerHTML = newColumn[1];
      squares[i + width * 2].innerHTML = newColumn[2];
      squares[i + width * 3].innerHTML = newColumn[3];
    }
  }

  function moveDown() {
    for (let i = 0; i < 4; i++) {
      let totalOne = squares[i].innerHTML;
      let totalTwo = squares[i + width].innerHTML;
      let totalThree = squares[i + width * 2].innerHTML;
      let totalFour = squares[i + width * 3].innerHTML;
      let column = [totalOne, totalTwo, totalThree, totalFour];

      let filteredColumn = column.filter((num) => num);
      let missing = 4 - filteredColumn.length;
      let zeros = Array(missing).fill(0);
      let newColumn = zeros.concat(filteredColumn);

      squares[i].innerHTML = newColumn[0];
      squares[i + width].innerHTML = newColumn[1];
      squares[i + width * 2].innerHTML = newColumn[2];
      squares[i + width * 3].innerHTML = newColumn[3];
    }
  }

  function keyLeft() {
    moveLeft();
    combineRow();
    moveLeft();
    generateNumber();
  }

  function keyRight() {
    moveRight();
    combineRow();
    moveRight();
    generateNumber();
  }

  function keyUp() {
    moveUp();
    combineColumn();
    moveUp();
    generateNumber();
  }

  function keyDown() {
    moveDown();
    combineColumn();
    moveDown();
    generateNumber();
  }

  /* Assingning a function to handle the keystroke */

  function control(e) {
    if (e.key === 'ArrowLeft') {
      keyLeft();
    } else if (e.key === 'ArrowRight') {
      keyRight();
    } else if (e.key === 'ArrowUp') {
      keyUp();
    } else {
      keyDown();
    }
  }

  document.addEventListener('keydown', control);

  function combineRow() {
    for (let i = 0; i < 15; i++) {
      if (squares[i].innerHTML === squares[i + 1].innerHTML) {
        let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
        squares[i].innerHTML = combinedTotal;
        squares[i + 1].innerHTML = 0;
        score += combinedTotal;
        scoreDisplay.innerHTML = score;
      }
    }
  }

  function combineColumn() {
    for (let i = 0; i < 12; i++) {
      if (squares[i].innerHTML === squares[i + width].innerHTML) {
        let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML);
        squares[i].innerHTML = combinedTotal;
        squares[i + width].innerHTML = 0;
        score += combinedTotal;
        scoreDisplay.innerHTML = score;
      }
    }
  }

  function checkForWin() {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 2048) {
        resultDisplay.innerHTML = 'You WIN!';
        document.removeEventListener('keydown', control);
        setTimeout(clear, 3000);
      }
    }
  }

  function checkForGameOver() {
    let zeros = 0;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0) {
        zeros++;
      }
    }
    if (zeros === 0) {
      resultDisplay.innerHTML = 'You LOSE!';
      document.removeEventListener('keydown', control);
      setTimeout(clear, 3000);
    }
  }

  function addColours() {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0) squares[i].style.backgroundColor = '#AFA192';
      else if (squares[i].innerHTML == 2) squares[i].style.backgroundColor = '#EEE4DA';
      else if (squares[i].innerHTML == 4) squares[i].style.backgroundColor = '#EDE0C8';
      else if (squares[i].innerHTML == 8) squares[i].style.backgroundColor = '#F2B179';
      else if (squares[i].innerHTML == 16) squares[i].style.backgroundColor = '#FFCEA4';
      else if (squares[i].innerHTML == 32) squares[i].style.backgroundColor = '#E8C064';
      else if (squares[i].innerHTML == 64) squares[i].style.backgroundColor = '#FFAB6E';
      else if (squares[i].innerHTML == 128) squares[i].style.backgroundColor = '#FD9982';
      else if (squares[i].innerHTML == 256) squares[i].style.backgroundColor = '#EAD79C';
      else if (squares[i].innerHTML == 512) squares[i].style.backgroundColor = '#76DAFF';
      else if (squares[i].innerHTML == 1024) squares[i].style.backgroundColor = '#BEEAA5';
      else if (squares[i].innerHTML == 2048) squares[i].style.backgroundColor = '#D7D4F0';
    }
  }

  let myTimer = setInterval(addColours, 50);

  function clear() {
    clearInterval(myTimer);
  }
});
