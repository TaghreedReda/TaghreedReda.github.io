//p for position .. v for value 
// name and duration
var nameP , durationV ,nameV,durationP;
//appendices
var appendicesV,appendicesP;
//main array
var activites=[]; 
//buttons
var newbutton,finishbutton;
var startx=20,starty=230;
var start;
var finish;
var currentActivity;
var mintime=0;


function setup() 
{
	createCanvas(1000,800);
	bg= loadImage('2f6a6c8d73785ff57e1005f34df35940.jpg');
  //1-name
  nameP=createElement('h3', 'Activity Name : ');
  nameP.position(10,45);
  nameV=createInput();
  nameV.position(188,65);

  //2-duration
  durationP=createElement('h3', 'Activity Duration : ');
  durationP.position(10,85);
  durationV=createInput();
  durationV.position(188,105);

  //3-appendices
  appendicesP=createElement('h3', 'Activity Appendices : ');
  appendicesP.position(10,125);
  appendicesV=createInput();
  appendicesV.position(188,145);
	
	//start
	start=new Activity("Start",0,'0');
	activites.push(start);
	activites[0].x =startx;	
	finish=new Activity("Finish",101010,'0');
										 

  newbutton=createButton('New');
  newbutton.position(30+80,185);
  newbutton.mousePressed(createActivity);

  finishbutton=createButton('Finish');
  finishbutton.position(90+80,185);
  finishbutton.mousePressed(finishSetting);

}
function findCP(){
  	for (var i=activites.length-2;i>=1;i--){
		if (activites[i].next.length==0){
       activites[i].lf=activites[i].ef;   
	}
		else {
			var min=100000000;
			for (var j=0 ; j<activites[i].next.length;j++){
				for (var k=1;k<activites.length-1;k++){
					
			    if (activites[k].name == activites[i].next[j]){
						if(activites[k].ls <= min){
							min=activites[k].ls;
					}
				}
				}	
		}
			activites[i].lf = min;
			
		}
      
		activites[i].ls = activites[i].lf - activites[i].duration;
  
    activites[i].v1=activites[i].ls-activites[i].es;
    activites[i].v2=activites[i].lf-activites[i].ef;
       console.log(activites[i].name+ " " + activites[i].ls + " " +activites[i].lf );
    if ( activites[i].v1==0 &&  activites[i].v2==0){
       activites[i].critical=1;
      console.log("critical  " + activites[i].name);
    }
      
  }
}
function settMinTime(){
  
	//setting es and ef
	for (var i=1;i<activites.length-1;i++){
		if (activites[i].previous.length==0){
       activites[i].es=0;
			 
	}
		else {
			var max=0;
			for (var j=0 ; j<activites[i].previous.length;j++){
				for (var k=1;k<activites.length-1;k++){
					
			    if (activites[k].name== activites[i].previous[j]){
						if(activites[k].ef>=max){
							max=activites[k].ef;
					}
				}
				}	
		}
			activites[i].es = max;
			
		}
		activites[i].ef =(activites[i].es + activites[i].duration);
		mintime = activites[i].ef;
    
  }
  console.log (mintime);
}
function finishSetting ()
{
	 newbutton.hide();
	activites.push(finish);
	activites[activites.length-1].y =starty+200;

//set all nexts		
	 
for (var i=1 ; i<activites.length-1;i++){
  console.log(activites[i].name+" has");
	for (var k=1; k<activites.length-1;k++){
		for (var e=0 ;e<activites[k].previous.length;e++){
			if(activites[k].previous[e]==activites[i].name){
				activites[i].next.push(activites[k].name);
        console.log(activites[k].name);
				break;
			}
		}
	}
}
	 
settMinTime();
  findCP();
}
function createActivity()
{
	 var d= parseInt(durationV.value(),10);
    var activity=new Activity(nameV.value(),d,appendicesV.value());
    activites.push(activity);

}
function Activity (activityName,activityDur,appendicesNames)
{
	
 this.name=activityName;
 this.duration=activityDur;
	
 this.es=0 ; //early start
 this.ef=0; //early finish
 this.ls=0; //last start
 this.lf=0; //last finish
 this.critical=0; //0 or 1 
 this.v1=0;
 this.v2=0;

 this.height=40;
 this.width=120;
 this.x= startx+150;
 this.y= starty;

 this.next=[];
 this.previous=[];
 //previous setting
  
 for (var i=0 ;i<appendicesNames.length;i++){
      if (appendicesNames[i]!=',')
           this.previous.push(appendicesNames[i]);
 }	 

}

