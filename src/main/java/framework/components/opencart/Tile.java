package framework.components.opencart;

import framework.components.JSContainer;

public class Tile extends JSContainer{

	private JSContainer heading = new JSContainer("heading", "div").addClass("tile-heading");
	
	private JSContainer body = new JSContainer("body", "div").addClass("tile-body");
	
	private JSContainer footer = new JSContainer("foot", "div").addClass("tile-footer");
	
	public Tile(String name) {
		super(name, "div");
		addClass("tile tile-primary");
		addChild(heading);
		addChild(body);
		addChild(footer);
		
	}
	
	
	public void setHeading(String left, String right) {
		heading.setHtml(left + " <span class=\"pull-right\">"+right+"</span>");
	}
	
	public void setBody(String icon, String txt) {
		body.setHtml("<i class=\"fa "+icon+"\"></i><h2 class=\"pull-right\">"+txt+"</h2>");
	}
	
	
	public void setFooter(JSContainer link) {
		footer.addChild(link);
	}
	
	

}
