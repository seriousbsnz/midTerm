interact('.draggable')
 .draggable(
 {
  // enable inertial throwing
  inertia: true,
  autoScroll: true,

  // call this function on every dragmove event
  onmove: dragMoveListener,
  // call this function on every dragend event
  onend: function(event)
  {
   var textEl = event.target.querySelector('p');

   textEl && (textEl.textContent =
    'moved a distance of ' +
    (Math.sqrt(event.dx * event.dx +
     event.dy * event.dy) | 0) + 'px');
  }
 });

function dragMoveListener(event)
{
 var target = event.target,
  // keep the dragged position in the data-x/data-y attributes
  x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
  y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

 // translate the element
 target.style.webkitTransform =
  target.style.transform =
  'translate(' + x + 'px, ' + y + 'px)';

 // update the posiion attributes
 target.setAttribute('data-x', x);
 target.setAttribute('data-y', y);
}

window.dragMoveListener = dragMoveListener;

interact('.resize-drag')
 .draggable(
 {
  onmove: window.dragMoveListener
 })
 .resizable(
 {
  preserveAspectRatio: true,
  edges:
  {
   left: true,
   right: true,
   bottom: true,
   top: true
  }
 })
 .on('resizemove', function(event)
 {
  var target = event.target,
   x = (parseFloat(target.getAttribute('data-x')) || 0),
   y = (parseFloat(target.getAttribute('data-y')) || 0);

  // update the element's style
  target.style.width = event.rect.width + 'px';
  target.style.height = event.rect.height + 'px';

  // translate when resizing from top or left edges
  x += event.deltaRect.left;
  y += event.deltaRect.top;

  target.style.webkitTransform = target.style.transform =
   'translate(' + x + 'px,' + y + 'px)';

  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
  target.textContent = Math.round(event.rect.width) + '×' + Math.round(event.rect.height);
 });


// Live image upload
$("input").change(function(e)
{
 for (var i = 0; i < e.originalEvent.srcElement.files.length; i++)
 {
  var file = e.originalEvent.srcElement.files[i];

  var img = document.createElement("img");
  var reader = new FileReader();
  reader.onloadend = function()
  {
   img.src = reader.result;
  }
  reader.readAsDataURL(file);
  $("input").after(img);
 }
});


// Number game
var randomNum = Math.floor(Math.random() * 101 + 1);
var start = document.querySelector('#start');
var hint = document.querySelector('#hint');
var userGuess = document.querySelector('#guess');
var submitGuess = document.querySelector('#submit');

// Event Listeners
start.addEventListener('click', listener1);
submitGuess.addEventListener('click', listener2);
submitGuess.addEventListener('click', listener3);

// Functions for events
function listener1()
 {
  console.log(randomNum);
}

function listener2()
 {
  return randomNum;
}

function listener3()
{
 if (userGuess.value > randomNum)
 {
  hint.value = "Lower";
 }
 else if (userGuess.value < randomNum)
 {
  hint.value = "higher";
 }
 else
 {
  hint.value = "You got it. The number was " + randomNum + " .";
 }
}