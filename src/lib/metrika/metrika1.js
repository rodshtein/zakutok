const urls = {
  def: 'https://mc.yandex.ru/metrika/watch.js',
  cdn: 'https://cdn.jsdelivr.net/npm/yandex-metrica-watch/watch.js'
}

let validOptions = (options) => options.filter(item => item.id).length === options.length;

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

export function tagConstructor({scriptURL=null, useCDN=false, async=true, options}){
  if(async) {
    return '<scr' + `ipt type="text/javascript">(function(d,w,c){(w[c]=w[c]||[]).push(function(){try{${addInlineCounters(options)}}catch(e){}});var n=d.getElementsByTagName("script")[0],s=d.createElement("script"),f=function(){n.parentNode.insertBefore(s,n);};s.type="text/javascript";s.async=true;s.src="${getBaseUrl(scriptURL, useCDN)}";if(w.opera=="[object Opera]"){d.addEventListener("DOMContentLoaded",f,false);}else{f();}})(document,window,"yandex_metrika_callbacks")</scr` + 'ipt>';
  } else {
    return '<scr' + `ipt type="text/javascript" src="${getBaseUrl(scriptURL, useCDN)}"></scr` + 'ipt><scr' + `ipt type="text/javascript"> try {${addInlineCounters(options, true)}} catch(e){}</scr` + 'ipt>'
  }
}

function addInlineCounters(options, async=false){
  let opener = async ? 'var yaCounter' : 'w.yaCounter';
  return options.reduce((prev, counter) => prev +
    opener + counter.id + '=new Ya.Metrika('+
      JSON.stringify(Object.assign(defaultOptions, counter)) +
    ');',
  '');
}

export function bodyConstructor(options, response){
  response.body = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8" /><link rel="icon" href="/favicon.ico" />${tagConstructor({options})}</head><body></body></html>`;
  return response
}



export function ymHandler(ua, options, response){
  options = Array.isArray(options) ? options : [options];
  if(ua.toLowerCase().includes("metrika") &&
  ua.toLowerCase().includes("yandex")){
    if(validOptions(options)) {
      return bodyConstructor(options, response)
    } else {
      console.info("[Y.Metrika][Hook] Can't find all YM ID's! Check options")
      return response
    }
  } else {
    return response
  }
}


export function initMetrika({lazy=false, scriptURL=null, useCDN = false, options}={}){
  options = Array.isArray(options) ? options : [options];

  let validOptions = options.filter(item => item.id).length === options.length;

  if(!validOptions) {
    console.info("[Y.Metrika][initMetrika] Can't find all YM ID's! Check options")
    return
  }

  let method = "yandex_metrika_callbacks";
  window[method] = window[method] || [];
  window[method].push(function() {
      try {
        options.forEach((counter)=>{
          window['yaCounter' + counter.id] = new Ya.Metrika(
            Object.create(Object.assign(defaultOptions, counter))
          )
        })
      } catch(e){}
  });


  let script = document.createElement("script");
  script.type = "text/javascript";
  script.async = true;
  script.src = getBaseUrl(scriptURL, useCDN);

  if(lazy){
    window.onload = document.documentElement.prepend(script)
  } else {
    document.documentElement.prepend(script)
  }
}