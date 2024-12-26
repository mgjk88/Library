//book class
class book {
    constructor(title = '', author = '', pages = 0, read = false, lib){
        this.publicData = {
            "Title": title,
            "Author": author,
            "Pages": pages,
            "Read": read           
        }
        this.id = this.makeId();
        this.lib = lib;
    }

    makeId(){
        function getAlNum(string){
            let alNumArray = string.match(/[a-zA-Z0-9]+/g);
            return alNumArray === null
            ? ""
            : alNumArray.join('');
        }
        return "bk" + getAlNum(this.publicData["Title"]) + getAlNum(this.publicData["Author"]) + this.publicData["Pages"];
    }

    makeHTML(){
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
            delete lib.store[targetId];
            let doomedNode = document.querySelector('#' + targetId);
            doomedNode.remove();
        });
        
        //create read btn
        let readBtn = document.createElement("button");
        readBtn.setAttribute("id","bk-read-btn");
        readBtn.textContent = "Read?";
        readBtn.addEventListener("click", () => {
            let targetId = this.id;
            lib.store[targetId].read = !lib.store[targetId].read;
            let readStatus = document.querySelector("#" + targetId+"Read");
            readStatus.textContent = "Read: " + lib.store[targetId].read;
        });
        card.appendChild(readBtn);
        card.appendChild(delBtn);
        const bkshelf = document.querySelector("#bkshelf");
        bkshelf.appendChild(card);
    }
}

//library class
class library {
    store = {};
    constructor(...books){
        for(let book of books){
            this.store[book.id] = book;
        }
    }

    addBook(title, author, pages, read){
        let bk = new book(title, author, pages, read, this);
        this.store[bk.id] = bk;
    }

    updateDisplay(){
        for(let bkId in this.store){
            if(document.querySelector("#" + bkId) === null){
                this.store[bkId].makeHTML();
            }
        }
    }
}

function setAttributes(element, attrs){
    for(let key in attrs){
        element.setAttribute(key, attrs[key]);
    }
}

let lib = new library();
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
    lib.addBook(bkInputs[0], bkInputs[1], bkInputs[2], bkInputs[3]);
    lib.updateDisplay();
});
themeBtn.addEventListener("click", ()=>{
    let root = document.querySelector(":root");
    root.classList.toggle("dark");
});



