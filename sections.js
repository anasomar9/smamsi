/* ============================================================
   SECTION BUILDERS
   ============================================================ */

function el(tag, cls, html){
  const e = document.createElement(tag);
  if(cls) e.className = cls;
  if(html !== undefined) e.innerHTML = html;
  return e;
}

/* ---------------- SECTION 1 : مبروك (Pride/Comfort) ---------------- */
const s1 = el('section'); s1.id = 'section-1';
const s1inner = el('div', 'section-inner fx');
s1inner.appendChild(el('div', 'eyebrow', 'قبل ما نبدأ'));
s1inner.appendChild(el('div', 'big-title', '❤️ مبروك يا ارنوبتي'));
s1.appendChild(s1inner);
stage.appendChild(s1);

makeSequencer(s1inner, [
  'خلصتي أصعب سنة في حياتك.',
  'أنا عارف قد إيه تعبتي.',
  'وعارف قد إيه سهرتي.',
  'وعارف قد إيه كنتي خايفة.',
  'وعارف إن انتظار النتيجة مش سهل.',
  'بس عايزك تعرفي حاجة.',
  'انتي عملتي اللي عليكي.',
  'والباقي على ربنا.',
  'وأيًا كانت النتيجة...',
  'هي عمرها ما هتحدد قيمتك.',
  'لأن قيمتك أكبر من أي مجموع يا حبيبي.'
], { gap: 2200, onDone: (holder)=>{
  const btn = el('button', 'cta-btn fx show', 'كملي');
  btn.onclick = ()=> document.getElementById('section-2').scrollIntoView({behavior:'smooth'});
  s1inner.appendChild(btn);
}});

/* ---------------- SECTION 2 : Timeline (Hope) ---------------- */
const s2 = el('section'); s2.id = 'section-2';
const s2inner = el('div', 'section-inner fx');
s2inner.appendChild(el('div', 'eyebrow', 'رحلة سنة كاملة'));

const timelineData = [
  ['🏁','بداية الرحلة'],
  ['📚','مذاكرة'],
  ['☕','سهر'],
  ['📝','امتحانات'],
  ['⏳','انتظار النتيجة'],
  ['🌸','بداية حياة جديدة']
];
const tl = el('div', 'timeline');
timelineData.forEach((item, idx)=>{
  const row = el('div', 'tl-item fx');
  row.innerHTML = `<div class="tl-emoji">${item[0]}</div><div class="tl-label">${item[1]}</div>`;
  tl.appendChild(row);
  if(idx < timelineData.length-1){
    tl.appendChild(el('div', 'tl-arrow'));
  }
});
s2inner.appendChild(tl);

const card1 = el('div', 'card glass fx', 'كل يوم بيعد...<br>هو يوم أقل للخوف...<br>ويوم أقرب للراحة.');
const card2 = el('div', 'card glass fx', 'وأتمنى لما النتيجة تظهر...<br>تكون بداية لكل الأحلام اللي نفسك فيها.');
s2inner.appendChild(card1);
s2inner.appendChild(card2);

const btn2 = el('button', 'cta-btn fx', 'لسه فيه حاجة...');
btn2.onclick = ()=> document.getElementById('section-3').scrollIntoView({behavior:'smooth'});
s2inner.appendChild(btn2);

s2.appendChild(s2inner);
stage.appendChild(s2);

// Stagger reveal for timeline rows on view
const s2Observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const rows = tl.querySelectorAll('.tl-item');
      rows.forEach((row,i)=> setTimeout(()=> row.classList.add('show'), i*350));
      setTimeout(()=> card1.classList.add('show'), rows.length*350 + 400);
      setTimeout(()=> card2.classList.add('show'), rows.length*350 + 1400);
      setTimeout(()=> btn2.classList.add('show'), rows.length*350 + 2400);
      s2Observer.disconnect();
    }
  });
}, { threshold: 0.3 });
s2Observer.observe(s2inner);

/* ---------------- SECTION 3 : Nostalgia / quiet confession ---------------- */
const s3 = el('section'); s3.id = 'section-3';
s3.style.background = 'radial-gradient(ellipse at center, rgba(2,6,23,0.4), rgba(2,6,23,0.9))';
const s3inner = el('div', 'section-inner fx');
s3.appendChild(s3inner);
stage.appendChild(s3);

