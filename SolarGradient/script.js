function findClosestImage(now, sunrise, sunset) {
  const offsets = [
    { label: "01.HEIC", time: () => new Date(sunset.getTime() + 3 * 3600 * 1000) },
    { label: "02.HEIC", time: () => new Date(sunrise.getTime() - 3 * 3600 * 1000) },
    { label: "03.HEIC", time: () => new Date(sunrise.getTime() - 2 * 3600 * 1000) },
    { label: "04.HEIC", time: () => new Date(sunrise.getTime() - 1 * 3600 * 1000) },
    { label: "05.HEIC", time: () => new Date(sunrise.getTime() - 0.5 * 3600 * 1000) },
    { label: "06.HEIC", time: () => new Date(sunrise.getTime() + 0.5 * 3600 * 1000) },
    { label: "07.HEIC", time: () => new Date(sunrise.getTime() + 1 * 3600 * 1000) },
    { label: "08.HEIC", time: () => new Date(sunrise.getTime() + 2 * 3600 * 1000) },
    { label: "09.HEIC", time: () => new Date(sunrise.getTime() + 3 * 3600 * 1000) },
    { label: "10.HEIC", time: () => new Date(sunset.getTime() - 3 * 3600 * 1000) },
    { label: "11.HEIC", time: () => new Date(sunset.getTime() - 2 * 3600 * 1000) },
    { label: "12.HEIC", time: () => new Date(sunset.getTime() - 1 * 3600 * 1000) },
    { label: "13.HEIC", time: () => new Date(sunset.getTime() - 0.5 * 3600 * 1000) },
    { label: "14.HEIC", time: () => new Date(sunset.getTime() + 0.5 * 3600 * 1000) },
    { label: "15.HEIC", time: () => new Date(sunset.getTime() + 1 * 3600 * 1000) },
    { label: "16.HEIC", time: () => new Date(sunset.getTime() + 2 * 3600 * 1000) },
  ];

  let closest = null;
  let minDiff = Infinity;

  offsets.forEach(entry => {
    const target = entry.time();
    const diff = Math.abs(now - target);
    if (diff < minDiff) {
      minDiff = diff;
      closest = entry.label;
    }
  });

  return closest;
}

function guessLocationAndSetImage() {
  const now = new Date();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const tzMap = {
    "America/New_York": [40.7128, -74.0060],
    "America/Los_Angeles": [34.0522, -118.2437],
    "Europe/Berlin": [52.52, 13.4050],
    "Asia/Tokyo": [35.6895, 139.6917],
    // Add more as needed
  };

  const coords = tzMap[timeZone] || [40.0, -90.0]; // Default if unknown
  const times = SunCalc.getTimes(now, coords[0], coords[1]);

  const imageFile = findClosestImage(now, times.sunrise, times.sunset);
  document.body.style.backgroundImage = `url('images/${imageFile}')`;
}

guessLocationAndSetImage();
