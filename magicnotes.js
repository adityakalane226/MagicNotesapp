console.log("Welcome to magic notes website")
//this is because for when the website get reload all the note get disapper to not to being disappear we written here showNotes() functions that when the website get relaod all will get appear
showNotes();
//taking the addBtn id from dom
let addBtn = document.getElementById('addBtn')
//firing the event listner when we will push button
addBtn.addEventListener('click', function (e) {
    //taking the addTxt id from dom
    let addTxt = document.getElementById('addTxt')
    //if the localStorage have already the value giving name to value
    let notes = localStorage.getItem('notes')
    //if the localstorage have nothing then it will save blank in the notesObj
    if (notes == null) {
        notesObj = [];
    }
    //if there is something present in the localstorage already then notes value will be store in notesObj
    else {
        notesObj = JSON.parse(notes)
    }
    //when we will type in textarea then it will get add into notesObj
    notesObj.push(addTxt.value)
    //then we will push the notesObj into localstorage by stringify
    localStorage.setItem('notes', JSON.stringify(notesObj))
    //this is important because when we type notes and add it to the localstorge then the note we type get remaining into the textarea to get rough the textarea we use this variable and give blank string
    addTxt.value = ""
    console.log(notesObj)

    //running second functions
    showNotes();
})
//function to show the notes from the local storage
//when the add notes button will push add the same time this function wil run 
function showNotes() {
    //taking the notes from the localstorage
    let notes = localStorage.getItem('notes')
    if (notes == null) {
        notesObj = []
    }
    else {
        notesObj = JSON.parse(notes)
    }
    //making here a blank string
    let html = ""
    //the string in the array notesObj for each string the function will run and that string will be display in the dom by html variable updatetation by this string will get inserted the dom by given html and css and the title will be also update for example(Note1,Note2) in the title and the string display in the element
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">Note${index + 1}</h5>
              <p class="card-text">${element}</p>
             <button id="${index}" onclick = "deleteNote(this.id)" class="btn btn-primary">Delete Notes</button>
            </div>
          </div>`

    });
    let notesElm = document.getElementById('notes')
    //length of that string is not equal to 0 then this cared will display
    if (notesObj.length != 0) {
notesElm.innerHTML = html;

    }
    //when we go first time on this page we see nothing  in your notes section for than we will print this string
    else{
        notesElm.innerHTML = `Nothing is there in you list Please add the notes`
    }

}

//to delete the notes
//if we want to take the button id after pushing the button we want to put {functionName}(this.id) to the function
function deleteNote(index) {
    // console.log("i am deleting",index)
    let notes = localStorage.getItem('notes')
    if (notes == null) {
        notesObj = []
    }
    else {
        notesObj = JSON.parse(notes)
    }

    notesObj.splice(index,1)
    //updatetation
    localStorage.setItem('notes',JSON.stringify(notesObj))
    showNotes();
}

//function for search button 
let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})