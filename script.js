$(document).ready(function (){
  for (var i=0; i<localStorage.length; i++){
    var object = JSON.parse(localStorage.getItem(localStorage.key(i)));
    createIdea(object);
  }
});


function createIdea(idea) {
  $('.render-idea').prepend(
    `<li class ='idea-box' id=${idea.id}>
        <h2 class='title-result' contenteditable>${idea.title}</h2>
        <p class='body-result' contenteditable>${idea.body}</p>
        <span display='inline'>quality: <p class='quality'>${idea.quality}</p></span>
        <button class='delete-button'>delete
        </button>
        <button class='upvote'>Up</button>
        <button class='downvote'>Down</button>
      </li>`);
};

function Idea(title, body){
  this.title = title;
  this.body = body;
  this.id = Date.now()
  this.quality = 'swill'
}

$('.save-button').on('click', function(){
  var title = $('.title-input').val();
  var body = $('.body-input').val();
  var idea = new Idea(title, body);
  createIdea(idea);
  localStorage.setItem(idea.id, JSON.stringify(idea));
});

$('.render-idea').on('click', '.delete-button', function(){
  var idNumber = $(this).closest('li').attr('id');
  localStorage.removeItem(idNumber);
  $(this).closest('li').remove();
});

$('.render-idea').on('click', '.upvote, .downvote', function(){
  var parentSelector = $(this).closest('li');
  var idNumber = parentSelector.attr('id');
  var quality = parentSelector.find('.quality').text();
  var upOrDown = $(this).attr('class');
  var newQuality = buttonSort(upOrDown, quality);
  parentSelector.find('.quality').text(newQuality);
  var ideaBox = JSON.parse(localStorage.getItem(idNumber));
  ideaBox.quality = newQuality;
  localStorage.setItem(idNumber, JSON.stringify(ideaBox));
});

function upVote(quality){
  switch(quality){
    case 'swill':
      return 'plausible';
    case 'plausible':
      return 'genius';
    default:
      return 'genius';
    }
};

function downVote(quality){
  switch(quality){
    case 'genius':
      return 'plausible';
    case 'plausible':
      return 'swill';
    default:
      return 'swill';
  }
}

function buttonSort(upOrDown, quality){
  if (upOrDown === 'upvote'){
    return upVote(quality);
  } else {
    return downVote(quality);
  }
}
