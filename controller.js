
$(document).ready(function () {
							
					var cwidth = window.innerWidth
					 
					
var begin=true;					
var qNumber=0;
var qlock=false; 
var display="game1";
var obj1;
var obj2="#game1";
var score1=0;var score2=0;
 
qbank=new Array();qbank2=new Array();
		typeArray=new Array();
 
		 resetDB();
		 
		 function resetDB(){ 
		 qNumber=0;begin=true;obj2="#game1";obj1="#game2";display="game1";
		 score1=0;score2=0;
		 
		var myloader='idioms.json';
 		
 		$.getJSON(myloader, function(data) {
		qbank=[];
		//alert("xx"+data.gamelist);
		for(i=0;i<data.quizlist.length;i++){ 
			typeArray=[];
			typeArray[0]=data.quizlist[i].qtype;
			typeArray[1]=data.quizlist[i].ques;
			typeArray[2]=data.quizlist[i].op1;
			typeArray[3]=data.quizlist[i].op2;
			typeArray[4]=data.quizlist[i].op3;
			typeArray[5]=data.quizlist[i].def;
			qbank[i]=typeArray;
		}
		   
		
		 kickoff();
		 
		})//gtjson
		 
}//resetdb


 

 
function kickoff(){ 
	chooseGame();
 	$("#game1").animate({"right": "+=800px"},"slow", function() {});
}//kickoff

	function startGame(){ 
		 $('#navContent').css("height","350px");
	 $('#game1').css("height","350px");
		$(obj2).append('<div class="title1">Activity</div><p>');
		$(obj2).append('<div class="title2">Glossary</div>');
		$(obj2).append('<a href="about/index.html"><div class="title3">What is an idiom?</div></a>');
		$(obj2).append('<div class="rightpic"><img src="pix.png"></div>');
$('.title1').click(function(){$('.title1').off('click');  changeQuestion();})
$('.title2').click(function(){$('.title2').off('click'); showGlossary();})
		
	}//stgame

function changeQuestion(){
	
	if(display=="game1"){obj1="#game1";obj2="#game2";display="game2";}
		else{obj1="#game2";obj2="#game1";display="game1";}
	
	
	qNumber=Math.ceil(Math.random()*qbank.length)-1;
	
	chooseGame()
	
	 $(obj1).animate({"right": "+=800px"},"slow", function() {$(obj1).css('right','-800px');$(obj1).empty();});
	 $(obj2).animate({"right": "+=800px"},"slow", function() {qlock=false;});
	}//change question



//////////////////////////////////////////////////////////////////////////////////////////////
function mcq1Game(){
	
	var rnd=Math.random()*3;rnd=Math.ceil(rnd);
var op1;
var op2;
var op3;
var correct=false;
if(rnd==1){op1=qbank[qNumber][2];op2=qbank[qNumber][3];op3=qbank[qNumber][4];}
if(rnd==3){op1=qbank[qNumber][3];op2=qbank[qNumber][4];op3=qbank[qNumber][2];}
if(rnd==2){op1=qbank[qNumber][4];op2=qbank[qNumber][2];op3=qbank[qNumber][3];}

$(obj2).append('<div class="tf1">'+qbank[qNumber][1]+'</div><div id="1" class="tf1b"  >'+op1+'</div><div id="2" class="tf1b"  >'+op2+'</div><div id="3" class="tf1b"  >'+op3+'</div>');

$('.tf1b').hover(function(){if(qlock==false){
    $(this).css('background-color','silver'); 
}},function(){if(qlock==false){
    $(this).css('background-color','rgba(255,255,255,0.5)');
}});

$('.tf1b').click(function(){//alert($('#'+this.id).css('width'));
			if(qlock==false){qlock=true;	
			$('#'+this.id).css('color','white');//$('.tf1b').css('color','white');
			
			 
			//correct answer
			if(this.id==rnd){$('#'+this.id).css('background-color','green');//$('.tf1').css('background-color','green');//$(obj2).css('background-color','green');
				$('#'+this.id).css('border','1px solid #dcdcdc'); 
				//if(cwidth>799){$(obj2).append('<div class="feedback1">CORRECT</div>');}
				$(obj2).append('<div class="feedback1">CORRECT</div>');
				$('.feedback1').css('background-color','green');
				score1++;correct=true;
				
				}
			//wrong answer	
			if(this.id!=rnd){$('#'+this.id).css('background-color','red');
				//if(cwidth>799){$(obj2).append('<div class="feedback1">WRONG</div>');}
				$(obj2).append('<div class="feedback1">WRONG</div>');
				$('.feedback1').css('background-color','red');
				$('#'+this.id).css('border','1px solid #dcdcdc');
				score2++;
				}
			$('#feedback').empty();
			
			$('#score1').empty();
			$('#score1').append('<img src="tick.png"> '+score1);
			$('#score2').empty();
			$('#score2').append('<img src="cross.png"> '+score2);
			if(cwidth<800){$('#feedback').append('<br>');}
			$('#feedback').append(qbank[qNumber][5]);
			setTimeout(function(){deleteQuestion(correct)},1000);
			
			}})

	}//mcq1 game

///////////////////////////////////////////////////////////////////////////////////////////


function endGame(){
	 $(obj2).empty();$('#score1').empty();$('#score2').empty();$('#feedback').empty();
	$(obj2).append('<div class="eg1">You have completed the activity!</div>');
	$(obj2).append('<div class="eg2">Correct Answers: '+score1+'<br>Wrong Answers: '+score2+'</div>');
	$(obj2).append('<div class="eg3">click anywhere to try again</div>');
	$('#navContent').click(function(){
			if(qlock==false){qlock=true;
			$('#navContent').off('click');
			$(obj2).css('right','-800px');
			$(obj1).css('right','-800px');
			resetDB();
			}})
}//endGame



	function deleteQuestion(a){
		if(a==true){qbank.splice(qNumber,1);}
		changeQuestion();
	}//adjust db






function chooseGame(){
	$(obj2).empty();
	$(obj2).css('background-color','transparent');
	var choice;
	if(qbank.length>0){choice=qbank[qNumber][0];}
	
	if(qbank.length==0){choice="FinalScreen";}
	if(begin){begin=false;choice="IntroScreen";}
	if(choice=="IntroScreen"){startGame();}
	if(choice=="mcq"){mcq1Game();}
	if(choice=="FinalScreen"){endGame();}
}//choosegame



function showGlossary(){
	$(obj2).empty();
	qbank2=[];
	for(i=0;i<qbank.length;i++){
		typeArray=[];
		typeArray=qbank[i][5].split("=");
		
		qbank2[i]=typeArray;
		
	}
		 $('#navContent').css("height","290px");
	 $('#game1').css("height","290px");
	qbank2.sort();  
	 $(obj2).append('<div id="home2">HOME</div');
	 for(i=0;i<qbank2.length;i++){
		 $(obj2).append('<div class="element">'+qbank2[i][0]+'</div>');
		 $(obj2).append('<div class="element2">'+qbank2[i][1]+'</div>');
		 $(obj2).append('<div class="spacer5"></div>');
	 }//for
	 

	 $('#home2').click(function(){$(obj2).empty();startGame();});
	 
}//showgloss




});//doc ready