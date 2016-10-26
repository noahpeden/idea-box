var $titleInput = $('.title-input')
var $bodyInput = $('.body-input')

function createIdea(idea) {
  $('.render-idea').prepend(
    `<li class ='idea-box' id=${idea.id}>
        <h2 class='title-result'>${idea.title}</h2>
        <p class='body-result'>${idea.body}</p>
        <p class='quality'>quality: ${idea.quality}</p>
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
// display the new idea on the page
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

$('.render-idea').on('click', '.upvote', function(){
  var $quality = $(this).closest('.idea-box').find('.quality');
  switch($quality.text()){
  case 'quality: swill':
     return $quality.text('quality: plausible');
  case 'quality: plausible':
    return $quality.text('quality: genius');
  }
});

$('.render-idea').on('click', '.downvote', function(){
  var $quality = $(this).closest('.idea-box').find('.quality');
  switch($quality.text()){
  case 'quality: genius':
     return $quality.text('quality: plausible');
  case 'quality: plausible':
    return $quality.text('quality: swill');
  }
});
