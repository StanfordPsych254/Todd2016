function showSlide(id) {
  $(".slide").hide();
  $("#"+id).show();
}

function random(a,b) {
  if (typeof b == "undefined") {
    a = a || 2;
    return Math.floor(Math.random()*a);
  } else {
    return Math.floor(Math.random()*(b-a+1)) + a;
  }
}

Array.prototype.random = function() {
  return this[random(this.length)];
}

Array.prototype.shuffle = function() {
  var i = this.length, j, tempi, tempj;
  if ( i == 0 ) return false;
  while ( --i ) {
     j       = Math.floor( Math.random() * ( i + 1 ) );
     tempi   = this[i];
     tempj   = this[j];
     this[i] = tempj;
     this[j] = tempi;
  }
  return this;
}

//PRE-LOAD IMAGES
// By creating image object and setting source, images preload
var whitefaceimages = ["w01","w02","w03","w04","w05","w06"]
var blackfaceimages = ["b01","b02","b03","b04","b05","b06"]
var gunimages = ["g1","g2","g3","g4","g5","g6"]
var toyimages = ["t1","t2","t3","t4","t5","t6"]
var images = new Array() 
for (i=0;i<6;i++) {//loop through images you want to use
    images[i] = new Image()
    images[i].src =  "http://www.stanford.edu/~cinoolee/PSYC254/images/" + whitefaceimages[i] + ".bmp"
    images[i] = new Image()
    images[i].src =  "http://www.stanford.edu/~cinoolee/PSYC254/images/" + blackfaceimages[i] + ".bmp"
    images[i] = new Image()
    images[i].src =  "http://www.stanford.edu/~cinoolee/PSYC254/images/" + gunimages[i] + ".bmp"
    images[i] = new Image()
    images[i].src =  "http://www.stanford.edu/~cinoolee/PSYC254/images/" + toyimages[i] + ".bmp"    
}
var mask = new Image()
    mask.src =  "http://www.stanford.edu/~cinoolee/PSYC254/images/Mask.bmp"


var allKeyBindings = [
      {"p": "gun", "q": "toy"},
      {"p": "toy", "q": "gun"} ],
    allPracticeTrialOrders = [],
    allTrialOrders = [],
    myKeyBindings = allKeyBindings.random(),
    pFair = (myKeyBindings["p"] == "toy");
    fairKey = "";
    unfairKey = "";
    if (myKeyBindings["p"] == "gun") {
      fairKey = "P";
      unfairKey = "Q";      
      leftKey = "gun";
      rightKey = "toy";
    } else {
      fairKey = "Q";
      unfairKey = "P";
      leftKey = "toy";
      rightKey = "gun";
    }
    practiceTrialNumber: 0;
    allPracticeTrialWhiteFaces = ["w01","w02","w03","w04","w05","w06"],
    allPracticeTrialBlackFaces = ["b01","b02","b03","b04","b05","b06"],
    allPracticeTrialWhiteTools = ["g1","g2","g3","g4","g5","g6","t1","t2","t3","t4","t5","t6"],
    allPracticeTrialBlackTools = ["g1","g2","g3","g4","g5","g6","t1","t2","t3","t4","t5","t6"],
    allPracticeTrialOrder = ["w","w","w","w","b","b","b","b","w","w","w","w","b","b","b","b","w","w","w","w","b","b","b","b"],
    allTrialWhiteFaces = ["w01","w02","w03","w04","w05","w06","w01","w02","w03","w04","w05","w06","w01","w02","w03","w04","w05","w06"],
    allTrialBlackFaces = ["b01","b02","b03","b04","b05","b06","b01","b02","b03","b04","b05","b06","b01","b02","b03","b04","b05","b06"],
    allTrialWhiteTools = ["g1","g2","g3","g4","g5","g6","t1","t2","t3","t4","t5","t6","g1","g2","g3","g4","g5","g6","t1","t2","t3","t4","t5","t6","g1","g2","g3","g4","g5","g6","t1","t2","t3","t4","t5","t6","g5","g6","t5","t6"],
    allTrialBlackTools = ["g1","g2","g3","g4","g5","g6","t1","t2","t3","t4","t5","t6","g1","g2","g3","g4","g5","g6","t1","t2","t3","t4","t5","t6","g1","g2","g3","g4","g5","g6","t1","t2","t3","t4","t5","t6","g5","g6","t5","t6"],
    allTrialOrder = ["w","w","w","w","w","w","b","b","b","b","b","b","w","w","w","w","w","w","b","b","b","b","b","b","w","w","w","w","w","w","b","b","b","b","b","b","w","w","w","w","b","b","b","b"],
    example1 = "g5",
    example2 = "t5",
    myPracticeTrialWhiteFacesOrder = allPracticeTrialWhiteFaces.shuffle(),
    myPracticeTrialBlackFacesOrder = allPracticeTrialBlackFaces.shuffle(),
    myPracticeTrialWhiteToolsOrder = allPracticeTrialWhiteTools.shuffle(),
    myPracticeTrialBlackToolsOrder = allPracticeTrialBlackTools.shuffle(),
    myPracticeTrialOrder = allPracticeTrialOrder.shuffle(),
    myTrialWhiteFacesOrder = allTrialWhiteFaces.shuffle(),
    myTrialBlackFacesOrder = allTrialBlackFaces.shuffle(),
    myTrialWhiteToolsOrder = allTrialWhiteTools.shuffle(),
    myTrialBlackToolsOrder = allTrialBlackTools.shuffle(),
    myTrialOrder = allTrialOrder.shuffle(),

