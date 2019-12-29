const express = require('express');
const app = express();

/*
Every prime number can represented in form of 6n+1 or 6n-1 except 2 and 3, where n is natural number.
*/
const isPrime = (number)=>{
    if(number <=1) return false;
    if(number <=3) return true;
    if(number%2===0 || number%3===0) return false;
    for(let i = 5; i * i <= number;i = i +6 )
        if(number%i === 0 || number%(i + 2) === 0)
            return false;
    return true;
}

const getNumberofDigit = (number)=>{
    return Math.ceil(Math.log10(number));
}

const primalityTestFromLeft = (number)=>{
    while(number != 0){
        if(!isPrime(number))
            return false;
        number = number/10 | 0;
    }
    return true;
}

const primalityTestFromRight = (number)=>{
    let numberOfDigit = getNumberofDigit(number);
    while(number != 0){
        if(!isPrime(number))
            return false;
        numberOfDigit--;
        number = number % Math.pow(10,numberOfDigit);
    }
    return true;
}

app.get('/:number',(req,res)=>{
    let number = req.params.number;
    let isTwoSidedPrime = false;
    if(primalityTestFromLeft(number) && primalityTestFromRight(number))
        isTwoSidedPrime = true;   
    res.json(isTwoSidedPrime);
});

app.listen(3000,()=>{
    console.log("server started on port 3000");
})