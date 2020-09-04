package framework.components.opencart;

import framework.components.JSContainer;
import framework.components.api.EventListener;
import framework.components.api.Renderable;
import jsweet.dom.Event;

public class Tabs extends JSContainer {

	private JSContainer navs = new JSContainer("navs", "ul").addClass("nav nav-tabs");

	private JSContainer content = new JSContainer("content", "div").addClass("tab-content");

	public Tabs(String name) {
		super(name, "div");
		addChild(navs);
		addChild(content);
	}

	public void addTab(String name, String label) {
		JSContainer tab = new JSContainer(name, "li");
		JSContainer atab = new JSContainer(name, "a").setAttribute("href", "javascript:void(0);").setHtml(label);
		tab.addChild(atab);
		atab.addEventListener(new EventListener() {

			@Override
			public void performAction(Renderable source, Event evt) {
				activate(source.getName());
			}
		}, "click");
		navs.addChild(tab);

		JSContainer pane = new JSContainer(name, "div").addClass("tab-pane");
		content.addChild(pane);
	}

	public void activate(String name) {
		doActivate(name, navs);
		doActivate(name, content);
	}

	public Renderable getPane(String name) {
		return content.getChild(name);
	}

	private void doActivate(String name, Renderable parent) {
		for (Renderable li : parent.getChildren()) {
			if (li.getName() != name) {
				if (li.hasClass("active"))
					li.removeClass("active");
			} else {
				if (!li.hasClass("active")) {
					li.addClass("active");
				}
			}
		}
	}

	public JSContainer getNavs() {
		return navs;
	}

	public JSContainer getContent() {
		return content;
	}

}
