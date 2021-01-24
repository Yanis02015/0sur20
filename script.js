var iMenu = 0;
function openNav() {
    var a = document.getElementById("nav");
    if(iMenu === 1){
        a.style.paddingLeft = "0px";
        a.style.paddingRight = "0px";
        a.style.width = "0px";
        iMenu=0;
    } else{
        a.style.paddingLeft = "15px";
        a.style.width = "180px";
        iMenu=1;
    }
}

// Véréfier si tous les champ ont était rempli
var iFromValidity = 0;
function fromValidation(){
    var fromValidity = document.forms["post-form"].checkValidity();
    if(fromValidity){
        calculate();
    }else{ //Juste une alerte après chaque 9 essaies foireux
        iFromValidity++;
        if(iFromValidity%9 === 0){
            alert("Merci de bien vouloir remplir tous les champs");
        }
    }
}

// Calculer la moyenne
var iLine = 0;
var arrayMoyenne = [];
function calculate() {
    var moy = 0;
    var totalCoef = 0;
    arrayMoyenne = [];
    for(var j=0; j <= iLine;j++){
        let emd = document.getElementById("emd-"+j).value;
        let td = document.getElementById("td-"+j).value;
        let tp = document.getElementById("tp-"+j).value;
        let coef = document.getElementById("coef-"+j).value;
        emd = parseFloat(emd);
        td = parseFloat(td);
        tp = parseFloat(tp);
        coef = parseFloat(coef);
        totalCoef += coef;
        moy += choice(emd,td,tp)*coef;
        console.log(choice(emd,td,tp)*coef);
        
        arrayMoyenne.push(choice(emd,td,tp));
    }
    moy /= totalCoef;
    moy += 0.004;
    moy = moy.toFixed(2); //deux chiffre après la virgule
    moy = moy.toString().padStart(5, '0');
    var Average = document.getElementById("number");
    Average.textContent = moy;
    window.location.replace("#section-result"); // Simple scroll to #section-result
    addOutputModule();
    fillModuleOutput();
}

function choice(a,z,e) {
    let moy1, moy2, moyenne;
    if(z!==-1 && e !==-1){
        moy1 = a*0.6 + (z/2 + e/2)*0.4;
        moy2 = a*2 + z + e;
        moy2 /= 4;
    } else if(z == -1 && e !==-1) {
            moy1 = a*0.6 + e*0.4;
            moy2 = a*2 + e;
            moy2 /= 3;
        }else if(e == -1 && z !==-1) {
            moy1 = a*0.6 + z*0.4;
            moy2 = a*2 + z;
            moy2 /= 3;
            }else {
                moy1 = a;
                moy2 = a;
            }
    if(moy1>=moy2){
        moyenne = moy1;
    }else{
        moyenne = moy2;
    }
    return (moyenne+0.004).toFixed(2);
}

