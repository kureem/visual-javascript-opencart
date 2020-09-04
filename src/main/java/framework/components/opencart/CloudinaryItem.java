package framework.components.opencart;

import jsweet.lang.Object;

public class CloudinaryItem extends jsweet.lang.Object{
	
	public Long bytes;
	public Long created_at;
	public String etag;
	public String format;
	public Long height;
	public String original_filename;
	public Boolean placeholder;
	public String public_id;
	public String resource_type;
	public String secure_url;
	public String signature;
	public String[] tags;
	public String type;
	public String url;
	public Long version;
	public Long width;
	
	public CloudinaryItem(Object prox){
		for(String key : Object.keys(prox)){
			$set(key, prox.$get(key));
		}
	}

}
