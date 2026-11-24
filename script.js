const $ = (id) => document.getElementById(id);
let stats = { happy: 72, energy: 78, full: 68 };
let day = 1;
const messages = {
  feed: ["Yum! Thank you for the little treat 🍓", "That was delicious! ♡", "A happy tummy makes a happy Gelin!"],
  shower: ["All fresh and cozy now! 🫧", "That was refreshing!", "Sparkly clean! ✨"],
  sleep: ["Goodnight! I'll have sweet dreams 🌙", "A little rest feels lovely.", "Zzz... see you in the morning ♡"],
  hug: ["A warm hug just made my day!", "Sending you the biggest pixel hug! ♡", "I feel so loved!"],
  kiss: ["Hehe! A sweet little cheek kiss 💗", "That made me blush!", "Mwah! ♡"],
  dance: ["Let's dance around the room! ♫", "One tiny happy dance!", "You're my favorite dance partner!"]
};
function clamp(v){return Math.max(0,Math.min(100,v))}
function updateStats(){
  $("happyMeter").style.width = stats.happy + "%";
  $("energyMeter").style.width = stats.energy + "%";
  $("fullMeter").style.width = stats.full + "%";
}
function say(message){$("speech").textContent=message}
function effect(emoji){
  $("actionFx").textContent=emoji;
  setTimeout(()=>$("actionFx").textContent="",1100);
}
function act(action){
  const character=$("character");
  character.className="character";
  if(action==="feed"){stats.full=clamp(stats.full+22);stats.happy=clamp(stats.happy+7);effect("🍓");}
  if(action==="shower"){stats.happy=clamp(stats.happy+9);stats.energy=clamp(stats.energy-3);character.classList.add("shower");effect("🫧");}
  if(action==="sleep"){stats.energy=clamp(stats.energy+28);character.classList.add("sleepy");effect("💤");day++;$("dayCount").textContent=String(day).padStart(2,"0");}
  if(action==="hug"){stats.happy=clamp(stats.happy+16);effect("♡");}
  if(action==="kiss"){stats.happy=clamp(stats.happy+12);effect("💗");}
  if(action==="dance"){stats.happy=clamp(stats.happy+10);stats.energy=clamp(stats.energy-7);character.classList.add("happy");effect("♫");}
  say(messages[action][Math.floor(Math.random()*messages[action].length)]);
  updateStats();
}
$("startButton").addEventListener("click",()=>{$("startScreen").classList.add("hidden");$("gameScreen").classList.remove("hidden");});
document.querySelectorAll(".action-button").forEach(btn=>btn.addEventListener("click",()=>act(btn.dataset.action)));
document.querySelectorAll(".tab").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll(".tab").forEach(t=>t.classList.toggle("active",t===btn));
  ["care","dress","date"].forEach(name=>$(`${name}Panel`).classList.toggle("hidden",btn.dataset.panel!==name));
}));
document.querySelectorAll(".outfit-button").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll(".outfit-button").forEach(b=>b.classList.toggle("selected",b===btn));
  const outfit=btn.dataset.outfit;
  $("character").className="character "+(outfit==="cottage"?"":outfit);
  $("accessory").textContent=outfit==="pajamas"?"🌙":outfit==="date"?"🌷":outfit==="classic"?"🤍":"🎀";
  say(outfit==="pajamas"?"My comfiest pajamas!":outfit==="date"?"Ready for our cafe date!":outfit==="classic"?"A simple little look ♡":"I love my cottagecore dress!");
}));
$("cafeButton").addEventListener("click",()=>{
  $("roomLabel").textContent="Little Fern Café";
  $("room").style.background="linear-gradient(#eadfcf 0 67%,#b99572 67%)";
  $("dateMessage").textContent="Date started! You shared a strawberry cake and warm tea. Gelin says: “This is my favorite kind of afternoon. ♡”";
  say("A table for two, please! ☕");
  stats.happy=clamp(stats.happy+18);stats.energy=clamp(stats.energy-8);updateStats();effect("☕ 💗");
});
updateStats();
