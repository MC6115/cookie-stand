'use strict';

const Seattle={
    name:'Seattle',
    address:`2901 3rd avenue #300, Seattle`,
    contactInfo:'123-456-789',
    workingHours:`6a.m.-7p.m.`,
    cookiesPerHour:[],
    minCustomerPerHour:23,
    maxCustomerPerHour:65,
    avgCookiesPerSale:6.3,
    estimate: function(){
        this.cookiesPerHour=estimateSales(this)
    },
};
const Tokyo={
    name:'Tokyo',
    address:`1 Chome 1-2 Oshiage, Sumida City, Tokyo 121-8634`,
    contactInfo:'222-222-2222',
    workingHours:`6a.m.-7p.m.`,
    cookiesPerHour:[],
    minCustomerPerHour:3,
    maxCustomerPerHour:24,
    avgCookiesPerSale:4.6,
    estimate: function(){
        this.cookiesPerHour=estimateSales(this)
    },
}
const Dubai={
    name:'Dubai',
    address:`1 Sheikh Mohammed bin Rashid Blvd - Dubai`,
    contactInfo:'333-333-3333',
    workingHours:`6a.m.-7p.m.`,
    cookiesPerHour:[],
    minCustomerPerHour:11,
    maxCustomerPerHour:38,
    avgCookiesPerSale:3.7,
    estimate: function(){
        this.cookiesPerHour=estimateSales(this)
    },
}
const Paris={
    name:'Paris',
    address:`Champ de Mars, 5 Avenue Antole France,75007 Paris`,
    contactInfo:'444-444-4444',
    workingHours:`6a.m.-7p.m.`,
    cookiesPerHour:[],
    minCustomerPerHour:20,
    maxCustomerPerHour:38,
    avgCookiesPerSale:2.3,
    estimate: function(){
        this.cookiesPerHour=estimateSales(this)
    },
}
const Lima={
    name:'Lima',
    address:`Ca.Gral. Borgoño cuadra 8, Miraflores 15074`,
    contactInfo:'555-555-5555',
    workingHours:`6a.m.-7p.m.`,
    cookiesPerHour:[],
    minCustomerPerHour:20,
    maxCustomerPerHour:38,
    avgCookiesPerSale:2.3,
    estimate: function(){
        this.cookiesPerHour=estimateSales(this)
    },
}
const hours =[`6am`,`7am`,`8am`,`9am`,`10am`,`11am`,`12pm`,`1pm`,`2pm`,`3pm`,`4pm`,`5pm`,`6pm`,`7pm`];
const stores =[Seattle,Tokyo,Dubai,Paris,Lima];

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
    const root=document.getElementById('root');
    const location=document.createElement('section');
    location.classList.add('location');
    root.appendChild(location);
    const title=document.createElement('h2');
    title.textContent=store.name;
    location.appendChild(title);
    const list=document.createElement('ul')
    location.appendChild(list)
    for(let i =0;i<hours.length;i++){
        total += store.cookiesPerHour[i];
        const listItem=document.createElement('li');
        listItem.textContent=`${hours[i]}: ${store.cookiesPerHour[i]} cookies`;
        list.appendChild(listItem);
    }
    const totalItems=document.createElement('li');
    totalItems.textContent=`total ${total} cookies`;
    list.appendChild(totalItems);
}
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
function runApplication(store){
    for(let i=0;i<stores.length;i++){
        stores[i].estimate();
        renderSales(stores[i]);
    }
};
function runIndex(store){
    for(let i=0;i<stores.length;i++){
        renderIndex(stores[i]);
    }
};
