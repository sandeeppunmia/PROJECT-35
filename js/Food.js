class Food{
    constructor(){
      //var foodStock,lastFed,foodObj;
      this.image = loadImage("images/Milk.png");
      
    }

    display(){
        var x=80,y=200;
        imageMode(CENTER);
        //image(this.image,320,120,50,50);    

        if(this.foodStock!=0){
            for(var i=1;i<=foodS;i++){
                if(i%10==0){
                    x=80;
                    y = y+50;
                }
                image(this.image,x,y,50,50);
                x=x+30;
            }
           
                  
        }
        
    }
 }

