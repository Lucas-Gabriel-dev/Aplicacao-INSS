function decimo() {
    /*** Calculo de valor recebido!! */
    const OldDate = moment(new Date(document.getElementById('OldStart').value));

    
    const OldDateofCessation = moment(document.getElementById('OldCessation').value);

    const duration = moment.duration(OldDate.diff(OldDateofCessation));
    // Mostra a diferença em dias
    const days = duration.asDays();

    console.log(days)


    const OldRMI = document.getElementById('rmi').value / 30;
    

    const oldvalue = OldRMI * days;

    console.log(oldvalue);

    /*
    var TimeReceived = Math.abs(oldDays - oldCessation);
    var days = Math.ceil(TimeReceived/ (1000 * 60 * 60 * 24));
    console.log(days)

    var ValueReceived = OldRMI / 30; 
    ValueReceived = ValueReceived * days

    console.log(ValueReceived);*/





   /** Valor pago do decimo terceiro 
    let OldRMI = document.getElementById('rmi').value / 30;
    
    var Oldvalue13 = OldMonthofCessation - OldMonth;

    if(OldDate > 15){
        Oldvalue13 = Oldvalue13 - 1;
    } 

    if(OldDateofCessation > 15){
        Oldvalue13 = Oldvalue13 + 1;
    }

    if(Oldvalue13 < 0){
        Oldvalue13 = 0;
    }

    console.log(Oldvalue13);

    var OldThirteenth = OldRMI / 12;

    OldThirteenth = OldThirteenth * Oldvalue13;*/
    


//var [endyear, endmonth, dayend] = endDate.split('-').map(Number);
}

function dias() {
    let startDate = moment(document.getElementById('OldStart').value);
    console.log(startDate)

    let endDate = moment(document.getElementById('OldCessation').value);
}   

function diferenca(){
    var years: endDate.year() - startDate.year();
    months: startDate.month() - endDate.month();
    days: endDate.date() - startDate.date();
}