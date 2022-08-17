class Book{
    constructor(name, author, category)
    {
        this.name = name;
        this.author = author;
        this.category = category;
    }
}

class Display{
    addBook(book)
    {
        let books = localStorage.getItem("books")
        
        let bookObj;
        if (books==null)
        {
            bookObj = [];
        }
        else
        {
            bookObj = JSON.parse(books);
        }
        bookObj.push(book);
        localStorage.setItem("books", JSON.stringify(bookObj));
    }

    showBooks()
    {
        let books = localStorage.getItem("books")
        let bookObj;
        if (books==null)
        {
            bookObj = [];
        }
        else
        {
            bookObj = JSON.parse(books);
            let uiString = "";
            bookObj.forEach(function(book, index){
                uiString += `<tr>
                                <td>${book.name}</td>
                                <td>${book.author}</td>
                                <td>${book.category}</td>
                                <td><button type="button" class="btn btn-primary" id="${index}" onclick="deleteBook(this.id)">Delete Book</button></td>
                            </tr>`;
            }); 
            let tableBody = document.getElementById("tableBook");
            tableBody.innerHTML = uiString;
        }
        
        
    }
    clear()
    {
        let libraryForm = document.getElementById("libraryForm");
        libraryForm.reset();
    }
    validate(book)
    {
        if (book.name.length<2 || book.author.length<2 || book.category == undefined)
        {
            return false;
        }
        else
        {
            return true;
        }
    }
    show(type, boldText, msg)
    {
        let message = document.getElementById("message");
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
        <strong>${boldText}: </strong>${msg}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
        setTimeout(function() {
            message.innerHTML = "";
        }, 3000);
    }
    searchBook()
    {
        let searchTxt = document.getElementById("searchBook").value.toLowerCase();
        let books = localStorage.getItem("books")
        let bookObj;
        if (books==null)
        {
            bookObj = [];
        }
        else
        {
            let uiString = "";
            bookObj = JSON.parse(books);
            bookObj.forEach(function(book, index){
                if (book.name.toLowerCase().includes(searchTxt) || book.author.toLowerCase().includes(searchTxt) || book.category.toLowerCase().includes(searchTxt))
                {
                    uiString += `<tr>
                                <td>${book.name}</td>
                                <td>${book.author}</td>
                                <td>${book.category}</td>
                                <td><button type="button" class="btn btn-primary" id="${index}" onclick="deleteBook(this.id)">Delete Book</button></td>
                            </tr>`;
                }
            });
            let tableBody = document.getElementById("tableBody");
            tableBody.innerHTML = uiString;
        }

    }
}


let display = new Display();
display.showBooks();
let libraryForm = document.getElementById("libraryform");
libraryForm.addEventListener("submit", libraryFormSubmit);
let searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", display.searchBook);

function libraryFormSubmit(e)
{
    let name = document.getElementById("bookName").value;
    let author = document.getElementById("author").value;
    let science = document.getElementById("science");
    let social = document.getElementById("social");
    let spoken = document.getElementById("spoken");
    let programming = document.getElementById("programming");
    let others = document.getElementById("others");
    let category;
    if (science.checked)
    {
        category = science.value;
        console.log(category);
    }
    else if (social.checked)
    {
        category = social.value;
    }
    else if (spoken.checked)
    {
        category = spoken.value;
    }
    else if (programming.checked)
    {
        category = programming.value;
    }
    else if (others.checked)
    {
        category = others.value;
    }

    let book = new Book(name, author, category);
    if (display.validate(book))
    {
        display.addBook(book);
        display.clear();
        display.showBooks();
        display.show("success","Success", "Your book has been successfully added into the library");
    }
    else
    {
        display.show("danger","Error", "Invalid book input. Cannot add this book into the library")
    }
    e.preventDefault();
}

function deleteBook(index)
{
    let books = localStorage.getItem("books");
    let bookObj = JSON.parse(books);
    bookObj.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(bookObj));
    let display = new Display();
    display.showBooks();
}