// L'ajout de ligne d'input
function add() {
    iLine++;
    var container = document.getElementsByClassName("input-bottom");
    var line = document.createElement("div");
    line.className = "line";

    var emdName = document.createElement("div");
    emdName.className = "emd-name";

    var divEmd = document.createElement("div");
    var divBreak = document.createElement("break");
    divBreak.className = "break";
    divBreak.style.width = "0px"
    var divTd = document.createElement("div");
    var divTp = document.createElement("div");
    var divCoef = document.createElement("div");
    divCoef.setAttribute("id","coef");

    var inputName = document.createElement("input");
    inputName.setAttribute('id',"name-"+iLine);
    inputName.setAttribute('required',"required");
    inputName.type = "text";
    inputName.placeholder = "Set Name";
    inputName.removeAttribute('autocomplete');

    var inputEmd = document.createElement("input");
    inputEmd.setAttribute('id',"emd-"+iLine);
    inputEmd.setAttribute('required',"required");
    inputEmd.setAttribute('step',"0.01");
    inputEmd.max="20";
    inputEmd.min="-1";
    inputEmd.type = "number";
    inputEmd.placeholder = "EMD";

    var inputTd = document.createElement("input");
    inputTd.setAttribute('id',"td-"+iLine);
    inputTd.setAttribute('required',"required");
    inputTd.setAttribute('step',"0.01");
    inputTd.max="20";
    inputTd.min="-1";
    inputTd.type = "number";
    inputTd.placeholder = "TD";

    var inputTp = document.createElement("input");
    inputTp.setAttribute('id',"tp-"+iLine);
    inputTp.setAttribute('required',"required");
    inputTp.setAttribute('step',"0.01");
    inputTp.max="20";
    inputTp.min="-1";
    inputTp.type = "number";
    inputTp.placeholder = "TP";

    var inputCoef = document.createElement("input");
    inputCoef.setAttribute('id',"coef-"+iLine);
    inputCoef.setAttribute('required',"required");
    inputCoef.max="20";
    inputCoef.min="1";
    inputCoef.type = "number";
    inputCoef.value = "2";

    emdName.appendChild(inputName);
    divEmd.appendChild(inputEmd);
    divTd.appendChild(inputTd);
    divTp.appendChild(inputTp);
    divCoef.appendChild(inputCoef);

    line.appendChild(emdName);
    line.appendChild(divEmd);
    line.appendChild(divBreak);
    line.appendChild(divTd);
    line.appendChild(divTp);
    line.appendChild(divCoef);
    
    container[0].appendChild(line);
    checkDelet();
}

function addOutputModule(){
    var container = document.getElementsByClassName("module-result");
    container[0].innerHTML="";
    for(var j=0; j<=iLine; j++){

        var line = document.createElement("div");
        line.className = "line";

        var moduleName = document.createElement("div");
        moduleName.className = "module-name";

        var divEmpty1 = document.createElement("div");
        var divEmpty2 = document.createElement("div");

        var noteModule = document.createElement("div");
        noteModule.className = "note-module";

        var pModuleName = document.createElement("p");
        pModuleName.setAttribute("id","module-"+j);

        var pModuleNote = document.createElement("p");
        pModuleNote.setAttribute("id","note-"+j);

        divEmpty1.appendChild(pModuleName);
        divEmpty2.appendChild(pModuleNote);
        moduleName.appendChild(divEmpty1);
        noteModule.appendChild(divEmpty2);
        line.appendChild(moduleName);
        line.appendChild(noteModule);

        container[0].appendChild(line);
    }
}

function fillModuleOutput() {
    for(var j=0; j<=iLine;j++){
        let nameModule = document.getElementById("name-"+j).value; //input
        nameModule = checkName(nameModule);
        let pModuleName = document.getElementById("module-"+j); //input
        let pModuleNote = document.getElementById("note-"+j); //input
        pModuleName.innerText = nameModule;
        pModuleNote.innerText = arrayMoyenne[j];
    }
}

function checkName(string) {
    var checkSpace = string.includes(" ");
    if(checkSpace) {
        var splitString = string.split(" ");
        string ="";
        for(var j=0;j<splitString.length;j++){
            string+=splitString[j].charAt(0);
        }
    }
    if(string.length > 6){
        var stringLong= "";
        for(var i = 0; i<6; i++) {
            stringLong += string.charAt(i);
        }
        string = stringLong;
    }
    return string;
}

// Supprimer la derniere ligne ajouter
function delet() {
    if(iLine>0){
        var line = document.getElementsByClassName("line");
        var container = document.getElementsByClassName("input-bottom");
        container[0].removeChild(line[iLine]);
        iLine--;
    }
    checkDelet();
}

// Activer ou désactiver le button supprimer
function checkDelet() {
    var delet = document.getElementById("btn-delet");
    if(iLine<=0){
        delet.style.cursor = "not-allowed";
    } else{
        delet.style.display = "inline";
        delet.style.cursor = "pointer";
    }
}


// Désolé cette option est en cours de dévloppement :
function notAvailable() {
    alert("Navré cette section est en cours de dévloppement !");
}