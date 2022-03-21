import { ElementRef, AfterViewChecked, AfterContentInit, QueryList, TemplateRef, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FilterService } from 'primeng/api';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/button";
import * as i3 from "primeng/api";
import * as i4 from "primeng/ripple";
import * as i5 from "@angular/cdk/drag-drop";
export declare class OrderList implements AfterViewChecked, AfterContentInit {
    el: ElementRef;
    cd: ChangeDetectorRef;
    filterService: FilterService;
    header: string;
    style: any;
    styleClass: string;
    listStyle: any;
    responsive: boolean;
    filterBy: string;
    filterPlaceholder: string;
    filterLocale: string;
    metaKeySelection: boolean;
    dragdrop: boolean;
    controlsPosition: string;
    ariaFilterLabel: string;
    filterMatchMode: string;
    breakpoint: string;
    stripedRows: boolean;
    disabled: boolean;
    selectionChange: EventEmitter<any>;
    trackBy: Function;
    onReorder: EventEmitter<any>;
    onSelectionChange: EventEmitter<any>;
    onFilterEvent: EventEmitter<any>;
    listViewChild: ElementRef;
    templates: QueryList<any>;
    itemTemplate: TemplateRef<any>;
    headerTemplate: TemplateRef<any>;
    emptyMessageTemplate: TemplateRef<any>;
    emptyFilterMessageTemplate: TemplateRef<any>;
    _selection: any[];
    movedUp: boolean;
    movedDown: boolean;
    itemTouched: boolean;
    styleElement: any;
    id: string;
    filterValue: string;
    visibleOptions: any[];
    _value: any[];
    constructor(el: ElementRef, cd: ChangeDetectorRef, filterService: FilterService);
    get selection(): any[];
    set selection(val: any[]);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngAfterViewChecked(): void;
    get value(): any[];
    set value(val: any[]);
    onItemClick(event: any, item: any, index: any): void;
    onFilterKeyup(event: any): void;
    filter(): void;
    isItemVisible(item: any): boolean;
    onItemTouchEnd(): void;
    isSelected(item: any): boolean;
    isEmpty(): boolean;
    moveUp(): void;
    moveTop(): void;
    moveDown(): void;
    moveBottom(): void;
    onDrop(event: CdkDragDrop<string[]>): void;
    onItemKeydown(event: KeyboardEvent, item: any, index: Number): void;
    findNextItem(item: any): any;
    findPrevItem(item: any): any;
    moveDisabled(): boolean;
    createStyle(): void;
    destroyStyle(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrderList, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OrderList, "p-orderList", never, { "header": "header"; "style": "style"; "styleClass": "styleClass"; "listStyle": "listStyle"; "responsive": "responsive"; "filterBy": "filterBy"; "filterPlaceholder": "filterPlaceholder"; "filterLocale": "filterLocale"; "metaKeySelection": "metaKeySelection"; "dragdrop": "dragdrop"; "controlsPosition": "controlsPosition"; "ariaFilterLabel": "ariaFilterLabel"; "filterMatchMode": "filterMatchMode"; "breakpoint": "breakpoint"; "stripedRows": "stripedRows"; "disabled": "disabled"; "trackBy": "trackBy"; "selection": "selection"; "value": "value"; }, { "selectionChange": "selectionChange"; "onReorder": "onReorder"; "onSelectionChange": "onSelectionChange"; "onFilterEvent": "onFilterEvent"; }, ["templates"], never>;
}
export declare class OrderListModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<OrderListModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<OrderListModule, [typeof OrderList], [typeof i1.CommonModule, typeof i2.ButtonModule, typeof i3.SharedModule, typeof i4.RippleModule, typeof i5.DragDropModule], [typeof OrderList, typeof i3.SharedModule, typeof i5.DragDropModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<OrderListModule>;
}
