package framework.components.opencart;

import framework.components.JSContainer;
import framework.components.api.EventListener;
import framework.components.api.Renderable;
import framework.components.input.JSCheckBox;
import framework.components.opencart.TableConfig.Action;
import framework.components.opencart.TableConfig.Column;
import jsweet.dom.CustomEvent;
import jsweet.dom.Event;
import jsweet.lang.Array;
import jsweet.lang.Number;
import jsweet.lang.Object;

public class Table extends JSContainer {

	private JSContainer head = new JSContainer("head", "thead");

	private JSContainer body = new JSContainer("body", "tbody");

	private JSContainer headerRow = new JSContainer("header-row", "tr");

	private JSContainer selectHeaderCell = new JSContainer("select-head-cell", "td");

	private JSCheckBox headerCheckBox = new JSCheckBox("header-checkbox");

	private TableConfig config;

	private Array<Object> data_ = new Array<Object>();

	private CellRenderer cellRenderer = new DefaultCellRenderer();

	public Table(String name) {
		super(name, "table");
		addClass("table");
		addClass("table-bordered");
		addClass("table-hover");

		addChild(head);
		addChild(body);
		selectHeaderCell.addClass("text-center").setStyle("width", "1px");
		selectHeaderCell.addChild(headerCheckBox);
		headerCheckBox.addEventListener(new EventListener() {
			
			@Override
			public void performAction(Renderable source, Event evt) {
				setSelectAll(headerCheckBox.isChecked());
			}
		}, "change");
	}
	
	
	public void setSelectAll(boolean b) {
		for(Renderable r : body.getChildren()) {
			TableRow row = (TableRow)r;
			row.setSelected(b);
		}
	}
	
	
	public Array<Object> getSelected(){
		Array<Object> result = new Array<Object>();
		for(Renderable r : body.getChildren()) {
			TableRow row = (TableRow)r;
			if(row.isSelected()) {
				result.push(row.getData());
			}
		}
		
		return result;
	}

	public CellRenderer getCellRenderer() {
		return cellRenderer;
	}

	public void setCellRenderer(CellRenderer cellRenderer) {
		this.cellRenderer = cellRenderer;
	}

	public JSContainer getHead() {
		return head;
	}

	public JSContainer getBody() {
		return body;
	}

	public TableConfig getConfig() {
		return config;
	}

	public void setConfig(TableConfig config) {
		this.config = config;
	}

	public void refresh() {
		head.clearChildren();
		body.clearChildren();
		headerRow.clearChildren();
		head.addChild(headerRow);

		// first col
		if (this.config.selectable) {
			headerRow.addChild(selectHeaderCell);
		}

		// data cols
		for (Column col : this.config.columns) {
			TableHeaderColumn hcol = new TableHeaderColumn(col);
			headerRow.addChild(hcol);
		}

		// action col
		if (this.config.actions.length > 0) {
			JSContainer tdact = new JSContainer("td").addClass("text-right").setHtml("Action");
			headerRow.addChild(tdact);
		}

		for (Object row : data_) {
			TableRow r = new TableRow(this, row, config);
			body.addChild(r);
		}

	}

	public void setData(Array<Object> data) {
		this.data_ = data;
	}

	public class TableAction extends JSContainer {

		private TableConfig config;

		JSContainer btgroup = new JSContainer("btns", "div").addClass("btn-group");

		public TableAction(TableConfig config) {
			super("td");
			addClass("text-right");
			this.config = config;
			addChild(btgroup);
			JSContainer firstAct = createBtn(this.config.actions.$get(0), false);
			btgroup.addChild(firstAct);
			if (this.config.actions.length == 2) {
				JSContainer secondAct = createBtn(this.config.actions.$get(1), false);
				btgroup.addChild(secondAct);
			}
			if (this.config.actions.length > 2) {
				JSContainer btn = new JSContainer("mnu", "button");
				btn.addClass("btn btn-primary dropdown-toggle");
				btn.setAttribute("data-toggle", "button");
				btn.setHtml("<span class=\"caret\"></span>");
				btgroup.addChild(btn);
				JSContainer ul = new JSContainer("mn", "ul");
				ul.addClass("dropdown-menu dropdown-menu-right");
				btgroup.addChild(ul);
				for (double i = 2; i < this.config.actions.length; i++) {

					JSContainer li = new JSContainer("li");
					ul.addChild(li);
					JSContainer item = createBtn(this.config.actions.$get(i), true);
					li.addChild(item);

				}
			}

		}

