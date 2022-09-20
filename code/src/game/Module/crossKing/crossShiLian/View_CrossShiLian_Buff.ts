class View_CrossShiLian_Buff extends UIModalPanel {
	public contentLb: fairygui.GLabel;
	public static URL: string = "ui://yqpfulefs37b6h";
	public static createInstance(): View_CrossShiLian_Buff {
		return <View_CrossShiLian_Buff><any>(fairygui.UIPackage.createObject("crossKing", "View_CrossShiLian_Buff"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("crossKing", "View_CrossShiLian_Buff").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		super.childrenCreated();
	}

	protected onShown(): void {
		let self = this;
		let str = "";
		let buffData = GGlobal.modelkfsl.hasBuffData;
		for (let key in buffData) {
			str += Vo_attr.getShowStr(parseInt(key), Math.floor(buffData[key] * 100000), "+") + "\n";
		}
		self.contentLb.text = str;
	}

	protected onHide(): void {

	}
}