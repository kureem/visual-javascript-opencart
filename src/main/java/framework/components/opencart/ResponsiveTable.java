package framework.components.opencart;

import framework.components.JSContainer;

public class ResponsiveTable extends JSContainer{
	
	private Table table = new Table("table");

	public ResponsiveTable(String name) {
		super(name, "div");
		addChild(table);
	}

	public Table getTable() {
		return table;
	}
	
	

}
