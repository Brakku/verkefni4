"use strict"

let datas = {
    vorur:[
    {nafn:"hjól",verð:"1000 kr",id:1},
    {nafn:"spil",verð:"500 kr",id:2},
    {nafn:"talva",verð:"500000 kr",id:3},
    {nafn:"borð",verð:"90000 kr",id:4},
    {nafn:"nammi",verð:"500 kr",id:5}
    ]
};

if (localStorage.getItem("data") === null) {
    localStorage.setItem("data", JSON.stringify(datas));
};

let data = JSON.parse(localStorage.getItem("data"));

$( "form" ).on( "submit", function( event ) {
    let x = $( this ).serializeArray();
    custeladder(x[0]["value"],x[1]["value"]);
    event.preventDefault();
});

let arrayLength = data["vorur"].length;
let idtrack = 0;

function elremover(id){
    document.getElementById(id).remove();
    for (var i = 0; i < data["vorur"].length; i++) {
        if (data["vorur"][i]["id"]===id){
            data["vorur"].splice(i,1);
        };
    };
    localStorage.setItem("data", JSON.stringify(data));
    heild();
};

function heild(){
    arrayLength=data["vorur"].length;
    let sum = 0;
    for (var i = 0; i < arrayLength; i++) {
        let str = data["vorur"][i]["verð"]
        let matches = str.match(/(\d+)/);
        sum=sum+Number(matches[0])
    };

    document.getElementById("heildar").innerHTML="heildarverð vara: "+sum;
};

function eladder(i){
    const neelm = document.createElement("div");
    neelm.setAttribute("id", data["vorur"][i]["id"]);
    const neels1 = document.createElement("p");
    const text1 = document.createTextNode(data["vorur"][i]["nafn"]);
    const neels2 = document.createElement("p");
    const text2 = document.createTextNode(data["vorur"][i]["verð"]);
    const button = document.createElement("button");
    button.setAttribute("onclick","elremover("+data["vorur"][i]["id"]+")");
    const rtext = document.createTextNode("remove me");
    neels1.appendChild(text1);
    neels2.appendChild(text2);
    button.appendChild(rtext);
    neelm.appendChild(neels1);
    neelm.appendChild(neels2);
    neelm.appendChild(button);
    const element = document.getElementById("main");
    element.appendChild(neelm);
    heild();
    idtrack++;
};

function custeladder(nafne,verd){
    arrayLength = data["vorur"].length;
    data["vorur"].push({nafn:nafne,verð:verd,id:idtrack})
    localStorage.setItem("data", JSON.stringify(data));
    const neelm = document.createElement("div");
    neelm.setAttribute("id", idtrack);
    const neels1 = document.createElement("p");
    const text1 = document.createTextNode(nafne);
    const neels2 = document.createElement("p");
    const text2 = document.createTextNode(verd);
    const button = document.createElement("button");
    button.setAttribute("onclick","elremover("+idtrack+")");
    const rtext = document.createTextNode("remove me");
    neels1.appendChild(text1);
    neels2.appendChild(text2);
    button.appendChild(rtext);
    neelm.appendChild(neels1);
    neelm.appendChild(neels2);
    neelm.appendChild(button);
    const element = document.getElementById("main");
    element.appendChild(neelm);
    heild();
    idtrack++;
}

for (var i = 0; i < arrayLength; i++) {
    eladder(i);
};
