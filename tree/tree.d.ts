import { AfterContentInit, OnDestroy, EventEmitter, OnInit, OnChanges, QueryList, TemplateRef, ElementRef, SimpleChanges } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { PrimeNGConfig, TreeNode } from 'primeng/api';
import { TreeDragDropService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { BlockableUI } from 'primeng/api';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/cdk/scrolling";
import * as i3 from "primeng/ripple";
import * as i4 from "primeng/api";
export declare class UITreeNode implements OnInit {
    static ICON_CLASS: string;
    rowNode: any;
    node: TreeNode;
    parentNode: TreeNode;
    root: boolean;
    index: number;
    firstChild: boolean;
    lastChild: boolean;
    level: number;
    indentation: number;
    tree: Tree;
    constructor(tree: any);
    draghoverPrev: boolean;
    draghoverNext: boolean;
    draghoverNode: boolean;
    ngOnInit(): void;
    getIcon(): string;
    isLeaf(): boolean;
    toggle(event: Event): void;
    expand(event: Event): void;
    collapse(event: Event): void;
    onNodeClick(event: MouseEvent): void;
    onNodeKeydown(event: KeyboardEvent): void;
    onNodeTouchEnd(): void;
    onNodeRightClick(event: MouseEvent): void;
    isSelected(): boolean;
    onDropPoint(event: Event, position: number): void;
    processPointDrop(event: any): void;
    createDropPointEventMetadata(position: any): {
        dragNode: TreeNode<any>;
        dragNodeIndex: number;
        dragNodeSubNodes: TreeNode<any>[];
        dropNode: TreeNode<any>;
        index: number;
        position: any;
    };
    onDropPointDragOver(event: any): void;
    onDropPointDragEnter(event: Event, position: number): void;
    onDropPointDragLeave(event: Event): void;
    onDragStart(event: any): void;
    onDragStop(event: any): void;
    onDropNodeDragOver(event: any): void;
    onDropNode(event: any): void;
    createDropNodeEventMetadata(): {
        dragNode: TreeNode<any>;
        dragNodeIndex: number;
        dragNodeSubNodes: TreeNode<any>[];
        dropNode: TreeNode<any>;
    };
    processNodeDrop(event: any): void;
    onDropNodeDragEnter(event: any): void;
    onDropNodeDragLeave(event: any): void;
    onKeyDown(event: KeyboardEvent): void;
    findNextSiblingOfAncestor(nodeElement: any): any;
    findLastVisibleDescendant(nodeElement: any): any;
    getParentNodeElement(nodeElement: any): any;
    focusNode(element: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UITreeNode, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UITreeNode, "p-treeNode", never, { "rowNode": "rowNode"; "node": "node"; "parentNode": "parentNode"; "root": "root"; "index": "index"; "firstChild": "firstChild"; "lastChild": "lastChild"; "level": "level"; "indentation": "indentation"; }, {}, never, never>;
}
export declare class Tree implements OnInit, AfterContentInit, OnChanges, OnDestroy, BlockableUI {
    el: ElementRef;
    dragDropService: TreeDragDropService;
    config: PrimeNGConfig;
    value: TreeNode[];
    selectionMode: string;
    selection: any;
    selectionChange: EventEmitter<any>;
    onNodeSelect: EventEmitter<any>;
    onNodeUnselect: EventEmitter<any>;
    onNodeExpand: EventEmitter<any>;
    onNodeCollapse: EventEmitter<any>;
    onNodeContextMenuSelect: EventEmitter<any>;
    onNodeDrop: EventEmitter<any>;
    style: any;
    styleClass: string;
    contextMenu: any;
    layout: string;
    draggableScope: any;
    droppableScope: any;
    draggableNodes: boolean;
    droppableNodes: boolean;
    metaKeySelection: boolean;
    propagateSelectionUp: boolean;
    propagateSelectionDown: boolean;
    loading: boolean;
    loadingIcon: string;
    emptyMessage: string;
    ariaLabel: string;
    togglerAriaLabel: string;
    ariaLabelledBy: string;
    validateDrop: boolean;
    filter: boolean;
    filterBy: string;
    filterMode: string;
    filterPlaceholder: string;
    filterLocale: string;
    scrollHeight: string;
    virtualScroll: boolean;
    virtualNodeHeight: string;
    minBufferPx: number;
    maxBufferPx: number;
    indentation: number;
    trackBy: Function;
    onFilter: EventEmitter<any>;
    templates: QueryList<any>;
    virtualScrollBody: CdkVirtualScrollViewport;
    filterViewChild: ElementRef;
    serializedValue: any[];
    headerTemplate: TemplateRef<any>;
    footerTemplate: TemplateRef<any>;
    emptyMessageTemplate: TemplateRef<any>;
    templateMap: any;
    nodeTouched: boolean;
    dragNodeTree: Tree;
    dragNode: TreeNode;
    dragNodeSubNodes: TreeNode[];
    dragNodeIndex: number;
    dragNodeScope: any;
    dragHover: boolean;
    dragStartSubscription: Subscription;
    dragStopSubscription: Subscription;
    filteredNodes: TreeNode[];
    constructor(el: ElementRef, dragDropService: TreeDragDropService, config: PrimeNGConfig);
    ngOnInit(): void;
    ngOnChanges(simpleChange: SimpleChanges): void;
    get horizontal(): boolean;
    get emptyMessageLabel(): string;
    ngAfterContentInit(): void;
    updateSerializedValue(): void;
    serializeNodes(parent: any, nodes: any, level: any, visible: any): void;
    onNodeClick(event: any, node: TreeNode): void;
    onNodeTouchEnd(): void;
    onNodeRightClick(event: MouseEvent, node: TreeNode): void;
    findIndexInSelection(node: TreeNode): number;
    syncNodeOption(node: any, parentNodes: any, option: any, value?: any): void;
    hasFilteredNodes(): number;
    getNodeWithKey(key: string, nodes: TreeNode[]): any;
    propagateUp(node: TreeNode, select: boolean): void;
    propagateDown(node: TreeNode, select: boolean): void;
    isSelected(node: TreeNode): boolean;
    isSingleSelectionMode(): boolean;
    isMultipleSelectionMode(): boolean;
    isCheckboxSelectionMode(): boolean;
    isNodeLeaf(node: any): boolean;
    getRootNode(): TreeNode<any>[];
    getTemplateForNode(node: TreeNode): TemplateRef<any>;
    onDragOver(event: any): void;
    onDrop(event: any): void;
    processTreeDrop(dragNode: any, dragNodeIndex: any): void;
    onDragEnter(): void;
    onDragLeave(event: any): void;
    allowDrop(dragNode: TreeNode, dropNode: TreeNode, dragNodeScope: any): boolean;
    isValidDragScope(dragScope: any): boolean;
    _filter(value: any): void;
    resetFilter(): void;
    findFilteredNodes(node: any, paramsWithoutNode: any): boolean;
    isFilterMatched(node: any, { searchFields, filterText, isStrictMode }: {
        searchFields: any;
        filterText: any;
        isStrictMode: any;
    }): boolean;
    getBlockableElement(): HTMLElement;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<Tree, [null, { optional: true; }, null]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Tree, "p-tree", never, { "value": "value"; "selectionMode": "selectionMode"; "selection": "selection"; "style": "style"; "styleClass": "styleClass"; "contextMenu": "contextMenu"; "layout": "layout"; "draggableScope": "draggableScope"; "droppableScope": "droppableScope"; "draggableNodes": "draggableNodes"; "droppableNodes": "droppableNodes"; "metaKeySelection": "metaKeySelection"; "propagateSelectionUp": "propagateSelectionUp"; "propagateSelectionDown": "propagateSelectionDown"; "loading": "loading"; "loadingIcon": "loadingIcon"; "emptyMessage": "emptyMessage"; "ariaLabel": "ariaLabel"; "togglerAriaLabel": "togglerAriaLabel"; "ariaLabelledBy": "ariaLabelledBy"; "validateDrop": "validateDrop"; "filter": "filter"; "filterBy": "filterBy"; "filterMode": "filterMode"; "filterPlaceholder": "filterPlaceholder"; "filterLocale": "filterLocale"; "scrollHeight": "scrollHeight"; "virtualScroll": "virtualScroll"; "virtualNodeHeight": "virtualNodeHeight"; "minBufferPx": "minBufferPx"; "maxBufferPx": "maxBufferPx"; "indentation": "indentation"; "trackBy": "trackBy"; }, { "selectionChange": "selectionChange"; "onNodeSelect": "onNodeSelect"; "onNodeUnselect": "onNodeUnselect"; "onNodeExpand": "onNodeExpand"; "onNodeCollapse": "onNodeCollapse"; "onNodeContextMenuSelect": "onNodeContextMenuSelect"; "onNodeDrop": "onNodeDrop"; "onFilter": "onFilter"; }, ["templates"], never>;
}
export declare class TreeModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<TreeModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<TreeModule, [typeof Tree, typeof UITreeNode], [typeof i1.CommonModule, typeof i2.ScrollingModule, typeof i3.RippleModule], [typeof Tree, typeof i4.SharedModule, typeof i2.ScrollingModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<TreeModule>;
}
