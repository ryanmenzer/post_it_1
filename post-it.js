/////////////// BOARD MODEL

function Board() {
  this.postItNotes = []
  this.next_id_counter = 1
};

Board.prototype.addNoteToBoard = function(note){
  note.id = "post-it-" + (this.next_id_counter)
  this.postItNotes.push(note);
  this.next_id_counter++;
};

Board.prototype.deleteNote = function(note) {
  var index = this.postItNotes.indexOf(note);
  this.postItNotes.splice(index, 1);
};


/////////////// BOARD VIEW

function BoardView(selector, board) {

  this.$elem = $(selector);
  this.board = board;
  var self = this;

  this.$elem.on('click', function(event, board) {
    var note = new PostIt(event.pageX, event.pageY);
    self.board.addNoteToBoard(note);
    var noteView = new PostItView(note);
    self.$elem.append(noteView.$elem);
  });

  this.$elem.on('click', '.post-it', function(event) {
    event.stopPropagation();
  });

};


/////////////// POST-IT

function PostIt(x, y) {
  this.id = null;
  this.content = "";
  this.left = x;
  this.top = y;
};

PostIt.prototype.delete = function() {
  Board.deleteNote(this);
};

PostIt.prototype.updateContent = function(content) {
  this.content = content;
};

PostIt.prototype.addToDom = function() {
  var view = new PostItView(this);
  view.displayNote();
};


/////////////// POST-IT VIEW

function PostItView(note) {
  this.note = note
  this.$elem = this.render();
  var self = this;

  this.$elem.on('click', '.header a', function(event) {
    event.stopPropagation();
    self.deleteNote();
    board.deleteNote(note);
  });

  this.$elem.on('keyup', function(event) {
    event.stopPropagation();
    var content = $(this).children('.content').html();
    note.updateContent(content);
  });

};

PostItView.prototype.render = function() {
  return $("<div id='"+this.note.id+"' contenteditable='true' class='post-it' style='left: "+
    this.note.left +"px; top: "+
    this.note.top +"px;'>"+
      "<div class='header' contenteditable='false'>"+
        "<a>X</a>"+
      "</div>"+
      "<div class='content'>"+
      "</div>"+
    "</div>")
    .resizable()
    .draggable({ handle: ".header", containment: "window" });
};

PostItView.prototype.deleteNote = function() {
  this.$elem.remove();
};

var board

$(function() {
  board = new Board();
  var boardView = new BoardView($('#board'), board);
});
