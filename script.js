var $titleInput = $('.title-input')
var $bodyInput = $('.body-input')
var $quality = 'swill'

function createIdea() {
  $('.render-idea').prepend(`<li class ='idea-box'>
        <div class='title-result'>${$titleInput.val()}
        </div>
        <div class='body-result'>${$bodyInput.val()}
        </div>
        <button class='delete-button'>delete
        </button>
        <button class='upvote'>Up</button>
        <button class='downvote'>Down</button>
        <div>quality:<span>${$quality}</span> </div>
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



$('.upvote').on('click', function(){
  $('span').text('')
  // var $quality = 'swill';
  //   if ($quality === 'swill') {
  //       $quality = 'plausible';
  //     } else if ($quality === 'plausible') {
  //       $quality = 'genius';
  //     } else if ($quality === 'genius') {
  //       $quality = 'genius';
  //     }
});
//   we want it to go to plausible then genius, after genius disable upvote
// }
// //
// function(){
//   when we click downvote, it should modify from current quality to plausible or swill, after swill disable downvote
// }
