const fs = require("fs"); 
const process = require("process");
let rawdata = fs.readFileSync("users.json");
const data = JSON.parse(rawdata);
const attribut = process.argv[2];
const tab = [];

// fonction qui permet de savoir si string est dans le tableau
function isIn(tableau, string,type){
    for(let i = 0;i<tableau.length;i++){
        if(tableau[i][type] == string){
            return true;
        }
    }
    return false;
}

//boucle qui permet de lister les différent attribut avec un compteur
for(let i = 0; i < data.length; i++){
    if(!isIn(tab,data[i][attribut],attribut)){
        //Listing all the different tab
        let obj = {[attribut]:data[i][attribut], counter:1};
        tab.push(obj);
    }
    else{   
        let j = 0;
        while(tab[j][attribut] != data[i][attribut]){ 
            j++;
        }
        tab[j].counter++ ;
    }
}
// permet de trier les éléments par rapport au compteur
tab.sort((a, b) => b.counter - a.counter);
console.log(tab);


