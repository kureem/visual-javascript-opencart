/* Generated from Java with JSweet 2.3.0 - http://www.jsweet.org */
class Boot {
    static main(args) {
        console.info("hello world");
        let href = window.location.href;
        let rout = "";
        if ((href.indexOf("?route") != -1)) {
            let sec = href.split("route=")[1];
            console.info(sec);
            if ((sec.indexOf("&user_token=") != -1)) {
                let parts = sec.split("&user_token=");
                rout = parts[0];
                console.info(rout);
                let token = parts[1];
                console.info(token);
                if (rout === "myspace/order") {
                    let orders = new Orders(token);
                    orders.render(document.getElementById("myorders"));
                    orders.start();
                }
                else if (rout === "myspace/redemptions") {
                    let red = new Redemptions("red");
                    red.render(document.getElementById("myredemptions"));
                    red.start();
                }
                else if (rout === "myspace/product") {
                    let red = new Products("red");
                    red.render(document.getElementById("myproducts"));
                    red.start();
                }
            }
        }
    }
}
Boot["__class"] = "framework.components.opencart.Boot";
class Button extends JSContainer {
    constructor(name, icon, label) {
        super(name, "button");
        this.addClass("btn");
        this.addClass("btn-primary");
        let html = "<i class=\"fa " + icon + "\"></i> " + label;
        this.setHtml(html);
    }
}
Button["__class"] = "framework.components.opencart.Button";
Button["__interfaces"] = ["framework.components.api.Renderable"];
class CloudinaryImage extends JSContainer {
    constructor(imageId) {
        super(imageId, "img");
        /*private*/ this.width = 200;
        /*private*/ this.height = 200;
        /*private*/ this.mode = CloudinaryImage.RESIZE_MODE_PAD;
        /*private*/ this.serverName = "dtpreqd3y";
    }
    refresh() {
        let url = "https://res.cloudinary.com/" + this.serverName + "/image/upload/c_" + this.mode + ",h_" + this.height + ",w_" + this.width + "/" + this.getName() + ".png";
        this.setAttribute("src", url);
    }
    getServerName() {
        return this.serverName;
    }
    setServerName(serverName) {
        this.serverName = serverName;
    }
    getWidth() {
        return this.width;
    }
    setWidth(width) {
        this.width = width;
    }
    getHeight() {
        return this.height;
    }
    setHeight(height) {
        this.height = height;
    }
    getMode() {
        return this.mode;
    }
    setMode(mode) {
        this.mode = mode;
    }
}
CloudinaryImage.RESIZE_MODE_SCALE = "scale";
CloudinaryImage.RESIZE_MODE_LIMIT = "limit";
CloudinaryImage.RESIZE_MODE_FILL = "fill";
CloudinaryImage.RESIZE_MODE_FIT = "fit";
CloudinaryImage.RESIZE_MODE_CROP = "crop";
CloudinaryImage.RESIZE_MODE_THUMB = "thumb";
CloudinaryImage.RESIZE_MODE_PAD = "pad";
CloudinaryImage.RESIZE_MODE_LIMITED_FILL = "lfill";
CloudinaryImage.RESIZE_MODE_LIMIT_PAD = "lpad";
CloudinaryImage.RESIZE_MODE_FIT_SCALE_UP = "mfit";
CloudinaryImage.RESIZE_MODE_PAD_NO_SCALE = "mpad";
CloudinaryImage["__class"] = "framework.components.opencart.CloudinaryImage";
CloudinaryImage["__interfaces"] = ["framework.components.api.Renderable"];
class CloudinaryInput extends JSContainer {
    constructor(name) {
        super(name, "div");
        /*private*/ this.image = new CloudinaryImage("img");
        /*private*/ this.upload = new JSContainer("input", "input");
        /*private*/ this.cloudinary = new CloudinaryUploader("cloudinary");
        /*private*/ this.imageContainer = new JSContainer("div");
        /*private*/ this.cloudinaryContainer = new JSContainer("div");
        /*private*/ this.uploadContainer = new JSContainer("div");
        /*private*/ this.progressBar = new ProgressBar("progress");
        /*private*/ this.cloudinaryEntry = null;
        /*private*/ this.required = false;
        /*private*/ this.btnUpload = new Button("upl", "fa-upload", "Upload");
        this.setAttribute("identifier", "cloudinary:image-input");
        this.addClass("slds-image-input");
        this.addChild(this.imageContainer);
        this.addChild(this.cloudinaryContainer);
        this.addChild(this.uploadContainer);
        this.addChild(this.btnUpload);
        this.imageContainer.addChild(this.image);
        this.cloudinaryContainer.addChild(this.cloudinary);
        this.uploadContainer.addChild(this.upload);
        this.upload.setStyle("display", "none");
        this.decorateImage();
        this.decorateUpload();
        this.decorateCloudinary();
        this.setStyle("position", "relative");
        this.addChild(this.progressBar);
        this.setStyle("background", "none").setStyle("box-shadow", "none").setStyle("border", "none").setStyle("height", "auto").setStyle("width", "auto");
        this.progressBar.setStyle("display", "none");
    }
    decorateUpload() {
        this.btnUpload.addEventListener(new CloudinaryInput.CloudinaryInput$0(this), "click");
        this.upload.setVisible(false);
        this.upload.setAttribute("type", "file");
        this.upload.setAttribute("accept", "image/*");
        this.upload.addEventListener(new CloudinaryInput.CloudinaryInput$1(this), "change");
    }
    getUploader() {
        return this.cloudinary;
    }
    decorateCloudinary() {
        this.cloudinary.addEventListener(new CloudinaryInput.CloudinaryInput$2(this), "completed");
        this.cloudinary.addEventListener(new CloudinaryInput.CloudinaryInput$3(this), "start");
        this.cloudinary.addEventListener(new CloudinaryInput.CloudinaryInput$4(this), "progress");
    }
    setDefault(defau) {
        this.image.setAttribute("src", defau);
    }
    getImage() {
        return this.image;
    }
    getCloudinary() {
        return this.cloudinary;
    }
    setDisabled(b) {
        if (b) {
            this.setAttribute("disabled", "true");
        }
        else {
            this.setAttribute("disabled", null);
        }
        return this;
    }
    setReadOnly(b) {
        if (b) {
            this.setAttribute("readonly", "true");
        }
        else {
            this.setAttribute("readonly", null);
        }
        return this;
    }
    decorateImage() {
        this.image.addEventListener(new CloudinaryInput.CloudinaryInput$5(this), "click");
    }
    /**
     *
     * @return {Object}
     */
    getValue() {
        return this.cloudinaryEntry;
    }
    /**
     *
     * @param {Object} val
     */
    setValue(val) {
        this.cloudinaryEntry = val;
        if (val == null) {
            this.image.setAttribute("src", this.getAttribute("default"));
        }
        else {
            this.image.setName(val.public_id);
            this.image.refresh();
        }
    }
    /**
     *
     */
    validate() {
    }
    /**
     *
     * @return {string}
     */
    getBinding() {
        return this.getAttribute("binding");
    }
    /**
     *
     * @param {string} binding
     * @return {*}
     */
    setBinding(binding) {
        this.setAttribute("binding", binding);
        return this;
    }
    /**
     *
     * @param {boolean} b
     * @return {*}
     */
    setRequired(b) {
        this.required = b;
        return this;
    }
}
CloudinaryInput["__class"] = "framework.components.opencart.CloudinaryInput";
CloudinaryInput["__interfaces"] = ["framework.components.api.InputField", "framework.components.api.Renderable"];
(function (CloudinaryInput) {
    class CloudinaryInput$0 {
        constructor(__parent) {
            this.__parent = __parent;
        }
        /**
         *
         * @param {*} source
         * @param {Event} evt
         */
        performAction(source, evt) {
            let ninput = this.__parent.upload.getNative();
            ninput.click();
        }
    }
    CloudinaryInput.CloudinaryInput$0 = CloudinaryInput$0;
    CloudinaryInput$0["__interfaces"] = ["framework.components.api.EventListener"];
    class CloudinaryInput$1 {
        constructor(__parent) {
            this.__parent = __parent;
        }
        /**
         *
         * @param {*} source
         * @param {Event} evt
         */
        performAction(source, evt) {
            let ninput = this.__parent.upload.getNative();
            let files = ninput.files;
            if (files != null && files.length > 0) {
                for (let index141 = 0; index141 < files.length; index141++) {
                    let f = files[index141];
                    {
                        this.__parent.cloudinary.uploadFile(f);
                    }
                }
            }
        }
    }
    CloudinaryInput.CloudinaryInput$1 = CloudinaryInput$1;
    CloudinaryInput$1["__interfaces"] = ["framework.components.api.EventListener"];
    class CloudinaryInput$2 {
        constructor(__parent) {
            this.__parent = __parent;
        }
        /**
         *
         * @param {*} source
         * @param {Event} evt
         */
        performAction(source, evt) {
            let response = new CloudinaryItem(evt["data"]);
            this.__parent.setValue(response);
            this.__parent.image.setName(response.public_id);
            this.__parent.image.refresh();
            this.__parent.image.render();
            this.__parent.progressBar.setStyle("display", "none");
            this.__parent.progressBar.render();
            this.__parent.btnUpload.setStyle("display", null);
            this.__parent.btnUpload.render();
        }
    }
    CloudinaryInput.CloudinaryInput$2 = CloudinaryInput$2;
    CloudinaryInput$2["__interfaces"] = ["framework.components.api.EventListener"];
    class CloudinaryInput$3 {
        constructor(__parent) {
            this.__parent = __parent;
        }
        /**
         *
         * @param {*} source
         * @param {Event} evt
         */
        performAction(source, evt) {
            this.__parent.btnUpload.setStyle("display", "none");
            this.__parent.btnUpload.render();
            this.__parent.progressBar.setStyle("display", null);
            this.__parent.progressBar.render();
        }
    }
    CloudinaryInput.CloudinaryInput$3 = CloudinaryInput$3;
    CloudinaryInput$3["__interfaces"] = ["framework.components.api.EventListener"];
    class CloudinaryInput$4 {
        constructor(__parent) {
            this.__parent = __parent;
        }
        /**
         *
         * @param {*} source
         * @param {Event} evt
         */
        performAction(source, evt) {
            let pro = evt["data"];
            this.__parent.progressBar.setProgress(pro);
            this.__parent.progressBar.render();
        }
    }
    CloudinaryInput.CloudinaryInput$4 = CloudinaryInput$4;
    CloudinaryInput$4["__interfaces"] = ["framework.components.api.EventListener"];
    class CloudinaryInput$5 {
        constructor(__parent) {
            this.__parent = __parent;
        }
        /**
         *
         * @param {*} source
         * @param {Event} evt
         */
        performAction(source, evt) {
            this.__parent.upload.getNative().click();
        }
    }
    CloudinaryInput.CloudinaryInput$5 = CloudinaryInput$5;
    CloudinaryInput$5["__interfaces"] = ["framework.components.api.EventListener"];
})(CloudinaryInput || (CloudinaryInput = {}));
class CloudinaryItem extends Object {
    constructor(prox) {
        super();
        if (this.bytes === undefined)
            this.bytes = null;
        if (this.created_at === undefined)
            this.created_at = null;
        if (this.etag === undefined)
            this.etag = null;
        if (this.format === undefined)
            this.format = null;
        if (this.height === undefined)
            this.height = null;
        if (this.original_filename === undefined)
            this.original_filename = null;
        if (this.placeholder === undefined)
            this.placeholder = null;
        if (this.public_id === undefined)
            this.public_id = null;
        if (this.resource_type === undefined)
            this.resource_type = null;
        if (this.secure_url === undefined)
            this.secure_url = null;
        if (this.signature === undefined)
            this.signature = null;
        if (this.tags === undefined)
            this.tags = null;
        if (this.type === undefined)
            this.type = null;
        if (this.url === undefined)
            this.url = null;
        if (this.version === undefined)
            this.version = null;
        if (this.width === undefined)
            this.width = null;
        {
            let array143 = Object.keys(prox);
            for (let index142 = 0; index142 < array143.length; index142++) {
                let key = array143[index142];
                {
                    this[key] = prox[key];
                }
            }
        }
    }
}
CloudinaryItem["__class"] = "framework.components.opencart.CloudinaryItem";
class CloudinaryUploader extends JSContainer {
    constructor(name) {
        super(name, "div");
        /*private*/ this.endpoint = "https://api.cloudinary.com/v1_1/";
        if (this.cloudName === undefined)
            this.cloudName = null;
        if (this.unsignedUploadPreset === undefined)
            this.unsignedUploadPreset = null;
    }
    /**
     *
     * @return {Array}
     */
    advancedEventTypes() {
        return ["start", "progress", "completed"];
    }
    setEndpoint(ep) {
        this.endpoint = ep;
    }
    setCloudName(cn) {
        this.cloudName = cn;
    }
    setUnsignedUploadPreset(uup) {
        this.unsignedUploadPreset = uup;
    }
    uploadFile(file) {
        if (this.cloudName == null || this.cloudName.length <= 0) {
            throw new Error("You need to configure the service for the cloudname");
        }
        if (this.endpoint == null || this.endpoint.length <= 0) {
            this.endpoint = "https://api.cloudinary.com/v1_1/";
            console.warn("Cloudinary endpoint not configured. Using default endpoint:https://api.cloudinary.com/v1_1/");
        }
        else if (!((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(this.endpoint, "/")) {
            this.endpoint = this.endpoint + "/";
        }
        let url = this.endpoint + this.cloudName + "/upload";
        console.log("Cloudinary URL:" + url);
        let xhr = new XMLHttpRequest();
        let fd = new FormData();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.upload.addEventListener("progress", (pe) => {
            let e = pe;
            let progress = Math.round((e.loaded * 100.0) / e.total);
            e["progress"] = progress;
            e["data"] = progress;
            this.fireListener("progress", e);
        });
        xhr.onreadystatechange = ((xhr) => {
            return (e) => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    let response = JSON.parse(xhr.responseText);
                    e["data"] = response;
                    e["response"] = response;
                    this.fireListener("completed", e);
                }
                return e;
            };
        })(xhr);
        if (this.unsignedUploadPreset != null && this.unsignedUploadPreset.length > 0)
            fd.append("upload_preset", this.unsignedUploadPreset);
        fd.append("tags", "browser_upload");
        fd.append("file", file);
        xhr.send(fd);
        let startUpload = new CustomEvent("start");
        startUpload["data"] = file;
        startUpload["file"] = file;
        this.fireListener("start", startUpload);
    }
}
CloudinaryUploader["__class"] = "framework.components.opencart.CloudinaryUploader";
CloudinaryUploader["__interfaces"] = ["framework.components.api.Renderable"];
class Form extends JSContainer {
    constructor(name) {
        super(name, "div");
        /*private*/ this.body = new JSContainer("body", "div");
        /*private*/ this.fields = (new Array());
        if (this.config_ === undefined)
            this.config_ = null;
        this.addClass("form");
        this.addChild(this.body);
    }
    setConfig(config) {
        if (this.config_ != null) {
            this.removeClass("form-" + this.config_.layout);
            this.fields = (new Array());
            this.body.clearChildren();
        }
        this.config_ = config;
        this.addClass("form-" + this.config_.layout);
        for (let index144 = 0; index144 < this.config_.fields.length; index144++) {
            let field = this.config_.fields[index144];
            {
                let fg = new Form.FormGroup(this, field, this.config_.layout);
                this.body.addChild(fg);
                this.fields.push(fg);
            }
        }
    }
    addField$framework_components_opencart_FormConfig_Field(field) {
        if (this.config_ == null) {
            this.config_ = new FormConfig();
        }
        this.config_.fields.push(field);
        let fg = new Form.FormGroup(this, field, this.config_.layout);
        this.body.addChild(fg);
        this.fields.push(fg);
    }
    addField$java_lang_String$java_lang_String$java_lang_String$boolean(name, label, type, required) {
        let field = new FormConfig.Field();
        field.name = name;
        field.label = label;
        field.type = type;
        field.required = required;
        this.addField$framework_components_opencart_FormConfig_Field(field);
    }
    addField(name, label, type, required) {
        if (((typeof name === 'string') || name === null) && ((typeof label === 'string') || label === null) && ((typeof type === 'string') || type === null) && ((typeof required === 'boolean') || required === null)) {
            return this.addField$java_lang_String$java_lang_String$java_lang_String$boolean(name, label, type, required);
        }
        else if (((name != null && name instanceof FormConfig.Field) || name === null) && label === undefined && type === undefined && required === undefined) {
            return this.addField$framework_components_opencart_FormConfig_Field(name);
        }
        else
            throw new Error('invalid overload');
    }
    getFormData() {
        let data = new Object();
        for (let index145 = 0; index145 < this.fields.length; index145++) {
            let fg = this.fields[index145];
            {
                data[fg.getName()] = fg.getValue();
            }
        }
        return data;
    }
    setFormData(formData) {
        for (let index146 = 0; index146 < this.fields.length; index146++) {
            let fg = this.fields[index146];
            {
                fg.setValue(formData[fg.getName()]);
            }
        }
    }
    getFormGroup(name) {
        for (let index147 = 0; index147 < this.fields.length; index147++) {
            let fg = this.fields[index147];
            {
                if (fg.getName() === name) {
                    return fg;
                }
            }
        }
        return null;
    }
    addButton(name, icon, label) {
        let btn = new JSContainer(name, "a");
        btn.setAttribute("href", "javascript:void(0);");
        let html = "<i class=\"fa " + icon + "\"></i>" + label;
        btn.setHtml(html);
        btn.addClass("btn btn-primary");
        return btn;
    }
    createBtn(act) {
        let btn = new JSContainer(act.name, "a");
        btn.setAttribute("href", "javascript:void(0);");
        let html = "<i class=\"fa " + act.icon + "\"></i>" + act.label;
        btn.setHtml(html);
        btn.addEventListener(new Form.Form$0(this, act), "click");
        return btn;
    }
}
Form["__class"] = "framework.components.opencart.Form";
Form["__interfaces"] = ["framework.components.api.Renderable"];
(function (Form) {
    class FormGroup extends JSContainer {
        constructor(__parent, field, layout) {
            super(field.name, "div");
            this.__parent = __parent;
            if (this.field_ === undefined)
                this.field_ = null;
            this.uiLabel = new JSContainer("uilabel", "label").addClass("control-label");
            this.uiInput = new JSContainer("uiinput", "div");
            if (this.input === undefined)
                this.input = null;
            this.field_ = field;
            this.addChild(this.uiLabel);
            this.addChild(this.uiInput);
            if (layout === "horizontal") {
                this.uiLabel.addClass("col-sm-2");
                this.uiInput.addClass("col-sm-10");
            }
            this.addClass("form-group");
            if (this.field_.required) {
                this.addClass("required");
            }
            this.uiLabel.setHtml(this.field_.label);
            let type = this.field_.type;
            let name = this.field_.name;
            if (type === FormConfig.TEXT_TYPE) {
                this.input = new input.JSStringInput(name);
            }
            else if (type === FormConfig.CHECK_BOX_TYPE) {
                this.input = new input.JSCheckBox(name);
            }
            else if (type === FormConfig.COLOR_TYPE) {
                this.input = new input.JSStringInput(name);
                this.input.setAttribute("type", "color");
            }
            else if (type === FormConfig.DATE_TYPE) {
                this.input = new input.JSDateInput(name);
            }
            else if (type === FormConfig.FILE_TYPE) {
                this.input = new JSUpload(name, "");
            }
            else if (type === FormConfig.LONG_TEXT_TYPE) {
                this.input = new input.JSTextArea(name);
            }
            else if (type === FormConfig.MONTH_TYPE) {
                this.input = new input.JSDateInput(name).setType(input.DateInputTypes.month);
            }
            else if (type === FormConfig.NUMBER_TYPE) {
                this.input = new input.JSNumericInput(name);
            }
            else if (type === FormConfig.RANGE_TYPE) {
                this.input = new input.JSNumericInput(name).setType(input.NumericInputTypes.range);
            }
            else if (type === FormConfig.SELECT_TYPE) {
                this.input = new input.JSSelect(name);
                this.input.setOptions(this.field_.options);
            }
            else if (type === FormConfig.TIME_TYPE) {
                this.input = new input.JSTimeInput(name);
            }
            else if (type === FormConfig.WEEK_TYPE) {
                this.input = new input.JSDateInput(name).setType(input.DateInputTypes.week);
            }
            else if (type === FormConfig.CLOUDINARY_TYPE) {
                this.input = new CloudinaryInput(name);
            }
            else {
                this.input = new input.JSStringInput(name);
            }
            this.input.setRequired(this.field_.required);
            this.input.addClass("form-control");
            this.uiInput.addChild(this.input);
        }
        setValue(value) {
            this.input.setValue(value);
        }
        getValue() {
            return this.input.getValue();
        }
        getField() {
            return this.field_;
        }
        getUiLabel() {
            return this.uiLabel;
        }
        getUiInput() {
            return this.uiInput;
        }
        getInput() {
            return this.input;
        }
    }
    Form.FormGroup = FormGroup;
    FormGroup["__class"] = "framework.components.opencart.Form.FormGroup";
    FormGroup["__interfaces"] = ["framework.components.api.Renderable"];
    class Form$0 {
        constructor(__parent, act) {
            this.act = act;
            this.__parent = __parent;
        }
        /**
         *
         * @param {*} source
         * @param {Event} evt
         */
        performAction(source, evt) {
            let fn = this.act.event;
            let ro = (source.getAncestorWithClass("form-group"));
            fn.call(source, (source.getAncestorWithClass("form")), ro);
        }
    }
    Form.Form$0 = Form$0;
    Form$0["__interfaces"] = ["framework.components.api.EventListener"];
})(Form || (Form = {}));
class FormConfig {
    constructor() {
        this.layout = "vertical";
        this.fields = (new Array());
        this.actions = (new Array());
        if (this.name === undefined)
            this.name = null;
        if (this.label === undefined)
            this.label = null;
    }
}
FormConfig.TEXT_TYPE = "text";
FormConfig.NUMBER_TYPE = "number";
FormConfig.DATE_TYPE = "date";
FormConfig.TIME_TYPE = "time";
FormConfig.WEEK_TYPE = "week";
FormConfig.MONTH_TYPE = "month";
FormConfig.COLOR_TYPE = "color";
FormConfig.LONG_TEXT_TYPE = "textarea";
FormConfig.SELECT_TYPE = "select";
FormConfig.RANGE_TYPE = "range";
FormConfig.FILE_TYPE = "file";
FormConfig.CHECK_BOX_TYPE = "checkbox";
FormConfig.CLOUDINARY_TYPE = "cloudinary";
FormConfig["__class"] = "framework.components.opencart.FormConfig";
(function (FormConfig) {
    class Field {
        constructor() {
            this.options = (new Array());
            if (this.name === undefined)
                this.name = null;
            if (this.label === undefined)
                this.label = null;
            if (this.type === undefined)
                this.type = null;
            if (this.defaultValue === undefined)
                this.defaultValue = null;
            if (this.required === undefined)
                this.required = false;
        }
    }
    FormConfig.Field = Field;
    Field["__class"] = "framework.components.opencart.FormConfig.Field";
    class Action {
        constructor() {
            if (this.name === undefined)
                this.name = null;
            if (this.icon === undefined)
                this.icon = null;
            if (this.label === undefined)
                this.label = null;
            if (this.event === undefined)
                this.event = null;
        }
    }
    FormConfig.Action = Action;
    Action["__class"] = "framework.components.opencart.FormConfig.Action";
})(FormConfig || (FormConfig = {}));
class Orders extends JSContainer {
    constructor(token) {
        super("orders", "div");
        /*private*/ this.filter = new JSContainer("filter", "div");
        /*private*/ this.list = new JSContainer("list", "div");
        /*private*/ this.rtable = new ResponsiveTable("table");
        /*private*/ this.listPanel = new Panel("listpanel");
        this.rw = new RestWebservice();
        this.addClass("row");
        this.addChild(this.filter);
        this.addChild(this.list);
        this.filter.addClass("col-md-3 col-md-push-9 col-sm-12 hidden-sm hidden-xs");
        this.list.addClass("col-md-9 col-md-pull-3 col-sm-12");
        let tc = new TableConfig();
        let invoice_no = new TableConfig.Column();
        invoice_no.dataType = "numeric";
        invoice_no.label = "Inv.";
        invoice_no.name = "invoice_no";
        invoice_no.sortable = true;
        tc.columns.push(invoice_no);
        tc.columns.push(this.createCol("username", "Name", false));
        tc.columns.push(this.createCol("email", "Email", false));
        tc.columns.push(this.createCol("telephone", "Tel", false));
        tc.columns.push(this.createCol("name", "Product", false));
        tc.columns.push(this.createCol("model", "Model", false));
        tc.columns.push(this.createCol("price", "Price", true));
        tc.columns.push(this.createCol("status", "Status", false));
        tc.actions.push(this.createAction("view", "View", "fa-eye"));
        let redeem = this.createAction("redeem", "Request Redeem", "fa-adjust");
        redeem.event = (a, b, c) => {
            let r = b;
            let data = r.getData();
            let id = data["order_product_id"].toString();
            let query = "UPDATE oc_order_product set status = \'toredeem\' WHERE order_product_id=" + id;
            let quey = new Object();
            quey["query"] = query;
            this.rw.setData(quey);
            delete this.rw.getListeners()["success"];
            this.rw.addEventListener(new Orders.Orders$0(this, r), "success");
            this.rw.setUrl(/* replace */ this.rw.getUrl().split("/order/query").join("/order/update"));
            this.rw.execute();
        };
        tc.actions.push(redeem);
        tc.selectable = true;
        this.listPanel.setTitle("Orders");
        this.listPanel.setIcon("fa-list");
        this.listPanel.getBody().addChild(this.rtable);
        this.list.addChild(this.listPanel);
        this.rtable.getTable().setConfig(tc);
        this.rtable.getTable().setCellRenderer(new Orders.Orders$1(this));
        this.rtable.addChild(this.rw);
        this.rw.setUrl("http://localhost/cart/admin/index.php?route=myspace/order/query&user_token=" + token);
        let quey = new Object();
        quey["query"] = "select op.order_product_id, op.order_id, o.invoice_no, o.firstname, o.lastname, concat(o.firstname,\' \',  o.lastname) as username, o.email,o.telephone, op.product_id, op.name, op.model, op.quantity, op.price, op.total, op.tax, op.reward, p.vendor_id, op.status FROM oc_order_product op, oc_product p, oc_order o WHERE op.product_id = p.product_id AND op.order_id = o.order_id AND p.vendor_id=%vendor_id%";
        this.rw.setData(quey);
        this.rw.addEventListener(new Orders.Orders$2(this), "success");
    }
    start() {
        this.rw.execute();
    }
    /*private*/ createCol(name, label, numeric) {
        let col = new TableConfig.Column();
        col.dataType = numeric ? "numeric" : "text";
        col.label = label;
        col.name = name;
        col.sortable = true;
        return col;
    }
    /*private*/ createAction(name, label, icon) {
        let act = new TableConfig.Action();
        act.label = label;
        act.name = name;
        act.icon = icon;
        return act;
    }
}
Orders["__class"] = "framework.components.opencart.Orders";
Orders["__interfaces"] = ["framework.components.api.Renderable"];
(function (Orders) {
    class Orders$0 {
        constructor(__parent, r) {
            this.r = r;
            this.__parent = __parent;
        }
        /**
         *
         * @param {*} source
         * @param {Event} evt
         */
        performAction(source, evt) {
            this.r.setValue("status", "Ask Redeem");
        }
    }
    Orders.Orders$0 = Orders$0;
    Orders$0["__interfaces"] = ["framework.components.api.EventListener"];
    class Orders$1 {
        constructor(__parent) {
            this.__parent = __parent;
        }
        /**
         *
         * @param {Table} table
         * @param {*} td
         * @param {*} obj
         * @param {Object} rowData
         * @param {TableConfig.Column} col
         */
        renderCell(table, td, obj, rowData, col) {
            if (obj != null) {
                td.setHtml(obj.toString());
                if (col.name === "status") {
                    if (obj === "new") {
                        td.setHtml("New");
                    }
                    else if (obj === "toredeem") {
                        td.setHtml("Ask Redeem");
                    }
                }
            }
            else {
                td.setHtml("");
            }
            if (col.dataType === "numeric") {
                td.addClass("text-right");
            }
            else {
                td.addClass("text-left");
            }
        }
    }
    Orders.Orders$1 = Orders$1;
    Orders$1["__interfaces"] = ["framework.components.opencart.CellRenderer"];
    class Orders$2 {
        constructor(__parent) {
            this.__parent = __parent;
        }
        /**
         *
         * @param {*} source
         * @param {Event} evt
         */
        performAction(source, evt) {
            let dat = evt["data"];
            this.__parent.rtable.getTable().setData(dat);
            this.__parent.rtable.getTable().refresh();
            this.__parent.rtable.setRendered(false);
            source.getRoot().render();
        }
    }
    Orders.Orders$2 = Orders$2;
    Orders$2["__interfaces"] = ["framework.components.api.EventListener"];
})(Orders || (Orders = {}));
class PageHeader extends JSContainer {
    constructor(name) {
        super(name, "div");
        /*private*/ this.title = new JSContainer("title", "h1");
        /*private*/ this.buttons = new JSContainer("buttons", "div").addClass("pull-right");
        /*private*/ this.breadcrumbs = new JSContainer("breadcrumbs", "ul").addClass("breadcrumb");
        this.addClass("page-header");
        let fluid = new JSContainer("fluid", "div").addClass("container-fluid");
        this.addChild(fluid);
        fluid.addChild(this.buttons);
        fluid.addChild(this.title);
        fluid.addChild(this.breadcrumbs);
        let hmme = new JSContainer("home", "a").setAttribute("href", Util.getPath("common/dashboard"));
        hmme.setHtml("Home");
        this.breadcrumbs.addChild(new JSContainer("li").addChild(hmme));
    }
    setTitle(title) {
        this.title.setHtml(title);
    }
    addBreadcrumb(title, route) {
        let hmme = new JSContainer("", "a").setAttribute("href", Util.getPath(route));
        hmme.setHtml(title);
        this.breadcrumbs.addChild(new JSContainer("li").addChild(hmme));
    }
    addButton(name, title, icon) {
        let btn = new Button(name, icon, title);
        this.buttons.addChild(btn);
        return btn;
    }
}
PageHeader["__class"] = "framework.components.opencart.PageHeader";
PageHeader["__interfaces"] = ["framework.components.api.Renderable"];
class Panel extends JSContainer {
    constructor(name) {
        super(name, "div");
        /*private*/ this.heading = new JSContainer("heading", "div");
        /*private*/ this.title = new JSContainer("title", "h3");
        /*private*/ this.icon = new JSContainer("icon", "i");
        /*private*/ this.uititle = new JSContainer("uititle", "span");
        /*private*/ this.body = new JSContainer("body", "div");
        /*private*/ this.footer = new JSContainer("footer", "div");
        this.addClass("panel");
        this.addClass("panel-default");
        this.heading.addClass("panel-heading");
        this.title.addClass("panel-title");
        this.title.addChild(this.icon);
        this.title.addChild(this.uititle);
        this.heading.addChild(this.title);
        this.addChild(this.heading);
        this.body.addClass("panel-body");
        this.addChild(this.body);
        this.footer.addClass("panel-footer");
        this.addChild(this.footer);
    }
    setTitle(title) {
        this.uititle.setHtml(title);
    }
    setIcon(icon) {
        this.icon.setAttribute("class", "fa " + icon);
    }
    getHeading() {
        return this.heading;
    }
    getBody() {
        return this.body;
    }
    getFooter() {
        return this.footer;
    }
}
Panel["__class"] = "framework.components.opencart.Panel";
Panel["__interfaces"] = ["framework.components.api.Renderable"];
class Products extends JSContainer {
    constructor(name) {
        super(name, "div");
        /*private*/ this.header = new PageHeader("header");
        /*private*/ this.content = new JSContainer("conten", "div").addClass("container-fluid");
        /*private*/ this.table = new ResponsiveTable("list");
        /*private*/ this.rest = new RestWebservice();
        /*private*/ this.listPanel = new Panel("listPanel");
        /*private*/ this.formPanel = new Panel("formPanel");
        /*private*/ this.formTabs = new Tabs("formTabs");
        /*private*/ this.generalForm = new Form("form");
        /*private*/ this.layout = new CardLayout("layout", "div");
        /*private*/ this.formHydrated = false;
        this.addChild(this.header);
        this.addChild(this.content);
        this.header.setTitle("Courses");
        this.header.addBreadcrumb("Courses", "myspace/product");
        this.content.addChild(this.layout);
        let listItem = new CardLayoutItem("list", "div");
        this.layout.addItem(listItem);
        listItem.addChild(this.listPanel);
        this.listPanel.setTitle("Product List");
        this.listPanel.setIcon("fa-list");
        this.listPanel.getBody().addChild(this.table);
        this.buildTable();
        let formItem = new CardLayoutItem("form", "div");
        this.layout.addItem(formItem);
        this.formPanel.setTitle("Products");
        this.formPanel.getBody().addChild(this.formTabs);
        formItem.addChild(this.formPanel);
        this.buildForm();
        this.addChild(this.rest);
        this.rest.setUrl(Util.getPath("myspace/product/restlist"));
        this.rest.addEventListener(new Products.Products$0(this), "success");
        this.setButtons();
    }
    start() {
        this.rest.execute();
    }
    openForm() {
        this.layout.activate("form");
        if (!this.formHydrated) {
            this.hydrateForm();
            this.formHydrated = true;
        }
    }
    hydrateForm() {
        this.rest.setUrl(Util.getPath("myspace/product/getcategories"));
        delete this.rest.getListeners()["success"];
        let select = this.generalForm.getFormGroup("model").getInput();
        this.rest.addEventListener(new Products.Products$1(this, select), "success");
        this.rest.execute();
    }
    openList(data) {
        this.table.getTable().setData(data);
        this.table.getTable().refresh();
        this.layout.activate("list");
    }
    buildForm() {
        this.formTabs.addTab("general", "General");
        this.formTabs.addTab("image", "Image");
        this.generalForm.addField$java_lang_String$java_lang_String$java_lang_String$boolean("name", "Product Name", "text", true);
        this.generalForm.addField$java_lang_String$java_lang_String$java_lang_String$boolean("description", "Description", "textarea", false);
        this.generalForm.addField$java_lang_String$java_lang_String$java_lang_String$boolean("price", "Price", FormConfig.NUMBER_TYPE, true);
        this.generalForm.addField$java_lang_String$java_lang_String$java_lang_String$boolean("model", "Model", FormConfig.SELECT_TYPE, true);
        this.generalForm.addField$java_lang_String$java_lang_String$java_lang_String$boolean("category", "Category", FormConfig.SELECT_TYPE, true);
        this.generalForm.addField$java_lang_String$java_lang_String$java_lang_String$boolean("image", "Image", FormConfig.CLOUDINARY_TYPE, false);
        let clin = this.generalForm.getFormGroup("image").getInput();
        clin.getUploader().setCloudName("dtpreqd3y");
        clin.getUploader().setUnsignedUploadPreset("yx0uopqx");
        let select = this.generalForm.getFormGroup("model").getInput();
        select.addEventListener(new Products.Products$2(this, select), "change");
        this.formTabs.getPane("general").addChild(this.generalForm);
    }
    buildTable() {
        let image = new TableConfig.Column();
        image.label = "Image";
        image.name = "image";
        let name = new TableConfig.Column();
        name.label = "Product Name";
        name.name = "name";
        let model = new TableConfig.Column();
        model.label = "Model";
        model.name = "model";
        let price = new TableConfig.Column();
        price.label = "Price";
        price.name = "price";
        price.dataType = "currency";
        let status = new TableConfig.Column();
        status.label = "Status";
        status.name = "status";
        let config = new TableConfig();
        config.columns.push(image, name, model, price, status);
        let action = new TableConfig.Action();
        action.icon = "fa-pencil";
        action.label = "Edit";
        action.name = "edit";
        action.event = (a, b, c) => {
            let r = b;
            let data = r.getData();
            let id = data["product_id"].toString();
            let quey = new Object();
            quey["product_id"] = id;
            this.rest.setData(quey);
            this.rest.setUrl(Util.getPath("myspace/product/restget"));
            delete this.rest.getListeners()["success"];
            this.rest.addEventListener(new Products.Products$3(this), "success");
            this.rest.execute();
        };
        config.actions.push(action);
        this.table.getTable().setConfig(config);
        let defrend = new Table.DefaultCellRenderer();
        this.table.getTable().setCellRenderer(new Products.Products$4(this, defrend));
    }
    setButtons() {
        let addNew = this.header.addButton("addNew", "Add New", "fa-plus");
        addNew.addEventListener(new Products.Products$5(this), "click");
        addNew.setStyle("margin-right", "1rem");
        let __delete = this.header.addButton("delete", "Delete", "fa-trash-o");
        __delete.addEventListener(new Products.Products$6(this), "click");
    }
}
Products["__class"] = "framework.components.opencart.Products";
Products["__interfaces"] = ["framework.components.api.Renderable"];
(function (Products) {
    class Products$0 {
        constructor(__parent) {
            this.__parent = __parent;
        }
        /**
         *
         * @param {*} source
         * @param {Event} evt
         */
        performAction(source, evt) {
            let res = evt["data"];
            this.__parent.openList(res);
        }
    }
    Products.Products$0 = Products$0;
    Products$0["__interfaces"] = ["framework.components.api.EventListener"];
    class Products$1 {
        constructor(__parent, select) {
            this.select = select;
            this.__parent = __parent;
        }
        /**
         *
         * @param {*} source
         * @param {Event} evt
         */
        performAction(source, evt) {
            let data = evt["data"];
            this.select.setOptions(data);
        }
    }
    Products.Products$1 = Products$1;
    Products$1["__interfaces"] = ["framework.components.api.EventListener"];
    class Products$2 {
        constructor(__parent, select) {
            this.select = select;
            this.__parent = __parent;
        }
        /**
         *
         * @param {*} source
         * @param {Event} evt
         */
        performAction(source, evt) {
            this.__parent.rest.setUrl(Util.getPath("myspace/product/getsubcategories"));
            let catId = this.select.getValue();
            let params = new Object();
            params["category_id"] = catId;
            this.__parent.rest.setData(params);
            delete this.__parent.rest.getListeners()["success"];
            this.__parent.rest.addEventListener(new Products$2.Products$2$0(this), "success");
            this.__parent.rest.execute();
        }
    }
    Products.Products$2 = Products$2;
    Products$2["__interfaces"] = ["framework.components.api.EventListener"];
    (function (Products$2) {
        class Products$2$0 {
            constructor(__parent) {
                this.__parent = __parent;
            }
            /**
             *
             * @param {*} source
             * @param {Event} evt
             */
            performAction(source, evt) {
                let cat = this.__parent.__parent.generalForm.getFormGroup("category").getInput();
                let data = evt["data"];
                cat.setOptions(data);
            }
        }
        Products$2.Products$2$0 = Products$2$0;
        Products$2$0["__interfaces"] = ["framework.components.api.EventListener"];
    })(Products$2 = Products.Products$2 || (Products.Products$2 = {}));
    class Products$3 {
        constructor(__parent) {
            this.__parent = __parent;
        }
        /**
         *
         * @param {*} source
         * @param {Event} evt
         */
        performAction(source, evt) {
            alert(JSON.stringify(evt["data"]));
        }
    }
    Products.Products$3 = Products$3;
    Products$3["__interfaces"] = ["framework.components.api.EventListener"];
    class Products$4 {
        constructor(__parent, defrend) {
            this.defrend = defrend;
            this.__parent = __parent;
        }
        /**
         *
         * @param {Table} table
         * @param {*} td
         * @param {*} value
         * @param {Object} rowData
         * @param {TableConfig.Column} column
         */
        renderCell(table, td, value, rowData, column) {
            if (column.name === "image") {
                if (value != null) {
                    td.setHtml("");
                    let img = new JSContainer("img");
                    if ((value.toString().indexOf("cloudinary:") != -1)) {
                        img = new CloudinaryImage(/* replace */ value.toString().split("cloudinary:").join(""));
                        img.setWidth(40);
                        img.setHeight(40);
                        img.refresh();
                    }
                    else {
                        let url = window.location.origin + window.location.pathname;
                        url = url.split("/admin/index.php").join("/image/cache/") + value.toString().split(".jpg").join("-40x40.jpg");
                        img.setAttribute("src", url);
                    }
                    img.addClass("img-thumbnail");
                    td.addChild(img);
                }
            }
            else if (column.name === "status") {
                if (value.toString() === "1") {
                    td.setHtml("Online");
                }
                else {
                    td.setHtml("Offline");
                }
            }
            else {
                this.defrend.renderCell(table, td, value, rowData, column);
            }
        }
    }
    Products.Products$4 = Products$4;
    Products$4["__interfaces"] = ["framework.components.opencart.CellRenderer"];
    class Products$5 {
        constructor(__parent) {
            this.__parent = __parent;
        }
        /**
         *
         * @param {*} source
         * @param {Event} evt
         */
        performAction(source, evt) {
            this.__parent.openForm();
        }
    }
    Products.Products$5 = Products$5;
    Products$5["__interfaces"] = ["framework.components.api.EventListener"];
    class Products$6 {
        constructor(__parent) {
            this.__parent = __parent;
        }
        /**
         *
         * @param {*} source
         * @param {Event} evt
         */
        performAction(source, evt) {
            if (confirm("Are you sure you want to delete the selected items?")) {
                let selected = this.__parent.table.getTable().getSelected();
                let selectedIds = (new Array());
                for (let index148 = 0; index148 < selected.length; index148++) {
                    let item = selected[index148];
                    {
                        let status = item["status"].toString();
                        if (status === "requested") {
                            selectedIds.push(item["redemption_id"]);
                        }
                    }
                }
                if (selectedIds.length > 0) {
                    let data = new Object();
                    data["items"] = selectedIds;
                    this.__parent.rest.setData(data);
                    this.__parent.rest.setUrl(Util.getPath("myspace/product/delete"));
                    this.__parent.rest.setMethod("POST");
                    delete this.__parent.rest.getListeners()["success"];
                    this.__parent.rest.addEventListener(new Products$6.Products$6$0(this), "success");
                    this.__parent.rest.execute();
                }
            }
        }
    }
    Products.Products$6 = Products$6;
    Products$6["__interfaces"] = ["framework.components.api.EventListener"];
    (function (Products$6) {
        class Products$6$0 {
            constructor(__parent) {
                this.__parent = __parent;
            }
            /**
             *
             * @param {*} source
             * @param {Event} evt
             */
            performAction(source, evt) {
                let res = evt["data"];
                this.__parent.__parent.openList(res);
            }
        }
        Products$6.Products$6$0 = Products$6$0;
        Products$6$0["__interfaces"] = ["framework.components.api.EventListener"];
    })(Products$6 = Products.Products$6 || (Products.Products$6 = {}));
})(Products || (Products = {}));
class ProgressBar extends JSContainer {
    constructor(name) {
        super(name, "div");
        /*private*/ this.progressBar = new JSContainer("div").addClass("progress-bar");
        this.addClass("progress");
        this.addChild(this.progressBar);
        this.setAttribute("identifier", "bootstrap:progress-bar");
        this.setAttribute("aria-valuemin", "0").setAttribute("aria-valuemax", "100").setAttribute("aria-valuenow", "0");
    }
    setProgress(percent) {
        this.progressBar.setStyle("width", percent + "%");
        this.progressBar.setHtml(percent + "%");
        this.progressBar.setAttribute("aria-valuenow", percent + "");
    }
}
ProgressBar["__class"] = "framework.components.opencart.ProgressBar";
ProgressBar["__interfaces"] = ["framework.components.api.Renderable"];
class Redemptions extends JSContainer {
    constructor(name) {
        super(name, "div");
        /*private*/ this.header = new PageHeader("header");
        /*private*/ this.content = new JSContainer("conten", "div").addClass("container-fluid");
        /*private*/ this.table = new ResponsiveTable("list");
        /*private*/ this.rest = new RestWebservice();
        /*private*/ this.listPanel = new Panel("listPanel");
        /*private*/ this.formPanel = new Panel("formPanel");
        /*private*/ this.form = new Form("form");
        /*private*/ this.listRow = new JSContainer("div").addClass("row");
        /*private*/ this.tilesRow = new JSContainer("div").addClass("row");
        /*private*/ this.totalSales = new Tile("totalSales");
        /*private*/ this.totalRedeems = new Tile("totalRedeems");
        /*private*/ this.totalPosted = new Tile("totalPosted");
        /*private*/ this.totalCredits = new Tile("totalCredits");
        /*private*/ this.layout = new CardLayout("layout", "div");
        this.addChild(this.header);
        this.addChild(this.content);
        this.header.setTitle("Redemptions");
        this.header.addBreadcrumb("Redemptions", "myspace/redemptions");
        this.setButtons();
        this.content.addChild(this.tilesRow).addChild(this.listRow);
        this.buildDashboard();
        this.listRow.addChild(this.layout);
        let listItem = new CardLayoutItem("list", "div");
        this.layout.addItem(listItem);
        listItem.addChild(this.listPanel);
        this.listPanel.setTitle("Redemption List");
        this.listPanel.setIcon("fa-list");
        this.listPanel.getBody().addChild(this.table);
        this.buildTable();
        let formItem = new CardLayoutItem("form", "div");
        this.layout.addItem(formItem);
        this.formPanel.setTitle("Redemption");
        this.formPanel.getBody().addChild(this.form);
        formItem.addChild(this.formPanel);
        this.buildForm();
        this.addChild(this.rest);
        this.rest.setUrl(Util.getPath("myspace/redemptions/query"));
        this.rest.addEventListener(new Redemptions.Redemptions$0(this), "success");
    }
    list(res) {
        let totals = res["totals"];
        this.totalSales.setBody("fa-shopping-cart", totals["sales"].toFixed(2));
        this.totalRedeems.setBody("fa-credit-card", totals["redeem"].toFixed(2));
        this.totalCredits.setBody("fa-credit-card", totals["credit"].toFixed(2));
        this.totalPosted.setBody("fa-credit-card", totals["posted"].toFixed(2));
        let data = res["list"];
        this.table.getTable().setData(data);
        this.table.setRendered(false);
        this.table.getTable().refresh();
    }
    start() {
        this.layout.activate("list");
        this.rest.execute();
    }
    buildForm() {
        let config = new FormConfig();
        config.label = "Redemption";
        this.form.setConfig(config);
        this.form.addField$java_lang_String$java_lang_String$java_lang_String$boolean("amount", "Amount", FormConfig.NUMBER_TYPE, true);
        this.form.addField$java_lang_String$java_lang_String$java_lang_String$boolean("accountName", "Name on check", FormConfig.TEXT_TYPE, true);
        this.formPanel.getFooter().addChild(new Button("save", "fa-save", "Save").setStyle("margin-right", "1rem").addEventListener(new Redemptions.Redemptions$1(this), "click"));
        this.formPanel.getFooter().addChild(new Button("cancel", "fa-reply", "Cancel").addEventListener(new Redemptions.Redemptions$2(this), "click"));
    }
    setButtons() {
        let addNew = this.header.addButton("addNew", "Add New", "fa-plus");
        addNew.addEventListener(new Redemptions.Redemptions$3(this), "click");
        addNew.setStyle("margin-right", "1rem");
        let __delete = this.header.addButton("delete", "Delete", "fa-trash-o");
        __delete.addEventListener(new Redemptions.Redemptions$4(this), "click");
    }
    /*private*/ buildDashboard() {
        let cell1 = new JSContainer("div").addClass("col-lg-3 col-md-3 col-sm-6");
        let cell2 = new JSContainer("div").addClass("col-lg-3 col-md-3 col-sm-6");
        let cell3 = new JSContainer("div").addClass("col-lg-3 col-md-3 col-sm-6");
        let cell4 = new JSContainer("div").addClass("col-lg-3 col-md-3 col-sm-6");
        this.tilesRow.addChild(cell1.addChild(this.totalSales)).addChild(cell2.addChild(this.totalRedeems)).addChild(cell3.addChild(this.totalPosted)).addChild(cell4.addChild(this.totalCredits));
        this.totalSales.setHeading("Sales", "");
        this.totalSales.setBody("fa-shopping-cart", "500");
        this.totalRedeems.setHeading("Total Redeem Requested", "");
        this.totalRedeems.setBody("fa-credit-card", "200");
        this.totalPosted.setHeading("Total Redeem Posted", "");
        this.totalPosted.setBody("fa-credit-card", "200");
        this.totalCredits.setHeading("Total Credits", "");
        this.totalCredits.setBody("fa-credit-card", "200");
    }
    /*private*/ buildTable() {
        let con = new TableConfig();
        con.selectable = true;
        con.columns.push(this.createCol("redemption_id", "Id", true));
        con.columns.push(this.createCol("account_name", "Name on check", false));
        con.columns.push(this.createCol("amount", "Amount", true));
        con.columns.push(this.createCol("status", "Status", false));
        this.table.getTable().setConfig(con);
    }
    /*private*/ createCol(name, title, numeric) {
        let col = new TableConfig.Column();
        col.label = title;
        col.name = name;
        col.dataType = numeric ? "numeric" : "text";
        if (name === "amount") {
            col.dataType = "currency";
        }
        return col;
    }
}
Redemptions["__class"] = "framework.components.opencart.Redemptions";
Redemptions["__interfaces"] = ["framework.components.api.Renderable"];
(function (Redemptions) {
    class Redemptions$0 {
        constructor(__parent) {
            this.__parent = __parent;
        }
        /**
         *
         * @param {*} source
         * @param {Event} evt
         */
        performAction(source, evt) {
            let res = evt["data"];
            this.__parent.list(res);
        }
    }
    Redemptions.Redemptions$0 = Redemptions$0;
    Redemptions$0["__interfaces"] = ["framework.components.api.EventListener"];
    class Redemptions$1 {
        constructor(__parent) {
            this.__parent = __parent;
        }
        /**
         *
         * @param {*} source
         * @param {Event} evt
         */
        performAction(source, evt) {
            let data = this.__parent.form.getFormData();
            this.__parent.rest.setData(data);
            this.__parent.rest.setMethod("POST");
            this.__parent.rest.setUrl(Util.getPath("myspace/redemptions/add"));
            delete this.__parent.rest.getListeners()["success"];
            this.__parent.rest.addEventListener(new Redemptions$1.Redemptions$1$0(this), "success");
            this.__parent.rest.execute();
        }
    }
    Redemptions.Redemptions$1 = Redemptions$1;
    Redemptions$1["__interfaces"] = ["framework.components.api.EventListener"];
    (function (Redemptions$1) {
        class Redemptions$1$0 {
            constructor(__parent) {
                this.__parent = __parent;
            }
            /**
             *
             * @param {*} source
             * @param {Event} evt
             */
            performAction(source, evt) {
                let res = evt["data"];
                this.__parent.__parent.list(res);
                this.__parent.__parent.layout.activate("list");
                this.__parent.__parent.tilesRow.setStyle("display", null);
            }
        }
        Redemptions$1.Redemptions$1$0 = Redemptions$1$0;
        Redemptions$1$0["__interfaces"] = ["framework.components.api.EventListener"];
    })(Redemptions$1 = Redemptions.Redemptions$1 || (Redemptions.Redemptions$1 = {}));
    class Redemptions$2 {
        constructor(__parent) {
            this.__parent = __parent;
        }
        /**
         *
         * @param {*} source
         * @param {Event} evt
         */
        performAction(source, evt) {
            this.__parent.layout.activate("list");
            this.__parent.tilesRow.setStyle("display", null);
        }
    }
    Redemptions.Redemptions$2 = Redemptions$2;
    Redemptions$2["__interfaces"] = ["framework.components.api.EventListener"];
    class Redemptions$3 {
        constructor(__parent) {
            this.__parent = __parent;
        }
        /**
         *
         * @param {*} source
         * @param {Event} evt
         */
        performAction(source, evt) {
            this.__parent.layout.activate("form");
            this.__parent.tilesRow.setStyle("display", "none");
        }
    }
    Redemptions.Redemptions$3 = Redemptions$3;
    Redemptions$3["__interfaces"] = ["framework.components.api.EventListener"];
    class Redemptions$4 {
        constructor(__parent) {
            this.__parent = __parent;
        }
        /**
         *
         * @param {*} source
         * @param {Event} evt
         */
        performAction(source, evt) {
            if (confirm("Are you sure you want to delete the selected items?")) {
                let selected = this.__parent.table.getTable().getSelected();
                let selectedIds = (new Array());
                for (let index149 = 0; index149 < selected.length; index149++) {
                    let item = selected[index149];
                    {
                        let status = item["status"].toString();
                        if (status === "requested") {
                            selectedIds.push(item["redemption_id"]);
                        }
                    }
                }
                if (selectedIds.length > 0) {
                    let data = new Object();
                    data["items"] = selectedIds;
                    this.__parent.rest.setData(data);
                    this.__parent.rest.setUrl(Util.getPath("myspace/redemptions/delete"));
                    this.__parent.rest.setMethod("POST");
                    delete this.__parent.rest.getListeners()["success"];
                    this.__parent.rest.addEventListener(new Redemptions$4.Redemptions$4$0(this), "success");
                    this.__parent.rest.execute();
                }
            }
        }
    }
    Redemptions.Redemptions$4 = Redemptions$4;
    Redemptions$4["__interfaces"] = ["framework.components.api.EventListener"];
    (function (Redemptions$4) {
        class Redemptions$4$0 {
            constructor(__parent) {
                this.__parent = __parent;
            }
            /**
             *
             * @param {*} source
             * @param {Event} evt
             */
            performAction(source, evt) {
                let res = evt["data"];
                this.__parent.__parent.list(res);
            }
        }
        Redemptions$4.Redemptions$4$0 = Redemptions$4$0;
        Redemptions$4$0["__interfaces"] = ["framework.components.api.EventListener"];
    })(Redemptions$4 = Redemptions.Redemptions$4 || (Redemptions.Redemptions$4 = {}));
})(Redemptions || (Redemptions = {}));
class ResponsiveTable extends JSContainer {
    constructor(name) {
        super(name, "div");
        /*private*/ this.table = new Table("table");
        this.addChild(this.table);
    }
    getTable() {
        return this.table;
    }
}
ResponsiveTable["__class"] = "framework.components.opencart.ResponsiveTable";
ResponsiveTable["__interfaces"] = ["framework.components.api.Renderable"];
class ServerAction {
}
ServerAction["__class"] = "framework.components.opencart.ServerAction";
class Table extends JSContainer {
    constructor(name) {
        super(name, "table");
        /*private*/ this.head = new JSContainer("head", "thead");
        /*private*/ this.body = new JSContainer("body", "tbody");
        /*private*/ this.headerRow = new JSContainer("header-row", "tr");
        /*private*/ this.selectHeaderCell = new JSContainer("select-head-cell", "td");
        /*private*/ this.headerCheckBox = new input.JSCheckBox("header-checkbox");
        /*private*/ this.data_ = (new Array());
        /*private*/ this.cellRenderer = new Table.DefaultCellRenderer();
        if (this.config === undefined)
            this.config = null;
        this.addClass("table");
        this.addClass("table-bordered");
        this.addClass("table-hover");
        this.addChild(this.head);
        this.addChild(this.body);
        this.selectHeaderCell.addClass("text-center").setStyle("width", "1px");
        this.selectHeaderCell.addChild(this.headerCheckBox);
        this.headerCheckBox.addEventListener(new Table.Table$0(this), "change");
    }
    setSelectAll(b) {
        {
            let array151 = this.body.getChildren();
            for (let index150 = 0; index150 < array151.length; index150++) {
                let r = array151[index150];
                {
                    let row = r;
                    row.setSelected(b);
                }
            }
        }
    }
    getSelected() {
        let result = (new Array());
        {
            let array153 = this.body.getChildren();
            for (let index152 = 0; index152 < array153.length; index152++) {
                let r = array153[index152];
                {
                    let row = r;
                    if (row.isSelected()) {
                        result.push(row.getData());
                    }
                }
            }
        }
        return result;
    }
    getCellRenderer() {
        return this.cellRenderer;
    }
    setCellRenderer(cellRenderer) {
        this.cellRenderer = cellRenderer;
    }
    getHead() {
        return this.head;
    }
    getBody() {
        return this.body;
    }
    getConfig() {
        return this.config;
    }
    setConfig(config) {
        this.config = config;
    }
    refresh() {
        this.head.clearChildren();
        this.body.clearChildren();
        this.headerRow.clearChildren();
        this.head.addChild(this.headerRow);
        if (this.config.selectable) {
            this.headerRow.addChild(this.selectHeaderCell);
        }
        for (let index154 = 0; index154 < this.config.columns.length; index154++) {
            let col = this.config.columns[index154];
            {
                let hcol = new Table.TableHeaderColumn(this, col);
                this.headerRow.addChild(hcol);
            }
        }
        if (this.config.actions.length > 0) {
            let tdact = new JSContainer("td").addClass("text-right").setHtml("Action");
            this.headerRow.addChild(tdact);
        }
        for (let index155 = 0; index155 < this.data_.length; index155++) {
            let row = this.data_[index155];
            {
                let r = new Table.TableRow(this, this, row, this.config);
                this.body.addChild(r);
            }
        }
    }
    setData(data) {
        this.data_ = data;
    }
}
Table["__class"] = "framework.components.opencart.Table";
Table["__interfaces"] = ["framework.components.api.Renderable"];
(function (Table) {
    class TableAction extends JSContainer {
        constructor(__parent, config) {
            super("td");
            this.__parent = __parent;
            if (this.config === undefined)
                this.config = null;
            this.btgroup = new JSContainer("btns", "div").addClass("btn-group");
            this.addClass("text-right");
            this.config = config;
            this.addChild(this.btgroup);
            let firstAct = this.createBtn(this.config.actions[0], false);
            this.btgroup.addChild(firstAct);
            if (this.config.actions.length === 2) {
                let secondAct = this.createBtn(this.config.actions[1], false);
                this.btgroup.addChild(secondAct);
            }
            if (this.config.actions.length > 2) {
                let btn = new JSContainer("mnu", "button");
                btn.addClass("btn btn-primary dropdown-toggle");
                btn.setAttribute("data-toggle", "button");
                btn.setHtml("<span class=\"caret\"></span>");
                this.btgroup.addChild(btn);
                let ul = new JSContainer("mn", "ul");
                ul.addClass("dropdown-menu dropdown-menu-right");
                this.btgroup.addChild(ul);
                for (let i = 2; i < this.config.actions.length; i++) {
                    {
                        let li = new JSContainer("li");
                        ul.addChild(li);
                        let item = this.createBtn(this.config.actions[i], true);
                        li.addChild(item);
                    }
                    ;
                }
            }
        }
        createBtn(act, isMenu) {
            let btn = new JSContainer(act.name, "a");
            if (!isMenu) {
                btn.addClass("btn btn-primary");
            }
            btn.setAttribute("href", "javascript:void(0);");
            let html = "<i class=\"fa " + act.icon + "\"></i>";
            if (isMenu) {
                html = html + act.label;
            }
            btn.setHtml(html);
            btn.addEventListener(new TableAction.TableAction$0(this, act), "click");
            return btn;
        }
    }
    Table.TableAction = TableAction;
    TableAction["__class"] = "framework.components.opencart.Table.TableAction";
    TableAction["__interfaces"] = ["framework.components.api.Renderable"];
    (function (TableAction) {
        class TableAction$0 {
            constructor(__parent, act) {
                this.act = act;
                this.__parent = __parent;
            }
            /**
             *
             * @param {*} source
             * @param {Event} evt
             */
            performAction(source, evt) {
                let fn = this.act.event;
                let ro = (source.getAncestorWithClass("trow"));
                fn.call(source, (source.getAncestorWithClass("table")), ro);
            }
        }
        TableAction.TableAction$0 = TableAction$0;
        TableAction$0["__interfaces"] = ["framework.components.api.EventListener"];
    })(TableAction = Table.TableAction || (Table.TableAction = {}));
    class TableRow extends JSContainer {
        constructor(__parent, table, data, config) {
            super("", "tr");
            this.__parent = __parent;
            this.cb = new input.JSCheckBox("cb");
            if (this.data_ === undefined)
                this.data_ = null;
            if (this.config_ === undefined)
                this.config_ = null;
            if (this.table_ === undefined)
                this.table_ = null;
            this.addClass("trow");
            this.config_ = config;
            this.data_ = data;
            this.table_ = table;
            if (this.config_.selectable) {
                let firstcol = new JSContainer("td").addClass("text-center");
                firstcol.addChild(this.cb);
                firstcol.setStyle("width", "1px");
                this.addChild(firstcol);
            }
            for (let index156 = 0; index156 < this.config_.columns.length; index156++) {
                let col = this.config_.columns[index156];
                {
                    let td = new JSContainer(col.name, "td");
                    this.addChild(td);
                    let name = col.name;
                    let obj = data[name];
                    if (__parent.cellRenderer != null) {
                        __parent.cellRenderer.renderCell(table, td, obj, this.data_, col);
                    }
                }
            }
            if (this.config_.actions.length > 0) {
                let act = new Table.TableAction(this.__parent, this.config_);
                this.addChild(act);
            }
        }
        setValue(field, value) {
            if (value != null) {
                this.data_[field] = value;
            }
            else {
                delete this.data_[field];
            }
            for (let index157 = 0; index157 < this.config_.columns.length; index157++) {
                let col = this.config_.columns[index157];
                {
                    if (col.name === field) {
                        if (this.table_.cellRenderer != null) {
                            let td = this.getChild(field);
                            this.table_.cellRenderer.renderCell(this.table_, td, value, this.data_, col);
                        }
                    }
                }
            }
        }
        getData() {
            return this.data_;
        }
        isSelected() {
            return this.cb.isChecked();
        }
        setSelected(b) {
            this.cb.setChecked(b);
        }
    }
    Table.TableRow = TableRow;
    TableRow["__class"] = "framework.components.opencart.Table.TableRow";
    TableRow["__interfaces"] = ["framework.components.api.Renderable"];
    class TableHeaderColumn extends JSContainer {
        constructor(__parent, column) {
            super(column.name, "td");
            this.__parent = __parent;
            if (this.column_ === undefined)
                this.column_ = null;
            this.inside = new JSContainer("inside", "a");
            this.sortdir = 0;
            this.column_ = column;
            this.addChild(this.inside);
            this.inside.setAttribute("href", "javascript:void(0);");
            this.inside.setHtml(this.column_.label);
            if (this.column_.dataType === "numeric" || this.column_.dataType === "currency") {
                this.addClass("text-right");
            }
            else {
                this.addClass("text-left");
            }
            if (this.column_.sortable) {
                this.inside.addEventListener(new TableHeaderColumn.TableHeaderColumn$0(this), "click");
            }
        }
        clearSort() {
            this.sortdir = 0;
            this.inside.removeClass("asc").removeClass("desc");
        }
    }
    Table.TableHeaderColumn = TableHeaderColumn;
    TableHeaderColumn["__class"] = "framework.components.opencart.Table.TableHeaderColumn";
    TableHeaderColumn["__interfaces"] = ["framework.components.api.Renderable"];
    (function (TableHeaderColumn) {
        class TableHeaderColumn$0 {
            constructor(__parent) {
                this.__parent = __parent;
            }
            /**
             *
             * @param {*} source
             * @param {Event} evt
             */
            performAction(source, evt) {
                this.__parent.inside.removeClass("asc").removeClass("desc");
                let renders = this.__parent.__parent.headerRow.getChildren();
                for (let index158 = 0; index158 < renders.length; index158++) {
                    let r = renders[index158];
                    {
                        if (r != null && r instanceof Table.TableHeaderColumn) {
                            if (r.getName() !== this.__parent.getName())
                                r.clearSort();
                        }
                    }
                }
                let table = (source.getAncestorWithClass("table"));
                let sortEvent = new CustomEvent("sort");
                sortEvent["source"] = source.getParent();
                sortEvent["column"] = source.getParent();
                sortEvent["table"] = table;
                if (this.__parent.sortdir === 0 || this.__parent.sortdir === -1) {
                    this.__parent.sortdir = 1;
                    this.__parent.inside.addClass("asc");
                    sortEvent["direction"] = "asc";
                }
                else {
                    this.__parent.sortdir = -1;
                    this.__parent.inside.addClass("desc");
                    sortEvent["direction"] = "desc";
                }
                table.fireListener("sort", sortEvent);
            }
        }
        TableHeaderColumn.TableHeaderColumn$0 = TableHeaderColumn$0;
        TableHeaderColumn$0["__interfaces"] = ["framework.components.api.EventListener"];
    })(TableHeaderColumn = Table.TableHeaderColumn || (Table.TableHeaderColumn = {}));
    class DefaultCellRenderer {
        constructor() {
        }
        /**
         *
         * @param {Table} table
         * @param {*} td
         * @param {*} obj
         * @param {Object} rowData
         * @param {TableConfig.Column} col
         */
        renderCell(table, td, obj, rowData, col) {
            if (obj != null) {
                if (col.dataType === "currency") {
                    let l = parseInt(obj.toString());
                    let n = new Number(l);
                    td.setHtml(n.toFixed(2));
                }
                else {
                    td.setHtml(obj.toString());
                }
            }
            else {
                td.setHtml("");
            }
            if (col.dataType === "numeric" || col.dataType === "currency") {
                td.addClass("text-right");
            }
            else {
                td.addClass("text-left");
            }
        }
    }
    Table.DefaultCellRenderer = DefaultCellRenderer;
    DefaultCellRenderer["__class"] = "framework.components.opencart.Table.DefaultCellRenderer";
    DefaultCellRenderer["__interfaces"] = ["framework.components.opencart.CellRenderer"];
    class Table$0 {
        constructor(__parent) {
            this.__parent = __parent;
        }
        /**
         *
         * @param {*} source
         * @param {Event} evt
         */
        performAction(source, evt) {
            this.__parent.setSelectAll(this.__parent.headerCheckBox.isChecked());
        }
    }
    Table.Table$0 = Table$0;
    Table$0["__interfaces"] = ["framework.components.api.EventListener"];
})(Table || (Table = {}));
class TableConfig {
    constructor() {
        this.selectable = true;
        this.columns = (new Array());
        this.actions = (new Array());
    }
}
TableConfig["__class"] = "framework.components.opencart.TableConfig";
(function (TableConfig) {
    class Column {
        constructor() {
            if (this.name === undefined)
                this.name = null;
            if (this.label === undefined)
                this.label = null;
            if (this.dataType === undefined)
                this.dataType = null;
            if (this.sortable === undefined)
                this.sortable = false;
        }
    }
    TableConfig.Column = Column;
    Column["__class"] = "framework.components.opencart.TableConfig.Column";
    class Action {
        constructor() {
            if (this.name === undefined)
                this.name = null;
            if (this.icon === undefined)
                this.icon = null;
            if (this.label === undefined)
                this.label = null;
            if (this.event === undefined)
                this.event = null;
        }
    }
    TableConfig.Action = Action;
    Action["__class"] = "framework.components.opencart.TableConfig.Action";
})(TableConfig || (TableConfig = {}));
class Tabs extends JSContainer {
    constructor(name) {
        super(name, "div");
        /*private*/ this.navs = new JSContainer("navs", "ul").addClass("nav nav-tabs");
        /*private*/ this.content = new JSContainer("content", "div").addClass("tab-content");
        this.addChild(this.navs);
        this.addChild(this.content);
    }
    addTab(name, label) {
        let tab = new JSContainer(name, "li");
        let atab = new JSContainer(name, "a").setAttribute("href", "javascript:void(0);").setHtml(label);
        tab.addChild(atab);
        atab.addEventListener(new Tabs.Tabs$0(this), "click");
        this.navs.addChild(tab);
        let pane = new JSContainer(name, "div").addClass("tab-pane");
        this.content.addChild(pane);
    }
    activate(name) {
        this.doActivate(name, this.navs);
        this.doActivate(name, this.content);
    }
    getPane(name) {
        return this.content.getChild(name);
    }
    /*private*/ doActivate(name, parent) {
        {
            let array160 = parent.getChildren();
            for (let index159 = 0; index159 < array160.length; index159++) {
                let li = array160[index159];
                {
                    if (li.getName() !== name) {
                        if (li.hasClass("active"))
                            li.removeClass("active");
                    }
                    else {
                        if (!li.hasClass("active")) {
                            li.addClass("active");
                        }
                    }
                }
            }
        }
    }
    getNavs() {
        return this.navs;
    }
    getContent() {
        return this.content;
    }
}
Tabs["__class"] = "framework.components.opencart.Tabs";
Tabs["__interfaces"] = ["framework.components.api.Renderable"];
(function (Tabs) {
    class Tabs$0 {
        constructor(__parent) {
            this.__parent = __parent;
        }
        /**
         *
         * @param {*} source
         * @param {Event} evt
         */
        performAction(source, evt) {
            this.__parent.activate(source.getName());
        }
    }
    Tabs.Tabs$0 = Tabs$0;
    Tabs$0["__interfaces"] = ["framework.components.api.EventListener"];
})(Tabs || (Tabs = {}));
class Tile extends JSContainer {
    constructor(name) {
        super(name, "div");
        /*private*/ this.heading = new JSContainer("heading", "div").addClass("tile-heading");
        /*private*/ this.body = new JSContainer("body", "div").addClass("tile-body");
        /*private*/ this.footer = new JSContainer("foot", "div").addClass("tile-footer");
        this.addClass("tile tile-primary");
        this.addChild(this.heading);
        this.addChild(this.body);
        this.addChild(this.footer);
    }
    setHeading(left, right) {
        this.heading.setHtml(left + " <span class=\"pull-right\">" + right + "</span>");
    }
    setBody(icon, txt) {
        this.body.setHtml("<i class=\"fa " + icon + "\"></i><h2 class=\"pull-right\">" + txt + "</h2>");
    }
    setFooter(link) {
        this.footer.addChild(link);
    }
}
Tile["__class"] = "framework.components.opencart.Tile";
Tile["__interfaces"] = ["framework.components.api.Renderable"];
class Util {
    static getToken() {
        let href = window.location.href;
        let rout = "";
        if ((href.indexOf("?route") != -1)) {
            let sec = href.split("route=")[1];
            console.info(sec);
            if ((sec.indexOf("&user_token=") != -1)) {
                let parts = sec.split("&user_token=");
                rout = parts[0];
                console.info(rout);
                let token = parts[1];
                return token;
            }
        }
        return null;
    }
    static getPath(route) {
        let token = Util.getToken();
        let url = window.location.origin + window.location.pathname + "?route=" + route + "&user_token=" + token;
        return url;
    }
}
Util["__class"] = "framework.components.opencart.Util";
Boot.main(null);
