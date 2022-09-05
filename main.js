class Board {

  constructor() {
    this.board = [
      [ 0, 0, 0, 0, 0, 0, 0, 0 ], //配列の中に配列
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 1, 2, 0, 0, 0 ],
      [ 0, 0, 0, 2, 2, 0, 0, 0 ],
      [ 0, 0, 0, 0, 1, 0, 0, 0 ],
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
    if(this.board[y+1][x] == 0 || this.board[y+1][x] == this.turn) { 
      //1つ下が0,自色なら,何もしないでいい
      console.log('down置けない');
    }else{  //他色の場合、置けるか判定したい
      for(let i=1; y+i<8; i++) {
        if(this.board[y+i][x] == this.turn) {
          down.push(this.turn);
        } else if(this.board[y+i][x] !== this.turn) {
          down.push(5);
        } else {
          down.push(0);
        }
      }
      console.log(`down:[${down}]`);
      if(down.some(s => s==this.turn)){ //置ける場合！
        console.log('置ける');
        for(let i=1; y+i<8; i++) {
          if(this.board[y+i][x] !== this.turn) {  //他色なら
            this.board[y+i][x] = this.turn;       //自色にする
            this.displayBoard(x,y+i);             //描写する
          } else  {
            break;
          }
        }
      }else console.log('置けない');
    }
    console.log(this.board);
  

    //////////そもそも配列の配列にしたらええんじゃね？？？
  // function test(down)  {
  //   if(down[0]==0 ||down[0]==this.turn){  //down配列の最初が1か0なら置けない
  //     console.log('置けない');
  //   }else{                                //2の場合で
  //         for(let i=0; i < down.length; i++){
  //           if(down[i]==0 || down[i]==this.turn){  ////0か1があれば
  //             console.log('返さない');
  //           }else{
  //             down[i]=this.turn;          //2なら1にする
  //           }
  //         }
  //       }
  // console.log(`down2:[${down}]`);


    // 8line up
    if(this.board[y-1][x] == 0 || this.board[y-1][x] == this.turn) { 
      //1つ上が0,自色なら,何もしないでいい
      console.log('up置けない');
    }else{  //他色の場合、置けるか判定したい
      for(let i=1; y-i>=0; i++) {
        if(this.board[y-i][x] == this.turn) {
          up.push(this.turn);
        } else if(this.board[y-i][x] !== this.turn) {
          up.push(5);
        } else {
          up.push(0);
        }
      }
      console.log(`up:[${up}]`);
      if(up.some(s => s==this.turn)){ //置ける場合！
        console.log('置ける');
        for(let i=1; y-i>=0; i++) {
          if(this.board[y-i][x] !== this.turn) {  //他色なら
            this.board[y-i][x] = this.turn;       //自色にする
            this.displayBoard(x,y-i);             //描写する
          } else  {
            break;
          }
        }
      }else console.log('置けない');
    }
    console.log(this.board);

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