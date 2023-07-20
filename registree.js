localStorage.setItem('displayBack','1');

let backButton=document.getElementById('back-button');
backButton.addEventListener('click',()=>{
    window.location.href='display.html';
})

let registree=JSON.parse(localStorage.getItem('registree'));
let infoEelements=document.getElementsByTagName('p');
infoEelements[2].innerHTML=registree.fname+" "+registree.lname;
infoEelements[3].innerHTML=registree.email;
infoEelements[4].innerHTML=registree.gender;
infoEelements[5].innerHTML=registree.phone;
infoEelements[6].innerHTML=registree.univ;
infoEelements[7].innerHTML=registree.maj;
infoEelements[8].innerHTML=registree.status;
infoEelements[9].innerHTML=registree.motivation;


const storedData=localStorage.getItem('myData');
const displayArray=JSON.parse(storedData);

let ids=JSON.parse(localStorage.getItem('displayIDs'));

//displayed is an array that contains the objects that their id are contained in ids
//find the index of our current registree
//next => id++
//prev => id--
//registree=displayArray[id]

let displayed=displayArray.filter((element)=>{
    if(ids.includes('' + element.id)){
        return true;
    }
    else return false;
})

let index=displayed.findIndex((object)=>{
    return object.id==registree.id;
})

if(index<displayed.length)
{
    let nextReg=displayed[index+1];
}
if(index>0){
    let prevReg=displayed[index-1];
}

let prevButton=document.getElementById('prevReg');
prevButton.addEventListener('click',()=>{
    if(index>0){
        let prevReg=displayed[index-1];
        localStorage.setItem('registree',JSON.stringify(prevReg));
        window.location.href='registree.html';
    }
    else{
        alert('No more previous registrees!');
    }
})
function showNext(){
    if(index<displayed.length-1){
        let nextReg=displayed[index+1];
        localStorage.setItem('registree',JSON.stringify(nextReg));
        window.location.href='registree.html';
    }
    else{
        alert('No more registrees!');
    }
}

let nextButton=document.getElementById('nextReg');
nextButton.addEventListener('click',()=>{
    showNext();
})

let accept=document.getElementById('acceptReg');
accept.addEventListener('click',(event)=>{
    event.preventDefault();

    for(let i=0; i<displayArray.length; i++){
        if(displayArray[i].id===registree.id){
            displayArray[i].status=registree.status='Accepted';
            localStorage.setItem('myData',JSON.stringify(displayArray));
            // localStorage.setItem('registree',JSON.stringify(registree));
            // window.location.href='registree.html';
            infoEelements[8].innerHTML=registree.status;
            showNext();
        }
    }
})

let reject=document.getElementById('rejectReg');
reject.addEventListener('click',(event)=>{
    event.preventDefault();

    for(let i=0; i<displayArray.length; i++){
        if(displayArray[i].id===registree.id){
            displayArray[i].status=registree.status='Rejected';
            localStorage.setItem('myData',JSON.stringify(displayArray));
            infoEelements[8].innerHTML=registree.status;
            // localStorage.setItem('registree',JSON.stringify(registree));
            // window.location.href='registree.html';
            showNext();
        }
    }
})

