let jsonData = [];

window.onload = () => {
    loadData();
}

const loadData = () => {
    fetch('/info').then(response=>response.json()).then(x=>{
        jsonData = x.data;
        updateHTML();
   })
}


const updateHTML = () => {
    let listDataElement = document.getElementById("list-data")
    let listHTML = ""
    for(let element of jsonData) {
        listHTML += `<li>`
        listHTML += `<button onClick="toggleImportance('${element.term}')">${element.term}</button>`
        listHTML += `<span id="${element.term}" contenteditable="true" onblur="updateContent('${element.term}')">${element.description}</span> <a href="${element.url}">look here</a>`
        listHTML += `<meter max="3" value="${element.importance}"></meter>`
        listHTML += `</li>`
    }
    listDataElement.innerHTML = listHTML;
}

const updateContent = (term) => {
    for(let i=0; i<jsonData.length; i++) {
        if(jsonData[i].term == term) {
            jsonData[i].description = document.getElementById(term).innerHTML;
            callModAPI(jsonData[i])
            break;
        }
    }
    console.log(jsonData)
}

const callModAPI = (body) => {
    fetch("/mod", {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(response=>response.text()
    ).then(html=>console.log(html))
}
const toggleImportance = (term) => {
    console.log(term)
    for(let i=0; i<jsonData.length; i++) {
        if(jsonData[i].term == term) {
            jsonData[i].importance = jsonData[i].importance == 3 ? 0 : jsonData[i].importance+1;
            callModAPI(jsonData[i])
            break;
        }
    }
    updateHTML();
}