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
    fetch('https://ipwho.is/')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.latitude && data.longitude) {
          resolve([data.latitude, data.longitude]);
        } else {
          tryGeolocation(resolve);
        }
      })
      .catch(() => tryGeolocation(resolve));
  });
}

function tryGeolocation(resolve) {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      pos => resolve([pos.coords.latitude, pos.coords.longitude]),
      () => fallbackToTimezone(resolve),
      { timeout: 5000 }
    );
  } else {
    fallbackToTimezone(resolve);
  }
}

function fallbackToTimezone(resolve) {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  resolve(tzCoords[tz] || [40.0, -90.0]);
}

function crossfadeToImage(newImagePath) {
  const front = document.querySelector('.front');
  const back = document.querySelector('.back');
  const img = new Image();
  img.src = newImagePath;
  img.onload = () => {
    front.style.backgroundImage = `url('${newImagePath}')`;
    front.style.transition = 'opacity 1s ease-in-out';
    front.style.opacity = '1';
    setTimeout(() => {
      back.style.transition = 'opacity 1s ease-in-out';
      back.style.opacity = '0';
    }, 1000);
    setTimeout(() => {
      front.classList.remove('front');
      front.classList.add('back');
      back.classList.remove('back');
      back.classList.add('front');
      back.style.opacity = '0';
      front.style.opacity = '1';
    }, 2000);
  };
}

let currentImage = null;
function guessLocationAndSetImage() {
  const now = new Date();
  getLatLonSmart().then(([lat, lon]) => {
    console.log(`Using coordinates: lat=${lat}, lon=${lon}`);
    const times = SunCalc.getTimes(now, lat, lon);
    console.log(`Sun: rise=${times.sunrise}, set=${times.sunset}`);
    const positions = SunCalc.getPosition(now, lat, lon);
    console.log(`Sun: altitude=${positions.altitude}, azimuth=${positions.azimuth}`);
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
