class ShiLianBuffChooseItem extends fairygui.GComponent {

	public iconImg: fairygui.GLoader;
	public titleIcon: fairygui.GLoader;
	public chooseBt: fairygui.GButton;
	public buffLb: fairygui.GRichTextField;
	public costLb: fairygui.GRichTextField;
	public buyImg: fairygui.GImage;
	public static URL: string = "ui://yqpfulefkh256f";

	public static createInstance(): ShiLianBuffChooseItem {
		return <ShiLianBuffChooseItem><any>(fairygui.UIPackage.createObject("crossKing", "ShiLianBuffChooseItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}

	private costNum = 0;
	public buffData: { attID: number, type: number, attNum: number, isChoose: number };
	public setVo(buffData: { attID: number, type: number, attNum: number, isChoose: number }, cfg: Ikfsl_767) {
		let self = this;
		self.buffData = buffData;
		let cfg1 = Config.slbuff_767[cfg.lx];
		IconUtil.setImg(self.iconImg, Enum_Path.SHILIAN_URL + "grid" + (buffData.type - 1) + ".png");
		self.titleIcon.url = CommonManager.getUrl("crossKing", "buff" + (buffData.type - 1));
		self.buffLb.text = Vo_attr.getShowStr(buffData.attID, buffData.attNum, "+");
		self.costNum = cfg1["dj" + buffData.type];
		self.costLb.text = "消耗:       " + cfg1["dj" + buffData.type];
		self.buyImg.visible = buffData.isChoose == 1;
		self.chooseBt.visible = buffData.isChoose != 1;
		self.chooseBt.addClickListener(self.chooseHandler, self);
	}


	private chooseHandler() {
		let self = this;
		let model = GGlobal.modelkfsl;
		if (model.trialNum >= self.costNum) {
			GGlobal.modelkfsl.CG_CrossTrial_selectBuff_10477([self.buffData.type]);
		} else {
			ViewCommonWarn.text("试炼点不足");
		}
	}

	public clean() {
		let self = this;
		IconUtil.setImg(self.iconImg, null);
		self.chooseBt.removeClickListener(self.chooseHandler, self);
	}
}