$("#fair-key").html(fairKey);
$("#unfair-key").html(unfairKey);
$("#left-key").html(leftKey);
$("#right-key").html(rightKey);
$("#left-key2").html(leftKey);
$("#right-key2").html(rightKey);
$("#left-key3").html(leftKey);
$("#right-key3").html(rightKey);
showSlide("instructions");

var timeOut;

var practice = {
  whiteFaceTrials: myPracticeTrialWhiteFacesOrder,
  blackFaceTrials: myPracticeTrialBlackFacesOrder,
  whiteToolTrials: myPracticeTrialWhiteToolsOrder,
  blackToolTrials: myPracticeTrialBlackToolsOrder,
  trialOrder: myPracticeTrialOrder,
  keyBindings: myKeyBindings,
  faceInput: "",
  toolInput: "",
  data: [],
  url1: "http://www.stanford.edu/~cinoolee/PSYC254/images/"+example1+".bmp",
  url2: "http://www.stanford.edu/~cinoolee/PSYC254/images/"+example2+".bmp",
  trialNumber: 0,
  end: function() {
    showSlide("realTrialsInstructions");
  },
  instructions: function() {
    showSlide("practiceInstructions");      
    $("#imgexample1").html('<img src="'+practice.url1+'">');
    $("#imgexample2").html('<img src="'+practice.url2+'">');
  },
  next: function() {
    var typeTrial = practice.trialOrder.shift();
    if (typeof typeTrial == "undefined") {
      return practice.end();
    }
    if (typeTrial == "w") {
      practice.faceInput = practice.whiteFaceTrials.shift();
      practice.toolInput = practice.whiteToolTrials.shift();
    }
    else if (typeTrial == "b") {
      practice.faceInput = practice.blackFaceTrials.shift();
      practice.toolInput = practice.blackToolTrials.shift();
    }
    var url ="http://www.stanford.edu/~cinoolee/PSYC254/images/"+practice.faceInput+".bmp";
    return practice.face();
  },
  face: function() {
    var url ="http://www.stanford.edu/~cinoolee/PSYC254/images/"+practice.faceInput+".bmp";
    showSlide("stage");
    $("#image").html('<img src="'+url+'">');    
    setTimeout(practice.tool, 200);
  },
  tool: function() {
    practice.trialNumber++;
    if (practice.trialNumber > 8) {
      if (practice.trialNumber > 16) {
        var timeOut = setTimeout(practice.slow, 1000);
      }
      else {
        var timeOut = setTimeout(practice.slow, 2000);        
      }
    }
    var url ="http://www.stanford.edu/~cinoolee/PSYC254/images/"+practice.toolInput+".bmp";
    showSlide("stage");
    $("#image").html('<img src="'+url+'">');
    var startTime = (new Date()).getTime();
    setTimeout(practice.mask1, 200);
  },
  mask1: function() {
    var url ="http://www.stanford.edu/~cinoolee/PSYC254/images/Mask.bmp";
    showSlide("stage");
    $("#image").html('<img src="'+url+'">');    
    var keyPressHandler = function(event) {
      var keyCode = event.which;      
      if (keyCode != 81 && keyCode != 80) {
        $(document).one("keydown", keyPressHandler);        
      } else {
        var endTime = (new Date()).getTime(),
            key = (keyCode == 80) ? "p" : "q",
            userParity = experiment.keyBindings[key];
        $("#number").html("");
        if (practice.trialNumber > 8){
          window.clearTimeout(timeOut);
        }
        practice.pass();    
      }
    };
    $(document).one("keydown", keyPressHandler);
     },
  pass: function() {
    var url ="http://www.stanford.edu/~cinoolee/PSYC254/images/pass.png";
    showSlide("stage");
    $("#image").html('<img src="'+url+'">');
    var keyPressHandler = function(event) {
      var keyCode = event.which;      
      if (keyCode != 32) {
        $(document).one("keydown", keyPressHandler);        
      } else {
        setTimeout(practice.next, 500);    
      }
    };
    $(document).one("keydown", keyPressHandler);
  },
  slow: function() {
    $(document).unbind();
    var url ="http://www.stanford.edu/~cinoolee/PSYC254/images/red.png";
    showSlide("stage");
    $("#image").html('<img src="'+url+'">');
    var keyPressHandler = function(event) {
      var keyCode = event.which;      
      if (keyCode != 32) {
        $(document).one("keydown", keyPressHandler);        
      } else {
        setTimeout(practice.next, 500);    
      }
    };
    $(document).one("keydown", keyPressHandler);
  }
}

