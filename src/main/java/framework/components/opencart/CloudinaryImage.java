package framework.components.opencart;

import framework.components.JSContainer;

public class CloudinaryImage extends JSContainer {

	private int width = 200;

	private int height = 200;

	private String mode = RESIZE_MODE_PAD;

	private String serverName = "dtpreqd3y";

	public final static String RESIZE_MODE_SCALE = "scale";
	public final static String RESIZE_MODE_LIMIT = "limit";
	public final static String RESIZE_MODE_FILL = "fill";
	public final static String RESIZE_MODE_FIT = "fit";
	public final static String RESIZE_MODE_CROP = "crop";
	public final static String RESIZE_MODE_THUMB = "thumb";
	public final static String RESIZE_MODE_PAD = "pad";
	public final static String RESIZE_MODE_LIMITED_FILL = "lfill";
	public final static String RESIZE_MODE_LIMIT_PAD = "lpad";
	public final static String RESIZE_MODE_FIT_SCALE_UP = "mfit";
	public final static String RESIZE_MODE_PAD_NO_SCALE = "mpad";

	public CloudinaryImage(String imageId) {
		super(imageId, "img");
	}

	public void refresh() {
		String url = "https://res.cloudinary.com/"+this.serverName+"/image/upload/c_"+this.mode+",h_"+this.height+",w_"+this.width+"/"+getName()+".png";
		setAttribute("src", url);
	}
	
	public String getServerName() {
		return serverName;
	}

	public void setServerName(String serverName) {
		this.serverName = serverName;
	}

	public int getWidth() {
		return width;
	}

	public void setWidth(int width) {
		this.width = width;
	}

	public int getHeight() {
		return height;
	}

	public void setHeight(int height) {
		this.height = height;
	}

	public String getMode() {
		return mode;
	}

	public void setMode(String mode) {
		this.mode = mode;
	}

}