function mousePressed() {	
		currentActivity=-1;
		for (var i=activites.length-1 ;i>=0;i--){
			if(mouseX > activites[i].x  && mouseX <activites[i].x + activites[i].width && 
      mouseY > activites[i].y  && mouseY < activites[i].y + (activites[i].height*2)){
			     currentActivity=i;
				 break;
  } 
  }
		
	}
	
function mouseDragged() {	
    activites[currentActivity].x = mouseX- 60; 
   activites[currentActivity].y = mouseY- 20;
	
	}

function draw()
{
 background(bg); 


		//connecting to prev.
  
for (var k=1 ;k<activites.length;k++){
	if(activites[k].previous.length==0){
		 fill(125,220,31);
  line(activites[k].x + activites[k].width /2,activites[k].y + activites[k].height,activites[0].x + activites[0].width/2,activites[0].y + activites[0].height/2);
	}
	
	if (activites[k].previous.length!=0) {
		for (var l=0;l<activites[k].previous.length;l++){
			   for (var z=1 ;z<activites.length;z++){
					 if (activites[k].previous[l]==activites[z].name){
						  fill(125,220,31);
  line(activites[k].x + activites[k].width /2,activites[k].y + activites[k].height,activites[z].x + activites[z].width/2,activites[z].y + activites[z].height);
	
					 }
				 }
			
		}
	}
}	

	//connecting to next.
for (var h=1 ;h<activites.length-1;h++){
	if(activites[h].next.length==0 &&  activites[activites.length -1].duration==101010){
		 fill(125,220,31);
  line(activites[h].x + activites[h].width /2,activites[h].y + activites[h].height,activites[activites.length -1].x + activites[activites.length -1].width/2,activites[activites.length -1].y + activites[activites.length -1].height/2);
	}
	
	if (activites[h].next.length!=0) {
		for (var n=0; n<activites[h].next.length ; n++){
			for (var v=1 ;v<activites.length;v++){
					 if (activites[h].next[n]==activites[v].name){
						  fill(125,220,31);
 line(activites[h].x + activites[h].width /2,activites[h].y + activites[h].height,activites[v].x +activites[v].width/2,activites[v].y + activites[v].height);			 
					 }
			}
	}
	
}	
}	
   
	//drawing loop	
for (var j=0 ; j<activites.length;j++)
{
	if(j==0 ){	
	//drawing the start
 fill (100,100,100);

 rect(activites[j].x, activites[j].y, activites[j].width, activites[j].height);
 fill(255);
 textSize(14);
 text("START",activites[j].x+40 ,activites[j].y+15,20,20);
	}
	
	//drawing finish
	else if (j== activites.length-1 && activites[j].duration==101010){
		 fill (100,100,100);
		
		rect(activites[j].x, activites[j].y, activites[j].width, activites[j].height);
 fill(255);
 textSize(14);
		text("FINISH",activites[j].x+40 ,activites[j].y+15,20,20);

    
    
	}
	else 
	{
    if(activites[j].critical==1)
    fill(88,1,67);
    else 
      fill(255,255,255);
		
		var line1x=activites[j].x+(activites[j].width/3);
		var linesY= activites[j].y +(activites[j].height*2);
		var line2x=activites[j].x+(2*(activites[j].width/3));
		
    
		rect(activites[j].x, activites[j].y, activites[j].width, activites[j].height);
		
		rect(activites[j].x, activites[j].y+ activites[j].height, activites[j].width, activites[j].height);
   
		//line 1
		line(line1x, activites[j].y ,line1x,linesY);
		//line 2
	  line(line2x, activites[j].y,line2x, linesY);
    
    if (activites[j].critical==1)
    fill(255);
    else
       fill(88,1,67);
      
    textSize(20);

		text(activites[j].es,activites[j].x+13,activites[j].y+15,20,20);
	  
		text(activites[j].name,line1x+13 ,activites[j].y+15,20,20);
    
		text(activites[j].ef,line2x+13,activites[j].y+15,20,20);
		
		text(activites[j].lf,line2x+13,activites[j].y+activites[j].height+15,20,20);
		
		text(activites[j].duration,line1x+13,activites[j].y+activites[j].height+15,20,20);
		
		text(activites[j].ls,activites[j].x+13,activites[j].y+activites[j].height+15,20,20);
		
}
}
}