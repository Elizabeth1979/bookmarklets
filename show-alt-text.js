(function(){
  var style=document.createElement('style');
  style.id='alt-text-bookmarklet';
  var existing=document.getElementById('alt-text-bookmarklet');
  if(existing)existing.remove();
  var existingOverlay=document.getElementById('alt-text-overlay-bookmarklet');
  if(existingOverlay)existingOverlay.remove();
  
  style.innerHTML='img,svg{position:relative !important;}.alt-text-badge{position:absolute;top:-8px;left:-8px;font-size:10px;font-weight:bold;padding:2px 6px;border-radius:3px;z-index:10000;font-family:monospace;color:white;max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}.alt-missing{outline:3px solid #e74c3c !important;background:rgba(231,76,60,0.1) !important;}.alt-missing .alt-text-badge{background:#e74c3c;}.alt-empty{outline:3px solid #f39c12 !important;background:rgba(243,156,18,0.1) !important;}.alt-empty .alt-text-badge{background:#f39c12;}.alt-present{outline:3px solid #27ae60 !important;background:rgba(39,174,96,0.1) !important;}.alt-present .alt-text-badge{background:#27ae60;}.alt-svg{outline:3px solid #3498db !important;background:rgba(52,152,219,0.1) !important;}.alt-svg .alt-text-badge{background:#3498db;}';
  document.head.appendChild(style);
  
  var images=document.querySelectorAll('img');
  var svgs=document.querySelectorAll('svg');
  var missing=0,empty=0,present=0,svgCount=0;
  
  images.forEach(function(img){
    var badge=document.createElement('div');
    badge.className='alt-text-badge';
    var altText=img.getAttribute('alt');
    
    if(altText===null){
      img.classList.add('alt-missing');
      badge.textContent='🔴 NO ALT';
      missing++;
    }else if(altText===''){
      img.classList.add('alt-empty');
      badge.textContent='🟡 DECORATIVE';
      empty++;
    }else{
      img.classList.add('alt-present');
      var truncated=altText.length>30?altText.substring(0,30)+'...':altText;
      badge.textContent='🟢 '+truncated;
      present++;
    }
    
    img.appendChild(badge);
  });
  
  svgs.forEach(function(svg){
    var badge=document.createElement('div');
    badge.className='alt-text-badge';
    var title=svg.querySelector('title');
    var ariaLabel=svg.getAttribute('aria-label');
    var ariaLabelledby=svg.getAttribute('aria-labelledby');
    var altText='';
    
    if(title){
      altText=title.textContent;
    }else if(ariaLabel){
      altText=ariaLabel;
    }else if(ariaLabelledby){
      var labelElement=document.getElementById(ariaLabelledby);
      if(labelElement)altText=labelElement.textContent;
    }
    
    svg.classList.add('alt-svg');
    if(altText){
      var truncated=altText.length>30?altText.substring(0,30)+'...':altText;
      badge.textContent='🔵 '+truncated;
    }else{
      badge.textContent='🔵 SVG';
    }
    svgCount++;
    
    svg.appendChild(badge);
  });
  
  var overlay=document.createElement('div');
  overlay.id='alt-text-overlay-bookmarklet';
  overlay.style.cssText='position:fixed;top:20px;left:20px;z-index:10001;background:rgba(0,0,0,0.9);color:white;padding:15px;border-radius:8px;font-family:monospace;font-size:12px;max-width:300px;';
  
  var total=images.length+svgs.length;
  var content='<div style="font-weight:bold;margin-bottom:10px;">🖼️ Alt Text Analysis ('+total+' images)</div>';
  content+='<div style="margin:3px 0;color:#e74c3c;">🔴 Missing alt text: '+missing+'</div>';
  content+='<div style="margin:3px 0;color:#f39c12;">🟡 Decorative (empty): '+empty+'</div>';
  content+='<div style="margin:3px 0;color:#27ae60;">🟢 Has alt text: '+present+'</div>';
  content+='<div style="margin:3px 0;color:#3498db;">🔵 SVG elements: '+svgCount+'</div>';
  content+='<div style="margin-top:10px;font-size:10px;opacity:0.7;">Click anywhere to close</div>';
  
  overlay.innerHTML=content;
  overlay.onclick=function(){overlay.remove();};
  document.body.appendChild(overlay);
  
  var notification=document.createElement('div');
  notification.style.cssText='position:fixed;top:20px;right:20px;z-index:10000;background:#ff6b35;color:white;padding:12px 20px;border-radius:6px;font-family:sans-serif;font-size:14px;box-shadow:0 4px 12px rgba(0,0,0,0.3);';
  notification.textContent='🖼️ Alt text revealed! Found '+total+' images, '+missing+' missing alt text.';
  document.body.appendChild(notification);
  setTimeout(function(){notification.remove();},3000);
})();