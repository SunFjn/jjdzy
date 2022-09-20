/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


class SuperMarblesPoolItem extends fairygui.GComponent {

	public lbTitle: fairygui.GRichTextField;
	public list: fairygui.GList;

	public static URL: string = "ui://gf2tw9lzx9uy5";

	public static createInstance(): SuperMarblesPoolItem {
		return <SuperMarblesPoolItem><any>(fairygui.UIPackage.createObject("superMarbles", "SuperMarblesPoolItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		const self = this;
		CommonManager.parseChildren(self, self);
	}

	public clean(){
		this.list.numItems = 0;
	}

	public update( idx){
		const self = this;
		const model = GGlobal.modelSuperMarbles;
		let cfg = model.cfg[idx];
		self.lbTitle.text = BroadCastManager.reTxt("{0}等奖",idx+1);
		ConfigHelp.createViewGridList(self.list,cfg.show,self);
	}
}