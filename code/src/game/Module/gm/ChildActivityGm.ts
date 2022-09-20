class ChildActivityGm extends fairygui.GComponent {
	public btnSend: fairygui.GButton;
	public list: fairygui.GList;

	public static URL: string = "ui://vm9a8xq8q8rv9";

	public static createInstance(): ChildActivityGm {
		return <ChildActivityGm><any>(fairygui.UIPackage.createObject("GM", "ChildActivityGm"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.btnSend = <fairygui.GButton><any>(this.getChild("btnSend"));
		this.list = <fairygui.GList><any>(this.getChild("list"));
		this.list.callbackThisObj = this;
		this.list.itemRenderer = this.renderHandler;
		this.btnSend.addClickListener(this.OnSend, this);
	}

	private OnSend() {
		let content: string = "";
		let arr = this.list._children
		for (let i = 0; i < arr.length; i++) {
			let item: GmBar = arr[i] as GmBar;
			if (i == 0) {
				content += item.lbInput.text;
			} else {
				content += "_" + item.lbInput.text;
			}
		}
		GGlobal.modelGM.CG_GM_CMD(this.obj.type, this.obj.index, content);
	}

	private renderHandler(index: number, obj: fairygui.GObject) {
		let item = obj as GmBar;
		item.show(this.obj.title[index], this.obj.text[index]);
	}

	private obj;
	public show(obj) {
		this.obj = obj;
		this.list.numItems = obj.title.length;
		this.list.resizeToFit(obj.title.length);
	}
}