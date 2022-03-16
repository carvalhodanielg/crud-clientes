function estados(){
    var estados =[
        {"value": "AC"
        "Nome": "AC"},
        {"value": "MG"
        "Nome": "MG"}
        
    ]
}

var est = document.getElementById('modalState')
for(var i =0; i<estados.length; i++){
    est.innerHTML +=`<option value=${estados[i]['Nome']}>${estados[i]['value']}</option>`
}