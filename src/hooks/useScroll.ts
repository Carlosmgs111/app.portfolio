export function useScroll() {
  let scrollPos = 0;
  window.addEventListener("scroll", function () {
    let box: any = document.getElementById("box");
    let currentPos = document.body.getBoundingClientRect().top;
    if (currentPos > scrollPos) {
      box.innerText = "↑";
    } else {
      box.innerText = "↓";
    }
    scrollPos = currentPos;
  });
}
