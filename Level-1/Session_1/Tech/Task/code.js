/*
This is a pizza delivery simulator.
It has some random operations and
useless functions.
I am using this to practice JavaScript's
syntax
*/
//task 1
let studentName =
"Islam";
const pizzaFlavor = "pepperoni";
//task 2
let hungerLevel = 10;
let isPizzaHot = true;
let deliveryAddress = "Elkanater Elkhairia";
console.log(typeof hungerLevel);
console.log(typeof isPizzaHot);
console.log(typeof deliveryAddress);
// task 3
let orderTotal= "85";
let convertedTotal=Number(orderTotal);
let tip= 15;
let bonus=true;
let
finalAmount=convertedTotal+tip+bonus;
console.log(finalAmount);
//task 4
let totalBill=convertedTotal+tip;
let minutesWaiting = 45+15;
console.log(totalBill);
console.log(minutesWaiting);
if (minutesWaiting % 2 === 0) {
console.log("Waiting time is even");
} else {
console.log("Waiting time is odd");
}
//task 5
console.log(2 + 3 * 4 - 1); // my guess is
13
console.log((2 + 3) * (4 - 1)); // I think it is 15
//task 6
if (isPizzaHot && hungerLevel > 7) {
console.log("OPEN THE DOOR AND SPRINT");
} else if (hungerLevel >= 5 &&
hungerLevel <= 7) {
console.log("Walk, you have dignity");
} else {
console.log("Order sushi next time");
}
//task 7
console.log(hungerLevel > 5);
//This one is an expression it either is true or false
if (hungerLevel > 5) {
console.log("Still hungry!");
}//This is a statement. It runs the code inside the block if the expression is evaluated to true
//task 8
console.log(pizzaFlavor.toUpperCase());
console.log(pizzaFlavor.length);
console.log(pizzaFlavor.includes("pepper"));
//task 9
console.log(
`${studentName} ordered a $
{pizzaFlavor} pizza. The total bill is $
{totalBill} pounds and the waiting time is
${minutesWaiting} minutes.
`
);
//task 10
let toppings = ["cheese"
,
"hot honey"
,
"mushrooms"];
let order = {
customer: studentName,
flavor: pizzaFlavor,
isDelivered: false
};
console.log(order);
//task 11
//Task 13's comment.
function calculateTotal(price, tip) {
    return price + tip;
}
const calculateTotalArrow = (price, tip) => {return price + tip;};
console.log(calculateTotal(85, 15));
console.log(calculateTotalArrow(85,
    15));
    //task 12
    let stops = ["Ahmed","Sara","Mona","Tarek"];
    for (let i = 0; i < stops.length; i++) {
        console.log(`Delivering to ${stops[i]}...`);
        if (stops[i] === "Ahmed") {
            break;
        }
        //After the pizza arrives
        order.isDelivered = true;
}