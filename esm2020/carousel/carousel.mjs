import { Component, Input, ViewChild, ContentChildren, NgModule, EventEmitter, Output, ContentChild, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { PrimeTemplate, SharedModule, Header, Footer } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { CommonModule } from '@angular/common';
import { UniqueComponentId } from 'primeng/utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/ripple";
export class Carousel {
    constructor(el, zone, cd) {
        this.el = el;
        this.zone = zone;
        this.cd = cd;
        this.orientation = "horizontal";
        this.verticalViewPortHeight = "300px";
        this.contentClass = "";
        this.indicatorsContentClass = "";
        this.indicatorStyleClass = "";
        this.circular = false;
        this.showIndicators = true;
        this.showNavigators = true;
        this.autoplayInterval = 0;
        this.onPage = new EventEmitter();
        this._numVisible = 1;
        this._numScroll = 1;
        this._oldNumScroll = 0;
        this.prevState = {
            numScroll: 0,
            numVisible: 0,
            value: []
        };
        this.defaultNumScroll = 1;
        this.defaultNumVisible = 1;
        this._page = 0;
        this.isRemainingItemsAdded = false;
        this.remainingItems = 0;
        this.swipeThreshold = 20;
        this.totalShiftedItems = this.page * this.numScroll * -1;
    }
    get page() {
        return this._page;
    }
    set page(val) {
        if (this.isCreated && val !== this._page) {
            if (this.autoplayInterval) {
                this.stopAutoplay();
                this.allowAutoplay = false;
            }
            if (val > this._page && val <= (this.totalDots() - 1)) {
                this.step(-1, val);
            }
            else if (val < this._page) {
                this.step(1, val);
            }
        }
        this._page = val;
    }
    get numVisible() {
        return this._numVisible;
    }
    set numVisible(val) {
        this._numVisible = val;
    }
    get numScroll() {
        return this._numVisible;
    }
    set numScroll(val) {
        this._numScroll = val;
    }
    get value() {
        return this._value;
    }
    ;
    set value(val) {
        this._value = val;
    }
    ngOnChanges(simpleChange) {
        if (simpleChange.value) {
            if (this.circular && this._value) {
                this.setCloneItems();
            }
        }
        if (this.isCreated) {
            if (simpleChange.numVisible) {
                if (this.responsiveOptions) {
                    this.defaultNumVisible = this.numVisible;
                }
                if (this.isCircular()) {
                    this.setCloneItems();
                }
                this.createStyle();
                this.calculatePosition();
            }
            if (simpleChange.numScroll) {
                if (this.responsiveOptions) {
                    this.defaultNumScroll = this.numScroll;
                }
            }
        }
    }
    ngAfterContentInit() {
        this.id = UniqueComponentId();
        this.allowAutoplay = !!this.autoplayInterval;
        if (this.circular) {
            this.setCloneItems();
        }
        if (this.responsiveOptions) {
            this.defaultNumScroll = this._numScroll;
            this.defaultNumVisible = this._numVisible;
        }
        this.createStyle();
        this.calculatePosition();
        if (this.responsiveOptions) {
            this.bindDocumentListeners();
        }
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                    break;
                case 'header':
                    this.headerTemplate = item.template;
                    break;
                case 'footer':
                    this.footerTemplate = item.template;
                    break;
                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }
    ngAfterContentChecked() {
        const isCircular = this.isCircular();
        let totalShiftedItems = this.totalShiftedItems;
        if (this.value && this.itemsContainer && (this.prevState.numScroll !== this._numScroll || this.prevState.numVisible !== this._numVisible || this.prevState.value.length !== this.value.length)) {
            if (this.autoplayInterval) {
                this.stopAutoplay();
            }
            this.remainingItems = (this.value.length - this._numVisible) % this._numScroll;
            let page = this._page;
            if (this.totalDots() !== 0 && page >= this.totalDots()) {
                page = this.totalDots() - 1;
                this._page = page;
                this.onPage.emit({
                    page: this.page
                });
            }
            totalShiftedItems = (page * this._numScroll) * -1;
            if (isCircular) {
                totalShiftedItems -= this._numVisible;
            }
            if (page === (this.totalDots() - 1) && this.remainingItems > 0) {
                totalShiftedItems += (-1 * this.remainingItems) + this._numScroll;
                this.isRemainingItemsAdded = true;
            }
            else {
                this.isRemainingItemsAdded = false;
            }
            if (totalShiftedItems !== this.totalShiftedItems) {
                this.totalShiftedItems = totalShiftedItems;
            }
            this._oldNumScroll = this._numScroll;
            this.prevState.numScroll = this._numScroll;
            this.prevState.numVisible = this._numVisible;
            this.prevState.value = [...this._value];
            if (this.totalDots() > 0 && this.itemsContainer.nativeElement) {
                this.itemsContainer.nativeElement.style.transform = this.isVertical() ? `translate3d(0, ${totalShiftedItems * (100 / this._numVisible)}%, 0)` : `translate3d(${totalShiftedItems * (100 / this._numVisible)}%, 0, 0)`;
            }
            this.isCreated = true;
            if (this.autoplayInterval && this.isAutoplay()) {
                this.startAutoplay();
            }
        }
        if (isCircular) {
            if (this.page === 0) {
                totalShiftedItems = -1 * this._numVisible;
            }
            else if (totalShiftedItems === 0) {
                totalShiftedItems = -1 * this.value.length;
                if (this.remainingItems > 0) {
                    this.isRemainingItemsAdded = true;
                }
            }
            if (totalShiftedItems !== this.totalShiftedItems) {
                this.totalShiftedItems = totalShiftedItems;
            }
        }
    }
    createStyle() {
        if (!this.carouselStyle) {
            this.carouselStyle = document.createElement('style');
            this.carouselStyle.type = 'text/css';
            document.body.appendChild(this.carouselStyle);
        }
        let innerHTML = `
            #${this.id} .p-carousel-item {
				flex: 1 0 ${(100 / this.numVisible)}%
			}
        `;
        if (this.responsiveOptions) {
            this.responsiveOptions.sort((data1, data2) => {
                const value1 = data1.breakpoint;
                const value2 = data2.breakpoint;
                let result = null;
                if (value1 == null && value2 != null)
                    result = -1;
                else if (value1 != null && value2 == null)
                    result = 1;
                else if (value1 == null && value2 == null)
                    result = 0;
                else if (typeof value1 === 'string' && typeof value2 === 'string')
                    result = value1.localeCompare(value2, undefined, { numeric: true });
                else
                    result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
                return -1 * result;
            });
            for (let i = 0; i < this.responsiveOptions.length; i++) {
                let res = this.responsiveOptions[i];
                innerHTML += `
                    @media screen and (max-width: ${res.breakpoint}) {
                        #${this.id} .p-carousel-item {
                            flex: 1 0 ${(100 / res.numVisible)}%
                        }
                    }
                `;
            }
        }
        this.carouselStyle.innerHTML = innerHTML;
    }
    calculatePosition() {
        if (this.responsiveOptions) {
            let windowWidth = window.innerWidth;
            let matchedResponsiveData = {
                numVisible: this.defaultNumVisible,
                numScroll: this.defaultNumScroll
            };
            for (let i = 0; i < this.responsiveOptions.length; i++) {
                let res = this.responsiveOptions[i];
                if (parseInt(res.breakpoint, 10) >= windowWidth) {
                    matchedResponsiveData = res;
                }
            }
            if (this._numScroll !== matchedResponsiveData.numScroll) {
                let page = this._page;
                page = Math.floor((page * this._numScroll) / matchedResponsiveData.numScroll);
                let totalShiftedItems = (matchedResponsiveData.numScroll * this.page) * -1;
                if (this.isCircular()) {
                    totalShiftedItems -= matchedResponsiveData.numVisible;
                }
                this.totalShiftedItems = totalShiftedItems;
                this._numScroll = matchedResponsiveData.numScroll;
                this._page = page;
                this.onPage.emit({
                    page: this.page
                });
            }
            if (this._numVisible !== matchedResponsiveData.numVisible) {
                this._numVisible = matchedResponsiveData.numVisible;
                this.setCloneItems();
            }
            this.cd.markForCheck();
        }
    }
    setCloneItems() {
        this.clonedItemsForStarting = [];
        this.clonedItemsForFinishing = [];
        if (this.isCircular()) {
            this.clonedItemsForStarting.push(...this.value.slice(-1 * this._numVisible));
            this.clonedItemsForFinishing.push(...this.value.slice(0, this._numVisible));
        }
    }
    firstIndex() {
        return this.isCircular() ? (-1 * (this.totalShiftedItems + this.numVisible)) : (this.totalShiftedItems * -1);
    }
    lastIndex() {
        return this.firstIndex() + this.numVisible - 1;
    }
    totalDots() {
        return this.value ? Math.ceil((this.value.length - this._numVisible) / this._numScroll) + 1 : 0;
    }
    totalDotsArray() {
        const totalDots = this.totalDots();
        return totalDots <= 0 ? [] : Array(totalDots).fill(0);
    }
    isVertical() {
        return this.orientation === 'vertical';
    }
    isCircular() {
        return this.circular && this.value && this.value.length >= this.numVisible;
    }
    isAutoplay() {
        return this.autoplayInterval && this.allowAutoplay;
    }
    isForwardNavDisabled() {
        return this.isEmpty() || (this._page >= (this.totalDots() - 1) && !this.isCircular());
    }
    isBackwardNavDisabled() {
        return this.isEmpty() || (this._page <= 0 && !this.isCircular());
    }
    isEmpty() {
        return !this.value || this.value.length === 0;
    }
    navForward(e, index) {
        if (this.isCircular() || this._page < (this.totalDots() - 1)) {
            this.step(-1, index);
        }
        if (this.autoplayInterval) {
            this.stopAutoplay();
            this.allowAutoplay = false;
        }
        if (e && e.cancelable) {
            e.preventDefault();
        }
    }
    navBackward(e, index) {
        if (this.isCircular() || this._page !== 0) {
            this.step(1, index);
        }
        if (this.autoplayInterval) {
            this.stopAutoplay();
            this.allowAutoplay = false;
        }
        if (e && e.cancelable) {
            e.preventDefault();
        }
    }
    onDotClick(e, index) {
        let page = this._page;
        if (this.autoplayInterval) {
            this.stopAutoplay();
            this.allowAutoplay = false;
        }
        if (index > page) {
            this.navForward(e, index);
        }
        else if (index < page) {
            this.navBackward(e, index);
        }
    }
    step(dir, page) {
        let totalShiftedItems = this.totalShiftedItems;
        const isCircular = this.isCircular();
        if (page != null) {
            totalShiftedItems = (this._numScroll * page) * -1;
            if (isCircular) {
                totalShiftedItems -= this._numVisible;
            }
            this.isRemainingItemsAdded = false;
        }
        else {
            totalShiftedItems += (this._numScroll * dir);
            if (this.isRemainingItemsAdded) {
                totalShiftedItems += this.remainingItems - (this._numScroll * dir);
                this.isRemainingItemsAdded = false;
            }
            let originalShiftedItems = isCircular ? (totalShiftedItems + this._numVisible) : totalShiftedItems;
            page = Math.abs(Math.floor((originalShiftedItems / this._numScroll)));
        }
        if (isCircular && this.page === (this.totalDots() - 1) && dir === -1) {
            totalShiftedItems = -1 * (this.value.length + this._numVisible);
            page = 0;
        }
        else if (isCircular && this.page === 0 && dir === 1) {
            totalShiftedItems = 0;
            page = (this.totalDots() - 1);
        }
        else if (page === (this.totalDots() - 1) && this.remainingItems > 0) {
            totalShiftedItems += ((this.remainingItems * -1) - (this._numScroll * dir));
            this.isRemainingItemsAdded = true;
        }
        if (this.itemsContainer) {
            this.itemsContainer.nativeElement.style.transform = this.isVertical() ? `translate3d(0, ${totalShiftedItems * (100 / this._numVisible)}%, 0)` : `translate3d(${totalShiftedItems * (100 / this._numVisible)}%, 0, 0)`;
            this.itemsContainer.nativeElement.style.transition = 'transform 500ms ease 0s';
        }
        this.totalShiftedItems = totalShiftedItems;
        this._page = page;
        this.onPage.emit({
            page: this.page
        });
    }
    startAutoplay() {
        this.interval = setInterval(() => {
            if (this.totalDots() > 0) {
                if (this.page === (this.totalDots() - 1)) {
                    this.step(-1, 0);
                }
                else {
                    this.step(-1, this.page + 1);
                }
            }
        }, this.autoplayInterval);
    }
    stopAutoplay() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
    onTransitionEnd() {
        if (this.itemsContainer) {
            this.itemsContainer.nativeElement.style.transition = '';
            if ((this.page === 0 || this.page === (this.totalDots() - 1)) && this.isCircular()) {
                this.itemsContainer.nativeElement.style.transform = this.isVertical() ? `translate3d(0, ${this.totalShiftedItems * (100 / this._numVisible)}%, 0)` : `translate3d(${this.totalShiftedItems * (100 / this._numVisible)}%, 0, 0)`;
            }
        }
    }
    onTouchStart(e) {
        let touchobj = e.changedTouches[0];
        this.startPos = {
            x: touchobj.pageX,
            y: touchobj.pageY
        };
    }
    onTouchMove(e) {
        if (e.cancelable) {
            e.preventDefault();
        }
    }
    onTouchEnd(e) {
        let touchobj = e.changedTouches[0];
        if (this.isVertical()) {
            this.changePageOnTouch(e, (touchobj.pageY - this.startPos.y));
        }
        else {
            this.changePageOnTouch(e, (touchobj.pageX - this.startPos.x));
        }
    }
    changePageOnTouch(e, diff) {
        if (Math.abs(diff) > this.swipeThreshold) {
            if (diff < 0) {
                this.navForward(e);
            }
            else {
                this.navBackward(e);
            }
        }
    }
    bindDocumentListeners() {
        if (!this.documentResizeListener) {
            this.documentResizeListener = (e) => {
                this.calculatePosition();
            };
            window.addEventListener('resize', this.documentResizeListener);
        }
    }
    unbindDocumentListeners() {
        if (this.documentResizeListener) {
            window.removeEventListener('resize', this.documentResizeListener);
            this.documentResizeListener = null;
        }
    }
    ngOnDestroy() {
        if (this.responsiveOptions) {
            this.unbindDocumentListeners();
        }
        if (this.autoplayInterval) {
            this.stopAutoplay();
        }
    }
}
Carousel.??fac = i0.????ngDeclareFactory({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: Carousel, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }, { token: i0.ChangeDetectorRef }], target: i0.????FactoryTarget.Component });
Carousel.??cmp = i0.????ngDeclareComponent({ minVersion: "12.0.0", version: "13.2.6", type: Carousel, selector: "p-carousel", inputs: { page: "page", numVisible: "numVisible", numScroll: "numScroll", responsiveOptions: "responsiveOptions", orientation: "orientation", verticalViewPortHeight: "verticalViewPortHeight", contentClass: "contentClass", indicatorsContentClass: "indicatorsContentClass", indicatorsContentStyle: "indicatorsContentStyle", indicatorStyleClass: "indicatorStyleClass", indicatorStyle: "indicatorStyle", value: "value", circular: "circular", showIndicators: "showIndicators", showNavigators: "showNavigators", autoplayInterval: "autoplayInterval", style: "style", styleClass: "styleClass" }, outputs: { onPage: "onPage" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "headerFacet", first: true, predicate: Header, descendants: true }, { propertyName: "footerFacet", first: true, predicate: Footer, descendants: true }, { propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "itemsContainer", first: true, predicate: ["itemsContainer"], descendants: true }], usesOnChanges: true, ngImport: i0, template: `
		<div [attr.id]="id" [ngClass]="{'p-carousel p-component':true, 'p-carousel-vertical': isVertical(), 'p-carousel-horizontal': !isVertical()}" [ngStyle]="style" [class]="styleClass">
			<div class="p-carousel-header" *ngIf="headerFacet || headerTemplate">
                <ng-content select="p-header"></ng-content>
                <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
			</div>
			<div [class]="contentClass" [ngClass]="'p-carousel-content'">
				<div class="p-carousel-container">
					<button type="button" *ngIf="showNavigators" [ngClass]="{'p-carousel-prev p-link':true, 'p-disabled': isBackwardNavDisabled()}" [disabled]="isBackwardNavDisabled()" (click)="navBackward($event)" pRipple>
						<span [ngClass]="{'p-carousel-prev-icon pi': true, 'pi-chevron-left': !isVertical(), 'pi-chevron-up': isVertical()}"></span>
					</button>
					<div class="p-carousel-items-content" [ngStyle]="{'height': isVertical() ? verticalViewPortHeight : 'auto'}">
						<div #itemsContainer class="p-carousel-items-container" (transitionend)="onTransitionEnd()" (touchend)="onTouchEnd($event)" (touchstart)="onTouchStart($event)" (touchmove)="onTouchMove($event)">
                            <div *ngFor="let item of clonedItemsForStarting; let index = index" [ngClass]= "{'p-carousel-item p-carousel-item-cloned': true,
                                'p-carousel-item-active': (totalShiftedItems * -1) === (value.length),
							    'p-carousel-item-start': 0 === index,
							    'p-carousel-item-end': (clonedItemsForStarting.length - 1) === index}">
								<ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item}"></ng-container>
							</div>
                            <div *ngFor="let item of value; let index = index" [ngClass]= "{'p-carousel-item': true,
                                'p-carousel-item-active': (firstIndex() <= index && lastIndex() >= index),
							    'p-carousel-item-start': firstIndex() === index,
							    'p-carousel-item-end': lastIndex() === index}">
								<ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item}"></ng-container>
							</div>
                            <div *ngFor="let item of clonedItemsForFinishing; let index = index" [ngClass]= "{'p-carousel-item p-carousel-item-cloned': true,
                                'p-carousel-item-active': ((totalShiftedItems *-1) === numVisible),
							    'p-carousel-item-start': 0 === index,
							    'p-carousel-item-end': (clonedItemsForFinishing.length - 1) === index}">
								<ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item}"></ng-container>
							</div>
						</div>
					</div>
					<button type="button" *ngIf="showNavigators" [ngClass]="{'p-carousel-next p-link': true, 'p-disabled': isForwardNavDisabled()}" [disabled]="isForwardNavDisabled()" (click)="navForward($event)" pRipple>
						<span [ngClass]="{'p-carousel-prev-icon pi': true, 'pi-chevron-right': !isVertical(), 'pi-chevron-down': isVertical()}"></span>
					</button>
				</div>
				<ul [ngClass]="'p-carousel-indicators p-reset'" [class]="indicatorsContentClass" [ngStyle]="indicatorsContentStyle" *ngIf="showIndicators">
					<li *ngFor="let totalDot of totalDotsArray(); let i = index" [ngClass]="{'p-carousel-indicator':true,'p-highlight': _page === i}">
						<button type="button" [ngClass]="'p-link'" (click)="onDotClick($event, i)" [class]="indicatorStyleClass" [ngStyle]="indicatorStyle"></button>
					</li>
				</ul>
			</div>
			<div class="p-carousel-footer" *ngIf="footerFacet || footerTemplate">
                <ng-content select="p-footer"></ng-content>
                <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
			</div>
		</div>
    `, isInline: true, styles: [".p-carousel{display:flex;flex-direction:column}.p-carousel-content{display:flex;flex-direction:column;overflow:auto}.p-carousel-prev,.p-carousel-next{align-self:center;flex-grow:0;flex-shrink:0;display:flex;justify-content:center;align-items:center;overflow:hidden;position:relative}.p-carousel-container{display:flex;flex-direction:row}.p-carousel-items-content{overflow:hidden;width:100%}.p-carousel-items-container{display:flex;flex-direction:row}.p-carousel-indicators{display:flex;flex-direction:row;justify-content:center;flex-wrap:wrap}.p-carousel-indicator>button{display:flex;align-items:center;justify-content:center}.p-carousel-vertical .p-carousel-container{flex-direction:column}.p-carousel-vertical .p-carousel-items-container{flex-direction:column;height:100%}.p-items-hidden .p-carousel-item{visibility:hidden}.p-items-hidden .p-carousel-item.p-carousel-item-active{visibility:visible}\n"], directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i2.Ripple, selector: "[pRipple]" }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.????ngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: Carousel, decorators: [{
            type: Component,
            args: [{ selector: 'p-carousel', template: `
		<div [attr.id]="id" [ngClass]="{'p-carousel p-component':true, 'p-carousel-vertical': isVertical(), 'p-carousel-horizontal': !isVertical()}" [ngStyle]="style" [class]="styleClass">
			<div class="p-carousel-header" *ngIf="headerFacet || headerTemplate">
                <ng-content select="p-header"></ng-content>
                <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
			</div>
			<div [class]="contentClass" [ngClass]="'p-carousel-content'">
				<div class="p-carousel-container">
					<button type="button" *ngIf="showNavigators" [ngClass]="{'p-carousel-prev p-link':true, 'p-disabled': isBackwardNavDisabled()}" [disabled]="isBackwardNavDisabled()" (click)="navBackward($event)" pRipple>
						<span [ngClass]="{'p-carousel-prev-icon pi': true, 'pi-chevron-left': !isVertical(), 'pi-chevron-up': isVertical()}"></span>
					</button>
					<div class="p-carousel-items-content" [ngStyle]="{'height': isVertical() ? verticalViewPortHeight : 'auto'}">
						<div #itemsContainer class="p-carousel-items-container" (transitionend)="onTransitionEnd()" (touchend)="onTouchEnd($event)" (touchstart)="onTouchStart($event)" (touchmove)="onTouchMove($event)">
                            <div *ngFor="let item of clonedItemsForStarting; let index = index" [ngClass]= "{'p-carousel-item p-carousel-item-cloned': true,
                                'p-carousel-item-active': (totalShiftedItems * -1) === (value.length),
							    'p-carousel-item-start': 0 === index,
							    'p-carousel-item-end': (clonedItemsForStarting.length - 1) === index}">
								<ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item}"></ng-container>
							</div>
                            <div *ngFor="let item of value; let index = index" [ngClass]= "{'p-carousel-item': true,
                                'p-carousel-item-active': (firstIndex() <= index && lastIndex() >= index),
							    'p-carousel-item-start': firstIndex() === index,
							    'p-carousel-item-end': lastIndex() === index}">
								<ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item}"></ng-container>
							</div>
                            <div *ngFor="let item of clonedItemsForFinishing; let index = index" [ngClass]= "{'p-carousel-item p-carousel-item-cloned': true,
                                'p-carousel-item-active': ((totalShiftedItems *-1) === numVisible),
							    'p-carousel-item-start': 0 === index,
							    'p-carousel-item-end': (clonedItemsForFinishing.length - 1) === index}">
								<ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item}"></ng-container>
							</div>
						</div>
					</div>
					<button type="button" *ngIf="showNavigators" [ngClass]="{'p-carousel-next p-link': true, 'p-disabled': isForwardNavDisabled()}" [disabled]="isForwardNavDisabled()" (click)="navForward($event)" pRipple>
						<span [ngClass]="{'p-carousel-prev-icon pi': true, 'pi-chevron-right': !isVertical(), 'pi-chevron-down': isVertical()}"></span>
					</button>
				</div>
				<ul [ngClass]="'p-carousel-indicators p-reset'" [class]="indicatorsContentClass" [ngStyle]="indicatorsContentStyle" *ngIf="showIndicators">
					<li *ngFor="let totalDot of totalDotsArray(); let i = index" [ngClass]="{'p-carousel-indicator':true,'p-highlight': _page === i}">
						<button type="button" [ngClass]="'p-link'" (click)="onDotClick($event, i)" [class]="indicatorStyleClass" [ngStyle]="indicatorStyle"></button>
					</li>
				</ul>
			</div>
			<div class="p-carousel-footer" *ngIf="footerFacet || footerTemplate">
                <ng-content select="p-footer"></ng-content>
                <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
			</div>
		</div>
    `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        'class': 'p-element'
                    }, styles: [".p-carousel{display:flex;flex-direction:column}.p-carousel-content{display:flex;flex-direction:column;overflow:auto}.p-carousel-prev,.p-carousel-next{align-self:center;flex-grow:0;flex-shrink:0;display:flex;justify-content:center;align-items:center;overflow:hidden;position:relative}.p-carousel-container{display:flex;flex-direction:row}.p-carousel-items-content{overflow:hidden;width:100%}.p-carousel-items-container{display:flex;flex-direction:row}.p-carousel-indicators{display:flex;flex-direction:row;justify-content:center;flex-wrap:wrap}.p-carousel-indicator>button{display:flex;align-items:center;justify-content:center}.p-carousel-vertical .p-carousel-container{flex-direction:column}.p-carousel-vertical .p-carousel-items-container{flex-direction:column;height:100%}.p-items-hidden .p-carousel-item{visibility:hidden}.p-items-hidden .p-carousel-item.p-carousel-item-active{visibility:visible}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { page: [{
                type: Input
            }], numVisible: [{
                type: Input
            }], numScroll: [{
                type: Input
            }], responsiveOptions: [{
                type: Input
            }], orientation: [{
                type: Input
            }], verticalViewPortHeight: [{
                type: Input
            }], contentClass: [{
                type: Input
            }], indicatorsContentClass: [{
                type: Input
            }], indicatorsContentStyle: [{
                type: Input
            }], indicatorStyleClass: [{
                type: Input
            }], indicatorStyle: [{
                type: Input
            }], value: [{
                type: Input
            }], circular: [{
                type: Input
            }], showIndicators: [{
                type: Input
            }], showNavigators: [{
                type: Input
            }], autoplayInterval: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], onPage: [{
                type: Output
            }], itemsContainer: [{
                type: ViewChild,
                args: ['itemsContainer']
            }], headerFacet: [{
                type: ContentChild,
                args: [Header]
            }], footerFacet: [{
                type: ContentChild,
                args: [Footer]
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
export class CarouselModule {
}
CarouselModule.??fac = i0.????ngDeclareFactory({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: CarouselModule, deps: [], target: i0.????FactoryTarget.NgModule });
CarouselModule.??mod = i0.????ngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: CarouselModule, declarations: [Carousel], imports: [CommonModule, SharedModule, RippleModule], exports: [CommonModule, Carousel, SharedModule] });
CarouselModule.??inj = i0.????ngDeclareInjector({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: CarouselModule, imports: [[CommonModule, SharedModule, RippleModule], CommonModule, SharedModule] });
i0.????ngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: CarouselModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, SharedModule, RippleModule],
                    exports: [CommonModule, Carousel, SharedModule],
                    declarations: [Carousel]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvY2Fyb3VzZWwvY2Fyb3VzZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWMsU0FBUyxFQUFpQyxlQUFlLEVBQWEsUUFBUSxFQUFVLFlBQVksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFvQyxNQUFNLGVBQWUsQ0FBQztBQUN2USxPQUFPLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBNERsRCxNQUFNLE9BQU8sUUFBUTtJQTRJcEIsWUFBbUIsRUFBYyxFQUFTLElBQVksRUFBUyxFQUFxQjtRQUFqRSxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFTLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBckczRSxnQkFBVyxHQUFHLFlBQVksQ0FBQztRQUUzQiwyQkFBc0IsR0FBRyxPQUFPLENBQUM7UUFFakMsaUJBQVksR0FBVyxFQUFFLENBQUM7UUFFMUIsMkJBQXNCLEdBQVcsRUFBRSxDQUFDO1FBSXBDLHdCQUFtQixHQUFXLEVBQUUsQ0FBQztRQVdqQyxhQUFRLEdBQVksS0FBSyxDQUFDO1FBRTFCLG1CQUFjLEdBQVksSUFBSSxDQUFDO1FBRS9CLG1CQUFjLEdBQVksSUFBSSxDQUFDO1FBRS9CLHFCQUFnQixHQUFVLENBQUMsQ0FBQztRQU14QixXQUFNLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFV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QVksRUFBRSxRQUFRLEVBQUUsWUFBWSxDQUFDO29CQUMvQyxZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUM7aUJBQ3hCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgRWxlbWVudFJlZiwgVmlld0NoaWxkLCBBZnRlckNvbnRlbnRJbml0LCBUZW1wbGF0ZVJlZiwgQ29udGVudENoaWxkcmVuLCBRdWVyeUxpc3QsIE5nTW9kdWxlLCBOZ1pvbmUsIEV2ZW50RW1pdHRlciwgT3V0cHV0LCBDb250ZW50Q2hpbGQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBWaWV3RW5jYXBzdWxhdGlvbiwgQ2hhbmdlRGV0ZWN0b3JSZWYsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFByaW1lVGVtcGxhdGUsIFNoYXJlZE1vZHVsZSwgSGVhZGVyLCBGb290ZXIgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBSaXBwbGVNb2R1bGUgfSBmcm9tICdwcmltZW5nL3JpcHBsZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgVW5pcXVlQ29tcG9uZW50SWQgfSBmcm9tICdwcmltZW5nL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAncC1jYXJvdXNlbCcsXG5cdHRlbXBsYXRlOiBgXG5cdFx0PGRpdiBbYXR0ci5pZF09XCJpZFwiIFtuZ0NsYXNzXT1cInsncC1jYXJvdXNlbCBwLWNvbXBvbmVudCc6dHJ1ZSwgJ3AtY2Fyb3VzZWwtdmVydGljYWwnOiBpc1ZlcnRpY2FsKCksICdwLWNhcm91c2VsLWhvcml6b250YWwnOiAhaXNWZXJ0aWNhbCgpfVwiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIj5cblx0XHRcdDxkaXYgY2xhc3M9XCJwLWNhcm91c2VsLWhlYWRlclwiICpuZ0lmPVwiaGVhZGVyRmFjZXQgfHwgaGVhZGVyVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJwLWhlYWRlclwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaGVhZGVyVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cblx0XHRcdDwvZGl2PlxuXHRcdFx0PGRpdiBbY2xhc3NdPVwiY29udGVudENsYXNzXCIgW25nQ2xhc3NdPVwiJ3AtY2Fyb3VzZWwtY29udGVudCdcIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInAtY2Fyb3VzZWwtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgKm5nSWY9XCJzaG93TmF2aWdhdG9yc1wiIFtuZ0NsYXNzXT1cInsncC1jYXJvdXNlbC1wcmV2IHAtbGluayc6dHJ1ZSwgJ3AtZGlzYWJsZWQnOiBpc0JhY2t3YXJkTmF2RGlzYWJsZWQoKX1cIiBbZGlzYWJsZWRdPVwiaXNCYWNrd2FyZE5hdkRpc2FibGVkKClcIiAoY2xpY2spPVwibmF2QmFja3dhcmQoJGV2ZW50KVwiIHBSaXBwbGU+XG5cdFx0XHRcdFx0XHQ8c3BhbiBbbmdDbGFzc109XCJ7J3AtY2Fyb3VzZWwtcHJldi1pY29uIHBpJzogdHJ1ZSwgJ3BpLWNoZXZyb24tbGVmdCc6ICFpc1ZlcnRpY2FsKCksICdwaS1jaGV2cm9uLXVwJzogaXNWZXJ0aWNhbCgpfVwiPjwvc3Bhbj5cblx0XHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwicC1jYXJvdXNlbC1pdGVtcy1jb250ZW50XCIgW25nU3R5bGVdPVwieydoZWlnaHQnOiBpc1ZlcnRpY2FsKCkgPyB2ZXJ0aWNhbFZpZXdQb3J0SGVpZ2h0IDogJ2F1dG8nfVwiPlxuXHRcdFx0XHRcdFx0PGRpdiAjaXRlbXNDb250YWluZXIgY2xhc3M9XCJwLWNhcm91c2VsLWl0ZW1zLWNvbnRhaW5lclwiICh0cmFuc2l0aW9uZW5kKT1cIm9uVHJhbnNpdGlvbkVuZCgpXCIgKHRvdWNoZW5kKT1cIm9uVG91Y2hFbmQoJGV2ZW50KVwiICh0b3VjaHN0YXJ0KT1cIm9uVG91Y2hTdGFydCgkZXZlbnQpXCIgKHRvdWNobW92ZSk9XCJvblRvdWNoTW92ZSgkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBjbG9uZWRJdGVtc0ZvclN0YXJ0aW5nOyBsZXQgaW5kZXggPSBpbmRleFwiIFtuZ0NsYXNzXT0gXCJ7J3AtY2Fyb3VzZWwtaXRlbSBwLWNhcm91c2VsLWl0ZW0tY2xvbmVkJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3AtY2Fyb3VzZWwtaXRlbS1hY3RpdmUnOiAodG90YWxTaGlmdGVkSXRlbXMgKiAtMSkgPT09ICh2YWx1ZS5sZW5ndGgpLFxuXHRcdFx0XHRcdFx0XHQgICAgJ3AtY2Fyb3VzZWwtaXRlbS1zdGFydCc6IDAgPT09IGluZGV4LFxuXHRcdFx0XHRcdFx0XHQgICAgJ3AtY2Fyb3VzZWwtaXRlbS1lbmQnOiAoY2xvbmVkSXRlbXNGb3JTdGFydGluZy5sZW5ndGggLSAxKSA9PT0gaW5kZXh9XCI+XG5cdFx0XHRcdFx0XHRcdFx0PG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIml0ZW1UZW1wbGF0ZTsgY29udGV4dDogeyRpbXBsaWNpdDogaXRlbX1cIj48L25nLWNvbnRhaW5lcj5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgaXRlbSBvZiB2YWx1ZTsgbGV0IGluZGV4ID0gaW5kZXhcIiBbbmdDbGFzc109IFwieydwLWNhcm91c2VsLWl0ZW0nOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncC1jYXJvdXNlbC1pdGVtLWFjdGl2ZSc6IChmaXJzdEluZGV4KCkgPD0gaW5kZXggJiYgbGFzdEluZGV4KCkgPj0gaW5kZXgpLFxuXHRcdFx0XHRcdFx0XHQgICAgJ3AtY2Fyb3VzZWwtaXRlbS1zdGFydCc6IGZpcnN0SW5kZXgoKSA9PT0gaW5kZXgsXG5cdFx0XHRcdFx0XHRcdCAgICAncC1jYXJvdXNlbC1pdGVtLWVuZCc6IGxhc3RJbmRleCgpID09PSBpbmRleH1cIj5cblx0XHRcdFx0XHRcdFx0XHQ8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaXRlbVRlbXBsYXRlOyBjb250ZXh0OiB7JGltcGxpY2l0OiBpdGVtfVwiPjwvbmctY29udGFpbmVyPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBpdGVtIG9mIGNsb25lZEl0ZW1zRm9yRmluaXNoaW5nOyBsZXQgaW5kZXggPSBpbmRleFwiIFtuZ0NsYXNzXT0gXCJ7J3AtY2Fyb3VzZWwtaXRlbSBwLWNhcm91c2VsLWl0ZW0tY2xvbmVkJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3AtY2Fyb3VzZWwtaXRlbS1hY3RpdmUnOiAoKHRvdGFsU2hpZnRlZEl0ZW1zICotMSkgPT09IG51bVZpc2libGUpLFxuXHRcdFx0XHRcdFx0XHQgICAgJ3AtY2Fyb3VzZWwtaXRlbS1zdGFydCc6IDAgPT09IGluZGV4LFxuXHRcdFx0XHRcdFx0XHQgICAgJ3AtY2Fyb3VzZWwtaXRlbS1lbmQnOiAoY2xvbmVkSXRlbXNGb3JGaW5pc2hpbmcubGVuZ3RoIC0gMSkgPT09IGluZGV4fVwiPlxuXHRcdFx0XHRcdFx0XHRcdDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJpdGVtVGVtcGxhdGU7IGNvbnRleHQ6IHskaW1wbGljaXQ6IGl0ZW19XCI+PC9uZy1jb250YWluZXI+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgKm5nSWY9XCJzaG93TmF2aWdhdG9yc1wiIFtuZ0NsYXNzXT1cInsncC1jYXJvdXNlbC1uZXh0IHAtbGluayc6IHRydWUsICdwLWRpc2FibGVkJzogaXNGb3J3YXJkTmF2RGlzYWJsZWQoKX1cIiBbZGlzYWJsZWRdPVwiaXNGb3J3YXJkTmF2RGlzYWJsZWQoKVwiIChjbGljayk9XCJuYXZGb3J3YXJkKCRldmVudClcIiBwUmlwcGxlPlxuXHRcdFx0XHRcdFx0PHNwYW4gW25nQ2xhc3NdPVwieydwLWNhcm91c2VsLXByZXYtaWNvbiBwaSc6IHRydWUsICdwaS1jaGV2cm9uLXJpZ2h0JzogIWlzVmVydGljYWwoKSwgJ3BpLWNoZXZyb24tZG93bic6IGlzVmVydGljYWwoKX1cIj48L3NwYW4+XG5cdFx0XHRcdFx0PC9idXR0b24+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8dWwgW25nQ2xhc3NdPVwiJ3AtY2Fyb3VzZWwtaW5kaWNhdG9ycyBwLXJlc2V0J1wiIFtjbGFzc109XCJpbmRpY2F0b3JzQ29udGVudENsYXNzXCIgW25nU3R5bGVdPVwiaW5kaWNhdG9yc0NvbnRlbnRTdHlsZVwiICpuZ0lmPVwic2hvd0luZGljYXRvcnNcIj5cblx0XHRcdFx0XHQ8bGkgKm5nRm9yPVwibGV0IHRvdGFsRG90IG9mIHRvdGFsRG90c0FycmF5KCk7IGxldCBpID0gaW5kZXhcIiBbbmdDbGFzc109XCJ7J3AtY2Fyb3VzZWwtaW5kaWNhdG9yJzp0cnVlLCdwLWhpZ2hsaWdodCc6IF9wYWdlID09PSBpfVwiPlxuXHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgW25nQ2xhc3NdPVwiJ3AtbGluaydcIiAoY2xpY2spPVwib25Eb3RDbGljaygkZXZlbnQsIGkpXCIgW2NsYXNzXT1cImluZGljYXRvclN0eWxlQ2xhc3NcIiBbbmdTdHlsZV09XCJpbmRpY2F0b3JTdHlsZVwiPjwvYnV0dG9uPlxuXHRcdFx0XHRcdDwvbGk+XG5cdFx0XHRcdDwvdWw+XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdDxkaXYgY2xhc3M9XCJwLWNhcm91c2VsLWZvb3RlclwiICpuZ0lmPVwiZm9vdGVyRmFjZXQgfHwgZm9vdGVyVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJwLWZvb3RlclwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZm9vdGVyVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cblx0XHRcdDwvZGl2PlxuXHRcdDwvZGl2PlxuICAgIGAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBzdHlsZVVybHM6IFsnLi9jYXJvdXNlbC5jc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgICdjbGFzcyc6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBDYXJvdXNlbCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuXG5cdEBJbnB1dCgpIGdldCBwYWdlKCk6bnVtYmVyIHtcblx0XHRyZXR1cm4gdGhpcy5fcGFnZTtcblx0fVxuXHRzZXQgcGFnZSh2YWw6bnVtYmVyKSB7XG5cdFx0aWYgKHRoaXMuaXNDcmVhdGVkICYmIHZhbCAhPT0gdGhpcy5fcGFnZSkge1xuXHRcdFx0aWYgKHRoaXMuYXV0b3BsYXlJbnRlcnZhbCkge1xuXHRcdFx0XHR0aGlzLnN0b3BBdXRvcGxheSgpO1xuXHRcdFx0XHR0aGlzLmFsbG93QXV0b3BsYXkgPSBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHZhbCA+IHRoaXMuX3BhZ2UgJiYgdmFsIDw9ICh0aGlzLnRvdGFsRG90cygpIC0gMSkpIHtcblx0XHRcdFx0dGhpcy5zdGVwKC0xLCB2YWwpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAodmFsIDwgdGhpcy5fcGFnZSApIHtcblx0XHRcdFx0dGhpcy5zdGVwKDEsIHZhbCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy5fcGFnZSA9IHZhbDtcblx0fVxuXG5cdEBJbnB1dCgpIGdldCBudW1WaXNpYmxlKCk6bnVtYmVyIHtcblx0XHRyZXR1cm4gdGhpcy5fbnVtVmlzaWJsZTtcblx0fVxuXHRzZXQgbnVtVmlzaWJsZSh2YWw6bnVtYmVyKSB7XG5cdFx0dGhpcy5fbnVtVmlzaWJsZSA9IHZhbDtcblx0fVxuXG5cdEBJbnB1dCgpIGdldCBudW1TY3JvbGwoKTpudW1iZXIge1xuXHRcdHJldHVybiB0aGlzLl9udW1WaXNpYmxlO1xuXHR9XG5cdHNldCBudW1TY3JvbGwodmFsOm51bWJlcikge1xuXHRcdHRoaXMuX251bVNjcm9sbCA9IHZhbDtcblx0fVxuXG5cdEBJbnB1dCgpIHJlc3BvbnNpdmVPcHRpb25zOiBhbnlbXTtcblxuXHRASW5wdXQoKSBvcmllbnRhdGlvbiA9IFwiaG9yaXpvbnRhbFwiO1xuXG5cdEBJbnB1dCgpIHZlcnRpY2FsVmlld1BvcnRIZWlnaHQgPSBcIjMwMHB4XCI7XG5cblx0QElucHV0KCkgY29udGVudENsYXNzOiBzdHJpbmcgPSBcIlwiO1xuXG5cdEBJbnB1dCgpIGluZGljYXRvcnNDb250ZW50Q2xhc3M6IHN0cmluZyA9IFwiXCI7XG5cblx0QElucHV0KCkgaW5kaWNhdG9yc0NvbnRlbnRTdHlsZTogYW55O1xuXG5cdEBJbnB1dCgpIGluZGljYXRvclN0eWxlQ2xhc3M6IHN0cmluZyA9IFwiXCI7XG5cblx0QElucHV0KCkgaW5kaWNhdG9yU3R5bGU6IGFueTtcblxuXHRASW5wdXQoKSBnZXQgdmFsdWUoKSA6YW55W10ge1xuXHRcdHJldHVybiB0aGlzLl92YWx1ZTtcblx0fTtcblx0c2V0IHZhbHVlKHZhbCkge1xuXHRcdHRoaXMuX3ZhbHVlID0gdmFsO1xuXHR9XG5cblx0QElucHV0KCkgY2lyY3VsYXI6IGJvb2xlYW4gPSBmYWxzZTtcblxuXHRASW5wdXQoKSBzaG93SW5kaWNhdG9yczogYm9vbGVhbiA9IHRydWU7XG5cblx0QElucHV0KCkgc2hvd05hdmlnYXRvcnM6IGJvb2xlYW4gPSB0cnVlO1xuXG5cdEBJbnB1dCgpIGF1dG9wbGF5SW50ZXJ2YWw6bnVtYmVyID0gMDtcblxuXHRASW5wdXQoKSBzdHlsZTogYW55O1xuXG5cdEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIEBPdXRwdXQoKSBvblBhZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5cdEBWaWV3Q2hpbGQoJ2l0ZW1zQ29udGFpbmVyJykgaXRlbXNDb250YWluZXI6IEVsZW1lbnRSZWY7XG5cblx0QENvbnRlbnRDaGlsZChIZWFkZXIpIGhlYWRlckZhY2V0O1xuXG4gICAgQENvbnRlbnRDaGlsZChGb290ZXIpIGZvb3RlckZhY2V0O1xuXG5cdEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8YW55PjtcblxuXHRfbnVtVmlzaWJsZTogbnVtYmVyID0gMTtcblxuXHRfbnVtU2Nyb2xsOiBudW1iZXIgPSAxO1xuXG5cdF9vbGROdW1TY3JvbGw6IG51bWJlciA9IDA7XG5cblx0cHJldlN0YXRlOiBhbnkgPSB7XG5cdFx0bnVtU2Nyb2xsOjAsXG5cdFx0bnVtVmlzaWJsZTowLFxuXHRcdHZhbHVlOiBbXVxuXHR9O1xuXG5cdGRlZmF1bHROdW1TY3JvbGw6bnVtYmVyID0gMTtcblxuXHRkZWZhdWx0TnVtVmlzaWJsZTpudW1iZXIgPSAxO1xuXG5cdF9wYWdlOiBudW1iZXIgPSAwO1xuXG5cdF92YWx1ZTogYW55W107XG5cblx0Y2Fyb3VzZWxTdHlsZTphbnk7XG5cblx0aWQ6c3RyaW5nO1xuXG5cdHRvdGFsU2hpZnRlZEl0ZW1zO1xuXG5cdGlzUmVtYWluaW5nSXRlbXNBZGRlZDpib29sZWFuID0gZmFsc2U7XG5cblx0YW5pbWF0aW9uVGltZW91dDphbnk7XG5cblx0dHJhbnNsYXRlVGltZW91dDphbnk7XG5cblx0cmVtYWluaW5nSXRlbXM6IG51bWJlciA9IDA7XG5cblx0X2l0ZW1zOiBhbnlbXTtcblxuXHRzdGFydFBvczogYW55O1xuXG5cdGRvY3VtZW50UmVzaXplTGlzdGVuZXI6IGFueTtcblxuXHRjbG9uZWRJdGVtc0ZvclN0YXJ0aW5nOiBhbnlbXTtcblxuXHRjbG9uZWRJdGVtc0ZvckZpbmlzaGluZzogYW55W107XG5cblx0YWxsb3dBdXRvcGxheTogYm9vbGVhbjtcblxuXHRpbnRlcnZhbDogYW55O1xuXG5cdGlzQ3JlYXRlZDogYm9vbGVhbjtcblxuXHRzd2lwZVRocmVzaG9sZDogbnVtYmVyID0gMjA7XG5cbiAgICBpdGVtVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBoZWFkZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIGZvb3RlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG5cdGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIHpvbmU6IE5nWm9uZSwgcHVibGljIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuXHRcdHRoaXMudG90YWxTaGlmdGVkSXRlbXMgPSB0aGlzLnBhZ2UgKiB0aGlzLm51bVNjcm9sbCAqIC0xO1xuXHR9XG5cblx0bmdPbkNoYW5nZXMoc2ltcGxlQ2hhbmdlOiBTaW1wbGVDaGFuZ2VzKSB7XG5cdFx0aWYgKHNpbXBsZUNoYW5nZS52YWx1ZSkge1xuXHRcdFx0aWYgKHRoaXMuY2lyY3VsYXIgJiYgdGhpcy5fdmFsdWUpIHtcblx0XHRcdFx0dGhpcy5zZXRDbG9uZUl0ZW1zKCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuaXNDcmVhdGVkKSB7XG5cblx0XHRcdGlmIChzaW1wbGVDaGFuZ2UubnVtVmlzaWJsZSkge1xuXHRcdFx0XHRpZiAodGhpcy5yZXNwb25zaXZlT3B0aW9ucykge1xuXHRcdFx0XHRcdHRoaXMuZGVmYXVsdE51bVZpc2libGUgPSB0aGlzLm51bVZpc2libGU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAodGhpcy5pc0NpcmN1bGFyKCkpIHtcblx0XHRcdFx0XHR0aGlzLnNldENsb25lSXRlbXMoKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMuY3JlYXRlU3R5bGUoKTtcblx0XHRcdFx0dGhpcy5jYWxjdWxhdGVQb3NpdGlvbigpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoc2ltcGxlQ2hhbmdlLm51bVNjcm9sbCkge1xuXHRcdFx0XHRpZiAodGhpcy5yZXNwb25zaXZlT3B0aW9ucykge1xuXHRcdFx0XHRcdHRoaXMuZGVmYXVsdE51bVNjcm9sbCA9IHRoaXMubnVtU2Nyb2xsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0bmdBZnRlckNvbnRlbnRJbml0KCkge1xuXHRcdHRoaXMuaWQgPSBVbmlxdWVDb21wb25lbnRJZCgpO1xuXHRcdHRoaXMuYWxsb3dBdXRvcGxheSA9ICEhdGhpcy5hdXRvcGxheUludGVydmFsO1xuXG5cdFx0aWYgKHRoaXMuY2lyY3VsYXIpIHtcblx0XHRcdHRoaXMuc2V0Q2xvbmVJdGVtcygpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLnJlc3BvbnNpdmVPcHRpb25zKSB7XG5cdFx0XHR0aGlzLmRlZmF1bHROdW1TY3JvbGwgPSB0aGlzLl9udW1TY3JvbGw7XG5cdFx0XHR0aGlzLmRlZmF1bHROdW1WaXNpYmxlID0gdGhpcy5fbnVtVmlzaWJsZTtcblx0XHR9XG5cblx0XHR0aGlzLmNyZWF0ZVN0eWxlKCk7XG5cdFx0dGhpcy5jYWxjdWxhdGVQb3NpdGlvbigpO1xuXG5cdFx0aWYgKHRoaXMucmVzcG9uc2l2ZU9wdGlvbnMpIHtcblx0XHRcdHRoaXMuYmluZERvY3VtZW50TGlzdGVuZXJzKCk7XG5cdFx0fVxuXG5cdFx0dGhpcy50ZW1wbGF0ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXHRcdFx0c3dpdGNoIChpdGVtLmdldFR5cGUoKSkge1xuXHRcdFx0XHRjYXNlICdpdGVtJzpcblx0XHRcdFx0XHR0aGlzLml0ZW1UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdoZWFkZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWRlclRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2Zvb3Rlcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9vdGVyVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0dGhpcy5pdGVtVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0bmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xuXHRcdGNvbnN0IGlzQ2lyY3VsYXIgPSB0aGlzLmlzQ2lyY3VsYXIoKTtcblx0XHRsZXQgdG90YWxTaGlmdGVkSXRlbXMgPSB0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zO1xuXG5cdFx0aWYgKHRoaXMudmFsdWUgJiYgdGhpcy5pdGVtc0NvbnRhaW5lciAmJiAodGhpcy5wcmV2U3RhdGUubnVtU2Nyb2xsICE9PSB0aGlzLl9udW1TY3JvbGwgfHwgdGhpcy5wcmV2U3RhdGUubnVtVmlzaWJsZSAhPT0gdGhpcy5fbnVtVmlzaWJsZSB8fCB0aGlzLnByZXZTdGF0ZS52YWx1ZS5sZW5ndGggIT09IHRoaXMudmFsdWUubGVuZ3RoKSkge1xuXHRcdFx0aWYgKHRoaXMuYXV0b3BsYXlJbnRlcnZhbCkge1xuXHRcdFx0XHR0aGlzLnN0b3BBdXRvcGxheSgpO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnJlbWFpbmluZ0l0ZW1zID0gKHRoaXMudmFsdWUubGVuZ3RoIC0gdGhpcy5fbnVtVmlzaWJsZSkgJSB0aGlzLl9udW1TY3JvbGw7XG5cblx0XHRcdGxldCBwYWdlID0gdGhpcy5fcGFnZTtcblx0XHRcdGlmICh0aGlzLnRvdGFsRG90cygpICE9PSAwICYmIHBhZ2UgPj0gdGhpcy50b3RhbERvdHMoKSkge1xuICAgICAgICAgICAgICAgIHBhZ2UgPSB0aGlzLnRvdGFsRG90cygpIC0gMTtcblx0XHRcdFx0dGhpcy5fcGFnZSA9IHBhZ2U7XG5cdFx0XHRcdHRoaXMub25QYWdlLmVtaXQoe1xuXHRcdFx0XHRcdHBhZ2U6IHRoaXMucGFnZVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0dG90YWxTaGlmdGVkSXRlbXMgPSAocGFnZSAqIHRoaXMuX251bVNjcm9sbCkgKiAtMTtcbiAgICAgICAgICAgIGlmIChpc0NpcmN1bGFyKSB7XG4gICAgICAgICAgICAgICAgdG90YWxTaGlmdGVkSXRlbXMgLT0gdGhpcy5fbnVtVmlzaWJsZTtcbiAgICAgICAgICAgIH1cblxuXHRcdFx0aWYgKHBhZ2UgPT09ICh0aGlzLnRvdGFsRG90cygpIC0gMSkgJiYgdGhpcy5yZW1haW5pbmdJdGVtcyA+IDApIHtcblx0XHRcdFx0dG90YWxTaGlmdGVkSXRlbXMgKz0gKC0xICogdGhpcy5yZW1haW5pbmdJdGVtcykgKyB0aGlzLl9udW1TY3JvbGw7XG5cdFx0XHRcdHRoaXMuaXNSZW1haW5pbmdJdGVtc0FkZGVkID0gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHR0aGlzLmlzUmVtYWluaW5nSXRlbXNBZGRlZCA9IGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodG90YWxTaGlmdGVkSXRlbXMgIT09IHRoaXMudG90YWxTaGlmdGVkSXRlbXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zID0gdG90YWxTaGlmdGVkSXRlbXM7XG4gICAgICAgICAgICB9XG5cblx0XHRcdHRoaXMuX29sZE51bVNjcm9sbCA9IHRoaXMuX251bVNjcm9sbDtcblx0XHRcdHRoaXMucHJldlN0YXRlLm51bVNjcm9sbCA9IHRoaXMuX251bVNjcm9sbDtcblx0XHRcdHRoaXMucHJldlN0YXRlLm51bVZpc2libGUgPSB0aGlzLl9udW1WaXNpYmxlO1xuXHRcdFx0dGhpcy5wcmV2U3RhdGUudmFsdWUgPSBbLi4udGhpcy5fdmFsdWVdO1xuXG5cdFx0XHRpZiAodGhpcy50b3RhbERvdHMoKSA+IDAgICYmIHRoaXMuaXRlbXNDb250YWluZXIubmF0aXZlRWxlbWVudCkge1xuXHRcdFx0XHR0aGlzLml0ZW1zQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gdGhpcy5pc1ZlcnRpY2FsKCkgPyBgdHJhbnNsYXRlM2QoMCwgJHt0b3RhbFNoaWZ0ZWRJdGVtcyAqICgxMDAvIHRoaXMuX251bVZpc2libGUpfSUsIDApYCA6IGB0cmFuc2xhdGUzZCgke3RvdGFsU2hpZnRlZEl0ZW1zICogKDEwMC8gdGhpcy5fbnVtVmlzaWJsZSl9JSwgMCwgMClgO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLmlzQ3JlYXRlZCA9IHRydWU7XG5cblx0XHRcdGlmICh0aGlzLmF1dG9wbGF5SW50ZXJ2YWwgJiYgdGhpcy5pc0F1dG9wbGF5KCkpIHtcblx0XHRcdFx0dGhpcy5zdGFydEF1dG9wbGF5KCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGlzQ2lyY3VsYXIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBhZ2UgPT09IDApIHtcbiAgICAgICAgICAgICAgICB0b3RhbFNoaWZ0ZWRJdGVtcyA9IC0xICogdGhpcy5fbnVtVmlzaWJsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRvdGFsU2hpZnRlZEl0ZW1zID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdG90YWxTaGlmdGVkSXRlbXMgPSAtMSAqIHRoaXMudmFsdWUubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlbWFpbmluZ0l0ZW1zID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzUmVtYWluaW5nSXRlbXNBZGRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodG90YWxTaGlmdGVkSXRlbXMgIT09IHRoaXMudG90YWxTaGlmdGVkSXRlbXMpIHtcblx0XHRcdFx0dGhpcy50b3RhbFNoaWZ0ZWRJdGVtcyA9IHRvdGFsU2hpZnRlZEl0ZW1zO1xuICAgICAgICAgICAgfVxuXHRcdH1cblx0fVxuXG5cdGNyZWF0ZVN0eWxlKCkge1xuXHRcdFx0aWYgKCF0aGlzLmNhcm91c2VsU3R5bGUpIHtcblx0XHRcdFx0dGhpcy5jYXJvdXNlbFN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblx0XHRcdFx0dGhpcy5jYXJvdXNlbFN0eWxlLnR5cGUgPSAndGV4dC9jc3MnO1xuXHRcdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuY2Fyb3VzZWxTdHlsZSk7XG5cdFx0XHR9XG5cblx0XHRcdGxldCBpbm5lckhUTUwgPSBgXG4gICAgICAgICAgICAjJHt0aGlzLmlkfSAucC1jYXJvdXNlbC1pdGVtIHtcblx0XHRcdFx0ZmxleDogMSAwICR7ICgxMDAvIHRoaXMubnVtVmlzaWJsZSkgfSVcblx0XHRcdH1cbiAgICAgICAgYDtcblxuXHRcdFx0aWYgKHRoaXMucmVzcG9uc2l2ZU9wdGlvbnMpIHtcblx0XHRcdFx0dGhpcy5yZXNwb25zaXZlT3B0aW9ucy5zb3J0KChkYXRhMSwgZGF0YTIpID0+IHtcblx0XHRcdFx0XHRjb25zdCB2YWx1ZTEgPSBkYXRhMS5icmVha3BvaW50O1xuXHRcdFx0XHRcdGNvbnN0IHZhbHVlMiA9IGRhdGEyLmJyZWFrcG9pbnQ7XG5cdFx0XHRcdFx0bGV0IHJlc3VsdCA9IG51bGw7XG5cblx0XHRcdFx0XHRpZiAodmFsdWUxID09IG51bGwgJiYgdmFsdWUyICE9IG51bGwpXG5cdFx0XHRcdFx0XHRyZXN1bHQgPSAtMTtcblx0XHRcdFx0XHRlbHNlIGlmICh2YWx1ZTEgIT0gbnVsbCAmJiB2YWx1ZTIgPT0gbnVsbClcblx0XHRcdFx0XHRcdHJlc3VsdCA9IDE7XG5cdFx0XHRcdFx0ZWxzZSBpZiAodmFsdWUxID09IG51bGwgJiYgdmFsdWUyID09IG51bGwpXG5cdFx0XHRcdFx0XHRyZXN1bHQgPSAwO1xuXHRcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiB2YWx1ZTEgPT09ICdzdHJpbmcnICYmIHR5cGVvZiB2YWx1ZTIgPT09ICdzdHJpbmcnKVxuXHRcdFx0XHRcdFx0cmVzdWx0ID0gdmFsdWUxLmxvY2FsZUNvbXBhcmUodmFsdWUyLCB1bmRlZmluZWQsIHsgbnVtZXJpYzogdHJ1ZSB9KTtcblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRyZXN1bHQgPSAodmFsdWUxIDwgdmFsdWUyKSA/IC0xIDogKHZhbHVlMSA+IHZhbHVlMikgPyAxIDogMDtcblxuXHRcdFx0XHRcdHJldHVybiAtMSAqIHJlc3VsdDtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJlc3BvbnNpdmVPcHRpb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0bGV0IHJlcyA9IHRoaXMucmVzcG9uc2l2ZU9wdGlvbnNbaV07XG5cblx0XHRcdFx0XHRpbm5lckhUTUwgKz0gYFxuICAgICAgICAgICAgICAgICAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAke3Jlcy5icmVha3BvaW50fSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgIyR7dGhpcy5pZH0gLnAtY2Fyb3VzZWwtaXRlbSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleDogMSAwICR7ICgxMDAvIHJlcy5udW1WaXNpYmxlKSB9JVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYFxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuY2Fyb3VzZWxTdHlsZS5pbm5lckhUTUwgPSBpbm5lckhUTUw7XG5cdFx0fVxuXG5cdGNhbGN1bGF0ZVBvc2l0aW9uKCkge1xuXHRcdGlmICh0aGlzLnJlc3BvbnNpdmVPcHRpb25zKSB7XG5cdFx0XHRsZXQgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcblx0XHRcdGxldCBtYXRjaGVkUmVzcG9uc2l2ZURhdGEgPSB7XG5cdFx0XHRcdG51bVZpc2libGU6IHRoaXMuZGVmYXVsdE51bVZpc2libGUsXG5cdFx0XHRcdG51bVNjcm9sbDogdGhpcy5kZWZhdWx0TnVtU2Nyb2xsXG5cdFx0XHR9O1xuXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucmVzcG9uc2l2ZU9wdGlvbnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0bGV0IHJlcyA9IHRoaXMucmVzcG9uc2l2ZU9wdGlvbnNbaV07XG5cblx0XHRcdFx0aWYgKHBhcnNlSW50KHJlcy5icmVha3BvaW50LCAxMCkgPj0gd2luZG93V2lkdGgpIHtcblx0XHRcdFx0XHRtYXRjaGVkUmVzcG9uc2l2ZURhdGEgPSByZXM7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMuX251bVNjcm9sbCAhPT0gbWF0Y2hlZFJlc3BvbnNpdmVEYXRhLm51bVNjcm9sbCkge1xuXHRcdFx0XHRsZXQgcGFnZSA9IHRoaXMuX3BhZ2U7XG5cdFx0XHRcdHBhZ2UgPSBNYXRoLmZsb29yKChwYWdlICogdGhpcy5fbnVtU2Nyb2xsKSAvIG1hdGNoZWRSZXNwb25zaXZlRGF0YS5udW1TY3JvbGwpO1xuXG5cdFx0XHRcdGxldCB0b3RhbFNoaWZ0ZWRJdGVtcyA9IChtYXRjaGVkUmVzcG9uc2l2ZURhdGEubnVtU2Nyb2xsICogdGhpcy5wYWdlKSAqIC0xO1xuXG5cdFx0XHRcdGlmICh0aGlzLmlzQ2lyY3VsYXIoKSkge1xuXHRcdFx0XHRcdHRvdGFsU2hpZnRlZEl0ZW1zIC09IG1hdGNoZWRSZXNwb25zaXZlRGF0YS5udW1WaXNpYmxlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy50b3RhbFNoaWZ0ZWRJdGVtcyA9IHRvdGFsU2hpZnRlZEl0ZW1zO1xuXHRcdFx0XHR0aGlzLl9udW1TY3JvbGwgPSBtYXRjaGVkUmVzcG9uc2l2ZURhdGEubnVtU2Nyb2xsO1xuXG5cdFx0XHRcdHRoaXMuX3BhZ2UgPSBwYWdlO1xuXHRcdFx0XHR0aGlzLm9uUGFnZS5lbWl0KHtcblx0XHRcdFx0XHRwYWdlOiB0aGlzLnBhZ2Vcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0aGlzLl9udW1WaXNpYmxlICE9PSBtYXRjaGVkUmVzcG9uc2l2ZURhdGEubnVtVmlzaWJsZSkge1xuXHRcdFx0XHR0aGlzLl9udW1WaXNpYmxlID0gbWF0Y2hlZFJlc3BvbnNpdmVEYXRhLm51bVZpc2libGU7XG5cdFx0XHRcdHRoaXMuc2V0Q2xvbmVJdGVtcygpO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuXHRcdH1cblx0fVxuXG5cdHNldENsb25lSXRlbXMoKSB7XG5cdFx0dGhpcy5jbG9uZWRJdGVtc0ZvclN0YXJ0aW5nID0gW107XG5cdFx0dGhpcy5jbG9uZWRJdGVtc0ZvckZpbmlzaGluZyA9IFtdO1xuXHRcdGlmICh0aGlzLmlzQ2lyY3VsYXIoKSkge1xuXHRcdFx0dGhpcy5jbG9uZWRJdGVtc0ZvclN0YXJ0aW5nLnB1c2goLi4udGhpcy52YWx1ZS5zbGljZSgtMSAqIHRoaXMuX251bVZpc2libGUpKTtcblx0XHRcdHRoaXMuY2xvbmVkSXRlbXNGb3JGaW5pc2hpbmcucHVzaCguLi50aGlzLnZhbHVlLnNsaWNlKDAsIHRoaXMuX251bVZpc2libGUpKTtcblx0XHR9XG5cdH1cblxuXHRmaXJzdEluZGV4KCkge1xuXHRcdHJldHVybiB0aGlzLmlzQ2lyY3VsYXIoKSA/ICgtMSAqICh0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zICsgdGhpcy5udW1WaXNpYmxlKSkgOiAodGhpcy50b3RhbFNoaWZ0ZWRJdGVtcyAqIC0xKTtcblx0fVxuXG5cdGxhc3RJbmRleCgpIHtcblx0XHRyZXR1cm4gdGhpcy5maXJzdEluZGV4KCkgKyB0aGlzLm51bVZpc2libGUgLSAxO1xuXHR9XG5cblx0dG90YWxEb3RzKCkge1xuXHRcdHJldHVybiB0aGlzLnZhbHVlID8gTWF0aC5jZWlsKCh0aGlzLnZhbHVlLmxlbmd0aCAtIHRoaXMuX251bVZpc2libGUpIC8gdGhpcy5fbnVtU2Nyb2xsKSArIDEgOiAwO1xuXHR9XG5cblx0dG90YWxEb3RzQXJyYXkoKSB7XG5cdFx0Y29uc3QgdG90YWxEb3RzID0gdGhpcy50b3RhbERvdHMoKTtcblx0XHRyZXR1cm4gdG90YWxEb3RzIDw9IDAgPyBbXSA6IEFycmF5KHRvdGFsRG90cykuZmlsbCgwKTtcblx0fVxuXG5cdGlzVmVydGljYWwoKSB7XG5cdFx0cmV0dXJuIHRoaXMub3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCc7XG5cdH1cblxuXHRpc0NpcmN1bGFyKCkge1xuXHRcdHJldHVybiB0aGlzLmNpcmN1bGFyICYmIHRoaXMudmFsdWUgJiYgdGhpcy52YWx1ZS5sZW5ndGggPj0gdGhpcy5udW1WaXNpYmxlO1xuXHR9XG5cblx0aXNBdXRvcGxheSgpIHtcblx0XHRyZXR1cm4gdGhpcy5hdXRvcGxheUludGVydmFsICYmIHRoaXMuYWxsb3dBdXRvcGxheTtcblx0fVxuXG5cdGlzRm9yd2FyZE5hdkRpc2FibGVkKCkge1xuXHRcdHJldHVybiB0aGlzLmlzRW1wdHkoKSB8fCAodGhpcy5fcGFnZSA+PSAodGhpcy50b3RhbERvdHMoKSAtIDEpICYmICF0aGlzLmlzQ2lyY3VsYXIoKSk7XG5cdH1cblxuXHRpc0JhY2t3YXJkTmF2RGlzYWJsZWQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuaXNFbXB0eSgpIHx8ICh0aGlzLl9wYWdlIDw9IDAgICYmICF0aGlzLmlzQ2lyY3VsYXIoKSk7XG5cdH1cblxuXHRpc0VtcHR5KCkge1xuXHRcdHJldHVybiAhdGhpcy52YWx1ZSB8fCB0aGlzLnZhbHVlLmxlbmd0aCA9PT0gMDtcblx0fVxuXG5cdG5hdkZvcndhcmQoZSxpbmRleD8pIHtcblx0XHRpZiAodGhpcy5pc0NpcmN1bGFyKCkgfHwgdGhpcy5fcGFnZSA8ICh0aGlzLnRvdGFsRG90cygpIC0gMSkpIHtcblx0XHRcdHRoaXMuc3RlcCgtMSwgaW5kZXgpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmF1dG9wbGF5SW50ZXJ2YWwpIHtcblx0XHRcdHRoaXMuc3RvcEF1dG9wbGF5KCk7XG5cdFx0XHR0aGlzLmFsbG93QXV0b3BsYXkgPSBmYWxzZTtcblx0XHR9XG5cblx0XHRpZiAoZSAmJiBlLmNhbmNlbGFibGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR9XG5cdH1cblxuXHRuYXZCYWNrd2FyZChlLGluZGV4Pykge1xuXHRcdGlmICh0aGlzLmlzQ2lyY3VsYXIoKSB8fCB0aGlzLl9wYWdlICE9PSAwKSB7XG5cdFx0XHR0aGlzLnN0ZXAoMSwgaW5kZXgpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmF1dG9wbGF5SW50ZXJ2YWwpIHtcblx0XHRcdHRoaXMuc3RvcEF1dG9wbGF5KCk7XG5cdFx0XHR0aGlzLmFsbG93QXV0b3BsYXkgPSBmYWxzZTtcblx0XHR9XG5cblx0XHRpZiAoZSAmJiBlLmNhbmNlbGFibGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR9XG5cdH1cblxuXHRvbkRvdENsaWNrKGUsIGluZGV4KSB7XG5cdFx0bGV0IHBhZ2UgPSB0aGlzLl9wYWdlO1xuXG5cdFx0aWYgKHRoaXMuYXV0b3BsYXlJbnRlcnZhbCkge1xuXHRcdFx0dGhpcy5zdG9wQXV0b3BsYXkoKTtcblx0XHRcdHRoaXMuYWxsb3dBdXRvcGxheSA9IGZhbHNlO1xuXHRcdH1cblxuXHRcdGlmIChpbmRleCA+IHBhZ2UpIHtcblx0XHRcdHRoaXMubmF2Rm9yd2FyZChlLCBpbmRleCk7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKGluZGV4IDwgcGFnZSkge1xuXHRcdFx0dGhpcy5uYXZCYWNrd2FyZChlLCBpbmRleCk7XG5cdFx0fVxuXHR9XG5cblx0c3RlcChkaXIsIHBhZ2UpIHtcblx0XHRsZXQgdG90YWxTaGlmdGVkSXRlbXMgPSB0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zO1xuXHRcdGNvbnN0IGlzQ2lyY3VsYXIgPSB0aGlzLmlzQ2lyY3VsYXIoKTtcblxuXHRcdGlmIChwYWdlICE9IG51bGwpIHtcblx0XHRcdHRvdGFsU2hpZnRlZEl0ZW1zID0gKHRoaXMuX251bVNjcm9sbCAqIHBhZ2UpICogLTE7XG5cblx0XHRcdGlmIChpc0NpcmN1bGFyKSB7XG5cdFx0XHRcdHRvdGFsU2hpZnRlZEl0ZW1zIC09IHRoaXMuX251bVZpc2libGU7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuaXNSZW1haW5pbmdJdGVtc0FkZGVkID0gZmFsc2U7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dG90YWxTaGlmdGVkSXRlbXMgKz0gKHRoaXMuX251bVNjcm9sbCAqIGRpcik7XG5cdFx0XHRpZiAodGhpcy5pc1JlbWFpbmluZ0l0ZW1zQWRkZWQpIHtcblx0XHRcdFx0dG90YWxTaGlmdGVkSXRlbXMgKz0gdGhpcy5yZW1haW5pbmdJdGVtcyAtICh0aGlzLl9udW1TY3JvbGwgKiBkaXIpO1xuXHRcdFx0XHR0aGlzLmlzUmVtYWluaW5nSXRlbXNBZGRlZCA9IGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRsZXQgb3JpZ2luYWxTaGlmdGVkSXRlbXMgPSBpc0NpcmN1bGFyID8gKHRvdGFsU2hpZnRlZEl0ZW1zICsgdGhpcy5fbnVtVmlzaWJsZSkgOiB0b3RhbFNoaWZ0ZWRJdGVtcztcblx0XHRcdHBhZ2UgPSBNYXRoLmFicyhNYXRoLmZsb29yKChvcmlnaW5hbFNoaWZ0ZWRJdGVtcyAvIHRoaXMuX251bVNjcm9sbCkpKTtcblx0XHR9XG5cblx0XHRpZiAoaXNDaXJjdWxhciAmJiB0aGlzLnBhZ2UgPT09ICh0aGlzLnRvdGFsRG90cygpIC0gMSkgJiYgZGlyID09PSAtMSkge1xuXHRcdFx0dG90YWxTaGlmdGVkSXRlbXMgPSAtMSAqICh0aGlzLnZhbHVlLmxlbmd0aCArIHRoaXMuX251bVZpc2libGUpO1xuXHRcdFx0cGFnZSA9IDA7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKGlzQ2lyY3VsYXIgJiYgdGhpcy5wYWdlID09PSAwICYmIGRpciA9PT0gMSkge1xuXHRcdFx0dG90YWxTaGlmdGVkSXRlbXMgPSAwO1xuXHRcdFx0cGFnZSA9ICh0aGlzLnRvdGFsRG90cygpIC0gMSk7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKHBhZ2UgPT09ICh0aGlzLnRvdGFsRG90cygpIC0gMSkgJiYgdGhpcy5yZW1haW5pbmdJdGVtcyA+IDApIHtcblx0XHRcdHRvdGFsU2hpZnRlZEl0ZW1zICs9ICgodGhpcy5yZW1haW5pbmdJdGVtcyAqIC0xKSAtICh0aGlzLl9udW1TY3JvbGwgKiBkaXIpKTtcblx0XHRcdHRoaXMuaXNSZW1haW5pbmdJdGVtc0FkZGVkID0gdHJ1ZTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5pdGVtc0NvbnRhaW5lcikge1xuXHRcdFx0dGhpcy5pdGVtc0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IHRoaXMuaXNWZXJ0aWNhbCgpID8gYHRyYW5zbGF0ZTNkKDAsICR7dG90YWxTaGlmdGVkSXRlbXMgKiAoMTAwLyB0aGlzLl9udW1WaXNpYmxlKX0lLCAwKWAgOiBgdHJhbnNsYXRlM2QoJHt0b3RhbFNoaWZ0ZWRJdGVtcyAqICgxMDAvIHRoaXMuX251bVZpc2libGUpfSUsIDAsIDApYDtcblx0XHRcdHRoaXMuaXRlbXNDb250YWluZXIubmF0aXZlRWxlbWVudC5zdHlsZS50cmFuc2l0aW9uID0gJ3RyYW5zZm9ybSA1MDBtcyBlYXNlIDBzJztcblx0XHR9XG5cblx0XHR0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zID0gdG90YWxTaGlmdGVkSXRlbXM7XG5cdFx0dGhpcy5fcGFnZSA9IHBhZ2U7XG5cdFx0dGhpcy5vblBhZ2UuZW1pdCh7XG5cdFx0XHRwYWdlOiB0aGlzLnBhZ2Vcblx0XHR9KTtcblx0fVxuXG5cdHN0YXJ0QXV0b3BsYXkoKSB7XG5cdFx0dGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcblx0XHRcdGlmICh0aGlzLnRvdGFsRG90cygpID4gMCkge1xuXHRcdFx0XHRpZiAodGhpcy5wYWdlID09PSAodGhpcy50b3RhbERvdHMoKSAtIDEpKSB7XG5cdFx0XHRcdFx0dGhpcy5zdGVwKC0xLCAwKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHR0aGlzLnN0ZXAoLTEsIHRoaXMucGFnZSArIDEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblx0XHR0aGlzLmF1dG9wbGF5SW50ZXJ2YWwpO1xuXHR9XG5cblx0c3RvcEF1dG9wbGF5KCkge1xuXHRcdGlmICh0aGlzLmludGVydmFsKSB7XG5cdFx0XHRjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xuXHRcdH1cblx0fVxuXG5cdG9uVHJhbnNpdGlvbkVuZCgpIHtcblx0XHRpZiAodGhpcy5pdGVtc0NvbnRhaW5lcikge1xuXHRcdFx0dGhpcy5pdGVtc0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LnN0eWxlLnRyYW5zaXRpb24gPSAnJztcblxuXHRcdFx0aWYgKCh0aGlzLnBhZ2UgPT09IDAgfHwgdGhpcy5wYWdlID09PSAodGhpcy50b3RhbERvdHMoKSAtIDEpKSAmJiB0aGlzLmlzQ2lyY3VsYXIoKSkge1xuXHRcdFx0XHR0aGlzLml0ZW1zQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gdGhpcy5pc1ZlcnRpY2FsKCkgPyBgdHJhbnNsYXRlM2QoMCwgJHt0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zICogKDEwMC8gdGhpcy5fbnVtVmlzaWJsZSl9JSwgMClgIDogYHRyYW5zbGF0ZTNkKCR7dGhpcy50b3RhbFNoaWZ0ZWRJdGVtcyAqICgxMDAvIHRoaXMuX251bVZpc2libGUpfSUsIDAsIDApYDtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRvblRvdWNoU3RhcnQoZSkge1xuXHRcdGxldCB0b3VjaG9iaiA9IGUuY2hhbmdlZFRvdWNoZXNbMF07XG5cblx0XHR0aGlzLnN0YXJ0UG9zID0ge1xuXHRcdFx0eDogdG91Y2hvYmoucGFnZVgsXG5cdFx0XHR5OiB0b3VjaG9iai5wYWdlWVxuXHRcdH07XG5cdH1cblxuXHRvblRvdWNoTW92ZShlKSB7XG5cdFx0aWYgKGUuY2FuY2VsYWJsZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdH1cblx0fVxuXHRvblRvdWNoRW5kKGUpIHtcblx0XHRsZXQgdG91Y2hvYmogPSBlLmNoYW5nZWRUb3VjaGVzWzBdO1xuXG5cdFx0aWYgKHRoaXMuaXNWZXJ0aWNhbCgpKSB7XG5cdFx0XHR0aGlzLmNoYW5nZVBhZ2VPblRvdWNoKGUsICh0b3VjaG9iai5wYWdlWSAtIHRoaXMuc3RhcnRQb3MueSkpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHRoaXMuY2hhbmdlUGFnZU9uVG91Y2goZSwgKHRvdWNob2JqLnBhZ2VYIC0gdGhpcy5zdGFydFBvcy54KSk7XG5cdFx0fVxuXHR9XG5cblx0Y2hhbmdlUGFnZU9uVG91Y2goZSwgZGlmZikge1xuXHRcdGlmIChNYXRoLmFicyhkaWZmKSA+IHRoaXMuc3dpcGVUaHJlc2hvbGQpIHtcblx0XHRcdGlmIChkaWZmIDwgMCkge1xuXHRcdFx0XHR0aGlzLm5hdkZvcndhcmQoZSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0dGhpcy5uYXZCYWNrd2FyZChlKTtcblxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGJpbmREb2N1bWVudExpc3RlbmVycygpIHtcblx0XHRpZiAoIXRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lcikge1xuXHRcdFx0dGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyID0gKGUpID0+IHtcblx0XHRcdFx0dGhpcy5jYWxjdWxhdGVQb3NpdGlvbigpO1xuXHRcdFx0fTtcblxuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lcik7XG5cdFx0fVxuXHR9XG5cblx0dW5iaW5kRG9jdW1lbnRMaXN0ZW5lcnMoKSB7XG5cdFx0aWYgKHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lcikge1xuXHRcdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lcik7XG5cdFx0XHR0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIgPSBudWxsO1xuXHRcdH1cblx0fVxuXG5cdG5nT25EZXN0cm95KCkge1xuXHRcdGlmICh0aGlzLnJlc3BvbnNpdmVPcHRpb25zKSB7XG5cdFx0XHR0aGlzLnVuYmluZERvY3VtZW50TGlzdGVuZXJzKCk7XG5cdFx0fVxuXHRcdGlmICh0aGlzLmF1dG9wbGF5SW50ZXJ2YWwpIHtcblx0XHRcdHRoaXMuc3RvcEF1dG9wbGF5KCk7XG5cdFx0fVxuICAgIH1cblxufVxuXG5ATmdNb2R1bGUoe1xuXHRpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBTaGFyZWRNb2R1bGUsIFJpcHBsZU1vZHVsZV0sXG5cdGV4cG9ydHM6IFtDb21tb25Nb2R1bGUsIENhcm91c2VsLCBTaGFyZWRNb2R1bGVdLFxuXHRkZWNsYXJhdGlvbnM6IFtDYXJvdXNlbF1cbn0pXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWxNb2R1bGUgeyB9XG4iXX0=