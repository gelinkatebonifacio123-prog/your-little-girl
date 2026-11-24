const $ = id => document.getElementById(id);
let stats = { love: 50, happy: 80, full: 70 }, day = 1;
const lines = {
  feed:["That strawberry was so sweet! 🍓","A little treat makes my day ♡","Yummy! Thank you!"],
  shower:["Fresh and cozy! 🫧","I feel all sparkly now!","That was refreshing ♡"],
  sleep:["Goodnight! Sweet dreams 🌙","A little rest feels lovely.","Zzz... see you soon ♡"],
  hug:["A warm hug for my favorite person!","I feel so loved ♡","Sending you the biggest hug!"],
  kiss:["Hehe, you made me blush! 💗","A tiny kiss just for you!","Mwah! ♡"],
  dance:["Let's dance around the room! ♫","You're my favorite dance partner!","One little happy dance!"]
};
const clamp = n => Math.max(0,Math.min(100,n));
function update(){
  [["love","love"],["happy","happy"],["full","full"]].forEach(([key,id])=>{
    const meter=$(id+"Meter"), value=$(id+"Value");
    if(meter) meter.style.width=stats[key]+"%";
    if(value) value.textContent=stats[key]+"%";
  });
}
function say(text){$("speech").textContent=text;}
function sparkle(icon){$("sparkle").textContent=icon;setTimeout(()=>$("sparkle").textContent="",1100);}
function act(action){
  if(action==="feed"){stats.full=clamp(stats.full+18);stats.happy=clamp(stats.happy+5);sparkle("🍓");}
  if(action==="shower"){stats.happy=clamp(stats.happy+8);sparkle("🫧");}
  if(action==="sleep"){stats.full=clamp(stats.full-8);day++;$("dayCount").textContent=String(day).padStart(2,"0");sparkle("💤");}
  if(action==="hug"){stats.love=clamp(stats.love+10);stats.happy=clamp(stats.happy+8);sparkle("💗");}
  if(action==="kiss"){stats.love=clamp(stats.love+8);stats.happy=clamp(stats.happy+7);sparkle("💕");}
  if(action==="dance"){stats.happy=clamp(stats.happy+10);sparkle("♫");}
  say(lines[action][Math.floor(Math.random()*lines[action].length)]);update();
}
$("startButton").addEventListener("click",()=>{$("startScreen").classList.add("hidden");$("gameScreen").classList.remove("hidden");});
document.querySelectorAll(".action-button").forEach(b=>b.addEventListener("click",()=>act(b.dataset.action)));
document.querySelectorAll(".tab").forEach(b=>b.addEventListener("click",()=>{
  document.querySelectorAll(".tab").forEach(t=>t.classList.toggle("active",t===b));
  ["care","dress","date"].forEach(name=>$(name+"Panel").classList.toggle("hidden",b.dataset.panel!==name));
}));
document.querySelectorAll(".outfit-button").forEach(b=>b.addEventListener("click",()=>{
  document.querySelectorAll(".outfit-button").forEach(t=>t.classList.toggle("selected",t===b));
  const outfit=b.dataset.outfit;
  $("character").style.filter=outfit==="pajamas"?"hue-rotate(155deg) saturate(.75)":outfit==="date"?"hue-rotate(325deg) saturate(.85)":"none";
  say(outfit==="pajamas"?"My comfiest outfit! 🌙":outfit==="date"?"Ready for our little date! 🌷":"I love my cottagecore dress! ♡");
}));
function goRoom(cafe){
  $("room").classList.toggle("cafe",cafe);
  $("roomLabel").textContent=cafe?"☕ Little Fern Café":"⌂ Gelin's Bedroom";
  $("bedroomButton").classList.toggle("active",!cafe);$("cafeRoomButton").classList.toggle("active",cafe);
  say(cafe?"A cozy table for two, please! ☕":"Welcome back to my cozy bedroom! ♡");
}
$("bedroomButton").addEventListener("click",()=>goRoom(false));
$("cafeRoomButton").addEventListener("click",()=>goRoom(true));
$("cafeButton").addEventListener("click",()=>{
  goRoom(true);stats.love=clamp(stats.love+8);stats.happy=clamp(stats.happy+12);
  $("dateMessage").textContent="Date started! You shared strawberry cake and warm tea. A lovely little afternoon together. ♡";
  say("I'm so happy we're here together! ♡");sparkle("☕ 💗");update();
});
$("soundButton").addEventListener("click",()=>{say("♫ Imagine our favorite cozy song playing ♡");});
$("resetButton").addEventListener("click",()=>{stats={love:50,happy:80,full:70};day=1;$("dayCount").textContent="01";goRoom(false);update();say("A fresh new day in our little world! ♡");});
update();
