class View_YanHui_FuYanPanel extends UIModalPanel {

	public frame: fairygui.GLabel;
	public nameLb: fairygui.GRichTextField;
	public grid0: ViewGrid;
	public ptBt: fairygui.GButton;
	public HHBt: fairygui.GButton;
	public costLb0: ViewResource2;
	public promptLb: fairygui.GRichTextField;
	public grid1: ViewGrid;
	public costLb1: ViewResource2;

	public static URL: string = "ui://4x7dk3lhh7qe2";

	public static createInstance(): View_YanHui_FuYanPanel {
		return <View_YanHui_FuYanPanel><any>(fairygui.UIPackage.createObject("YanHui", "View_YanHui_FuYanPanel"));
	}

	public constructor() {
		super();
		YanHuiManager.setExtends();
		this.loadRes("YanHui", "YanHui_atlas0");
	}

	protected childrenCreated(): void {
		let self = this;
		GGlobal.createPack("YanHui");
		self.view = fairygui.UIPackage.createObject("YanHui", "View_YanHui_FuYanPanel").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		super.childrenCreated();
	}

	private vo: Vo_YanHui;
	protected onShown(): void {
		let self = this;
		if (self._args instanceof Vo_YanHui) {
			self.vo = self._args;
		} else if (self._args instanceof Vo_Chat) {
			let arr = self._args.paramCall.split("_");
			let vo = Vo_YanHui.create();
			vo.roleName = arr[0];
			vo.type = Number(arr[1])
			vo.id = Number(arr[2]);
			vo.isPT = Number(arr[3]);
			self.vo = vo;
		}

		let cfg = Config.party_298[self.vo.type];
		let cfg0 = Config.partylw_298[1];
		let cfg1 = Config.partylw_298[2];
		self.nameLb.text = ConfigHelp.reTxt("{0}正在举办{1}({2})\n选择赴宴礼物",
			HtmlUtil.fontNoSize(self.vo.roleName, Color.getColorStr(2)), cfg.name, self.vo.num + "/" + cfg.num)
		self.grid0.isShowEff = self.grid0.tipEnabled = true;
		self.grid0.vo = ConfigHelp.makeItemListArr(JSON.parse(cfg0.reward))[0];
		if (!self.vo.isPT) {
			self.costLb0.visible = self.ptBt.visible = true;
			self.promptLb.visible = false;
			let costItem0 = ConfigHelp.makeItemListArr(JSON.parse(cfg0.consume))[0];
			self.costLb0.setImgUrl(costItem0.icon);
			self.costLb0.setCount(costItem0.count);
			self.ptBt.addClickListener(self.OnPT, self);
		} else {
			self.costLb0.visible = self.ptBt.visible = false;
			self.promptLb.visible = true;
		}
		self.grid1.isShowEff = self.grid1.tipEnabled = true;
		self.grid1.vo = ConfigHelp.makeItemListArr(JSON.parse(cfg1.reward))[0];
		let costItem1 = ConfigHelp.makeItemListArr(JSON.parse(cfg1.consume))[0];
		self.costLb1.setImgUrl(costItem1.icon);
		self.costLb1.setCount(costItem1.count);
		self.HHBt.addClickListener(self.OnHH, self);
	}

	private OnHH() {
		let cfg1 = Config.partylw_298[2];
		if (ConfigHelp.checkEnough(cfg1.consume, false)) {
			GGlobal.modelYanHui.CG_House_fuyan_11455(this.vo.id, 2);
		} else {
			ModelChongZhi.guideToRecharge(Handler.create(self, function () {
				GGlobal.layerMgr.close2(UIConst.YANHUI_FUYAN);
				GGlobal.layerMgr.close2(UIConst.YANHUI);
			}));
		}
	}

	private OnPT() {
		let cfg0 = Config.partylw_298[1];
		if (ConfigHelp.checkEnough(cfg0.consume, false)) {
			GGlobal.modelYanHui.CG_House_fuyan_11455(this.vo.id, 1);
		} else {
			ModelChongZhi.guideToRecharge(Handler.create(self, function () {
				GGlobal.layerMgr.close2(UIConst.YANHUI_FUYAN);
				GGlobal.layerMgr.close2(UIConst.YANHUI);
			}));
		}
	}

	protected onHide(): void {
		let self = this;
		self.costLb0.setImgUrl();
		self.costLb1.setImgUrl();
		self.grid0.clean();
		self.grid1.clean();
	}
}