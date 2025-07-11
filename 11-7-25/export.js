exports.a= function(){
    let a=10;
    let obj={
        name:"ABC",
        age:20
    }
    return a,obj;
}

exports.cc="Variable"

exports.b=function(){
    console.log("Function b")
}

// module.exports={a,b}

// two way for exporting use one at a time