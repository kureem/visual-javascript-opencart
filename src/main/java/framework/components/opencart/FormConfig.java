package framework.components.opencart;

import jsweet.lang.Array;
import jsweet.lang.Function;

public class FormConfig {
	
	public String name;
	
	public String label;
	
	public String layout = "vertical";
	
	public Array<Field> fields = new Array<FormConfig.Field>();
	
	public Array<Action> actions = new Array<FormConfig.Action>();
	
	
	public static String TEXT_TYPE = "text";
	public static String NUMBER_TYPE = "number";
	public static String DATE_TYPE = "date";
	public static String TIME_TYPE = "time";
	public static String WEEK_TYPE = "week";
	public static String MONTH_TYPE = "month";
	public static String COLOR_TYPE = "color";
	public static String LONG_TEXT_TYPE = "textarea";
	public static String SELECT_TYPE = "select";
	public static String RANGE_TYPE = "range";
	public static String FILE_TYPE = "file";
	public static String CHECK_BOX_TYPE = "checkbox";
	public static String CLOUDINARY_TYPE = "cloudinary";
	
	
	
	
	
	public static class Field{
		
		public String name;
		
		public String label;
		
		public String type;
		
		public Object defaultValue;
		
		public boolean required;
		
		public Array<jsweet.lang.Object> options = new Array<jsweet.lang.Object>();
	}
	
	public static class Action{
		public String name;
		public String icon;
		public String label;
		
		public Function event;
	}

}