makeSequencer(s3inner, [
  'فيه كلام كان نفسي أقوله من زمان.',
  'يمكن الوقت مكانش مناسب.',
  'ويمكن الظروف بعدتنا.',
  'بس الحقيقة...',
  'ولا يوم دعيت فيه...',
  'إلا واتمنيتلك الخير.',
  'ولا يوم شوفت حاجة جميلة...',
  'إلا واتمنيت تكوني معايا.'
], { gap: 2400, onDone: (holder)=>{
  setTimeout(()=>{
    const big = el('div', 'big-title fx show', 'وحشتيني.');
    big.style.fontSize = 'clamp(2rem, 7vw, 3.4rem)';
    s3inner.appendChild(big);
    setTimeout(()=> document.getElementById('section-4').scrollIntoView({behavior:'smooth'}), 3200);
  }, 800);
}});

/* ---------------- SECTION 4 : Particle heart (Love) ---------------- */
const s4 = el('section'); s4.id = 'section-4';
const s4inner = el('div', 'section-inner fx');
const heartWrap = el('div', 'heart-scene-wrap');
const heartCanvas = el('canvas');
heartCanvas.id = 'heart-particles-canvas';
heartWrap.appendChild(heartCanvas);
s4inner.appendChild(heartWrap);
s4.appendChild(s4inner);
stage.appendChild(s4);

makeSequencer(s4inner, [
  'يمكن غلطنا.',
  'ويمكن الظروف كانت أصعب مننا.',
  'لكن...',
  'عمري ما بطلت أتمنالك الخير.',
  'ولا بطلت أدعيلك.',
  'ولسه...',
  'عندي أمل.'
], { gap: 2200 });

// Particle heart canvas animation
function initHeartParticles(){
  const canvas = document.getElementById('heart-particles-canvas');
  const ctx = canvas.getContext('2d');
  let cw, ch;
  function resizeHC(){
    cw = heartWrap.clientWidth; ch = heartWrap.clientHeight;
    canvas.width = cw; canvas.height = ch;
  }
  resizeHC();
  window.addEventListener('resize', resizeHC);

  function heartXY(t){
    // parametric heart
    const x = 16*Math.pow(Math.sin(t),3);
    const y = 13*Math.cos(t) - 5*Math.cos(2*t) - 2*Math.cos(3*t) - Math.cos(4*t);
    return [x,-y];
  }

  const PCOUNT = 420;
  const particles = [];
  for(let i=0;i<PCOUNT;i++){
    const tt = Math.random()*Math.PI*2;
    const [hx,hy] = heartXY(tt);
    const scale = Math.min(cw,ch)/38;
    particles.push({
      tx: hx*scale, ty: hy*scale,
      x: (Math.random()-0.5)*cw, y: (Math.random()-0.5)*ch,
      size: Math.random()*2+1,
      speed: Math.random()*0.02+0.01,
      color: Math.random()>0.5 ? '#FB7185' : '#F9A8D4',
      wobble: Math.random()*Math.PI*2
    });
  }

  let animT = 0;
  let hcActive = false;
  const hcObserver = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{ hcActive = entry.isIntersecting; });
  }, {threshold:0.2});
  hcObserver.observe(heartWrap);

  function draw(){
    ctx.clearRect(0,0,cw,ch);
    ctx.save();
    ctx.translate(cw/2, ch/2);
    animT += 0.016;
    const beat = 1 + Math.sin(animT*2)*0.03;
    particles.forEach(p=>{
      p.x += (p.tx - p.x) * p.speed;
      p.y += (p.ty - p.y) * p.speed;
      const wob = Math.sin(animT*1.5 + p.wobble)*2;
      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 6;
      ctx.globalAlpha = 0.85;
      ctx.arc((p.x+wob)*beat, (p.y+wob)*beat, p.size, 0, Math.PI*2);
      ctx.fill();
    });
    ctx.restore();
    requestAnimationFrame(draw);
  }
  draw();
}
initHeartParticles();

/* ---------------- SECTION 5 : The question ---------------- */
const s5 = el('section'); s5.id = 'section-5';
const s5inner = el('div', 'section-inner fx');
const card5 = el('div', 'card glass fx');
s5inner.appendChild(card5);
s5.appendChild(s5inner);
stage.appendChild(s5);

const choiceWrap = el('div', 'choice-row');
const yesBtn = el('button', 'choice-btn yes', '❤️ نفسي نجرب تاني');
const noBtn = el('button', 'choice-btn no', '🤍 محتاجة أفكر');
choiceWrap.appendChild(yesBtn);
choiceWrap.appendChild(noBtn);

