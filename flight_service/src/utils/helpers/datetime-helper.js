function compareTime(timeString1,timeString2){
let dateTime1= newDate(timeString1);
let dateTime2= newDate(timeString2);
return dateTime1.getTime() > dateTime2.getTime();

}

module.exports={
    compareTime
}