let guiPaintAdvancedTexture = 0 ;

let guiPaint = {
    
    tiles : 0,
    rows : 10,
    columns: 10,
    sizeSetting : 1,
    size : [30,60, 120],    
    padding : [0.25, 0.5, 1],
    active: false,
    scene: 0,
    paintBrush: 0,
    paintBrushColors : [ globalWorldColor.black, globalWorldColor.red, globalWorldColor.green, globalWorldColor.blue, globalWorldColor.yellow ],
    paintBrushColorsElipse : [ "#000000", "#FF0000", "#00FF00", "#0000FF", "#FFFF00" ],
    colorImage : [],
    colorElipse: [],
    init(scene){

        this.scene = scene;
    },

    clear : function(){

        for(let row = 0; row < this.rows; row++){           
            for(let col = 0; col < this.columns; col++){
                this.tiles[row][col].background = this.paintBrushColorsElipse[0] ;
            }
        }

    },

    downColor(pos){

        this.paintBrush = pos;
        
       // console.log("pos : " + pos);

    },


    createProjectionPixels : function( side, flip){
        let proj = [];
        let i = 0;
        for(let row = 0; row < this.rows; row++){
           
            for(let col = 0; col < this.columns; col++){
                if( this.tiles[row][col] .background == this.paintBrushColorsElipse[0]){ //!!

                }else {
                    proj[i] = Object.create(projectionPixel); 
                    
                    if(side == 0){
                        if(flip){
                            proj[i].x =  col;//pixel.x;
                            proj[i].y = 9 - row;//pixel.y;
                        }else{
                            proj[i].x =  9 - col;//pixel.x;
                            proj[i].y = 9 - row;//pixel.y;
                        }
                    }else if(side == 1){
                        if(flip){
                            proj[i].y = 9 - row//pixel.y;
                            proj[i].z = col;//pixel.z;
                        }else{
                            proj[i].y = 9 - row//pixel.y;
                            proj[i].z = 9 - col;//pixel.z;
                        }
                    }else if(side == 2){
                        proj[i].x = 9 - row;
                        //proj[i].y = 0;
                        proj[i].z = 9 - col;
                    }

                    if( this.tiles[row][col] .background == this.paintBrushColorsElipse[1]){
                        proj[i].color = 1;
                    }else if( this.tiles[row][col] .background == this.paintBrushColorsElipse[2]){
                        proj[i].color = 2;
                    }else if( this.tiles[row][col] .background == this.paintBrushColorsElipse[3]){
                        proj[i].color = 4;
                    }else if( this.tiles[row][col] .background == this.paintBrushColorsElipse[4]){
                        proj[i].color = 3;
                    }
                    i++;

                
                }

            }

        }
        return proj;
        /*
        //console.log("i " + i);
        proj[i] = Object.create(projectionPixel); 
        proj[i].color = pixel.color;
    
      //  console.log("proj[i].block.length: " + proj[i].blocks.length);
        proj[i].blocks = [];
        proj[i].blocks[0] = pixel.block
        //.push(); 
       // console.log("pixel.block.x: " + pixel.block.x);
       // console.log("proj[i].block[0].x: " + proj[i].blocks[0].x);
        //proj[i].block[0] = pixel.block; 
        //proj[i].block = pixel.block; 
       // proj[i].block[0] = pixel.block; //need to have multiple blocks??
        if(side == 0){
          proj[i].x = pixel.x;
          proj[i].y = pixel.y;
          //proj[i].z = 9.5;
          proj[i].max = pixel.z;
          proj[i].min = pixel.z;
        }else if(side == 1){
          //proj[i].x = -0.5;
          proj[i].y = pixel.y;
          proj[i].z = pixel.z;
          proj[i].max = pixel.x;
          proj[i].min = pixel.x;      
        }else{
          proj[i].x = pixel.x;
          //proj[i].y = 0;
          proj[i].z = pixel.z;
          proj[i].max = pixel.y;
          proj[i].min = pixel.y;
        }*/
    },
    hide : function(){
        if(guiPaintAdvancedTexture != 0){
            for(let i = 0; i < 5; i++){
                this.colorImage[i].isVisible = false;
                this.colorElipse[i].isVisible = false;
            }

            for(let row = 0; row < this.rows; row++){               
                for(let col = 0; col < this.columns; col++){

                    this.tiles[row][col].isVisible = false;
                }
            }

        }

    },
    show : function (){
        if(guiPaintAdvancedTexture == 0){
            guiPaintAdvancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("Tile");
        }else{
            for(let i = 0; i < 5; i++){
                this.colorImage[i].isVisible = true;
                this.colorElipse[i].isVisible = true;
            }

            for(let row = 0; row < this.rows; row++){               
                for(let col = 0; col < this.columns; col++){

                    this.tiles[row][col].isVisible = true;
                }
            }
            return;
        }
       // let offsetRow = -(this.size[this.sizeSetting] * this.rows )/2;
        //let offsetCol = -(this.size[this.sizeSetting] * this.columns )/2;

        for(let i = 0; i < 5; i++){
           // console.log("tick");
            this.colorImage[i] = new BABYLON.GUI.Image("button", "./icon/ok.svg");

            this.colorImage[i] .onPointerDownObservable.add(function() {this.downColor(i);}.bind(this));   

            this.colorElipse[i] = new BABYLON.GUI.Ellipse();

           // this.colorElipse[i] .color = "#606060";
            this.colorElipse[i] .thickness = 0;
            //this.colorElipse[i] .background = "#606060";
            this.colorElipse[i] .background = this.paintBrushColorsElipse[i];
            
            this.colorElipse[i] .alpha = 0.5;


          //  this.colorElipse[i] .width = this.size[this.sizeSetting]+ "px";
            //this.colorElipse[i] .height = this.size[this.sizeSetting]+ "px";
    
            //this.colorElipse[i].top = 100 + this.size[this.sizeSetting] * 0 + "px";
           // this.colorElipse[i].left = 1000 + this.size[this.sizeSetting] * 0 + "px";

         //  this.colorElipse[i].horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
           //this.colorElipse[i].verticalAlignment =  BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;

           guiPaintAdvancedTexture.addControl(this.colorElipse[i]);  
           guiPaintAdvancedTexture.addControl(this.colorImage[i] );  

        }


        this.tiles = [];
        for(let row = 0; row < this.rows; row++){
            this.tiles[row] = [];
            for(let col = 0; col < this.columns; col++){
                this.tiles[row][col] =  new BABYLON.GUI.Rectangle();

              /*  this.tiles[row][col].width = this.size[this.sizeSetting] + "px";
                this.tiles[row][col].height = this.size[this.sizeSetting]+ "px";
  
               // tiles[row][col] .cornerRadius = 0;
               // tiles[row][col] .color = "Orange";*/
               this.tiles[row][col] .thickness = 0;
               this.tiles[row][col] .background = "#000000";
               this.tiles[row][col] .alpha = 0.5;

               this.tiles[row][col].onPointerDownObservable.add(function() {this.down();}.bind(this));  
/*

               this.tiles[row][col] .paddingTop = this.padding[this.sizeSetting]+ "px";
               this.tiles[row][col] .paddingRight = this.padding[this.sizeSetting]+ "px";
          
               this.tiles[row][col] .paddingBottom = this.padding[this.sizeSetting]+ "px";
               this.tiles[row][col] .paddingLeft = this.padding[this.sizeSetting]+ "px";
    

               this.tiles[row][col].top = offsetRow + this.size[this.sizeSetting] * row + "px";
               this.tiles[row][col].left = offsetCol + this.size[this.sizeSetting] * col + "px";
*/
                guiPaintAdvancedTexture.addControl(this.tiles[row][col]);  

            }
        }

        this.changeSize(1);


    },  

    color(){
        zeroRow = canvas.height/2  - this.size[this.sizeSetting] * this.rows /2;
        zeroCol = canvas.width/2  - this.size[this.sizeSetting] * this.columns /2;

        // 306 console.log("zeroRow : " + zeroRow);
        // 400 console.log("zeroCol : " + zeroCol);

        let row = -1;
        let col = -1;
        
        
        if(this.scene.pointerX - zeroCol > 0 && (this.scene.pointerX - zeroCol) < this.columns * this.size[this.sizeSetting]){
            if(this.scene.pointerY - zeroRow > 0 && (this.scene.pointerY - zeroRow) < this.rows * this.size[this.sizeSetting]){
                /*console.log("col: " + Math.floor((this.scene.pointerX - zeroCol) / this.size[this.sizeSetting]));
                console.log("row: " + Math.floor((this.scene.pointerY - zeroRow) / this.size[this.sizeSetting]));*/
                row = Math.floor((this.scene.pointerY - zeroRow) / this.size[this.sizeSetting]);
                col = Math.floor((this.scene.pointerX - zeroCol) / this.size[this.sizeSetting]);

                this.tiles[row][col].background = this.paintBrushColorsElipse[this.paintBrush] ;

            }


          
        }
    },

    down : function(){
        camera.lock();
        this.active = true;
        this.color();
        console.log("down");

        /*let proj = this.createProjectionPixels(0);

        for(let i = 0; i < proj.length; i++){
            console.log("i: " + i);
            console.log("x: " + proj[i].x);
            console.log("y: " + proj[i].y);
            console.log("z: " + proj[i].z);
            console.log("color: " + proj[i].color);
        

        }*/
    
    },

    pointerUp: function(){
        if(this.active == true){
            this.active = false;
            camera.unlock();
        }
    },

    

    pointerMove: function(){
        
        if(this.active == true){
           
            this.color();



        }
    },

    changeSize: function(size){
        this.sizeSetting = size;

        let offsetRow = -(this.size[this.sizeSetting] * this.rows )/2 + this.size[this.sizeSetting]/2;
        let offsetCol = -(this.size[this.sizeSetting] * this.columns )/2 + this.size[this.sizeSetting]/2;

        for(let i = 0; i < 5; i++){
            this.colorImage[i].paddingTop = this.padding[this.sizeSetting]+ "px";
            this.colorImage[i].paddingRight = this.padding[this.sizeSetting]+ "px";
            this.colorImage[i].paddingBottom = this.padding[this.sizeSetting]+ "px";
            this.colorImage[i].paddingLeft = this.padding[this.sizeSetting]+ "px";
            this.colorImage[i].width = this.size[this.sizeSetting] + "px";
            this.colorImage[i].height = this.size[this.sizeSetting]+ "px";

            this.colorElipse[i].paddingTop = this.padding[this.sizeSetting]+ "px";
            this.colorElipse[i].paddingRight = this.padding[this.sizeSetting]+ "px";
            this.colorElipse[i].paddingBottom = this.padding[this.sizeSetting]+ "px";
            this.colorElipse[i].paddingLeft = this.padding[this.sizeSetting]+ "px";
            this.colorElipse[i].width = this.size[this.sizeSetting] + "px";
            this.colorElipse[i].height = this.size[this.sizeSetting]+ "px";

            this.colorImage[i].top = offsetRow + this.size[this.sizeSetting] * i + "px";
            this.colorImage[i].left = offsetCol + this.size[this.sizeSetting] * -1 + "px";

            this.colorElipse[i].top = offsetRow + this.size[this.sizeSetting] * i + "px";
            this.colorElipse[i].left = offsetCol + this.size[this.sizeSetting] * -1 + "px";


            /*this.colorElipse[i] = new BABYLON.GUI.Ellipse();

            //this.colorElipse[i] .color = "#606060";
            this.colorElipse[i] .thickness = 0;
            this.colorElipse[i] .background = "#606060";
            this.colorElipse[i] .alpha = 0.3;*/
        }

        for(let row = 0; row < this.rows; row++){
            
            for(let col = 0; col < this.columns; col++){
                //this.tiles[row][col] =  new BABYLON.GUI.Rectangle();

                this.tiles[row][col].width = this.size[this.sizeSetting] + "px";
                this.tiles[row][col].height = this.size[this.sizeSetting]+ "px";
  
               // tiles[row][col] .cornerRadius = 0;
               // tiles[row][col] .color = "Orange";
            /*   this.tiles[row][col] .thickness = 0;
               this.tiles[row][col] .background = "#606060";
               this.tiles[row][col] .alpha = 0.3;*/


               this.tiles[row][col] .paddingTop = this.padding[this.sizeSetting]+ "px";
               this.tiles[row][col] .paddingRight = this.padding[this.sizeSetting]+ "px";
          
               this.tiles[row][col] .paddingBottom = this.padding[this.sizeSetting]+ "px";
               this.tiles[row][col] .paddingLeft = this.padding[this.sizeSetting]+ "px";
    

               this.tiles[row][col].top = offsetRow + this.size[this.sizeSetting] * row + "px";
               this.tiles[row][col].left = offsetCol + this.size[this.sizeSetting] * col + "px";

               // guiPaintAdvancedTexture.addControl(tiles[row][col]);  

            }
        }
    }

}