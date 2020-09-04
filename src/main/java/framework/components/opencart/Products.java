package framework.components.opencart;

import static def.dom.Globals.alert;
import static def.dom.Globals.confirm;
import static def.dom.Globals.window;
import static jsweet.util.Lang.function;

import framework.components.CardLayout;
import framework.components.CardLayoutItem;
import framework.components.JSContainer;
import framework.components.RestWebservice;
import framework.components.api.EventListener;
import framework.components.api.Renderable;
import framework.components.input.JSSelect;
import framework.components.opencart.Table.DefaultCellRenderer;
import framework.components.opencart.Table.TableRow;
import framework.components.opencart.TableConfig.Action;
import framework.components.opencart.TableConfig.Column;
import jsweet.dom.Event;
import jsweet.lang.Array;
import jsweet.lang.JSON;
import jsweet.lang.Object;

public class Products extends JSContainer {

	private PageHeader header = new PageHeader("header");

	private JSContainer content = new JSContainer("conten", "div").addClass("container-fluid");

	private ResponsiveTable table = new ResponsiveTable("list");

	private RestWebservice rest = new RestWebservice();

	private Panel listPanel = new Panel("listPanel");

	private Panel formPanel = new Panel("formPanel");
	
	
	private Tabs formTabs = new Tabs("formTabs");

	private Form generalForm = new Form("form");
	
	private CardLayout layout = new CardLayout("layout", "div");
	
	private boolean formHydrated = false;

	public Products(String name) {
		super(name, "div");

		addChild(header);
		addChild(content);
		
		header.setTitle("Courses");
		header.addBreadcrumb("Courses", "myspace/product");
		
		content.addChild(layout);
		
		CardLayoutItem listItem = new CardLayoutItem("list", "div");
		layout.addItem(listItem);
		listItem.addChild(listPanel);
		listPanel.setTitle("Product List");
		listPanel.setIcon("fa-list");
		listPanel.getBody().addChild(table);
		buildTable();
		
		CardLayoutItem formItem = new CardLayoutItem("form", "div");
		layout.addItem(formItem);
		
		formPanel.setTitle("Products");
		formPanel.getBody().addChild(formTabs);
		formItem.addChild(formPanel);
		buildForm();
		
		addChild(rest);
		rest.setUrl(Util.getPath("myspace/product/restlist"));
		rest.addEventListener(new EventListener() {
			
			@Override
			public void performAction(Renderable source, Event evt) {
				Array<Object> res = (Array<Object>)evt.$get("data");
				
				openList(res);
			}
		}, "success");
		setButtons();
	}
	
	
	public void start() {
		rest.execute();
	}
	
	public void openForm() {
		layout.activate("form");
		if(!formHydrated) {
			hydrateForm();
			formHydrated = true;
		}
	}
	
	public void hydrateForm() {
		rest.setUrl(Util.getPath("myspace/product/getcategories"));
		rest.getListeners().$delete("success");
		JSSelect select = (JSSelect)generalForm.getFormGroup("model").getInput();
		rest.addEventListener(new EventListener() {
			
			@Override
			public void performAction(Renderable source, Event evt) {
				Array<Object> data = (Array<Object>)evt.$get("data");
				select.setOptions(data);
			}
		}, "success");
		rest.execute();
	}
	
	
	public void openList(Array<Object> data) {
		table.getTable().setData(data);
		table.getTable().refresh();
		
		layout.activate("list");
	}
	
