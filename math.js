
//create pillars of blocks to make the block pixels for detecting how many pixels are activated


let math = {
    winningDampenerCount: 0, 
    //brushColor: 0,
    //gamePixels: [],
    //gameState: 0,
    numbers: [],
    waitingNumbersLoad: true,
    okButtonTriggered: false,

    //showMemorizeBlockIndex: 0,
    timeOutRunning: false,    
    timeOut: 0,
    timeOutFunction : function(){
        clearTimeout(this.timeOut); 
        this.timeOutRunning = false;   
        mathLevel.new(); 
    },
    init: function(){
        //console.log("guidedBuildLevel.init()");
        //guidedBuildLevel.init();
        world.unHideBlocks();
        
        //camera.arcRotateCamera.setPosition(new BABYLON.Vector3(15,15,15));

        
        //camera.arcRotateCamera.beta = 15;
        camera.arcRotateCamera.setTarget(new BABYLON.Vector3(4.5,3 ,4.5));
        camera.arcRotateCamera.radius = 25;
        camera.arcRotateCamera.beta = Math.PI/3;

        
        camera.setAlpha(cameraAlpha.front, true);
        
        camera.lock();
        console.log("init");


        numbers.loadInMeshes();


        
       
       


    },
    /*setLevel : function(level, difficulty){
        guidedBuildLevel.setLevel(level, difficulty);

    },*/
    clear : function(){
        algoBlock.clearLed(world.block);

        
        this.gameState = 0;
        
        clearTimeout(this.timeOut); 
        this.timeOutRunning = false;
        //this.showMemorizeBlockIndex = 0;
        this.winningDampenerCount = 0;

        //camera.arcRotateCamera.setPosition(new BABYLON.Vector3(15,15,15));
        //camera.arcRotateCamera.beta = 15;
        
        camera.arcRotateCamera.setTarget(new BABYLON.Vector3(4.5,3 ,4.5));
        camera.arcRotateCamera.radius = 25;
        camera.arcRotateCamera.beta = Math.PI/3;

        
        camera.setAlpha(cameraAlpha.front, true);
        
        camera.lock();
        console.log("clear");

       // base.ledClear();
        //base.ledSetLeft(globalWorldColor.red);
        //base.ledSetFront(globalWorldColor.green);
        //base.ledSetRight(globalWorldColor.blue);
      /*  this.okButtonTriggered = false
        if( mathLevel.needToClickButton()){
            guiGame.okButton.initCallBack(this.clickOk, buttonTrigger.up);
            guiGame.okButton.show();
        }else{
            guiGame.okButton.hide();
        }*/

     
    },
    clickOk : function(){
        math.okButtonTriggered = true;
      
    },

    render: function (){
       

        if(numbers.loading){
            return;
        }

        if(this.winningDampenerCount > 4){
            return;
        }

        if(this.waitingNumbersLoad){
            this.waitingNumbersLoad = false;

            this.numbers[0] = Object.create(numbers);
            this.numbers[1] = Object.create(numbers);
            this.numbers[2] = Object.create(numbers);
            this.numbers[3] = Object.create(numbers);
            this.numbers[4] = Object.create(numbers);


            this.numbers[0].z = 10;
            this.numbers[1].z = 7.5;
            this.numbers[2].z = 4.5;
            this.numbers[3].z = 1.5;
            this.numbers[4].z = -1;


            //this.numbers[0].showNumber(0);
            //this.numbers[1].showSymbol("+");
            this.numbers[2].showNumber(0);
            //this.numbers[3].showSymbol("=");
            //this.numbers[4].showNumber(0);
          


        }

        //get numbers

        let inputPixels = algoBlockPixel.create(world.block);

        let numberPixels =[] ;
        let currentNumbers = [];

        
        numberPixels[0] = algoBlockPixel.differenceAndIntersect(inputPixels, mathLevel.inputPixel[0], false);
        currentNumbers[0] = numberPixels[0][2].length / 4;
        numberPixels[1] = algoBlockPixel.differenceAndIntersect(inputPixels, mathLevel.inputPixel[1], false);
        currentNumbers[1] = numberPixels[1][2].length / 4;
        numberPixels[2] = algoBlockPixel.differenceAndIntersect(inputPixels, mathLevel.inputPixel[2], false);
        currentNumbers[2] = numberPixels[2][2].length / 4;


        let result =0;
        let operator ;

        if(mathLevel.showPlus()){
            result = currentNumbers[0] + currentNumbers[1];
            operator = "+";

        }else{
            result = currentNumbers[0] - currentNumbers[1];
            operator = "-";
        }

        
        if(mathLevel.showNumberOfInputs() == 1){

            

            if(mathLevel.freePlay()){
                this.numbers[0].disposeMesh();
                this.numbers[1].disposeMesh();
                this.numbers[2].showNumber(currentNumbers[1], globalWorldColor.green);
                this.numbers[3].disposeMesh();
                this.numbers[4].disposeMesh();
            }else {
                this.numbers[0].disposeMesh();
                this.numbers[1].disposeMesh();
                this.numbers[2].showSymbol("=", globalWorldColor.yellow);
                this.numbers[3].showSymbol("=", globalWorldColor.green);
                this.numbers[4].showNumber(mathLevel.numbers[2], globalWorldColor.green);
                if(mathLevel. needToClickButton()){
                    if(this.okButtonTriggered ){
                        this.okButtonTriggered = false;
                        if(mathLevel.numbers[2] == currentNumbers[1]){

                            algoBlockPixel.setColor(numberPixels[1][2], globalWorldColor.green, true, false, true);

                            base.ledSetBack(globalWorldColor.green);
                            base.ledSetLeft(globalWorldColor.green);
                            base.ledSetFront(globalWorldColor.green);
                            base.ledSetRight(globalWorldColor.green);

                            activeGame.win(3000);

                        }else{
                            if(mathLevel.numbers[2] < currentNumbers[1]){
                                algoBlockPixel.setColor(numberPixels[1][2], globalWorldColor.red, true, false, true);
                                base.ledSetBack(globalWorldColor.red);
                                base.ledSetLeft(globalWorldColor.red);
                                base.ledSetFront(globalWorldColor.red);
                                base.ledSetRight(globalWorldColor.red);
                            }else{
                                algoBlockPixel.setColor(numberPixels[1][2], globalWorldColor.blue, true, false, true);
                                base.ledSetBack(globalWorldColor.blue);
                                base.ledSetLeft(globalWorldColor.blue);
                                base.ledSetFront(globalWorldColor.blue);
                                base.ledSetRight(globalWorldColor.blue);
                            }

                           

                            this.timeOutRunning = true;
                            this.timeOut = setTimeout(function() {this.timeOutFunction();}.bind(this), 2000);   
                        
                        }
                    }

                }else{
                    if(mathLevel.numbers[2] == currentNumbers[1]){
                        if(this.winningDampenerCount < 4){
                            this.winningDampenerCount++;
                        }else if(this.winningDampenerCount == 4){
                            this.winningDampenerCount++;          
                            /*
                            let levelBlock = colorMatchLevel.getBlock();
    
                            for(let i = 0; i < levelBlock.length; i++){
    
    
                               let block =  algoBlock.differenceAndIntersect(notInterSectBlocks[2], [levelBlock[i]]);
                                algoBlock.setAllLed(block[2][0], colorMatchLevel.color[i], false);
                            }*/

                            algoBlockPixel.setColor(numberPixels[1][2], globalWorldColor.green, true, false, true);
                            
                            base.ledSetBack(globalWorldColor.green);
                            base.ledSetLeft(globalWorldColor.green);
                            base.ledSetFront(globalWorldColor.green);
                            base.ledSetRight(globalWorldColor.green);
    
                            activeGame.win(3000);
                            
                        }


                    }else{
                        this.winningDampenerCount = 0; 
                    }
                }

            }

            
        }else if(mathLevel.showNumberOfInputs() == 2){

            this.numbers[0].disposeMesh();
            this.numbers[1].disposeMesh();
            
            if(mathLevel.showSmallerOrGreater()){
                if(currentNumbers[1] > currentNumbers[2]){
                    this.numbers[2].showNumber(currentNumbers[1], globalWorldColor.red);
                    algoBlockPixel.setColor(numberPixels[1][2], globalWorldColor.red, true, false, true);

                    this.numbers[3].showSymbol(">", globalWorldColor.green);

                    this.numbers[4].showNumber(currentNumbers[2], globalWorldColor.blue);
                    algoBlockPixel.setColor(numberPixels[2][2], globalWorldColor.blue, true, false, true);
                }else if(currentNumbers[1] < currentNumbers[2]){
                    this.numbers[2].showNumber(currentNumbers[1], globalWorldColor.blue);
                    algoBlockPixel.setColor(numberPixels[1][2], globalWorldColor.blue, true, false, true);

                    this.numbers[3].showSymbol("<", globalWorldColor.green);

                    this.numbers[4].showNumber(currentNumbers[2], globalWorldColor.red);
                    algoBlockPixel.setColor(numberPixels[2][2], globalWorldColor.red, true, false, true);
                }else{
                    this.numbers[2].showNumber(currentNumbers[1], globalWorldColor.green);
                    algoBlockPixel.setColor(numberPixels[1][2], globalWorldColor.green, true, false, true);

                    this.numbers[3].showSymbol("=", globalWorldColor.green);

                    this.numbers[4].showNumber(currentNumbers[2], globalWorldColor.green);
                    algoBlockPixel.setColor(numberPixels[2][2], globalWorldColor.green, true, false, true);
                }

            }else{


                this.numbers[3].showSymbol("=", globalWorldColor.yellow);
                this.numbers[3].showSymbol("=", globalWorldColor.green);
                this.numbers[4].showNumber(currentNumbers[2], globalWorldColor.green);


            }
            
            
        }else{

            if(mathLevel.showSmallerOrGreater()){
                if(result > currentNumbers[2]){
                    this.numbers[0].showNumber(currentNumbers[0], globalWorldColor.red);
                    algoBlockPixel.setColor(numberPixels[0][2], globalWorldColor.red, true, false, true);

                    this.numbers[1].showSymbol(operator,globalWorldColor.green);

                    this.numbers[2].showNumber(currentNumbers[1], globalWorldColor.red);
                    algoBlockPixel.setColor(numberPixels[1][2], globalWorldColor.red, true, false, true);

                    this.numbers[3].showSymbol(">", globalWorldColor.green);

                    this.numbers[4].showNumber(currentNumbers[2], globalWorldColor.blue);                    
                    algoBlockPixel.setColor(numberPixels[2][2], globalWorldColor.blue, true, false, true);

                }else if(result < currentNumbers[2]){
                    this.numbers[0].showNumber(currentNumbers[0], globalWorldColor.blue);
                    algoBlockPixel.setColor(numberPixels[0][2], globalWorldColor.blue, true, false, true);

                    this.numbers[1].showSymbol(operator,globalWorldColor.green);

                    this.numbers[2].showNumber(currentNumbers[1], globalWorldColor.blue);
                    algoBlockPixel.setColor(numberPixels[1][2], globalWorldColor.blue, true, false, true);

                    this.numbers[3].showSymbol("<", globalWorldColor.green);

                    this.numbers[4].showNumber(currentNumbers[2], globalWorldColor.red);
                    algoBlockPixel.setColor(numberPixels[2][2], globalWorldColor.red, true, false, true);
                }else{
                    this.numbers[0].showNumber(currentNumbers[0], globalWorldColor.green);
                    algoBlockPixel.setColor(numberPixels[0][2], globalWorldColor.green, true, false, true);

                    this.numbers[1].showSymbol(operator,globalWorldColor.green);

                    this.numbers[2].showNumber(currentNumbers[1], globalWorldColor.green);
                    algoBlockPixel.setColor(numberPixels[1][2], globalWorldColor.green, true, false, true);

                    this.numbers[3].showSymbol("=", globalWorldColor.green);

                    this.numbers[4].showNumber(currentNumbers[2], globalWorldColor.green);
                    algoBlockPixel.setColor(numberPixels[2][2], globalWorldColor.green, true, false, true);
                }

            }else{

                this.numbers[1].showSymbol(operator,globalWorldColor.green);

                this.numbers[3].showSymbol("=",globalWorldColor.green);

                for(let i = 0; i < 3; i++){
                    if(currentNumbers[i] > mathLevel.numbers[i]){
                        this.numbers[i*2].showNumber(mathLevel.numbers[i], globalWorldColor.red);
                        algoBlockPixel.setColor(numberPixels[i][2], globalWorldColor.red, true, false, true);
                    }else if(currentNumbers[i] < mathLevel.numbers[i]){
                        this.numbers[i*2].showNumber(mathLevel.numbers[i], globalWorldColor.blue);
                        algoBlockPixel.setColor(numberPixels[i][2], globalWorldColor.blue, true, false, true);
                    }else{
                        this.numbers[i*2].showNumber(mathLevel.numbers[i], globalWorldColor.green);
                        algoBlockPixel.setColor(numberPixels[i][2], globalWorldColor.green, true, false, true);
                    }
                }

                
                this.numbers[mathLevel.secretInput()*2].showNumber(currentNumbers[mathLevel.secretInput()], globalWorldColor.yellow);
                algoBlockPixel.setColor(numberPixels[mathLevel.secretInput()][2], globalWorldColor.yellow, true, false, true);
             


                if(mathLevel.needToClickButton()){
                    if(this.okButtonTriggered ){
                        this.okButtonTriggered = false;
                        this.winningDampenerCount = 5; 
                        
                        if(mathLevel.numbers[0] == currentNumbers[0] && mathLevel.numbers[1] == currentNumbers[1] && mathLevel.numbers[2] == currentNumbers[2]){

                            this.numbers[mathLevel.secretInput()*2].showNumber(currentNumbers[mathLevel.secretInput()], globalWorldColor.green);
                            algoBlockPixel.setColor(numberPixels[mathLevel.secretInput()][2], globalWorldColor.green, true, false, true);

                            base.ledSetBack(globalWorldColor.green);
                            base.ledSetLeft(globalWorldColor.green);
                            base.ledSetFront(globalWorldColor.green);
                            base.ledSetRight(globalWorldColor.green);

                            activeGame.win(3000);

                        }else{
                            if(mathLevel.numbers[mathLevel.secretInput()] < currentNumbers[mathLevel.secretInput()]){
                                this.numbers[mathLevel.secretInput()*2].showNumber(currentNumbers[mathLevel.secretInput()], globalWorldColor.red);
                                algoBlockPixel.setColor(numberPixels[mathLevel.secretInput()][2], globalWorldColor.red, true, false, true);
                                base.ledSetBack(globalWorldColor.red);
                                base.ledSetLeft(globalWorldColor.red);
                                base.ledSetFront(globalWorldColor.red);
                                base.ledSetRight(globalWorldColor.red);
                            }else{
                                this.numbers[mathLevel.secretInput()*2].showNumber(currentNumbers[mathLevel.secretInput()], globalWorldColor.blue);
                                algoBlockPixel.setColor(numberPixels[mathLevel.secretInput()][2], globalWorldColor.blue, true, false, true);
                                base.ledSetBack(globalWorldColor.blue);
                                base.ledSetLeft(globalWorldColor.blue);
                                base.ledSetFront(globalWorldColor.blue);
                                base.ledSetRight(globalWorldColor.blue);
                            }

                           

                            this.timeOutRunning = true;
                            this.timeOut = setTimeout(function() {this.timeOutFunction();}.bind(this), 2000);   
                        
                        }
                    }

                }else{
                    if(mathLevel.numbers[0] == currentNumbers[0] && mathLevel.numbers[1] == currentNumbers[1] && mathLevel.numbers[2] == currentNumbers[2]){
                        if(this.winningDampenerCount < 4){
                            this.winningDampenerCount++;
                        }else if(this.winningDampenerCount == 4){
                            this.winningDampenerCount++;          
                            /*
                            let levelBlock = colorMatchLevel.getBlock();
    
                            for(let i = 0; i < levelBlock.length; i++){
    
    
                               let block =  algoBlock.differenceAndIntersect(notInterSectBlocks[2], [levelBlock[i]]);
                                algoBlock.setAllLed(block[2][0], colorMatchLevel.color[i], false);
                            }*/
                            this.numbers[mathLevel.secretInput()*2].showNumber(currentNumbers[mathLevel.secretInput()], globalWorldColor.green);
                            algoBlockPixel.setColor(numberPixels[mathLevel.secretInput()][2], globalWorldColor.green, true, false, true);
                            
                            base.ledSetBack(globalWorldColor.green);
                            base.ledSetLeft(globalWorldColor.green);
                            base.ledSetFront(globalWorldColor.green);
                            base.ledSetRight(globalWorldColor.green);
    
                            activeGame.win(3000);
                            
                        }


                    }else{
                        this.winningDampenerCount = 0; 
                    }
                }


            }
            
        }




    }
};