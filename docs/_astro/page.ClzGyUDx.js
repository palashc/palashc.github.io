const A="modulepreload",C=function(e){return"/"+e},b={},P=function(i,n,t){let m=Promise.resolve();if(n&&n.length>0){let o=function(a){return Promise.all(a.map(l=>Promise.resolve(l).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};document.getElementsByTagName("link");const r=document.querySelector("meta[property=csp-nonce]"),u=r?.nonce||r?.getAttribute("nonce");m=o(n.map(a=>{if(a=C(a),a in b)return;b[a]=!0;const l=a.endsWith(".css"),h=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${a}"]${h}`))return;const c=document.createElement("link");if(c.rel=l?"stylesheet":A,l||(c.as="script"),c.crossOrigin="",c.href=a,u&&c.setAttribute("nonce",u),document.head.appendChild(c),l)return new Promise((w,E)=>{c.addEventListener("load",w),c.addEventListener("error",()=>E(new Error(`Unable to preload CSS for ${a}`)))})}))}function s(o){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=o,window.dispatchEvent(r),!r.defaultPrevented)throw o}return m.then(o=>{for(const r of o||[])r.status==="rejected"&&s(r.reason);return i().catch(s)})},d=(...e)=>console.log("[astro-mermaid]",...e),k=(...e)=>console.error("[astro-mermaid]",...e),y=()=>document.querySelectorAll("pre.mermaid").length>0;let g=null;async function S(){return g||(d("Loading mermaid.js..."),g=P(()=>import("./mermaid.core.DAzfSkzU.js").then(e=>e.bn),[]).then(async({default:e})=>{const i=[];if(i&&i.length>0){d("Registering",i.length,"icon packs");const n=i.map(t=>({name:t.name,loader:()=>fetch(t.url).then(m=>m.json())}));await e.registerIconPacks(n)}return e}).catch(e=>{throw k("Failed to load mermaid:",e),g=null,e}),g)}const f={startOnLoad:!1,theme:"default",look:"handDrawn",flowchart:{curve:"basis"}},x={light:"default",dark:"dark"};async function p(){d("Initializing mermaid diagrams...");const e=document.querySelectorAll("pre.mermaid");if(d("Found",e.length,"mermaid diagrams"),e.length===0)return;const i=await S();let n=f.theme;{const t=document.documentElement.getAttribute("data-theme"),m=document.body.getAttribute("data-theme");n=x[t||m]||f.theme,d("Using theme:",n,"from",t?"html":"body")}i.initialize({...f,theme:n,gitGraph:{mainBranchName:"main",showCommitLabel:!0,showBranches:!0,rotateCommitLabel:!0}});for(const t of e){if(t.hasAttribute("data-processed"))continue;t.hasAttribute("data-diagram")||t.setAttribute("data-diagram",t.textContent||"");const m=t.getAttribute("data-diagram")||"",s="mermaid-"+Math.random().toString(36).slice(2,11);d("Rendering diagram:",s);try{const o=document.getElementById(s);o&&o.remove();const{svg:r}=await i.render(s,m);t.innerHTML=r,t.setAttribute("data-processed","true"),d("Successfully rendered diagram:",s)}catch(o){k("Mermaid rendering error for diagram:",s,o);const r=document.createElement("div");r.style.cssText="color: red; padding: 1rem; border: 1px solid red; border-radius: 0.5rem;";const u=document.createElement("strong");u.textContent="Error rendering diagram:";const a=document.createElement("span");a.textContent=" "+(o.message||"Unknown error"),r.appendChild(u),r.appendChild(a),t.textContent="",t.appendChild(r),t.setAttribute("data-processed","true")}}}y()?(d("Mermaid diagrams detected on initial load"),p()):d("No mermaid diagrams found on initial load");{const e=new MutationObserver(i=>{for(const n of i)n.type==="attributes"&&n.attributeName==="data-theme"&&(document.querySelectorAll("pre.mermaid[data-processed]").forEach(t=>{t.removeAttribute("data-processed")}),p())});e.observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme"]}),e.observe(document.body,{attributes:!0,attributeFilter:["data-theme"]})}document.addEventListener("astro:after-swap",()=>{d("View transition detected"),y()&&p()});const v=document.createElement("style");v.textContent=`
            /* Prevent layout shifts by setting minimum height */
            pre.mermaid {
              display: flex;
              justify-content: center;
              align-items: center;
              margin: 2rem 0;
              padding: 1rem;
              background-color: transparent;
              border: none;
              overflow: auto;
              min-height: 200px; /* Prevent layout shift */
              position: relative;
            }
            
            /* Loading state with skeleton loader */
            pre.mermaid:not([data-processed]) {
              background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
              background-size: 200% 100%;
              animation: shimmer 1.5s infinite;
            }
            
            /* Dark mode skeleton loader */
            [data-theme="dark"] pre.mermaid:not([data-processed]) {
              background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
              background-size: 200% 100%;
            }
            
            @keyframes shimmer {
              0% {
                background-position: -200% 0;
              }
              100% {
                background-position: 200% 0;
              }
            }
            
            /* Show processed diagrams with smooth transition */
            pre.mermaid[data-processed] {
              animation: none;
              background: transparent;
              min-height: auto; /* Allow natural height after render */
            }
            
            /* Ensure responsive sizing for mermaid SVGs */
            pre.mermaid svg {
              max-width: 100%;
              height: auto;
            }
            
            /* Optional: Add subtle background for better visibility */
            @media (prefers-color-scheme: dark) {
              pre.mermaid[data-processed] {
                background-color: rgba(255, 255, 255, 0.02);
                border-radius: 0.5rem;
              }
            }
            
            @media (prefers-color-scheme: light) {
              pre.mermaid[data-processed] {
                background-color: rgba(0, 0, 0, 0.02);
                border-radius: 0.5rem;
              }
            }
            
            /* Respect user's color scheme preference */
            [data-theme="dark"] pre.mermaid[data-processed] {
              background-color: rgba(255, 255, 255, 0.02);
              border-radius: 0.5rem;
            }
            
            [data-theme="light"] pre.mermaid[data-processed] {
              background-color: rgba(0, 0, 0, 0.02);
              border-radius: 0.5rem;
            }
          `;document.head.appendChild(v);export{P as _};
