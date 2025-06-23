const numberCheck = "0123456789";
const operatorCheck = "+-/*";

let numberArray = [];
let operatorArray = [];

let numberFormed = "";

let displayVar = document.querySelector("#display-screen");
displayVar.textContent = "";

let buttonsSelector = document.querySelectorAll("#calc-buttons button");
console.log(buttonsSelector);
console.log(buttonsSelector[15]);
for(buttonId in buttonsSelector)
{
    if(numberCheck.includes((buttonsSelector[buttonId].id)))
    {
        let charIndex = numberCheck.indexOf(buttonsSelector[buttonId].id);
        let charToBeUsed = numberCheck[charIndex];
        buttonsSelector[buttonId].addEventListener('click',() =>{
            numberFormed += charToBeUsed;
            displayVar.textContent += charToBeUsed;
        });
    }
    else if(operatorCheck.includes((buttonsSelector[buttonId].id)))
    {
        let operatorIndex = operatorCheck.indexOf(buttonsSelector[buttonId].id);
        let operatorToBeUsed = operatorCheck[operatorIndex];
        buttonsSelector[buttonId].addEventListener('click',() =>{
            numberArray.push(numberFormed);
            numberFormed = "";
            operatorArray.push(operatorToBeUsed);
            displayVar.textContent += operatorToBeUsed;
        });
    }
    else if(buttonsSelector[buttonId].id === 'clear')
    {
        buttonsSelector[buttonId].addEventListener('click', () =>{
            displayVar.textContent = "";
        });
    }
    else if(buttonsSelector[buttonId].id === '=')
    {
        buttonsSelector[buttonId].addEventListener('click',() =>{
            numberArray.push(numberFormed);
            numberFormed = "";
            operate(numberArray[0],numberArray[1],operatorArray[0]);
            numberArray = [];
            operatorArray = [];
        });
    }
    else{
        console.log(buttonsSelector[buttonId]);
    }
}

function operate(num1, num2, operand)
{
    convertedNum1 = Number(num1);
    convertedNum2 = Number(num2);
    let res = 0;
    switch(operand)
    {
        case "+":
            res = convertedNum1 + convertedNum2;
            displayVar.textContent = res;
            break;
        case "-":
            res = convertedNum1 - convertedNum2;
            displayVar.textContent = res;
            break;
        case "/":
            res = convertedNum1 / convertedNum2;
            displayVar.textContent = res;
            break;
        case "*":
            res = convertedNum1 * convertedNum2;
            displayVar.textContent = res;
            break;
        default:
            console.log(`Received following as input for operand ${operand}`);
    }
}