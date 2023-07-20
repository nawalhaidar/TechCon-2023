let keys=['fname','lname', 'email','gender','phone', 'birthdate','univ', 'maj','status','id'];

localStorage.setItem('ascending', '1');
let tablee=document.getElementById('table');
if(tablee){

    const storedData=localStorage.getItem('myData');
    const displayArray=JSON.parse(storedData);

    function addtr(i){
        let row=document.createElement('tr');
        let column;

        for(let j=0;j<keys.length;j++){
            column=document.createElement('td');
            const text=document.createTextNode(displayArray[i][keys[j]]);
            column.appendChild(text);

            row.appendChild(column);
            if(j===keys.length-1){
                column.style.display='none';
            }
        }
        let att=document.createAttribute('class');
        att.value='tableRow';
        row.setAttributeNode(att);
        tablee.appendChild(row);
    }
    let ids=JSON.parse(localStorage.getItem('displayIDs'));
    let displayBack=localStorage.getItem('displayBack');
    for(let i=0;i<displayArray.length;i++){
        if(displayBack==='0'||
          (displayBack==='1'&& ids.includes(displayArray[i].id + '')))
            addtr(i);
    }
    if(displayBack==='1'){
        localStorage.setItem('displayBack','0');
    }

    let reset= document.getElementById("resetButton");
    reset.addEventListener('click',()=>{
        window.location.href='display.html';
    })
// }
    




    //***************** */
    function displayOptions(object){
        let visible=document.getElementsByClassName('hiddenManage');
        Array.from(visible).forEach((element)=>{
            element.style.display='none';
        })
        object.style.display='block';
    }

    let arraySelect=['filterSelect','sortSelect','searchSelect'];
    let arrayButtons=['filter','sort','search'];
    for(let i=0;i<arraySelect.length; i++){
        let filterSelect=document.getElementById(arraySelect[i]);
        if(filterSelect){
            let filter=document.getElementById(arrayButtons[i]);
            filterSelect.addEventListener('click', ()=>{displayOptions(filter)});
        }
    }
    // let filterSelect=document.getElementById('filterSelect');
    // if(filterSelect){
    //     let filter=document.getElementById('filter');
    //     filterSelect.addEventListener('click', ()=>{displayOptions(filter)});
    // }

    // let sortSelect=document.getElementById('sortSelect');
    // if(sortSelect){
    //     let sort=document.getElementById('sort');
    //     sortSelect.addEventListener('click', ()=>{displayOptions(sort)});
    // }
    // let searchSelect=document.getElementById('searchSelect');
    // if(searchSelect){
    //     let search=document.getElementById('search');
    //     searchSelect.addEventListener('click', ()=>{displayOptions(search)});
    // }

    //***************** */

    function updateIDarray(){
        let displayID=[];
        let rows=Array.from(document.getElementsByClassName('tableRow'));
        rows.forEach((row)=>{
        let id=row.childNodes[9].textContent;
        displayID.push(id);
        })
        console.log(displayID);
        localStorage.setItem('displayIDs',JSON.stringify(displayID));
    }
    updateIDarray();

    let searchButton=document.getElementById('searchButton');
    searchButton.addEventListener('click',(event)=> {
        event.preventDefault();

        let searchBy=document.getElementById('searchBy').value;
        let searchKeyIndex=keys.indexOf(searchBy);
        let searchValue=document.getElementById('searchValue').value;

        let container = document.getElementById('table');
        tableRows=container.childNodes;
  
        searchKeyIndex++;
        for(let i=2; i<tableRows.length; i++){
            let actualValue=tableRows[i].querySelector('td:nth-child('+searchKeyIndex+')').innerHTML;
            if(actualValue !==searchValue){
                tableRows[i].remove();
                i--;
            }
        }
        updateIDarray();

    })

    let filterButton=document.getElementById('filterButton');
    filterButton.addEventListener('click',(event)=> {
        event.preventDefault();

        let gender=document.getElementById('filterGenderOptions').value;
        let status=document.getElementById('filterStatusOptions').value;
        if(status=='notYet') status='-';
        let container = document.getElementById('table');
        let tableRows=container.childNodes;

         for(let i=2; i<tableRows.length; i++){
            let actualGender=tableRows[i].querySelector('td:nth-child(4)').innerHTML;
            let actualStatus=tableRows[i].querySelector('td:nth-child(9)').innerHTML;
    
            console.log(actualStatus);
            if((gender!=='any' && actualGender !==gender) || 
                (status!='any' && actualStatus!==status)){
                tableRows[i].remove();
                i--;
            }
         }
         updateIDarray();
    })

    let sortButton=document.getElementById('sortButton');
    sortButton.addEventListener('click',(event)=> {
        event.preventDefault();

        let sortBy=document.getElementById('sortBy').value;
        let sortKeyIndex=keys.indexOf(sortBy);
        let order=document.getElementById('order').value;

        let container = document.getElementById('table');
        tableRows=Array.from(container.getElementsByTagName('tr')).slice(1);

        if(sortBy==='fname' || sortBy==='lname' || sortBy==='id'){
            tableRows.sort(function(row1,row2){
                aValue=row1.cells[sortKeyIndex].textContent;
                bvalue=row2.cells[sortKeyIndex].textContent;
                if(order==='ascending'){
                    if(aValue>bvalue)
                        return 1;
                    else
                        return -1;
                }
                else{
                    if(aValue<bvalue)
                        return 1;
                    else
                        return -1;
                }

            })
        }

        else if(sortBy==='birthdate'){
            function compareDates(date1, date2){
                let month1=date1.slice(5,6);
                let day1=date1.slice(8,9);
                let year1=date1.slice(0,3);
                let month2=date2.slice(5,6);
                let day2=date2.slice(8,9);
                let year2=date2.slice(0,3);

                if(year1>year2 || (year1===year2 && month1>month2)||(year1===year2 && month1===month2 && day1>day2)){
                    return 1;
                }
                else
                    return -1;
                
            }
            tableRows.sort(function(row1,row2){

                value1=row1.cells[sortKeyIndex].textContent;
                value2=row2.cells[sortKeyIndex].textContent;
                if(order==='ascending'){
                    return compareDates(value1, value2);
                }
                else{
                    return compareDates(value2, value1);
                }

            })
        }

        let rows=container.childNodes;

        while(rows.length>2){
            rows[2].remove();
        }

        for(let i=0; i<tableRows.length; i++){
            container.appendChild(tableRows[i]);
        }
        updateIDarray();
    })

    

    let rows=Array.from(document.getElementsByClassName('tableRow'));
    rows.forEach((row)=>{
        let id=row.childNodes[9].textContent;
        row.addEventListener('click',(event)=>{
            event.preventDefault();
            let foundArray=displayArray.filter((dataElement)=>{
                return dataElement.id==id;
            })
            if(!foundArray){
                alert('error');
                return;
            }
            localStorage.setItem('registree',JSON.stringify(foundArray[0]));
            window.location.href='registree.html';
        })
    })

}


