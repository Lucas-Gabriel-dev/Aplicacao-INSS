var btn = document.querySelector('#show-or-hide');
var result = document.querySelector('#result');
var home = document.querySelector('#home');

btn.addEventListener('click', function(){
    if(result.style.display == 'block'){
        result.style.display = 'none';
    } 
    else{
        result.style.display = 'block';
        home.style.display = 'none'
    }
})

function diferenca() {
    /** Datas do beneficio antes da revisão 
    let startDate = document.getElementById('OldStart').value;
    let endDate = document.getElementById('OldCessation').value;*/

    /** Datas do beneficio após revisão */
    let newStartdate = document.getElementById('NewStart').value;
    let newEndofDate = document.getElementById('NewCessation').value;

    /** Valor  recebido pelo beneficiario antes e após revisão */
    let OldRMI = document.getElementById('rmi').value;

    /** Nova Renda Mensal */
    let newRMI = document.getElementById('rma').value;


    /** Funcao para calcular dias recebidos */

    function days(start, end){
        function diasNoMes(month, year) {
            var data = new Date(month, year, 0);
            return data.getDate();
        }

        var [startyear, startmonth, startday] = start.split('-').map(Number);
        var [endyear, endmonth, dayend] = end.split('-').map(Number);
        

        if(startday == diasNoMes(startday, startmonth)){
            startday = 30;
        }

        if(dayend == diasNoMes(dayend, endmonth)){
            dayend = 30;
        }

        diffMonth = Math.abs(endmonth - startmonth);
        diffyear = endyear - startyear;

        if(diffyear >= 1){
            diffMonth = startmonth - (12 - endmonth);
        }
        if(diffMonth >= 2){
            diffMonth = (diffMonth - 1) * 30;
            diffDays = Math.abs(startday - 30) + dayend + 1;
            diffDays = diffDays + diffMonth;
        }
        if(diffMonth == 1){
            diffDays = Math.abs(startday - 30) + dayend + 1;
        }
        if(diffMonth == 0){
            diffDays = dayend - startday + 1;
        }
        
        
       return(diffDays);
    }

    /** Função para calculo decimo terceiro */

    function thirteenth(start, end, rmi){
        var [startyear, startmonth, startday] = start.split('-').map(Number);
        var [endyear, endmonth, dayend] = end.split('-').map(Number);

        diffMonth = Math.abs(endmonth - startmonth);
        diffyear = endyear - startyear;

        if(diffyear >= 1){
            diffMonth = startmonth - (12 - endmonth);
        }

        if(diffMonth >= 2){
            diffMonth = diffMonth - 1;

            if(startday <= 15 ){
                diffMonth = diffMonth + 1;
            }
            if(dayend >= 15){
            diffMonth = diffMonth + 1;
            }
        }

        if(diffMonth == 1 && startday <= 15 && dayend >= 15){
            diffMonth = diffMonth + 1;
        }
        if(diffMonth == 1 && startday > 15 && dayend < 15){
            diffMonth = diffMonth - 1;
        }

        if(diffMonth == 0 && startday <= 15 && dayend >= 15){
            diffMonth = diffMonth + 1;
        }

        valueTH = (rmi / 12) * diffMonth;
        console.log(valueTH)

        return(valueTH)
    }

    /** Calculo para valor recebido 
    var ValueReceived = days(startDate, endDate) * (OldRMI / 30); 
    console.log("Valor recebido ", ValueReceived);*/

    /** Calculo para complemento positivo */
    /** Valor pago ao dia */
    ValueDay = newRMI / 30;
    
    /** Valor que deve ser pago */
    ValueToPay = days(newStartdate, newEndofDate) * (newRMI / 30);
    console.log("Valor da renda sem descontos", ValueToPay);

    /** Rubrica 101 */
    Rubrica = Math.abs(OldRMI - ValueToPay);
    console.log("Rubrica 101", Rubrica);

    /** Rubrica 104, decimo terceiro */
    ValueThirteenth = thirteenth(newStartdate, newEndofDate, newRMI);
    console.log("Rubrica 104, valor decimo terceiro: ", ValueThirteenth);

    /** Complemento positivo */
    Complement = Math.abs(OldRMI - ValueToPay) + ValueThirteenth;
    console.log("Complemento positivo", Complement);
    
    
    document.querySelector(".newSalary").innerHTML = newRMI;
    document.querySelector(".dayValue").innerHTML = (ValueDay).toFixed(2);
    
    
    _start = newStartdate.split('-').reverse().join('-');
    document.querySelector(".startOfBenefit").innerHTML = _start;

    _end = newEndofDate.split('-').reverse().join('-');
    document.querySelector(".endOfBenefit").innerHTML = _end;

    
    document.querySelector(".days").innerHTML = days(newStartdate, newEndofDate) + " dias:";  
    document.querySelector(".withoutDiscounts").innerHTML = (ValueToPay).toFixed(2); 

    const amountPaid = document.querySelectorAll(".amountPaid")
    amountPaid.forEach(element => {
        element.textContent = Number(OldRMI).toFixed(2);
    })

    const rubrica = document.querySelectorAll(".withDiscounts")
    rubrica.forEach(element => {
        element.textContent = (Rubrica).toFixed(2); 
    })
   
    const thirteenthhh = document.querySelectorAll(".thirteenth");
    thirteenthhh.forEach(element => {
        element.textContent = (ValueThirteenth).toFixed(2);
    })

    document.querySelector(".complement").innerHTML = (Complement).toFixed(2);
}

function mostra_oculta(){
    var x = document.getElementById("result");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }

    window.location.href = "./index.html";


    return;
}