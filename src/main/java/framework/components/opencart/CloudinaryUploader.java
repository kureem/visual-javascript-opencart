package framework.components.opencart;

import static jsweet.dom.Globals.console;

import framework.components.JSContainer;
import jsweet.dom.CustomEvent;
import jsweet.dom.File;
import jsweet.dom.FormData;
import jsweet.dom.ProgressEvent;
import jsweet.dom.XMLHttpRequest;
import jsweet.lang.JSON;

public class CloudinaryUploader extends JSContainer {

	private String endpoint = "https://api.cloudinary.com/v1_1/";

	private String cloudName;

	private String unsignedUploadPreset;

	public CloudinaryUploader(String name) {
		super(name, "div");

	}

	@Override
	public String[] advancedEventTypes() {
		return new String[] { "start", "progress", "completed" };
	}

	public void setEndpoint(String ep) {
		this.endpoint = ep;
	}

	public void setCloudName(String cn) {
		this.cloudName = cn;
	}

	public void setUnsignedUploadPreset(String uup) {
		this.unsignedUploadPreset = uup;
	}

	public void uploadFile(File file) {
		if (cloudName == null || cloudName.length() <= 0) {
			throw new jsweet.lang.Error("You need to configure the service for the cloudname");
		}
		if (endpoint == null || endpoint.length() <= 0) {
			endpoint = "https://api.cloudinary.com/v1_1/";
			console.warn("Cloudinary endpoint not configured. Using default endpoint:https://api.cloudinary.com/v1_1/");
		} else if (!endpoint.endsWith("/")) {
			endpoint = endpoint + "/";
		}
		String url = endpoint + cloudName + "/upload";
		console.log("Cloudinary URL:" + url);

		XMLHttpRequest xhr = new XMLHttpRequest();
		FormData fd = new FormData();
		xhr.open("POST", url, true);
		xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
		xhr.upload.addEventListener("progress", (pe) -> {
			ProgressEvent e = (ProgressEvent) pe;
			Long progress = Math.round((e.loaded * 100.0) / e.total);
			e.$set("progress", progress);
			e.$set("data", progress);
			fireListener("progress", e);

		});

		xhr.onreadystatechange = (e) -> {
			if (xhr.readyState == 4 && xhr.status == 200) {
				// File uploaded successfully
				CloudinaryItem response = (CloudinaryItem) JSON.parse(xhr.responseText);
				e.$set("data", response);
				e.$set("response", response);
				fireListener("completed", e);
			}
			return e;
		};
		if (unsignedUploadPreset != null && unsignedUploadPreset.length() > 0)
			fd.append("upload_preset", unsignedUploadPreset);
		fd.append("tags", "browser_upload"); // Optional - add tag for image admin in Cloudinary
		fd.append("file", file);
		xhr.send(fd);

		CustomEvent startUpload = new CustomEvent("start");
		startUpload.$set("data", file);
		startUpload.$set("file", file);
		fireListener("start", startUpload);

	}

}
