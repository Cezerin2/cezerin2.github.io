window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "UA-207343-12");

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/assets/scripts/sw/sw.js").then(() => {
    console.log("Service Worker Registered");
  });
}
