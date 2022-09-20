class GMProtInputItem extends fairygui.GComponent {

	public lb: fairygui.GRichTextField;
	public contentLb: fairygui.GTextInput;

	public static URL: string = "ui://vm9a8xq8pckgd";
	public static createInstance(): GMProtInputItem {
		return <GMProtInputItem><any>(fairygui.UIPackage.createObject("GM", "GMProtInputItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.lb = <fairygui.GRichTextField><any>(this.getChild("lb"));
		this.contentLb = <fairygui.GTextInput><any>(this.getChild("contentLb"));
	}

	public show(str) {
		if (str instanceof Array) {
			this.lb.data = "array";
			this.lb.text = JSON.stringify(str);
		} else {
			this.lb.text = str;
		}
		this.contentLb.text = "";
	}
	public getNumber() {
		var num = parseInt(this.contentLb.text);
		return num;
	}

	public flush(bytes: BaseBytes) {
		var type;
		if (this.lb.data == "array") {
			let arr = JSON.parse(this.contentLb.text);
			let typeArr = JSON.parse(this.lb.text);
			bytes.writeShort(arr.length);
			for (var i = 0, n = arr.length; i < n; i++) {
				type = typeArr[i];
				if (type == "B") {
					bytes.writeByte(this.getNumber());
				} else if (type == "S") {
					bytes.writeShort(this.getNumber());
				} else if (type == "I") {
					bytes.writeInt(this.getNumber());
				} else if (type == "L") {
					bytes.writeLong(this.getNumber());
				} else if (type == "U") {
					bytes.writeUTF(this.contentLb.text);
				}
			}
		} else {
			type = this.lb.text;
			if (type == "B") {
				bytes.writeByte(this.getNumber());
			} else if (type == "S") {
				bytes.writeShort(this.getNumber());
			} else if (type == "I") {
				bytes.writeInt(this.getNumber());
			} else if (type == "L") {
				bytes.writeLong(this.getNumber());
			} else if (type == "U") {
				bytes.writeUTF(this.contentLb.text);
			}
		}
	}
}