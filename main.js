import inquirer from "inquirer";
//API Link
const apiLink = "https://v6.exchangerate-api.com/v6/e5c6862d9878d73dae4bade2/latest/PKR";
//Fetch Api Data
let fetchData = async (data) => {
    let apiData = await fetch(data);
    let res = await apiData.json();
    return res.conversion_rates;
};
//Gather Fetch Data
let Data = await fetchData(apiLink);
let countries = Object.keys(Data);
let startQuiz = async (Data) => {
    let name = await inquirer.prompt({
        type: "list",
        name: "selectCountry",
        message: "Converting From",
        choices: countries
    });
    let convertingAmount = await inquirer.prompt({
        type: "number",
        name: "Amount",
        message: `Enter Amount in ${(name.selectCountry)}:`
    });
    let name2 = await inquirer.prompt({
        type: "list",
        name: "selectCountry",
        message: "Converting To",
        choices: countries
    });
    //Currency Pair API Link
    let conversionRate = `https://v6.exchangerate-api.com/v6/e5c6862d9878d73dae4bade2/pair/${name.selectCountry}/${name2.selectCountry}`;
    //Fetch Currency Pair
    let cnvData = async (data) => {
        let cnvapiData = await fetch(data);
        let res = await cnvapiData.json();
        return res.conversion_rate;
    };
    //Gather Fetch Data
    let conversion = await cnvData(conversionRate);
    let convertedRate = conversion * convertingAmount.Amount;
    console.log(`Your ${name.selectCountry} ${convertingAmount.Amount} in ${name2.selectCountry} is ${Math.floor(convertedRate)}`);
};
startQuiz(Data);