const responseHolder = el('div', 'section-inner');
s5.appendChild(responseHolder);

makeSequencer(card5, [
  'بعد كل اللي فات...',
  'نفسي أسألك سؤال واحد.',
  'ولو إجابته دلوقتي مش معروفة...',
  'ده عادي.',
  'هل ممكن...',
  'ندي لنفسنا فرصة جديدة؟'
], { gap: 2000, onDone: ()=>{
  s5inner.appendChild(choiceWrap);
  setTimeout(()=> choiceWrap.classList.add('fx','show'), 100);
}});

let choiceMade = false;
async function showResponse(lines, isYes){
  if(choiceMade) return;
  choiceMade = true;
  choiceWrap.style.transition = 'opacity .6s ease';
  choiceWrap.style.opacity = '0';
  setTimeout(()=> choiceWrap.remove(), 600);

  if(isYes){
    document.getElementById('moon').classList.add('glow-bright');
    starBoost = 1.6;
    if(window.confetti){
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FB7185','#F9A8D4','#FBBF24','#FFFFFF'],
        scalar: 0.9,
        gravity: 0.6,
        ticks: 220
      });
    }
  }

  const respCard = el('div', 'card glass fx');
  responseHolder.appendChild(respCard);
  makeSequencer(respCard, lines, { gap: 1900, onDone: ()=>{
    setTimeout(()=>{
      document.getElementById('section-final').scrollIntoView({behavior:'smooth'});
    }, 2400);
  }});
}

yesBtn.onclick = ()=> showResponse([
  'شكرًا...',
  'أوعدك...',
  'المرة دي هسمعك أكتر.',
  'وهفهمك أكتر.',
  'وهتمسك بيكي أكتر.',
  'ونبدأ صفحة جديدة...',
  'بكل الحب اللي جوانا.'
], true);

noBtn.onclick = ()=> showResponse([
  'وده حقك.',
  'خدي كل الوقت اللي تحتاجيه.',
  'أنا مش مستني رد دلوقتي.',
  'أنا بس كنت محتاج تعرفي...',
  'إنك لسه غالية عندي.',
  'وأيًا كان قرارك...',
  'هتمنالك السعادة من كل قلبي.'
], false);

/* ---------------- FINAL SCENE ---------------- */
const sf = el('section'); sf.id = 'section-final';
const sfinner = el('div', 'section-inner fx');
sf.appendChild(sfinner);
stage.appendChild(sf);

let finalStarted = false;
const finalObserver = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting && !finalStarted){
      finalStarted = true;
      setTimeout(runFinalSequence, 3000);
    }
  });
}, {threshold:0.4});
finalObserver.observe(sf);

async function runFinalSequence(){
  document.getElementById('moon').classList.add('glow-bright');
  starBoost = 1.5;
  heartSpeedBoost = 1.6;

  const lines1 = [
    'لو وصلتي لحد هنا...',
    'فشكرًا...',
    'إنك سمعتي كل كلمة.',
    'وأيًا كانت نتيجة الثانوية...',
    'أنا فخور بيكي.',
    'لأنك تعبتي...',
    'وصبرتي...',
    'ووصلتي للنهاية.',
    'وأتمنى...',
    'تشوفي فرحة كبيرة جدًا.',
    'وتحققي كل أحلامك.',
    'وأتمنى أشوف ضحكتك دايمًا.',
    'ولو ربنا كتب...',
    'نفسي أكون جزء من الفرحة دي.',
    'ولو الطريق خدنا في اتجاهات مختلفة...',
    'هفضل ممتن لكل الذكريات الجميلة.'
  ];

  makeSequencer(sfinner, lines1, { gap: 2300, onDone: ()=>{
    setTimeout(()=>{
      const glow = el('div', 'glow-final fx show', '❤️ وحشتيني يا سمامسي❤️');
      sfinner.appendChild(glow);
      setTimeout(showMusicPlayer, 5000);
    }, 800);
  }});
}

