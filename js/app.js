'use strict';
Location.prototype.estimate = function(){
    this.cookiesPerHour=estimateSales(this)
};
function Location(name, address, contactInfo, workingHours, cookiesPerHour, minCustomerPerHour, maxCustomerPerHour, avgCookiesPerSale){
    this.name = name;
    this.address = address;
    this.contactInfo = contactInfo;
    this.workingHours = workingHours;
    this.cookiesPerHour = cookiesPerHour;
    this.minCustomerPerHour = minCustomerPerHour;
    this.maxCustomerPerHour = maxCustomerPerHour;
    this.avgCookiesPerSale = avgCookiesPerSale;
};

const Seattle = new Location(`Seattle`, `2901 3rd avenue #300, Seattle`,'123-456-789',`6a.m.-7p.m.`, [], 23, 65,6.3);
const Tokyo = new Location(`Tokyo`,`1 Chome 1-2 Oshiage, Sumida City, Tokyo 121-8634`,`222-222-2222`,`6a.m.-7p.m.`,[],3,24,4.6);
const Dubai = new Location(`Dubai`,`1 Sheikh Mohammed bin Rashid Blvd - Dubai`,`333-333-3333`,`6a.m.-7p.m.`,[],11,38,3.7);
const Paris = new Location(`Paris`,`Champ de Mars, 5 Avenue Antole France,75007 Paris`,'444-444-4444',`6a.m.-7p.m.`,[],20,38,2.3);
const Lima = new Location(`Lima,`,`Ca.Gral. Borgoño cuadra 8, Miraflores 15074`,`555-555-5555`,`6a.m.-7p.m.`,[],20,38,2.3);

const hours =[`6am`,`7am`,`8am`,`9am`,`10am`,`11am`,`12pm`,`1pm`,`2pm`,`3pm`,`4pm`,`5pm`,`6pm`,`7pm`];
const stores =[Seattle,Tokyo,Dubai,Paris,Lima];

function runApplication(){
    for(let i=0;i<stores.length;i++){
        stores[i].estimate();
        renderSales(stores[i]);
    }
};
function runIndex(){
    for(let i=0;i<stores.length;i++){
        renderIndex(stores[i]);
    }
};
function columnFiller(columnText){
    const column = document.createElement("th");
    column.textContent= columnText
    return column;
};
function rowFiller(rowText){
    const row = document.createElement("tr")
    row.textContent= rowText
    return row;
}
function generarNumeroRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min);
};
function estimateSales(store){
    const sale=[];
    for(let i =0;i<hours.length;i++){
        const numCustomers=generarNumeroRandom(store.minCustomerPerHour,store.maxCustomerPerHour);
        const hoursSale=Math.ceil(numCustomers*store.avgCookiesPerSale)
        sale.push(hoursSale);
    }
    return sale;
};
function renderSales(store){
    let total=0;
    for(let i =0;i<hours.length;i++){
        total += store.cookiesPerHour[i];
        return total
    };
};
function renderTable(){
    runApplication();
    const salesTable = document.getElementById("sales-table");
    const table = document.createElement("table");
    salesTable.appendChild(table)
    const thead = document.createElement("thead");
    table.appendChild(thead);
    const columns = document.createElement("tr");
    thead.appendChild(columns);
    const empty =document.createElement("th");;
    columns.appendChild(empty);
    for (let i = 0; i < hours.length; i++){
        const th =columnFiller(hours[i]);
        columns.appendChild(th);
    };
    for(let i=0;i<stores.length;i++){
        stores[i].name;
        const row = rowFiller(stores[i].name);
        thead.appendChild(row);
    };
    // for(let i=0;i<stores.length;i++){
    // const th = columnFiller(stores[i].cookiesPerHour);
    // .appendChild(th)
    // }
};
function renderIndex(store){

    const fill=document.getElementById('fill');
    const location=document.createElement('section');
    location.classList.add('location');
    fill.appendChild(location);
    const title=document.createElement('h2');
    title.textContent=store.name;
    location.appendChild(title);
    const workInfo=document.createElement('p');
    workInfo.textContent= `Hours Open: ${store.workingHours}`;
    location.appendChild(workInfo);
    const telfInfo=document.createElement('p');
    telfInfo.textContent= `Contact Info: ${store.contactInfo}`;
    location.appendChild(telfInfo);
    const addressInfo=document.createElement('p');
    addressInfo.textContent= `Location: ${store.address}`;
    location.appendChild(addressInfo);
};

