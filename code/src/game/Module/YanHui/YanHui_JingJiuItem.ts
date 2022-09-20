class YanHui_JingJiuItem extends fairygui.GComponent {

	public nameLb: fairygui.GRichTextField;
	public fwLb: fairygui.GRichTextField;
	public surLb: fairygui.GRichTextField;
	public jjBt: fairygui.GButton;
	public costLb: ViewResource2;
	public grid1: ViewGrid;
	public grid0: ViewGrid;

	public static URL: string = "ui://4x7dk3lhgz25t";

	public static createInstance(): YanHui_JingJiuItem {
		return <YanHui_JingJiuItem><any>(fairygui.UIPackage.createObject("YanHui", "YanHui_JingJiuItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}

	public vo: Iparty9_298;
	public setVo(cfg: Iparty9_298) {
		let self = this;
		self.vo = cfg;
		self.nameLb.text = cfg.name;
		self.fwLb.text = "氛围值+" + cfg.fw;
		self.grid0.isShowEff = self.grid0.tipEnabled = true;
		self.grid1.isShowEff = self.grid1.tipEnabled = true;
		self.grid0.vo = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward))[0];
		self.grid1.vo = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward1))[0];
		let surNum = GGlobal.modelYanHui.jingJiuData[cfg.id];
		self.surLb.text = "本场剩余:" + HtmlUtil.fontNoSize(surNum + "", Color.getColorStr(surNum <= 0 ? 6 : 1)) + "/" + cfg.time;
		let costItem = ConfigHelp.makeItemListArr(JSON.parse(cfg.consume))[0];
		self.costLb.setImgUrl(costItem.icon);
		self.costLb.setCount(costItem.count);
		self.jjBt.addClickListener(self.jjHandler, self);
	}

	private jjHandler() {
		let self = this;
		let model = GGlobal.modelYanHui;
		if (model.jingJiuData[self.vo.id] <= 0) {
			ViewCommonWarn.text("无敬酒次数");
			return;
		}
		if (ConfigHelp.checkEnough(self.vo.consume)) {
			GGlobal.modelYanHui.CG_House_jingjiu_11459(self.vo.id);
		} else {
			ModelChongZhi.guideToRecharge(Handler.create(self, function () {
				GGlobal.layerMgr.close2(UIConst.YANHUI_TOAST);
			}))
		}
	}

	public clean() {
		let self = this;
		self.grid0.clean();
		self.grid1.clean();
		self.jjBt.removeClickListener(self.jjHandler, self);
	}
}