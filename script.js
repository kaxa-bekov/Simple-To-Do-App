// Getting all of the needed elements using DOM references

const descriptionInput = document.getElementById("description-input");
const deadlineInput = document.getElementById("deadline-input");
const addButton = document.getElementById("add");
const removeButton = document.getElementById("remove");
const taskTableBody = document.getElementById("task-table-body");
const checkAllCheckbox = document.getElementById('check-all');

//Preparing an empty variable for the table rows collection
let tableRowsCollection = null;

// This function creates a new collection of all the current rows of the table and returns it
function updateRowsCollection(){
    tableRowsCollection = taskTableBody.rows;
    return tableRowsCollection;
}

// Add Button Event Listener. It checks that the input value is not empty, then creates 3 new table datat elements adn initializes them based on the input and deadline values.
// Also adds a checkbox input on to the first cell of each row.
// Then it appends all of those table datas toa newly created table row element, which then gets appended to the table body element.
// After that we can reset the inputs and keep the input field focused and finally call the updateRowsCollection() function to create and return a list of rows.
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


// This button checks if we selected anything using the checkboxes in the first cell of each row, then iterates BACKWARDS on the rows collection and creates a cells collection on each row.
// THen checks if each rows, first cell's checkbox is checked it removes that entire row for the table body.
//Finally it resets all the checkboxes to unchecked and updates the rows collection
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


// The headesr first cell has a checkbox for selecting all of the table rows.
// It is implemented here by converting the rows collection into an array and itrerationg using forEach() function where we set the checkboxes to checked. 
// In case if there are no rows in the table we show an alert message and set the main checkbox to uncheched as well as if there is an error.
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