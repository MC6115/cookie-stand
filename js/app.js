'use strict';

function Location(name, address, contactInfo, workingHours, cookiesPerHour, minCustomersPerHour, maxCustomersPerHour, avgCookiesPerSale){
    this.name = name;
    this.address = address;
    this.contactInfo = contactInfo;
    this.workingHours = workingHours;
    this.cookiesPerHour = cookiesPerHour;
    this.minCustomerPerHour = minCustomersPerHour;
    this.maxCustomerPerHour = maxCustomersPerHour;
    this.avgCookiesPerSale = avgCookiesPerSale;
};
Location.prototype.estimate = function(){
    this.cookiesPerHour=estimateSales(this)
};
const seattle = new Location(`Seattle`, `2901 3rd avenue #300, Seattle`,'123-456-789',`6a.m.-7p.m.`, [], 23, 65,6.3);
const tokyo = new Location(`Tokyo`,`1 Chome 1-2 Oshiage, Sumida City, Tokyo 121-8634`,`222-222-2222`,`6a.m.-7p.m.`,[],3,24,4.6);
const dubai = new Location(`Dubai`,`1 Sheikh Mohammed bin Rashid Blvd - Dubai`,`333-333-3333`,`6a.m.-7p.m.`,[],11,38,3.7);
const paris = new Location(`Paris`,`Champ de Mars, 5 Avenue Antole France,75007 Paris`,'444-444-4444',`6a.m.-7p.m.`,[],20,38,2.3);
const lima = new Location(`Lima,`,`Ca.Gral. Borgoño cuadra 8, Miraflores 15074`,`555-555-5555`,`6a.m.-7p.m.`,[],20,38,2.3);

const hours =[`6am`,`7am`,`8am`,`9am`,`10am`,`11am`,`12pm`,`1pm`,`2pm`,`3pm`,`4pm`,`5pm`,`6pm`,`7pm`];
const stores =[seattle,tokyo,dubai,paris,lima];

// Object functions + object accessibility

function runObjectSales(){
    for(let i=0;i<stores.length;i++){
        stores[i].estimate();
        renderRows(stores[i]);
    }
};
function runIndex(){
    for(let i=0;i<stores.length;i++){
        renderIndex(stores[i]);
    }
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

// Re-usable code

function columnFiller(columnText) {
    const column = document.createElement("th");
    column.textContent = columnText;
    return column;
};
function generarNumeroRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min);
};
function deleteTable(){
    const salesTable = document.getElementById("sales-table");
    salesTable.textContent = "";
}

// Sales Page 

function renderTable() {
    runObjectSales();

    // Table structure

    const salesTable = document.getElementById("sales-table");
    const table = document.createElement("table");
    salesTable.appendChild(table);

    const thead = document.createElement("thead");
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    table.appendChild(tbody);

    //Headers

    const headerRow = document.createElement("tr");
    thead.appendChild(headerRow);

    const locationsHeader = document.createElement("th");
    locationsHeader.textContent = "Locations";
    headerRow.appendChild(locationsHeader);

    for (let i = 0; i < hours.length; i++) {
        const th = columnFiller(hours[i]);
        headerRow.appendChild(th);
    }

    const totalHeader = document.createElement("th");
    totalHeader.textContent = "Location Total";
    headerRow.appendChild(totalHeader);

    // add store names + sales + location totals as rows

    for (let i = 0; i < stores.length; i++) {
        const row = renderRows(stores[i]);
        tbody.appendChild(row);
    }

    // add last row of hourly totals

    const totalRow = renderHourlyTotalRow();
    tbody.appendChild(totalRow);
}
function renderRows(store) {
    let locationTotal = 0;
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    nameCell.textContent = store.name;
    row.appendChild(nameCell);
    for (let i = 0; i < hours.length; i++) {
        const cookieCell = document.createElement("td");
        cookieCell.textContent = store.cookiesPerHour[i];
        row.appendChild(cookieCell);
        locationTotal += store.cookiesPerHour[i];
    }
    const totalCell = document.createElement("td");
    totalCell.textContent = locationTotal;
    row.appendChild(totalCell);
    return row;
};
function renderHourlyTotalRow() {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    nameCell.textContent = "Hourly Total for All Locations";
    row.appendChild(nameCell);
    let grandTotal = 0;
    for (let i = 0; i < hours.length; i++) {
        let hourlyTotal = 0;
        for (let j = 0; j < stores.length; j++) {
            hourlyTotal += stores[j].cookiesPerHour[i];
        }
        const td = document.createElement("td");
        td.textContent = hourlyTotal;
        row.appendChild(td);
        grandTotal += hourlyTotal;
    }

    const totalCell = document.createElement("td");
    totalCell.textContent = grandTotal;
    row.appendChild(totalCell);

    return row;
}
// event listener for new store form

const newStoreForm = document.getElementById(`newStore`)

newStoreForm.addEventListener(`submit`,
    function (event){
        event.preventDefault();
        const locationName = event.target.locationName.value;
        const minCustomersPerHour = parseInt(event.target.minCustomersPerHour.value);
        const maxCustomersPerHour = parseInt(event.target.maxCustomersPerHour.value);
        const avgCookiesPerSale = parseInt(event.target.avgCookiesPerSale.value);

        const newLocation = new Location(locationName, ``, ``, ``, [], minCustomersPerHour, maxCustomersPerHour, avgCookiesPerSale)
        newLocation.estimate(this);
        stores.push(newLocation);
        deleteTable();
        renderTable();
        // for(let i=0;i<event.target.length;i++){
        //     if(event.target[i].name){
                
        //     }
        // }
    }
);

// Main page

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
