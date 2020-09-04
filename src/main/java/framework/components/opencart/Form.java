package framework.components.opencart;

import framework.components.JSContainer;
import framework.components.JSUpload;
import framework.components.api.EventListener;
import framework.components.api.InputField;
import framework.components.api.Renderable;
import framework.components.input.DateInputTypes;
import framework.components.input.JSCheckBox;
import framework.components.input.JSDateInput;
import framework.components.input.JSNumberInput;
import framework.components.input.JSSelect;
import framework.components.input.JSTextInput;
import framework.components.input.JSTextArea;
import framework.components.input.JSTimeInput;
import framework.components.input.NumericInputTypes;
import framework.components.opencart.FormConfig.Action;
import framework.components.opencart.FormConfig.Field;
import jsweet.dom.Event;
import jsweet.lang.Array;
import jsweet.lang.Function;

public class Form extends JSContainer {

	private FormConfig config_;
	
	private JSContainer body = new JSContainer("body", "div");
	
	//private JSContainer footer = new JSContainer("footer", "div");
	
	private Array<FormGroup> fields = new Array<Form.FormGroup>();
	
	public Form(String name) {
		super(name, "div");
		addClass("form");
		
		addChild(body);
		//addChild(footer.addClass("panel-footer"));
		//footer.addClass("text-right");
	}
	
	
	public void setConfig(FormConfig config) {
		if(this.config_ != null) {
			removeClass("form-" + this.config_.layout);
			fields = new Array<Form.FormGroup>();
			body.clearChildren();
			//footer.clearChildren();
		}
		this.config_ = config;
		addClass("form-" + this.config_.layout);
		
		for(Field field : config_.fields) {
			FormGroup fg = new FormGroup(field, this.config_.layout);
			body.addChild(fg);
			fields.push(fg);
		}
		
		//for(Action act : this.config_.actions) {
			//JSContainer btn = createBtn(act);
			//footer.addChild(btn);
		//}
	}
	
	
	public void addField(Field field) {
		if(this.config_ == null) {
			this.config_ = new FormConfig();
		}
		this.config_.fields.push(field);
		FormGroup fg = new FormGroup(field, this.config_.layout);
		body.addChild(fg);
		fields.push(fg);
	}
	
	public void addField(String name, String label, String type, boolean required) {
		
		
		Field field = new Field();
		field.name = name;
		field.label = label;
		field.type = type;
		field.required = required;
		
		addField(field);
		
	}
	
	public jsweet.lang.Object getFormData(){
		jsweet.lang.Object data = new jsweet.lang.Object();
		for(FormGroup fg : fields) {
			data.$set(fg.getName(), fg.getValue());
		}
		return data;
	}
	
	public void setFormData(jsweet.lang.Object formData) {
		for(FormGroup fg : fields) {
			fg.setValue(formData.$get(fg.getName()));
		}
	}
	
	public FormGroup getFormGroup(String name) {
		for(FormGroup fg : fields) {
			if(fg.getName() ==  name) {
				return fg;
			}
		}
		return null;
	}
	
	public JSContainer addButton(String name, String icon, String label) {
		JSContainer btn  = new JSContainer(name,"a");
		btn.setAttribute("href", "javascript:void(0);");
		String html = "<i class=\"fa "+icon+"\"></i>" + label;
		btn.setHtml(html);
		btn.addClass("btn btn-primary");
		
		return btn;
	}
	
	public JSContainer createBtn(Action act) {
		JSContainer btn  = new JSContainer(act.name,"a");
		btn.setAttribute("href", "javascript:void(0);");
		String html = "<i class=\"fa "+act.icon+"\"></i>" + act.label;
		btn.setHtml(html);
		btn.addEventListener(new EventListener() {
			
			@Override
			public void performAction(Renderable source, Event evt) {
				Function fn = act.event;
				FormGroup ro = source.getAncestorWithClass("form-group");
				fn.call(source, source.getAncestorWithClass("form"), ro);
			}
		}, "click");
		
		return btn;
	}

	public class FormGroup extends JSContainer {

		Field field_;

		private JSContainer uiLabel = new JSContainer("uilabel", "label").addClass("control-label");

		private JSContainer uiInput = new JSContainer("uiinput", "div");
		@SuppressWarnings("rawtypes")
		InputField input;

		public FormGroup(Field field, String layout) {
			super(field.name , "div");
			this.field_ = field;
			addChild(uiLabel);
			addChild(uiInput);
			if(layout == "horizontal") {
				uiLabel.addClass("col-sm-2");
				uiInput.addClass("col-sm-10");
			}
			addClass("form-group");
			if (this.field_.required) {
				addClass("required");
			}
			uiLabel.setHtml(this.field_.label);
			String type = this.field_.type;
			String name = this.field_.name;
			if (type == FormConfig.TEXT_TYPE) {
				input = new JSTextInput(name);
			} else if (type == FormConfig.CHECK_BOX_TYPE) {
				input = new JSCheckBox(name);
			} else if (type == FormConfig.COLOR_TYPE) {
				input = new JSTextInput(name);
				input.setAttribute("type", "color");
			} else if (type == FormConfig.DATE_TYPE) {
				input = new JSDateInput(name);
			} else if (type == FormConfig.FILE_TYPE) {
				input = new JSUpload(name, "");
			} else if (type == FormConfig.LONG_TEXT_TYPE) {
				input = new JSTextArea(name);
			} else if (type == FormConfig.MONTH_TYPE) {
				input = new JSDateInput(name).setType(DateInputTypes.month);
			} else if (type == FormConfig.NUMBER_TYPE) {
				input = new JSNumberInput(name);
			} else if (type == FormConfig.RANGE_TYPE) {
				input = new JSNumberInput(name).setType(NumericInputTypes.range);
			} else if (type == FormConfig.SELECT_TYPE) {
				input = new JSSelect(name);
				((JSSelect) input).setOptions(field_.options);
			} else if (type == FormConfig.TIME_TYPE) {
				input = new JSTimeInput(name);
			} else if (type == FormConfig.WEEK_TYPE) {
				input = new JSDateInput(name).setType(DateInputTypes.week);
			}else if(type == FormConfig.CLOUDINARY_TYPE) {
				input = new CloudinaryInput(name);
			}
			else {
				input = new JSTextInput(name);
			}
			input.setRequired(field_.required);
			input.addClass("form-control");
			uiInput.addChild(input);
			// text,number,range,date,time,month,week,color,select,textarea,checkbox,file

		}
		
		@SuppressWarnings("unchecked")
		public void setValue(Object value) {
			input.setValue(value);
		}
		
		public Object getValue() {
			return input.getValue();
		}

		public Field getField() {
			return field_;
		}

		public JSContainer getUiLabel() {
			return uiLabel;
		}

		public JSContainer getUiInput() {
			return uiInput;
		}

		public InputField<?> getInput() {
			return input;
		}

	}

}