var experiment = {
  whiteFaceTrials: myTrialWhiteFacesOrder,
  blackFaceTrials: myTrialBlackFacesOrder,
  whiteToolTrials: myTrialWhiteToolsOrder,
  blackToolTrials: myTrialBlackToolsOrder,
  trialOrder: myTrialOrder,
  keyBindings: myKeyBindings,
  faceInput: "",
  toolInput: "",
  faceType: "",
  toolType: "",
  data: [],
  demographicsData: [],
  end: function() {
    showSlide("demographics");
  },
  instructions: function() {
    showSlide("practiceInstructions");      
  },
  next: function() {
    var typeTrial = experiment.trialOrder.shift();
    if (typeof typeTrial == "undefined") {
      return experiment.end();
    }
    if (typeTrial == "w") {
      experiment.faceInput = experiment.whiteFaceTrials.shift();
      experiment.toolInput = experiment.whiteToolTrials.shift();
    }
    else if (typeTrial == "b") {
      experiment.faceInput = experiment.blackFaceTrials.shift();
      experiment.toolInput = experiment.blackToolTrials.shift();
    }
    experiment.faceType = typeTrial;
    var toolString = ""+experiment.toolInput+"";
    experiment.toolType = toolString.charAt(0);
    return experiment.face();
  },
  face: function() {
    $(document).unbind();
    var url ="http://www.stanford.edu/~cinoolee/PSYC254/images/"+experiment.faceInput+".bmp";
    showSlide("stage");
    $("#image").html('<img src="'+url+'">');    
    setTimeout(experiment.tool, 200);
  },
  tool: function() {
    var timeOut = setTimeout(experiment.slow, 700);  
    var url ="http://www.stanford.edu/~cinoolee/PSYC254/images/"+experiment.toolInput+".bmp";
    showSlide("stage");
    $("#image").html('<img src="'+url+'">');
    var realParity = (experiment.toolType=="s")?"gun":"toy";
    var startTime = (new Date()).getTime();
    var maskOut=setTimeout(function(){ 
		showSlide("stage");
    	$("#image").html('<img src="http://stanford.edu/~cinoolee/PSYC254/images/Mask.bmp">');
  		}
  	,200);
    var keyPressHandler = function(event) {
      var keyCode = event.which;      
      if (keyCode != 81 && keyCode != 80) {
        $(document).one("keydown", keyPressHandler);        
      } else {
        var endTime = (new Date()).getTime(),
            key = (keyCode == 80) ? "p" : "q",
            userParity = experiment.keyBindings[key];
            data = {
              race: experiment.faceType,
              gun: experiment.toolType,
              raceStim: experiment.faceInput,
              gunStim: experiment.toolInput,
              accuracy: realParity == userParity ? 1 : 0,
              rt: endTime - startTime,
              responded: 1
            };
        experiment.data.push(data);
        $("#number").html("");
        window.clearTimeout(timeOut);
        window.clearTimeout(maskOut);
        setTimeout(experiment.pass, 100);    
      }
    };
    $(document).one("keydown", keyPressHandler);

   },
  pass: function() {
    var url ="http://www.stanford.edu/~cinoolee/PSYC254/images/pass.png";
    showSlide("stage");
    $("#image").html('<img src="'+url+'">');
    var keyPressHandler = function(event) {
      var keyCode = event.which;      
      if (keyCode != 32) {
        $(document).one("keydown", keyPressHandler);        
      } else {
        setTimeout(experiment.next, 500);    
      }
    };
    $(document).one("keydown", keyPressHandler);
  },
  slow: function() {
    $(document).unbind();
    data = {
      race: experiment.faceType,
      tool: experiment.toolType,
      raceStim: experiment.faceInput,
      toolStim: experiment.toolInput,
      accuracy: 0,
      rt: 0,
      responded: 0
    };        
    experiment.data.push(data);
    var url ="http://www.stanford.edu/~cinoolee/PSYC254/images/red.png";
    showSlide("stage");
    $("#image").html('<img src="'+url+'">');
    var keyPressHandler = function(event) {
      var keyCode = event.which;      
      if (keyCode != 32) {
        $(document).one("keydown", keyPressHandler);        
      } else {
        setTimeout(experiment.next, 500);    
      }
    };
    $(document).one("keydown", keyPressHandler);  }
}

