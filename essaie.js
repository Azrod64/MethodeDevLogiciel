// importation des modules
const fs = require("fs");
const inquirer = require("inquirer");

// lecture du fichier "user.json"
let rawdata = fs.readFileSync("users.json");
const data = JSON.parse(rawdata);

// fonction qui permet de savoir si string est dans le tableau
function isIn(tableau, string, type) {
    for (let i = 0; i < tableau.length; i++) {
        if (tableau[i][type] == string) {
            return true;
        }
    }
    return false;
}

//fonction qui permet de lister les différent attribut avec un compteur
function distinct(attribut) {
    const tab = [];
    for (let i = 0; i < data.length; i++) {
        if (!isIn(tab, data[i][attribut], attribut)) {
            //Listing all the different tab
            let obj = { [attribut]: data[i][attribut], counter: 1 };
            tab.push(obj);
        }
        else {
            let j = 0;
            while (tab[j][attribut] != data[i][attribut]) {
                j++;
            }
            tab[j].counter++;
        }
    }
    // permet de trier les éléments par rapport au compteur de façon décroissante
    tab.sort((a, b) => b.counter - a.counter);
    console.log(tab);
}

// fonction fait appelle à un menu
async function main() { // utilisation de async pour renvoyer une promesse
    let stop = false;
    while(!stop)
    {
        await inquirer.prompt([ // await permet d'attendre que la promesse ce réalise
            {
                type: "list",
                name: "attribute",
                message: "Select a category",
                choices: ["country", "company", new inquirer.Separator(), "quit"],
            }
        ]).then((answers) => {
            if (answers.attribute == "quit") {
                stop = true;
                return;
            }
            console.table(distinct(answers.attribute));
        });
    }
    
}

//Lancement du programme main
main();