import { gsap } from "gsap";
import { closestEdge } from "/src/app/utils/edges";

export class Menu {
  constructor(el) {
    this.DOM = { el: el };
    this.DOM.menuItems = this.DOM.el.querySelectorAll(".home__menu-item");
    this.menuItems = [];
    this.DOM.menuItems.forEach((menuItem) =>
      this.menuItems.push(new MenuItem(menuItem))
    );
  }
}

export class MenuItem {
  constructor(el) {
    this.DOM = { el: el };
    this.DOM.link = this.DOM.el.querySelector(".home__menu-item__link");
    this.DOM.marquee = this.DOM.el.querySelector(".marquee");
    this.DOM.marqueeInner = this.DOM.marquee.querySelector(
      ".marquee__inner-wrap"
    );
    this.animationDefaults = { duration: 0.6, ease: "expo" };
    this.initEvents();
  }

  initEvents() {
    this.onMouseEnterFn = (ev) => this.mouseEnter(ev);
    this.DOM.el.addEventListener("mouseenter", this.onMouseEnterFn);
    this.onMouseLeaveFn = (ev) => this.mouseLeave(ev);
    this.DOM.el.addEventListener("mouseleave", this.onMouseLeaveFn);
  }

  mouseEnter(ev) {
    const edge = this.findClosestEdge(ev);

    gsap
      .timeline({ defaults: this.animationDefaults })
      .to(this.DOM.link, { y: edge === "top" ? "0%" : "0%" }, 0);
  }

  mouseLeave(ev) {
    const edge = this.findClosestEdge(ev);

    gsap
      .timeline({ defaults: this.animationDefaults })
      .to(this.DOM.link, { y: edge === "top" ? "-101%" : "101%" }, 0);
  }

  findClosestEdge(ev) {
    const x = ev.pageX - this.DOM.el.offsetLeft;
    const y = ev.pageY - this.DOM.el.offsetTop;
    return closestEdge(x, y, this.DOM.el.clientWidth, this.DOM.el.clientHeight);
  }
}

new Menu(document.querySelector(".home__menu"));
