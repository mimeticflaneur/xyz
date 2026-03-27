// Terminal Easter Egg — Ctrl+K / Cmd+K to open
(function(){
    var to=document.getElementById('term-overlay'),tb=document.getElementById('term-body'),ti=document.getElementById('term-in');
    if(!to||!tb||!ti)return;
    var tcmds={
        help:function(){return'Available commands:\n  whoami    \u2014 about me\n  ls        \u2014 list sections\n  projects  \u2014 list projects\n  reading   \u2014 current reads\n  open <x>  \u2014 open project (pagamenos, refinancial, now)\n  clear     \u2014 clear terminal\n  exit      \u2014 close terminal';},
        whoami:function(){return'Adri\u00e1n Zapatera\nAsset Manager \u00b7 Real Estate Finance\nManaging \u20ac480M+ in assets. Building tools with LLMs.\nMadrid, Spain.';},
        ls:function(){return'about/  experience/  education/  projects/  contact/  now/';},
        projects:function(){return'RE Financial Calculator  \u2014 live    \u2014 refinancialcalculator.vercel.app\npagamenos.es            \u2014 live    \u2014 pagamenos-eight.vercel.app\nConsensus Alpha Trade   \u2014 wip\nReadings                \u2014 soon';},
        reading:function(){return'Currently reading:\n  \u2014 Anabasis, Xenophon\n  \u2014 La Raz\u00f3n Antiliberal, Donoso Cort\u00e9s';}
    };
    function tOut(t){if(!t)return;var d=document.createElement('div');d.className='term-line';d.innerHTML='<span class="out">'+t.replace(/\n/g,'<br>')+'</span>';tb.insertBefore(d,tb.lastElementChild);tb.scrollTop=tb.scrollHeight;}
    function tLine(c){var d=document.createElement('div');d.className='term-line';d.innerHTML='<span class="pr">~$</span> '+c;tb.insertBefore(d,tb.lastElementChild);}
    function tExec(c){var s=c.trim().toLowerCase();if(s==='clear'){while(tb.children.length>1)tb.removeChild(tb.firstChild);return;}if(s==='exit'){to.classList.remove('open');return;}if(s.startsWith('open ')){var t=s.split(' ')[1],u={pagamenos:'https://pagamenos-eight.vercel.app',refinancial:'https://refinancialcalculator.vercel.app',now:'pages/now.html'};if(u[t]){window.open(u[t],'_blank');tOut('Opening '+t+'...');}else{tOut('Unknown: '+t+'. Try: pagamenos, refinancial, now');}return;}if(tcmds[s]){tOut(tcmds[s]());}else{tOut('command not found: '+s+'. Type help for commands.');}}
    document.addEventListener('keydown',function(e){
        // Ctrl+K or Cmd+K or backtick
        if(((e.ctrlKey||e.metaKey)&&e.key==='k')||e.key==='`'){
            if(!to.classList.contains('open')&&document.activeElement.tagName!=='INPUT'&&document.activeElement.tagName!=='TEXTAREA'){
                e.preventDefault();to.classList.add('open');setTimeout(function(){ti.focus();},100);
            }
        }
        if(e.key==='Escape'&&to.classList.contains('open')){to.classList.remove('open');}
    });
    ti.addEventListener('keydown',function(e){if(e.key==='Enter'){var v=ti.value;if(v.trim()){tLine(v);tExec(v);ti.value='';}}});
    to.addEventListener('click',function(e){if(e.target===to)to.classList.remove('open');});
})();
