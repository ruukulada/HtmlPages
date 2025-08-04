function findClosestImage(now, sunrise, sunset) {
  const offsets = [
    { label: "01.png", time: () => new Date(sunset.getTime() + 3 * 3600 * 1000) },
    { label: "02.png", time: () => new Date(sunrise.getTime() - 3 * 3600 * 1000) },
    { label: "03.png", time: () => new Date(sunrise.getTime() - 2 * 3600 * 1000) },
    { label: "04.png", time: () => new Date(sunrise.getTime() - 1 * 3600 * 1000) },
    { label: "05.png", time: () => new Date(sunrise.getTime() - 0.5 * 3600 * 1000) },
    { label: "06.png", time: () => new Date(sunrise.getTime() + 0.5 * 3600 * 1000) },
    { label: "07.png", time: () => new Date(sunrise.getTime() + 1 * 3600 * 1000) },
    { label: "08.png", time: () => new Date(sunrise.getTime() + 2 * 3600 * 1000) },
    { label: "09.png", time: () => new Date(sunrise.getTime() + 3 * 3600 * 1000) },
    { label: "10.png", time: () => new Date(sunset.getTime() - 3 * 3600 * 1000) },
    { label: "11.png", time: () => new Date(sunset.getTime() - 2 * 3600 * 1000) },
    { label: "12.png", time: () => new Date(sunset.getTime() - 1 * 3600 * 1000) },
    { label: "13.png", time: () => new Date(sunset.getTime() - 0.5 * 3600 * 1000) },
    { label: "14.png", time: () => new Date(sunset.getTime() + 0.5 * 3600 * 1000) },
    { label: "15.png", time: () => new Date(sunset.getTime() + 1 * 3600 * 1000) },
    { label: "16.png", time: () => new Date(sunset.getTime() + 2 * 3600 * 1000) },
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
  document.querySelector('.bg-layer').style.backgroundImage = `url('images/${imageFile}')`;
}

guessLocationAndSetImage();
