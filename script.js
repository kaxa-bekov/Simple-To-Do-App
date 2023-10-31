const descriptionInput = document.getElementById("description-input");
const deadlineInput = document.getElementById("deadline-input");
const addButton = document.getElementById("add");
const taskTable = document.getElementById("task-table");
const removeButton = document.getElementById("remove");
const taskTableBody = document.getElementById("task-table-body");
const checkAllCheckbox = document.getElementById('check-all');

let tableRowsCollection = null;


function updateRowsCollection(){
    tableRowsCollection = taskTableBody.rows;
    return tableRowsCollection;
}

addButton.addEventListener('click', () => {
    console.log("item added");


    if(descriptionInput.value === ""){
        alert('Enter Task!')
    }

    const newTableRow = document.createElement("tr");

    const checkboxData = document.createElement("td");
    const descriptionData = document.createElement("td");
    const deadlineData = document.createElement("td");


    const newCheckbox = document.createElement("input");
    newCheckbox.setAttribute("type", "checkbox");

    checkboxData.appendChild(newCheckbox);
    descriptionData.innerText = descriptionInput.value;
    deadlineData.innerText = deadlineInput.value;

    newTableRow.appendChild(checkboxData);
    newTableRow.appendChild(descriptionData);
    newTableRow.appendChild(deadlineData);
     
    taskTableBody.appendChild(newTableRow);

    descriptionInput.value = '';
    deadlineInput.value=null;
    descriptionInput.focus();
    
    updateRowsCollection();
    
})

removeButton.addEventListener('click', () =>{

    try{
            for(let i=tableRowsCollection.length-1;i>=0;i--){
            
                const tableRowCellsCollection = tableRowsCollection[i].cells;
                
                if(tableRowCellsCollection[0].querySelector('input[type="checkbox"]').checked){     
                    tableRowsCollection[i].remove();
                }
            }
    }catch(error){
        alert(`Add some tasks first!`);
    }finally{
        updateRowsCollection();
        checkAllCheckbox.checked = false;
    }
})

checkAllCheckbox.addEventListener('change', () =>{

try{
    rowsArray = Array.from(tableRowsCollection);

    if(rowsArray.length!==0){
    rowsArray.forEach(row =>{

        row.cells[0].querySelector('input[type="checkbox"]').checked = checkAllCheckbox.checked;

    })}else{
        alert('Nothing to select!');
        checkAllCheckbox.checked = false;
    }
    }catch(error){
        alert('Nothing to select!');
        checkAllCheckbox.checked = false;
    }
  console.log('check clicked');

})