package framework.components.opencart;

import jsweet.lang.Array;
import def.js.Function;

public class TableConfig {
	
	public boolean selectable = true;
	
	public Array<Column> columns = new Array<TableConfig.Column>();
	
	public Array<Action> actions = new Array<TableConfig.Action>();
	
	
	public static class Column{
		
		public String name;
		
		public String label;
		
		public String dataType;
		
		public boolean sortable;
		
	}
	
	
	public static class Action{
		public String name;
		public String icon;
		public String label;
		
		public Function event;
	}

}
