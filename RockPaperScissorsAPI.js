values={'rock':1, 'paper':2, 'scissors':3}
arr=['rock', 'paper', 'scissors']

//Returns a random choice from giveen array
function choice(arr) {
  return arr[Math.floor(Math.random() * 3)];
}
//Returns value of the given choice
function value_eval(arr) {
  values={'rock':1, 'paper':2, 'scissors':3}
  a=[];
  for(var i=0; i<4; i++){
    a[i]=values[arr[i]];
  }
  return a;
}
//Gives an array of results of ith player 
function result(arr,i) {
  a=new Array(4);
  for(var j=0; j<4; j++){
    if(j!=i){
      d=arr[i]-arr[j];
      if(d==-2||d==1){
        a[j]=1;
      }
      else{
        a[j]=0;
      } 
    }
    else{
      a[j]='-';
    }
  }
  return a;
}
//Calculates points from a given array
function points(arr){
  p=0
  for(var i=0; i<4; i++){
    if(arr[i]==1){
      p+=1
    }
  }
  return p;
}
//Returns a json of players points choice and result
function json_res(arr) {
  res={};
  for(var i=0; i<4; i++ ){
    key='player'+((i+1).toString());
    res[key]={points:points(result(arr,i)), choice :pc[i], result :result(arr,i)};
  }
  return res;
}

var json_arr=[]
for(var i=0; i<50; i++){
  pc=[choice(arr),choice(arr),choice(arr),choice(arr)];//An array of choices of the players
  pc_val=value_eval(pc);//An array of value of choices of the players
  element=json_res(pc_val);
  json_arr.push(element);
  
}
//Resultant JSON string of all 50 iterations
result_json=JSON.stringify(json_arr)

//EXPRESS
var express = require('express');
var app = express();

app.get('/game/start', function (req, res) {
  res.send(result_json)
})

var server = app.listen(8081, function () {
   console.log("Listening at http://127.0.0.1:8081/game/start")
})
