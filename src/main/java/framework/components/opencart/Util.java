package framework.components.opencart;

import static jsweet.dom.Globals.window;

public class Util {

	public static String getToken() {
		String href = window.location.href;
		String rout = "";
		if(href.contains("?route")) {
			String sec = href.split("route=")[1];
			System.out.println(sec);
			if(sec.contains("&user_token=")) {
				String[] parts =sec.split("&user_token=");
				rout = parts[0];
				System.out.println(rout);
				String token = parts[1];
				return token;
				
			}
		}
		return null;
	}
	
	public static String getPath(String route) {
		String token = getToken();
		String url = window.location.origin + window.location.pathname + "?route=" + route + "&user_token=" + token;
		return url;
	}
	
	
	
	
}
