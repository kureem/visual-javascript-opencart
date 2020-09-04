package framework.components.opencart;

import static def.dom.Globals.confirm;

import framework.components.CardLayout;
import framework.components.CardLayoutItem;
import framework.components.JSContainer;
import framework.components.RestWebservice;
import framework.components.api.EventListener;
import framework.components.api.Renderable;
import framework.components.opencart.TableConfig.Column;
import jsweet.dom.Event;
import jsweet.lang.Array;
import jsweet.lang.Object;

public class Redemptions extends JSContainer{
	
	
	private PageHeader header = new PageHeader("header");
	
	private JSContainer content = new JSContainer("conten", "div").addClass("container-fluid");

	
	private ResponsiveTable table = new ResponsiveTable("list");
	
	
	private RestWebservice rest = new RestWebservice();
	
	
	private Panel listPanel = new Panel("listPanel");
	
	
	private Panel formPanel = new Panel("formPanel");
	
	private Form form = new Form("form");
	
	private JSContainer listRow = new JSContainer("div").addClass("row");
	
	
	private JSContainer tilesRow = new JSContainer("div").addClass("row");
	
	
	private Tile totalSales = new Tile("totalSales");
	
	private Tile totalRedeems = new Tile("totalRedeems");
	
	private Tile totalPosted = new Tile("totalPosted");
	
	private Tile totalCredits = new Tile("totalCredits");
	
	
	private CardLayout layout = new CardLayout("layout", "div");
	
	public Redemptions(String name) {
		super(name, "div");
		addChild(header);
		addChild(content);
		
		header.setTitle("Redemptions");
		header.addBreadcrumb("Redemptions", "myspace/redemptions");
		
		setButtons();
		
		content.addChild(tilesRow).addChild(listRow);
		buildDashboard();
		
		
		listRow.addChild(layout);
		
		
		CardLayoutItem listItem = new CardLayoutItem("list", "div");
		layout.addItem(listItem);
		listItem.addChild(listPanel);
		listPanel.setTitle("Redemption List");
		listPanel.setIcon("fa-list");
		listPanel.getBody().addChild(table);
		buildTable();
		
		CardLayoutItem formItem = new CardLayoutItem("form", "div");
		layout.addItem(formItem);
		
		formPanel.setTitle("Redemption");
		formPanel.getBody().addChild(form);
		formItem.addChild(formPanel);
		buildForm();
		
		addChild(rest);
		rest.setUrl(Util.getPath("myspace/redemptions/query"));
		rest.addEventListener(new EventListener() {
			
			@Override
			public void performAction(Renderable source, Event evt) {
				Object res = (Object)evt.$get("data");
				
				list(res);
			}
		}, "success");
		
		
	}
	
	
	@SuppressWarnings("unchecked")
	public void list(Object res) {
		Object totals =(Object)res.$get("totals");
		
		totalSales.setBody("fa-shopping-cart", ((jsweet.lang.Number)totals.$get("sales")).toFixed(2));
		totalRedeems.setBody("fa-credit-card", ((jsweet.lang.Number)totals.$get("redeem")).toFixed(2));
		totalCredits.setBody("fa-credit-card", ((jsweet.lang.Number)totals.$get("credit")).toFixed(2));
		totalPosted.setBody("fa-credit-card", ((jsweet.lang.Number)totals.$get("posted")).toFixed(2));
		
		Array<Object> data =(Array<Object>)res.$get("list");
		table.getTable().setData(data);
		table.setRendered(false);
		table.getTable().refresh();
	}
	
	
	public void start() {
		layout.activate("list");
		rest.execute();
	}
	
	
	public void buildForm() {
		FormConfig config = new FormConfig();
		config.label = "Redemption";
		//config.layout = ""
		form.setConfig(config);
		form.addField("amount", "Amount", FormConfig.NUMBER_TYPE, true);
		form.addField("accountName", "Name on check", FormConfig.TEXT_TYPE, true);
		
		
		formPanel.getFooter().addChild(new Button("save", "fa-save", "Save").setStyle("margin-right", "1rem").addEventListener(new EventListener() {
			
			@Override
			public void performAction(Renderable source, Event evt) {
				Object data = form.getFormData();
				rest.setData(data);
				rest.setMethod("POST");
				rest.setUrl(Util.getPath("myspace/redemptions/add"));
				rest.getListeners().$delete("success");
				rest.addEventListener(new EventListener() {
					
					@Override
					public void performAction(Renderable source, Event evt) {
						Object res = (Object)evt.$get("data");
						list(res);
						layout.activate("list");
						tilesRow.setStyle("display", null);
					}
				}, "success");
				
				rest.execute();
				
			}
		}, "click"));
		
		
		
		formPanel.getFooter().addChild(new Button("cancel", "fa-reply", "Cancel").addEventListener(new EventListener() {
			
			@Override
			public void performAction(Renderable source, Event evt) {
				layout.activate("list");
				tilesRow.setStyle("display", null);
			}
		}, "click"));
	}
	
	
	public void setButtons() {
		Button addNew = header.addButton("addNew", "Add New", "fa-plus");
		addNew.addEventListener(new EventListener() {
			
			@Override
			public void performAction(Renderable source, Event evt) {
				layout.activate("form");
				tilesRow.setStyle("display", "none");
				
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
						rest.setUrl(Util.getPath("myspace/redemptions/delete"));
						rest.setMethod("POST");
						rest.getListeners().$delete("success");
						rest.addEventListener(new EventListener() {
							
							@Override
							public void performAction(Renderable source, Event evt) {
								Object res = (Object)evt.$get("data");
								
								list(res);
							}
						}, "success");
						
						rest.execute();
					}
				}
			}
		}, "click");
	}
	
	
	private void buildDashboard() {
		JSContainer cell1 = new JSContainer("div").addClass("col-lg-3 col-md-3 col-sm-6");
		JSContainer cell2 = new JSContainer("div").addClass("col-lg-3 col-md-3 col-sm-6");
		JSContainer cell3 = new JSContainer("div").addClass("col-lg-3 col-md-3 col-sm-6");
		JSContainer cell4 = new JSContainer("div").addClass("col-lg-3 col-md-3 col-sm-6");
	
		tilesRow.addChild(cell1.addChild(totalSales)).addChild(cell2.addChild(totalRedeems)).addChild(cell3.addChild(totalPosted)).addChild(cell4.addChild(totalCredits));
		
		totalSales.setHeading("Sales", "");
		totalSales.setBody("fa-shopping-cart", "500");
		
		totalRedeems.setHeading("Total Redeem Requested", "");
		totalRedeems.setBody("fa-credit-card", "200");
		
		totalPosted.setHeading("Total Redeem Posted", "");
		totalPosted.setBody("fa-credit-card", "200");
		
		totalCredits.setHeading("Total Credits", "");
		totalCredits.setBody("fa-credit-card", "200");
	}
	
	private void buildTable() {
		TableConfig con = new TableConfig();
		con.selectable = true;
		con.columns.push(createCol("redemption_id", "Id", true));
		con.columns.push(createCol("account_name", "Name on check", false));
		con.columns.push(createCol("amount", "Amount", true));
		con.columns.push(createCol("status", "Status", false));
		table.getTable().setConfig(con);
		
	}
	
	
	private Column createCol (String name, String title, boolean numeric) {
		Column col = new Column();
		col.label=title;
		col.name=name;
		col.dataType = numeric? "numeric":"text";
		if(name == "amount") {
			col.dataType = "currency";
		}
		return col;
	}

}
