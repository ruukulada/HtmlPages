const imgVectors = [
  { a: -87.61464321640851, z: 260.5898004255673 },
  { a: -17.107833232320647, z: 90.19641045280235 },
  { a: -11.106712852371931, z: 90.18429228027907 },
  { a: -5.355608729615683, z: 90.17504041417948 },
  { a: 0.18772787277664793, z: 90.16773780886592 },
  { a: 6.042681701408481, z: 90.16172842462277 },
  { a: 11.978559286514264, z: 90.15767253075893 },
  { a: 18.453044152377785, z: 90.1550761361018 },
  { a: 88.41858716616146, z: 92.54659158870732 },
  { a: 18.363179677279813, z: 270.0106978090315 },
  { a: 12.137504395377398, z: 270.0174023923966 },
  { a: 6.445125948652895, z: 270.0234735347242 },
  { a: 0.7510129535215688, z: 270.0299192069967 },
  { a: -5.445832546887168, z: 270.0372725068212 },
  { a: -11.196970640174076, z: 270.0443273499976 },
  { a: -17.698226731979346, z: 270.0532386567825 },
];

const gradientStrings = [
  'linear-gradient(to bottom, #05091F 0.0%, #04091F 5.26%, #050A21 10.53%, #050A22 15.79%, #050A23 21.05%, #060B25 26.32%, #070C28 31.58%, #070C2A 36.84%, #080E2E 42.11%, #070E31 47.37%, #091035 52.63%, #0A113A 57.89%, #0B1440 63.16%, #0D1647 68.42%, #0E184F 73.68%, #101C5A 78.95%, #132067 84.21%, #192677 89.47%, #1E2E89 94.74%, #24359A 100.0%)',
  'linear-gradient(to bottom, #10162F 0.0%, #111730 5.26%, #111732 10.53%, #121835 15.79%, #131A37 21.05%, #141B3B 26.32%, #151D3F 31.58%, #171F42 36.84%, #192146 42.11%, #1B234B 47.37%, #1D2651 52.63%, #1F2957 57.89%, #232D5F 63.16%, #263167 68.42%, #2B3771 73.68%, #313F7D 78.95%, #394889 84.21%, #445395 89.47%, #5361A0 94.74%, #6470A6 100.0%)',
  'linear-gradient(to bottom, #181E3A 0.0%, #191E3C 5.26%, #1B203E 10.53%, #1C2142 15.79%, #1D2344 21.05%, #1E2547 26.32%, #20274C 31.58%, #21284F 36.84%, #242B54 42.11%, #272E58 47.37%, #2A325E 52.63%, #2E3564 57.89%, #333A6C 63.16%, #384073 68.42%, #3D467B 73.68%, #474E83 78.95%, #52598B 84.21%, #606691 89.47%, #767691 94.74%, #8D868C 100.0%)',
  'linear-gradient(to bottom, #25253B 0.0%, #26263C 5.26%, #27273F 10.53%, #292941 15.79%, #2B2B44 21.05%, #2D2D47 26.32%, #30304A 31.58%, #33334D 36.84%, #363551 42.11%, #393954 47.37%, #3E3D59 52.63%, #43415E 57.89%, #4A4763 63.16%, #524E69 68.42%, #5C566E 73.68%, #696071 78.95%, #786A71 84.21%, #8B756A 89.47%, #A8845F 94.74%, #C69050 100.0%)',
  'linear-gradient(to bottom, #382C30 0.0%, #3A2D31 5.26%, #3E2F33 10.53%, #403135 15.79%, #433336 21.05%, #453538 26.32%, #483739 31.58%, #4C3A3B 36.84%, #513D3D 42.11%, #56413F 47.37%, #5D4540 52.63%, #644942 57.89%, #6D5043 63.16%, #785643 68.42%, #865D42 73.68%, #97663F 78.95%, #AD6F39 84.21%, #C87933 89.47%, #E57E30 94.74%, #ED7D30 100.0%)',
  'linear-gradient(to bottom, #383A63 0.0%, #393C65 5.26%, #3B3D68 10.53%, #3D3F6B 15.79%, #40426E 21.05%, #434571 26.32%, #474875 31.58%, #4A4B78 36.84%, #4F507C 42.11%, #555581 47.37%, #5B5A84 52.63%, #636188 57.89%, #6C688C 63.16%, #78718E 68.42%, #867B90 73.68%, #97868D 78.95%, #AC9182 84.21%, #C89F72 89.47%, #E9AC5D 94.74%, #F2B24A 100.0%)',
  'linear-gradient(to bottom, #374493 0.0%, #384697 5.26%, #3A489A 10.53%, #3C4B9F 15.79%, #3E4DA3 21.05%, #4150A7 26.32%, #4454AC 31.58%, #4857B0 36.84%, #4C5BB6 42.11%, #5160BB 47.37%, #5665C0 52.63%, #5D6CC6 57.89%, #6573CB 63.16%, #6F7CCF 68.42%, #7A85D0 73.68%, #8B93D0 78.95%, #A1A1C9 84.21%, #BDB3BC 89.47%, #DFC2A1 94.74%, #F4CC85 100.0%)',
  'linear-gradient(to bottom, #3B52BB 0.0%, #3D53BF 5.26%, #3F55C3 10.53%, #4057C8 15.79%, #425ACB 21.05%, #455DD0 26.32%, #4860D6 31.58%, #4C64DC 36.84%, #4F68E1 42.11%, #546DE6 47.37%, #5972EC 52.63%, #5F79F2 57.89%, #6780F6 63.16%, #6F89F6 68.42%, #7B93F7 73.68%, #8A9FF8 78.95%, #9CAEF7 84.21%, #B5BFED 89.47%, #D5D0D5 94.74%, #F3DEBA 100.0%)',
  'linear-gradient(to bottom, #4F76F5 0.0%, #5077F5 5.26%, #5077F5 10.53%, #5077F5 15.79%, #5077F5 21.05%, #5178F5 26.32%, #5279F6 31.58%, #537AF5 36.84%, #557BF6 42.11%, #567DF5 47.37%, #587EF5 52.63%, #5B80F6 57.89%, #5F83F6 63.16%, #6386F6 68.42%, #698BF7 73.68%, #7192F7 78.95%, #7D9AF8 84.21%, #8DA4F8 89.47%, #A3B1F0 94.74%, #BABAD8 100.0%)',
  'linear-gradient(to bottom, #3B52BB 0.0%, #3C52BE 5.26%, #3F54C3 10.53%, #4057C7 15.79%, #425ACB 21.05%, #455DD0 26.32%, #4860D5 31.58%, #4B64DA 36.84%, #4F68E0 42.11%, #546DE6 47.37%, #5973EC 52.63%, #5F78F2 57.89%, #6780F5 63.16%, #6F88F6 68.42%, #7B93F7 73.68%, #8A9FF9 78.95%, #9CAEF7 84.21%, #B5BFED 89.47%, #D5D0D4 94.74%, #F2DDB9 100.0%)',
  'linear-gradient(to bottom, #364299 0.0%, #36439C 5.26%, #3845A0 10.53%, #3A47A3 15.79%, #3C49A7 21.05%, #3F4CAC 26.32%, #424FB1 31.58%, #4553B6 36.84%, #4A57BB 42.11%, #4F5CC1 47.37%, #5461C6 52.63%, #5B67CC 57.89%, #636ED1 63.16%, #6C76D5 68.42%, #7981D8 73.68%, #898DD7 78.95%, #9F9CD1 84.21%, #BBADC2 89.47%, #DCBCA7 94.74%, #F4C68A 100.0%)',
  'linear-gradient(to bottom, #35346C 0.0%, #363670 5.26%, #393873 10.53%, #3B3A76 15.79%, #3D3C7A 21.05%, #403E7D 26.32%, #444281 31.58%, #474585 36.84%, #4C4989 42.11%, #524D8E 47.37%, #585392 52.63%, #605898 57.89%, #695F9B 63.16%, #75689F 68.42%, #8473A1 73.68%, #957E9F 78.95%, #A98894 84.21%, #C49380 89.47%, #E5A066 94.74%, #F1A64D 100.0%)',
  'linear-gradient(to bottom, #3C293A 0.0%, #3D2A3B 5.26%, #3F2B3D 10.53%, #422E40 15.79%, #452F41 21.05%, #483143 26.32%, #4B3345 31.58%, #4F3547 36.84%, #55394A 42.11%, #593B4B 47.37%, #5F3E4C 52.63%, #67424E 57.89%, #6F464D 63.16%, #784A4B 68.42%, #855049 73.68%, #965844 78.95%, #AC613D 84.21%, #C76932 89.47%, #E5702D 94.74%, #ED6F2D 100.0%)',
  'linear-gradient(to bottom, #23213E 0.0%, #242240 5.26%, #262443 10.53%, #282545 15.79%, #2A2748 21.05%, #2B284C 26.32%, #2E2B4F 31.58%, #312E53 36.84%, #343056 42.11%, #38335B 47.37%, #3C3760 52.63%, #423B65 57.89%, #48406B 63.16%, #504771 68.42%, #5A4E76 73.68%, #67577A 78.95%, #77627C 84.21%, #896D74 89.47%, #A37866 94.74%, #C18556 100.0%)',
  'linear-gradient(to bottom, #181C3B 0.0%, #181D3E 5.26%, #1A1E40 10.53%, #1B2043 15.79%, #1C2145 21.05%, #1D2248 26.32%, #1E244C 31.58%, #212751 36.84%, #232955 42.11%, #262C5A 47.37%, #282E60 52.63%, #2C3267 57.89%, #30376D 63.16%, #363C75 68.42%, #3C427D 73.68%, #444A86 78.95%, #4F548F 84.21%, #5E6094 89.47%, #737196 94.74%, #8B8191 100.0%)',
  'linear-gradient(to bottom, #0F142D 0.0%, #10152F 5.26%, #111732 10.53%, #111833 15.79%, #111936 21.05%, #131A3A 26.32%, #141B3D 31.58%, #161E40 36.84%, #171F45 42.11%, #19224A 47.37%, #1C254F 52.63%, #1E2856 57.89%, #212C5D 63.16%, #253066 68.42%, #29366F 73.68%, #2F3D7B 78.95%, #374687 84.21%, #425194 89.47%, #515FA0 94.74%, #606EA5 100.0%)'
];

