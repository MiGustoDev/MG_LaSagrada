// Fecha de lanzamiento: 11 de junio de 2026 a las 18:00 hs (hora Argentina, UTC-3)
export const LAUNCH_DATE = new Date('2026-06-11T18:00:00-03:00');

export function getCountdownParts(now = new Date()) {
  const diff = LAUNCH_DATE - now;
  if (diff <= 0) {
    return { days: 0, hours: 0, mins: 0, secs: 0 };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    secs: Math.floor((diff % (1000 * 60)) / 1000),
  };
}