/* ---------------- MUSIC PLAYER + EPILOGUE ---------------- */
function showMusicPlayer(){
  const playerWrap = el('div', 'player glass fx');
  playerWrap.innerHTML = `
    <audio id="bgMusic" src="اغنيه.m4a"></audio>
    <button class="cta-btn" id="playMusicBtn">🎵 تشغيل الأغنية</button>
    <div class="player-controls" id="playerControls" style="display:none;">
      <button class="play-pause-btn" id="pauseBtn">⏸</button>
      <input type="range" class="volume-slider" id="volumeSlider" min="0" max="1" step="0.01" value="0.7">
    </div>
  `;
  sfinner.appendChild(playerWrap);
  requestAnimationFrame(()=> playerWrap.classList.add('show'));

  const audio = playerWrap.querySelector('#bgMusic');
  const playBtn = playerWrap.querySelector('#playMusicBtn');
  const controls = playerWrap.querySelector('#playerControls');
  const pauseBtn = playerWrap.querySelector('#pauseBtn');
  const volSlider = playerWrap.querySelector('#volumeSlider');

  let isPlaying = false;

  playBtn.onclick = ()=>{
    audio.volume = parseFloat(volSlider.value);
    audio.play().catch(()=>{ /* src empty by design — silently proceed with visuals */ });
    isPlaying = true;
    playBtn.style.display = 'none';
    controls.style.display = 'flex';

    starBoost = 2;
    document.getElementById('moon').classList.add('glow-bright');
    heartSpeedBoost = 2;
    document.body.classList.add('breathing');

    runEpilogueLines();
  };

  pauseBtn.onclick = ()=>{
    if(isPlaying){
      audio.pause();
      pauseBtn.textContent = '▶';
    } else {
      audio.play().catch(()=>{});
      pauseBtn.textContent = '⏸';
    }
    isPlaying = !isPlaying;
  };

  volSlider.oninput = ()=>{ audio.volume = parseFloat(volSlider.value); };

  audio.onended = ()=> runEnding();
}

async function runEpilogueLines(){
  const epilogueWrap = el('div', 'section-inner');
  sfinner.appendChild(epilogueWrap);
  const holder = el('div', 'reveal-line fx');
  epilogueWrap.appendChild(holder);

  const lines = [
    'يمكن دي مش نهاية الحكاية...',
    'يمكن تكون بداية جديدة.',
    'أنا مش عارف الأيام مخبية إيه...',
    'لكن عارف حاجة واحدة...',
    'إني عمري ما بطلت أتمنالك الخير.',
    'ولو في يوم...',
    'قررنا نبدأ من جديد...',
    'هحبك كل يوم...',
    'وكأنه أول يوم.'
  ];

  for(const line of lines){
    holder.classList.remove('show');
    await wait(200);
    holder.textContent = line;
    holder.classList.add('show');
    await wait(4600);
    holder.classList.remove('show');
    await wait(900);
  }

  // After epilogue lines, fade everything except heart/moon/stars/hearts
  holder.remove();
  document.querySelectorAll('#section-final .fx, #section-1 .fx, #section-2 .fx, #section-3 .fx, #section-4 .fx, #section-5 .fx')
    .forEach(node=>{
      if(!node.closest('.player')) node.style.transition = 'opacity 2.5s ease';
    });

  const onlyHeart = el('div', 'glow-final show', '❤️');
  onlyHeart.style.marginTop = '2rem';
  sfinner.appendChild(onlyHeart);
}

// Fallback: if audio never actually plays (empty src) trigger ending after epilogue anyway
function runEnding(){
  const blackout = document.getElementById('blackout');
  const finalMsg = document.getElementById('final-msg');
  finalMsg.innerHTML = 'مهما كانت النهاية...<br>هتفضلي واحدة من أجمل الحكايات في حياتي.';
  blackout.classList.add('active');
  setTimeout(()=> finalMsg.classList.add('show'), 1800);
}

/* Since the audio src is intentionally empty, give a graceful path to the
   final message a while after the epilogue completes, without requiring
   a real audio file to end. */
let epilogueEndingArmed = false;
const origRunEpilogue = runEpilogueLines;
runEpilogueLines = async function(){
  await origRunEpilogue();
  if(!epilogueEndingArmed){
    epilogueEndingArmed = true;
    setTimeout(runEnding, 6000);
  }
};

/* ---------- Scroll hint on first section ---------- */
const hint = el('div', 'scroll-hint fx show', 'انزلي لتكملي<br><span>↓</span>');
s1.appendChild(hint);
setTimeout(()=>{ observeAll(); }, 500);

/* Mouse glow (subtle, desktop) */
if(window.matchMedia('(hover:hover)').matches){
  document.addEventListener('mousemove', (e)=>{
    document.body.style.setProperty('--mx', e.clientX+'px');
    document.body.style.setProperty('--my', e.clientY+'px');
  });
}
