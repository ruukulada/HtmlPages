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

function getLatLonSmart() {
  return new Promise((resolve) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        pos => resolve([pos.coords.latitude, pos.coords.longitude]),
        () => tryIPLookup(resolve),
        { timeout: 5000 }
      );
    } else {
      tryIPLookup(resolve);
    }
  });
}

function tryIPLookup(resolve) {
  fetch('https://ipwho.is/')
    .then(res => res.json())
    .then(data => resolve([data.latitude, data.longitude]))
    .catch(() => {
      // fallback to time zone approximation
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const fallbackMap = {
        "America/New_York": [40.7128, -74.0060],
        "America/Chicago": [41.8781, -87.6298],
        "America/Denver": [39.7392, -104.9903],
        "America/Los_Angeles": [34.0522, -118.2437],
        "Europe/London": [51.5074, -0.1278],
        "Europe/Berlin": [52.52, 13.4050],
        "Asia/Tokyo": [35.6895, 139.6917],
        "Asia/Kolkata": [28.6139, 77.2090],
        "Australia/Sydney": [-33.8688, 151.2093],
      };
      resolve(fallbackMap[tz] || [40.0, -90.0]); // default: central US
    });
}

function guessLocationAndSetImage() {
  const now = new Date();

  getLatLonSmart().then(([lat, lon]) => {
    const times = SunCalc.getTimes(now, lat, lon);
    const imageFile = findClosestImage(now, times.sunrise, times.sunset);
    document.querySelector('.bg-layer').style.backgroundImage = `url('images/${imageFile}')`;
  });
}

guessLocationAndSetImage();
