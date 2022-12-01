

function changeStatus(rpe, statusActual) {
    console.log({rpe, statusActual});

    var td = $(`tbody tr td:contains("${rpe}")`);

    var item = $(td).parent();

    //obtener los datos del RPE
    $.post('http://10.19.1.7/evaluatenac/usuario_cap.asp', `cmd=2&rpee=${rpe}`, function(data,sts, jqXHR){
        console.log(sts);
        
        var doc = new DOMParser().parseFromString(data, 'text/html');

        var rpee = doc.getElementById('rpee').value;
        var nombre = doc.getElementById('nombrec').value.replaceAll(' ', '+');
        var pwd = doc.getElementById('pwd').value;
        
        var idPerfill = getValue(doc, 'idPerfill');
        var clvdivision = getValue(doc, 'clvdivision');
        var clvzona = getValue(doc, 'clvzona');
        var clvagencia = getValue(doc, 'clvagencia');
        var idcategoria = getValue(doc, 'idcategoria');
        var activo = getValue(doc, 'activo');

        
        console.log({rpee, nombre,pwd,idPerfill,clvdivision,clvzona,clvagencia,idcategoria,activo});

        //make new post
        var newActivo = (activo == '1') ? '2' : '1';
        $.post('http://10.19.1.7/evaluatenac/usuario_Cmd.asp',`
        rpee=${rpee}&nombrec=${nombre}&pwd=${pwd}&correo=${rpe}%40cfe.mx&idPerfill=${idPerfill}&clvdivision=${clvdivision}&clvzona=${clvzona}&clvagencia=${clvagencia}&idcategoria=${idcategoria}&activo=${newActivo}&idPerfilado=&cmd=2&rpe=`, function(data2,sts2,xhr2){
            console.log(`status result post: ${sts2}`);

            var newStatus = (statusActual == 'Activo') ? 'Baja' : 'Activo';
            $('td:nth-child(7)',$(item)).html(`<a href='#' onclick='changeStatus("${rpe}","${newStatus}"); return false;'>${newStatus}</a>`);
        });

    });

    return false;
}

function getValue(doc, id) {
    var select = doc.getElementById(id);
    return select.options[select.selectedIndex].value;
}

function setupLinks() {
    $('tbody tr', '#DataTables_Table_0').toArray().forEach(item => {
        var rpe = $('td:nth-child(1)',$(item)).text();
        var status = $('td:nth-child(7)',$(item)).text();
    
        $('td:nth-child(7)',$(item)).html(`<a href='#' onclick='changeStatus("${rpe}","${status}"); return false;'>${status}</a>`);
    });    
}

$('.dataTable').on('draw.dt', function(){
    console.log('table redrawn');
    setupLinks();
})
