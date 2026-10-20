interface GoogleTagManagerProps {
  containerId?: string
}

export function googleTagManagerBootstrap(containerId: string) {
  return `(function(w,d,s,l,i){w[l]=w[l]||[];var started=false;
function load(){if(started)return;started=true;
w.removeEventListener('load',load);d.removeEventListener('pointerdown',load,true);d.removeEventListener('keydown',load,true);d.removeEventListener('click',load,true);
w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;d.head.appendChild(j);}
if(d.readyState==='complete'){load();}else{
w.addEventListener('load',load,{once:true});
d.addEventListener('pointerdown',load,{once:true,passive:true,capture:true});
d.addEventListener('keydown',load,{once:true,capture:true});
d.addEventListener('click',load,{once:true,capture:true});}
})(window,document,'script','dataLayer','${containerId}');`
}

export function GoogleTagManagerNoScript({ containerId }: GoogleTagManagerProps) {
  if (!containerId) return null

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${containerId}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  )
}
