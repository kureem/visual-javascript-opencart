package framework.components.opencart;

import framework.components.JSContainer;

public class ProgressBar extends JSContainer{

	private JSContainer progressBar = new JSContainer("div").addClass("progress-bar");
	
	public ProgressBar(String name) {
		super(name, "div");
		
		addClass("progress");
		addChild(progressBar);
		
		setAttribute("identifier", "bootstrap:progress-bar");
		setAttribute("aria-valuemin", "0").setAttribute("aria-valuemax", "100").setAttribute("aria-valuenow", "0");
	}

	
	
	
	public void setProgress(double percent) {
		progressBar.setStyle("width", percent + "%");
		progressBar.setHtml(percent + "%");
		progressBar.setAttribute("aria-valuenow", percent + "");
	}
	
	
	

}
