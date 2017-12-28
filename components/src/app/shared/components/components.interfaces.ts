import { EventEmitter, Injectable, Directive, Input, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

export const KEYS = {
  backspace: 8,
  comma: 188,
  downArrow: 40,
  enter: 13,
  esc: 27,
  space: 32,
  upArrow: 38
};

export interface SortMeta {
  field: string;
  order: number;
}

export interface LazyLoadEvent {
  first?: number;
  rows?: number;
  sortField?: string;
  sortOrder?: number;
  multiSortMeta?: SortMeta[];
  filters?: { [s: string]: FilterMetadata; };
}

export interface FilterMetadata {
  value?: any;
  matchMode?: string;
}

export interface MenuItem {
  label?: string;
  event?: string;
  icon?: string;
  command?: (event?: any) => void;
  url?: string;
  routerLink?: any;
  eventEmitter?: EventEmitter<any>;
  items?: MenuItem[];
  expanded?: boolean;
  disabled?: boolean;
  visible?: boolean;
}

export interface IconItem {
  event?: string;
  file?: string;
  title?: string;
  class?: string;
  icons?: IconItem[];
  disabled?: boolean;
  visible?: boolean;
  isFlag?: boolean;
  eventEmitter?: EventEmitter<any>;
  icon?: string;
}

export interface Message {
  severity?: string;
  summary?: string;
  detail?: string;
}

export interface SelectItem {
  label: string;
  value: any;
}

export interface Confirmation {
  message: string;
  icon?: string;
  header?: string;
  accept?: Function;
  reject?: Function;
  acceptVisible?: boolean;
  rejectVisible?: boolean;
  acceptEvent?: EventEmitter<any>;
  rejectEvent?: EventEmitter<any>;
}

export interface BlockableUI {
  getBlockableElement(): HTMLElement;
}

@Injectable()
export class ConfirmationService {

  private requireConfirmationSource = new Subject<Confirmation>();
  private acceptConfirmationSource = new Subject<Confirmation>();

  requireConfirmation$ = this.requireConfirmationSource.asObservable();
  accept = this.acceptConfirmationSource.asObservable();

  confirm(confirmation: Confirmation) {
    this.requireConfirmationSource.next(confirmation);
    return this;
  }

  onAccept() {
    this.acceptConfirmationSource.next();
  }
}

@Injectable()
export class DomHandler {

  public static zindex: number = 1000;

  public addClass(element: any, className: string): void {
    if (element.classList) {
      element.classList.add(className);
    } else {
      element.className += ' ' + className;
    }
  }

  public addMultipleClasses(element: any, className: string): void {
    if (element.classList) {
      let styles: string[] = className.split(' ');
      for (let i = 0; i < styles.length; i++) {
        element.classList.add(styles[i]);
      }
    } else {
      let styles: string[] = className.split(' ');
      for (let i = 0; i < styles.length; i++) {
        element.className += ' ' + styles[i];
      }
    }
  }
  public removeClass(element: any, className: string): void {
    if (element.classList) {
      element.classList.remove(className);
    } else {
      element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  }

  public hasClass(element: any, className: string): boolean {
    if (element.classList) {
      return element.classList.contains(className);
    } else {
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
    }
  }

  public siblings(element: any): any {
    return Array.prototype.filter.call(element.parentNode.children, function (child) {
      return child !== element;
    });
  }

  public find(element: any, selector: string): any[] {
    return element.querySelectorAll(selector);
  }

  public findSingle(element: any, selector: string): any {
    return element.querySelector(selector);
  }

  public index(element: any): number {
    let children = element.parentNode.childNodes;
    let num = 0;
    for (var i = 0; i < children.length; i++) {
      if (children[i] === element) { return num; }
      if (children[i].nodeType === 1) { num++; }
    }
    return -1;
  }

  public relativePosition(element: any, target: any): void {
    let elementDimensions = element.offsetParent ? { width: element.outerWidth, height: element.outerHeight } : this.getHiddenElementDimensions(element);
    let targetHeight = target.offsetHeight;
    let targetWidth = target.offsetWidth;
    let targetOffset = target.getBoundingClientRect();
    let viewport = this.getViewport();
    let top, left;

    if ((targetOffset.top + targetHeight + elementDimensions.height) > viewport.height) {
      top = -1 * (elementDimensions.height);
    } else {
      top = targetHeight;
    }

    if ((targetOffset.left + elementDimensions.width) > viewport.width) {
      left = targetWidth - elementDimensions.width;
    } else {
      left = 0;
    }

    element.style.top = top + 'px';
    element.style.left = left + 'px';
  }

  public absolutePosition(element: any, target: any): void {
    let elementDimensions = element.offsetParent ? { width: element.offsetWidth, height: element.offsetHeight } : this.getHiddenElementDimensions(element);
    let elementOuterHeight = elementDimensions.height;
    let elementOuterWidth = elementDimensions.width;
    let targetOuterHeight = target.offsetHeight;
    let targetOuterWidth = target.offsetWidth;
    let targetOffset = target.getBoundingClientRect();
    let windowScrollTop = this.getWindowScrollTop();
    let windowScrollLeft = this.getWindowScrollLeft();
    let viewport = this.getViewport();
    let top, left;

    if (targetOffset.top + targetOuterHeight + elementOuterHeight > viewport.height) {
      top = targetOffset.top + windowScrollTop - elementOuterHeight;
    } else {
      top = targetOuterHeight + targetOffset.top + windowScrollTop;
    }

    if (targetOffset.left + targetOuterWidth + elementOuterWidth > viewport.width) {
      left = targetOffset.left + windowScrollLeft + targetOuterWidth - elementOuterWidth;
    } else {
      left = targetOffset.left + windowScrollLeft;
    }

    element.style.top = top + 'px';
    element.style.left = left + 'px';
  }

  public getHiddenElementOuterHeight(element: any): number {
    element.style.visibility = 'hidden';
    element.style.display = 'block';
    let elementHeight = element.offsetHeight;
    element.style.display = 'none';
    element.style.visibility = 'visible';

    return elementHeight;
  }

  public getHiddenElementOuterWidth(element: any): number {
    element.style.visibility = 'hidden';
    element.style.display = 'block';
    let elementWidth = element.offsetWidth;
    element.style.display = 'none';
    element.style.visibility = 'visible';

    return elementWidth;
  }

  public getHiddenElementDimensions(element: any): any {
    let dimensions: any = {};
    element.style.visibility = 'hidden';
    element.style.display = 'block';
    dimensions.width = element.offsetWidth;
    dimensions.height = element.offsetHeight;
    element.style.display = 'none';
    element.style.visibility = 'visible';

    return dimensions;
  }

  public scrollInView(container, item) {
    let borderTopValue: string = getComputedStyle(container).getPropertyValue('borderTopWidth');
    let borderTop: number = borderTopValue ? parseFloat(borderTopValue) : 0;
    let paddingTopValue: string = getComputedStyle(container).getPropertyValue('paddingTop');
    let paddingTop: number = paddingTopValue ? parseFloat(paddingTopValue) : 0;
    let containerRect = container.getBoundingClientRect();
    let itemRect = item.getBoundingClientRect();
    let offset = (itemRect.top + document.body.scrollTop) - (containerRect.top + document.body.scrollTop) - borderTop - paddingTop;
    let scroll = container.scrollTop;
    let elementHeight = container.clientHeight;
    let itemHeight = this.getOuterHeight(item);

    if (offset < 0) {
      container.scrollTop = scroll + offset;
    } else if ((offset + itemHeight) > elementHeight) {
      container.scrollTop = scroll + offset - elementHeight + itemHeight;
    }
  }

  public fadeIn(element, duration: number): void {
    element.style.opacity = 0;

    let last = +new Date();
    let opacity = 0;
    let tick = function () {
      opacity = +element.style.opacity + (new Date().getTime() - last) / duration;
      element.style.opacity = opacity;
      last = +new Date();

      if (+opacity < 1) {
        (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
      }
    };

    tick();
  }

  public fadeOut(element, ms) {
    var opacity = 1,
      interval = 50,
      duration = ms,
      gap = interval / duration;

    let fading = setInterval(() => {
      opacity = opacity - gap;

      if (opacity <= 0) {
        opacity = 0;
        clearInterval(fading);
      }

      element.style.opacity = opacity;
    }, interval);
  }

  public getWindowScrollTop(): number {
    let doc = document.documentElement;
    return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
  }

  public getWindowScrollLeft(): number {
    let doc = document.documentElement;
    return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
  }

  public matches(element, selector: string): boolean {
    var p = Element.prototype;
    var f = p['matches'] || p.webkitMatchesSelector || p['mozMatchesSelector'] || p.msMatchesSelector || function (s) {
      return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
    };
    return f.call(element, selector);
  }

  public getOuterWidth(el, margin?) {
    let width = el.offsetWidth;

    if (margin) {
      let style = getComputedStyle(el);
      width += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    }

    return width;
  }

  public getHorizontalPadding(el) {
    let style = getComputedStyle(el);
    return parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
  }

  public getHorizontalMargin(el) {
    let style = getComputedStyle(el);
    return parseFloat(style.marginLeft) + parseFloat(style.marginRight);
  }

  public innerWidth(el) {
    let width = el.offsetWidth;
    let style = getComputedStyle(el);

    width += parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
    return width;
  }

  public width(el) {
    let width = el.offsetWidth;
    let style = getComputedStyle(el);

    width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
    return width;
  }

  public getOuterHeight(el, margin?) {
    let height = el.offsetHeight;

    if (margin) {
      let style = getComputedStyle(el);
      height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
    }

    return height;
  }

  public getHeight(el): number {
    let height = el.offsetHeight;
    let style = getComputedStyle(el);

    height -= parseFloat(style.paddingTop) + parseFloat(style.paddingBottom) + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);

    return height;
  }

  public getWidth(el): number {
    let width = el.offsetWidth;
    let style = getComputedStyle(el);

    width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight) + parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);

    return width;
  }

  public getViewport(): any {
    let win = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      w = win.innerWidth || e.clientWidth || g.clientWidth,
      h = win.innerHeight || e.clientHeight || g.clientHeight;

    return { width: w, height: h };
  }

  public getOffset(el) {
    let x = el.offsetLeft;
    let y = el.offsetTop;

    while (el = el.offsetParent) {
      x += el.offsetLeft;
      y += el.offsetTop;
    }

    return { left: x, top: y };
  }

  public equals(obj1: any, obj2: any): boolean {
    if (obj1 == null && obj2 == null) {
      return true;
    }
    if (obj1 == null || obj2 == null) {
      return false;
    }

    if (obj1 === obj2) {
      delete obj1._$visited;
      return true;
    }

    if (typeof obj1 === 'object' && typeof obj2 === 'object') {
      obj1._$visited = true;
      for (var p in obj1) {
        if (p === "_$visited") {
          continue;
        }
        if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) {
          return false;
        }

        switch (typeof (obj1[p])) {
          case 'object':
            if (obj1[p] && obj1[p]._$visited || !this.equals(obj1[p], obj2[p])) {
              return false;
            }
            break;

          case 'function':
            if (typeof (obj2[p]) === 'undefined' || (p !== 'compare' && obj1[p].toString() !== obj2[p].toString())) {
              return false;
            }
            break;

          default:
            if (obj1[p] !== obj2[p]) {
              return false;
            }
            break;
        }
      }

      for (var p1 in obj2) {
        if (typeof (obj1[p1]) === 'undefined') {
          return false;
        }
      }

      delete obj1._$visited;
      return true;
    }

    return false;
  }

  getUserAgent(): string {
    return navigator.userAgent;
  }

  isIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
      // IE 10 or older => return version number
      return true;
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
      // IE 11 => return version number
      var rv = ua.indexOf('rv:');
      return true;
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
      // Edge (IE 12+) => return version number
      return true;
    }

    // other browser
    return false;
  }

  appendChild(element: any, target: any) {
    if (this.isElement(target)) {
      target.appendChild(element);
    } else if (target.el && target.el.nativeElement) {
      target.el.nativeElement.appendChild(element);
    } else {
      throw 'Cannot append ' + target + ' to ' + element;
    }
  }

  removeChild(element: any, target: any) {
    if (this.isElement(target)) {
      target.removeChild(element);
    } else if (target.el && target.el.nativeElement) {
      target.el.nativeElement.removeChild(element);
    } else {
      throw 'Cannot remove ' + element + ' from ' + target;
    }
  }

  isElement(obj: any) {
    return (typeof HTMLElement === "object" ? obj instanceof HTMLElement :
      obj && typeof obj === "object" && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === "string"
    );
  }

  calculateScrollbarWidth(): number {
    let scrollDiv = document.createElement("div");
    scrollDiv.className = "ui-scrollbar-measure";
    document.body.appendChild(scrollDiv);

    let scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);

    return scrollbarWidth;
  }
}