const params = new URLSearchParams(window.location.search);
const isStatic = params.has('static');
let currentImageNdx = null;
let lat, lon;

getLatLonSmart().then(([resolvedLat, resolvedLon]) => {
  lat = resolvedLat;
  lon = resolvedLon;
  if (isStatic) {
    setImage(isStatic);
  } else {
    document.body.classList.add('is-not-static');
    setTimeout(() => {
      setImage(isStatic);
    }, 500);
  }
  setInterval(() => {
    setImage(isStatic);
  }, 5 * 60 * 1000); // every 5 minutes
});

function getLatLonSmart() {
  return new Promise((resolve) => {
    const paramLat = parseFloat(params.get("lat"));
    const paramLon = parseFloat(params.get("lon"));
    if (isValidLatLon(paramLat, paramLon)) {
      resolve([paramLat, paramLon]);
      return;
    }
    tryIpLookup(resolve);
  });
}

function tryIpLookup(resolve) {
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
}

function tryGeolocation(resolve) {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      pos => resolve([pos.coords.latitude, pos.coords.longitude]),
      () => tryTimezone(resolve),
      { timeout: 5000 }
    );
  } else {
    tryTimezone(resolve);
  }
}

function tryTimezone(resolve) {
  import('./constants/timezone-coords.js')
  .then(module => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    resolve(module.tzCoords[tz] || [0.0, 0.0]);
  }).catch(() => {
      resolve([0.0, 0.0]);
  });
}

