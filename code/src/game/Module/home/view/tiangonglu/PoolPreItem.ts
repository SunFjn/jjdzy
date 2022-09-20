class PoolPreItem extends fairygui.GComponent {

	public n0: fairygui.GImage;
	public lbName: fairygui.GLoader;
	public lbCondition: fairygui.GRichTextField;
	public lbCost: fairygui.GRichTextField;
	public list: fairygui.GList;

	public static URL: string = "ui://y0plc878ye038";

	public static createInstance(): PoolPreItem {
		return <PoolPreItem><any>(fairygui.UIPackage.createObject("home", "PoolPreItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		const self = this;
		CommonManager.parseChildren(self,self);
		self.list.setVirtual();
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.itemRender;
	}

	private itemRender(idx,obj){
		let item:ViewGrid = obj as ViewGrid;
		item.vo = this.awards[idx];
		item.showEff(true);
		item.tipEnabled = true;
	}

	clean(){
		this.list.numItems = 0;
	}

	awards;
	public setdata(id,max){
		let cfg = Config.fddc_019[max-id];
		let self = this;
		self.lbName.url = ["","ui://y0plc878g2m4y","ui://y0plc878g2m414","ui://y0plc878g2m413","ui://y0plc878g2m411"][cfg.dangci];
		self.awards = ConfigHelp.makeItemListArr(cfg.qdzs);
		self.list.numItems = self.awards.length;
		self.lbCondition.text = "解锁：<font color='#FFC344'>"+cfg.name+"</font>";
		self.lbCost.text = "消耗：<font color='#15f234'>"+cfg.tglxh+"积分/次</font>";
	}
}
