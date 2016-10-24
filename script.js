var titleInput = $('.title-input')
var bodyInput = $('.body-input')

function createIdea() {
  $('.render-idea').prepend(`<li class ='idea-box'>
        <div class='title-result'>${titleInput.val()}
        </div>
        <div class='body-result'>${bodyInput.val()}
        </div>
        <button class='delete-button'>delete
        </button>
        <button class='upvote'>Up</button>
        <button class='downvote'>Down</button>
        <div class='quality'>quality:<span>swill </span> </div>
  </li>`)
};

$('.save-button').on('click', function(){
  createIdea();
})
