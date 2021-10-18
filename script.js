const puppy = require("puppeteer");

const email = "email";
const pass = "password";

const recipients = ["kpreetsingh0557@gmail.com" , "JOPajiJindabad@gmail.com"];
const subject = "Class Meeting URL";

async function test(){
    args: [ '--use-fake-ui-for-media-stream' ]
const browser = await puppy.launch(
    {headless : false,
     defaultViewport: false,
     args:["--start-maximized"],
     args: [ '--use-fake-ui-for-media-stream' ]
    });
const pages = await browser.pages();
const tab = await pages[0];
await tab.goto("https://www.google.com/");
await tab.waitForSelector(".gb_4.gb_5.gb_ae.gb_4c" , {visible : true});
await tab.click(".gb_4.gb_5.gb_ae.gb_4c");
await tab.waitForSelector("input[type = 'email']", {visible : true});
await tab.type("input[type = 'email']", email);
await tab.keyboard.press("Enter");
await tab.waitForSelector("input[type = 'password']", {visible : true});
await tab.type("input[type = 'password']", pass);

await tab.keyboard.press("Enter");
await tab.waitForNavigation({waitUntil: "networkidle2"});
await tab.goto("https://meet.google.com/");

let newmeetbtn = await tab.$$("div[class = 'VfPpkd-RLmnJb']");
await newmeetbtn[0].click();
await tab.waitForSelector("span[class=' VfPpkd-StrnGf-rymPhb-b9t22c']", {visible : true});
let startMeetbtn = await tab.$$("span[class=' VfPpkd-StrnGf-rymPhb-b9t22c']");
await startMeetbtn[1].click();
await tab.waitForSelector(".Hdh4hc.cIGbvc.NMm5M",{visible : true});


await tab.waitForSelector(".oTVIqe.BcUQQ");
let btns = await tab.$$(".oTVIqe.BcUQQ");
await btns[4].click() ; // audio 
await btns[6].click() ; // video 


await tab.waitForSelector("div[class='okqcNc']", {visible : true});
let url = await tab.$("div[class='okqcNc']");
let meetURL  = await tab.evaluate(function(ele){
    return ele.innerText;
  }, url);
console.log(meetURL) ;


await tab.waitForSelector(".Hdh4hc.cIGbvc.NMm5M");
let cLink = await tab.$$(".Hdh4hc.cIGbvc.NMm5M");
await cLink[19].click();


//////////////////////////////////////////////////////////////////////////////////
//Whatsapp
const tab2 = await browser.newPage();       
await tab2.goto("https://web.whatsapp.com/");   
await tab2.bringToFront();           

await tab2.waitForSelector("span[title='Testing ']", {visible : true});
await tab2.click("span[title='Testing ']");
await tab2.waitForSelector("._1JAUF._2x4bz", {visible : true});
await tab2.type("._1JAUF._2x4bz", meetURL);
await tab2.keyboard.press("Enter");

//////////////////////////////////////////////////////////////////////////////////
//Gmail
const tab3 = await browser.newPage();       
await tab3.goto("https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox");   
await tab3.bringToFront();           

await tab3.waitForSelector(".T-I.T-I-KE.L3", {visible : true});
await tab3.click(".T-I.T-I-KE.L3");

await tab3.waitForSelector("textarea[class='vO']", {visible : true});
let to = await tab3.$$("textarea[class='vO']");
await to[0].click();
for(let i = 0; i < recipients.length; i++){
await to[0].type(recipients[i]);
await tab3.keyboard.press("Enter");
}
await tab3.waitForSelector("input[class='aoT']", {visible : true});
await tab3.type("input[class='aoT']", subject);
await tab3.waitForSelector("div[class='Am Al editable LW-avf tS-tW']", {visible : true})
await tab3.type("div[class='Am Al editable LW-avf tS-tW']", meetURL);
await tab3.waitForSelector("div[class='T-I J-J5-Ji aoO v7 T-I-atl L3']", {visible : true});
await tab3.click("div[class='T-I J-J5-Ji aoO v7 T-I-atl L3']");
//////////////////////////////////////////////////////////////////////////////////
// Google Form
const tab4 = await browser.newPage(); 
await tab4.goto("https://www.google.com/forms/about/");
await tab4.waitForSelector(".mobile-device-is-hidden.js-dropdown-toggle", {visible : true});
await tab4.click(".mobile-device-is-hidden.js-dropdown-toggle");
await tab4.waitForSelector(".docs-homescreen-grid-item-thumbnail");
await tab4.click(".docs-homescreen-grid-item-thumbnail");

await tab4.waitForNavigation({waitUntil:"networkidle2"});
let sendlink = await tab4.$$(".appsMaterialWizButtonPaperbuttonLabel"); 
await sendlink[0].click();

await tab4.waitForSelector(".freebirdTabIcon");
let attendencelink = await tab4.$$(".freebirdTabIcon");
await attendencelink[2].click();

await tab4.waitForSelector(".quantumWizTogglePapercheckboxCheckMarkContainer",{visible : true});
let checkBox = await tab4.$$(".quantumWizTogglePapercheckboxCheckMarkContainer");
await checkBox[2].click();


//await tab4.waitForSelector("input[class='quantumWizTextinputPaperinputInput exportInput']",{visible : true});
let formUrls = await tab4.$$("input[class='quantumWizTextinputPaperinputInput exportInput']");
let formUrl = await formUrls[13];
let val = await tab4.evaluate(el => el.value, formUrl);
console.log(val);

// wapis meet pe aye
await tab.bringToFront();  
await tab.waitForSelector(".NzPR9b .uArJ5e");
let chatdiv = await tab.$$(".NzPR9b .uArJ5e");
let chatting = await chatdiv[1];
await chatting.click();
await tab.type("textarea[class='KHxj8b tL9Q4c']" , "Class Attendence Form" ,{delay: 100});
await tab.keyboard.press("Enter");
await tab.type("textarea[class='KHxj8b tL9Q4c']", val);
await tab.keyboard.press("Enter");
await browser.close();
}

test();