export const ripple = {
  add(el, e, color) {
    if (el.querySelector('.ripple') || el.classList.contains('disable')) return;

    if (!color) {
      const rgbClr = getComputedStyle(el).color;
      const rgbaClr = rgbClr.replace('rgb', 'rgba').replace(')', ', 0.3)');
      color = rgbaClr;
    }
    
    const rect = el.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.style.background = color;
    ripple.classList.add('ripple');
  
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
  
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
  
    el.style.overflow = 'hidden';
    el.style.position = 'relative';
    el.appendChild(ripple);
  
    ripple.addEventListener('animationend', () => {
        ripple.remove();
        el.style.removeProperty('overflow');
        el.style.removeProperty('position');
    });
  }
};