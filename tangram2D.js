



let tangram2D = {
    winningDampenerCount: 0, 
    timeOut: 0,
    timeOutRunning: false,
    okButtonTriggered: false,


    clickOk : function(){
        tangram2D.okButtonTriggered = true;
      
    },

  
    timeOutFunction : function(){
        clearTimeout(this.timeOut); 
        this.timeOutRunning = false;   

        tangram2DLevel.nextSide();
        guiPaint.clear();
       
    },
    timeOutFunctionError : function(){
        clearTimeout(this.timeOut); 
        this.timeOutRunning = false;   

        tangram2DLevel.new();      
        guiPaint.clear();
       
    },
    init: function(){
        //console.log("guidedBuildLevel.init()");
        //guidedBuildLevel.init();
        world.unHideBlocks();
    },
    /*setLevel : function(level, difficulty){
        guidedBuildLevel.setLevel(level, difficulty);

    },*/
    clear : function(){
        algoBlock.clearLed(world.block);
    },
    render: function (){

        if(this.timeOutRunning){
            return;
        }

        let notInterSectBlocks = [];

        notInterSectBlocks = algoBlock.differenceAndIntersect(world.block, tangram2DLevel.getBlock());


        for(let i = 0; i < notInterSectBlocks[0].length ; i++ ){            
            notInterSectBlocks[0][i].ledALeft = globalWorldColor.red;
            notInterSectBlocks[0][i].ledALeftBlink = true;

            notInterSectBlocks[0][i].ledARight = globalWorldColor.red;
            notInterSectBlocks[0][i].ledARightBlink = true;

            notInterSectBlocks[0][i].ledBLeft = globalWorldColor.red;
            notInterSectBlocks[0][i].ledBLeftBlink = true;

            notInterSectBlocks[0][i].ledBRight = globalWorldColor.red;
            notInterSectBlocks[0][i].ledBRightBlink = true;
        }
        //needeed?
        /*
        for(let i = 0; i < notInterSectBlocks[2].length ; i++ ){            
            notInterSectBlocks[2][i].ledALeft = globalWorldColor.black;
            notInterSectBlocks[2][i].ledALeftBlink = false;

            notInterSectBlocks[2][i].ledARight = globalWorldColor.black;
            notInterSectBlocks[2][i].ledARightBlink = false;

            notInterSectBlocks[2][i].ledBLeft = globalWorldColor.black;
            notInterSectBlocks[2][i].ledBLeftBlink = false;

            notInterSectBlocks[2][i].ledBRight = globalWorldColor.black;
            notInterSectBlocks[2][i].ledBRightBlink = false;
        }*/

        game.addBlocks(notInterSectBlocks[1]);



        let sBlocks = tangram2DLevel.getBlock();
        for(let i = 0; i < notInterSectBlocks[2].length; i++){
           
            let sIndex = algoBlock.findBlockShape(notInterSectBlocks[2][i], sBlocks );
           // console.log("sIndex" + sIndex);
            //console.log("sBlocks[sIndex].ledALeft: " + sBlocks[sIndex].ledALeft);
            if(sIndex != null){
                notInterSectBlocks[2][i].ledALeft =  sBlocks[sIndex[0]].ledALeft ;
                notInterSectBlocks[2][i].ledARight = sBlocks[sIndex[0]].ledARight ;
                notInterSectBlocks[2][i].ledBLeft = sBlocks[sIndex[0]].ledBLeft ;
                notInterSectBlocks[2][i].ledBRight = sBlocks[sIndex[0]].ledBRight ;
            }

        }




        if(notInterSectBlocks[0].length == 0 && notInterSectBlocks[1].length == 0){
            
            guiPaint.show();

            if(tangram2DLevel.getSide() == 0){
                base.ledSetBack(0);
                base.ledSetLeft(globalWorldColor.yellow);
                base.ledSetFront(0);
                base.ledSetRight(0);
                //base.ledStartBlink(500);

                let diffAndIntsTmp = algoProjection.differenceAndIntersect(tangram2DLevel.getSideProjection(), guiPaint.createProjectionPixels(0, false), true);

                if(tangram2DLevel. needToClickButton()){
                    if(this.okButtonTriggered ){
                        this.okButtonTriggered = false;
                        if(diffAndIntsTmp[0].length == 0 && diffAndIntsTmp[1].length == 0){

                            this.timeOutRunning = true;
                            this.timeOut = setTimeout(function() {this.timeOutFunction();}.bind(this), 2000);   
                            //base.ledStopBlink();
                            base.ledSetLeft(globalWorldColor.green);
        
                           // tangram2DLevel.nextSide();
                            //guiPaint.clear();
                        }else{
                            base.ledSetBack(globalWorldColor.red);
                            base.ledSetLeft(globalWorldColor.red);
                            base.ledSetFront(globalWorldColor.red);
                            base.ledSetRight(globalWorldColor.red);
                            this.timeOutRunning = true;
                            this.timeOut = setTimeout(function() {this.timeOutFunctionError();}.bind(this), 2000);  

                        }


                    }
                }else if(diffAndIntsTmp[0].length == 0 && diffAndIntsTmp[1].length == 0){

                    this.timeOutRunning = true;
                    this.timeOut = setTimeout(function() {this.timeOutFunction();}.bind(this), 2000);   
                    //base.ledStopBlink();
                    base.ledSetLeft(globalWorldColor.green);

                   // tangram2DLevel.nextSide();
                    //guiPaint.clear();
                }


            }else if(tangram2DLevel.getSide() == 1){

                base.ledSetBack(0);
                base.ledSetLeft(0);
                base.ledSetFront(globalWorldColor.yellow);
                base.ledSetRight(0);
                //base.ledStartBlink(500);

                let diffAndIntsTmp = algoProjection.differenceAndIntersect(tangram2DLevel.getSideProjection(), guiPaint.createProjectionPixels(1, false), true);

                
                
                
                if(tangram2DLevel. needToClickButton()){
                    if(this.okButtonTriggered ){
                        this.okButtonTriggered = false;
                        if(diffAndIntsTmp[0].length == 0 && diffAndIntsTmp[1].length == 0){

                            this.timeOutRunning = true;
                            this.timeOut = setTimeout(function() {this.timeOutFunction();}.bind(this), 2000);   
                            //base.ledStopBlink();
                            base.ledSetFront(globalWorldColor.green);
        
                           // tangram2DLevel.nextSide();
                            //guiPaint.clear();
                        }else{
                            base.ledSetBack(globalWorldColor.red);
                            base.ledSetLeft(globalWorldColor.red);
                            base.ledSetFront(globalWorldColor.red);
                            base.ledSetRight(globalWorldColor.red);
                            this.timeOutRunning = true;
                            this.timeOut = setTimeout(function() {this.timeOutFunctionError();}.bind(this), 2000);  

                        }


                    }
                }else if(diffAndIntsTmp[0].length == 0 && diffAndIntsTmp[1].length == 0 ){
                    this.timeOutRunning = true;
                    this.timeOut = setTimeout(function() {this.timeOutFunction();}.bind(this), 2000); 
                   // base.ledStopBlink(); 
                    base.ledSetFront(globalWorldColor.green);
                }

                
            }else if(tangram2DLevel.getSide() == 2){

                base.ledSetBack(0);
                base.ledSetLeft(0);
                base.ledSetFront(0);
                base.ledSetRight(globalWorldColor.yellow);
                //base.ledStartBlink(500);


                let diffAndIntsTmp = algoProjection.differenceAndIntersect(tangram2DLevel.getSideProjection(), guiPaint.createProjectionPixels(0, true), true);

                if(tangram2DLevel. needToClickButton()){
                    if(this.okButtonTriggered ){
                        this.okButtonTriggered = false;
                        if(diffAndIntsTmp[0].length == 0 && diffAndIntsTmp[1].length == 0){

                            this.timeOutRunning = true;
                            this.timeOut = setTimeout(function() {this.timeOutFunction();}.bind(this), 2000);   
                            //base.ledStopBlink();
                            base.ledSetRight(globalWorldColor.green);
        
                           // tangram2DLevel.nextSide();
                            //guiPaint.clear();
                        }else{
                            base.ledSetBack(globalWorldColor.red);
                            base.ledSetLeft(globalWorldColor.red);
                            base.ledSetFront(globalWorldColor.red);
                            base.ledSetRight(globalWorldColor.red);
                            this.timeOutRunning = true;
                            this.timeOut = setTimeout(function() {this.timeOutFunctionError();}.bind(this), 2000);  

                        }


                    }
                }else if(diffAndIntsTmp[0].length == 0 && diffAndIntsTmp[1].length == 0 ){
                    this.timeOutRunning = true;
                    this.timeOut = setTimeout(function() {this.timeOutFunction();}.bind(this), 2000);  
                   // base.ledStopBlink();
                    base.ledSetRight(globalWorldColor.green);
                }

                
            }else if(tangram2DLevel.getSide() == 3){

                base.ledSetBack(globalWorldColor.yellow);
                base.ledSetLeft(0);
                base.ledSetFront(0);
                base.ledSetRight(0);
                //base.ledStartBlink(500);

                
                let diffAndIntsTmp = algoProjection.differenceAndIntersect(tangram2DLevel.getSideProjection(), guiPaint.createProjectionPixels(1, true), true);

                if(tangram2DLevel. needToClickButton()){
                    if(this.okButtonTriggered ){
                        this.okButtonTriggered = false;
                        if(diffAndIntsTmp[0].length == 0 && diffAndIntsTmp[1].length == 0){

                            this.timeOutRunning = true;
                            this.timeOut = setTimeout(function() {this.timeOutFunction();}.bind(this), 2000);   
                            //base.ledStopBlink();
                            base.ledSetBack(globalWorldColor.green);
        
                           // tangram2DLevel.nextSide();
                            //guiPaint.clear();
                        }else{
                            base.ledSetBack(globalWorldColor.red);
                            base.ledSetLeft(globalWorldColor.red);
                            base.ledSetFront(globalWorldColor.red);
                            base.ledSetRight(globalWorldColor.red);
                            this.timeOutRunning = true;
                            this.timeOut = setTimeout(function() {this.timeOutFunctionError();}.bind(this), 2000);  

                        }


                    }
                }else if(diffAndIntsTmp[0].length == 0 && diffAndIntsTmp[1].length == 0 ){
                    this.timeOutRunning = true;
                    this.timeOut = setTimeout(function() {this.timeOutFunction();}.bind(this), 2000);  
                   // base.ledStopBlink();
                    base.ledSetBack(globalWorldColor.green);
                    
                }

                
            }else if(tangram2DLevel.getSide() == 4){

                base.ledSetBack(0);
                base.ledSetLeft(globalWorldColor.yellow);
                base.ledSetFront(globalWorldColor.yellow);
                base.ledSetRight(globalWorldColor.yellow);
               // base.ledStartBlink(500);

                let diffAndIntsTmp = algoProjection.differenceAndIntersect(tangram2DLevel.getSideProjection(), guiPaint.createProjectionPixels(2, false), true);

                if(tangram2DLevel. needToClickButton()){
                    if(this.okButtonTriggered ){
                        this.okButtonTriggered = false;
                        if(diffAndIntsTmp[0].length == 0 && diffAndIntsTmp[1].length == 0){

                            this.timeOutRunning = true;
                            this.timeOut = setTimeout(function() {this.timeOutFunction();}.bind(this), 2000);   
                            //base.ledStopBlink();
                            base.ledSetLeft(globalWorldColor.green);
                            base.ledSetFront(globalWorldColor.green);
                            base.ledSetRight(globalWorldColor.green);
        
                           // tangram2DLevel.nextSide();
                            //guiPaint.clear();
                        }else{
                            base.ledSetBack(globalWorldColor.red);
                            base.ledSetLeft(globalWorldColor.red);
                            base.ledSetFront(globalWorldColor.red);
                            base.ledSetRight(globalWorldColor.red);
                            this.timeOutRunning = true;
                            this.timeOut = setTimeout(function() {this.timeOutFunctionError();}.bind(this), 2000);  

                        }


                    }
                }else if(diffAndIntsTmp[0].length == 0 && diffAndIntsTmp[1].length == 0 ){
                    this.timeOutRunning = true;
                    this.timeOut = setTimeout(function() {this.timeOutFunction();}.bind(this), 2000);  
                   // base.ledStopBlink();
                    base.ledSetLeft(globalWorldColor.green);
                base.ledSetFront(globalWorldColor.green);
                base.ledSetRight(globalWorldColor.green);

                

                activeGame.win(3000);
                }


                
            }
           /* if(this.winningDampenerCount < 4){
                this.winningDampenerCount++;
            }else if(this.winningDampenerCount == 4){
                this.winningDampenerCount++;                
                activeGame.win();
                
            }*/

        }else{
            guiPaint.hide();
            this.winningDampenerCount = 0;
        }

       

        


    }
};