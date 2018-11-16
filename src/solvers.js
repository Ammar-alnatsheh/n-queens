/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(rows = 1) {
  var solution; //fixme

  var board = new Board({n: rows});

  var makeOptions = function (rowNumber) {

    if (rowNumber === rows) {
      solution = board.rows()
      return;
    }

    for (var col = 0; col < rows; col++) {

      board.togglePiece(rowNumber, col );

      if ( !board.hasRowConflictAt(rowNumber) && !board.hasColConflictAt(col) ) {
        makeOptions(rowNumber + 1);
      } else {
      board.togglePiece(rowNumber, col );
      }
    }
    
  };

  makeOptions( 0); 

  console.log('Single solution for ' + rows + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(rows = 1) {
  var solutionCount = 0; //fixme

  var board = new Board({n: rows});

  var makeOptions = function (rowNumber) {

    if (rowNumber === rows) {
      solutionCount ++
      return;
    }

    for (var col = 0; col < rows; col++) {

      board.togglePiece(rowNumber, col );

      if ( !board.hasRowConflictAt(rowNumber) && !board.hasColConflictAt(col) ) {
        makeOptions(rowNumber + 1);
        board.togglePiece(rowNumber, col );
      } else {
      board.togglePiece(rowNumber, col );
      }
    }
    
  };

  makeOptions( 0); 

  console.log('Number of solutions for ' + rows + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(rows) {

  var solution=[]; //fixme

  var board = new Board({n: rows});

  var makeOptions = function (rowNumber) {

    if (rowNumber === rows) {
      solution.push((board.rows()).slice());
      return;
    }
    for (var col = 0; col < rows; col++) {
      if (solution.length !== 0){
        return;
      }
      board.togglePiece(rowNumber, col );

      if ( !board.hasRowConflictAt(rowNumber) && !board.hasColConflictAt(col) && !board.hasAnyMinorDiagonalConflicts() && !board.hasAnyMajorDiagonalConflicts() ) {
        makeOptions(rowNumber + 1);
      } else {
        refresh(rowNumber);
      }
    }
    if (solution.length === 0) {
      refresh(rowNumber - 1);
    }
  };
  
  var refresh = function(row) {
    if (row < 0) {
      row = 0;
    }
  // make sure that the rows below the fallback are cleared;
    for (var i = row; i < rows; i ++) {
        for (var j = 0; j < rows; j++) {
            board.attributes[i][j] = 0;
        }
    }
  };

  makeOptions( 0); 

  console.log('Single solution for ' + rows + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(rows) {
  var solution=[]; //fixme

  var board = new Board({n: rows});

  var makeOptions = function (rowNumber) {

    if (rowNumber === rows) {
      solution.push( board.rows());
      return;
    }

    for (var col = 0; col < rows; col++) {

      board.togglePiece(rowNumber, col );

      if ( !board.hasRowConflictAt(rowNumber) && !board.hasColConflictAt(col) && !board.hasAnyMinorDiagonalConflicts() && !board.hasAnyMajorDiagonalConflicts() ) {
        makeOptions(rowNumber + 1);
        board.togglePiece(rowNumber, col );
      } else {
      board.togglePiece(rowNumber, col );
      }
    }
    
  };

  makeOptions( 0);
  solutionCount = solution.length;

  console.log('Number of solutions for ' + rows + ' queens:', solutionCount);
  return solutionCount;
};




/// BITWISE IMPLEMENTATION
// var findBitWiseQueen = function(rows) {
//   var currentRow = 0;
//   var board = Array.apply(null, Array(rows)).map(Number.prototype.valueOf,0);
//   var depth = 0;
//   var hasColConflict = function(position) {
//     for (var i = position + rows; i <= board.length; i+= rows){
//       if (board[i] === 1) {
//         return true;
//       }
//     }
//     return false;
//   }
//   var hasRowConflict = function(position) {
//     var row = Math.floor(position /= rows)
//     var start = row * rows
//     var sum = 0;
//     for (var i = start; i < (start + rows); i ++) {
//       sum += board[i];
//     }
//   }
//   var hasMinorDiagonalConflict = function(position) {
//     var sum = 0;
//     for (var i = position; i >= 0; i -= rows + 1){
//     sum+= board[i]
    
//     }
//     for (var i = position += rows - 1; i < (board.length); i+= rows - 1){
//     sum += board[i]
//     }
//     if (sum > 1) {
//     return true;
//     }
//     return false;
//   }
//   var hasMajorDiagonalConflict = function(position) {
//     var sum = 0;
//     for (var i = position; i >= 0; i -= rows - 1){
//       sum+= board[i]
//     }
//     for (var i = position += rows + 1; i < (board.length); i+= rows + 1){
//       sum += board[i]
//     }
//     if (sum > 1) {
//       return true;
//     }
//     return false;
//   }
// var placeQueen = function(currentRow) {
//     if (depth === rows) {
//       result = board;
//       return result;
//     }
//     for (var i = (currentRow * rows); i < (currentRow + 1 * rows); i++){
//        for (var a = i; a < board.length; a++){
//          board[i] = 0;
//        }
//       board[i] = 1;
//       if ((hasMajorDiagonalConflict(position)) || (hasMinorDiagonalConflict(position)) || (hasRowConflict(position)) || (hasColConflict(position))) {
//         placeQueen(currentRow + 1)
//       } else {
//         board[i] = 0;
//       }
//     }
// placeQueen(0);
//   return result;  
// };