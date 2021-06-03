function setMetrica() {

   window.ym = window.ym || function () {
      (window.ym.a = window.ym.a || []).push(arguments)
   };

   window.ym.l = 1 * new Date();


   let firstScript = document.getElementsByTagName("script")[0];
   let src = "https://mc.yandex.ru/metrika/tag.js";


   let script = document.createElement("script");
   script.async = 1
   script.src = src


   firstScript.parentNode.insertBefore(script, FirstScript)
}


ym(79779982, "init", {
   clickmap: true,
   trackLinks: true,
   accurateTrackBounce: true,
   triggerEvent: true
});


