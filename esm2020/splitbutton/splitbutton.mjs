import { NgModule, Component, Input, Output, EventEmitter, ViewChild, ChangeDetectionStrategy, ViewEncapsulation, ContentChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeTemplate } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TieredMenuModule } from 'primeng/tieredmenu';
import * as i0 from "@angular/core";
import * as i1 from "primeng/tieredmenu";
import * as i2 from "@angular/common";
import * as i3 from "primeng/button";
export class SplitButton {
    constructor() {
        this.iconPos = 'left';
        this.onClick = new EventEmitter();
        this.onDropdownClick = new EventEmitter();
        this.showTransitionOptions = '.12s cubic-bezier(0, 0, 0.2, 1)';
        this.hideTransitionOptions = '.1s linear';
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
    onDefaultButtonClick(event) {
        this.onClick.emit(event);
    }
    onDropdownButtonClick(event) {
        this.onDropdownClick.emit(event);
        this.menu.toggle({ currentTarget: this.containerViewChild.nativeElement, relativeAlign: this.appendTo == null });
    }
}
SplitButton.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: SplitButton, deps: [], target: i0.ɵɵFactoryTarget.Component });
SplitButton.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.6", type: SplitButton, selector: "p-splitButton", inputs: { model: "model", icon: "icon", iconPos: "iconPos", label: "label", style: "style", styleClass: "styleClass", menuStyle: "menuStyle", menuStyleClass: "menuStyleClass", disabled: "disabled", tabindex: "tabindex", appendTo: "appendTo", dir: "dir", expandAriaLabel: "expandAriaLabel", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions" }, outputs: { onClick: "onClick", onDropdownClick: "onDropdownClick" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "containerViewChild", first: true, predicate: ["container"], descendants: true }, { propertyName: "buttonViewChild", first: true, predicate: ["defaultbtn"], descendants: true }, { propertyName: "menu", first: true, predicate: ["menu"], descendants: true }], ngImport: i0, template: `
        <div #container [ngClass]="'p-splitbutton p-component'" [ngStyle]="style" [class]="styleClass">
            <ng-container *ngIf="contentTemplate; else defaultButton">
                <button class="p-splitbutton-defaultbutton" type="button" pButton [icon]="icon" [iconPos]="iconPos" (click)="onDefaultButtonClick($event)" [disabled]="disabled" [attr.tabindex]="tabindex">
                    <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                </button>
            </ng-container>
            <ng-template #defaultButton>
                <button #defaultbtn class="p-splitbutton-defaultbutton" type="button" pButton [icon]="icon" [iconPos]="iconPos" [label]="label" (click)="onDefaultButtonClick($event)" [disabled]="disabled" [attr.tabindex]="tabindex"></button>
            </ng-template>
            <button type="button" pButton class="p-splitbutton-menubutton" icon="pi pi-chevron-down" (click)="onDropdownButtonClick($event)" [disabled]="disabled" [attr.aria-label]="expandAriaLabel"></button>
            <p-tieredMenu #menu [popup]="true" [model]="model" [style]="menuStyle" [styleClass]="menuStyleClass" [appendTo]="appendTo"
                    [showTransitionOptions]="showTransitionOptions" [hideTransitionOptions]="hideTransitionOptions"></p-tieredMenu>
        </div>
    `, isInline: true, styles: [".p-splitbutton{display:inline-flex;position:relative}.p-splitbutton .p-splitbutton-defaultbutton,.p-splitbutton.p-button-rounded>.p-splitbutton-defaultbutton.p-button,.p-splitbutton.p-button-outlined>.p-splitbutton-defaultbutton.p-button{flex:1 1 auto;border-top-right-radius:0;border-bottom-right-radius:0;border-right:0 none}.p-splitbutton-menubutton,.p-splitbutton.p-button-rounded>.p-splitbutton-menubutton.p-button,.p-splitbutton.p-button-outlined>.p-splitbutton-menubutton.p-button{display:flex;align-items:center;justify-content:center;border-top-left-radius:0;border-bottom-left-radius:0}.p-splitbutton .p-menu{min-width:100%}.p-fluid .p-splitbutton{display:flex}\n"], components: [{ type: i1.TieredMenu, selector: "p-tieredMenu", inputs: ["model", "popup", "style", "styleClass", "appendTo", "autoZIndex", "baseZIndex", "autoDisplay", "showTransitionOptions", "hideTransitionOptions"] }], directives: [{ type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.ButtonDirective, selector: "[pButton]", inputs: ["iconPos", "loadingIcon", "label", "icon", "loading"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: SplitButton, decorators: [{
            type: Component,
            args: [{ selector: 'p-splitButton', template: `
        <div #container [ngClass]="'p-splitbutton p-component'" [ngStyle]="style" [class]="styleClass">
            <ng-container *ngIf="contentTemplate; else defaultButton">
                <button class="p-splitbutton-defaultbutton" type="button" pButton [icon]="icon" [iconPos]="iconPos" (click)="onDefaultButtonClick($event)" [disabled]="disabled" [attr.tabindex]="tabindex">
                    <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                </button>
            </ng-container>
            <ng-template #defaultButton>
                <button #defaultbtn class="p-splitbutton-defaultbutton" type="button" pButton [icon]="icon" [iconPos]="iconPos" [label]="label" (click)="onDefaultButtonClick($event)" [disabled]="disabled" [attr.tabindex]="tabindex"></button>
            </ng-template>
            <button type="button" pButton class="p-splitbutton-menubutton" icon="pi pi-chevron-down" (click)="onDropdownButtonClick($event)" [disabled]="disabled" [attr.aria-label]="expandAriaLabel"></button>
            <p-tieredMenu #menu [popup]="true" [model]="model" [style]="menuStyle" [styleClass]="menuStyleClass" [appendTo]="appendTo"
                    [showTransitionOptions]="showTransitionOptions" [hideTransitionOptions]="hideTransitionOptions"></p-tieredMenu>
        </div>
    `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        'class': 'p-element'
                    }, styles: [".p-splitbutton{display:inline-flex;position:relative}.p-splitbutton .p-splitbutton-defaultbutton,.p-splitbutton.p-button-rounded>.p-splitbutton-defaultbutton.p-button,.p-splitbutton.p-button-outlined>.p-splitbutton-defaultbutton.p-button{flex:1 1 auto;border-top-right-radius:0;border-bottom-right-radius:0;border-right:0 none}.p-splitbutton-menubutton,.p-splitbutton.p-button-rounded>.p-splitbutton-menubutton.p-button,.p-splitbutton.p-button-outlined>.p-splitbutton-menubutton.p-button{display:flex;align-items:center;justify-content:center;border-top-left-radius:0;border-bottom-left-radius:0}.p-splitbutton .p-menu{min-width:100%}.p-fluid .p-splitbutton{display:flex}\n"] }]
        }], propDecorators: { model: [{
                type: Input
            }], icon: [{
                type: Input
            }], iconPos: [{
                type: Input
            }], label: [{
                type: Input
            }], onClick: [{
                type: Output
            }], onDropdownClick: [{
                type: Output
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], menuStyle: [{
                type: Input
            }], menuStyleClass: [{
                type: Input
            }], disabled: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], appendTo: [{
                type: Input
            }], dir: [{
                type: Input
            }], expandAriaLabel: [{
                type: Input
            }], showTransitionOptions: [{
                type: Input
            }], hideTransitionOptions: [{
                type: Input
            }], containerViewChild: [{
                type: ViewChild,
                args: ['container']
            }], buttonViewChild: [{
                type: ViewChild,
                args: ['defaultbtn']
            }], menu: [{
                type: ViewChild,
                args: ['menu']
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
export class SplitButtonModule {
}
SplitButtonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: SplitButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SplitButtonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: SplitButtonModule, declarations: [SplitButton], imports: [CommonModule, ButtonModule, TieredMenuModule], exports: [SplitButton, ButtonModule, TieredMenuModule] });
SplitButtonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: SplitButtonModule, imports: [[CommonModule, ButtonModule, TieredMenuModule], ButtonModule, TieredMenuModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.6", ngImport: i0, type: SplitButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, ButtonModule, TieredMenuModule],
                    exports: [SplitButton, ButtonModule, TieredMenuModule],
                    declarations: [SplitButton]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXRidXR0b24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvc3BsaXRidXR0b24vc3BsaXRidXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQVksS0FBSyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsU0FBUyxFQUFDLHVCQUF1QixFQUFDLGlCQUFpQixFQUFlLGVBQWUsRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUNuTCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFXLGFBQWEsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUNwRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxFQUFFLGdCQUFnQixFQUFjLE1BQU0sb0JBQW9CLENBQUM7Ozs7O0FBMEJsRSxNQUFNLE9BQU8sV0FBVztJQXhCeEI7UUE4QmEsWUFBTyxHQUFXLE1BQU0sQ0FBQztRQUl4QixZQUFPLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFaEQsb0JBQWUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQW9CekQsMEJBQXFCLEdBQVcsaUNBQWlDLENBQUM7UUFFbEUsMEJBQXFCLEdBQVcsWUFBWSxDQUFDO0tBbUN6RDtJQXZCRyxrQkFBa0I7UUFDZCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzVCLFFBQU8sSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUNuQixLQUFLLFNBQVM7b0JBQ1YsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO29CQUN6QyxNQUFNO2dCQUVOO29CQUNJLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFDekMsTUFBTTthQUNUO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsb0JBQW9CLENBQUMsS0FBWTtRQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQscUJBQXFCLENBQUMsS0FBWTtRQUM5QixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsYUFBYSxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksRUFBQyxDQUFDLENBQUM7SUFDbkgsQ0FBQzs7d0dBbkVRLFdBQVc7NEZBQVgsV0FBVywrakJBMENILGFBQWEsNlRBaEVwQjs7Ozs7Ozs7Ozs7Ozs7S0FjVDsyRkFRUSxXQUFXO2tCQXhCdkIsU0FBUzsrQkFDSSxlQUFlLFlBQ2Y7Ozs7Ozs7Ozs7Ozs7O0tBY1QsbUJBQ2dCLHVCQUF1QixDQUFDLE1BQU0saUJBQ2hDLGlCQUFpQixDQUFDLElBQUksUUFFL0I7d0JBQ0YsT0FBTyxFQUFFLFdBQVc7cUJBQ3ZCOzhCQUlRLEtBQUs7c0JBQWIsS0FBSztnQkFFRyxJQUFJO3NCQUFaLEtBQUs7Z0JBRUcsT0FBTztzQkFBZixLQUFLO2dCQUVHLEtBQUs7c0JBQWIsS0FBSztnQkFFSSxPQUFPO3NCQUFoQixNQUFNO2dCQUVHLGVBQWU7c0JBQXhCLE1BQU07Z0JBRUUsS0FBSztzQkFBYixLQUFLO2dCQUVHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBRUcsU0FBUztzQkFBakIsS0FBSztnQkFFRyxjQUFjO3NCQUF0QixLQUFLO2dCQUVHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBRUcsUUFBUTtzQkFBaEIsS0FBSztnQkFFRyxRQUFRO3NCQUFoQixLQUFLO2dCQUVHLEdBQUc7c0JBQVgsS0FBSztnQkFFRyxlQUFlO3NCQUF2QixLQUFLO2dCQUVHLHFCQUFxQjtzQkFBN0IsS0FBSztnQkFFRyxxQkFBcUI7c0JBQTdCLEtBQUs7Z0JBRWtCLGtCQUFrQjtzQkFBekMsU0FBUzt1QkFBQyxXQUFXO2dCQUVHLGVBQWU7c0JBQXZDLFNBQVM7dUJBQUMsWUFBWTtnQkFFSixJQUFJO3NCQUF0QixTQUFTO3VCQUFDLE1BQU07Z0JBRWUsU0FBUztzQkFBeEMsZUFBZTt1QkFBQyxhQUFhOztBQWtDbEMsTUFBTSxPQUFPLGlCQUFpQjs7OEdBQWpCLGlCQUFpQjsrR0FBakIsaUJBQWlCLGlCQTVFakIsV0FBVyxhQXdFVixZQUFZLEVBQUMsWUFBWSxFQUFFLGdCQUFnQixhQXhFNUMsV0FBVyxFQXlFRSxZQUFZLEVBQUUsZ0JBQWdCOytHQUczQyxpQkFBaUIsWUFKakIsQ0FBQyxZQUFZLEVBQUMsWUFBWSxFQUFFLGdCQUFnQixDQUFDLEVBQ2hDLFlBQVksRUFBRSxnQkFBZ0I7MkZBRzNDLGlCQUFpQjtrQkFMN0IsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUMsWUFBWSxFQUFFLGdCQUFnQixDQUFDO29CQUN0RCxPQUFPLEVBQUUsQ0FBQyxXQUFXLEVBQUMsWUFBWSxFQUFFLGdCQUFnQixDQUFDO29CQUNyRCxZQUFZLEVBQUUsQ0FBQyxXQUFXLENBQUM7aUJBQzlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsRWxlbWVudFJlZixJbnB1dCxPdXRwdXQsRXZlbnRFbWl0dGVyLFZpZXdDaGlsZCxDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxWaWV3RW5jYXBzdWxhdGlvbiwgVGVtcGxhdGVSZWYsIENvbnRlbnRDaGlsZHJlbiwgUXVlcnlMaXN0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtNZW51SXRlbSwgUHJpbWVUZW1wbGF0ZX0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHtCdXR0b25Nb2R1bGV9IGZyb20gJ3ByaW1lbmcvYnV0dG9uJztcbmltcG9ydCB7IFRpZXJlZE1lbnVNb2R1bGUsIFRpZXJlZE1lbnUgfSBmcm9tICdwcmltZW5nL3RpZXJlZG1lbnUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Atc3BsaXRCdXR0b24nLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgI2NvbnRhaW5lciBbbmdDbGFzc109XCIncC1zcGxpdGJ1dHRvbiBwLWNvbXBvbmVudCdcIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY29udGVudFRlbXBsYXRlOyBlbHNlIGRlZmF1bHRCdXR0b25cIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicC1zcGxpdGJ1dHRvbi1kZWZhdWx0YnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiIHBCdXR0b24gW2ljb25dPVwiaWNvblwiIFtpY29uUG9zXT1cImljb25Qb3NcIiAoY2xpY2spPVwib25EZWZhdWx0QnV0dG9uQ2xpY2soJGV2ZW50KVwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIFthdHRyLnRhYmluZGV4XT1cInRhYmluZGV4XCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjb250ZW50VGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNkZWZhdWx0QnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gI2RlZmF1bHRidG4gY2xhc3M9XCJwLXNwbGl0YnV0dG9uLWRlZmF1bHRidXR0b25cIiB0eXBlPVwiYnV0dG9uXCIgcEJ1dHRvbiBbaWNvbl09XCJpY29uXCIgW2ljb25Qb3NdPVwiaWNvblBvc1wiIFtsYWJlbF09XCJsYWJlbFwiIChjbGljayk9XCJvbkRlZmF1bHRCdXR0b25DbGljaygkZXZlbnQpXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgW2F0dHIudGFiaW5kZXhdPVwidGFiaW5kZXhcIj48L2J1dHRvbj5cbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBwQnV0dG9uIGNsYXNzPVwicC1zcGxpdGJ1dHRvbi1tZW51YnV0dG9uXCIgaWNvbj1cInBpIHBpLWNoZXZyb24tZG93blwiIChjbGljayk9XCJvbkRyb3Bkb3duQnV0dG9uQ2xpY2soJGV2ZW50KVwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIFthdHRyLmFyaWEtbGFiZWxdPVwiZXhwYW5kQXJpYUxhYmVsXCI+PC9idXR0b24+XG4gICAgICAgICAgICA8cC10aWVyZWRNZW51ICNtZW51IFtwb3B1cF09XCJ0cnVlXCIgW21vZGVsXT1cIm1vZGVsXCIgW3N0eWxlXT1cIm1lbnVTdHlsZVwiIFtzdHlsZUNsYXNzXT1cIm1lbnVTdHlsZUNsYXNzXCIgW2FwcGVuZFRvXT1cImFwcGVuZFRvXCJcbiAgICAgICAgICAgICAgICAgICAgW3Nob3dUcmFuc2l0aW9uT3B0aW9uc109XCJzaG93VHJhbnNpdGlvbk9wdGlvbnNcIiBbaGlkZVRyYW5zaXRpb25PcHRpb25zXT1cImhpZGVUcmFuc2l0aW9uT3B0aW9uc1wiPjwvcC10aWVyZWRNZW51PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vc3BsaXRidXR0b24uY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICAnY2xhc3MnOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgU3BsaXRCdXR0b24ge1xuXG4gICAgQElucHV0KCkgbW9kZWw6IE1lbnVJdGVtW107XG5cbiAgICBASW5wdXQoKSBpY29uOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBpY29uUG9zOiBzdHJpbmcgPSAnbGVmdCc7XG5cbiAgICBASW5wdXQoKSBsYWJlbDogc3RyaW5nO1xuXG4gICAgQE91dHB1dCgpIG9uQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uRHJvcGRvd25DbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgbWVudVN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBtZW51U3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSB0YWJpbmRleDogbnVtYmVyO1xuXG4gICAgQElucHV0KCkgYXBwZW5kVG86IGFueTtcblxuICAgIEBJbnB1dCgpIGRpcjogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgZXhwYW5kQXJpYUxhYmVsOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBzaG93VHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZyA9ICcuMTJzIGN1YmljLWJlemllcigwLCAwLCAwLjIsIDEpJztcblxuICAgIEBJbnB1dCgpIGhpZGVUcmFuc2l0aW9uT3B0aW9uczogc3RyaW5nID0gJy4xcyBsaW5lYXInO1xuXG4gICAgQFZpZXdDaGlsZCgnY29udGFpbmVyJykgY29udGFpbmVyVmlld0NoaWxkOiBFbGVtZW50UmVmO1xuXG4gICAgQFZpZXdDaGlsZCgnZGVmYXVsdGJ0bicpIGJ1dHRvblZpZXdDaGlsZDogRWxlbWVudFJlZjtcblxuICAgIEBWaWV3Q2hpbGQoJ21lbnUnKSBtZW51OiBUaWVyZWRNZW51O1xuICAgIFxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8YW55PjtcblxuICAgIGNvbnRlbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoKGl0ZW0uZ2V0VHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnY29udGVudCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25EZWZhdWx0QnV0dG9uQ2xpY2soZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMub25DbGljay5lbWl0KGV2ZW50KTtcbiAgICB9XG5cbiAgICBvbkRyb3Bkb3duQnV0dG9uQ2xpY2soZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMub25Ecm9wZG93bkNsaWNrLmVtaXQoZXZlbnQpO1xuICAgICAgICB0aGlzLm1lbnUudG9nZ2xlKHtjdXJyZW50VGFyZ2V0OiB0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCByZWxhdGl2ZUFsaWduOiB0aGlzLmFwcGVuZFRvID09IG51bGx9KTtcbiAgICB9XG5cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLEJ1dHRvbk1vZHVsZSwgVGllcmVkTWVudU1vZHVsZV0sXG4gICAgZXhwb3J0czogW1NwbGl0QnV0dG9uLEJ1dHRvbk1vZHVsZSwgVGllcmVkTWVudU1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbU3BsaXRCdXR0b25dXG59KVxuZXhwb3J0IGNsYXNzIFNwbGl0QnV0dG9uTW9kdWxlIHsgfVxuIl19