"use strict";

let details = [];
loadAll('','');

let btn = document.querySelector('#btn-filter');


btn.addEventListener('click',(eventData)=>{
    let id = document.querySelector('#id').value;
    let host = document.querySelector('#host').value;

    loadAll(id, host);
});

function loadAll(id, host){

    
    const http = new XMLHttpRequest();
    
    http.onreadystatechange = ()=>{
        if(http.DONE == http.readyState){
            let tableBody = document.querySelector('table tbody');
            details = JSON.parse(http.responseText);
            
            document.querySelector('table tbody').innerHTML = '';
            for (const detail of details) {
                let row = `
                            <td>${detail.sId}</td>
                            <td>${detail.host}</td>
                            <td>${detail.dc?? ''}</td>
                            <td>${detail.oracleVersion?? ''}</td>
                            <td>${detail.homeLocation?? ''}</td>
                            <td>${detail.dbSize?? ''}</td>
                            <td>${detail.backup?? ''}</td>
                            <td>${detail.startDate?? ''}</td>
                            <td>${detail.endDate?? ''}</td>
                            <td>${detail.action?? ''}</td>
                            <td>${detail.comments?? ''}</td>
                            <td>${detail.backupType?? ''}</td>
                            <td>${detail.flag?? ''}</td>
                            <td>${detail.restore_type?? ''}</td>
                            <td>${detail.comments1?? ''}</td>
                            <td>${detail.comments2?? ''}</td>
                            <td>${detail.commentsState?? ''}</td>
                            <td>${detail.rowVersion}</td>
                            <td>${detail.backupCategory?? ''}</td>
                            <td${detail.processId?? ''}></td$>
                `;
                const trElm = document.createElement('tr');  
                trElm.innerHTML = row;
                tableBody.append(trElm);
            }
        }
    }

    http.open('GET', `http://localhost:8080/kdu/db?id=${id}&host=${host}`,true);

    http.send();
}
