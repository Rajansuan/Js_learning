const hello = "abc";
console.log(hello);


//DRY - Do not repeat yourself rule is voilated here!!
function sqaure(num){
    return num*num;
}

function sumOfSqaures(num1,num2){
    let a = sqaure(num1);
    let b = sqaure(num2);
    return a+b;
}

console.log(sumOfSqaures(1,3));

//////////////////////////////////////////////////////////////

function sqaure(num){
    return num*num;
}

function cube(num){
    return num*num*num;
}

function sumOfSqaures(num1,num2,fnToCall){
    let a = fnToCall(num1);
    let b = fnToCall(num2);
    return a+b;
}

console.log(sumOfSqaures(1,3,cube));


//Anonymous function

function sumOfSqaures(num1,num2,fnToCall){
    let a = fnToCall(num1);
    let b = fnToCall(num2);
    return a+b;
}
//anonymously passed
console.log(sumOfSqaures(1,3,function (num){
    return num*num*num;
}
));