import { NgModule, Component, Input, ViewChild, ChangeDetectionStrategy, ViewEncapsulation, ContentChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { PrimeTemplate } from 'primeng/api';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class ScrollPanel {
    constructor(el, zone, cd) {
        this.el = el;
        this.zone = zone;
        this.cd = cd;
        this.timeoutFrame = (fn) => setTimeout(fn, 0);
    }
    ngAfterViewInit() {
        this.zone.runOutsideAngular(() => {
            this.moveBar();
            this.moveBar = this.moveBar.bind(this);
            this.onXBarMouseDown = this.onXBarMouseDown.bind(this);
            this.onYBarMouseDown = this.onYBarMouseDown.bind(this);
            this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this);
            this.onDocumentMouseUp = this.onDocumentMouseUp.bind(this);
            window.addEventListener('resize', this.moveBar);
            this.contentViewChild.nativeElement.addEventListener('scroll', this.moveBar);
            this.contentViewChild.nativeElement.addEventListener('mouseenter', this.moveBar);
            this.xBarViewChild.nativeElement.addEventListener('mousedown', this.onXBarMouseDown);
            this.yBarViewChild.nativeElement.addEventListener('mousedown', this.onYBarMouseDown);
            this.calculateContainerHeight();
            this.initialized = true;
        });
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                    break;
                default:
                    this.contentTemplate = item.template;
                    break;
            }
        });
    }
    calculateContainerHeight() {
        let container = this.containerViewChild.nativeElement;
        let content = this.contentViewChild.nativeElement;
        let xBar = this.xBarViewChild.nativeElement;
        let containerStyles = getComputedStyle(container), xBarStyles = getComputedStyle(xBar), pureContainerHeight = DomHandler.getHeight(container) - parseInt(xBarStyles['height'], 10);
        if (containerStyles['max-height'] != "none" && pureContainerHeight == 0) {
            if (content.offsetHeight + parseInt(xBarStyles['height'], 10) > parseInt(containerStyles['max-height'], 10)) {
                container.style.height = containerStyles['max-height'];
            }
            else {
                container.style.height = content.offsetHeight + parseFloat(containerStyles.paddingTop) + parseFloat(containerStyles.paddingBottom) + parseFloat(containerStyles.borderTopWidth) + parseFloat(containerStyles.borderBottomWidth) + "px";
            }
        }
    }
    moveBar() {
        let container = this.containerViewChild.nativeElement;
        let content = this.contentViewChild.nativeElement;
        /* horizontal scroll */
        let xBar = this.xBarViewChild.nativeElement;
        let totalWidth = content.scrollWidth;
        let ownWidth = content.clientWidth;
        let bottom = (container.clientHeight - xBar.clientHeight) * -1;
        this.scrollXRatio = ownWidth / totalWidth;
        /* vertical scroll */
        let yBar = this.yBarViewChild.nativeElement;
        let totalHeight = content.scrollHeight;
        let ownHeight = content.clientHeight;
        let right = (container.clientWidth - yBar.clientWidth) * -1;
        this.scrollYRatio = ownHeight / totalHeight;
        this.requestAnimationFrame(() => {
            if (this.scrollXRatio >= 1) {
                DomHandler.addClass(xBar, 'p-scrollpanel-hidden');
            }
            else {
                DomHandler.removeClass(xBar, 'p-scrollpanel-hidden');
                const xBarWidth = Math.max(this.scrollXRatio * 100, 10);
                const xBarLeft = content.scrollLeft * (100 - xBarWidth) / (totalWidth - ownWidth);
                xBar.style.cssText = 'width:' + xBarWidth + '%; left:' + xBarLeft + '%;bottom:' + bottom + 'px;';
            }
            if (this.scrollYRatio >= 1) {
                DomHandler.addClass(yBar, 'p-scrollpanel-hidden');
            }
            else {
                DomHandler.removeClass(yBar, 'p-scrollpanel-hidden');
                const yBarHeight = Math.max(this.scrollYRatio * 100, 10);
                const yBarTop = content.scrollTop * (100 - yBarHeight) / (totalHeight - ownHeight);
                yBar.style.cssText = 'height:' + yBarHeight + '%; top: calc(' + yBarTop + '% - ' + xBar.clientHeight + 'px);right:' + right + 'px;';
            }
        });
        this.cd.markForCheck();
    }
    onYBarMouseDown(e) {
        this.isYBarClicked = true;
        this.lastPageY = e.pageY;
        DomHandler.addClass(this.yBarViewChild.nativeElement, 'p-scrollpanel-grabbed');
        DomHandler.addClass(document.body, 'p-scrollpanel-grabbed');
        document.addEventListener('mousemove', this.onDocumentMouseMove);
        document.addEventListener('mouseup', this.onDocumentMouseUp);
        e.preventDefault();
    }
    onXBarMouseDown(e) {
        this.isXBarClicked = true;
        this.lastPageX = e.pageX;
        DomHandler.addClass(this.xBarViewChild.nativeElement, 'p-scrollpanel-grabbed');
        DomHandler.addClass(document.body, 'p-scrollpanel-grabbed');
        document.addEventListener('mousemove', this.onDocumentMouseMove);
        document.addEventListener('mouseup', this.onDocumentMouseUp);
        e.preventDefault();
    }
    onDocumentMouseMove(e) {
        if (this.isXBarClicked) {
            this.onMouseMoveForXBar(e);
        }
        else if (this.isYBarClicked) {
            this.onMouseMoveForYBar(e);
        }
        else {
            this.onMouseMoveForXBar(e);
            this.onMouseMoveForYBar(e);
        }
    }
    onMouseMoveForXBar(e) {
        let deltaX = e.pageX - this.lastPageX;
        this.lastPageX = e.pageX;
        this.requestAnimationFrame(() => {
            this.contentViewChild.nativeElement.scrollLeft += deltaX / this.scrollXRatio;
        });
    }
    onMouseMoveForYBar(e) {
        let deltaY = e.pageY - this.lastPageY;
        this.lastPageY = e.pageY;
        this.requestAnimationFrame(() => {
            this.contentViewChild.nativeElement.scrollTop += deltaY / this.scrollYRatio;
        });
    }
    scrollTop(scrollTop) {
        let scrollableHeight = this.contentViewChild.nativeElement.scrollHeight - this.contentViewChild.nativeElement.clientHeight;
        scrollTop = scrollTop > scrollableHeight ? scrollableHeight : scrollTop > 0 ? scrollTop : 0;
        this.contentViewChild.nativeElement.scrollTop = scrollTop;
    }
    onDocumentMouseUp(e) {
        DomHandler.removeClass(this.yBarViewChild.nativeElement, 'p-scrollpanel-grabbed');
        DomHandler.removeClass(this.xBarViewChild.nativeElement, 'p-scrollpanel-grabbed');
        DomHandler.removeClass(document.body, 'p-scrollpanel-grabbed');
        document.removeEventListener('mousemove', this.onDocumentMouseMove);
        document.removeEventListener('mouseup', this.onDocumentMouseUp);
        this.isXBarClicked = false;
        this.isYBarClicked = false;
    }
    requestAnimationFrame(f) {
        let frame = window.requestAnimationFrame || this.timeoutFrame;
        frame(f);
    }
    ngOnDestroy() {
        if (this.initialized) {
            window.removeEventListener('resize', this.moveBar);
            this.contentViewChild.nativeElement.removeEventListener('scroll', this.moveBar);
            this.contentViewChild.nativeElement.removeEventListener('mouseenter', this.moveBar);
            this.xBarViewChild.nativeElement.removeEventListener('mousedown', this.onXBarMouseDown);
            this.yBarViewChild.nativeElement.removeEventListener('mousedown', this.onYBarMouseDown);
        }
    }
    refresh() {
        this.moveBar();
    }
}
ScrollPanel.??fac = i0.????ngDeclareFactory({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: ScrollPanel, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }, { token: i0.ChangeDetectorRef }], target: i0.????FactoryTarget.Component });
ScrollPanel.??cmp = i0.????ngDeclareComponent({ minVersion: "12.0.0", version: "13.2.6", type: ScrollPanel, selector: "p-scrollPanel", inputs: { style: "style", styleClass: "styleClass" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "containerViewChild", first: true, predicate: ["container"], descendants: true }, { propertyName: "contentViewChild", first: true, predicate: ["content"], descendants: true }, { propertyName: "xBarViewChild", first: true, predicate: ["xBar"], descendants: true }, { propertyName: "yBarViewChild", first: true, predicate: ["yBar"], descendants: true }], ngImport: i0, template: `
        <div #container [ngClass]="'p-scrollpanel p-component'" [ngStyle]="style" [class]="styleClass">
            <div class="p-scrollpanel-wrapper">
                <div #content class="p-scrollpanel-content">
                    <ng-content></ng-content>
                    <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                </div>
            </div>
            <div #xBar class="p-scrollpanel-bar p-scrollpanel-bar-x"></div>
            <div #yBar class="p-scrollpanel-bar p-scrollpanel-bar-y"></div>
        </div>
    `, isInline: true, styles: [".p-scrollpanel-wrapper{overflow:hidden;width:100%;height:100%;position:relative;z-index:1;float:left}.p-scrollpanel-content{height:calc(100% + 18px);width:calc(100% + 18px);padding:0 18px 18px 0;position:relative;overflow:auto;box-sizing:border-box}.p-scrollpanel-bar{position:relative;background:#c1c1c1;border-radius:3px;z-index:2;cursor:pointer;opacity:0;transition:opacity .25s linear}.p-scrollpanel-bar-y{width:9px;top:0}.p-scrollpanel-bar-x{height:9px;bottom:0}.p-scrollpanel-hidden{visibility:hidden}.p-scrollpanel:hover .p-scrollpanel-bar,.p-scrollpanel:active .p-scrollpanel-bar{opacity:1}.p-scrollpanel-grabbed{-webkit-user-select:none;user-select:none}\n"], directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.????ngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: ScrollPanel, decorators: [{
            type: Component,
            args: [{ selector: 'p-scrollPanel', template: `
        <div #container [ngClass]="'p-scrollpanel p-component'" [ngStyle]="style" [class]="styleClass">
            <div class="p-scrollpanel-wrapper">
                <div #content class="p-scrollpanel-content">
                    <ng-content></ng-content>
                    <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                </div>
            </div>
            <div #xBar class="p-scrollpanel-bar p-scrollpanel-bar-x"></div>
            <div #yBar class="p-scrollpanel-bar p-scrollpanel-bar-y"></div>
        </div>
    `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        'class': 'p-element'
                    }, styles: [".p-scrollpanel-wrapper{overflow:hidden;width:100%;height:100%;position:relative;z-index:1;float:left}.p-scrollpanel-content{height:calc(100% + 18px);width:calc(100% + 18px);padding:0 18px 18px 0;position:relative;overflow:auto;box-sizing:border-box}.p-scrollpanel-bar{position:relative;background:#c1c1c1;border-radius:3px;z-index:2;cursor:pointer;opacity:0;transition:opacity .25s linear}.p-scrollpanel-bar-y{width:9px;top:0}.p-scrollpanel-bar-x{height:9px;bottom:0}.p-scrollpanel-hidden{visibility:hidden}.p-scrollpanel:hover .p-scrollpanel-bar,.p-scrollpanel:active .p-scrollpanel-bar{opacity:1}.p-scrollpanel-grabbed{-webkit-user-select:none;user-select:none}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], containerViewChild: [{
                type: ViewChild,
                args: ['container']
            }], contentViewChild: [{
                type: ViewChild,
                args: ['content']
            }], xBarViewChild: [{
                type: ViewChild,
                args: ['xBar']
            }], yBarViewChild: [{
                type: ViewChild,
                args: ['yBar']
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
export class ScrollPanelModule {
}
ScrollPanelModule.??fac = i0.????ngDeclareFactory({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: ScrollPanelModule, deps: [], target: i0.????FactoryTarget.NgModule });
ScrollPanelModule.??mod = i0.????ngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: ScrollPanelModule, declarations: [ScrollPanel], imports: [CommonModule], exports: [ScrollPanel] });
ScrollPanelModule.??inj = i0.????ngDeclareInjector({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: ScrollPanelModule, imports: [[CommonModule]] });
i0.????ngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: ScrollPanelModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [ScrollPanel],
                    declarations: [ScrollPanel]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xscGFuZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvc2Nyb2xscGFuZWwvc2Nyb2xscGFuZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFnRCxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQXVDLGVBQWUsRUFBMEIsTUFBTSxlQUFlLENBQUM7QUFDOU8sT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDekMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGFBQWEsQ0FBQzs7O0FBdUI1QyxNQUFNLE9BQU8sV0FBVztJQU1wQixZQUFtQixFQUFjLEVBQVMsSUFBWSxFQUFTLEVBQXFCO1FBQWpFLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVMsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFnQnBGLGlCQUFZLEdBQVEsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFoQnlDLENBQUM7SUE4QnhGLGVBQWU7UUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtZQUM3QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDZixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENB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QUUsQ0FBQyxXQUFXLENBQUM7b0JBQ3RCLFlBQVksRUFBRSxDQUFDLFdBQVcsQ0FBQztpQkFDOUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgQ29tcG9uZW50LCBJbnB1dCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBFbGVtZW50UmVmLCBOZ1pvbmUsIFZpZXdDaGlsZCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFZpZXdFbmNhcHN1bGF0aW9uLCBDaGFuZ2VEZXRlY3RvclJlZiwgQWZ0ZXJDb250ZW50SW5pdCwgQ29udGVudENoaWxkcmVuLCBRdWVyeUxpc3QsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRG9tSGFuZGxlciB9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7IFByaW1lVGVtcGxhdGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1zY3JvbGxQYW5lbCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiAjY29udGFpbmVyIFtuZ0NsYXNzXT1cIidwLXNjcm9sbHBhbmVsIHAtY29tcG9uZW50J1wiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXNjcm9sbHBhbmVsLXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2ICNjb250ZW50IGNsYXNzPVwicC1zY3JvbGxwYW5lbC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNvbnRlbnRUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2ICN4QmFyIGNsYXNzPVwicC1zY3JvbGxwYW5lbC1iYXIgcC1zY3JvbGxwYW5lbC1iYXIteFwiPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiAjeUJhciBjbGFzcz1cInAtc2Nyb2xscGFuZWwtYmFyIHAtc2Nyb2xscGFuZWwtYmFyLXlcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHN0eWxlVXJsczogWycuL3Njcm9sbHBhbmVsLmNzcyddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ2NsYXNzJzogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFNjcm9sbFBhbmVsIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyB6b25lOiBOZ1pvbmUsIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgICBAVmlld0NoaWxkKCdjb250YWluZXInKSBjb250YWluZXJWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG5cbiAgICBAVmlld0NoaWxkKCdjb250ZW50JykgY29udGVudFZpZXdDaGlsZDogRWxlbWVudFJlZjtcblxuICAgIEBWaWV3Q2hpbGQoJ3hCYXInKSB4QmFyVmlld0NoaWxkOiBFbGVtZW50UmVmO1xuXG4gICAgQFZpZXdDaGlsZCgneUJhcicpIHlCYXJWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKFByaW1lVGVtcGxhdGUpIHRlbXBsYXRlczogUXVlcnlMaXN0PGFueT47XG5cbiAgICBzY3JvbGxZUmF0aW86IG51bWJlcjtcblxuICAgIHNjcm9sbFhSYXRpbzogbnVtYmVyO1xuXG4gICAgdGltZW91dEZyYW1lOiBhbnkgPSAoZm4pID0+IHNldFRpbWVvdXQoZm4sIDApO1xuXG4gICAgaW5pdGlhbGl6ZWQ6IGJvb2xlYW47XG5cbiAgICBsYXN0UGFnZVk6IG51bWJlcjtcblxuICAgIGxhc3RQYWdlWDogbnVtYmVyO1xuXG4gICAgaXNYQmFyQ2xpY2tlZDogYm9vbGVhbjtcblxuICAgIGlzWUJhckNsaWNrZWQ6IGJvb2xlYW47XG5cbiAgICBjb250ZW50VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1vdmVCYXIoKTtcbiAgICAgICAgICAgIHRoaXMubW92ZUJhciA9IHRoaXMubW92ZUJhci5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5vblhCYXJNb3VzZURvd24gPSB0aGlzLm9uWEJhck1vdXNlRG93bi5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5vbllCYXJNb3VzZURvd24gPSB0aGlzLm9uWUJhck1vdXNlRG93bi5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5vbkRvY3VtZW50TW91c2VNb3ZlID0gdGhpcy5vbkRvY3VtZW50TW91c2VNb3ZlLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLm9uRG9jdW1lbnRNb3VzZVVwID0gdGhpcy5vbkRvY3VtZW50TW91c2VVcC5iaW5kKHRoaXMpO1xuXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5tb3ZlQmFyKTtcbiAgICAgICAgICAgIHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMubW92ZUJhcik7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgdGhpcy5tb3ZlQmFyKTtcbiAgICAgICAgICAgIHRoaXMueEJhclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMub25YQmFyTW91c2VEb3duKTtcbiAgICAgICAgICAgIHRoaXMueUJhclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMub25ZQmFyTW91c2VEb3duKTtcblxuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVDb250YWluZXJIZWlnaHQoKTtcblxuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoKGl0ZW0uZ2V0VHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnY29udGVudCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlQ29udGFpbmVySGVpZ2h0KCkge1xuICAgICAgICBsZXQgY29udGFpbmVyID0gdGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudDtcbiAgICAgICAgbGV0IGNvbnRlbnQgPSB0aGlzLmNvbnRlbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudDtcbiAgICAgICAgbGV0IHhCYXIgPSB0aGlzLnhCYXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudDtcblxuICAgICAgICBsZXQgY29udGFpbmVyU3R5bGVzID0gZ2V0Q29tcHV0ZWRTdHlsZShjb250YWluZXIpLFxuICAgICAgICB4QmFyU3R5bGVzID0gZ2V0Q29tcHV0ZWRTdHlsZSh4QmFyKSxcbiAgICAgICAgcHVyZUNvbnRhaW5lckhlaWdodCA9IERvbUhhbmRsZXIuZ2V0SGVpZ2h0KGNvbnRhaW5lcikgLSBwYXJzZUludCh4QmFyU3R5bGVzWydoZWlnaHQnXSwgMTApO1xuXG4gICAgICAgIGlmIChjb250YWluZXJTdHlsZXNbJ21heC1oZWlnaHQnXSAhPSBcIm5vbmVcIiAmJiBwdXJlQ29udGFpbmVySGVpZ2h0ID09IDApIHtcbiAgICAgICAgICAgIGlmIChjb250ZW50Lm9mZnNldEhlaWdodCArIHBhcnNlSW50KHhCYXJTdHlsZXNbJ2hlaWdodCddLCAxMCkgPiBwYXJzZUludChjb250YWluZXJTdHlsZXNbJ21heC1oZWlnaHQnXSwgMTApKSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnN0eWxlLmhlaWdodCA9IGNvbnRhaW5lclN0eWxlc1snbWF4LWhlaWdodCddO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnN0eWxlLmhlaWdodCA9IGNvbnRlbnQub2Zmc2V0SGVpZ2h0ICsgcGFyc2VGbG9hdChjb250YWluZXJTdHlsZXMucGFkZGluZ1RvcCkgKyBwYXJzZUZsb2F0KGNvbnRhaW5lclN0eWxlcy5wYWRkaW5nQm90dG9tKSArIHBhcnNlRmxvYXQoY29udGFpbmVyU3R5bGVzLmJvcmRlclRvcFdpZHRoKSArIHBhcnNlRmxvYXQoY29udGFpbmVyU3R5bGVzLmJvcmRlckJvdHRvbVdpZHRoKSArIFwicHhcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVCYXIoKSB7XG4gICAgICAgIGxldCBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50O1xuICAgICAgICBsZXQgY29udGVudCA9IHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50O1xuXG4gICAgICAgIC8qIGhvcml6b250YWwgc2Nyb2xsICovXG4gICAgICAgIGxldCB4QmFyID0gdGhpcy54QmFyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGxldCB0b3RhbFdpZHRoID0gY29udGVudC5zY3JvbGxXaWR0aDtcbiAgICAgICAgbGV0IG93bldpZHRoID0gY29udGVudC5jbGllbnRXaWR0aDtcbiAgICAgICAgbGV0IGJvdHRvbSA9IChjb250YWluZXIuY2xpZW50SGVpZ2h0IC0geEJhci5jbGllbnRIZWlnaHQpICogLTE7XG5cbiAgICAgICAgdGhpcy5zY3JvbGxYUmF0aW8gPSBvd25XaWR0aCAvIHRvdGFsV2lkdGg7XG5cbiAgICAgICAgLyogdmVydGljYWwgc2Nyb2xsICovXG4gICAgICAgIGxldCB5QmFyID0gdGhpcy55QmFyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGxldCB0b3RhbEhlaWdodCA9IGNvbnRlbnQuc2Nyb2xsSGVpZ2h0O1xuICAgICAgICBsZXQgb3duSGVpZ2h0ID0gY29udGVudC5jbGllbnRIZWlnaHQ7XG4gICAgICAgIGxldCByaWdodCA9IChjb250YWluZXIuY2xpZW50V2lkdGggLSB5QmFyLmNsaWVudFdpZHRoKSAqIC0xO1xuXG4gICAgICAgIHRoaXMuc2Nyb2xsWVJhdGlvID0gb3duSGVpZ2h0IC8gdG90YWxIZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2Nyb2xsWFJhdGlvID49IDEpIHtcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHhCYXIsICdwLXNjcm9sbHBhbmVsLWhpZGRlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh4QmFyLCAncC1zY3JvbGxwYW5lbC1oaWRkZW4nKTtcbiAgICAgICAgICAgICAgICBjb25zdCB4QmFyV2lkdGggPSBNYXRoLm1heCh0aGlzLnNjcm9sbFhSYXRpbyAqIDEwMCwgMTApO1xuICAgICAgICAgICAgICAgIGNvbnN0IHhCYXJMZWZ0ID0gY29udGVudC5zY3JvbGxMZWZ0ICogKDEwMCAtIHhCYXJXaWR0aCkgLyAodG90YWxXaWR0aCAtIG93bldpZHRoKTtcbiAgICAgICAgICAgICAgICB4QmFyLnN0eWxlLmNzc1RleHQgPSAnd2lkdGg6JyArIHhCYXJXaWR0aCArICclOyBsZWZ0OicgKyB4QmFyTGVmdCArICclO2JvdHRvbTonICsgYm90dG9tICsgJ3B4Oyc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNjcm9sbFlSYXRpbyA+PSAxKSB7XG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh5QmFyLCAncC1zY3JvbGxwYW5lbC1oaWRkZW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3MoeUJhciwgJ3Atc2Nyb2xscGFuZWwtaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgeUJhckhlaWdodCA9IE1hdGgubWF4KHRoaXMuc2Nyb2xsWVJhdGlvICogMTAwLCAxMCk7XG4gICAgICAgICAgICAgICAgY29uc3QgeUJhclRvcCA9IGNvbnRlbnQuc2Nyb2xsVG9wICogKDEwMCAtIHlCYXJIZWlnaHQpIC8gKHRvdGFsSGVpZ2h0IC0gb3duSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICB5QmFyLnN0eWxlLmNzc1RleHQgPSAnaGVpZ2h0OicgKyB5QmFySGVpZ2h0ICsgJyU7IHRvcDogY2FsYygnICsgeUJhclRvcCArICclIC0gJyArIHhCYXIuY2xpZW50SGVpZ2h0ICsgJ3B4KTtyaWdodDonICsgcmlnaHQgKyAncHg7JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgb25ZQmFyTW91c2VEb3duKGU6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgdGhpcy5pc1lCYXJDbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5sYXN0UGFnZVkgPSBlLnBhZ2VZO1xuICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHRoaXMueUJhclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAncC1zY3JvbGxwYW5lbC1ncmFiYmVkJyk7XG5cbiAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyhkb2N1bWVudC5ib2R5LCAncC1zY3JvbGxwYW5lbC1ncmFiYmVkJyk7XG5cbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5vbkRvY3VtZW50TW91c2VNb3ZlKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMub25Eb2N1bWVudE1vdXNlVXApO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25YQmFyTW91c2VEb3duKGU6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgdGhpcy5pc1hCYXJDbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5sYXN0UGFnZVggPSBlLnBhZ2VYO1xuICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHRoaXMueEJhclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAncC1zY3JvbGxwYW5lbC1ncmFiYmVkJyk7XG5cbiAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyhkb2N1bWVudC5ib2R5LCAncC1zY3JvbGxwYW5lbC1ncmFiYmVkJyk7XG5cbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5vbkRvY3VtZW50TW91c2VNb3ZlKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMub25Eb2N1bWVudE1vdXNlVXApO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25Eb2N1bWVudE1vdXNlTW92ZShlOiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmlzWEJhckNsaWNrZWQpIHtcbiAgICAgICAgICAgIHRoaXMub25Nb3VzZU1vdmVGb3JYQmFyKGUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuaXNZQmFyQ2xpY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5vbk1vdXNlTW92ZUZvcllCYXIoZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9uTW91c2VNb3ZlRm9yWEJhcihlKTtcbiAgICAgICAgICAgIHRoaXMub25Nb3VzZU1vdmVGb3JZQmFyKGUpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBvbk1vdXNlTW92ZUZvclhCYXIoZTogTW91c2VFdmVudCkge1xuICAgICAgICBsZXQgZGVsdGFYID0gZS5wYWdlWCAtIHRoaXMubGFzdFBhZ2VYO1xuICAgICAgICB0aGlzLmxhc3RQYWdlWCA9IGUucGFnZVg7XG5cbiAgICAgICAgdGhpcy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsTGVmdCArPSBkZWx0YVggLyB0aGlzLnNjcm9sbFhSYXRpbztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25Nb3VzZU1vdmVGb3JZQmFyKGU6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgbGV0IGRlbHRhWSA9IGUucGFnZVkgLSB0aGlzLmxhc3RQYWdlWTtcbiAgICAgICAgdGhpcy5sYXN0UGFnZVkgPSBlLnBhZ2VZO1xuXG4gICAgICAgIHRoaXMucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCArPSBkZWx0YVkgLyB0aGlzLnNjcm9sbFlSYXRpbztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2Nyb2xsVG9wKHNjcm9sbFRvcDogbnVtYmVyKSB7XG4gICAgICAgIGxldCBzY3JvbGxhYmxlSGVpZ2h0ID0gdGhpcy5jb250ZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsSGVpZ2h0IC0gdGhpcy5jb250ZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgICBzY3JvbGxUb3AgPSBzY3JvbGxUb3AgPiBzY3JvbGxhYmxlSGVpZ2h0ID8gc2Nyb2xsYWJsZUhlaWdodCA6IHNjcm9sbFRvcCA+IDAgPyBzY3JvbGxUb3AgOiAwO1xuICAgICAgICB0aGlzLmNvbnRlbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPSBzY3JvbGxUb3A7XG4gICAgfVxuXG4gICAgb25Eb2N1bWVudE1vdXNlVXAoZTogRXZlbnQpIHtcbiAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh0aGlzLnlCYXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgJ3Atc2Nyb2xscGFuZWwtZ3JhYmJlZCcpO1xuICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKHRoaXMueEJhclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAncC1zY3JvbGxwYW5lbC1ncmFiYmVkJyk7XG4gICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3MoZG9jdW1lbnQuYm9keSwgJ3Atc2Nyb2xscGFuZWwtZ3JhYmJlZCcpO1xuXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMub25Eb2N1bWVudE1vdXNlTW92ZSk7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm9uRG9jdW1lbnRNb3VzZVVwKTtcbiAgICAgICAgdGhpcy5pc1hCYXJDbGlja2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNZQmFyQ2xpY2tlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmOiBGdW5jdGlvbikge1xuICAgICAgICBsZXQgZnJhbWUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8wqB0aGlzLnRpbWVvdXRGcmFtZTtcbiAgICAgICAgZnJhbWUoZik7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLmluaXRpYWxpemVkKSB7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5tb3ZlQmFyKTtcbiAgICAgICAgICAgIHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMubW92ZUJhcik7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgdGhpcy5tb3ZlQmFyKTtcbiAgICAgICAgICAgIHRoaXMueEJhclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMub25YQmFyTW91c2VEb3duKTtcbiAgICAgICAgICAgIHRoaXMueUJhclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMub25ZQmFyTW91c2VEb3duKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlZnJlc2goKSB7XG4gICAgICAgIHRoaXMubW92ZUJhcigpO1xuICAgIH1cblxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtTY3JvbGxQYW5lbF0sXG4gICAgZGVjbGFyYXRpb25zOiBbU2Nyb2xsUGFuZWxdXG59KVxuZXhwb3J0IGNsYXNzIFNjcm9sbFBhbmVsTW9kdWxlIHsgfVxuIl19