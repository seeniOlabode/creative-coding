import { getDevice, winsize } from "../../utils/device";

export default class InfiniteMenu {
  constructor(el) {
    this.isMobile = getDevice();
    this.winsize = winsize;

    if (!this.isMobile) {
      this.DOM = { el: el };
      this.DOM.menuItems = [...this.DOM.el.querySelectorAll(".menu__item")];

      this.cloneItems();
      this.initScroll();

      this.initEvents();

      requestAnimationFrame(() => this.render());
    } else {
      document.body.classList.add("mobile");
    }
  }

  cloneItems() {
    const itemHeight = this.DOM.menuItems[0].offsetHeight;

    const fitIn = Math.ceil(this.winsize.height / itemHeight);

    this.DOM.el
      .querySelectorAll(".loop__clone")
      .forEach((clone) => this.DOM.el.removeChild(clone));

    let totalClones = 0;
    this.DOM.menuItems
      .filter((_, index) => index < fitIn)
      .map((target) => {
        const clone = target.cloneNode(true);

        clone.classList.add("loop__clone");
        this.DOM.el.appendChild(clone);
        ++totalClones;
      });

    this.clonesHeight = totalClones * itemHeight;
    this.scrollHeight = this.DOM.el.scrollHeight;
  }

  getScrollPos() {
    return (
      (this.DOM.el.pageYOffset || this.DOM.el.scrollTop) -
      (this.DOM.el.clientTop || 0)
    );
  }

  setScrollPos(pos) {
    this.DOM.el.scrollTop = pos;
  }

  initEvents() {
    window.addEventListener("resize", () => this.resize());
  }
  resize() {
    this.cloneItems();
    this.initScroll();
  }
  initScroll() {
    this.scrollPos = this.getScrollPos();

    if (this.scrollPos <= 0) {
      this.setScrollPos(1);
    }
  }
  scrollUpdate() {
    this.scrollPos = this.getScrollPos();

    if (this.clonesHeight + this.scrollPos >= this.scrollHeight) {
      this.setScrollPos(1);
    } else if (this.scrollPos <= 0) {
      this.setScrollPos(this.scrollHeight - this.clonesHeight);
    }
  }

  render() {
    this.scrollUpdate();
    requestAnimationFrame(() => this.render());
  }
}
