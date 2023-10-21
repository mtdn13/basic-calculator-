function init() {
    let outputField = "0";
    let outputDiv = document.querySelector(".calc-output");
    let resultExpression;
    let dotAllowed = true;

    function showInput(text) {
        if (text.length > 12) {
            outputDiv.classList.add("small-text");
        } else {
            outputDiv.classList.remove("small-text");
        }
        outputDiv.textContent = text;
    }
    function checkDot(value) {
        if (dotAllowed) {
            outputField += value;
            dotAllowed = false;
        }
    }
    function checkOperator(value) {
        if ("+-/*".includes(outputField[outputField.length - 1])) {
            outputField = outputField.slice(0, outputField.length - 1) + value;
        } else {
            outputField += value;
        }
        dotAllowed = true;
    }
    function addInput(value) {
        if (outputField === "0") {
            outputField = value;
        } else {
            outputField += value;
        }
    }
    function resetAll() {
        outputField = "0";
        showInput(outputField);
    }
    function removeLast() {
        if (outputField.length === 1) {
            outputField = "0";
        } else {
            outputField = outputField.slice(0, outputField.length - 1);
        }
        showInput(outputField);
    }
    function showError() {
        alert("You can't divide by 0");
        outputField = 0;
    }
    function calc(operator) {
        switch (operator) {
            case "*": {
                let b = resultExpression.match(/\d{0,}\.?\d+?\*\d{0,}\.?\d+?/i)[0];
                let c = b.split("*");
                let d = +c[0] * +c[1];
                d = d.toString().includes(".") ? d.toFixed(1) : d;
                resultExpression = resultExpression.replace(b, d);
                break;
            }
            case "/": {
                let b = resultExpression.match(/\d{0,}\.?\d+?\/\d{0,}\.?\d+?/i)[0];
                let c = b.split("/");
                let d = +c[0] / +c[1];
                d = d.toString().includes(".") ? d.toFixed(1) : d;
                if (d === Infinity) {
                    showError();
                    resultExpression = "0";
                } else {
                    resultExpression = resultExpression.replace(b, d);
                }
                break;
            }
            case "+": {
                let b = resultExpression.match(/^-?\d{0,}\.?\d+?\+\d{0,}\.?\d+?/i)[0];
                let c = b.split("+");
                let d = (+c[0] + +c[1]);
                resultExpression = resultExpression.replace(b, d);
                break;
            }
            case "-": {
                let b = resultExpression.match(/^-?\d{0,}\.?\d+?-\d{0,}\.?\d+?/i)[0];
                let c = b.split("-");
                let d = c.length === 3 ? (+c[0] - +c[1] - +c[2]) : (+c[0] - +c[1]);
                resultExpression = resultExpression.replace(b, d);
            }
        }
    }
    function calculateByTypeOfOperators(operator1, operator2) {
        while(true) {
            if (!resultExpression.includes(operator1) && !resultExpression.includes(operator2) || +resultExpression <= 0) {
                break;
            }
            if (resultExpression.indexOf(operator1) < resultExpression.indexOf(operator2)) {
                if (resultExpression.includes(operator1) && resultExpression.includes(operator2) && resultExpression.indexOf(operator1) !== 0) {
                    calc(operator1)
                } else {
                    calc(operator2);
                }
            } else if (resultExpression.indexOf(operator2) < resultExpression.indexOf(operator1)) {
                if (resultExpression.includes(operator2) && resultExpression.includes(operator1)) {
                    calc(operator2)
                } else {
                    calc(operator1)
                }
            }
        }
    }
    function calculateFinalResult() {
        calculateByTypeOfOperators("*", "/");
        calculateByTypeOfOperators("-", "+");
        return resultExpression;
    }

    function highlightCell(target) {
        target.classList.toggle("active")
    }

    document.querySelector(".calc-body").addEventListener("mousedown", (ev) => {
        highlightCell(ev.target);
    })
    document.querySelector(".calc-body").addEventListener("mouseup", (ev) => {
        highlightCell(ev.target);
    })

    document.querySelectorAll(".calc-operator").forEach(item => {
        item.addEventListener("click", function() {
            checkOperator(this.textContent);
            showInput(outputField);
        })
    })
    document.querySelectorAll(".calc-number").forEach(item => {
        item.addEventListener("click", function() {
            addInput(this.textContent);
            showInput(outputField);

        })
    })
    document.querySelector(".calc-dot").addEventListener("click", function() {
            checkDot(this.textContent);
            showInput(outputField);
    })
    document.querySelector(".calc-clear").addEventListener("click", resetAll);
    document.querySelector(".calc-clear-last").addEventListener("click", removeLast);
    document.querySelector(".calc-evaluate").addEventListener("click", function() {
        resultExpression = outputField;
        outputField = calculateFinalResult();
        showInput(outputField);
    });

    window.addEventListener("keyup", function (ev) {
        switch (ev.key) {
            case "*": {
                checkOperator("*");
                showInput(outputField);
                highlightCell(document.querySelector(".calc-multiply"));
                break;
            }
            case "+": {
                checkOperator("+");
                showInput(outputField);
                highlightCell(document.querySelector(".calc-add"));
                break;
            }
            case "-": {
                checkOperator("-");
                showInput(outputField);
                highlightCell(document.querySelector(".calc-subtract"));
                break;
            }
            case "/": {
                checkOperator("/");
                showInput(outputField);
                highlightCell(document.querySelector(".calc-divide"));
                break;
            }
            case ".": {
                checkDot(".")
                showInput(outputField);
                highlightCell(document.querySelector(".calc-dot"));
                break;
            }
            case "9": {
                addInput("9");
                showInput(outputField);
                highlightCell(document.querySelector(".nine"));
                break;
            }
            case "8": {
                addInput("8");
                showInput(outputField);
                highlightCell(document.querySelector(".eight"));
                break;
            }
            case "7": {
                addInput("7");
                showInput(outputField);
                highlightCell(document.querySelector(".seven"));
                break;
            }
            case "6": {
                addInput("6");
                showInput(outputField);
                highlightCell(document.querySelector(".six"));
                break;
            }
            case "5": {
                addInput("5");
                showInput(outputField);
                highlightCell(document.querySelector(".five"));
                break;
            }
            case "4": {
                addInput("4");
                showInput(outputField);
                highlightCell(document.querySelector(".four"));
                break;
            }
            case "3": {
                addInput("3");
                showInput(outputField);
                highlightCell(document.querySelector(".three"));
                break;
            }
            case "2": {
                addInput("2");
                showInput(outputField);
                highlightCell(document.querySelector(".two"));
                break;
            }
            case "1": {
                addInput("1");
                showInput(outputField);
                highlightCell(document.querySelector(".one"));
                break;
            }
            case "0": {
                addInput("0");
                showInput(outputField);
                highlightCell(document.querySelector(".zero"));
                break;
            }
            case "Enter": {
                resultExpression = outputField;
                outputField = calculateFinalResult();
                showInput(outputField);
                highlightCell(document.querySelector(".calc-evaluate"));
                break;
            }
            case "Backspace": {
                highlightCell(document.querySelector(".calc-clear-last"));
                removeLast();
                break;
            }
        }
    })

    window.addEventListener("keydown", function (ev) {
        switch (ev.key) {
            case "*": {
                highlightCell(document.querySelector(".calc-multiply"));
                break;
            }
            case "+": {
                highlightCell(document.querySelector(".calc-add"));
                break;
            }
            case "-": {
                highlightCell(document.querySelector(".calc-subtract"));
                break;
            }
            case "/": {
                highlightCell(document.querySelector(".calc-divide"));
                break;
            }
            case ".": {
                highlightCell(document.querySelector(".calc-dot"));
                break;
            }
            case "9": {
                highlightCell(document.querySelector(".nine"));
                break;
            }
            case "8": {
                highlightCell(document.querySelector(".eight"));
                break;
            }
            case "7": {
                highlightCell(document.querySelector(".seven"));
                break;
            }
            case "6": {
                highlightCell(document.querySelector(".six"));
                break;
            }
            case "5": {
                highlightCell(document.querySelector(".five"));
                break;
            }
            case "4": {
                highlightCell(document.querySelector(".four"));
                break;
            }
            case "3": {
                highlightCell(document.querySelector(".three"));
                break;
            }
            case "2": {
                highlightCell(document.querySelector(".two"));
                break;
            }
            case "1": {
                highlightCell(document.querySelector(".one"));
                break;
            }
            case "0": {
                highlightCell(document.querySelector(".zero"));
                break;
            }
            case "Enter": {
                highlightCell(document.querySelector(".calc-evaluate"));
                break;
            }
            case "Backspace": {
                highlightCell(document.querySelector(".calc-clear-last"));
                break;
            }
        }
    })
}

init();