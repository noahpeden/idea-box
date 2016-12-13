var $titleInputVal = $('.title-input').val();
var $bodyInputVal = $('.body-input').val();
var $renderIdea = $('.render-idea');
var $saveBtn = $('.save-button');
var $search = $('.search')


$(document).ready(function (){
 for (var i=0; i<localStorage.length; i++){
   var object = JSON.parse(localStorage.getItem(localStorage.key(i)));
   createIdea(object);
 }
});


function createIdea(idea) {
 $('.render-idea').prepend(
   `<li class ='idea-box' id=${idea.id}>
       <h2 class='title-result' contenteditable>${idea.title}<button class='delete-button'></button></h2>
       <p class='body-result' contenteditable>${idea.body}</p>
       <button class='upvote'></button>
       <button class='downvote'></button>
       <span class='quality-text'>quality: <span class='quality'>${idea.quality}</span></span>
     </li>`);
};

function Idea(title, body){
 this.title = title;
 this.body = body;
 this.id = Date.now()
 this.quality = 'swill'
}

$saveBtn.on('click', function(){
 var title = $titleInputVal;
 var body = $bodyInputVal;
 var idea = new Idea(title, body);
 createIdea(idea);
 localStorage.setItem(idea.id, JSON.stringify(idea));
 $('.title-input').val('');
 $('.body-input').val('');
});

$renderIdea.on('click', '.delete-button', function(){
 var idNumber = $(this).closest('li').attr('id');
 localStorage.removeItem(idNumber);
 $(this).closest('li').remove();
});

$renderIdea.on('click', '.upvote, .downvote', function(){
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
   };
};

function downVote(quality){
 switch(quality){
   case 'genius':
     return 'plausible';
   case 'plausible':
     return 'swill';
   default:
     return 'swill';
 };
};

function buttonSort(upOrDown, quality){
 if (upOrDown === 'upvote'){
   return upVote(quality);
 } else {
   return downVote(quality);
 };
};

$renderIdea.on('focus', '.body-result, .title-result', function(){
 var idNumber = $(this).closest('li').attr('id');
 $(this).on('keydown', function(event){
   if(event.keyCode === 13){
     event.preventDefault();
     $(this).blur();
     return false;
   }
 })

 $(this).on('blur', function(){
   var object = JSON.parse(localStorage.getItem(idNumber));
   object.title = $(this).closest('li').find('.title-result').text();
   object.body = $(this).closest('li').find('.body-result').text();
   localStorage.setItem(idNumber, JSON.stringify(object));
 })
});

$saveBtn.on('click', function(){
  disableButton();
})

$('.title-input, .body-input').keyup(function() {
  disableButton();
})

function disableButton() {
  var titleInput = $('.title-input').val();
  var bodyInput = $('.body-input').val();
  var saveButton = $('.save-button');
  if (titleInput && bodyInput){
    saveButton.attr('disabled', false);
  } else {
    saveButton.attr('disabled', true);
  }
}

$search.keyup(function() {
 event.preventDefault();
 var searchFilter = $(this).val().toLowerCase();
 var uncorrectFilteredIdeas = $("li:not(:contains(" + searchFilter + "))" );
 var filteredIdeas = $("li:contains(" + searchFilter + ")"
 );
 filteredIdeas.show();
 uncorrectFilteredIdeas.hide();
});
