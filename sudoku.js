function sudoku() {
  this.init= function(content) {
    var data = content.toString().split('\n');
    this.validateData(data);
  }

  //Public method
  this.validateData= function(data) {
    var results = [];
    data.forEach(function(row) {
      row = row.trim();
      if(row != '') {
        var res = checkSudoku(row);
        results.push(row + " - " + res);
      }
    });
    document.getElementById('results').innerHTML = results.join("<br />");
  }

  //Private method
  function checkSudoku(row) {
    var arr = row.split(';')
    var size = arr[0];
    var numbers = arr[1].split(',');

    if((numbers.length%size) != 0) {
      return false;
    }
    var grids = formatGrids(size, numbers);         
    var valid = true;
    for(var i in grids) {
      var grid = grids[i];
      grid.sort();
      valid = checkGrid(grid);
      if(!valid) {
        break;
      }
    }
    return valid;
  }

  //Private Method
  function formatGrids(size, data) {
    var splitSize = Math.sqrt(size);
    var blocks = {};
    for(i=0; i< data.length; i++) {
      var x = Math.floor((i%size) / splitSize);
      var pos = Math.floor(i/size);
      var y = Math.floor(pos/splitSize);
      if(typeof(blocks[x+''+y])  == 'undefined'){
        blocks[x+''+y] = [];
      }
      blocks[x+''+y].push(data[i]);
    }
    return blocks;
  }

  //Private Method
  function checkGrid(grid) {
    for(i=0; i< grid.length; i++) {
      if(grid[i] != (i+1)) {
        return false;
      }
    }
    return true;
  }
}

//Read input file & create sudoku instance 
function getFileData(evt) {
  var file = evt.target.files[0];
  if(file) {
    var r= new FileReader();
    r.onload= function(e) {
      content = e.target.result;
      var sud = new sudoku();
      sud.init(content);
    }
    r.readAsText(file);
  }
}

window.onload = function() {
  document.getElementById('sudokufile').addEventListener('change', getFileData, false);
}

