const urls = {
  def: 'https://mc.yandex.ru/metrika/watch.js',
  cdn: 'https://cdn.jsdelivr.net/npm/yandex-metrica-watch/watch.js'
}

function getBaseUrl(scriptURL=null, useCDN=false){
  return scriptURL || useCDN
    ? scriptURL
      ? scriptURL
      : urls.cdn
    : urls.def
}

const defaultOptions = {
  trackLinks : true,
  triggerEvent :true,
};

export function metrica({scriptURL=null, useCDN=false, async=true, options}){
  if(async) {
    return '<scr' + `ipt type="text/javascript">(function(d,w,c){(w[c]=w[c]||[]).push(function(){try{${addCounters(options)}}catch(e){}});var n=d.getElementsByTagName("script")[0],s=d.createElement("script"),f=function(){n.parentNode.insertBefore(s,n);};s.type="text/javascript";s.async=true;s.src="${getBaseUrl(scriptURL, useCDN)}";if(w.opera=="[object Opera]"){d.addEventListener("DOMContentLoaded",f,false);}else{f();}})(document,window,"yandex_metrika_callbacks")</scr` + 'ipt>';
  } else {
    return '<scr' + `ipt type="text/javascript" src="${getBaseUrl(scriptURL, useCDN)}"></scr` + 'ipt><scr' + `ipt type="text/javascript"> try {${addCounters(options, true)}} catch(e){}</scr` + 'ipt>'
  }
}

function addCounters(options, async=false){
  let opener = async ? 'var yaCounter' : 'w.yaCounter';
  return options.reduce((prev, counter) => prev +
    opener + counter.id + '=new Ya.Metrika('+
      JSON.stringify(Object.assign(defaultOptions, counter)) +
    ');',
  '');
}



