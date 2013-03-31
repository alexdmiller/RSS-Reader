$(document).ready(function() {
  $('.delete-button').click(function() {
    deletePost($(this).data('post-id'));
  });
});

function deletePost(id) {
  console.log('send delete ' + id);
  $.ajax({
    url: "/delete_post/" + id,
    type: "POST"
  });
}

