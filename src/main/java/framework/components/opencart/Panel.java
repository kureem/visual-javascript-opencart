package framework.components.opencart;

import framework.components.JSContainer;

public class Panel extends JSContainer {

	private JSContainer heading = new JSContainer("heading", "div");

	private JSContainer title = new JSContainer("title", "h3");

	private JSContainer icon = new JSContainer("icon", "i");

	private JSContainer uititle = new JSContainer("uititle", "span");

	private JSContainer body = new JSContainer("body", "div");
	
	private JSContainer footer = new JSContainer("footer","div");
	
	

	public Panel(String name) {
		super(name, "div");
		addClass("panel");
		addClass("panel-default");
		heading.addClass("panel-heading");
		title.addClass("panel-title");
		title.addChild(icon);
		title.addChild(uititle);
		heading.addChild(title);
		addChild(heading);

		body.addClass("panel-body");
		addChild(body);
		
		footer.addClass("panel-footer");
		addChild(footer);
	}

	public void setTitle(String title) {
		this.uititle.setHtml(title);
	}

	public void setIcon(String icon) {
		this.icon.setAttribute("class", "fa " + icon);
	}

	public JSContainer getHeading() {
		return heading;
	}

	public JSContainer getBody() {
		return body;
	}

	public JSContainer getFooter() {
		return footer;
	}
	
	

}
