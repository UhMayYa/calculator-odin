//Declaring strings to segregate buttons based on whether it is a digit or an operator.
const numberCheck = "0123456789";
const operatorCheck = "+-/*";

//Arrays will be used to store digit and operator for calculation. Will also be used to check if there is any number or operator to pass to the operate() function.
let numberArray = [];
let operatorArray = [];

//numberFormed will store the number the user wants to input.
let numberFormed = "";
//calculatedResult stores the end result of the operate() function. Will also be used to set the display screen once result is calculated.
let calculatedResult = "";

let displayVar = document.querySelector("#display-screen");
displayVar.textContent = "";

let buttonsSelector = document.querySelectorAll("#calc-buttons button");

for(buttonId in buttonsSelector)
{
    //if the button is a digit, execute the following logic.
    if(numberCheck.includes((buttonsSelector[buttonId].id)))
    {
        let charIndex = numberCheck.indexOf(buttonsSelector[buttonId].id);
        let charToBeUsed = numberCheck[charIndex];
        buttonsSelector[buttonId].addEventListener('click',() =>{
            //If there is no calculated result from previous operations.
            if(calculatedResult === '')
            {
            numberFormed += charToBeUsed;
            displayVar.textContent += charToBeUsed;
            }
            else
            //Execute this logic if there is a previous calculated result.
            {
                //If we dont want to include the previous calculated result.
                if(operatorArray.length === 0)
                {
                displayVar.textContent = "";
                calculatedResult = "";
                }
                numberFormed += charToBeUsed;
                displayVar.textContent += charToBeUsed;
            }
        });
    }
    //if the button is an operator (+,-,*,/).
    else if(operatorCheck.includes((buttonsSelector[buttonId].id)))
    {
        let operatorIndex = operatorCheck.indexOf(buttonsSelector[buttonId].id);
        let operatorToBeUsed = operatorCheck[operatorIndex];
        buttonsSelector[buttonId].addEventListener('click',() =>{
            //Do not put an operator if there is no numbers currently present.
            if(numberFormed === "" && numberArray.length === 0)
            {
                console.log("Not inputing operator");
            }
            else
            {
            //If the user inputs an operator one after another instead of a number (For example: 6+-,8/*), replace the operator with the current operator.
            if(numberFormed === "")
            {
                let oldText = displayVar.textContent.slice(0,-1);
                //We remove the old operator from the operatorArray. The new operator will be included at the end of the function.
                operatorArray.pop();
                displayVar.textContent = oldText;
            }
            else
            {
            numberArray.push(numberFormed);
            numberFormed = "";
            }
            //If an operator is included when we already have two numbers and an operator, perform calculation. Include the operator after calculation.
            if(numberArray.length === 2 && operatorArray.length === 1)
            {
                operate(numberArray[0],numberArray[1],operatorArray[0]);
                numberArray = [];
                operatorArray = [];
                numberArray.push(calculatedResult);
            }
            operatorArray.push(operatorToBeUsed);
            displayVar.textContent += operatorToBeUsed;
            }
        });
    }
    //if the button is the clear button
    else if(buttonsSelector[buttonId].id === 'clear')
    {
        buttonsSelector[buttonId].addEventListener('click', () =>{
            //Clear all variables.
            displayVar.textContent = "";
            numberArray = [];
            operatorArray = [];
            calculatedResult = [];
            numberFormed = "";
        });
    }
    //if the button is the = button.
    else if(buttonsSelector[buttonId].id === '=')
    {
        buttonsSelector[buttonId].addEventListener('click',() =>{
            //If a number hasnt been entered. Do not perform calculation.
            if(numberFormed === "")
            {
                alert("Cannot proceed with calculation. Operand is missing");
            }
            else
            {
            numberArray.push(numberFormed);
            numberFormed = "";
            console.log(numberArray);
            console.log(operatorArray);
            //Only perform calculation when the required amount of numbers and operators have been met.
            if(numberArray.length === 2 && operatorArray.length === 1)
            {
            operate(numberArray[0],numberArray[1],operatorArray[0]);
            numberArray = [];
            operatorArray = [];
            numberFormed = calculatedResult;
            }
            }
        });
    }
}
//Function to calculate 2 numbers.
function operate(num1, num2, calcOperator)
{
    //Convert the string input from user to numbers.
    convertedNum1 = Number(num1);
    convertedNum2 = Number(num2);

    //Execute case based on the operator. Round the result in case the result has too many digits after the decimal point.
    switch(calcOperator)
    {
        case "+":
            calculatedResult = convertedNum1 + convertedNum2;
            calculatedResult = Math.round(calculatedResult * 1000) / 1000;
            displayVar.textContent = calculatedResult;
            break;
        case "-":
            calculatedResult = convertedNum1 - convertedNum2;
            calculatedResult = Math.round(calculatedResult * 1000) / 1000;
            displayVar.textContent = calculatedResult;
            break;
        case "/":
            if(convertedNum2 === 0)
            {
                alert("Cannot divide by 0");
                displayVar.textContent = "";
                calculatedResult = "";
                console.log(convertedNum2);
                return 0;
            }
            calculatedResult = convertedNum1 / convertedNum2;
            calculatedResult = Math.round(calculatedResult * 1000) / 1000;
            displayVar.textContent = calculatedResult;
            break;
        case "*":
            calculatedResult = convertedNum1 * convertedNum2;
            calculatedResult = Math.round(calculatedResult * 1000) / 1000;
            displayVar.textContent = calculatedResult;
            break;
        //In case of an unexpected input entered, check the console to see what was taken as the operator.
        default:
            console.log(`Received following as input for operand ${calcOperator}`);
    }
}