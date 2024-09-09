
const cacheMap = "Cache-Map-v1";

self.addEventListener('fetch', e => {

    //if (e.request.url.includes("png") || e.request.url.includes("drive") || e.request.url.includes("view") || e.request.url.includes("youtube") ) {

    //    caches.match((e.request)).then(img => {
          
    //        if (img) return img;

    //        return fetch(e.request).then(OnlineImg => {
    //            caches.open(cacheMap).then(refer => {
                  
    //                refer.put(e.request, OnlineImg);
    //            });
               
    //            return OnlineImg.clone();
    //        })
    //    })
           
    //} else {
       
    //    e.respondWith(fetch(e.request));
    //}
   

});

self.addEventListener('install', e => {


});

self.addEventListener('activate', e => {


});

self.addEventListener('onload', e => {
    console.log(e);
});

