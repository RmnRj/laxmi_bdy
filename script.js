function sleep(ms){ return new Promise(r=>setTimeout(r,ms)); }

async function fadeIn(el){ el.style.opacity = 1; await sleep(800); }
async function fadeOut(el){ el.style.opacity = 0; await sleep(800); }

async function showText(big, small){
    const t = document.getElementById("text");
    const s = document.getElementById("small");
    t.textContent = big;
    await fadeIn(t);
    if(small){
        s.textContent = small;
        await fadeIn(s);
    }
    await sleep(1000);
    await fadeOut(t);
    await fadeOut(s);
}

async function highlightSpecial(){
    const t = document.getElementById("text");
    t.innerHTML = `then I thought I need to do something <span id="spWord">special</span>`;
    await fadeIn(t);
    await sleep(300);
    document.getElementById("spWord").classList.add("highlight");
    await sleep(1200);
    await fadeOut(t);
}

async function typeChatMessage(message){
    const bubble = document.getElementById("chatBubble");
    const btn = document.getElementById("sendBtn");
    bubble.textContent = "";
    bubble.style.display = "block";
    await fadeIn(bubble);

    // Typing effect word by word
    let words = message.split(" ");
    for(let w of words){
        bubble.textContent += w + " ";
        await sleep(300);
    }

    // Show send button and animate click
    btn.style.display = "inline-block";
    await sleep(300);
    btn.style.transform = "scale(0.9)";
    await sleep(150);
    btn.style.transform = "scale(1)";
    await sleep(300);

    // Fade out bubble after sending
    await fadeOut(bubble);
    bubble.style.display = "none";
    btn.style.display = "none";
    await sleep(500);
}

async function typeMirrorText(text){
    const m = document.getElementById("mirrorText");
    m.textContent = "";
    m.style.opacity = 1;

    for (let char of text){
        m.textContent += char;
        await sleep(150);
    }
}

async function start(){
    // reset
    document.getElementById("restart").style.display = "none";
    document.getElementById("loveLink").style.display = "none";
    document.getElementById("text").style.opacity = 0;
    document.getElementById("small").style.opacity = 0;
    document.getElementById("chatBubble").style.opacity = 0;
    document.getElementById("mirrorText").style.opacity = 0;
    document.getElementById("imageBox").style.opacity = 0;
    document.getElementById("imageBox").style.display = "none";

    await showText("LAXMI", "I really like your name");
    await showText("It's your birthday", "sweetheart");
    await typeChatMessage("happy birthday my love and blah blah blah");
    await showText("this is what I was going to do but", "");
    await highlightSpecial();
    await showText("so", "");

    const box = document.getElementById("imageBox");
    box.style.display = "block";
    await fadeIn(box);

    
    await fadeOut(document.getElementById("text"));
    await typeMirrorText("happy birthday gorgeous");
    await showText("happy birthday gorgeous", "");

    await showText("if you like it call me", "");
    
    

    document.getElementById("restart").style.display = "block";
    document.getElementById("loveLink").style.display = "flex";
}

document.getElementById("restart").onclick = start;

start();