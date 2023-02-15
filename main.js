// x-1,y-1: x,y-1: x+1,y-1
// x-1,y  : x,y  : x+1,y
// x-1,y+1: x,y+1: x+1,y+1
//これを配列にしてしまう１をiにしてforで回せばええんちゃう！

let down = [];
let up = [];
let right = [];
let left = [];
let rd = [];
let ru = [];
let ld = [];
let lu = [];
let okeru = 0;
let color;
let color2;
const hensuu = [
  [0,0-1],
  [0+1,0-1],
  [0+1,0],
  [0+1,0+1],
  [0,0+1],
  [0-1,0+1],
  [0-1,0],
  [0-1,0-1],
];

class Board {

  constructor() {
    this.board = [
      [ 0, 0, 0, 0, 0, 0, 0, 0 ], //配列の中に配列
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 1, 2, 0, 0, 0 ],
      [ 0, 0, 0, 2, 1, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0 ],
    ];
    this.turn = 1;
  }

  displayBoard(x, y) {
    this.turn==1 ? color='white' : color='black';
    this.turn==1 ? color2='black' : color2='white';
    boardBox[(8 * y) + x].innerHTML = this.board[y][x];
    boardBox[(8 * y) + x].classList.remove(`${color2}`);
    boardBox[(8 * y) + x].classList.add(`${color}`);
  }
  toggleTurn() {
    this.turn == 1 ? this.turn = 2 : this.turn = 1;
  }
  canset(k){//hantei配列をだす関数
      const a = k % 8;
      const b = Math.floor(k / 8);
      const hantei = [[],[],[],[],[],[],[],[]];
      boardBox[(8 * b) + a].classList.remove(`yellow`);

      for(let i=0; i<8; i++){//まずi=0で固定して
        for(let j=1; ((0<=(b+j*(hensuu[i][1])))&&((b+j*(hensuu[i][1])<8))&&(0<=(a+j*(hensuu[i][0])))&&((a+j*(hensuu[i][0])<8))); j++){
        //-1か8じゃないなら、for文を回す
          //置ける個数が0orその場所が0以外なら何もしない
          if(this.board[b][a] !==0 ){
          // if(kosuu[i]==0 || this.board[b][a] !== 0){  //
          }else 
          if(this.board[b+j*(hensuu[i][1])][a+j*(hensuu[i][0])] == 0){//一つ先が0なら終わり
            break;
          } else if(this.board[b+j*(hensuu[i][1])][a+j*(hensuu[i][0])] == this.turn){
            hantei[i].push(this.turn);  //一つ先が自色なら1or2
          } else if(this.board[b+j*(hensuu[i][1])][a+j*(hensuu[i][0])] !== this.turn){
            hantei[i].push(5);          //自色以外なら５
          }
        }
      }
      return(hantei);
    }
  add_yellow(hairetuhairetu,k){ //2重配列と63までの数字をもらって使う、黄色付け関数
      const a = k % 8;
      const b = Math.floor(k / 8);
      for(let i = 0; i<8; i++){
      if(hairetuhairetu[i][0]!==this.turn && hairetuhairetu[i].some(s => s==this.turn)){
        //８方向について、先頭が自色でないかつ、配列内に自色があるなら
        // if(this.board[b][a]==0)
        // console.log(`${i}置ける`);
        boardBox[(8 * b) + a].classList.add(`yellow`);
        break;
      }
      }
    }
  cansetall2(){
    for(let k=0; k<64; k++){
      const c = this.canset(k); //出力される2重配列をcに入れる
      this.add_yellow(c,k);     //その２重配列とkで黄色付け関数を発動する。64回。
    }
  }
  kaesu(hairetuhairetu,k){
    const a = k % 8;
    const b = Math.floor(k / 8);
    let okeru = 0;
    for(let i =0; i<8; i++){
    if(hairetuhairetu[i][0]!==this.turn && hairetuhairetu[i].some(s => s==this.turn)){
      //８方向について、先頭が自色でないかつ、配列内に自色があるなら
      okeru = 1;
      //ex.[5,5,2,5,2]
      for(let j =0; j<hairetuhairetu[i].length; j++){
        if(hairetuhairetu[i][j]!==this.turn){//配列のj番目が他色なら
          console.log(this.board[b+(j+1)*(hensuu[i][1])][a+(j+1)*(hensuu[i][0])]);
          console.log(this.turn);
          this.board[b+(j+1)*(hensuu[i][1])][a+(j+1)*(hensuu[i][0])]=this.turn;
          console.log(this.board[b+(j+1)*(hensuu[i][1])][a+(j+1)*(hensuu[i][0])]);
          console.log(this.turn);
          //i方向に一つ先を自色にする
          // console.log(this.board[b+(j+1)*(hensuu[i][1])][a+(j+1)*(hensuu[i][0])]);
          console.log(a+(j+1)*(hensuu[i][0]),b+(j+1)*(hensuu[i][1]));
          this.displayBoard(a+(j+1)*(hensuu[i][0]),b+(j+1)*(hensuu[i][1]));
          //それを描写する
          console.log(this.board);
        }else {
          break;  //自色なら終わらせて次の方向へ。
        }
      }
    }
    }
    if(okeru == 1){
      this.board[b][a]=this.turn;
      this.displayBoard(a,b);
      this.toggleTurn();
      this.cansetall2();
      console.log(`次は${this.turn}の番です`);
      if(this.turn===1){
        // document.getElementById('teban').innerHTML=`次は${this.turn}の番です`;
        document.getElementById('teban').innerHTML=`次は白の番です`;
      }else{
        document.getElementById('teban').innerHTML=`次は黒の番です`;}
    }else{
      console.log(`そこには置けません`);
      console.log(`まだ${this.turn}の番です`);
      if(this.turn===1){
        document.getElementById('teban').innerHTML=`そこには置けません。まだ白の番です`;
      }else{
        document.getElementById('teban').innerHTML=`そこには置けません。まだ黒の番です`;
      }
    }
  }
  hikkurimain(k){
    const c = this.canset(k);
    this.kaesu(c,k);
  }

  cansetall(){
    for(let k=0; k<64; k++){
      const a = k % 8;
      const b = Math.floor(k / 8);
      const hantei = [[],[],[],[],[],[],[],[]];
      boardBox[(8 * b) + a].classList.remove(`yellow`);

      for(let i=0; i<8; i++){//まずi=0で固定して
        //置ける個数分、for文を回す
        for(let j=1; ((0<=(b+j*(hensuu[i][1])))&&((b+j*(hensuu[i][1])<8))&&(0<=(a+j*(hensuu[i][0])))&&((a+j*(hensuu[i][0])<8))); j++){ 
        console.log(`i:${i}`);
        console.log(`j:${j}`);
        console.log(`${0<j<=kosuu[i]}`);
        console.log(`${(hensuu[i][1])}`);
        console.log(`${j*(hensuu[i][1])}`);
        console.log(`${b+j*(hensuu[i][1])}`);
        console.log(`${a+j*(hensuu[i][0])}`);
        console.log(kosuu[i])      
        //置ける個数が0orその場所が0以外なら何もしない
        if(kosuu[i]==0 || this.board[b][a] !== 0){  //
        } else if(this.board[b+j*(hensuu[i][1])][a+j*(hensuu[i][0])] == 0){
          break;//一つ先が0なら終わり
        } else if(this.board[b+j*(hensuu[i][1])][a+j*(hensuu[i][0])] == this.turn){
          hantei[i].push(this.turn);  //一つ先が自色なら1or2
        } else if(this.board[b+j*(hensuu[i][1])][a+j*(hensuu[i][0])] !== this.turn){
          hantei[i].push(5);          //自色以外なら５
        }}
      }
      //----------------------------------------------
      console.log(k);
      console.log(hantei);
  
      for(let i = 0; i<8; i++){
      if(hantei[i][0]!==this.turn && hantei[i].some(s => s==this.turn)){
        boardBox[(8 * b) + a].classList.add(`yellow`);
        break;
      }
      }
    }
  }

  highLightCanSetBox(index) { //8方向を調べれる
    const x = index % 8;
    const y = Math.floor(index / 8);
    down = [];
    up = [];
    right = [];
    left = [];
    rd = [];
    ru = [];
    ld = [];
    lu = [];
    okeru = 0;
    console.log(`index ${index}, x: ${x}, y: ${y}`);  //クリック座標
    const hantei = [[],[],[],[],[],[],[],[]];

    // 8line down
    if( y == 7){
    }else if(this.board[y+1][x] == 0 || this.board[y+1][x] == this.turn) { 
      //1つ下が0,自色なら,何もしないでいい
      console.log('d置けない1');
    }else{  //他色の場合、置けるか判定したい
      for(let i=1; y+i<8; i++) { //判定用配列に1,2 or 5 or 0をいれる
        if(this.board[y+i][x] == 0){
          break;
        } else if(this.board[y+i][x] == this.turn) {
          down.push(this.turn);
        } else if(this.board[y+i][x] !== this.turn) {
          down.push(5);
        } 
      }
      console.log(`down:[${down}]`);
      if(down.some(s => s==this.turn)){ //1つ下が他色かつ、
        console.log('d置ける');
        okeru = 1;    //判定用配列のどこかに自色ありの場合は

        const promise = [];

        for(let i=1; y+i<8; i++) {
          if(this.board[y+i][x] !== this.turn) {  //他色なら
            this.board[y+i][x] = this.turn;       //自色にする

            promise[i-1] = new Promise((resolve, reject) => {
              setTimeout(() => {
                this.displayBoard(x,y+i);
                resolve(`${i}回目のプロミスが終了`);
              }, 100*i)
            })
          } else  {
            break;
          }
        }
        Promise.all(promise)
          .then((msg) => {
          console.log(msg)
        });
      }else console.log('d置けない2');
    }

    // 8line up
    if( y == 0){
    }else if(this.board[y-1][x] == 0 || this.board[y-1][x] == this.turn) { 
      //1つ上が0,自色なら,何もしないでいい
      console.log('up置けない1');
    }else{  //他色の場合、置けるか判定したい
      for(let i=1; y-i>=0; i++) {
        if(this.board[y-i][x] == 0){
          break;
        } else if(this.board[y-i][x] == this.turn) {
          up.push(this.turn);
        } else if(this.board[y-i][x] !== this.turn) {
          up.push(5);
        } 
      }
      console.log(`up:[${up}]`);
      if(up.some(s => s==this.turn)){ //置ける場合！
        console.log('up置ける');
        okeru = 1;
        for(let i=1; y-i>=0; i++) {
          if(this.board[y-i][x] !== this.turn) {  //他色なら
            this.board[y-i][x] = this.turn;       //自色にする
            this.displayBoard(x,y-i);             //描写する
          } else  {
            break;
          }
        }
      }else console.log('up置けない2');
    }
    // console.log(this.board);

      // 8line right
      if( x == 7){
      }else if(this.board[y][x+1] == 0 || this.board[y][x+1] == this.turn) { 
        //1つ右が0,自色なら,何もしないでいい
        console.log('right置けない1');
      }else{  //他色の場合、置けるか判定したい
        for(let i=1; x+i<8; i++) { //判定用配列に1,2 or 5 or 0をいれる
          if(this.board[y][x+i] == 0){
            break;
          }else
          if(this.board[y][x+i] == this.turn) {
            right.push(this.turn);
          } else if(this.board[y][x+i] !== this.turn) {
            right.push(5);
          } 
        }
        console.log(`r:[${right}]`);
        if(right.some(s => s==this.turn)){ //1つ下が他色かつ、
          console.log('r置ける');
          okeru = 1;    //判定用配列のどこかに自色ありの場合は
          for(let i=1; x+i<8; i++) {
            if(this.board[y][x+i] !== this.turn) {  //他色なら
              this.board[y][x+i] = this.turn;       //自色にする
              this.displayBoard(x+i,y);             //描写する
            } else  {
              break;
            }
          }
        }else console.log('r置けない2');
      }
      // console.log(this.board);

      //  // 8line left
      if(x == 0){
      }else if(this.board[y][x-1] == 0 || this.board[y][x-1] == this.turn) { 
        //1つ左が0,自色なら,何もしないでいい
        console.log('L置けない1');
      }else{  //他色の場合、置けるか判定したい
        for(let i=1; x-i>=0; i++) { //判定用配列に1,2 or 5 or 0をいれる
          if(this.board[y][x-i] == 0){
            break;
          }else
          if(this.board[y][x-i] == this.turn) {
            left.push(this.turn);
          } else if(this.board[y][x-i] !== this.turn) {
            left.push(5);
          } 
        }
        console.log(`L:[${left}]`);
        if(left.some(s => s==this.turn)){ //1つ下が他色かつ、
          console.log('L置ける');
          okeru = 1;    //判定用配列のどこかに自色ありの場合は
          for(let i=1; x-i>=0; i++) {
            if(this.board[y][x-i] !== this.turn) {  //他色なら
              this.board[y][x-i] = this.turn;       //自色にする
              this.displayBoard(x-i,y);             //描写する
            } else  {
              break;
            }
          }
        }else console.log('L置けない2');
      }
      // console.log(this.board);

      // 8line rd
      if(x == 7 || y == 7){
      }else if(this.board[y+1][x+1] == 0 || this.board[y+1][x+1] == this.turn) { 
        //1つ下が0,自色なら,何もしないでいい
        console.log('rd置けない1');
      }else{  //他色の場合、置けるか判定したい
        for(let i=1; y+i<8 && x+i<8; i++) { //判定用配列に1,2 or 5 or 0をいれる
          if(this.board[y+i][x+i] == 0){
            break;
          }else
          if(this.board[y+i][x+i] == this.turn) {
            rd.push(this.turn);
          } else if(this.board[y+i][x+i] !== this.turn) {
            rd.push(5);
          } 
        }
        console.log(`rd:[${rd}]`);
        if(rd.some(s => s==this.turn)){ //1つ下が他色かつ、
          console.log('rd置ける');
          okeru = 1;    //判定用配列のどこかに自色ありの場合は
          for(let i=1; y+i<8 && x+i<8; i++) {
            if(this.board[y+i][x+i] !== this.turn) {  //他色なら
              this.board[y+i][x+i] = this.turn;       //自色にする
              this.displayBoard(x+i,y+i);             //描写する
            } else  {
              break;
            }
          }
        }else console.log('rd置けない2');
      }
      // console.log(this.board);

        // 8line ru
      if(x == 7 || y == 0){
      }else if(this.board[y-1][x+1] == 0 || this.board[y-1][x+1] == this.turn) { 
        //1つ下が0,自色なら,何もしないでいい
        console.log('ru置けない1');
      }else{  //他色の場合、置けるか判定したい
        for(let i=1; y-i>=0 && x+i<8; i++) { //判定用配列に1,2 or 5 or 0をいれる
          if(this.board[y-i][x+i] == 0){
            break;
          }else
          if(this.board[y-i][x+i] == this.turn) {
            ru.push(this.turn);
          } else if(this.board[y-i][x+i] !== this.turn) {
            ru.push(5);
          } 
        }
        console.log(`ru:[${ru}]`);
        if(ru.some(s => s==this.turn)){ //1つ下が他色かつ、
          console.log('ru置ける');
          okeru = 1;    //判定用配列のどこかに自色ありの場合は
          for(let i=1; y-i>=0 && x+i<8; i++) {
            if(this.board[y-i][x+i] !== this.turn) {  //他色なら
              this.board[y-i][x+i] = this.turn;       //自色にする
              this.displayBoard(x+i,y-i);             //描写する
            } else  {
              break;
            }
          }
        }else console.log('ru置けない2');
      }

      // 8line ld
      if(x == 0 || y == 7){
      }else if(this.board[y+1][x-1] == 0 || this.board[y+1][x-1] == this.turn) { 
        //1つ下が0,自色なら,何もしないでいい
        console.log('ld置けない1');
      }else{  //他色の場合、置けるか判定したい
        for(let i=1; y+i<8 && x-i>=0; i++) { //判定用配列に1,2 or 5 or 0をいれる
          if(this.board[y+i][x-i] == 0){
            break;
          }else
          if(this.board[y+i][x-i] == this.turn) {
            ld.push(this.turn);
          } else if(this.board[y+i][x-i] !== this.turn) {
            ld.push(5);
          } 
        }
        console.log(`ld:[${ld}]`);
        if(ld.some(s => s==this.turn)){ //1つ下が他色かつ、
          console.log('ld置ける');
          okeru = 1;    //判定用配列のどこかに自色ありの場合は
          for(let i=1; y+i<8 && x-i>=0; i++) {
            if(this.board[y+i][x-i] !== this.turn) {  //他色なら
              this.board[y+i][x-i] = this.turn;       //自色にする
              this.displayBoard(x-i,y+i);             //描写する
            } else  {
              break;
            }
          }
        }else console.log('ld置けない2');
      }
        if(x == 0 || y == 0){
        }else if(this.board[y-1][x-1] == 0 || this.board[y-1][x-1] == this.turn) { 
          //1つ左上が0,自色なら,何もしないでいい
          console.log('Lu置けない1');
        }else{  //他色の場合、置けるか判定したい
          for(let i=1; x-i>=0 && y-i>=0; i++) { //判定用配列に1,2 or 5 or 0をいれる
            if(this.board[y-i][x-i] == 0){
              break;
            }else
            if(this.board[y-i][x-i] == this.turn) {
              lu.push(this.turn);
            } else if(this.board[y-i][x-i] !== this.turn) {
              lu.push(5);
            } 
          }
          console.log(`Lu:[${lu}]`);
          if(lu.some(s => s==this.turn)){ //1つ下が他色かつ、
            console.log('Lu置ける');
            okeru = 1;    //判定用配列のどこかに自色ありの場合は
            for(let i=1; x-i>=0 && y-i>=0; i++) {
              if(this.board[y-i][x-i] !== this.turn) {  //他色なら
                this.board[y-i][x-i] = this.turn;       //自色にする
                this.displayBoard(x-i,y-i);             //描写する
              } else  {
                break;
              }
            }
          }else console.log('Lu置けない2');
        }

        // クリックしたとこに置く
        if(okeru == 1){
          this.board[y][x] = this.turn;
          this.displayBoard(x,y);  
          setTimeout(()=>{
            this.toggleTurn();
            this.cansetall2();
            console.log(`次は${this.turn}の番です`);
          },1000);
        }else{
          console.log(`そこには置けません`);
          console.log(`まだ${this.turn}の番です`);
        }
  } //  highLightCanSetBox(index) -------
} //class Board ------


