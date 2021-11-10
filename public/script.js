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
        listHTML += `<span>${element.description} <a href="${element.url}">look here</a></span>`
        listHTML += `<meter max="3" value="${element.importance}"></meter>`
        listHTML += `</li>`
    }
    listDataElement.innerHTML = listHTML;
}

const toggleImportance = (term) => {
    console.log(term)
    for(let i=0; i<jsonData.length; i++) {
        if(jsonData[i].term == term) {
            jsonData[i].importance = jsonData[i].importance == 3 ? 0 : jsonData[i].importance+1;
            break;
        }
    }
    updateHTML();
}