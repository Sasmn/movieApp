import PanelCSS from "../assets/Panel.module.scss";

export default function fullPageScroll(panelsParent) {
  const panels = panelsParent.childNodes;
  /* INITIAL POSITIONS */
  for (let i = 1; i < panels.length; i++) {
    const p = panels[i];

    p.style.transition = "0s";
    p.style.transform = `translateY(CALC(${i}*150vh)) scale(0.5)`;
  }
  panels[0].childNodes[0].classList.add(PanelCSS.activeContainer);

  let activePanel = 0;

  /* ON PC (MOUSE AND TRACKPAD) */
  let scrollDirection = "up";

  /* y4: helps deciding, weather the deltaY values from the trackpad are ascending or descending */
  let y = 0;
  let y2 = 0;
  let y3 = 0;
  let y4 = 0;

  let asc = false;

  /* calling of the function: throttled, can only be called ones every 0.7 secs */
  panelsParent.addEventListener("wheel", throttle(scroll, 700), {
    passive: false,
  });

  /* the scroll calling function */
  function scroll() {
    /* sets the new active panel */
    if (panels.length - 1 !== activePanel && scrollDirection === "down") {
      activePanel++;
    } else if (activePanel !== 0 && scrollDirection === "up") {
      activePanel--;
    }
    /* calling of the scrolling function */
    scrollPanels(panels, activePanel);
  }

  function throttle(cb, timeout) {
    /* date of the last call - needed for throttle */
    let lastCall = 0;
    return function (e) {
      /* prevents the default actions caused by wheeling (i.e. MS Edge drag) */
      e.preventDefault();

      /* wheelDeltaY is always 120 when scrolling with a mouse */
      /* on mousescroll, y4 should always be 0, so one can scroll multiple times with the mouse */
      if (Math.abs(e.wheelDeltaY) === 120) {
        y4 = 0;
      }

      /* trackpad: small movements excluded */
      if (Math.abs(e.deltaY) < 10) return;

      /* Decideing, wheather the numbers are ascending or not */
      if (e.deltaY - 2 * y4 > 0) {
        asc = true;
      } else {
        asc = false;
      }

      /* downdating the values */
      y4 = y3;
      y3 = y2;
      y2 = y;
      y = e.deltaY;

      /* decideing the scroll direction */
      if (e.deltaY < 0) {
        scrollDirection = "up";
      } else if (e.deltaY > 0) {
        scrollDirection = "down";
      }

      /* trackpad: exclude the wheel datas, when they keep getting smaller (on down scrolling) (predictive scrolling effect) and vica versa */
      if (asc === false && scrollDirection === "down") {
        return;
      } else if (asc === true && scrollDirection === "up") {
        return;
      }

      /* if theres no more panel up or down, return */
      if (scrollDirection === "down" && activePanel === panels.length - 1) {
        return;
      } else if (scrollDirection === "up" && activePanel === 0) {
        return;
      }

      /* if 0.7 secs have passed, call the scroll function */
      if (new Date() - lastCall > timeout) {
        lastCall = new Date();

        cb();
      }
    };
  }

  /* ON TOUCHSCREENS */
  let touchDirection = "up";
  let touchPosition = 0;

  const findTouchDirection = (e) => {
    /* prevent any default touch effect */
    e.preventDefault();
    if (e.changedTouches[0].clientY > touchPosition) {
      touchDirection = "up";
    } else {
      touchDirection = "down";
    }

    /* so this will always be the touchposition of the previous touch in the if statements */
    touchPosition = e.changedTouches[0].clientY;
  };

  /* on touchmove only register the touch direction */
  panelsParent.addEventListener("touchmove", (e) => findTouchDirection(e), {
    passive: false,
  });

  const findActivePanelTouch = () => {
    /* if theres no more panel up or down, return */
    if (touchDirection === "down" && activePanel === panels.length - 1) {
      return;
    } else if (touchDirection === "up" && activePanel === 0) {
      return;
    }

    /* sets the new active panel */
    if (panels.length - 1 !== activePanel && touchDirection === "down") {
      activePanel++;
    } else if (activePanel !== 0 && touchDirection === "up") {
      activePanel--;
    }
    /* calls the scrolling function */
    scrollPanels(panels, activePanel);
  };

  /* when touchmove ends, move to the activepanel (based on touchdirection), call the scrollPanel function */
  panelsParent.addEventListener("touchend", () => findActivePanelTouch);
}

function scrollPanels(panels, activePanel) {
  /* initial sets - transition */
  panels.forEach((p) => {
    p.childNodes[0].classList.add(PanelCSS.passiveContainer);
  });
  panels[activePanel].childNodes[0].classList.add(PanelCSS.activeContainer);

  /* transform the panels to their new position (and scale them for nice transition) */
  for (let i = 0; i < panels.length; i++) {
    const p = panels[i];
    let y = 1;
    if (activePanel !== i) {
      y = 0.5;
    } else {
      y = 1;
    }
    p.style.transition = "transform 0.6s";
    p.style.transform = `scale(${y}) translateY(CALC(${
      i - activePanel
    }* 150vh))`;
  }
}