function isValidLatLon(lat, lon) {
  return !isNaN(lat) && !isNaN(lon) && lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180;
}

function getClosestImageBySunPosition(azimuth, altitude) {
  const currentVec = toCartesian(azimuth, altitude);
  let ndx = 0;
  let closest = null;
  let minDist = Infinity;
  for (const image of imgVectors) {
    const imageVec = toCartesian(image.a*(Math.PI/180), image.z*(Math.PI/180));
    const dist = euclideanDistance(currentVec, imageVec);
    if (dist < minDist) {
      minDist = dist;
      closest = ndx;
    }
    ndx++;
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

function setImage(isStatic) {
  const now = new Date();
  console.log(`Using coordinates: lat=${lat}, lon=${lon}`);
  const times = SunCalc.getTimes(now, lat, lon);
  console.log(`Sun: rise=${times.sunrise.toTimeString()}, set=${times.sunset.toTimeString()}`);
  const pos = SunCalc.getPosition(now, lat, lon);
  console.log(`Sun: altitude=${pos.altitude*(180/Math.PI)}, azimuth=${(pos.azimuth+Math.PI)*(180/Math.PI)}`);
  const newImageNdx = getClosestImageBySunPosition(pos.altitude, pos.azimuth+Math.PI);
  if (newImageNdx !== currentImageNdx) {
    const newImage = gradientStrings[newImageNdx];
    if (isStatic) {
      cutToImage(newImage);
    }
    else {
      crossfadeToImage(newImage);
    }
    currentImageNdx = newImageNdx;
  }
}

function crossfadeToImage(newImage) {
  const front = document.querySelector('.front');
  const back = document.querySelector('.back');

  front.style.backgroundImage = newImage;
  
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
}

function cutToImage(newImage) {
  const front = document.querySelector('.front');
  const back = document.querySelector('.back');

  front.style.backgroundImage = newImage;

  front.style.transition = 'none';
  front.style.opacity = '1';
  back.style.transition = 'none';
  back.style.opacity = '0';

  front.classList.remove('front');
  front.classList.add('back');
  back.classList.remove('back');
  back.classList.add('front');
}
