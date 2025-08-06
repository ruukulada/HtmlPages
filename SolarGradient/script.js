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

function getClosestImageBySunPosition(azimuth, altitude) {
  const currentVec = toCartesian(azimuth, altitude);
  let closest = null;
  let minDist = Infinity;
  for (const image of imgVectors) {
    const imageVec = toCartesian(image.a*(Math.PI/180), image.z*(Math.PI/180));
    const dist = euclideanDistance(currentVec, imageVec);
    if (dist < minDist) {
      minDist = dist;
      closest = image.label;
    }
  }
  return closest;
}

function toCartesian(altitude, azimuth) {
  const x = Math.cos(altitude) * Math.sin(azimuth);
  const y = Math.cos(altitude) * Math.cos(azimuth);
  const z = Math.sin(altitude);
  return [x, y, z];
}

function euclideanDistance([x1, y1, z1], [x2, y2, z2]) {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2);
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

function cutToImage(newImagePath) {
  const front = document.querySelector('.front');
  const back = document.querySelector('.back');
  const img = new Image();
  img.src = newImagePath;
  img.onload = () => {
    front.style.backgroundImage = `url('${newImagePath}')`;
    front.style.transition = 'none';
    front.style.opacity = '1';
    back.style.transition = 'none';
    back.style.opacity = '0';
    front.classList.remove('front');
    front.classList.add('back');
    back.classList.remove('back');
    back.classList.add('front');
  };
}

let currentImage = null;
function guessLocationAndSetImage(isStatic) {
  const now = new Date();
  getLatLonSmart().then(([lat, lon]) => {
    console.log(`Using coordinates: lat=${lat}, lon=${lon}`);
    const times = SunCalc.getTimes(now, lat, lon);
    console.log(`Sun: rise=${times.sunrise.toTimeString()}, set=${times.sunset.toTimeString()}`);
    const pos = SunCalc.getPosition(now, lat, lon);
    console.log(`Sun: altitude=${pos.altitude*(180/Math.PI)}, azimuth=${(pos.azimuth+Math.PI)*(180/Math.PI)}`);
    const newImage = getClosestImageBySunPosition(pos.altitude, pos.azimuth+Math.PI);
    if (newImage !== currentImage) {
      if(isStatic){
        cutToImage(`images/${newImage}`);
      }
      else{
        crossfadeToImage(`images/${newImage}`);
      }
      currentImage = newImage;
    }
  });
}

const isStatic = new URLSearchParams(window.location.search).has('static');
if (isStatic) {
  guessLocationAndSetImage(isStatic);
} else {
  document.body.classList.add('is-not-static');
  setTimeout(() => {
    guessLocationAndSetImage();
    preloadImages();
  }, 500);
}

setInterval(() => {
  guessLocationAndSetImage(isStatic);
}, 15 * 60 * 1000); // every 15 minutes
