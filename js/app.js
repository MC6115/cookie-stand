const Seattle={
    name:`Seattle`,
    address:`2901 3rd avenue #300, Seattle`,
    opening:`6a.m.`,
    closing:`7p.m.`,
    cookiesPerHour:[],
    maxCustomerPerHour:50,
    estimate: function(){
        this.cookiesPerHour.push(generarNumeroRandom(1,1000))
    }
}
function generarNumeroRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }