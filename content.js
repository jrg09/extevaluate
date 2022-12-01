'use strict'

//inject js
var s = document.createElement('script');
s.src = chrome.runtime.getURL('inject.js');
s.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);

function setupLinks() {
    $('tbody tr', '#DataTables_Table_0').toArray().forEach(item => {
        var rpe = $('td:nth-child(1)',$(item)).text();
        var status = $('td:nth-child(7)',$(item)).text();
    
        $('td:nth-child(7)',$(item)).html(`<a href='#' onclick='changeStatus("${rpe}","${status}"); return false;'>${status}</a>`);
    });    
}

/*
//inject js
setTimeout(()=>{
    var s2 = document.createElement('script');
    s2.src = chrome.runtime.getURL('final.js');
    s2.onload = function() {
        this.remove();
    };
    document.body.appendChild(s2);
}, 5000);
*/

//add controls to td
setupLinks();


