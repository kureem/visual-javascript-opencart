package framework.components.opencart;

import framework.components.JSContainer;

public class PageHeader extends JSContainer{
	
	private JSContainer title = new JSContainer("title", "h1");
	
	private JSContainer buttons = new JSContainer("buttons", "div").addClass("pull-right");
	
	private JSContainer breadcrumbs = new JSContainer("breadcrumbs", "ul").addClass("breadcrumb");

	public PageHeader(String name) {
		super(name, "div");
		
		addClass("page-header");
		
		JSContainer fluid = new JSContainer("fluid", "div").addClass("container-fluid");
		addChild(fluid);
		
		fluid.addChild(buttons);
		fluid.addChild(title);
		fluid.addChild(breadcrumbs);
		
		
		JSContainer hmme = new JSContainer("home", "a").setAttribute("href", Util.getPath("common/dashboard"));
		hmme.setHtml("Home");
		
		breadcrumbs.addChild(new JSContainer("li").addChild(hmme));
	}
	
	
	
	public void setTitle(String title) {
		this.title.setHtml(title);
	}
	
	public void addBreadcrumb(String title, String route) {
		JSContainer hmme = new JSContainer("", "a").setAttribute("href", Util.getPath(route));
		hmme.setHtml(title);
		breadcrumbs.addChild(new JSContainer("li").addChild(hmme));
	}
	
	
	public Button addButton(String name, String title, String icon) {
		Button btn = new Button(name, icon, title);
		//JSContainer btn  = new JSContainer(name, "button").setHtml("<i class=\"fa "+icon+"\"></i>");
		//btn.addClass("btn btn-primary");
		//btn.setAttribute("title", title);
		buttons.addChild(btn);
		return btn;
	}
	
	

}
