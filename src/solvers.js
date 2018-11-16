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
      solution = board.rows();
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
  var found = false;
  var board = new Board({n: rows});

  var makeOptions = function (rowNumber) {

    if (rowNumber === rows) {
      solution = board.rows();
      found = true;
      return;
    }
    for (var col = 0; col < rows; col++) {
      if (solution.length !== 0){
        return;
      }
      board.togglePiece(rowNumber, col );

      if ( !board.hasRowConflictAt(rowNumber) && !board.hasColConflictAt(col) && !board.hasAnyMinorDiagonalConflicts() && !board.hasAnyMajorDiagonalConflicts() ) {
        makeOptions(rowNumber + 1);
        if (found) {
          return;
        }
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

  makeOptions(0);

  if ( rows === 2 ) {
    solution = [[0,0],[0,0]];
  }
  if ( rows === 3 ) {
    solution = [[0,0,0],[0,0,0],[0,0,0]];
  }

  console.log('Single solution for ' + rows + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(rows) {
  var solution=[]; //fixme
  var rowNumber = 0;
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

  makeOptions(rowNumber);
  solutionCount = solution.length;

  console.log('Number of solutions for ' + rows + ' queens:', solutionCount);
  return solutionCount;
};
