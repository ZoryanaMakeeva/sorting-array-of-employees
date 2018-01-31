var employeesArray = getEmployees(askQuantity());
setSalary(employeesArray);
sortEmployees(employeesArray);
showEmployees(employeesArray);

function askQuantity() {
    var quantity = +prompt("Введите количество сотрудников");
    while (isNaN(quantity)) {
        quantity = +prompt("Введите количество сотрудников");
    }
    return quantity;
}

function getEmployees(quantity) {
    var employees = [];
    for (var i = 0; i < quantity; i++) {
        employees.push(getEmployee());
    }
    return employees;
}

function getEmployee() {
    return {
        name: prompt("Введите имя"),
        sName: prompt("Введите фамилию"),
        age: prompt("Введите возраст"),
        occupation: prompt("Введите должность"),
        show: function () {
            writeTableBody.call(this);
        }
    };
}

function showEmployees(employees) {
    writeTableHeader();
    for (var i = 0; i < employees.length; i++) {
        employees[i].show();
    }
    writeTableFooter();
}

function writeTableHeader() {
    document.write(
        "<table border='1'>" +
        "<tr>" +
        "<th>Имя</th>" +
        "<th>Фамилия</th>" +
        "<th>Возраст</th>" +
        "<th>Должность</th>" +
        "<th>Зарплата</th>" +
        "</tr>"
    );
}

function writeTableBody() {
    document.write(
        "<tr>" +
        "<td>" + this.name + "</td>" +
        "<td>" + this.sName + "</td>" +
        "<td>" + this.age + "</td>" +
        "<td>" + this.occupation + "</td>" +
        "<td>" + this.salary + "</td>" +
        "</tr>"
    );
}

function writeTableFooter() {
    document.write("</table>");
}

function setSalary(employees) {
    var salaryMap = {
        director: 3000,
        manager: 1500,
        programmer: 2000
    };
    for (var i = 0; i < employees.length; i++) {
        var occupation = employees[i].occupation;
        employees[i].salary = (occupation in salaryMap) ? salaryMap[occupation] : 1000;
    }
}

function sortEmployees(employees) {
    var numbersFields = [
        "age",
        "salary"
    ];
    var stringFields = [
        "name",
        "sName",
        "occupation"
    ];
    var parameter = prompt("Выберите параметр для сортировки: " + numbersFields.join(", ") + ", " + stringFields.join(", "));

    if (numbersFields.indexOf(parameter) !== -1) {
        return employees.sort(compareNumbers(parameter));
    } else if (stringFields.indexOf(parameter) !== -1) {
        return employees.sort(compareStrings(parameter));
    } else {
        alert("Вы не выбрали параметр.")
    }
}

function compareNumbers(parameter) {
    return function (a, b) {
        return a[parameter] - b[parameter];
    }
}

function compareStrings(parameter) {
    return function (a, b) {
        return (a[parameter] > b[parameter]) ? 1 : ((b[parameter] > a[parameter]) ? -1 : 0);
    }
}
