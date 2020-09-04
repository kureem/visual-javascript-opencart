package framework.components.opencart;

import static jsweet.util.Lang.function;

import framework.components.JSContainer;
import framework.components.RestWebservice;
import framework.components.api.EventListener;
import framework.components.api.Renderable;
import framework.components.opencart.Table.TableRow;
import framework.components.opencart.TableConfig.Action;
import framework.components.opencart.TableConfig.Column;
import jsweet.dom.Event;
import jsweet.lang.Array;
import jsweet.lang.Object;

public class Orders extends JSContainer{

	private JSContainer filter = new JSContainer("filter", "div");
	
	private JSContainer list = new JSContainer("list", "div");
	
	private ResponsiveTable rtable = new ResponsiveTable("table");
	
	
	private Panel listPanel = new Panel("listpanel");
	
	//private String token;
	
	RestWebservice rw = new RestWebservice();
	
	public Orders(String token) {
		super("orders", "div");
		addClass("row");
		//this.token = token;
		addChild(filter);
		addChild(list);
		filter.addClass("col-md-3 col-md-push-9 col-sm-12 hidden-sm hidden-xs");
		list.addClass("col-md-9 col-md-pull-3 col-sm-12");
		
		
		TableConfig tc = new TableConfig();
		Column invoice_no = new Column();
		invoice_no.dataType="numeric";
		invoice_no.label="Inv.";
		invoice_no.name="invoice_no";
		invoice_no.sortable = true;
		tc.columns.push(invoice_no);
		tc.columns.push(createCol("username", "Name", false));
		tc.columns.push(createCol("email", "Email", false));
		tc.columns.push(createCol("telephone", "Tel", false));
		tc.columns.push(createCol("name", "Product", false));
		tc.columns.push(createCol("model", "Model", false));
		tc.columns.push(createCol("price", "Price", true));
		tc.columns.push(createCol("status", "Status", false));
		
		tc.actions.push(createAction("view", "View", "fa-eye"));
		Action redeem = createAction("redeem", "Request Redeem", "fa-adjust");
		redeem.event = function((a,b,c)->{
			TableRow r = (TableRow)b;
			Object data = r.getData();
			String id = data.$get("order_product_id").toString();
			String query = "UPDATE oc_order_product set status = 'toredeem' WHERE order_product_id=" + id;
			
			jsweet.lang.Object quey = new Object();
			quey.$set("query", query);
			rw.setData(quey);
			
			rw.getListeners().$delete("success");
			rw.addEventListener(new EventListener() {
				
				@Override
				public void performAction(Renderable source, Event evt) {
					r.setValue("status", "Ask Redeem");
				}
			}, "success");
			
			rw.setUrl(rw.getUrl().replace("/order/query", "/order/update"));
			rw.execute();
			//alert(a.getClass());
		});
		tc.actions.push(redeem);
		tc.selectable=true;
		
		listPanel.setTitle("Orders");
		listPanel.setIcon("fa-list");
		listPanel.getBody().addChild(rtable);
		
		list.addChild(listPanel);
		rtable.getTable().setConfig(tc);
		rtable.getTable().setCellRenderer(new CellRenderer() {
			
			@Override
			public void renderCell(Table table, Renderable td, java.lang.Object obj, Object rowData, Column col) {
				if (obj != null) {
					td.setHtml(obj.toString());

					if(col.name == "status") {
						if(obj == "new") {
							td.setHtml("New");
						}else if(obj == "toredeem") {
							td.setHtml("Ask Redeem");
						}
					}
				} else {
					td.setHtml("");
				}
				
				

				if (col.dataType == "numeric") {
					td.addClass("text-right");
				} else {
					td.addClass("text-left");
				}				
			}
		});
		//rtable.getTable().refresh();
		
		
		rtable.addChild(rw);
		rw.setUrl("http://localhost/cart/admin/index.php?route=myspace/order/query&user_token=" + token);
		jsweet.lang.Object quey = new Object();
		quey.$set("query", "select op.order_product_id, op.order_id, o.invoice_no, o.firstname, o.lastname, concat(o.firstname,' ',  o.lastname) as username, o.email,o.telephone, op.product_id, op.name, op.model, op.quantity, op.price, op.total, op.tax, op.reward, p.vendor_id, op.status FROM oc_order_product op, oc_product p, oc_order o WHERE op.product_id = p.product_id AND op.order_id = o.order_id AND p.vendor_id=%vendor_id%");
		rw.setData(quey);
		
		
		rw.addEventListener(new EventListener() {
			
			@SuppressWarnings("unchecked")
			@Override
			public void performAction(Renderable source, Event evt) {
				Array<Object> dat = (Array<Object>)evt.$get("data");
				rtable.getTable().setData(dat);
				rtable.getTable().refresh();
				rtable.setRendered(false);
				source.getRoot().render();
			}
		}, "success");
		
		//select op.order_product_id, op.order_id, o.invoice_no, o.firstname, o.lastname,o.email,o.telephone, op.product_id, op.name, op.model, op.quantity, op.price, op.total, op.tax, op.reward FROM oc_order_product op, oc_product p, oc_order o WHERE op.product_id = p.product_id AND op.order_id = o.order_id 
	}
	
	public void start() {
		rw.execute();
	}
	
	private Column createCol(String name, String label, boolean numeric) {
		Column col = new Column();
		col.dataType=numeric?"numeric":"text";
		col.label=label;
		col.name=name;
		col.sortable = true;
		return col;
	}
	
	private Action createAction(String name, String label, String icon) {
		Action act = new Action();
		act.label = label;
		act.name = name;
		act.icon = icon;
		return act;
	}
	
	

}
