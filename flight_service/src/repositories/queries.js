function addRowLockOnFlights(flightId){
    return (`SELECT * from Flights WHERE id=${flightId} FOR UPDATE`);

}
module.exports={
    addRowLockOnFlights
}
