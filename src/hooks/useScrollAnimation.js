import { useEffect, useRef } from 'react';

/**
 * useScrollAnimation
 *
 * Attaches an IntersectionObserver to a container element.
 *
 * Default mode (children):
 *   Observes the container's direct children. On enter, adds `animate-in` /
 *   removes `animate-out` on each child with a staggered transitionDelay of
 *   index * 100ms. On exit, reverses the classes.
 *
 * Single mode ({ single: true }):
 *   Observes the container element itself instead of its children.
 *
 * Both modes add `scroll-observe` to each target on mount so elements start
 * hidden (opacity: 0, translateY: 20px via CSS).
 *
 * Falls back gracefully when IntersectionObserver is unavailable.
 *
 * @param {number} [threshold=0.15]
 * @param {{ single?: boolean }} [options={}]
 * @returns {React.RefObject<HTMLElement>}
 */
function useScrollAnimation(threshold = 0.15, options = {}) {
  const ref = useRef(null);
  const { single = false } = options;

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    // Determine the list of targets to observe / animate
    const targets = single ? [container] : Array.from(container.children);

    // Add scroll-observe so elements start in the hidden state
    targets.forEach((el) => el.classList.add('scroll-observe'));

    // Guard: fall back to visible state when API is unavailable
    if (typeof IntersectionObserver === 'undefined') {
      targets.forEach((el) => {
        el.classList.add('animate-in');
        el.classList.remove('animate-out', 'scroll-observe');
      });
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          targets.forEach((el, index) => {
            el.style.transitionDelay = `${index * 100}ms`;
            el.classList.add('animate-in');
            el.classList.remove('animate-out');
          });
        } else {
          targets.forEach((el, index) => {
            el.style.transitionDelay = `${index * 100}ms`;
            el.classList.add('animate-out');
            el.classList.remove('animate-in');
          });
        }
      },
      { threshold }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, [threshold, single]);

  return ref;
}

export default useScrollAnimation;