		public JSContainer createBtn(Action act, boolean isMenu) {
			JSContainer btn = new JSContainer(act.name, "a");
			if (!isMenu) {
				btn.addClass("btn btn-primary");
			}
			btn.setAttribute("href", "javascript:void(0);");
			String html = "<i class=\"fa " + act.icon + "\"></i>";
			if (isMenu) {
				html = html + act.label;
			}
			btn.setHtml(html);
			btn.addEventListener(new EventListener() {

				@Override
				public void performAction(Renderable source, Event evt) {
					def.js.Function fn = act.event;
					TableRow ro = source.getAncestorWithClass("trow");
					fn.call(source, source.getAncestorWithClass("table"), ro);
				}
			}, "click");

			return btn;
		}

	}

	public class TableRow extends JSContainer {

		JSCheckBox cb = new JSCheckBox("cb");

		private Object data_;

		private TableConfig config_;

		private Table table_;

		public TableRow(Table table, Object data, TableConfig config) {
			super("", "tr");
			addClass("trow");
			this.config_ = config;
			this.data_ = data;
			this.table_ = table;

			// first col
			if (this.config_.selectable) {
				JSContainer firstcol = new JSContainer("td").addClass("text-center");
				firstcol.addChild(cb);
				firstcol.setStyle("width", "1px");
				addChild(firstcol);
			}

			// data cols
			for (Column col : this.config_.columns) {
				JSContainer td = new JSContainer(col.name, "td");
				addChild(td);
				String name = col.name;
				java.lang.Object obj = data.$get(name);
				if (cellRenderer != null) {
					cellRenderer.renderCell(table, td, obj, data_, col);
				}

			}

			// action col
			if (this.config_.actions.length > 0) {
				TableAction act = new TableAction(this.config_);
				addChild(act);
			}
		}

		public void setValue(String field, java.lang.Object value) {
			if (value != null) {
				this.data_.$set(field, value);
			} else {
				this.data_.$delete(field);
			}

			for (Column col : this.config_.columns) {
				if (col.name == field) {
					if (table_.cellRenderer != null) {
						JSContainer td = (JSContainer) getChild(field);
						table_.cellRenderer.renderCell(table_, td, value, data_, col);
					}
				}
			}
		}

		public Object getData() {
			return this.data_;
		}

		public boolean isSelected() {
			return this.cb.isChecked();
		}

		public void setSelected(boolean b) {
			this.cb.setChecked(b);
		}

	}

	public class TableHeaderColumn extends JSContainer {

		private Column column_;

		private JSContainer inside = new JSContainer("inside", "a");

		// -1 = desc, 0 = none, 1 = asc
		private int sortdir = 0;

		public TableHeaderColumn(TableConfig.Column column) {
			super(column.name, "td");
			this.column_ = column;
			addChild(inside);
			inside.setAttribute("href", "javascript:void(0);");
			inside.setHtml(column_.label);
			if (column_.dataType == "numeric" || column_.dataType == "currency") {
				addClass("text-right");
			} else {
				addClass("text-left");
			}

			if (column_.sortable) {
				inside.addEventListener(new EventListener() {

					@Override
					public void performAction(Renderable source, Event evt) {
						inside.removeClass("asc").removeClass("desc");
						Array<Renderable> renders = headerRow.getChildren();
						for (Renderable r : renders) {
							if (r instanceof TableHeaderColumn) {
								if (r.getName() != getName())
									((TableHeaderColumn) r).clearSort();
							}
						}
						Table table = source.getAncestorWithClass("table");
						CustomEvent sortEvent = new CustomEvent("sort");

						sortEvent.$set("source", source.getParent());
						sortEvent.$set("column", source.getParent());
						sortEvent.$set("table", table);
						if (sortdir == 0 || sortdir == -1) {
							sortdir = 1;
							inside.addClass("asc");
							sortEvent.$set("direction", "asc");
						} else {
							sortdir = -1;
							inside.addClass("desc");
							sortEvent.$set("direction", "desc");
						}
						table.fireListener("sort", sortEvent);
					}
				}, "click");
			}

		}

		public void clearSort() {
			this.sortdir = 0;
			inside.removeClass("asc").removeClass("desc");

		}

	}

	

	public static class DefaultCellRenderer implements CellRenderer {

		@Override
		public void renderCell(Table table, Renderable td, java.lang.Object obj, Object rowData, Column col) {
			
			if (obj != null) {
				if(col.dataType == "currency") {
					Long l = Long.parseLong(obj.toString());
					Number n = new Number(l);
					td.setHtml(n.toFixed(2));
				}else {
					td.setHtml(obj.toString());
				}
			} else {
				td.setHtml("");
			}

			if (col.dataType == "numeric" || col.dataType == "currency") {
				td.addClass("text-right");
			} else {
				td.addClass("text-left");
			}

		}

	}

}
