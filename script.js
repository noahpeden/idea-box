$(document).ready(function (){
 for (var i=0; i<localStorage.length; i++){
   var idea = getIdea(localStorage.key(i));
   createIdea(idea);
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
 this.id = Date.now();
 this.quality = 'swill';
}

$('.save-button').on('click', function(){
 var title = $('.title-input').val();
 var body = $('.body-input').val();
 var idea = new Idea(title, body);
 createIdea(idea);
 storeIdea(idea.id, idea);
 $('.title-input').val('');
 $('.body-input').val('');
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
 var idea = getIdea(idNumber);
 idea.quality = newQuality;
 storeIdea(idNumber, idea);
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

$('.render-idea').on('focus', '.body-result, .title-result', function(){
 var idNumber = $(this).closest('li').attr('id');
 $(this).on('keypress', function(event){
   if(event.keyCode === 13){
     event.preventDefault();
     $(this).blur();
     return false;
   }
 })
 $(this).on('blur', function(){
   var idea = getIdea(idNumber);
   idea.title = $(this).closest('li').find('.title-result').text();
   idea.body = $(this).closest('li').find('.body-result').text();
   storeIdea(idNumber, idea);
 })
});

$('.save-button').on('click', function(){
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

$('.search').keyup(function() {
 event.preventDefault();
 var searchFilter = $(this).val().toLowerCase();
 var uncorrectFilteredIdeas = $( "li:not(:contains(" + searchFilter + "))" );
 var filteredIdeas = $("li:contains(" + searchFilter + ")");
 filteredIdeas.show();
 uncorrectFilteredIdeas.hide();
});

function storeIdea(key, object) {
   var string = JSON.stringify(object);
   localStorage.setItem(key, string);
}

function getIdea(key) {
  var string = localStorage.getItem(key);
  return JSON.parse(string);
}
