
// FX ONLY – hover + scroll (no layout changes)

// Hover for event cards and countdown items
const hoverTargets = document.querySelectorAll(
  '.countdown div, .contador div, .count-box, section div'
);

hoverTargets.forEach(el => {
  el.addEventListener('mouseenter', () => {
    el.classList.add('fx-hover');
  });
  el.addEventListener('mouseleave', () => {
    el.classList.remove('fx-hover');
  });
});

// Scroll active (soft)
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    entry.target.classList.toggle('fx-active', entry.isIntersecting);
  });
}, { threshold: 0.55 });

hoverTargets.forEach(el => observer.observe(el));
