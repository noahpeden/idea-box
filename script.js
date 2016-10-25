var $titleInput = $('.title-input')
var $bodyInput = $('.body-input')

function createIdea() {
  $('.render-idea').prepend(
    `<li class ='idea-box'>
        <h2 class='title-result'>${$titleInput.val()}</h2>
        <p class='body-result'>${$bodyInput.val()}</p>
        <p class='quality'>quality: swill</p>
        <button class='delete-button'>delete
        </button>
        <button class='upvote'>Up</button>
        <button class='downvote'>Down</button>
      </li>`);
};

$('.save-button').on('click', function(){
  createIdea();
  $titleInput.val('');
  $bodyInput.val('');
  $('.idea-box').uniqueId();
});

$('.render-idea').on('click', '.delete-button', function(){
  $(this).parent('li').remove();
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
