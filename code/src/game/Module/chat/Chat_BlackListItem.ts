class Chat_BlackListItem extends fairygui.GComponent {

	public nameLb: fairygui.GRichTextField;
	public btn: Button1;

	public static URL: string = "ui://fx4pr5qe81i017";

	public static createInstance(): Chat_BlackListItem {
		return <Chat_BlackListItem><any>(fairygui.UIPackage.createObject("chat", "Chat_BlackListItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.nameLb = <fairygui.GRichTextField><any>(this.getChild("nameLb"));
		this.btn = <Button1><any>(this.getChild("btn"));
		this.btn.addClickListener(this.onBt, this);
	}

	private onBt() {
		GGlobal.modelchat.CG_CHAT_REMOVE_BLACKLIST(this.roleId);
	}

	private roleId = 0;
	public show(arr) {
		this.roleId = arr[0];
		this.nameLb.text = arr[1];
	}
}