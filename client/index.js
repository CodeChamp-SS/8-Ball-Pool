const globals = {
    isAudio: true,
    isGuideline : true,
}

const $m1 = document.getElementById('mode-1')
const $m2 = document.getElementById('mode-2')
const $m3 = document.getElementById('mode-3')

if($m1)
$m1.addEventListener('click', function(){
    location.assign('index8ballpool.html')
})

if($m2)
$m2.addEventListener('click', function(){
    location.assign('index9ballpool.html')
})

if($m3)
$m3.addEventListener('click', function(){
    location.assign('indexlowestball.html')
})

const $s2b = document.getElementById('setting-2-btn')
if($s2b)
$s2b.addEventListener('click', async function(e){
    globals.isAudio = !globals.isAudio
    e.target.innerHTML = globals.isAudio ? 'Audio On' : 'Audio Off';
    e.target.setAttribute('val', `${globals.isAudio}`)
    localStorage.setItem("isAudio", `${globals.isAudio}`);    
})


const $s1b = document.getElementById('setting-1-btn')
if($s1b)
$s1b.addEventListener('click', async function(e){
    globals.isGuideline = !globals.isGuideline;
    e.target.innerHTML = globals.isGuideline ? 'Guideline On' : 'Guideline Off';
    e.target.setAttribute('val', `${globals.isGuideline}`)
    localStorage.setItem("isGuideline", `${globals.isGuideline}`);    
})


const $s3b = document.getElementById('setting-3-btn')
if($s3b)
$s3b.addEventListener('click', function(){
    modal.style.display = "block";
})


var modal = document.getElementById("myModal");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
}