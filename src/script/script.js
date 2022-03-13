function diferenca() {
    let startDate = document.getElementById('OldStart').value;

    let endDate = document.getElementById('OldCessation').value;

    console.log("Start Date: ", startDate, " End Date: ", endDate);

    let OldRMI = document.getElementById('rmi').value / 30;  

    /** Funcao para calcular dias recebidos */

    function days(start, end){
        function diasNoMes(mes, ano) {
            var data = new Date(ano, mes, 0);
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

    console.log(days(startDate, endDate));

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

            if(startday <= 15 && dayend >= 15){
                diffMonth = diffMonth + 1;
            }
        }

        valueTH = rmi * diffMonth;

        return(valueTH)
    }

    console.log(thirteenth(startDate, endDate, OldRMI));


    /*** Data de início e cessação do benefício antes da revisão!! */
    /** Início */
    let oldDays = document.getElementById('OldStart').value;


    var OldDate = new Date(oldDays).getDate();
    var OldMonth = new Date(oldDays).getMonth();
    var OldYear = new Date(oldDays).getFullYear();

    console.log(OldDate);

    function Time(day, cessation){
        var daystart = day;
        var daycessation = cessation;

        var received = Math.abs(daystart - daycessation);
        var days = Math.ceil(received/ (1000 * 60 * 60 * 24));
        
        return days;
    }

    function diasNoMes(mes, ano) {
        var data = new Date(ano, mes, 0);
        return data.getDate();
    }

    if(OldDate > diasNoMes(OldMonth, OldYear)) {
        OldDate = 1;
        OldMonth = OldMonth + 1;

        if(OldMonth == 13){
            OldMonth = 1;
            OldYear = OldYear + 1;
        }
    }

    console.log(OldDate, OldMonth, OldYear);

    /** Cessação */
    let oldCessation = new Date(document.getElementById('OldCessation').value);

    var OldDateofCessation = oldCessation.getDate() + 1;
    var OldMonthofCessation = oldCessation.getMonth() + 1;
    var OldYearofCessation = oldCessation.getFullYear();

    if(OldDateofCessation > diasNoMes(OldMonthofCessation, OldYearofCessation)) {
        OldDateofCessation = 1;
        OldMonthofCessation = OldMonthofCessation + 1;

        if(OldMonthofCessation == 13){
            OldMonthofCessation = 1;
            OldYearofCessation = OldYearofCessation + 1;
        }
    }

    console.log(OldDateofCessation, OldMonthofCessation, OldYearofCessation);

    var diff = moment(oldDays,"DD/MM/YYYY").diff(moment(oldCessation,"DD/MM/YYYY"));
    var dias = moment.duration(diff).asDays();

    console.log(Math.abs(dias));

    /** Valor rebido antes da revisão! */
     
    
    var ValueReceived = OldRMI * Time(oldDays, oldCessation);

    console.log(ValueReceived);
    
    /** Calculo dos novos valores */

    /** Nova data de inicio beneficio */
    let newDays = new Date(document.getElementById('NewStart').value);

    var NewDate = new Date(newDays).getDate() + 1;
    var NewMonth = newDays.getMonth() + 1;
    var NewYear = newDays.getFullYear();

    if(NewDate > diasNoMes(NewMonth, NewYear)) {
        NewDate = 1;
        NewMonth = NewMonth + 1;

        if(NewMonth == 13){
            NewMonth = 1;
            NewYear = NewYear + 1;
        }
    }

    /** Nova data de cessação do beneficio */
    let  newDayofCessation = new Date(document.getElementById('NewCessation').value);

    var NewDateofCessation = new Date(newDayofCessation).getDate() + 1;
    var NewMonthofCessation = newDayofCessation.getMonth() + 1;
    var NewYearofCessation = newDayofCessation.getFullYear();

    if(NewDateofCessation > diasNoMes(NewMonthofCessation, NewYearofCessation)) {
        NewDateofCessation = 1;
        NewMonthofCessation = NewMonthofCessation + 1;

        if(NewMonthofCessation == 13){
            NewMonthofCessation = 1;
            NewYearofCessation = NewYearofCessation + 1;
        }
    }

    /** Novo valor salario */
    let newRMI = document.getElementById('rma').value / 30;
    
    if(NewDateofCessation == diasNoMes(NewMonth, NewYear)){
        var NewValueToReceived = newRMI * 30;
    }
    else {
        var NewValueToReceived = newRMI * Time(newDays,newDayofCessation);
    }

    /** Novo Décimo Terceiro */
    var value13 = NewMonthofCessation - NewMonth;

    if(NewDate > 15){
        value13 = value13 - 1;
    } 

    if(NewDateofCessation > 15){
        value13 = value13 + 1;
    }

    if(value13 < 0){
        value13 = 0;
    }

    var Thirteenth = document.getElementById('rma').value / 12;

    Thirteenth = Thirteenth * value13;

   /** Complemento positivo */

    var complement = NewValueToReceived - ValueReceived;
    
    console.log(complement);
    console.log(Thirteenth);
   
}


