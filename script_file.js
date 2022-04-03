var board ;               // this is the board object.
var game = new Chess();   // creating the game object in accordance to the chess.js library

// ******* evaluation algorithm ********** //

    var getPieceValue = function (piece, x, y) {
        if (piece === null) {
            return 0;
        }
        var getAbsoluteValue = function (piece, isWhite, x ,y) {
            if (piece.type === 'p') {
                return 10 + ( isWhite ? pawnEvalWhite[y][x] : pawnEvalBlack[y][x] );
            } else if (piece.type === 'r') {
                return 50 + ( isWhite ? rookEvalWhite[y][x] : rookEvalBlack[y][x] );
            } else if (piece.type === 'n') {
                return 30 + knightEval[y][x];
            } else if (piece.type === 'b') {
                return 30 + ( isWhite ? bishopEvalWhite[y][x] : bishopEvalBlack[y][x] );
            } else if (piece.type === 'q') {
                return 90 + evalQueen[y][x];
            } else if (piece.type === 'k') {
                return 900 + ( isWhite ? kingEvalWhite[y][x] : kingEvalBlack[y][x] );
            }
            throw "Unknown piece type: " + piece.type;
        };

        var absoluteValue = getAbsoluteValue(piece, piece.color === 'w', x ,y);
        return piece.color === 'w' ? absoluteValue : -absoluteValue;
    };


    var evaluate_chess_board = function (board) {
        var totalEvaluation = 0;
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                totalEvaluation = totalEvaluation + getPieceValue(board[i][j], i ,j);
            }
        }
        return totalEvaluation;
    };

    var reverseArray = function(array) {
        return array.slice().reverse();
    };

    var pawnEvalWhite =
        [
            [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
            [5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0],
            [1.0,  1.0,  2.0,  3.0,  3.0,  2.0,  1.0,  1.0],
            [0.5,  0.5,  1.0,  2.5,  2.5,  1.0,  0.5,  0.5],
            [0.0,  0.0,  0.0,  2.0,  2.0,  0.0,  0.0,  0.0],
            [0.5, -0.5, -1.0,  0.0,  0.0, -1.0, -0.5,  0.5],
            [0.5,  1.0, 1.0,  -2.0, -2.0,  1.0,  1.0,  0.5],
            [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0]
        ];

    var pawnEvalBlack = reverseArray(pawnEvalWhite);

    var knightEval =
        [
            [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
            [-4.0, -2.0,  0.0,  0.0,  0.0,  0.0, -2.0, -4.0],
            [-3.0,  0.0,  1.0,  1.5,  1.5,  1.0,  0.0, -3.0],
            [-3.0,  0.5,  1.5,  2.0,  2.0,  1.5,  0.5, -3.0],
            [-3.0,  0.0,  1.5,  2.0,  2.0,  1.5,  0.0, -3.0],
            [-3.0,  0.5,  1.0,  1.5,  1.5,  1.0,  0.5, -3.0],
            [-4.0, -2.0,  0.0,  0.5,  0.5,  0.0, -2.0, -4.0],
            [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0]
        ];

    var bishopEvalWhite = [
        [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
        [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
        [ -1.0,  0.0,  0.5,  1.0,  1.0,  0.5,  0.0, -1.0],
        [ -1.0,  0.5,  0.5,  1.0,  1.0,  0.5,  0.5, -1.0],
        [ -1.0,  0.0,  1.0,  1.0,  1.0,  1.0,  0.0, -1.0],
        [ -1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0],
        [ -1.0,  0.5,  0.0,  0.0,  0.0,  0.0,  0.5, -1.0],
        [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]
    ];

    var bishopEvalBlack = reverseArray(bishopEvalWhite);

    var rookEvalWhite = [
        [  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
        [  0.5,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  0.5],
        [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
        [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
        [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
        [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
        [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
        [  0.0,   0.0, 0.0,  0.5,  0.5,  0.0,  0.0,  0.0]
    ];

    var rookEvalBlack = reverseArray(rookEvalWhite);

    var evalQueen = [
        [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
        [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
        [ -1.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
        [ -0.5,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
        [  0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
        [ -1.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
        [ -1.0,  0.0,  0.5,  0.0,  0.0,  0.0,  0.0, -1.0],
        [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]
    ];

    var kingEvalWhite = [

        [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
        [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
        [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
        [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
        [ -2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
        [ -1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
        [  2.0,  2.0,  0.0,  0.0,  0.0,  0.0,  2.0,  2.0 ],
        [  2.0,  3.0,  1.0,  0.0,  0.0,  1.0,  3.0,  2.0 ]
    ];

    var kingEvalBlack = reverseArray(kingEvalWhite);



// ******* end of the evaluation algorithms (using weights + piece square tables ) ******** //

//******** the start of the search algorithms ******* //

  // the minimax algorithm executes a depth search to find the best move
    var minimax = function (depth, game, alpha, beta, MaximisingPlayer) {  // alpha stores the max value.
        positionCount++;  // this keeps count of the number of positions evaluated during the minimax search.
        if (depth === 0) {
            return -evaluate_chess_board(game.board());
        } // condition for the recursive function.

        var newGameMoves = game.ugly_moves();  // used ugly_moves() instead of moves() to avoid the hassle of converting moves to human readable strings

        if (MaximisingPlayer) {
            var bestMove = -999999;             // choosing an extremely high negative number, possibly infinity... but that had bugs. (sad noises)
            for (var i = 0; i < newGameMoves.length; i++) {
                game.ugly_move(newGameMoves[i]);  // execute a move
                bestMove = Math.max(bestMove, minimax(depth - 1, game, alpha, beta, !MaximisingPlayer));
                game.undo();   // undo the executed move.
                alpha = Math.max(alpha, bestMove);
                if (beta <= alpha) {
                    return bestMove;
                }
            }
            return bestMove;
        } else {
            var bestMove = 9999;
            for (var i = 0; i < newGameMoves.length; i++) {
                game.ugly_move(newGameMoves[i]);
                bestMove = Math.min(bestMove, minimax(depth - 1, game, alpha, beta, !MaximisingPlayer));
                game.undo();
                beta = Math.min(beta, bestMove);
                if (beta <= alpha) {
                    return bestMove;
                }
            }
            return bestMove;
        }
    };
    // the end of the minimax algorithm.

    // start of minimaxRoot ; it exists just to ensure we pass arguments cleanly. It has fewer parameters
    var minimaxRoot =function(depth, game, MaximisingPlayer) {

        var newGameMoves = game.ugly_moves();
        var bestMove = -9999;
        var bestMoveFound;

        for(var i = 0; i < newGameMoves.length; i++) {
            var newGameMove = newGameMoves[i]
            game.ugly_move(newGameMove);
            var value = minimax(depth - 1, game, -10000, 10000, !MaximisingPlayer);
            game.undo();
            if(value >= bestMove) {
                bestMove = value;
                bestMoveFound = newGameMove;
            }
        }
        return bestMoveFound;
    };
    // start of minimaxRoot ;

//******** the end of the search algorithms ******* //


//******* the start of basic chess execution algorithms ... eg behaviour and display functions **** //
/* board visualization and games state handling */

var positionCount;                   // keeps track of positions evaluated
var getBestMove = function (game) {
    if (game.game_over()) {
        alert('Game over');
    }

    positionCount = 0;
    var depth = parseInt($('#search-depth').find(':selected').text());

    var search_start_time = new Date().getTime();          // mark the time before best_move search
    var bestMove = minimaxRoot(depth, game, true); // implement best_move search
    var search_end_time = new Date().getTime();        // mark the time after best_move search
    var search_duration = (search_end_time - search_start_time);             // find search duration.
    var positionsPerS = ( positionCount * 1000 / search_duration);

    $('#position-count').text(positionCount);
    $('#time').text(search_duration/1000 + 's');
    return bestMove;
};

var makeBestMove = function () {
    var bestMove = getBestMove(game);
    game.ugly_move(bestMove);   // where acual execution of move occurs
    board.position(game.fen());
    if (game.game_over()) {
        alert('Game over');
    }
};

var onDragStart = function (source, piece, position, orientation) {
    if (game.in_checkmate() === true || game.in_draw() === true ||
        piece.search(/^b/) !== -1) {
        return false;
    }
};


var onDrop = function (source, target) {

    var move = game.move({
        from: source,
        to: target,
        promotion: 'q'
    });

    removeGreySquares();
    if (move === null) {
        return 'snapback';
    }

    window.setTimeout(makeBestMove, 250);
};

var onSnapEnd = function () {
    board.position(game.fen());
};

var onMouseoverSquare = function(square, piece) {
    var moves = game.moves({
        square: square,
        verbose: true
    });

    if (moves.length === 0) return;

    greySquare(square);

    for (var i = 0; i < moves.length; i++) {
        greySquare(moves[i].to);
    }
};

var onMouseoutSquare = function(square, piece) {
    removeGreySquares();
};

var removeGreySquares = function() {
    $('#board .square-55d63').css('background', '');
};

var greySquare = function(square) {
    var squareEl = $('#board .square-' + square);

    var background = '#a9a9a9';
    if (squareEl.hasClass('black-3c85d') === true) {
        background = '#696969';
    }

    squareEl.css('background', background);
};

// dealing with the undo_button

var STACK_SIZE = 100; // maximum size of undo stack
var undo_stack = []; // stores the undos ... useful for executing redos

$('#undo_button').on('click', function () {
  for (var i = 0; i < 2; i++) { // reason for doing it 2 times is so that we can also undo computers move.
    var move = game.undo();
    undo_stack.push(move);
  }

  // Maintain a maximum stack size
  if (undo_stack.length > STACK_SIZE) {
    // undo_stack.shift();
  }
  board.position(game.fen());
});

// end of dealing with the undo_button
// starting to deal with the redo button
  function redo() {
    game.move(undo_stack.pop());
    board.position(game.fen());
  }

  $('#redo_button').on('click', function () {
    if (undo_stack.length >= 2) {
      // Redo twice: Player's last move, followed by opponent's last move
      redo();
      window.setTimeout(function () {
        redo();
        window.setTimeout(function () {
        }, 250);
      }, 250);
    } else {
      alert('Nothing to redo.');
    }
  });
// end of dealing with the redo button

// dealing with checks and checkmates
function king_attacked(color) {
  return attacked(swap_color(color), kings[color])
}

function in_check() {
  return king_attacked(turn)
}

function in_checkmate() {
  return in_check() && generate_moves().length === 0
}

function in_stalemate() {
  return !in_check() && generate_moves().length === 0
}

// end of deling with check and checkmates.

var cfg = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onMouseoutSquare: onMouseoutSquare,
    onMouseoverSquare: onMouseoverSquare,
    onSnapEnd: onSnapEnd
};
board = ChessBoard('board', cfg);
