class Book{
  constructor(title,author,isbn){
    this.title=title;
    this.author=author;
    this.isbn=isbn;
  }
}
let timeout=null; //设为全局变量
class UI{
  addBookToList(book){
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
  showAlert(message,className){
      //Create div
      const div=document.createElement('div');
      //Add className
      div.className=`alert ${className}`;
      //Add text
      div.appendChild(document.createTextNode(message));
      //Get parent
      const container = document.querySelector('.container');
      //Get form
      const form = document.querySelector('#book-form');
      //Insert alert
      container.insertBefore(div,form);  //插入的parent.（插入的东西，插入的位置）
      //Timeout after 3 sec
      timeout = setTimeout(function(){
        if(document.querySelector('.alert')!=null)
        document.querySelector('.alert').remove()  //remove需要（）
      },3000);
  }
  deleteBook(target){
    target.parentElement.parentElement.remove();
  }
  clearFields(){
    document.getElementById('title').value="";
    document.getElementById('author').value="";
    document.getElementById('isbn').value="";
  }
  clearAlert(){
    while(document.querySelector('.alert')!=null)
    document.querySelector('.alert').remove();
  }
}

//Local storage Class
class Store{
  static getBooks(){ //从LS中得到
    let books;
    if(localStorage.getItem('books')===null)books = [];
    else books = JSON.parse(localStorage.getItem('books'));
    return books;
  }
  static displayBooks(){
    const books=Store.getBooks();

    books.forEach(function(book){
      const ui = new UI();
      //Add book to ui
      console.log(ui);
      ui.addBookToList(book);
    })
  }
  static addBook(book){
    const books = Store.getBooks(); //static methods
    books.push(book);
    localStorage.setItem('books',JSON.stringify(books));
  }
  static removeBook(isbn){
    const books = Store.getBooks(); //static methods
    books.forEach(function(book,index){
      if(book.isbn==isbn){
        books.splice(index,1);
      }
    });
    localStorage.setItem('books',JSON.stringify(books));
  }
}

//Dom load event
document.addEventListener('DOMContentLoaded',Store.displayBooks);

document.getElementById('book-form').addEventListener('submit',function(e){ 
  //get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

  //Instantiating a book
  const book = new Book(title,author,isbn);
      
  //Instantiate UI
  const ui = new UI();
  clearTimeout(timeout);
  //Clear alert
  ui.clearAlert();
  
  //Validate
  if(title==='' || author === '' ||isbn ===''){
    //Error alert   msg + class
    ui.showAlert('Please fill in all fields','error');
  } else{

  //Add book to list
  ui.addBookToList(book);
  //Add to local storage
  Store.addBook(book);

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
  

  //Show message
  if(e.target.className==='delete'){
    ui.clearAlert();
    ui.deleteBook(e.target);
    //Remove from LS
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    ui.showAlert(`Book removed!`,`success`);
  }
  e.preventDefault();
});  //用parent