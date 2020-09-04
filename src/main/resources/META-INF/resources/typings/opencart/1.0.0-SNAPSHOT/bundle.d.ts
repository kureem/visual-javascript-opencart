declare class Boot {
    static main(args: string[]): void;
}
declare class Button extends JSContainer {
    constructor(name: string, icon: string, label: string);
}
interface CellRenderer {
    renderCell(table: Table, td: api.Renderable, value: any, rowData: Object, column: TableConfig.Column): any;
}
declare class CloudinaryImage extends JSContainer {
    width: number;
    height: number;
    mode: string;
    serverName: string;
    static RESIZE_MODE_SCALE: string;
    static RESIZE_MODE_LIMIT: string;
    static RESIZE_MODE_FILL: string;
    static RESIZE_MODE_FIT: string;
    static RESIZE_MODE_CROP: string;
    static RESIZE_MODE_THUMB: string;
    static RESIZE_MODE_PAD: string;
    static RESIZE_MODE_LIMITED_FILL: string;
    static RESIZE_MODE_LIMIT_PAD: string;
    static RESIZE_MODE_FIT_SCALE_UP: string;
    static RESIZE_MODE_PAD_NO_SCALE: string;
    constructor(imageId: string);
    refresh(): void;
    getServerName(): string;
    setServerName(serverName: string): void;
    getWidth(): number;
    setWidth(width: number): void;
    getHeight(): number;
    setHeight(height: number): void;
    getMode(): string;
    setMode(mode: string): void;
}
declare class CloudinaryInput extends JSContainer implements api.InputField<Object> {
    image: CloudinaryImage;
    upload: JSContainer;
    cloudinary: CloudinaryUploader;
    imageContainer: JSContainer;
    cloudinaryContainer: JSContainer;
    uploadContainer: JSContainer;
    progressBar: ProgressBar;
    cloudinaryEntry: Object;
    required: boolean;
    btnUpload: Button;
    constructor(name: string);
    decorateUpload(): void;
    getUploader(): CloudinaryUploader;
    decorateCloudinary(): void;
    setDefault(defau: string): void;
    getImage(): JSContainer;
    getCloudinary(): CloudinaryUploader;
    setDisabled(b: boolean): CloudinaryInput;
    setReadOnly(b: boolean): CloudinaryInput;
    decorateImage(): void;
    /**
     *
     * @return {Object}
     */
    getValue(): Object;
    /**
     *
     * @param {Object} val
     */
    setValue(val: Object): void;
    /**
     *
     */
    validate(): void;
    /**
     *
     * @return {string}
     */
    getBinding(): string;
    /**
     *
     * @param {string} binding
     * @return {*}
     */
    setBinding(binding: string): api.InputField<Object>;
    /**
     *
     * @param {boolean} b
     * @return {*}
     */
    setRequired(b: boolean): api.InputField<Object>;
}
declare namespace CloudinaryInput {
    class CloudinaryInput$0 implements api.EventListener {
        __parent: any;
        /**
         *
         * @param {*} source
         * @param {Event} evt
         */
        performAction(source: api.Renderable, evt: Event): void;
        constructor(__parent: any);
    }
    class CloudinaryInput$1 implements api.EventListener {
        __parent: any;
        /**
         *
         * @param {*} source
         * @param {Event} evt
         */
        performAction(source: api.Renderable, evt: Event): void;
        constructor(__parent: any);
    }
    class CloudinaryInput$2 implements api.EventListener {
        __parent: any;
        /**
         *
         * @param {*} source
         * @param {Event} evt
         */
        performAction(source: api.Renderable, evt: Event): void;
        constructor(__parent: any);
    }
    class CloudinaryInput$3 implements api.EventListener {
        __parent: any;
        /**
         *
         * @param {*} source
         * @param {Event} evt
         */
        performAction(source: api.Renderable, evt: Event): void;
        constructor(__parent: any);
    }
    class CloudinaryInput$4 implements api.EventListener {
        __parent: any;
        /**
         *
         * @param {*} source
         * @param {Event} evt
         */
        performAction(source: api.Renderable, evt: Event): void;
        constructor(__parent: any);
    }
    class CloudinaryInput$5 implements api.EventListener {
        __parent: any;
        /**
         *
         * @param {*} source
         * @param {Event} evt
         */
        performAction(source: api.Renderable, evt: Event): void;
        constructor(__parent: any);
    }
}
declare class CloudinaryItem extends Object {
    bytes: number;
    created_at: number;
    etag: string;
    format: string;
    height: number;
    original_filename: string;
    placeholder: boolean;
    public_id: string;
    resource_type: string;
    secure_url: string;
    signature: string;
    tags: string[];
    type: string;
    url: string;
    version: number;
    width: number;
    constructor(prox: Object);
}
declare class CloudinaryUploader extends JSContainer {
    endpoint: string;
    cloudName: string;
    unsignedUploadPreset: string;
    constructor(name: string);
    /**
     *
     * @return {Array}
     */
    advancedEventTypes(): string[];
    setEndpoint(ep: string): void;
    setCloudName(cn: string): void;
    setUnsignedUploadPreset(uup: string): void;
    uploadFile(file: File): void;
}
declare class Form extends JSContainer {
    config_: FormConfig;
    body: JSContainer;
    fields: Array<Form.FormGroup>;
    constructor(name: string);
    setConfig(config: FormConfig): void;
    addField$framework_components_opencart_FormConfig_Field(field: FormConfig.Field): void;
    addField$java_lang_String$java_lang_String$java_lang_String$boolean(name: string, label: string, type: string, required: boolean): void;
    addField(name?: any, label?: any, type?: any, required?: any): any;
    getFormData(): Object;
    setFormData(formData: Object): void;
    getFormGroup(name: string): Form.FormGroup;
    addButton(name: string, icon: string, label: string): JSContainer;
    createBtn(act: FormConfig.Action): JSContainer;
}
declare namespace Form {
    class FormGroup extends JSContainer {
        __parent: any;
        field_: FormConfig.Field;
        uiLabel: JSContainer;
        uiInput: JSContainer;
        input: api.InputField<any>;
        constructor(__parent: any, field: FormConfig.Field, layout: string);
        setValue(value: any): void;
        getValue(): any;
        getField(): FormConfig.Field;
        getUiLabel(): JSContainer;
        getUiInput(): JSContainer;
        getInput(): api.InputField<any>;
    }
    class Form$0 implements api.EventListener {
        private act;
        __parent: any;
        /**
         *
         * @param {*} source
         * @param {Event} evt
         */
        performAction(source: api.Renderable, evt: Event): void;
        constructor(__parent: any, act: any);
    }
}
declare class FormConfig {
    name: string;
    label: string;
    layout: string;
    fields: Array<FormConfig.Field>;
    actions: Array<FormConfig.Action>;
    static TEXT_TYPE: string;
    static NUMBER_TYPE: string;
    static DATE_TYPE: string;
    static TIME_TYPE: string;
    static WEEK_TYPE: string;
    static MONTH_TYPE: string;
    static COLOR_TYPE: string;
    static LONG_TEXT_TYPE: string;
    static SELECT_TYPE: string;
    static RANGE_TYPE: string;
    static FILE_TYPE: string;
    static CHECK_BOX_TYPE: string;
    static CLOUDINARY_TYPE: string;
    constructor();
}
declare namespace FormConfig {
    class Field {
        name: string;
        label: string;
        type: string;
        defaultValue: any;
        required: boolean;
        options: Array<Object>;
        constructor();
    }
    class Action {
        name: string;
        icon: string;
        label: string;
        event: Function;
        constructor();
    }
}
declare class Orders extends JSContainer {
    filter: JSContainer;
    list: JSContainer;
    rtable: ResponsiveTable;
    listPanel: Panel;
    rw: RestWebservice;
    constructor(token: string);
    start(): void;
    createCol(name: string, label: string, numeric: boolean): TableConfig.Column;
    createAction(name: string, label: string, icon: string): TableConfig.Action;
}
declare namespace Orders {
    class Orders$0 implements api.EventListener {
        private r;
        __parent: any;
        /**
         *
         * @param {*} source
         * @param {Event} evt
         */
        performAction(source: api.Renderable, evt: Event): void;
        constructor(__parent: any, r: any);
    }
    class Orders$1 implements CellRenderer {
        __parent: any;
        /**
         *
         * @param {Table} table
         * @param {*} td
         * @param {*} obj
         * @param {Object} rowData
         * @param {TableConfig.Column} col
         */
        renderCell(table: Table, td: api.Renderable, obj: any, rowData: Object, col: TableConfig.Column): void;
        constructor(__parent: any);
    }
    class Orders$2 implements api.EventListener {
        __parent: any;
        /**
         *
         * @param {*} source
         * @param {Event} evt
         */
        performAction(source: api.Renderable, evt: Event): void;
        constructor(__parent: any);
    }
}
declare class PageHeader extends JSContainer {
    title: JSContainer;
    buttons: JSContainer;
    breadcrumbs: JSContainer;
    constructor(name: string);
    setTitle(title: string): void;
    addBreadcrumb(title: string, route: string): void;
    addButton(name: string, title: string, icon: string): Button;
}
declare class Panel extends JSContainer {
    heading: JSContainer;
    title: JSContainer;
    icon: JSContainer;
    uititle: JSContainer;
    body: JSContainer;
    footer: JSContainer;
    constructor(name: string);
    setTitle(title: string): void;
    setIcon(icon: string): void;
    getHeading(): JSContainer;
    getBody(): JSContainer;
    getFooter(): JSContainer;
}
declare class Products extends JSContainer {
    header: PageHeader;
    content: JSContainer;
    table: ResponsiveTable;
    rest: RestWebservice;
    listPanel: Panel;
    formPanel: Panel;
    formTabs: Tabs;
    generalForm: Form;
    layout: CardLayout;
    formHydrated: boolean;
    constructor(name: string);
    start(): void;
    openForm(): void;
    hydrateForm(): void;
    openList(data: Array<Object>): void;
    buildForm(): void;
    buildTable(): void;
    setButtons(): void;
}
declare namespace Products {
    class Products$0 implements api.EventListener {
        __parent: any;
        /**
         *
         * @param {*} source
         * @param {Event} evt
         */
        performAction(source: api.Renderable, evt: Event): void;
        constructor(__parent: any);
    }
    class Products$1 implements api.EventListener {
        private select;
        __parent: any;
        /**
         *
         * @param {*} source
         * @param {Event} evt
         */
        performAction(source: api.Renderable, evt: Event): void;
        constructor(__parent: any, select: any);
    }
    class Products$2 implements api.EventListener {
        private select;
        __parent: any;
        /**
         *
         * @param {*} source
         * @param {Event} evt
         */
        performAction(source: api.Renderable, evt: Event): void;
        constructor(__parent: any, select: any);
    }
    namespace Products$2 {
        class Products$2$0 implements api.EventListener {
            __parent: any;
            /**
             *
             * @param {*} source
             * @param {Event} evt
             */
            performAction(source: api.Renderable, evt: Event): void;
            constructor(__parent: any);
        }
    }
    class Products$3 implements api.EventListener {
        __parent: any;
        /**
         *
         * @param {*} source
         * @param {Event} evt
         */
        performAction(source: api.Renderable, evt: Event): void;
        constructor(__parent: any);
    }
    class Products$4 implements CellRenderer {
        private defrend;
        __parent: any;
        /**
         *
         * @param {Table} table
         * @param {*} td
         * @param {*} value
         * @param {Object} rowData
         * @param {TableConfig.Column} column
         */
        renderCell(table: Table, td: api.Renderable, value: any, rowData: Object, column: TableConfig.Column): void;
        constructor(__parent: any, defrend: any);
    }
    class Products$5 implements api.EventListener {
        __parent: any;
        /**
         *
         * @param {*} source
         * @param {Event} evt
         */
        performAction(source: api.Renderable, evt: Event): void;
        constructor(__parent: any);
    }
    class Products$6 implements api.EventListener {
        __parent: any;
        /**
         *
         * @param {*} source
         * @param {Event} evt
         */
        performAction(source: api.Renderable, evt: Event): void;
        constructor(__parent: any);
    }
    namespace Products$6 {
        class Products$6$0 implements api.EventListener {
            __parent: any;
            /**
             *
             * @param {*} source
             * @param {Event} evt
             */
            performAction(source: api.Renderable, evt: Event): void;
            constructor(__parent: any);
        }
    }
}
declare class ProgressBar extends JSContainer {
    progressBar: JSContainer;
    constructor(name: string);
    setProgress(percent: number): void;
}
declare class Redemptions extends JSContainer {
    header: PageHeader;
    content: JSContainer;
    table: ResponsiveTable;
    rest: RestWebservice;
    listPanel: Panel;
    formPanel: Panel;
    form: Form;
    listRow: JSContainer;
    tilesRow: JSContainer;
    totalSales: Tile;
    totalRedeems: Tile;
    totalPosted: Tile;
    totalCredits: Tile;
    layout: CardLayout;
    constructor(name: string);
    list(res: Object): void;
    start(): void;
    buildForm(): void;
    setButtons(): void;
    buildDashboard(): void;
    buildTable(): void;
    createCol(name: string, title: string, numeric: boolean): TableConfig.Column;
}
declare namespace Redemptions {
    class Redemptions$0 implements api.EventListener {
        __parent: any;
        /**
         *
         * @param {*} source
         * @param {Event} evt
         */
        performAction(source: api.Renderable, evt: Event): void;
        constructor(__parent: any);
    }
    class Redemptions$1 implements api.EventListener {
        __parent: any;
        /**
         *
         * @param {*} source
         * @param {Event} evt
         */
        performAction(source: api.Renderable, evt: Event): void;
        constructor(__parent: any);
    }
    namespace Redemptions$1 {
        class Redemptions$1$0 implements api.EventListener {
            __parent: any;
            /**
             *
             * @param {*} source
             * @param {Event} evt
             */
            performAction(source: api.Renderable, evt: Event): void;
            constructor(__parent: any);
        }
    }
    class Redemptions$2 implements api.EventListener {
        __parent: any;
        /**
         *
         * @param {*} source
         * @param {Event} evt
         */
        performAction(source: api.Renderable, evt: Event): void;
        constructor(__parent: any);
    }
    class Redemptions$3 implements api.EventListener {
        __parent: any;
        /**
         *
         * @param {*} source
         * @param {Event} evt
         */
        performAction(source: api.Renderable, evt: Event): void;
        constructor(__parent: any);
    }
    class Redemptions$4 implements api.EventListener {
        __parent: any;
        /**
         *
         * @param {*} source
         * @param {Event} evt
         */
        performAction(source: api.Renderable, evt: Event): void;
        constructor(__parent: any);
    }
    namespace Redemptions$4 {
        class Redemptions$4$0 implements api.EventListener {
            __parent: any;
            /**
             *
             * @param {*} source
             * @param {Event} evt
             */
            performAction(source: api.Renderable, evt: Event): void;
            constructor(__parent: any);
        }
    }
}
declare class ResponsiveTable extends JSContainer {
    table: Table;
    constructor(name: string);
    getTable(): Table;
}
declare class ServerAction {
}
declare class Table extends JSContainer {
    head: JSContainer;
    body: JSContainer;
    headerRow: JSContainer;
    selectHeaderCell: JSContainer;
    headerCheckBox: input.JSCheckBox;
    config: TableConfig;
    data_: Array<Object>;
    cellRenderer: CellRenderer;
    constructor(name: string);
    setSelectAll(b: boolean): void;
    getSelected(): Array<Object>;
    getCellRenderer(): CellRenderer;
    setCellRenderer(cellRenderer: CellRenderer): void;
    getHead(): JSContainer;
    getBody(): JSContainer;
    getConfig(): TableConfig;
    setConfig(config: TableConfig): void;
    refresh(): void;
    setData(data: Array<Object>): void;
}
declare namespace Table {
    class TableAction extends JSContainer {
        __parent: any;
        config: TableConfig;
        btgroup: JSContainer;
        constructor(__parent: any, config: TableConfig);
        createBtn(act: TableConfig.Action, isMenu: boolean): JSContainer;
    }
    namespace TableAction {
        class TableAction$0 implements api.EventListener {
            private act;
            __parent: any;
            /**
             *
             * @param {*} source
             * @param {Event} evt
             */
            performAction(source: api.Renderable, evt: Event): void;
            constructor(__parent: any, act: any);
        }
    }
    class TableRow extends JSContainer {
        __parent: any;
        cb: input.JSCheckBox;
        data_: Object;
        config_: TableConfig;
        table_: Table;
        constructor(__parent: any, table: Table, data: Object, config: TableConfig);
        setValue(field: string, value: any): void;
        getData(): Object;
        isSelected(): boolean;
        setSelected(b: boolean): void;
    }
    class TableHeaderColumn extends JSContainer {
        __parent: any;
        column_: TableConfig.Column;
        inside: JSContainer;
        sortdir: number;
        constructor(__parent: any, column: TableConfig.Column);
        clearSort(): void;
    }
    namespace TableHeaderColumn {
        class TableHeaderColumn$0 implements api.EventListener {
            __parent: any;
            /**
             *
             * @param {*} source
             * @param {Event} evt
             */
            performAction(source: api.Renderable, evt: Event): void;
            constructor(__parent: any);
        }
    }
    class DefaultCellRenderer implements CellRenderer {
        /**
         *
         * @param {Table} table
         * @param {*} td
         * @param {*} obj
         * @param {Object} rowData
         * @param {TableConfig.Column} col
         */
        renderCell(table: Table, td: api.Renderable, obj: any, rowData: Object, col: TableConfig.Column): void;
        constructor();
    }
    class Table$0 implements api.EventListener {
        __parent: any;
        /**
         *
         * @param {*} source
         * @param {Event} evt
         */
        performAction(source: api.Renderable, evt: Event): void;
        constructor(__parent: any);
    }
}
declare class TableConfig {
    selectable: boolean;
    columns: Array<TableConfig.Column>;
    actions: Array<TableConfig.Action>;
}
declare namespace TableConfig {
    class Column {
        name: string;
        label: string;
        dataType: string;
        sortable: boolean;
        constructor();
    }
    class Action {
        name: string;
        icon: string;
        label: string;
        event: Function;
        constructor();
    }
}
declare class Tabs extends JSContainer {
    navs: JSContainer;
    content: JSContainer;
    constructor(name: string);
    addTab(name: string, label: string): void;
    activate(name: string): void;
    getPane(name: string): api.Renderable;
    doActivate(name: string, parent: api.Renderable): void;
    getNavs(): JSContainer;
    getContent(): JSContainer;
}
declare namespace Tabs {
    class Tabs$0 implements api.EventListener {
        __parent: any;
        /**
         *
         * @param {*} source
         * @param {Event} evt
         */
        performAction(source: api.Renderable, evt: Event): void;
        constructor(__parent: any);
    }
}
declare class Tile extends JSContainer {
    heading: JSContainer;
    body: JSContainer;
    footer: JSContainer;
    constructor(name: string);
    setHeading(left: string, right: string): void;
    setBody(icon: string, txt: string): void;
    setFooter(link: JSContainer): void;
}
declare class Util {
    static getToken(): string;
    static getPath(route: string): string;
}