var demographics = {
    saveResult: function() {
    var age = $('input[name="Age"]').val();
    var male = $('input[name="Gender"]:checked').val();
    var ethnicity = $('input[name="Ethnicity"]:checked').val();
    var socioeconomicStatus = $('input[name="SES"]:checked').val();
    var religiousAffiliation = $('input[name="ReligiousAffiliation"]').val();
    var religiousAttendance = $('input[name="ReligiousAttendance"]:checked').val();
    var education = $('input[name="Education"]:checked').val();
    var citizen = $('input[name="Citizen"]:checked').val();
    var political = $('input[name="Political"]:checked').val();
    var comments = $('input[name="Comments"]').val();
    if (typeof age == "undefined" || typeof male == "undefined" || typeof ethnicity == "undefined"
        || socioeconomicStatus == "undefined" || religiousAffiliation == "undefined" || religiousAttendance == "undefined"
        || education == "undefined" || citizen == "undefined" || political == "undefined") {
            window.alert("Please respond to all of the questions on this page.");      
    }
    else {
      data = {
        Age: age,
        Male: male,
        Ethnicity: ethnicity,
        SES: socioeconomicStatus,
        ReligiousAffiliation: religiousAffiliation,
        ReligiousAttendance: religiousAttendance,
        Education: education,
        Citizen: citizen,
        Political: political,
        Comments: comments
      };
      experiment.demographicsData.push(data);    
      showSlide("finished");
      setTimeout(function() { turk.submit(experiment) }, 1500);
    }
  }
}