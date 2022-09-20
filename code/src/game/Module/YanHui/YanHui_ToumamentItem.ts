class YanHui_ToumamentItem extends fairygui.GComponent {

	public nameLb: fairygui.GRichTextField;
	public fwLb: fairygui.GRichTextField;
	public promptLb: fairygui.GRichTextField;
	public costLb: ViewResource2;
	public head: ViewHead;
	public grid0: ViewGrid;
	public grid1: ViewGrid;
	public openBt: Button1;
	public openImg: fairygui.GImage;

	public static URL: string = "ui://4x7dk3lhgz25m";

	public static createInstance(): YanHui_ToumamentItem {
		return <YanHui_ToumamentItem><any>(fairygui.UIPackage.createObject("YanHui", "YanHui_ToumamentItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}

	public vo: Ipartyboss_298;
	public setVo(vo: Ipartyboss_298) {
		let self = this;
		self.vo = vo;
		let cfg = Config.NPC_200[vo.id];
		self.nameLb.text = cfg.name;
		self.head.setdata(RoleUtil.getHeadImg(cfg.head), -1, "", -1, true);
		self.fwLb.text = "氛围值+" + vo.fw + "/人";
		let rewardVo0 = ConfigHelp.makeItemListArr(JSON.parse(vo.reward))[0];
		self.grid0.isShowEff = self.grid0.tipEnabled = true;
		self.grid0.vo = rewardVo0;
		let rewardVo1 = ConfigHelp.makeItemListArr(JSON.parse(vo.reward1))[0];
		self.grid1.isShowEff = self.grid1.tipEnabled = true;
		self.grid1.vo = rewardVo1;
		let costVo = ConfigHelp.makeItemListArr(JSON.parse(vo.consume))[0];
		self.costLb.setImgUrl(costVo.icon);
		self.costLb.setCount(costVo.count);
		self.openBt.visible = GGlobal.modelYanHui.bossData[vo.id] == 0;
		self.openImg.visible = GGlobal.modelYanHui.bossData[vo.id] == 1;
		self.openBt.addClickListener(self.onOpen, self);
	}

	private onOpen() {
		let self = this;
		let model = GGlobal.modelYanHui;
		if (model.roleID != Model_player.voMine.id) {
			return ViewCommonWarn.text("比武只有主人才可开启");
		}
		if (ConfigHelp.checkEnough(self.vo.consume, true)) {
			GGlobal.modelYanHui.CG_House_kaiqiBiwu_11463(this.vo.id);
		}
	}

	public clean() {
		let self = this;
		self.openBt.removeClickListener(self.onOpen, self);
		self.grid0.clean();
		self.grid1.clean();
	}
}