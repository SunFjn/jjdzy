class View_QuickBuy_Panel extends UIModalPanel {
	public btnMin: Button2;
	public btnReduce: Button2;
	public btnAdd: Button2;
	public lbCount: fairygui.GRichTextField;
	public btnMax: Button2;
	public groupUse: fairygui.GGroup;
	public btnEsc: Button0;
	public btnBuy: Button1;
	public surLb: fairygui.GRichTextField;
	public grid: ViewGrid;
	public nameLb: fairygui.GRichTextField;
	public costLb: fairygui.GRichTextField;

	public static URL: string = "ui://jvxpx9emnbrv3fm";

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("common", "View_QuickBuy_Panel").asCom;
		self.contentPane = self.view;
		self.btnMin = <Button2><any>(self.view.getChild("btnMin"));
		self.btnReduce = <Button2><any>(self.view.getChild("btnReduce"));
		self.btnAdd = <Button2><any>(self.view.getChild("btnAdd"));
		self.lbCount = <fairygui.GRichTextField><any>(self.view.getChild("lbCount"));
		self.btnMax = <Button2><any>(self.view.getChild("btnMax"));
		self.groupUse = <fairygui.GGroup><any>(self.view.getChild("groupUse"));
		self.btnEsc = <Button0><any>(self.view.getChild("btnEsc"));
		self.btnBuy = <Button1><any>(self.view.getChild("btnBuy"));
		self.surLb = <fairygui.GRichTextField><any>(self.view.getChild("surLb"));
		self.grid = <ViewGrid><any>(self.view.getChild("grid"));
		self.grid.isShowEff = true;
		self.nameLb = <fairygui.GRichTextField><any>(self.view.getChild("nameLb"));
		self.costLb = <fairygui.GRichTextField><any>(self.view.getChild("costLb"));
		self.btnMin.addClickListener(self.btnHandler, self);
		self.btnReduce.addClickListener(self.btnHandler, self);
		self.btnAdd.addClickListener(self.btnHandler, self);
		self.btnMax.addClickListener(self.btnHandler, self);
		self.btnEsc.addClickListener(self.closeEventHandler, self);
		self.btnBuy.addClickListener(self.buyHandler, self);
		super.childrenCreated();
	}

	private buyHandler() {
		let self = this;
		let cfg: Ibuy_269 = self._args[0];
		let num = parseInt(self.lbCount.text);
		if (Model_player.voMine.yuanbao >= num * self.price) {
			GGlobal.modelshop.CG_QUICKBUY_BUY_5251(cfg.id, num);
			self.doHideAnimation();
		} else {
			ModelChongZhi.guideToRecharge();
		}
	}

	private btnHandler(evt: egret.TouchEvent) {
		let self = this;
		let bt = evt.target as fairygui.GButton;
		let num = parseInt(self.lbCount.text);
		switch (bt.id) {
			case self.btnMin.id:
				if (num <= 1) return;
				if (num <= 10) {
					num = 1;
				} else {
					num -= 10;
				}
				break
			case self.btnReduce.id:
				if (num <= 1) return;
				num -= 1;
				break
			case self.btnAdd.id:
				if (num >= self.max) return;
				num++;
				break
			case self.btnMax.id:
				if (num >= self.max) return;
				if (num + 10 >= self.max) {
					num = self.max;
				} else {
					num += 10;
				}
				break
		}
		self.lbCount.text = num + "";
		if (Model_player.voMine.yuanbao >= num * self.price) {
			self.costLb.text = "总价：      " + HtmlUtil.fontNoSize(self.price * num + "", Color.getColorStr(2));
		} else {
			self.costLb.text = "总价：      " + HtmlUtil.fontNoSize(self.price * num + "", Color.getColorStr(6));
		}
	}

	private max = 0;
	private price = 0;
	protected onShown(): void {
		let self = this;
		let cfg: Ibuy_269 = self._args[0];
		let ct = self._args[1];
		let vo = ConfigHelp.makeItemListArr(JSON.parse(cfg.store))[0];
		self.grid.vo = vo;
		self.grid.tipEnabled = true;
		self.nameLb.text = vo.name;
		self.nameLb.color = vo.qColor;
		let vo1 = ConfigHelp.makeItemListArr(JSON.parse(cfg.conmuse))[0];
		self.price = vo1.count;
		if (cfg.max == 0) {
			self.max = View_QuickBuy_Panel.LAST_MAX;
			self.surLb.text = "单次购买上限：" + HtmlUtil.fontNoSize(self.max + "", Color.getColorStr(2));
		} else {
			self.max = Model_Shop.buyArr[cfg.id] ? cfg.max - Model_Shop.buyArr[cfg.id] : cfg.max;
			self.surLb.text = "今日剩余购买次数：" + HtmlUtil.fontNoSize(self.max + "", Color.getColorStr(2));
		}

		self.lbCount.text = "" + ct;
		if (Model_player.voMine.yuanbao >= ct * self.price) {
			self.costLb.text = "总价：      " + HtmlUtil.fontNoSize(self.price * ct + "", Color.getColorStr(2));
		} else {
			self.costLb.text = "总价：      " + HtmlUtil.fontNoSize(self.price * ct + "", Color.getColorStr(6));
		}
	}

	protected onHide(): void {
		this.grid.clean();
		GGlobal.layerMgr.close(UIConst.QUICK_BUY);
	}
	public static LAST_MAX = 9999;
	public static isFirt: boolean = true;
	private static itemVo: VoItem;
	public static ct: number;
	//ct  建议购买数量
	public static show(vo: VoItem = null, ct = 1) {
		if (View_QuickBuy_Panel.isFirt) {
			View_QuickBuy_Panel.itemVo = vo;
			View_QuickBuy_Panel.ct = ct;
			GGlobal.modelshop.CG_OPEN_QUICKBUY_5253();
		} else {
			if (vo) View_QuickBuy_Panel.itemVo = vo;
			// View_QuickBuy_Panel.ct = ct;
			for (let key in Config.buy_269) {
				let cfg = Config.buy_269[key];
				if (View_QuickBuy_Panel.itemVo.id == JSON.parse(cfg.store)[0][1]) {
					if (cfg.max != 0 && Model_Shop.buyArr[cfg.id] && Model_Shop.buyArr[cfg.id] >= cfg.max) {
						ViewCommonWarn.text("已达购买上限");
					} else {
						let lastCt//剩余 可购买
						if (cfg.max == 0) {
							lastCt = View_QuickBuy_Panel.LAST_MAX
						} else {
							lastCt = Model_Shop.buyArr[cfg.id] ? cfg.max - Model_Shop.buyArr[cfg.id] : cfg.max
						}
						if (ct > lastCt) {
							ct = lastCt
						}
						if (ct <= 0) {
							ct = 1;
						}
						GGlobal.layerMgr.open(UIConst.QUICK_BUY, [cfg, ct]);
					}
					break;
				}
			}
		}
	}
}