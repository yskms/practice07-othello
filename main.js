class Board {

  constructor() {
    this.board = [
      [ 0, 0, 0, 0, 0, 0, 0, 0 ], //配列の中に配列
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 1, 2, 0, 0, 0 ],
      [ 0, 0, 0, 2, 2, 0, 0, 0 ],
      [ 0, 0, 0, 0, 2, 0, 0, 0 ],
      [ 0, 0, 0, 0, 2, 0, 0, 0 ],
      [ 0, 0, 0, 0, 1, 0, 0, 0 ],
    ];
    this.turn = 1;
  }

  displayBoard(x, y) {
    boardBox[(8 * y) + x].innerHTML = this.board[y][x];
  }
  toggleTurn() {
    this.turn == 1 ? this.turn = 2 : this.turn = 1;
  }

  highLightCanSetBox(index) { //8方向を調べれる
    const x = index % 8;
    const y = Math.floor(index / 8);
    let down = [];
    let up = [];
    let right = [];
    let left = [];
    let rd = [];
    let ru = [];
    let ld = [];
    let lu = [];
    console.log(`index ${index}, x: ${x}, y: ${y}`);  //クリック座標

    // 8line down
    for(let i=1; y+i<8; i++) {
      if(this.board[y+i][x] == 1) {
        // console.log(`1がある x: ${x}, y: ${y+i}`);
        down.push(1);
        // console.log(down);
      } else if(this.board[y+i][x] == 2) {
        // console.log(`2がある x: ${x}, y: ${y+i}`);
        down.push(2);
        // console.log(down);
      } else {
        // console.log(`0がある x: ${x}, y: ${y+i}`);
        down.push(0);
        // console.log(down);
      }
    }
    console.log(`down:[${down}]`);

    //////////そもそも配列の配列にしたらええんじゃね？？？
    // function test(down)  {
    if(down[0]==0 ||down[0]==this.turn){
      console.log('置けない');
    }else{
      if(down.some(x => x==this.turn)){
        console.log('置ける');
      }else console.log('置けない');
    }
  // }
  // test(down);
  // test(up);

    // 8line up
    for(let i=1; y-i>=0; i++) {
      if(this.board[y-i][x] == 1) {
        // console.log(`1がある x: ${x}, y: ${y-i}`);
        up.push(1);
      } else if(this.board[y-i][x] == 2) {
        // console.log(`2がある x: ${x}, y: ${y-i}`);
        up.push(2);
      } else {
        // console.log(`0がある x: ${x}, y: ${y-i}`);
        up.push(0);
      }
    }
    console.log(`up:[${up}]`);

      // 8line right
      for(let i=1; x+i<8; i++) {
        if(this.board[y][x+i] == 1) {
          // console.log(`1がある x: ${x+i}, y: ${y}`);
          right.push(1);
        } else if(this.board[y][x+i] == 2) {
          // console.log(`2がある x: ${x+i}, y: ${y}`);
          right.push(2);
        } else {
          // console.log(`0がある x: ${x+i}, y: ${y}`);
          right.push(0);
        }
      }
      console.log(`right:[${right}]`);

       // 8line left
      for(let i=1; x-i>=0; i++) {
        if(this.board[y][x-i] == 1) {
          // console.log(`1がある x: ${x-i}, y: ${y}`);
          left.push(1);
        } else if(this.board[y][x-i] == 2) {
          // console.log(`2がある x: ${x-i}, y: ${y}`);
          left.push(2);
        } else {
          // console.log(`0がある x: ${x-i}, y: ${y}`);
          left.push(0);
        }
      }
      console.log(`left:[${left}]`);

      // 8line rd
      for(let i=1; y+i<8; i++) {
        if(this.board[y+i][x+i] == 1) {
          rd.push(1);
        } else if(this.board[y+i][x+i] == 2) {
          rd.push(2);
        } else {
          rd.push(0);
        }
      }
      console.log(`rd:[${rd}]`);

        // 8line ru
      for(let i=1; y-i>=0; i++) {
        if(this.board[y-i][x+i] == 1) {
          ru.push(1);
        } else if(this.board[y-i][x+i] == 2) {
          ru.push(2);
        } else {
          ru.push(0);
        }
      }
      console.log(`ru:[${ru}]`);

      // 8line ld
      for(let i=1; y+i<8; i++) {
        if(this.board[y+i][x-i] == 1) {
          ld.push(1);
        } else if(this.board[y+i][x-i] == 2) {
          ld.push(2);
        } else {
          ld.push(0);
        }
      }
      console.log(`ld:[${ld}]`);

        // 8line lu
        for(let i=1; y-i>=0; i++) {
          if(this.board[y-i][x-i] == 1) {
            lu.push(1);
          } else if(this.board[y-i][x-i] == 2) {
            lu.push(2);
          } else {
            lu.push(0);
          }
        }
        console.log(`lu:[${lu}]`);
  }
}

const boardBox = document.querySelectorAll('.box');
const board = new Board();

boardBox.forEach((box, index) => {  //与えられた関数を、配列の各要素に対して一度ずつ実行します。
  box.addEventListener('click', e => {  //ターゲットに特定のイベントが配信されるたびに呼び出される関数を設定します。
    board.highLightCanSetBox(index);
  })
})

function main() {
  board.displayBoard(3, 3);
  board.displayBoard(3, 4);
  board.displayBoard(4, 3);
  board.displayBoard(4, 4);
  board.displayBoard(4, 5);
  board.displayBoard(4, 6);
  board.displayBoard(4, 7);
}