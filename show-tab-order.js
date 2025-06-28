(function(){
  var style=document.createElement('style');
  style.id='tab-order-bookmarklet';
  var existing=document.getElementById('tab-order-bookmarklet');
  if(existing)existing.remove();
  var existingOverlay=document.getElementById('tab-order-overlay-bookmarklet');
  if(existingOverlay)existingOverlay.remove();
  
  // Remove existing tab order badges
  var existingBadges=document.querySelectorAll('.tab-order-badge');
  existingBadges.forEach(function(badge){badge.remove();});
  
  style.innerHTML='.tab-order-badge{position:absolute;width:24px;height:24px;background:#3498db;color:white;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold;font-family:monospace;z-index:10000;top:-12px;left:-12px;border:2px solid white;box-shadow:0 2px 4px rgba(0,0,0,0.3);}.tab-order-element{position:relative !important;outline:2px solid #3498db !important;outline-offset:2px !important;}';
  document.head.appendChild(style);
  
  // Get all potentially focusable elements
  var focusableSelectors='a[href],button,input,textarea,select,details,summary,[tabindex],[contenteditable="true"],audio[controls],video[controls],iframe,embed,object,[role="button"],[role="link"],[role="menuitem"],[role="tab"],[role="option"],[role="checkbox"],[role="radio"]';
  var allElements=document.querySelectorAll(focusableSelectors);
  
  // Filter and sort elements by tab order
  var tabbableElements=[];
  
  allElements.forEach(function(el){
    // Skip hidden elements
    var style=window.getComputedStyle(el);
    if(style.display==='none'||style.visibility==='hidden'||el.hasAttribute('disabled')){
      return;
    }
    
    var tabindex=el.getAttribute('tabindex');
    var tabValue=tabindex?parseInt(tabindex,10):0;
    
    // Skip tabindex="-1" (not tabbable)
    if(tabValue===-1)return;
    
    // Special handling for certain elements
    if(el.tagName==='A'&&!el.hasAttribute('href'))return;
    if(el.hasAttribute('aria-hidden')&&el.getAttribute('aria-hidden')==='true')return;
    
    tabbableElements.push({
      element:el,
      tabindex:tabValue,
      originalIndex:tabbableElements.length
    });
  });
  
  // Sort by tab order: positive tabindex first (by value), then 0/unset (by DOM order)
  tabbableElements.sort(function(a,b){
    if(a.tabindex>0&&b.tabindex>0){
      return a.tabindex-b.tabindex;
    }
    if(a.tabindex>0&&b.tabindex===0){
      return -1;
    }
    if(a.tabindex===0&&b.tabindex>0){
      return 1;
    }
    return a.originalIndex-b.originalIndex;
  });
  
  // Add numbered badges to elements
  tabbableElements.forEach(function(item,index){
    var badge=document.createElement('div');
    badge.className='tab-order-badge';
    badge.textContent=(index+1).toString();
    item.element.classList.add('tab-order-element');
    item.element.appendChild(badge);
  });
  
  // Create summary overlay
  var overlay=document.createElement('div');
  overlay.id='tab-order-overlay-bookmarklet';
  overlay.style.cssText='position:fixed;top:20px;left:20px;z-index:10001;background:rgba(0,0,0,0.9);color:white;padding:15px;border-radius:8px;font-family:monospace;font-size:12px;max-width:350px;max-height:400px;overflow-y:auto;';
  
  var content='<div style="font-weight:bold;margin-bottom:10px;">⭐ Tab Order ('+tabbableElements.length+' elements)</div>';
  
  tabbableElements.slice(0,20).forEach(function(item,index){
    var tagName=item.element.tagName.toLowerCase();
    var id=item.element.id?'#'+item.element.id:'';
    var className=item.element.className?'.'+item.element.className.split(' ')[0]:'';
    var text=item.element.textContent||item.element.value||item.element.alt||'';
    text=text.trim().substring(0,25);
    if(text.length===25)text+='...';
    
    var identifier=id||className||tagName;
    var tabindexInfo=item.tabindex>0?' (tabindex='+item.tabindex+')':'';
    
    content+='<div style="margin:2px 0;padding:2px;border-left:3px solid #3498db;padding-left:8px;">';
    content+='<span style="color:#3498db;font-weight:bold;">'+(index+1)+'.</span> ';
    content+='<span style="color:#ffffff;">'+identifier+'</span>';
    content+=tabindexInfo;
    if(text)content+='<br><span style="color:#aaa;font-size:10px;">"'+text+'"</span>';
    content+='</div>';
  });
  
  if(tabbableElements.length>20){
    content+='<div style="margin-top:10px;font-size:10px;opacity:0.7;">... and '+(tabbableElements.length-20)+' more elements</div>';
  }
  
  content+='<div style="margin-top:10px;font-size:10px;opacity:0.7;">Click anywhere to close</div>';
  
  overlay.innerHTML=content;
  overlay.onclick=function(){overlay.remove();};
  document.body.appendChild(overlay);
  
  // Show notification
  var notification=document.createElement('div');
  notification.style.cssText='position:fixed;top:20px;right:20px;z-index:10000;background:#ff6b35;color:white;padding:12px 20px;border-radius:6px;font-family:sans-serif;font-size:14px;box-shadow:0 4px 12px rgba(0,0,0,0.3);';
  notification.textContent='⭐ Tab order revealed! Found '+tabbableElements.length+' focusable elements.';
  document.body.appendChild(notification);
  setTimeout(function(){notification.remove();},3000);
})();