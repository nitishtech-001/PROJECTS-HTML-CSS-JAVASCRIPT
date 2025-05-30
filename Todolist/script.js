/* const list=document.querySelector('.check');
console.log(list);
const before=list.style.getPropertyValue('::before');

console.log(before);
// before.addEventListener('click',()=>{
//     before.backgroungImage= 'url("./assests/check.png")';
// });
list.addEventListener('click',()=>{
    before.backgroungImage= 'url("./assests/check.png")';
});
 */

const input = document.getElementById("input-box");
const list = document.getElementById("list-container");
console.log(list);

function addTask() {
  if(input.value === "") {
    alert("Please enter a task");
  } else {
    let li = document.createElement("li");
    li.textContent = input.value[0].toUpperCase()+input.value.slice(1);
    list.appendChild(li);
    input.value = "";
    let span=document.createElement("span");
    span.textContent="\u00D7";
    li.appendChild(span);
  }
  saveData();
}

list.addEventListener('click',(e)=>{
    if(e.target.tagName === 'LI'){
        e.target.classList.toggle('checked');
    }
    else if(e.target.tagName === 'SPAN'){
        e.target.parentElement.remove();
    }
    saveData();
},false);


function saveData(){
    localStorage.setItem('list',list.innerHTML);
}

function showTasks(){
    list.innerHTML=localStorage.getItem('list');
}
showTasks();
