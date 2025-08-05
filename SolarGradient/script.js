function preloadImages() {
  const imageFiles = Array.from({ length: 16 }, (_, i) => {
    const n = String(i + 1).padStart(2, '0');
    return `images/${n}.png`;
  });
  imageFiles.forEach(src => {
    const img = new Image();
    img.src = src;
  });  
}

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
        "America/Phoenix": [33.4484, -112.0740],
        "America/Anchorage": [61.2181, -149.9003],
        "Pacific/Honolulu": [21.3069, -157.8583],
        "America/Sao_Paulo": [-23.5505, -46.6333],
        "Europe/London": [51.5074, -0.1278],
        "Europe/Paris": [48.8566, 2.3522],
        "Europe/Berlin": [52.5200, 13.4050],
        "Europe/Moscow": [55.7558, 37.6173],
        "Africa/Johannesburg": [-26.2041, 28.0473],
        "Asia/Dubai": [25.2048, 55.2708],
        "Asia/Kolkata": [28.6139, 77.2090],
        "Asia/Bangkok": [13.7563, 100.5018],
        "Asia/Singapore": [1.3521, 103.8198],
        "Asia/Tokyo": [35.6895, 139.6917],
        "Asia/Seoul": [37.5665, 126.9780],
        "Asia/Shanghai": [31.2304, 121.4737],
        "Asia/Hong_Kong": [22.3193, 114.1694],
        "Asia/Jakarta": [-6.2088, 106.8456],
        "Australia/Perth": [-31.9505, 115.8605],
        "Australia/Adelaide": [-34.9285, 138.6007],
        "Australia/Sydney": [-33.8688, 151.2093],
        "Pacific/Auckland": [-36.8485, 174.7633],
        "Pacific/Fiji": [-17.7134, 178.0650]
      };      
      resolve(fallbackMap[tz] || [40.0, -90.0]); // default: central US
    });
}

function crossfadeToImage(newImagePath) {
  const front = document.querySelector('.front');
  const back = document.querySelector('.back');

  const img = new Image();
  img.src = newImagePath;

  img.onload = () => {
    front.style.backgroundImage = `url('${newImagePath}')`;

    // Start fade once image is ready
    front.style.opacity = '1';
    back.style.opacity = '0';

    setTimeout(() => {
      front.classList.remove('front');
      front.classList.add('back');
      back.classList.remove('back');
      back.classList.add('front');
    }, 1000); // Match transition duration
  };
}


let currentImage = null;
function guessLocationAndSetImage() {
  const now = new Date();

  getLatLonSmart().then(([lat, lon]) => {
    const times = SunCalc.getTimes(now, lat, lon);
    const newImage = findClosestImage(now, times.sunrise, times.sunset);
    if (newImage !== currentImage) {
      crossfadeToImage(`images/${newImage}`);
      currentImage = newImage;
    }
  });
}

preloadImages();
setTimeout(() => {
  guessLocationAndSetImage();
}, 500);

setInterval(() => {
  guessLocationAndSetImage();
}, 15 * 60 * 1000); // every 15 minutes
