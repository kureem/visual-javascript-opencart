package framework.components.opencart;

import static jsweet.dom.Globals.document;
import static jsweet.dom.Globals.window;

public class Boot {

	public static void main(String[] args) {
		
		/*
		 * JSContainer c = new JSContainer("p", "p"); JSUpload upl = new JSUpload("dsd",
		 * "https://www.google.com"); c.addChild(upl); c.setHtml("don't be a dick");
		 * 
		 * c.render(); System.out.println("lets do it here");
		 */
		
		/*
		 * Editor editor = new Editor("editor", "div"); Array<Object> commands =
		 * (Array<Object>)window.$get("commands"); Array<Object> textCommands =
		 * (Array<Object>)window.$get("textActions"); Array<Object> blockCommands =
		 * (Array<Object>)window.$get("blockActions"); Array<Object> blocks =
		 * (Array<Object>)window.$get("blocks");
		 * 
		 * editor.addCommands(commands); editor.addBlockToolbarActions(blockCommands);
		 * editor.addTextToolbarActions(textCommands); editor.addBlocks(blocks);
		 * editor.render();
		 *  
		 * window.$set("myeditor", editor);
		 */

		System.out.println("hello world");
		
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
				System.out.println(token);
				if(rout == "myspace/order") {
					Orders orders = new Orders(token);
					orders.render(document.getElementById("myorders"));
					orders.start();
				}else if(rout == "myspace/redemptions") {
					Redemptions red = new Redemptions("red");
					red.render(document.getElementById("myredemptions"));
					red.start();
				}else if(rout == "myspace/product") {
					Products red = new Products("red");
					red.render(document.getElementById("myproducts"));
					red.start();
				}
			}
		}
		
	}

}
