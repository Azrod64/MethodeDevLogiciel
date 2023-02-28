const { timeStamp } = require('console');
const fs = require('fs'); 
let rawdata = fs.readFileSync('users.json','utf8');
var args = process.argv;

let att = 'country';


const data = JSON.parse(rawdata);


let companies = [];

function isIn(companytable, string){
    for(let i = 0;i<companytable.length;i++){
        if(companytable[i].Company == string){
            return true;
        }
    }
    return false;
}

function distinct(attribut)
{
    for(let i = 0; i < data.length; i++){
        if(!isIn(companies,data[i][attribut])){
            //Listing all the different companies
            let obj = {Company:data[i][attribut], Count:1};
            companies.push(obj);
        }
        else{   
            let j = 0;
            while(companies[j].Company != data[i][attribut]){ 
                j++;
            }
            companies[j].Count++ ;
        }
    }
    
    
    for(let i = 0;i < companies.length;i++){ 
        let tmp = companies[i];
        let j = i-1;
        while((j>=0) && (companies[j].Count < tmp.Count)){
            companies[j+1] = companies[j];
            j--;
        }
        companies[j+1] = tmp;
    }

    console.log(companies);
}

distinct(att);