@Directive({
  selector: '[av-template]',
  host: {
  }
})
export class Template {

  @Input() type: string;

  @Input('av-template') name: string;

  constructor(public template: TemplateRef<any>) { }

  getType(): string {
    if (this.type) {
      console.log('Defining a av-template with type property is deprecated use av-template="type" instead.');
      return this.type;
    } else {
      return this.name;
    }
  }
}
/*export interface TreeNode {
  parent: any;
  children: any;
  selectable: boolean;
  partialSelected: boolean;
}*/
export interface TreeNode  {
  label?: string;
  data?: any;
  icon?: any;
  expandedIcon?: any;
  collapsedIcon?: any;
  children?: TreeNode[];
  leaf?: boolean;
  expanded?: boolean;
  type?: string;
  parent?: TreeNode;
  partialSelected?: boolean;
  styleClass?: string;
  draggable?: boolean;
  droppable?: boolean;
  selectable?: boolean;
  selected?: boolean;
}
export interface ITreeNodeDataModel {
  id: number; // positive integer, 0 for root node (invisible by default)
  title: string;
  isBranch: boolean;
}

export class TreeNode implements ITreeNodeDataModel {
  constructor(public id: number, public title: string, public isBranch: boolean) { }

  private items: TreeNodeCollection = <TreeNodeCollection>{};

