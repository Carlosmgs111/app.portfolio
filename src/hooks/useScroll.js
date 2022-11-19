import { useSwitch } from "./useSwitch";

export function useScroll(element) {
  const [direction, switchDirection] = useSwitch(-1, 1);

  let scrollPos = 0;
  window.addEventListener("scroll", function () {
    let currentPos = document.body.getBoundingClientRect().top;
    if (currentPos > scrollPos) {
      document.getElementById("box").innerText = "↑";
    } else {
      document.getElementById("box").innerText = "↓";
    }
    scrollPos = currentPos;
  });

  return [direction];
}
