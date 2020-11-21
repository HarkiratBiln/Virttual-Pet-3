class Food {
    constructor() {
        this.foodStock = 0;
        this.lastFed;
        this.image = loadImage("images/Milk.png");
    }


    updateFoodStock(foodStock){
        this.foodStock = foodStock;
    }

    getFedTime(lastFed) {
        this.lastFed = lastFed;
    }

    deductFood() {
        if(this.foodStock > 0){
        this.foodStock = this.foodStock-1;
        }
    }

    getFoodStock() {
        return this.foodStock;
    }


    display() {
        background(46,139,87);

        fill(255,255,254);
        if(lastFed >= 12) {
            text("Last Fed :" + lastFed%12 + " PM",100,150);
        }else if(lastFed ===0){
            text("Last Fed is at 12 Noon",100,150);
        }else {
            text("last Fed : "+ lastFed + " AM",100,150);
        }

         
        var x = 80, y = 100;

        imageMode(CENTER);
        //this.image(this.image,720,220,70,70);

        if(this.foodStock !== 0) {
            for(var i = 0; i < this.foodStock; i++) {
                if(i % 10 === 0) {
                    x = 80;
                    y = y+50;
                }

                this.image(this.image,x,y,50,50);
                x = x+30;
            }
        }
    }


    bedroom(){
        background(bedroomIMG,550,500);  
    }
      
    garden(){
        background(gardenIMG,550,500);  
    } 

    washroom(){
        background(washroomIMG,550,500); 
    }

}