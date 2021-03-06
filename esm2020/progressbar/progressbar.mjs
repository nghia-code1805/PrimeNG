import { NgModule, Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class ProgressBar {
    constructor() {
        this.showValue = true;
        this.unit = '%';
        this.mode = 'determinate';
    }
}
ProgressBar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: ProgressBar, deps: [], target: i0.ɵɵFactoryTarget.Component });
ProgressBar.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.6", type: ProgressBar, selector: "p-progressBar", inputs: { value: "value", showValue: "showValue", style: "style", styleClass: "styleClass", unit: "unit", mode: "mode" }, host: { classAttribute: "p-element" }, ngImport: i0, template: `
        <div [class]="styleClass" [ngStyle]="style" role="progressbar" aria-valuemin="0" [attr.aria-valuenow]="value" aria-valuemax="100"
            [ngClass]="{'p-progressbar p-component': true, 'p-progressbar-determinate': (mode === 'determinate'), 'p-progressbar-indeterminate': (mode === 'indeterminate')}">
            <div *ngIf="mode === 'determinate'" class="p-progressbar-value p-progressbar-value-animate" [style.width]="value + '%'" style="display:flex">
                <div *ngIf="showValue" class="p-progressbar-label" [style.display]="value != null && value !== 0 ? 'flex' : 'none'">{{value}}{{unit}}</div>
            </div>
            <div *ngIf="mode === 'indeterminate'" class="p-progressbar-indeterminate-container">
                <div class="p-progressbar-value p-progressbar-value-animate"></div>
            </div>
        </div>
    `, isInline: true, styles: [".p-progressbar{position:relative;overflow:hidden}.p-progressbar-determinate .p-progressbar-value{height:100%;width:0%;position:absolute;display:none;border:0 none;display:flex;align-items:center;justify-content:center;overflow:hidden}.p-progressbar-determinate .p-progressbar-label{display:inline-flex}.p-progressbar-determinate .p-progressbar-value-animate{transition:width 1s ease-in-out}.p-progressbar-indeterminate .p-progressbar-value:before{content:\"\";position:absolute;background-color:inherit;top:0;left:0;bottom:0;will-change:left,right;animation:p-progressbar-indeterminate-anim 2.1s cubic-bezier(.65,.815,.735,.395) infinite}.p-progressbar-indeterminate .p-progressbar-value:after{content:\"\";position:absolute;background-color:inherit;top:0;left:0;bottom:0;will-change:left,right;animation:p-progressbar-indeterminate-anim-short 2.1s cubic-bezier(.165,.84,.44,1) infinite;animation-delay:1.15s}@keyframes p-progressbar-indeterminate-anim{0%{left:-35%;right:100%}60%{left:100%;right:-90%}to{left:100%;right:-90%}}@keyframes p-progressbar-indeterminate-anim-short{0%{left:-200%;right:100%}60%{left:107%;right:-8%}to{left:107%;right:-8%}}\n"], directives: [{ type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: ProgressBar, decorators: [{
            type: Component,
            args: [{ selector: 'p-progressBar', template: `
        <div [class]="styleClass" [ngStyle]="style" role="progressbar" aria-valuemin="0" [attr.aria-valuenow]="value" aria-valuemax="100"
            [ngClass]="{'p-progressbar p-component': true, 'p-progressbar-determinate': (mode === 'determinate'), 'p-progressbar-indeterminate': (mode === 'indeterminate')}">
            <div *ngIf="mode === 'determinate'" class="p-progressbar-value p-progressbar-value-animate" [style.width]="value + '%'" style="display:flex">
                <div *ngIf="showValue" class="p-progressbar-label" [style.display]="value != null && value !== 0 ? 'flex' : 'none'">{{value}}{{unit}}</div>
            </div>
            <div *ngIf="mode === 'indeterminate'" class="p-progressbar-indeterminate-container">
                <div class="p-progressbar-value p-progressbar-value-animate"></div>
            </div>
        </div>
    `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        'class': 'p-element'
                    }, styles: [".p-progressbar{position:relative;overflow:hidden}.p-progressbar-determinate .p-progressbar-value{height:100%;width:0%;position:absolute;display:none;border:0 none;display:flex;align-items:center;justify-content:center;overflow:hidden}.p-progressbar-determinate .p-progressbar-label{display:inline-flex}.p-progressbar-determinate .p-progressbar-value-animate{transition:width 1s ease-in-out}.p-progressbar-indeterminate .p-progressbar-value:before{content:\"\";position:absolute;background-color:inherit;top:0;left:0;bottom:0;will-change:left,right;animation:p-progressbar-indeterminate-anim 2.1s cubic-bezier(.65,.815,.735,.395) infinite}.p-progressbar-indeterminate .p-progressbar-value:after{content:\"\";position:absolute;background-color:inherit;top:0;left:0;bottom:0;will-change:left,right;animation:p-progressbar-indeterminate-anim-short 2.1s cubic-bezier(.165,.84,.44,1) infinite;animation-delay:1.15s}@keyframes p-progressbar-indeterminate-anim{0%{left:-35%;right:100%}60%{left:100%;right:-90%}to{left:100%;right:-90%}}@keyframes p-progressbar-indeterminate-anim-short{0%{left:-200%;right:100%}60%{left:107%;right:-8%}to{left:107%;right:-8%}}\n"] }]
        }], propDecorators: { value: [{
                type: Input
            }], showValue: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], unit: [{
                type: Input
            }], mode: [{
                type: Input
            }] } });
export class ProgressBarModule {
}
ProgressBarModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: ProgressBarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ProgressBarModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: ProgressBarModule, declarations: [ProgressBar], imports: [CommonModule], exports: [ProgressBar] });
ProgressBarModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: ProgressBarModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: ProgressBarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [ProgressBar],
                    declarations: [ProgressBar]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3NiYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvcHJvZ3Jlc3NiYXIvcHJvZ3Jlc3NiYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLHVCQUF1QixFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2xHLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBc0I3QyxNQUFNLE9BQU8sV0FBVztJQXBCeEI7UUF3QmEsY0FBUyxHQUFZLElBQUksQ0FBQztRQU0xQixTQUFJLEdBQVcsR0FBRyxDQUFDO1FBRW5CLFNBQUksR0FBVyxhQUFhLENBQUM7S0FFekM7O3dHQWRZLFdBQVc7NEZBQVgsV0FBVyxzTkFsQlY7Ozs7Ozs7Ozs7S0FVVDsyRkFRUSxXQUFXO2tCQXBCdkIsU0FBUzsrQkFDSSxlQUFlLFlBQ2Y7Ozs7Ozs7Ozs7S0FVVCxtQkFDZ0IsdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSSxRQUUvQjt3QkFDRixPQUFPLEVBQUUsV0FBVztxQkFDdkI7OEJBSVEsS0FBSztzQkFBYixLQUFLO2dCQUVHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBRUcsS0FBSztzQkFBYixLQUFLO2dCQUVHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBRUcsSUFBSTtzQkFBWixLQUFLO2dCQUVHLElBQUk7c0JBQVosS0FBSzs7QUFTVixNQUFNLE9BQU8saUJBQWlCOzs4R0FBakIsaUJBQWlCOytHQUFqQixpQkFBaUIsaUJBckJqQixXQUFXLGFBaUJWLFlBQVksYUFqQmIsV0FBVzsrR0FxQlgsaUJBQWlCLFlBSmpCLENBQUMsWUFBWSxDQUFDOzJGQUlkLGlCQUFpQjtrQkFMN0IsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLE9BQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQztvQkFDdEIsWUFBWSxFQUFFLENBQUMsV0FBVyxDQUFDO2lCQUM5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LElucHV0LENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXByb2dyZXNzQmFyJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IFtjbGFzc109XCJzdHlsZUNsYXNzXCIgW25nU3R5bGVdPVwic3R5bGVcIiByb2xlPVwicHJvZ3Jlc3NiYXJcIiBhcmlhLXZhbHVlbWluPVwiMFwiIFthdHRyLmFyaWEtdmFsdWVub3ddPVwidmFsdWVcIiBhcmlhLXZhbHVlbWF4PVwiMTAwXCJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsncC1wcm9ncmVzc2JhciBwLWNvbXBvbmVudCc6IHRydWUsICdwLXByb2dyZXNzYmFyLWRldGVybWluYXRlJzogKG1vZGUgPT09ICdkZXRlcm1pbmF0ZScpLCAncC1wcm9ncmVzc2Jhci1pbmRldGVybWluYXRlJzogKG1vZGUgPT09ICdpbmRldGVybWluYXRlJyl9XCI+XG4gICAgICAgICAgICA8ZGl2ICpuZ0lmPVwibW9kZSA9PT0gJ2RldGVybWluYXRlJ1wiIGNsYXNzPVwicC1wcm9ncmVzc2Jhci12YWx1ZSBwLXByb2dyZXNzYmFyLXZhbHVlLWFuaW1hdGVcIiBbc3R5bGUud2lkdGhdPVwidmFsdWUgKyAnJSdcIiBzdHlsZT1cImRpc3BsYXk6ZmxleFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJzaG93VmFsdWVcIiBjbGFzcz1cInAtcHJvZ3Jlc3NiYXItbGFiZWxcIiBbc3R5bGUuZGlzcGxheV09XCJ2YWx1ZSAhPSBudWxsICYmIHZhbHVlICE9PSAwID8gJ2ZsZXgnIDogJ25vbmUnXCI+e3t2YWx1ZX19e3t1bml0fX08L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cIm1vZGUgPT09ICdpbmRldGVybWluYXRlJ1wiIGNsYXNzPVwicC1wcm9ncmVzc2Jhci1pbmRldGVybWluYXRlLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXByb2dyZXNzYmFyLXZhbHVlIHAtcHJvZ3Jlc3NiYXItdmFsdWUtYW5pbWF0ZVwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBzdHlsZVVybHM6IFsnLi9wcm9ncmVzc2Jhci5jc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgICdjbGFzcyc6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBQcm9ncmVzc0JhciB7XG5cbiAgICBASW5wdXQoKSB2YWx1ZTogYW55O1xuXG4gICAgQElucHV0KCkgc2hvd1ZhbHVlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSB1bml0OiBzdHJpbmcgPSAnJSc7XG5cbiAgICBASW5wdXQoKSBtb2RlOiBzdHJpbmcgPSAnZGV0ZXJtaW5hdGUnO1xuXG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gICAgZXhwb3J0czogW1Byb2dyZXNzQmFyXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtQcm9ncmVzc0Jhcl1cbn0pXG5leHBvcnQgY2xhc3MgUHJvZ3Jlc3NCYXJNb2R1bGUgeyB9XG4iXX0=