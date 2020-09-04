package framework.components.opencart;

import framework.components.JSContainer;
import framework.components.api.EventListener;
import framework.components.api.InputField;
import framework.components.api.Renderable;
import framework.components.api.ValidationException;
import jsweet.dom.Event;
import jsweet.dom.File;
import jsweet.dom.FileList;
import jsweet.dom.HTMLInputElement;
import jsweet.lang.Object;

public class CloudinaryInput extends JSContainer implements framework.components.api.InputField<Object> {

	private CloudinaryImage image = new CloudinaryImage("img");

	private JSContainer upload = new JSContainer("input", "input");

	private CloudinaryUploader cloudinary = new CloudinaryUploader("cloudinary");


	private JSContainer imageContainer = new JSContainer("div");

	private JSContainer cloudinaryContainer = new JSContainer("div");

	private JSContainer uploadContainer = new JSContainer("div");

	
	private ProgressBar progressBar = new ProgressBar("progress");
	
	
	private Object cloudinaryEntry = null;
	
	private boolean required = false;

	private Button btnUpload = new Button("upl", "fa-upload", "Upload");
	
	public CloudinaryInput(String name) {
		super(name, "div");
		setAttribute("identifier", "cloudinary:image-input");
		addClass("slds-image-input");
		addChild(imageContainer);
		addChild(cloudinaryContainer);
		addChild(uploadContainer);
		addChild(btnUpload);
		imageContainer.addChild(image);
		cloudinaryContainer.addChild(cloudinary);
		uploadContainer.addChild(upload);
		upload.setStyle("display", "none");
		decorateImage();
		decorateUpload();
		decorateCloudinary();
		setStyle("position", "relative");
		addChild(progressBar);
		setStyle("background", "none").setStyle("box-shadow", "none").setStyle("border", "none").setStyle("height", "auto").setStyle("width", "auto");
		progressBar.setStyle("display", "none");
		

	}

	public void decorateUpload() {
		
		btnUpload.addEventListener(new EventListener() {
			
			@Override
			public void performAction(Renderable source, Event evt) {
				HTMLInputElement ninput = (HTMLInputElement) upload.getNative();
				ninput.click();
			}
		}, "click");
		
		upload.setVisible(false);
		upload.setAttribute("type", "file");
		upload.setAttribute("accept", "image/*");
		upload.addEventListener(new EventListener() {

			@Override
			public void performAction(Renderable source, Event evt) {
				HTMLInputElement ninput = (HTMLInputElement) upload.getNative();
				
				FileList files = ninput.files;
				if (files != null && files.length > 0) {
					for (File f : files) {
						cloudinary.uploadFile(f);
					}
				}
			}
		}, "change");
	}
	
	
	public CloudinaryUploader getUploader(){
		return cloudinary;
	}

	public void decorateCloudinary() {
		cloudinary.addEventListener(new EventListener() {
			
			@Override
			public void performAction(Renderable source, Event evt) {
				CloudinaryItem response = new CloudinaryItem((Object)evt.$get("data"));
				setValue(response);
				image.setName((String)response.public_id);
				image.refresh();
				image.render();
				
				progressBar.setStyle("display", "none");
				progressBar.render();
				btnUpload.setStyle("display", null);
				btnUpload.render();
			}
		}, "completed");
		
		cloudinary.addEventListener(new EventListener() {
			
			@Override
			public void performAction(Renderable source, Event evt) {
				btnUpload.setStyle("display", "none");
				btnUpload.render();
				progressBar.setStyle("display", null);
				progressBar.render();
			}
		}, "start");
		
		cloudinary.addEventListener(new EventListener() {
			
			@Override
			public void performAction(Renderable source, Event evt) {
				Double pro = (Double)evt.$get("data");
				progressBar.setProgress(pro);
				progressBar.render();
			}
		}, "progress");
	}

		
	
	public void setDefault(String defau){
		image.setAttribute("src", defau);
	}

	public JSContainer getImage() {
		return image;
	}

	public CloudinaryUploader getCloudinary() {
		return cloudinary;
	}

	

	

	public CloudinaryInput setDisabled(boolean b) {
		if (b) {
			setAttribute("disabled", "true");
		} else {
			setAttribute("disabled", null);
		}
		return this;
	}

	public CloudinaryInput setReadOnly(boolean b) {
		if (b) {
			setAttribute("readonly", "true");
		} else {
			setAttribute("readonly", null);
		}
		return this;
	}


	public void decorateImage() {
		image.addEventListener(new EventListener() {

			@Override
			public void performAction(Renderable source, Event evt) {
				upload.getNative().click();
				// upload.triggerUpload();
			}
		}, "click");
	}



	@Override
	public Object getValue() {
		return cloudinaryEntry;
	}

	@Override
	public void setValue(Object val) {
		this.cloudinaryEntry = val;
		
		if (val == null) {
			image.setAttribute("src", getAttribute("default"));
		} else {
			image.setName(((CloudinaryItem)val).public_id);
			image.refresh();
		}
	}

	@Override
	public void validate() throws ValidationException {

	}

	@Override
	public String getBinding() {
		return getAttribute("binding");
	}

	

	@Override
	public InputField<Object> setBinding(String binding) {
		setAttribute("binding", binding);
		return this;
	}

	@Override
	public InputField<Object> setRequired(boolean b) {
		this.required = b;
		return this;
	}


}
