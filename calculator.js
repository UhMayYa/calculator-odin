const numberCheck = "0123456789";
const operatorCheck = "+-/*";

let numberArray = [];
let operatorArray = [];

let numberFormed = "";
let calculatedResult = "";

let displayVar = document.querySelector("#display-screen");
displayVar.textContent = "";

let buttonsSelector = document.querySelectorAll("#calc-buttons button");

for(buttonId in buttonsSelector)
{
    if(numberCheck.includes((buttonsSelector[buttonId].id)))
    {
        let charIndex = numberCheck.indexOf(buttonsSelector[buttonId].id);
        let charToBeUsed = numberCheck[charIndex];
        buttonsSelector[buttonId].addEventListener('click',() =>{
            if(calculatedResult === '')
            {
            numberFormed += charToBeUsed;
            displayVar.textContent += charToBeUsed;
            }
            else
            {
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
    else if(operatorCheck.includes((buttonsSelector[buttonId].id)))
    {
        let operatorIndex = operatorCheck.indexOf(buttonsSelector[buttonId].id);
        let operatorToBeUsed = operatorCheck[operatorIndex];
        buttonsSelector[buttonId].addEventListener('click',() =>{
            if(numberFormed === "" && numberArray.length === 0)
            {
                console.log("Not inputing operator");
            }
            else
            {
            if(numberFormed === "")
            {
                let oldText = displayVar.textContent.slice(0,-1);
                operatorArray.pop();
                displayVar.textContent = oldText;
            }
            else
            {
            numberArray.push(numberFormed);
            numberFormed = "";
            }
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
    else if(buttonsSelector[buttonId].id === 'clear')
    {
        buttonsSelector[buttonId].addEventListener('click', () =>{
            displayVar.textContent = "";
            numberArray = [];
            operatorArray = [];
            calculatedResult = [];
            numberFormed = "";
        });
    }
    else if(buttonsSelector[buttonId].id === '=')
    {
        buttonsSelector[buttonId].addEventListener('click',() =>{
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

function operate(num1, num2, operand)
{
    convertedNum1 = Number(num1);
    convertedNum2 = Number(num2);
    switch(operand)
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
        default:
            console.log(`Received following as input for operand ${operand}`);
    }
}