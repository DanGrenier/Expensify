const promise = new Promise((resolve,reject) => {
    setTimeout(()=> { 
        //resolve({ name: 'Daniel', age: 26})},5000)
        reject('Somthing went wrong');},5000)
    

});

console.log('Before');

promise.then((data)=>{
console.log('1',data);}).catch((error) => {
    console.log('Error: ',error)
});

    

console.log('After');