	public void buildForm() {
		formTabs.addTab("general", "General");
		formTabs.addTab("image", "Image");
		
		generalForm.addField("name", "Product Name", "text", true);
		generalForm.addField("description", "Description", "textarea", false);
		
		generalForm.addField("price", "Price", FormConfig.NUMBER_TYPE, true);
		generalForm.addField("model", "Model", FormConfig.SELECT_TYPE, true);
		generalForm.addField("category", "Category", FormConfig.SELECT_TYPE, true);
		generalForm.addField("image", "Image", FormConfig.CLOUDINARY_TYPE, false);
		CloudinaryInput clin =  (CloudinaryInput)generalForm.getFormGroup("image").getInput();
		clin.getUploader().setCloudName("dtpreqd3y");
		clin.getUploader().setUnsignedUploadPreset("yx0uopqx");
		JSSelect select = (JSSelect)generalForm.getFormGroup("model").getInput();
		
		
		select.addEventListener(new EventListener() {
			
			@Override
			public void performAction(Renderable source, Event evt) {
				
				rest.setUrl(Util.getPath("myspace/product/getsubcategories"));
				java.lang.Object catId = select.getValue();
				Object params = new Object();
				params.$set("category_id", catId);
				rest.setData(params);
				rest.getListeners().$delete("success");
				rest.addEventListener(new EventListener() {
					
					@Override
					public void performAction(Renderable source, Event evt) {
						JSSelect cat = (JSSelect)generalForm.getFormGroup("category").getInput();
						Array<Object> data = (Array<Object>)evt.$get("data");
						cat.setOptions(data);
					}
				}, "success");
				
				rest.execute();
				
			}
		}, "change");
		
		
		
		
		formTabs.getPane("general").addChild(generalForm);
		
	}
	
	
	public void buildTable() {
		Column image = new Column();
		image.label="Image";
		image.name="image";
		
		Column name = new Column();
		name.label="Product Name";
		name.name="name";
		
		Column model = new Column();
		model.label="Model";
		model.name="model";
		
		
		Column price = new Column();
		price.label="Price";
		price.name="price";
		price.dataType="currency";
		
		Column status = new Column();
		status.label="Status";
		status.name="status";
		
		
		TableConfig config = new TableConfig();
		config.columns.push(image,name,model,price, status);
		
		Action action = new Action();
		action.icon="fa-pencil";
		action.label="Edit";
		action.name="edit";
		
		action.event = function((a,b,c)->{
			TableRow r = (TableRow)b;
			Object data = r.getData();
			String id = data.$get("product_id").toString();
			
			jsweet.lang.Object quey = new Object();
			quey.$set("product_id", id);
			rest.setData(quey);
			rest.setUrl(Util.getPath("myspace/product/restget"));
			rest.getListeners().$delete("success");
			rest.addEventListener(new EventListener() {
				
				@Override
				public void performAction(Renderable source, Event evt) {
					alert(JSON.stringify(evt.$get("data")));
				}
			}, "success");
			
			rest.execute();
			//alert(a.getClass());
		});
		
		config.actions.push(action);
		
		table.getTable().setConfig(config);
		
		DefaultCellRenderer defrend = new DefaultCellRenderer();
		table.getTable().setCellRenderer(new CellRenderer() {
			
			@Override
			public void renderCell(Table table, Renderable td, java.lang.Object value, Object rowData, Column column) {
				if(column.name == "image") {
					if(value != null) {
						td.setHtml("");
						JSContainer img = new JSContainer("img");
						if(value.toString().contains("cloudinary:")) {
							img = new CloudinaryImage(value.toString().replace("cloudinary:", ""));
							((CloudinaryImage)img).setWidth(40);
							((CloudinaryImage)img).setHeight(40);
							((CloudinaryImage)img).refresh();
						}else {
							String url = window.location.origin + window.location.pathname;
							url = url.replace("/admin/index.php", "/image/cache/") + value.toString().replace(".jpg", "-40x40.jpg");
							img.setAttribute("src", url);
						}
						img.addClass("img-thumbnail");
						td.addChild(img);
					}
				}else if(column.name == "status"){
				
					if(value.toString() == "1") {
						td.setHtml("Online");
					}else {
						td.setHtml("Offline");
					}
					
				}else {
					defrend.renderCell(table, td, value, rowData, column);
				}
				
			}
		});
	}
	
	
	public void setButtons() {
		Button addNew = header.addButton("addNew", "Add New", "fa-plus");
		addNew.addEventListener(new EventListener() {
			
			@Override
			public void performAction(Renderable source, Event evt) {
				//layout.activate("form");
			//	tilesRow.setStyle("display", "none");
				openForm();
				
			}
		}, "click");
		addNew.setStyle("margin-right", "1rem");
		
		
		Button delete = header.addButton("delete", "Delete", "fa-trash-o");
		delete.addEventListener(new EventListener() {
			
			@Override
			public void performAction(Renderable source, Event evt) {
				if(confirm("Are you sure you want to delete the selected items?")) {
					Array<Object> selected = table.getTable().getSelected();
					Array<java.lang.Object> selectedIds = new Array<java.lang.Object>();
					for(Object item : selected) {
						String status = item.$get("status").toString();
						if(status == "requested") {
							selectedIds.push(item.$get("redemption_id"));
						}
					}
					if(selectedIds.length > 0) {
						Object data = new Object();
						data.$set("items", selectedIds);
						rest.setData(data);
						rest.setUrl(Util.getPath("myspace/product/delete"));
						rest.setMethod("POST");
						rest.getListeners().$delete("success");
						rest.addEventListener(new EventListener() {
							
							@Override
							public void performAction(Renderable source, Event evt) {
								Array<Object> res = (Array<Object>)evt.$get("data");
								
								openList(res);
							}
						}, "success");
						
						rest.execute();
					}
				}
			}
		}, "click");
	}

}