const boardBox = document.querySelectorAll('.box');
const board = new Board();

start.addEventListener('click', e => {
  start.classList.add('hide');
})

boardBox.forEach((box, index) => {  //与えられた関数を、配列の各要素に対して一度ずつ実行します。
  box.addEventListener('click', e => {  //ターゲットに特定のイベントが配信されるたびに呼び出される関数を設定します。
    // board.highLightCanSetBox(index);
    board.hikkurimain(index);
  })
})

function main() {
  board.displayBoard(3, 3);
  board.toggleTurn();
  board.displayBoard(4, 3);
  board.toggleTurn();
  board.displayBoard(4, 4);
  board.toggleTurn();
  board.displayBoard(3, 4);
  board.toggleTurn();
  board.cansetall2();
  console.log(`1の番です`);
  document.getElementById('teban').innerHTML=`次は${board.turn}の番です`;
  // board.displayBoard(4, 5);
  // board.displayBoard(4, 6);
  // board.displayBoard(4, 7);
}

function pass(){
  board.toggleTurn();
  // this.turn == 1 ? this.turn = 2 : this.turn = 1;
  console.log(`次は${board.turn}の番です`);
  if(board.turn===1){
    document.getElementById('teban').innerHTML=`次は白の番です`;
  }else{
    document.getElementById('teban').innerHTML=`次は黒の番です`;
  }
  cansetall2();
}
function result(){
  let result_white = document.querySelectorAll('.white');
  let result_black = document.querySelectorAll('.black');
  // console.log(result_white);
  console.log(`白:${result_white.length}`);
  console.log(`黒:${result_black.length}`);
  if(result_white.length == result_black.length){
    console.log(`引き分け`);
    document.getElementById('teban').innerHTML=`引き分け`;
  }else if(result_white.length > result_black.length){
    console.log(`白の勝ち`);
    document.getElementById('teban').innerHTML=`白:${result_white.length}  黒:${result_black.length}  白の勝ち`;
  }else if(result_white.length < result_black.length){
    console.log(`黒の勝ち`);
    document.getElementById('teban').innerHTML=`黒の勝ち`;
  }
}