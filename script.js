const addButton = document.querySelector(".add-btn")
const form = document.querySelector("#form1");
const input = document.querySelector(".input--form")
const dataSection = document.querySelector(".data--section");
const editBtn = document.querySelector("#editBtn");
const deleteBtn = document.querySelector("#deleteBtn");

let editFlag = false;
let editEntryIndex = null;
let formData = [];
const openForm = () =>{
    form.style.visibility = "visible"
}
if(localStorage.getItem("data")){
    formData = JSON.parse(localStorage.getItem("data"));
}

// Add Data 
form.addEventListener("submit",(e)=>{
    e.preventDefault();

    if(editFlag == true && editEntryIndex < formData.length -1){
        formData.forEach((data,i) =>{
            if(i == editEntryIndex){
                formData[i].data = input.value;
            }
        })
        editFlag = false;
        editEntryIndex = null;
        saveInfo(formData);
        input.value="";
        showAllData();
    }
    else {
        let data = {"data" : input.value};
        console.log("data",data)
        formData.push(data);
        saveInfo(formData);
        input.value="";
        showAllData();
    }
    
})

// Save in LocalStorage
const saveInfo = (formData) =>{
    const dataStr = JSON.stringify(formData);
    localStorage.setItem("data",dataStr);
    console.log(localStorage.getItem("data"));
}

const showAllData = () =>{
    let temp = ``;
    formData.forEach((ele,i)=>{
        temp += `<p class="single-entry" >${ele.data} 
        <i id="icon editBtn" onclick="edit(${i})" class="fa-regular fa-pen-to-square" style="color: #B197FC;"></i>
        <i id="icon deleteBtn" onclick="deleteEntry(${i})" class="fa-solid fa-trash-can-arrow-up fa-rotate-by" style="color: #B197FC; --fa-rotate-angle: 15deg;""></i>
        </p>
        <br/>`
    })
    dataSection.innerHTML = temp;
}

const edit = (i) =>{
    let entry = formData[i].data;
    // console.log(entry)
    input.value = entry;
    input.focus();
    editFlag = true;
    console.log("I",i);
    editEntryIndex = i;
    console.log("edit")
}

const deleteEntry = (i) =>{
    // console.log("delete")
    formData = formData.filter((ele,index) => index !== i);
    saveInfo();
    showAllData();
}

const cancleForm = () =>{
    input.value = ""
}
