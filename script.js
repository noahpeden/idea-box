var $titleInput = $('.title-input')
var $bodyInput = $('.body-input')

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

function getIdeasFromLocalStorage(){
  var ideaArray = JSON.parse(localStorage.getItem('ideas'))
  if (ideaArray === undefined || ideaArray === null) {
    ideaArray = []
    localStorage.setItem('ideas', JSON.stringify(ideaArray))
  }
  return ideaArray;
}

Idea.prototype.storeIdea = function(){
  // get all ideas from local storage
  var allIdeas = getIdeasFromLocalStorage()
  // add new idea to ideas array
  allIdeas.push(this)
  // then set array of ideas to local storage
  localStorage.setItem('ideas', JSON.stringify(allIdeas))
}

$('.save-button').on('click', function(){
  var title = $titleInput.val();
  var body = $bodyInput.val();
  var newIdea = new Idea(title, body);
  newIdea.storeIdea()
  createIdea(newIdea);
  $titleInput.val('');
  $bodyInput.val('');
});

$(document).ready(getStorageAndDisplay())

function getStorageAndDisplay() {
  var ideaArray = JSON.parse(localStorage.getItem('ideas'))
  if (ideaArray){
    for (var i = 0; i < ideaArray.length; i++){
      createIdea(ideaArray[i]);
    }
  }
}

$('.render-idea').on('click', '.delete-button', function(){
  var ideaID = this.closest('li').id;
  var ideaArray = JSON.parse(localStorage.getItem('ideas'));
  for (var i = 0; i < ideaArray.length; i++){
    if (ideaID == ideaArray[i].id){
    ideaArray.splice(i,1);
  }
    localStorage.setItem('ideas', JSON.stringify(ideaArray));
    $(this).parent('li').remove();
  }
});

$('.render-idea').on('click', '.upvote, .downvote', function(){
  var $quality = $(this).closest('.idea-box').find('.quality');
  var ideaID = this.closest('li').id;
  var title = $(this).closest('li').find('.title-result').text();
  var body = $(this).closest('li').find('.body-result').text();
  var tempObject = new Idea(title, body);
  tempObject.id = ideaID;
  var newQuality;
  if ($(this).attr("class") === "upvote") {
    newQuality = upVoteQuality($quality.text());
  } else {
    newQuality = downVoteQuality($quality.text());
  }
  $(this).closest('li').find('.quality').text(newQuality)
  tempObject.quality = newQuality;
  updateStorage(ideaID, tempObject);
});

function updateStorage(id, object){
  var ideaArray = getIdeasFromLocalStorage()
  for (var i=0; i<ideaArray.length; i++){
    if (id == ideaArray[i].id){
      ideaArray[i] = object
    }
  }
  localStorage.setItem('ideas', JSON.stringify(ideaArray))
}

$('.render-idea').on('focus', '.title-result, .body-result', function(){
  //want title and body to be editable
  // we want edited title and body to be updated in storage

  // when we click out of fields or press Enter/Return, we want it to save in localStorage
}

function upVoteQuality(quality) {
  switch(quality){
  case 'swill':
     return 'plausible';
  case 'plausible':
    return 'genius';
  default:
    return 'genius';
  }
};

function downVoteQuality(quality) {
  switch(quality){
    case 'genius':
      return 'plausible';
    case 'plausible':
      return 'swill';
    default:
      return 'swill';
  }
}

$('.render-idea').on('click', '.downvote', function(){
  var $quality = $(this).closest('.idea-box').find('.quality');
  switch($quality.text()){
  case 'quality: genius':
     return $quality.text('quality: plausible');
  case 'quality: plausible':
    return $quality.text('quality: swill');
  }
});

  // edit ideas from localStorage
//   $(".idea-box").on("focus", ".title-result, .body-result", function(e){
//     e.preventDefault()
//     if (e.keycode == 13 || e.blur === 'focusout') {
//       debugger;
//     }
//     var newTitle = $(idea.title)
//     if($('li').blur()){
//     localStorage['idea.title'] || 'title-result';
//     }
// })
//   // store edited ideas
