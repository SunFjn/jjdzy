/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class Item_TianJiangHL extends fairygui.GComponent {

	public n0: fairygui.GImage;
	public n1: fairygui.GImage;
	public lbPro: fairygui.GRichTextField;
	public btn:Button0;
	public ylq: fairygui.GImage;
	public btn1: fairygui.GButton;
	public list: fairygui.GList;
	public lbTips: fairygui.GRichTextField;

	public static URL: string = "ui://gy3mzfqr7jlm1";

	public static createInstance(): Item_TianJiangHL {
		return <Item_TianJiangHL><any>(fairygui.UIPackage.createObject("actComTianJiangHaoli", "Item_TianJiangHL"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		const self = this;
		CommonManager.parseChildren(self, self);
	}

	openCharge = () => {
		ViewChongZhi.tryToOpenCZ();
	}

	getAwards = () => {
		GGlobal.model_actCom.CG_TJHL_DATA_GETAWARDS(this.idx);
	}

	public clean() {
		const self = this;
		self.list.numItems = 0;
		self.btn1.removeClickListener(self.openCharge, self);
		self.btn.removeClickListener(self.getAwards, self);
	}

	idx = 0;
	public setdata(data) {
		const self = this;
		const model = GGlobal.model_actCom;
		self.btn1.addClickListener(self.openCharge, self);
		self.btn.addClickListener(self.getAwards, self);
		self.btn.checkNotice = true;

		self.idx = data.id;
		const lib = Config.tjhl_335[self.idx];
		ConfigHelp.createViewGridList(self.list, lib.reward, self);
		self.btn.visible = data.st == 1;
		self.btn1.visible = data.st == 0;
		self.ylq.visible = data.st == 2;

		const targeValue = data.cfg.lj;
		let color = targeValue <= model.tianJiangHl_rechargeValue ? Color.GREENSTR : Color.REDSTR;
		self.lbPro.text = BroadCastManager.reTxt("累计充值{0}元,可领取<font color='{1}'>({2}/{3})</font>", targeValue, color, model.tianJiangHl_rechargeValue, targeValue);
		self.lbTips.text = BroadCastManager.reTxt("(再充值<font color='{0}'>{1}</font>元可领取)",Color.GREENSTR,targeValue-model.tianJiangHl_rechargeValue);
		self.lbTips.visible = targeValue>model.tianJiangHl_rechargeValue;
	}
}