console.log("i am in library app");

class Book {
    constructor(name, author, type) {

        this.name = name;
        this.author = author;
        this.type = type;

    }
}
//to display constructor



//Add method to display prototype

// Add methods to display prototype

class Display {


showBooks(){

    let bookData = localStorage.getItem("books");
    let bookObj;
    if(bookData== null){
    
        bookObj =[];
    
    }
    else{
    
        bookObj= JSON.parse(bookData);

    }
        let uiString ="";

        bookObj.forEach(function(book,index){
    
            uiString +=  `
                <tr>
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.type}</td>
            <td><button type="button" class="btn btn-primary" id="${index}" onclick="deleteBooks(this.id)">Delete Book</button></td>
            
        </tr>`;
        });
        let tableBody = document.getElementById("tableBook");
        if(bookObj.length!=0){
            tableBody.innerHTML = uiString;   
        }       
        else{
            tableBody.innerHTML=`Nothing to show you ! add some books`;
        }
    }
//bookObj=JSON.parse(bookData);


    add(book) {

console.log("Adding too UI");
let bookData = localStorage.getItem("books");
let bookObj;
if(bookData== null){

    bookObj =[];

}
else{

    bookObj= JSON.parse(bookData);

}

bookObj.push(book);
localStorage.setItem("books",JSON.stringify(bookObj));
}

    clear() {
        let libraryForm = document.getElementById('libraryform');
        libraryForm.reset();
    }

    validation(book) {
        if (book.name.length < 2 || author.length < 2) {

            return false;
        }
        else {

            return true
        }

    }

    Messhow(type, message) {
        let messg = document.getElementById('messg');

        messg.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>${type}</strong> ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`;
    
          setTimeout(function() {
            messg.innerHTML = '';
        }, 2000);

        }
    }

   
let display = new Display();
// Add submit event listner to form
let libraryForm = document.getElementById('libraryform');

libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {

    console.log("you have just submited libray form");
    let name = document.getElementById('bookname').value;
    let author = document.getElementById('author').value;
    //get element form programing and science or love
    let programing = document.getElementById('programing');
    let science = document.getElementById('science');
    let love = document.getElementById('love');
    let type;
    if (programing.checked) {
        type = programing.value;
    }
    else if (science.checked) {

        type = science.value;
    }
    else if (love.checked) {

        type = love.value;
    }

    let book = new Book(name, author, type);
    //validation
    if (display.validation(book)) {
       display.add(book);
        display.clear();
        display.showBooks();
        display.Messhow('success', 'Your book is succsess fully added');
            
    }
    else {
        display.Messhow('Error', 'Sorry you cant add this book');
    }
    e.preventDefault();
}

function deleteBooks(index){
        let books = localStorage.getItem("books");
        let bookBj= JSON.parse(books);
        bookBj.splice(index,1);
        localStorage.setItem("books",JSON.stringify(bookBj));
        let display = new Display();
        display.showBooks();


}

let searchBooks = document.getElementById("searchBooks");
searchBooks.addEventListener("input",function(){
    let inputBook = searchBooks.value;
    let  bookCards = document.getElementById('tableBook')
    Array.from(bookCards).forEach(function(element){
        BooksCardTxt=element.getElementByTagName('tr')[0].innerText;
        if(BooksCardTxt.includes(inputBook)){
            element.styl.display = "block";

        }
        else{
            element.style.display = "none";
        }
    });

});


display.showBooks();