  private convertId(id: number): string {
    //if(id instanceof String)
    //  return +id;
    return "+" + id;
  }

  //#region IComposite
  public addItem(item: TreeNode) {
    var itemId: number = item.id;
    if (this.findItem(itemId, false) == null) {
      this.items[this.convertId(itemId)] = item;
    }
  }

  public removeItem(id: number) {
    delete this.items[this.convertId(id)];
  }

  public findItem(id: number, deep: boolean): TreeNode {
    var result: TreeNode = this.items[this.convertId(id)];

    if (!deep || result) {
      return result;
    }

    for (var n in this.items) {
      result = this.items[n].findItem(id, deep);
      if (result) {
        return result;
      }
    }
  }
  //#endregion

  public getItems(): TreeNodeCollection {
    return this.items;
  }

  public hasItems(): boolean {
    return Object.keys(this.items).length > 0;
  }

  public getView(): HTMLElement {
    var listNodeContent = CreateElement("a");
    listNodeContent.setAttribute("href", "#");
    listNodeContent.appendChild(document.createTextNode(this.title));

    var listItem: HTMLElement = CreateElement("li", this.isBranch ? "branch" : null, "li-" + this.id);
    listItem.appendChild(CreateElement("span", "connector"));
    listItem.appendChild(CreateElement("span", "icon"));
    listItem.appendChild(listNodeContent);

    if (this.isBranch) {
      listItem.appendChild(CreateElement("ul", null, "ul-" + this.id));
    }

    return listItem;
  }
}

export function CreateElement(tagName: string, className?: string, id?: string) {
  var result = document.createElement(tagName);
  if (className) {
    result.className = className;
  }
  if (id) {
    result.id = id;
  }
  return result;
}

export interface TreeNodeCollection extends Object {
  //[id: string]: TreeNode;
}


export interface ITreeNode {
  label?: string;
  data?: any;
  icon?: any;
  expandedIcon?: any;
  collapsedIcon?: any;
  children?: TreeNode[];
  leaf?: boolean;
  expanded?: boolean;
  type?: string;
  parent?: TreeNode;
  partialSelected?: boolean;
}
