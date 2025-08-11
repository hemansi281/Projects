class Engine{
    start(){
        console.log('Engine started')
    }
}

class Car{
    constructor(engine){
        this.engine=engine;
    }
    drive(){
        this.engine.start();
        console.log('Car is driving')
    }
}

const engine = new Engine();
const car = new Car(engine)         //class injection
car.drive()
console.log(car.engine)