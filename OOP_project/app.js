//输入
document.addEventListener('DOMContentLoaded',displaybooks);
function getbooks(){
  let books;
  if(localStorage.getItem('books')==null) books=[];
  else books=JSON.parse(localStorage.getItem('books'));
  return books;
}
function displaybooks(){
  const books=getbooks();
  books.forEach(function(book){
    const ui=new UI();
    ui.addBookToList(book);
  })
}
function addbooks(book){
  const books=getbooks();
  books.push(book);
  localStorage.setItem('books',JSON.stringify(books));
}
function deletebooks(isbn){
  const books=getbooks();
  books.forEach(function(book,index){
    if(book.isbn===isbn) {
      books.splice(index,1);
    }
  })
  localStorage.setItem('books',JSON.stringify(books));
}



//Book Constructor
function Book(title,author,isbn){
  this.title = title;
  this.author = author;
  this.isbn=isbn;
}


//UI Constructor
function UI(){}

let timeout=null;
//Add Book to List
UI.prototype.addBookToList=function(book){
  const list = document.getElementById('book-list');
  //Create tr element
  const row = document.createElement('tr');
  //Insert cols
  row.innerHTML=`
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X<a></td>
  `;
  list.appendChild(row);
}

//Show alert
UI.prototype.showAlert= function(msg,className){
  
  //Create div
  const div=document.createElement('div');
  //Add className
  div.className=`alert ${className}`;
  //Add text
  div.appendChild(document.createTextNode(msg));
  //Get parent
  const container = document.querySelector('.container');
  //Get form
  const form = document.querySelector('#book-form');
  //Insert alert
  container.insertBefore(div,form);  //插入的parent.（插入的东西，插入的位置）
  clearTimeout(timeout);
  //Timeout after 3 sec
  timeout = setTimeout(function(){
    document.querySelector('.alert').remove()  //remove需要（）
  },3000);
}

//Delete book
UI.prototype.deleteBook=function(target){
    target.parentElement.parentElement.remove();
}


//Clear Fields
UI.prototype.clearFields=function(){
  document.getElementById('title').value="";
  document.getElementById('author').value="";
  document.getElementById('isbn').value="";
}

//Clear alert
UI.prototype.clearAlert=function(){
  while(document.getElementsByClassName('alert')[0]!=null){
    document.getElementsByClassName('alert')[0].remove();
  }
}

//Event Listeners for add book
document.getElementById('book-form').addEventListener('submit',function(e){ 
  //get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

  //Instantiating a book
  const book = new Book(title,author,isbn);
      
  //Instantiate UI
  const ui = new UI();
  
  //Clear alert
  ui.clearAlert();
  
  //Validate
  if(title==='' || author === '' ||isbn ===''){
    //Error alert   msg + class
    ui.showAlert('Please fill in all fields','error');
  } else{

  //Add book to list
  ui.addBookToList(book);
  addbooks(book);  //放在这儿才行//放在add里面就循环添加了；
  //Show success
  ui.showAlert('Book Added!','success');
  //Clear fields
  ui.clearFields();
  }
  e.preventDefault();
});


//Event Listener for delete
document.getElementById('book-list').addEventListener('click',function(e){
  const ui = new UI();
  deletebooks(e.target.parentElement.previousElementSibling.textContent);

  //Show message
  if(e.target.className==='delete'){
    ui.clearAlert();
    ui.deleteBook(e.target);
    ui.showAlert(`Book removed!`,`success`);
  }
  e.preventDefault();
});  //用parent


//加入local storage

