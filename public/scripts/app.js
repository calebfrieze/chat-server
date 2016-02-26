$(function(){
  var chatName = "Anonymous";
  var socket = io.connect('http://localhost:3000');
  socket.on('chat', function(data){
    var convo = $('#chatbox').html();
    var newHTML = '<p>' + data.name + ': ' + data.message + '</p>'; 
    $('#chatbox').html(convo + newHTML);
  });
  window.addEventListener("beforeunload", function (e) {
    socket.close();
  });
  $('#chatsetname').on('submit', function(e){
    e.preventDefault();
    chatName = $('#chatname').val();
    $('#username').text(chatName);
    $('#splash').hide();
    $('#chat').show();
  });
  $('#chatsendform').on('submit', function(e){
    e.preventDefault();
    socket.emit('chat', { 
      name: chatName,
      message: $('#chatmessage').val()
    }, function(err){
      if(err){
        console.log("Error sending message: " + err);
      } else {
        $('#chatmessage').val('');
      }
    });
  });
});