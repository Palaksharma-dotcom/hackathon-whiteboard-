const canvas=document.getElementById("canvas");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let context=canvas.getContext("2d");
let start_background_color="gray";
context.fillStyle=start_background_color;
context.fillRect(0,0,canvas.width,canvas.height);

let draw_color="black"; /*may change color of pen from here*/
let draw_width="2";
let is_drawing=false;
var a =0
var  b =0
let restore_array=[];
let index=-1;
// function change_color(element) {
//     draw_color=element.style.background;
//     // document.getElementsByClassName('color-picker').style.shadowbox=this.draw_color ;
//     // console.log(this) ;
// }
function rectanglle(){
    move("rectangle")
   }
   function circlee(){
       move("circle")
   }
   
   
   function rec(){
       
       var alpha=document.querySelector('.colorf1');
       if(alpha.classList.contains('hide'))
       {
           alpha.classList.remove('hide');
       }
       else{
           alpha.classList.add('hide');
       }
   
   
   }
   
   
   function cir(){
       
       var alpha=document.querySelector('.colorf2');
       if(alpha.classList.contains('hide'))
       {
           alpha.classList.remove('hide');
       }
       else{
           alpha.classList.add('hide');
       }
   
   
   }
   
var dragValue ;

function move(id){
    console.log(id);
  var element = document.getElementById(id);
  console.log(element)
  element.style.position = "absolute";
   element.onmousedown = function(){
       dragValue = element ;
   }

document.onmouseup = function(e){
dragValue = null;
}
document.onmousemove = function(e){
    var x = e.pageX;
    var y = e.pageY;

    dragValue.style.left = x + "px";
    dragValue.style.top = y + "px";

}
}




function change_backgroundcolor(element){
    console.log(element)
    // start_background_color=element.style.background;
    console.log(start_background_color);
    context.fillStyle=start_background_color;
    context.fillRect(0,0,canvas.width,canvas.height);
}

function change_color(element) {
    draw_color=element.style.background;
    draw_width="2";
}
function eraser(element) {
    // element.preventDefault();
    draw_color=start_background_color;
    draw_width= "58";
    // element.style.z-index = 5px;
}
canvas.addEventListener("touchstart",start,false);  /* for mobile and tablet versions */
canvas.addEventListener("touchmove" ,draw,false);  /* for mobile and tablet versions */
canvas.addEventListener("mousedown",start,false);   /* for computer and laptop versions */
canvas.addEventListener("mousemove" ,draw,false);   /* for computer and laptop versions */

canvas.addEventListener("touchend",stop,false); /*to stop pen outside the canvas*/
canvas.addEventListener("mouseup",stop,false);
canvas.addEventListener("mouseout",stop,false);


function start(event){
    is_drawing=true;
    context.beginPath();
    context.moveTo(event.clientX-canvas.offsetLeft,event.clientY-canvas.offsetTop);
    event.preventDefault();
}


function draw(event) {
    if(is_drawing){
        context.lineTo(event.clientX-canvas.offsetLeft,event.clientY-canvas.offsetTop);
        context.strokeStyle=draw_color;
        context.lineWidth=draw_width;
        context.lineCap="round";
        context.lineJoin="round";
        context.stroke();
    }
    
    event.preventDefault();
}



function  stop(event) {
    if(is_drawing){
        context.stroke();
        context.closePath();
        is_drawing=false;
    }
    

    if(event.type!='mouseout'){
    restore_array.push(context.getImageData(0,0,canvas.width,canvas.height));
    index+=1;
    }
    event.preventDefault();
}




function clear_canvas() {
    context.fillStyle=start_background_color;
    context.clearRect(0,0,canvas.width,canvas.height);
    context.fillRect(0,0,canvas.width,canvas.height);

    restore_array=[];
    index=-1;
}

function undo_last() {
    if(index<=0){
        clear_canvas();
    }else{
        index-=1;
        restore_array.pop();
        context.putImageData(restore_array[index],0,0);
    }
    
}
document.getElementById("open-popup-btn").addEventListener("click",function(){
    document.getElementsByClassName("popup")[0].classList.add("active");
  });
   
  document.getElementById("dismiss-popup-btn").addEventListener("click",function(){
    document.getElementsByClassName("popup")[0].classList.remove("active");
  });
  function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
 }
