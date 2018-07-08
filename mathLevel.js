let mathLevel = {
  block : [], // level, stage, block
  score: [],
  rowColumnCount: [],
  level : 0,
  difficulty : 0,
  stage : 0,
  inputPixel: [], //?
  numbers : [],

  needToClickButton(){

    if(this.level == 2 || this.level == 4 || this.level == 6){
      return true;
    }
    return false;
    
  }, 
  freePlay(){

    if(this.level == 0){
      return true;
    }
    return false;


  },


  showSmallerOrGreater(){
    if(this.level == 0 ){
      if(this.difficulty != 0){
        return true;
      }
    }
    return false;

    
    
  },

  randomWithFraction(){
    if(this.level == 1 || this.level == 2  ){
      if(this.difficulty > 0){
        return true;
      }
    
    }else if(this.level == 3 || this.level == 4  ){
      if(this.difficulty > 1){
        return true;
      }
    
    }else if(this.level == 5 || this.level == 6  ){
      if(this.difficulty > 3){
        return true;
      }
    }

    return false;

  /*  1.1
2.1

3.2..
4.2..

5.4..
6.4..
*/

  },

  showPlus(){
    if(this.level == 0 ){
      if(this.difficulty == 2){
        return true;
      }
    }else if(this.level > 2 ){
      if(this.difficulty % 2 == 0){
        return true;
      }
    }
    return false;

  /*  0.2
3.0, 3.2
4.0, 4.2
5.0, 5.2, 5.4, 5.6
6.0, 6.2, 6.4, 6,6
*/
  },
 
  secretInput(){

    if(this.level == 5 || this.level == 6 ){
      if(this.difficulty < 2){
        return 1;
      }else if(this.difficulty < 4){
        return 0;
      }else if(this.difficulty < 6){
        return 1;
      }else{
        return 0;
      }
    }

    return 2;

  },

  showNumberOfInputs(){

    if(this.level == 0 ){
      if(this.difficulty ==0){
        return 1;
      }else if(this.difficulty ==1){
        return 2;
      }
    }else if(this.level == 1 || this.level == 2){
      return 1;
    }

    return 3;


  },

  //redGreenBlueProj: [],   

  showAllBlocks(){
    console.log("this.level" + this.level)
    if(this.level == 0){
      return true;
    }
    return false;
  },   
  timeOutOffset(){
    if(this.level == 0 || this.level == 1){
      return 6000;
    }
    return 5000;
  }, 
  timeOutProportion(){
    if(this.level == 0 || this.level == 1){
      return 4000;
    }
    return 3000;
  } ,


  setLevel : function(level, difficulty){
    this.level = level;
    this.difficulty = difficulty;
    this.initLevel();
    this.new();
  },
  win : function(){
    return this.score [this.level][this.difficulty]++;
  },
  getScore : function(level, difficulty){
    return this.score [level][difficulty];
  }, 
  new : function (){

    base.ledSetBack(0);
    base.ledSetLeft(globalWorldColor.cyan);
    base.ledSetFront(0);
    base.ledSetRight(globalWorldColor.magenta);

    algoBlock.clearLed(world.block);
    math.winningDampenerCount = 0;

    math.okButtonTriggered = false;
    if( mathLevel.needToClickButton()){
        guiGame.okButton.initCallBack(math.clickOk, buttonTrigger.up);
        guiGame.okButton.show();
    }else{
        guiGame.okButton.hide();
    }


    while(true){
      this.numbers[0] = Math.floor(Math.random()*10);
      this.numbers[1] = Math.floor(Math.random()*10);
      this.numbers[2] = Math.floor(Math.random()*10);

      if(this.randomWithFraction()){
        this.numbers[0] += Math.floor(Math.random()*4)/4;
        this.numbers[1] += Math.floor(Math.random()*4)/4;
        this.numbers[2] += Math.floor(Math.random()*4)/4;
      }

      /*if( this.showNumberOfInputs() == 2){
        let neededBlocks = 0;
        for(let i = 1; i < 3; i++){
          neededBlocks += Math.floor(this.numbers[i]);      
          if(this.numbers[1] - Math.floor(this.numbers[i]) > 0) {
            if(this.numbers[1] - Math.floor(this.numbers[i]) < 0.75){
              neededBlocks += 1;
            } else{
              neededBlocks += 2;
            }
          }
        }

        if(neededBlocks < 19){
          break;
        }
      }else */if(this.showNumberOfInputs() == 3){
        
        if(this.showPlus()){
          this.numbers[2] = this.numbers[0] + this.numbers[1]
        }else{
          this.numbers[2] = this.numbers[0] - this.numbers[1]
        }


        let neededBlocks = 0;
        for(let i = 0; i < 3; i++){
          neededBlocks += Math.floor(this.numbers[i]);      
          if(this.numbers[1] - Math.floor(this.numbers[i]) > 0) {
            if(this.numbers[1] - Math.floor(this.numbers[i]) < 0.75){
              neededBlocks += 1;
            } else{
              neededBlocks += 2;
            }
          }
        }     


        console.log("neededBlocks: " + neededBlocks);
        if(neededBlocks < 19 && this.numbers[2] >= 0){
          return;
        }

      }else{
        return;
      }
    }

  /*  this.color = [];

    for(let i = 0; i < this.block [this.level][this.difficulty][ this.stage].length; i++){
      let color = Math.floor(Math.random()*3);

      if(color == 0){
        this.color[i] = globalWorldColor.red;
        algoBlock.setAllLed( this.block [this.level][this.difficulty][ this.stage][i], globalWorldColor.red, false);
      }else if(color == 1){
        this.color[i] = globalWorldColor.green;
        algoBlock.setAllLed( this.block [this.level][this.difficulty][ this.stage][i], globalWorldColor.green, false);
      }else{
        this.color[i] = globalWorldColor.blue;
        algoBlock.setAllLed( this.block [this.level][this.difficulty][ this.stage][i], globalWorldColor.blue, false);
      }

      


    }

    this.currentLevelCorrectPixel = algoBlockPixel.create(this.block [this.level][this.difficulty][ this.stage]); 
*/
    /*for(let i = 0; i < this.currentLevelCorrectPixel.length; i++){
      console.log("x: " +this.currentLevelCorrectPixel[i].x);
      console.log("z: " +this.currentLevelCorrectPixel[i].z);
      console.log("color: " + this.currentLevelCorrectPixel[i].color);
    }*/
    
/*
    algoBlock.clearLed(this.block [this.level][this.difficulty][ this.stage]);

    colorMatch.clear();*/

   /* let nextStage = Math.floor(Math.random()*this.block [this.level][this.difficulty].length) ;
    
    while(nextStage == this.stage){
      nextStage = Math.floor(Math.random()*this.block [this.level][this.difficulty].length) ;
    }
    this.stage = nextStage;*/
  },
  initLevel : function(){  

    //this.redGreenBlueProj = algoProjection.create(redPixel.concat(greenPixel, bluePixel));

 
   // blockodile.renderNumber([1.5], [0.5], [4], [2], [globalWorldColor.blue, globalWorldColor.green, globalWorldColor.red] );
  
//renderFlat(x, z, xWidht, zWidth, color )

    if( this.showNumberOfInputs() == 1 ){
      basePlane.renderFlat([4.5], [4.5], [2], [2], [globalWorldColor.green] );
    }else if ( this.showNumberOfInputs() == 2 ){
      basePlane.renderFlat([4.5, 4.5], [1.5, 4.5], [2,2], [2,2], [globalWorldColor.green, globalWorldColor.green] );
    }else{
      basePlane.renderFlat([4.5, 4.5, 4.5], [1.5, 4.5, 7.5], [2,2,2], [2,2,2], [globalWorldColor.green, globalWorldColor.green, globalWorldColor.green] );
    }
   /* let proj =algoProjection.create(this.redPixel.concat(this.greenPixel, this.bluePixel));
    projection.render([],[], proj[2]);
*/
  },
  getBlock: function(){

    return this.block [this.level][this.difficulty][ this.stage];
  },
 init: function(){

      this.rowColumnCount[0] = 5;
      this.rowColumnCount[1] = 3;
      this.rowColumnCount[2] = 3;
      this.rowColumnCount[3] = 5;
      this.rowColumnCount[4] = 5;
      this.rowColumnCount[5] = 9;
      this.rowColumnCount[6] = 9;


/*




0 freeplay
    -number (middle)
    -two numbers (greater than smaller than)
    -plus
    -minus

blue >
red <
green =


1 (score when correct)
    match number (middle)    
    fraction
    match number (middle)
    
yellow !=
green = 

2 (click button)
    match number (middle)    
    fraction
    match number (middle)

yellow

reproduce red != 
reproduce green =

unkown yellow

unkown ok green
unkown ok green (after press button)

ng red

3 (score when correct)
    fixed(reproduce) + fixed(reproduce) = unkown 
    fixed(reproduce) - fixed(reproduce) = unkown 
    fraction
    ..

4 (click button)
    fixed(reproduce) + fixed(reproduce) = unkown 
    fixed(reproduce) - fixed(reproduce) = unkown
    fraction
    ..

5 (score when correct)
    fixed(reproduce) + unkown  = fixed(reproduce)
    fixed(reproduce) - unkown  = fixed(reproduce)
    unkown + fixed(reproduce) = fixed(reproduce)
    unkown - fixed(reproduce) = fixed(reproduce)
    fraction
    ..

6 (click button)
    fixed(reproduce) + unkown  = fixed(reproduce)
    fixed(reproduce) - unkown  = fixed(reproduce)
    unkown + fixed(reproduce) = fixed(reproduce)
    unkown - fixed(reproduce) = fixed(reproduce)
    fraction
    ..




    */


/*
time out 6 + 4, all
0 
  0 one block
  1 two block
  2 three block
  3 four block
  4 five block

time out 6 + 4, one by one
1 
  0 one block
  1 two block
  2 three block
  3 four block
  4 five block

time out 4 + 2, one by one
2 
  0 one block
  1 two block
  2 three block
  3 four block
  4 five block

shape time out 4 + 2, one by one
3 
  0 one block
  1 two block
  2 three block
  3 four block
  4 five block



*/
      //--

      //0
      //--
      this.score[0] = [];
      this.block [0] = []; 

      this.score[0][0] = 0;
      this.score[0][1] = 0;
      this.score[0][2] = 0;
      this.score[0][3] = 0;
  
      //1
      //--
      this.score[1] = [];
      this.block[1] = []; 

      this.score[1][0] = 0;
      this.score[1][1] = 0;

      //2
      //--
      this.score[2] = [];
      this.block[2] = []; 

      this.score[2][0] = 0;
      this.score[2][1] = 0;

      //3
      //--
      this.score[3] = [];
      this.block[3] = []; 

      this.score[3][0] = 0;
      this.score[3][1] = 0;
      this.score[3][2] = 0;
      this.score[3][3] = 0;

      //4
      //--
      this.score[4] = [];
      this.block[4] = []; 

      this.score[4][0] = 0;
      this.score[4][1] = 0;
      this.score[4][2] = 0;
      this.score[4][3] = 0;

      //5
      //--
      this.score[5] = [];
      this.block[5] = []; 

      this.score[5][0] = 0;
      this.score[5][1] = 0;
      this.score[5][2] = 0;
      this.score[5][3] = 0;      
      this.score[5][4] = 0;
      this.score[5][5] = 0;
      this.score[5][6] = 0;
      this.score[5][7] = 0;

      //6
      //--
      this.score[6] = [];
      this.block[6] = []; 

      this.score[6][0] = 0;
      this.score[6][1] = 0;
      this.score[6][2] = 0;
      this.score[6][3] = 0;      
      this.score[6][4] = 0;
      this.score[6][5] = 0;
      this.score[6][6] = 0;
      this.score[6][7] = 0;




      let blockInputPixel = [];
      blockInputPixel[0] = [];
      blockInputPixel[1] = [];
      blockInputPixel[2] = [];
      


      for(let i = 0; i < 18 ; i++){
        blockInputPixel[0][i] = Object.create(block);
        blockInputPixel[1][i] = Object.create(block);
        blockInputPixel[2][i] = Object.create(block);

        blockInputPixel[0][i].x = 4;
        blockInputPixel[1][i].x = 4;
        blockInputPixel[2][i].x = 4;

        blockInputPixel[0][i].y = i;
        blockInputPixel[1][i].y = i;
        blockInputPixel[2][i].y = i;

        blockInputPixel[0][i].z = 7;
        blockInputPixel[1][i].z = 4;
        blockInputPixel[2][i].z = 1;

        



      }

     // console.log("blockInputPixel[0].length: " + blockInputPixel[0].length);

      this.inputPixel[0] = algoBlockPixel.create(blockInputPixel[0]);
      this.inputPixel[1] = algoBlockPixel.create(blockInputPixel[1]);
      this.inputPixel[2] = algoBlockPixel.create(blockInputPixel[2]);
      

      this.initLevel();
      this.new();

     // this.initLevel(this.block[0][0][0]);

  }
}
