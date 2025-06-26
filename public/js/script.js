// Get the textarea element by its ID
//let textareaElement = document.getElementById("description");
let textareaElement = document.getElementById("ingredients");
// Get the value of the textarea
//let textareaValue = textareaElement.value;

addIngredientBtn.addEventListener('click', function() {
    //textContent = textareaElement.value.replace(/\r\n/g, '\n');
    let textareaValue = textareaElement.value;
    let splitArray = textareaValue.split('\n');
    //alert(splitArray);

    splitArray.forEach((item, index) => {
        //console.log('Line: ', ${index}, ${item} );
        //alert('Line: ', ${index}, ${item} );
        alert('Line (' + index + ') - \"' + item + '\"' );
    });
    //}
})

/** NEW **
//let addIngredientBtn = document.getElementById('.addIngredientBtn');

let textareaElement = document.getElementById("description");
let textContent = textareaElement.value;

addIngredientBtn.addEventListener('click', function() {
    alert('I am here 1');
    let textareaValue = textareaElement.value;
    alert('TextAreaValue: ', textareaValue);
    
    textContent = textareaElement.value.replace(/\r\n/g, '\n');
    let splitArray = textareaValue.split('\n');
    alert('Split Array: ', splitArray);

    alert('I am here 2');
    ingredientsArray.forEach(function(element) {
        alert(element);
    });

    alert('I am here 3');
}
** NEW **/

/**OLD *
let ingredientList = document.querySelector('.ingredientList');
let ingredientDiv = document.querySelectorAll('.ingredientDiv')[0];

// Get the textarea element by its ID
let textareaElement = document.getElementById("description");
// Get the value of the textarea
//let textareaValue = textareaElement.value;

addIngredientBtn.addEventListener('click', function() {
    //textContent = textareaElement.value.replace(/\r\n/g, '\n');
    let textareaValue = textareaElement.value;
    alert('I am here Z');
    alert(textareaValue);
    let splitArray = textareaValue.split('\n');
    alert(splitArray);

    alert('I am here A');
    //splitArray.forEach(function(element) {
        //console.log(element);
        //alert('Line: ', element );
    //}
    alert('I am here B');

    let newIngredient = ingredientDiv.cloneNode(true);

    // Get the value of the textarea
    alert(textareaValue);
    console.log(textareaValue);

    alert('I am here 1');
    let input = newIngredient.getElementsByTagname('input')[0];
    alert('I am here 2');
    input.value = '';
    alert('I am here 3');
    ingredientList.appendChild(newIngredient);
})
**OLD END **/