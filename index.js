// Define a Promise- A promise is used to run asynchronous data.

// A Promise can be in one of three states:
// - Pending     | hasn't settled to a value yet
// - Fulfilled   | settled successfully  (calling resolve())
// - Rejected    | settled unsuccessfully (calling reject())

// A promise when successfull, will return the result to that promise.
// that returned result can then be used directly.
// or its result can be further modified with a series of .then() methods.

//example one- promise is inside a function, and its resolved data is accessed inside the function.

let allGood = true

function fetchSomeData() {
  // here the resolved/rejected promise is sent to the data variable.

  const data = new Promise((resolve, reject) => {
    //takes two arguments resolve and reject.
    if (!allGood) {
      reject("error fetching data!") //reject is called if the promise fails
    } else {
      resolve({  //resolve is called if the promise succeeds.
        id: 1,
        message: 'nice work!'
      })
    }
  })

  console.log(Promise.resolve(data))
  return Promise.resolve(data)  //returns the result of the data promise.
}

fetchSomeData().then(result => {
  // the resolved data object is then accessed.
  console.log(result)
  document.querySelector('#output').innerHTML = result.id + ' ' + result.message
}).catch(error => {
  console.error('catch:', error) // this is called if the promise is rejected.
})

// Let's create several functions that return Promises and look at Promise chaining

// Simulate fetching some data
let fetchData = function() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('Fetching Data Complete')
      resolve({id: 2, message: 'Nice work'})
    }, 2000)
  })
}

// Parse the data from fetchData, then use the data to do something.
let parseData = function(data) {
  return new Promise(resolve => {
    setTimeout(() => {
      let parsedOutput = `Parsed the data for id: ${data.id} with message: ${data.message}`
      resolve({ parsed: parsedOutput })
      console.log(parsedOutput)
    }, 2000)
  })
}

// Chaining the Promises!
fetchData()
.then(parseData)
.then(result => {
  console.log(result) 
})
.catch(error => {
  console.error(error)
})

// Let's try using promise.all method
// promise.all() takes an array of promise as an argument and returns a single promise.
// the returned promise will resolve when all of the array promises have been resolved.

// suppose we have two functions with promises.
let getNumbers = new Promise(resolve => {
  setTimeout(() => {
    resolve([1, 2, 3, 4, 5])
  }, 2000)
})

let getLetters = new Promise(resolve => {
  setTimeout(() => {
    resolve('A, B, C, D, E')
  }, 5000)
})

Promise.all([getNumbers, getLetters]).then(result => {
  console.log(result)
})

// Now we try the same process using async await javascript.

const displayData = async () => {
  const data = await fetchData()
  let parsedOutput =
  `Parsed the data from async await: id: ${data.id} with message: ${data.message}`
  document.querySelector('.output').innerHTML = parsedOutput
}

displayData()
