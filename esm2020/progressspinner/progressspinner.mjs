import { NgModule, Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class ProgressSpinner {
    constructor() {
        this.strokeWidth = "2";
        this.fill = "none";
        this.animationDuration = "2s";
    }
}
ProgressSpinner.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: ProgressSpinner, deps: [], target: i0.ɵɵFactoryTarget.Component });
ProgressSpinner.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.6", type: ProgressSpinner, selector: "p-progressSpinner", inputs: { style: "style", styleClass: "styleClass", strokeWidth: "strokeWidth", fill: "fill", animationDuration: "animationDuration" }, host: { classAttribute: "p-element" }, ngImport: i0, template: `
        <div class="p-progress-spinner" [ngStyle]="style" [ngClass]="styleClass"  role="alert" aria-busy="true">
            <svg class="p-progress-spinner-svg" viewBox="25 25 50 50" [style.animation-duration]="animationDuration">
                <circle class="p-progress-spinner-circle" cx="50" cy="50" r="20" [attr.fill]="fill" [attr.stroke-width]="strokeWidth" stroke-miterlimit="10"/>
            </svg>
        </div>
    `, isInline: true, styles: [".p-progress-spinner{position:relative;margin:0 auto;width:100px;height:100px;display:inline-block}.p-progress-spinner:before{content:\"\";display:block;padding-top:100%}.p-progress-spinner-svg{animation:p-progress-spinner-rotate 2s linear infinite;height:100%;transform-origin:center center;width:100%;position:absolute;top:0;bottom:0;left:0;right:0;margin:auto}.p-progress-spinner-circle{stroke-dasharray:89,200;stroke-dashoffset:0;stroke:#d62d20;animation:p-progress-spinner-dash 1.5s ease-in-out infinite,p-progress-spinner-color 6s ease-in-out infinite;stroke-linecap:round}@keyframes p-progress-spinner-rotate{to{transform:rotate(360deg)}}@keyframes p-progress-spinner-dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:89,200;stroke-dashoffset:-35px}to{stroke-dasharray:89,200;stroke-dashoffset:-124px}}@keyframes p-progress-spinner-color{to,0%{stroke:#d62d20}40%{stroke:#0057e7}66%{stroke:#008744}80%,90%{stroke:#ffa700}}\n"], directives: [{ type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: ProgressSpinner, decorators: [{
            type: Component,
            args: [{ selector: 'p-progressSpinner', template: `
        <div class="p-progress-spinner" [ngStyle]="style" [ngClass]="styleClass"  role="alert" aria-busy="true">
            <svg class="p-progress-spinner-svg" viewBox="25 25 50 50" [style.animation-duration]="animationDuration">
                <circle class="p-progress-spinner-circle" cx="50" cy="50" r="20" [attr.fill]="fill" [attr.stroke-width]="strokeWidth" stroke-miterlimit="10"/>
            </svg>
        </div>
    `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        'class': 'p-element'
                    }, styles: [".p-progress-spinner{position:relative;margin:0 auto;width:100px;height:100px;display:inline-block}.p-progress-spinner:before{content:\"\";display:block;padding-top:100%}.p-progress-spinner-svg{animation:p-progress-spinner-rotate 2s linear infinite;height:100%;transform-origin:center center;width:100%;position:absolute;top:0;bottom:0;left:0;right:0;margin:auto}.p-progress-spinner-circle{stroke-dasharray:89,200;stroke-dashoffset:0;stroke:#d62d20;animation:p-progress-spinner-dash 1.5s ease-in-out infinite,p-progress-spinner-color 6s ease-in-out infinite;stroke-linecap:round}@keyframes p-progress-spinner-rotate{to{transform:rotate(360deg)}}@keyframes p-progress-spinner-dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:89,200;stroke-dashoffset:-35px}to{stroke-dasharray:89,200;stroke-dashoffset:-124px}}@keyframes p-progress-spinner-color{to,0%{stroke:#d62d20}40%{stroke:#0057e7}66%{stroke:#008744}80%,90%{stroke:#ffa700}}\n"] }]
        }], propDecorators: { style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], strokeWidth: [{
                type: Input
            }], fill: [{
                type: Input
            }], animationDuration: [{
                type: Input
            }] } });
export class ProgressSpinnerModule {
}
ProgressSpinnerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: ProgressSpinnerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ProgressSpinnerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: ProgressSpinnerModule, declarations: [ProgressSpinner], imports: [CommonModule], exports: [ProgressSpinner] });
ProgressSpinnerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: ProgressSpinnerModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: ProgressSpinnerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [ProgressSpinner],
                    declarations: [ProgressSpinner]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3NzcGlubmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL3Byb2dyZXNzc3Bpbm5lci9wcm9ncmVzc3NwaW5uZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLHVCQUF1QixFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2xHLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBa0I3QyxNQUFNLE9BQU8sZUFBZTtJQWhCNUI7UUFzQmEsZ0JBQVcsR0FBVyxHQUFHLENBQUM7UUFFMUIsU0FBSSxHQUFXLE1BQU0sQ0FBQztRQUV0QixzQkFBaUIsR0FBVyxJQUFJLENBQUM7S0FFN0M7OzRHQVpZLGVBQWU7Z0dBQWYsZUFBZSx3T0FkZDs7Ozs7O0tBTVQ7MkZBUVEsZUFBZTtrQkFoQjNCLFNBQVM7K0JBQ0ksbUJBQW1CLFlBQ25COzs7Ozs7S0FNVCxtQkFDZ0IsdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSSxRQUUvQjt3QkFDRixPQUFPLEVBQUUsV0FBVztxQkFDdkI7OEJBSVEsS0FBSztzQkFBYixLQUFLO2dCQUVHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBRUcsV0FBVztzQkFBbkIsS0FBSztnQkFFRyxJQUFJO3NCQUFaLEtBQUs7Z0JBRUcsaUJBQWlCO3NCQUF6QixLQUFLOztBQVNWLE1BQU0sT0FBTyxxQkFBcUI7O2tIQUFyQixxQkFBcUI7bUhBQXJCLHFCQUFxQixpQkFuQnJCLGVBQWUsYUFlZCxZQUFZLGFBZmIsZUFBZTttSEFtQmYscUJBQXFCLFlBSnJCLENBQUMsWUFBWSxDQUFDOzJGQUlkLHFCQUFxQjtrQkFMakMsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLE9BQU8sRUFBRSxDQUFDLGVBQWUsQ0FBQztvQkFDMUIsWUFBWSxFQUFFLENBQUMsZUFBZSxDQUFDO2lCQUNsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LElucHV0LENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXByb2dyZXNzU3Bpbm5lcicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInAtcHJvZ3Jlc3Mtc3Bpbm5lclwiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW25nQ2xhc3NdPVwic3R5bGVDbGFzc1wiICByb2xlPVwiYWxlcnRcIiBhcmlhLWJ1c3k9XCJ0cnVlXCI+XG4gICAgICAgICAgICA8c3ZnIGNsYXNzPVwicC1wcm9ncmVzcy1zcGlubmVyLXN2Z1wiIHZpZXdCb3g9XCIyNSAyNSA1MCA1MFwiIFtzdHlsZS5hbmltYXRpb24tZHVyYXRpb25dPVwiYW5pbWF0aW9uRHVyYXRpb25cIj5cbiAgICAgICAgICAgICAgICA8Y2lyY2xlIGNsYXNzPVwicC1wcm9ncmVzcy1zcGlubmVyLWNpcmNsZVwiIGN4PVwiNTBcIiBjeT1cIjUwXCIgcj1cIjIwXCIgW2F0dHIuZmlsbF09XCJmaWxsXCIgW2F0dHIuc3Ryb2tlLXdpZHRoXT1cInN0cm9rZVdpZHRoXCIgc3Ryb2tlLW1pdGVybGltaXQ9XCIxMFwiLz5cbiAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vcHJvZ3Jlc3NzcGlubmVyLmNzcyddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ2NsYXNzJzogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFByb2dyZXNzU3Bpbm5lciB7XG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgc3Ryb2tlV2lkdGg6IHN0cmluZyA9IFwiMlwiO1xuXG4gICAgQElucHV0KCkgZmlsbDogc3RyaW5nID0gXCJub25lXCI7XG5cbiAgICBASW5wdXQoKSBhbmltYXRpb25EdXJhdGlvbjogc3RyaW5nID0gXCIyc1wiO1xuXG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gICAgZXhwb3J0czogW1Byb2dyZXNzU3Bpbm5lcl0sXG4gICAgZGVjbGFyYXRpb25zOiBbUHJvZ3Jlc3NTcGlubmVyXVxufSlcbmV4cG9ydCBjbGFzcyBQcm9ncmVzc1NwaW5uZXJNb2R1bGUgeyB9XG4iXX0=