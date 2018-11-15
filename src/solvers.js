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
  var solution = []; //fixme

  var board = new Board({n: rows});
  var rowNumber = 0;
  var makeOptions = function (rowNumber, board) {
    if (rowNumber === rows) {
      solution.push([board.rows()]);
      return;
    }
    for (var col = 0; col < board.rows()[rowNumber].length; col++) {
      var newBoard = new Board(board.rows());
      newBoard.togglePiece(rowNumber, col );
      if ((newBoard.hasRowConflictAt(rowNumber) === false) && (newBoard.hasColConflictAt(col) === false)) {
        console.log(newBoard.rows());
        makeOptions(rowNumber + 1, newBoard);
      } else {
        return;
      }
    }
    
  };

  makeOptions( rowNumber, board); 

  console.log('Single solution for ' + rows + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
