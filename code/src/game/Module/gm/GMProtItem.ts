class GMProtItem extends fairygui.GComponent {

	public titleLb: fairygui.GRichTextField;
	public list: fairygui.GList;
	public sendBt: fairygui.GButton;

	public static URL: string = "ui://vm9a8xq8pckgc";

	public static createInstance(): GMProtItem {
		return <GMProtItem><any>(fairygui.UIPackage.createObject("GM", "GMProtItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.titleLb = <fairygui.GRichTextField><any>(this.getChild("titleLb"));
		this.sendBt = <fairygui.GButton><any>(this.getChild("sendBt"));
		this.sendBt.addClickListener(this.onSendT, this);
		this.list = <fairygui.GList><any>(this.getChild("list"));
		this.list.callbackThisObj = this;
		this.list.itemRenderer = this.renderHandler;
	}

	private renderHandler(index: number, obj: fairygui.GObject) {
		let item = obj as GMProtInputItem;
		item.show(this.typeArr[index]);
	}

	private typeArr = [];
	public show(obj) {
		this.data = obj;
		this.titleLb.text = obj.label + obj.decs;
		this.typeArr = obj.types;
		this.list.numItems = obj.types.length;
	}

	protected onSendT() {
		var data = this.data;
		var bytes = GGlobal.modelGM.getBytes();
		for (var i = 0, n = this.list.numChildren; i < n; i++) {
			var item = this.list.getChildAt(i) as GMProtInputItem;
			item.flush(bytes);
		}
		GGlobal.modelGM.sendSocket(data.cmd, bytes);
	}
}