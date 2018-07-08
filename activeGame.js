let games = {
  guidedBuild: 0,
  tangram: 1,
  tangramFree: 2,
  shapeHunter : 3,
  colorMatch: 4,
  memo: 5,
  tetris : 6,
  columns : 7,
  math: 8,
  tangram2D: 9
}



let activeGame = {
  game: [],
  level: [],
  gameIndex: -1,
  ignoreWin: false,
  timeOutOkClick: 0,
  timeOutOkClickFunction : function(){
      clearTimeout(this.timeOutOkClick);
      this.clickOk(); 
        
  },
  setGame: function(game){  
    
    
    if(game == this.gameIndex){
      return;
    }
    
    if(game == games.guidedBuild){
      if(this.game[game] == null){      
        this.game[game] = guidedBuild;//Object.create(guidedBuild); 
        this.game[game].init(); 
        this.level[game] = guidedBuildLevel;
        this.level[game].init();  
      }
      guiGame.initLevelSelect(this.level[game].rowColumnCount);
    }else if(game == games.tangram){     
      if(this.game[game] == null){      
        this.game[game] = tangram;//Object.create(guidedBuild); 
        this.game[game].init(); 
        this.level[game] = tangramLevel;
        this.level[game].init();  
      }
      guiGame.initLevelSelect(this.level[game].rowColumnCount);
     }else if(game == games.tangramFree){
      if(this.game[game] == null){      
        this.game[game] = tangramFree;//Object.create(guidedBuild); 
        this.game[game].init(); 
        this.level[game] = tangramFreeLevel;
        this.level[game].init();  
      }
      guiGame.initLevelSelect(this.level[game].rowColumnCount);
    }else if(game == games.shapeHunter){
      if(this.game[game] == null){      
        this.game[game] = shapeHunter;//Object.create(guidedBuild); 
        this.game[game].init(); 
        this.level[game] = shapeHunterLevel;
        this.level[game].init();  
      }
      guiGame.initLevelSelect(this.level[game].rowColumnCount);
    }else if(game == games.colorMatch){
      if(this.game[game] == null){      
        this.game[game] = colorMatch;//Object.create(guidedBuild); 
        this.game[game].init(); 
        this.level[game] = colorMatchLevel;
        this.level[game].init();  
      }
      guiGame.initLevelSelect(this.level[game].rowColumnCount);
    }else if(game == games.memo){    
      if(this.game[game] == null){      
        this.game[game] = memo;//Object.create(guidedBuild); 
        this.game[game].init(); 
        this.level[game] = memoLevel;
        this.level[game].init();  
      }
      guiGame.initLevelSelect(this.level[game].rowColumnCount);
    }else if(game == games.tetris){    
      if(this.game[game] == null){      
        this.game[game] = tetris;//Object.create(guidedBuild); 
        this.game[game].init(); 
        this.level[game] = tetrisLevel;
        this.level[game].init();  
      }
      guiGame.initLevelSelect(this.level[game].rowColumnCount);
    }else if(game == games.columns){    
      if(this.game[game] == null){      
        this.game[game] = columns;//Object.create(guidedBuild); 
        this.game[game].init(); 
        this.level[game] = columnsLevel;
        this.level[game].init();  
      }
      guiGame.initLevelSelect(this.level[game].rowColumnCount);
    }else if(game == games.math){    
      if(this.game[game] == null){      
        this.game[game] = math;//Object.create(guidedBuild); 
        this.game[game].init(); 
        this.level[game] = mathLevel;
        this.level[game].init();  
      }
      guiGame.initLevelSelect(this.level[game].rowColumnCount);
    }else if(game == games.tangram2D){    
      if(this.game[game] == null){      
        this.game[game] = tangram2D;//Object.create(guidedBuild); 
        this.game[game].init(); 
        this.level[game] = tangram2DLevel;
        this.level[game].init();  
      }
      guiGame.initLevelSelect(this.level[game].rowColumnCount);
    }

    
    //neeed to reset this.ignoreWin = false;
    this.gameIndex = game;

  },  
  setLevel : function(level, difficulty){
    animateWinning.stop();
    guiGame.okButton.hide();
    this.ignoreWin = false;
    this.level[this.gameIndex].setLevel(level, difficulty);
    this.game[this.gameIndex].clear();

  },
  resetBaseLed : function(){
    base.ledClear();
    base.ledSetLeft(globalWorldColor.cyan);
    base.ledSetRight(globalWorldColor.magenta);
  },
  resetCamera : function(){

  },
  stopDisplayLevelScore : function(){
    animateWinning.stop();

  },
  displayLevelScore  : function(level, difficulty){

    if(activeGame.level[activeGame.gameIndex].getScore(level, difficulty) != 0){   
      let score = activeGame.level[activeGame.gameIndex].getScore(level, difficulty);
      score -= score %3;
      animateWinning.start( score ,  algoBlock.findMaxY(world.block), false );
    }else{     
      animateWinning.stop();
    }
  },
  render: function(){ 
    if(this.gameIndex > -1){
      this.game[this.gameIndex].render();
    }
  },
  win:  function(timeout){
    if(!this.ignoreWin){
      animateWinning.start(activeGame.level[activeGame.gameIndex].win(),  algoBlock.findMaxY(world.block), true);
      guiGame.okButton.initCallBack(this.clickOk, buttonTrigger.up);
      guiGame.okButton.show();
      this.ignoreWin = true;

      if(timeout != null){
        clearTimeout(this.timeOutOkClick);         
        this.timeOutOkClick = setTimeout(function() {this.timeOutOkClickFunction();}.bind(this), timeout);   

      }
    }
  },
  clickOk: function(){   
    clearTimeout(activeGame.timeOutOkClick);
    activeGame.ignoreWin = false;
    guiGame.okButton.hide();
    animateWinning.stop();
    //if(activeGame.gameIndex == games.guidedBuild){
      activeGame.level[activeGame.gameIndex].new();
    //}
  }



};
