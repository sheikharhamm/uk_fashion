const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

function downloadWithRedirect(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    }, (res) => {
      console.log('Status:', res.statusCode);
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        console.log('Redirecting to:', res.headers.location.slice(0, 80));
        file.close();
        return downloadWithRedirect(res.headers.location, dest).then(resolve).catch(reject);
      }
      console.log('Content-Type:', res.headers['content-type']);
      console.log('Content-Length:', res.headers['content-length']);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(dest);
      });
    });
    req.on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

const videoUrl = 'https://instagram.fkhi22-1.fna.fbcdn.net/o1/v/t2/f2/m86/AQNJe07VxciX0wU95bTM3EJppy7ezJAsOBDdfC_GPW6Obvcm70HgSekVV_cGto3U0emq5Kpx4N7kt6rdvDb16cQ4b28KGt6LoMDZbgE.mp4?_nc_cat=106&_nc_oc=AdpNUMChdy2g1Zj1xgXbaycRE2ovcb6P7gjo45yDrNB9zmLZJtidpW_JIkRaeakLto0&_nc_sid=5e9851&_nc_ht=instagram.fkhi22-1.fna.fbcdn.net&_nc_ohc=DzdCNddffA8Q7kNvwFelr_D&efg=eyJ2ZW5jb2RlX3RhZyI6Inhwdl9wcm9ncmVzc2l2ZS5JTlNUQUdSQU0uQ0xJUFMuQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSIsInhwdl9hc3NldF9pZCI6MTAzMDM1NTM1OTk5NDIyOCwiYXNzZXRfYWdlX2RheXMiOjkzLCJ2aV91c2VjYXNlX2lkIjoxMDA5OSwiZHVyYXRpb25fcyI6MywidXJsZ2VuX3NvdXJjZSI6Ind3dyJ9&ccb=17-1&vs=f717d14528459d21&_nc_vs=HBkcFQIYUmlnX3hwdl9yZWVsc19wZXJtYW5lbnRfc3JfcHJvZC8xNTRFMzU2RjFCMEEyQUNGMTEyNjQwMkM2MzhGMEE4MV92aWRlb19kYXNoaW5pdC5tcDQVAALIARIAKAAYABsCiAd1c2Vfb2lsATEScHJvZ3Jlc3NpdmVfcmVjaXBlATEVAAAm6MXM08nG1AMVAigCQzMsF0AOKPXCj1wpGBJkYXNoX2Jhc2VsaW5lXzFfdjERAHX-B2XmnQEA&_nc_gid=DAsqSSFMoCB-KIUtyepbhw&_nc_ss=7b689&_nc_map=urlgen_bucketless&_nc_zt=28&oh=00_AQR-uzpr3exu1w2tUH8L0PRpC-pNXRkO_lGNB3KIQCdDJw&oe=6AF49B9F';
const mediaDir = path.join(__dirname, '..', '..', 'public', 'media');
fs.mkdirSync(mediaDir, { recursive: true });
const dest = path.join(mediaDir, 'real_kj_reel.mp4');

downloadWithRedirect(videoUrl, dest).then(() => {
  console.log('SUCCESS! File downloaded:', fs.statSync(dest).size, 'bytes');
}).catch(e => console.log('Err:', e));