//part 1:
function cookRice(){
  console.log("Rice starting...")
  for (let i=0;i<1e9;i++){

  }
console.log("Rice done!")
}

function cookRiceAsync(){
  console.log("Rice starting...")
  setTimeout(()=>{console.log("Rice done!")},1000)
}

//cookRice blocks the main thread and so it has to finish
//before we can move on to the next line and execute it
cookRice()
console.log("Am Farouk yells at the next customer")
//cookRiceAsync doesn't blocks the main thread and so we
//can keep executing the rest of the code until it finishes
cookRiceAsync()
console.log("Am Farouk yells at the next customer")



//part 2:
function orderRice(callback){
  console.log("Calling the rice supplier...")
  setTimeout(()=>{callback("Rice delivered!")},1000)
}

orderRice((message) => {
  console.log(message);
});
console.log("Am Farouk keeps serving customers while waiting");



//part 3:
const koshariOrder=new Promise((resolve,reject)=>{
  setTimeout(()=>{resolve("Order ready! 🍝")},2000)
})

koshariOrder
  .then((val)=>{console.log(val)})
  .catch((err)=>{console.log(`error: ${err}`)})

const sauceOrder=new Promise((resolve,reject)=>{
  reject("We're out of da2a!")
})

sauceOrder
  .then((val)=>{console.log(val)})
  .catch((err)=>{console.log(`error: ${err}`)})



//part 4:
function getRice(){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{resolve("Rice ready")},1000)
  })
}

function getChickpeas(rice){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{resolve("Chickpeas ready, rice was: " + rice)},1000)
  })
}

function getSauce(chickpeas){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{resolve("Sauce added, previous: " + chickpeas)},1000)
  })
}

getRice()
  .then(rice=>getChickpeas(rice))
  .then(chickpeas=>getSauce(chickpeas))
  .then(order=>{console.log(order)})
  .catch(err=>{console.log(`error: ${err}`)})



//part 5:
async function makeKoshari() {
  try {
    const rice = await getRice();
    const chickpeas = await getChickpeas(rice);
    const order = await getSauce(chickpeas);
    console.log(order);
  } catch (err) {
    console.log(`error: ${err}`);
  }
}
