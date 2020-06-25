//Define UI vars
const form = document.querySelector('#task-form');//#id   //为整个表单
const taskList = document.querySelector(".collection");//.class //ul
const clearBtn = document.querySelector(".clear-tasks");//clear //a tag
const filter = document.querySelector("#filter"); //filter tasks input
const taskInput = document.querySelector("#task");//task输入框的输入

//Load all event listeners
loadEventListeners();

//Load all event listeners
function loadEventListeners(){
  //DOM Load event //将存在localstorage的内容提出
  document.addEventListener('DOMContentLoaded',gettasks);
  //'DOMContentLoaded'在dom被加载后就会执行

  //Add task event
  form.addEventListener('submit',addtask);  //将submitevent加入form表单
  //Remove task event
  taskList.addEventListener('click',removetask); //对ul进行设定，继承到i
  //Clear task event
  clearBtn.addEventListener('click',cleartasks); //对clearbutton进行设定
  //Filter tasks event
  filter.addEventListener('keyup',filtertasks);
}

//Get tasks from LS
function gettasks(){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks=[];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task){  //遍历每一个task——string类型
      //Create li element
      const li = document.createElement('li');
      //Add class
      li.className='collection-item'; //存于collectionul中
      //Create text node and append to li
      li.appendChild(document.createTextNode(task));
      //Create new link element
      const link= document.createElement('a');
      //Add class
      link.className="delete-item secondary-content";//sc放在最右，在li中加入link （a tag）
      //Add icon html
      link.innerHTML='<i class="fa fa-remove"></i>';  //x型icon
      //Append the link to li
      li.appendChild(link);
      //Append li to ul
      taskList.appendChild(li);
  })
}

function addtask(e){            //定义submitevent
  if(taskInput.value ===''){
    alert('Add a task');
  }

  //Create li element
  const li = document.createElement('li');
  //Add class
  li.className='collection-item'; //存于collectionul中
  //Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  //Create new link element
  const link= document.createElement('a');
  //Add class
  link.className="delete-item secondary-content";//sc放在最右，在li中加入link （a tag）
  //Add icon html
  link.innerHTML='<i class="fa fa-remove"></i>';  //x型icon
  //Append the link to li
  li.appendChild(link);

  //Store in LS
  storeTaskInLocalStorage(taskInput.value); //把input的输入加入localstorage
  //Append li to ul
  taskList.appendChild(li);
  //clear input
  taskInput.value="";
  e.preventDefault();  //submit 需要防止跳转到href
}

//Store Task
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks=[];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks',JSON.stringify(tasks));
  //存在localstorage中；
}


//Remove task
function removetask(e){
  //为delgation 需要设定target——ul的i中
  if(e.target.parentElement.classList.contains('delete-item')){

    if(confirm('Are you sure?')){
    //要remove e的parent的parent
    e.target.parentElement.parentElement.remove();//即li标签

    //Remove from LS //接在删除操作后
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
  //e.preventDefault();
}

//Remove from LS
function removeTaskFromLocalStorage(taskItem){  //得到被删除的li
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks=[];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task,index){  //获取遍历时的index
    if(taskItem.textContent===task){  //找到要删除的task
      tasks.splice(index,1);  //在array中删除该元素
    } //bug——若有同名内容也会一并删除
  });
  localStorage.setItem('tasks',JSON.stringify(tasks)); //重新赋给tasks
}


//Clear tasks
function cleartasks(){
  //taskList.innerHTML=""; //清空ul内容

  //Faster
  while(taskList.firstChild){ //若有child
    taskList.removeChild(taskList.firstChild); //删除
  }

  //e.preventDefault();

  //Clear from LS
  claerTasksFromLocalStroage();
}

//Clear tasks from LS
function claerTasksFromLocalStroage(){
  localStorage.clear();
}


//Filter Tasks
function filtertasks(e){  //传入e 因为需要得到filtertasks的input内容
  const text= e.target.value.toLowerCase(); //得到value转为小写
 
  document.querySelectorAll('.collection-item').forEach((function(task){
    const item=task.firstChild.textContent; //得到每个标签的li的textnode
    if(item.toLowerCase().indexOf(text)!=-1){ //尝试匹配子字符串 失败返回-1
      task.style.display='block'; //显示
    }else{
      task.style.display='none'; //隐藏
    }

  }));
  //qsa返回一个nodelist，如果用getelebyclas返回htmlcellection，需要转为array
}