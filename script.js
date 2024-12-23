//book obj constructor
function book(title = "", author = "", pages = 0, read = false){
    this.publicData = {
        "Title": title,
        "Author": author,
        "Pages": pages,
        "Read": read    
    }
    this.id = this.makeId();
}

//id generator called during init
book.prototype.makeId = function (){
    function getAlNum(string){
        let alNumArray = string.match(/[a-zA-Z0-9]+/g);
        return alNumArray === null
        ? ""
        : alNumArray.join('');
    }
    return "bk" + getAlNum(this.publicData["Title"]) + getAlNum(this.publicData["Author"]) + this.publicData["Pages"];
}

//creates HTML for book display
book.prototype.makeHTML = function (){
    let card = document.createElement("div");
    setAttributes(card,{'class':'bk-card', 'id':this.id});
    for(let key in this.publicData){
        let txt = document.createElement("p");
        txt.setAttribute("id", this.id+key);
        txt.textContent = key + ": " + this.publicData[key];        
        card.appendChild(txt);
    }

    //create del btn
    let delBtn = document.createElement("button");
    delBtn.setAttribute("id","bk-del-btn");
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", () => {
        let targetId = this.id;
        delete library[targetId];
        let doomedNode = document.querySelector('#' + targetId);
        doomedNode.remove();
    });
    //create read btn
    let readBtn = document.createElement("button");
    readBtn.setAttribute("id","bk-read-btn");
    readBtn.textContent = "Read?";
    readBtn.addEventListener("click", () => {
        let targetId = this.id;
        library[targetId].read = !library[targetId].read;
        let readStatus = document.querySelector("#" + targetId+"Read");
        readStatus.textContent = "Read: " + library[targetId].read;
    });
    card.appendChild(readBtn);
    card.appendChild(delBtn);
    const bkshelf = document.querySelector("#bkshelf");
    bkshelf.appendChild(card);
}


function addBook(title, author, pages, read){
    let bk = new book(title, author, pages, read);
    library[bk.id] = bk;
}

function setAttributes(element, attrs){
    for(let key in attrs){
        element.setAttribute(key, attrs[key]);
    }
}

function updateLibDisplay(){
    for(let bkId in library){
        if(document.querySelector("#" + bkId) === null){
            library[bkId].makeHTML();
        }
    }
}

let library = {}; //stores our books, yes i know as an object, I already spent the time making the ID generator so I better use the ID...
let addBtn = document.querySelector("#add-bk-btn");
let closeBtn = document.querySelector("#dialog-close");
let submitBtn = document.querySelector("#dialog-submit");
let themeBtn = document.querySelector("#theme-btn");
let dialog = document.querySelector("dialog");

addBtn.addEventListener("click", () => {dialog.showModal()});
closeBtn.addEventListener("click", () => {dialog.close()});
submitBtn.addEventListener("click", (e) =>{
    e.preventDefault();
    let bkInputs = Array.from(document.querySelectorAll("input"));
    bkInputs = bkInputs.map((field) => field.getAttribute("type") === "checkbox" ? field.checked :field.value); //get input values
    dialog.close();
    addBook(bkInputs[0], bkInputs[1], bkInputs[2], bkInputs[3]);
    updateLibDisplay();
});
themeBtn.addEventListener("click", ()=>{
    let root = document.querySelector(":root");
    root.classList.toggle("dark");
});



