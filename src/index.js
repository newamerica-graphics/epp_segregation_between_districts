import './index.scss';

const settings = {
  'viz__id': (el) => {
    let a = el.querySelector('.dataviz__title-container')
    let b = el.querySelector('.dataviz__chart-container')
    a && a.remove()
    b && b.remove()

    let body = document.getElementById("na-report")
    let target = document.createElement("div")
    target.classList.add("iframe-wrapper")
    el.appendChild(target)

    let iframe = document.createElement("iframe")
    iframe.src = "https://storymaps.arcgis.com/stories/a046ae47d9c5459a8f6e2c26f680ef54?cover=false"
    target.appendChild(iframe)

    const scrollTargetIntoView = () => {
      target.scrollIntoView({ block: "center", inline: "center", behavior: "smooth" })
    }
    
    // Pulled from https://pqina.nl/blog/applying-styles-based-on-the-user-scroll-position-with-smart-css/
    // The debounce function receives our function as a parameter
    const debounce = (fn) => {
        // This holds the requestAnimationFrame reference, so we can cancel it if we wish
        let frame;
    
        // The debounce function returns a new function that can receive a variable number of arguments
        return (...params) => {
            // If the frame variable has been defined, clear it now, and queue for next frame
            if (frame) {
                cancelAnimationFrame(frame);
            }
    
            // Queue our function call for the next frame
            frame = requestAnimationFrame(() => {
                // Call our function and pass any params we received
                fn(...params);
            });
        };
    };
    
    const iframeFocus = () => {
      // console.log(target.getBoundingClientRect().y)
      if((target.getBoundingClientRect().y < 100) && (target.getBoundingClientRect().y >= -1)) {
        target.classList.remove("out-of-frame");
        body.classList.remove("scroll-reverse")
      } else {
        target.classList.add("out-of-frame");
      }
    };
    
    document.addEventListener('scroll', debounce(iframeFocus));
    target.addEventListener('click', scrollTargetIntoView)
    target.addEventListener('focusin', scrollTargetIntoView)
          
    iframeFocus();    
  }
};


window.renderDataViz = function(el){
  let id = el.getAttribute('id');
  let chart = settings[id];
  if(!chart) return;
  chart(el);
}
