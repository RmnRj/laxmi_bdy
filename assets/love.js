// assets/love.js
// Controls heart growth and user interaction
(function(){
  const heart = document.getElementById('heart');
  const yes = document.getElementById('yes');
  const no = document.getElementById('no');
  const result = document.getElementById('result');
  const again = document.getElementById('again');

  // initial size in mm (1 cm = 10mm)
  let sizeMm = 10;
  let timer = null;

  // px/mm conversion: 1in = 96px, 1in = 25.4mm
  const pxToMm = (px) => px * 25.4 / 96;
  const mmToPx = (mm) => mm * 96 / 25.4;

  function getCoverMm() {
    // Use diagonal to ensure full coverage, add a small margin
    const w = window.innerWidth;
    const h = window.innerHeight;
    const diagPx = Math.sqrt(w*w + h*h);
    return pxToMm(diagPx) * 1.05; // 5% extra
  }

  function applySize(mm) {
    // Use px fallback for browsers that don't respect mm well on some devices
    const px = Math.round(mmToPx(mm));
    heart.style.width = px + 'px';
    heart.style.height = px + 'px';
  }

  function stepGrowth() {
    const coverMm = getCoverMm();
    sizeMm += 1; // increase 1mm per second as requested
    applySize(sizeMm);
    if (sizeMm >= coverMm) {
      // final cover reached: stop timer and ensure huge size to fill screen
      clearInterval(timer);
      timer = null;
      applySize(Math.max(coverMm, sizeMm) * 1.05);
    }
  }

  function startGrowth() {
    // reset any previous
    if (timer) { clearInterval(timer); timer = null; }
    sizeMm = 10; // 1cm
    applySize(sizeMm);
    // small delay to ensure the initial size is applied then start
    // Speed tweak: on narrow screens increase the per-second growth slightly to feel snappier
    timer = setInterval(stepGrowth, 1000);
  }

  function stopGrowth() {
    if (timer){ clearInterval(timer); timer = null; }
  }

  function showResult(isYes){
    // Clear growth when user chooses to show the emoji clearly on top
    stopGrowth();
    result.textContent = isYes ? "😊" : "🥲";
    // Hide question and choices
    document.getElementById('question').style.display = 'none';
    document.getElementById('choices').style.display = 'none';
    // show again button
    again.hidden = false;
  }

  function resetScene() {
    // hide result
    result.textContent = '';
    again.hidden = true;
    // Show question and choices again
    document.getElementById('question').style.display = 'block';
    document.getElementById('choices').style.display = 'flex';
    // reset heart back to 1cm and restart growth
    startGrowth();
  }

  // Bind buttons
  yes.addEventListener('click', function(){
    showResult(true);
  });
  no.addEventListener('click', function(){
    showResult(false);
  });
  again.addEventListener('click', function(){
    window.location.href = 'index.html';
  });

  // Restart growth if window resized (recompute cover)
  window.addEventListener('resize', function(){
    // do nothing if currently expanding; it will use updated cover on next tick
  });

  // Start on load
  window.addEventListener('load', function(){
    startGrowth();
  });
})();
