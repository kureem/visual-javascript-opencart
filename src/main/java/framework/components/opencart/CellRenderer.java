package framework.components.opencart;

import framework.components.api.Renderable;
import framework.components.opencart.TableConfig.Column;
import jsweet.lang.Object;

public interface CellRenderer {
	public void renderCell(Table table, Renderable td, java.lang.Object value, Object rowData, Column column);
}
