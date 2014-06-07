var canvas=document.getElementById("board");
var ctx=canvas.getContext('2d');
ctx.translate(20,20);
ctx.lineWidth = 1;

var play = 1; // determine which player is up
var playerName = [0,'Green','Blue'];
var p1set = [6,4,4,2,2]; // store number of each piece type
var p2set = [6,4,4,2,2]; // in order: girl, queen, rabbit, cat, bat
var board = new Array(11);
var piece = new Array(11);
var bw = 'burlywood';
var wh = 'white';
// var pieceStyle = [wh,bw,bw,bw,bw,bw,'gold','lawngreen','royalblue'];
var pieceStyle = ['white','burlywood','burlywood','burlywood','burlywood','burlywood','gold','forestgreen','blue'];
var colors = ["peru","lawngreen","royalblue"]; // store square colors for drawing board
//peru, lawngreen,royalblue
var sqsize = 42;
var margin = 10;


/*
Set Piece Information Arrays
The move array holds 5 "piece" subarrays corresponding to the pieces
Each piece subarray holds two "position" subarrays.
Each "position" subarray holds a list of the relative position
in one dimension of the squared affected by the piece.
The 0 index holds the relative row position
The 1 index holds the relative col position
The pieces own position is not included
*/
var moveData = new Array(5);
moveData[0] = new Array(2);
moveData[1] = new Array(2);
moveData[2] = new Array(2);
moveData[3] = new Array(2);
moveData[4] = new Array(2);

moveData[0][0] = [-1, 0, 0, 1];
moveData[0][1] = [ 0,-1, 1, 0];
moveData[1][0] = [-2,-1,-1,-1, 0, 0, 0, 0, 1, 1, 1, 2];
moveData[1][1] = [ 0,-1, 0, 1,-2,-1, 1, 2,-1, 0, 1, 0];
moveData[2][0] = [-2,-2,-1,-1, 1, 1, 2, 2];
moveData[2][1] = [-2, 2,-1, 1,-1, 1,-2, 2];
moveData[3][0] = [-10,-9,-8,-7,-6,-5,-4,-3,-2,-1, 1, 2, 3, 4, 5, 6, 7, 8, 9,10];
moveData[3][1] = [  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
moveData[4][0] = [  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
moveData[4][1] = [-10,-9,-8,-7,-6,-5,-4,-3,-2,-1, 1, 2, 3, 4, 5, 6, 7, 8, 9,10];


function drawboard(){

	for (row=0;row<=10;row++){
		for (col=0;col<=10;col++){
			ctx.beginPath();
			ctx.rect(col*sqsize+margin,row*sqsize+margin,sqsize,sqsize);
			ctx.fillStyle = colors[board[col][row]];
			ctx.fill();
			ctx.stroke();

			// draw the appropriate piece
			drawPiece(row,col);
		}
	}
}

function drawPiece(row,col){
		if(piece[col][row]>0){			
			ctx.beginPath();
			
			//draw the circle
			var centerX = (col+.5)*sqsize+margin
			var centerY = (row+.5)*sqsize+margin;
			var rad = 12;
			ctx.arc(centerX,centerY,rad,0*Math.PI,2*Math.PI);
			var pc = piece[col][row];
			
			//determine fill style
			ctx.fillStyle = pieceStyle[pc];
			ctx.fill();
			ctx.strokeStyle = 'black';
			ctx.stroke();
		}
}

function parseMove(){
	var radio = document.forms['moveForm']['piece'];
	var row = document.forms['moveForm']['row'].value;
	var col = document.forms['moveForm']['col'].value;
	
	for(i=0;i<radio.length;i++){
		if(radio[i].checked){
			move(radio[i].value,Number(col)-1,Number(row)-1);
			drawboard();
		}
	}
	
}

function move(pieceType,x,y){
	
	
	if(piece[x][y]==0 && board[x][y]!=3-play){

		var relX = moveData[pieceType-1][0];
		var relY = moveData[pieceType-1][1];
		board[x][y] = play;
		piece[x][y] = pieceType;	// set piece to value 1-5
		
		for(i=0;i<relX.length;i++){
			
			// stamp open spaces
			if(fit(x+relX[i],y+relY[i])){
				
				var pc = piece[x+relX[i]][y+relY[i]];
				
				if(open(pc)){
					board[x+relX[i]] [y+relY[i]]=play;				
					// set the appropriate piece for gem spaces
					if(pc>5){
						piece[x+relX[i]][y+relY[i]]=6+play;
					}
				}				
			}
		}
		
		//update player
		play = 3-play;
		document.getElementById('up').innerHTML = "<strong>"+playerName[play]+" to play</strong>";
	}else{
		alert('bad move');
	}
}

function fit(x,y){
	return x>=0 && x<=10 && y>=0 && y<=10;
}

function open(x){
	return x==0 || x>5;
}


for (i=0;i<=10;i++){
	board[i] = new Array(11);
	piece[i] = new Array(11);
	for(j=0;j<=10;j++){
		board[i][j]=0;
		piece[i][j]=0;
	}
}

piece[0][0]=6;
piece[10][0]=6;
piece[0][10]=6;
piece[10][10]=6;
piece[5][5]=6;
piece[2][4]=6;
piece[6][2]=6;
piece[8][6]=6;
piece[4][8]=6;


ctx.beginPath();

for(i=1;i<=11;i++){
	ctx.strokeText(i+'',sqsize*(i-1/2),0);
	ctx.strokeText(i+'',-10,sqsize*(i-1/2));
}
drawboard();




