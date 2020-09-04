package framework.components.opencart;

import framework.components.JSContainer;

public class Button extends JSContainer{

	public Button(String name, String icon, String label) {
		super(name, "button");
		addClass("btn");
		addClass("btn-primary");
		String html = "<i class=\"fa "+icon+"\"></i> " + label;
		setHtml(html);
	}

}
