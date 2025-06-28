javascript:(function(){
  var style=document.createElement('style');
  style.id='focus-indicator-bookmarklet';
  var existing=document.getElementById('focus-indicator-bookmarklet');
  if(existing)existing.remove();
  style.innerHTML='a:focus,button:focus,input:focus,textarea:focus,select:focus,[tabindex]:focus,[contenteditable]:focus,summary:focus,iframe:focus,embed:focus,object:focus,audio:focus,video:focus,details:focus,[role="button"]:focus,[role="link"]:focus,[role="menuitem"]:focus,[role="tab"]:focus,[role="option"]:focus,a:focus-visible,button:focus-visible,input:focus-visible,textarea:focus-visible,select:focus-visible,[tabindex]:focus-visible,[contenteditable]:focus-visible,summary:focus-visible,iframe:focus-visible,embed:focus-visible,object:focus-visible,audio:focus-visible,video:focus-visible,details:focus-visible,[role="button"]:focus-visible,[role="link"]:focus-visible,[role="menuitem"]:focus-visible,[role="tab"]:focus-visible,[role="option"]:focus-visible{outline:3px solid #ff6b35 !important;outline-offset:2px !important;box-shadow:0 0 0 1px #fff,0 0 0 4px #ff6b35 !important;}';
  document.head.appendChild(style);
  var notification=document.createElement('div');
  notification.style.cssText='position:fixed;top:20px;right:20px;z-index:10000;background:#ff6b35;color:white;padding:12px 20px;border-radius:6px;font-family:sans-serif;font-size:14px;box-shadow:0 4px 12px rgba(0,0,0,0.3);';
  notification.textContent='🎯 Focus indicators enabled! Tab to test.';
  document.body.appendChild(notification);
  setTimeout(()=>notification.remove(),3000);
})();
