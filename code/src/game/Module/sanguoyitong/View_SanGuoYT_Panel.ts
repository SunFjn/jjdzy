class View_SanGuoYT_Panel extends UIPanelBase {

	public backImg: fairygui.GLoader;
	public roleGroup: fairygui.GGroup;
	public grid0: ViewGrid;
	public grid1: ViewGrid;
	public grid2: ViewGrid;
	public grid3: ViewGrid;
	public grid4: ViewGrid;
	public bt0: Button2;
	public bt1: Button2;
	public bt2: Button2;
	public bt3: Button2;
	public battleBt: Button0;
	public nameLb: fairygui.GRichTextField;
	public timeLb: fairygui.GRichTextField;
	public gridArr: ViewGrid[] = [];

	public static URL: string = "ui://z4ijxlqktdwd2";

	public constructor() {
		super();
		this.setSkin("sanGuoYiTong", "sanGuoYiTong_atlas0", "View_SanGuoYT_Panel");
	}

	protected setExtends() {
		let f = fairygui.UIObjectFactory
		f.setPackageItemExtension(View_SanGuoYT_ButtomUI.URL, View_SanGuoYT_ButtomUI);
	}

	protected childrenCreated(): void {
		let self = this;
		super.childrenCreated();
		self.gridArr = [self.grid0, self.grid1, self.grid2, self.grid3, self.grid4];
		self.bt0.addClickListener(self.clickHandler, self);
		self.bt1.addClickListener(self.clickHandler, self);
		self.bt1.addClickListener(self.clickHandler, self);
		self.bt1.addClickListener(self.clickHandler, self);
		self.battleBt.addClickListener(self.clickHandler, self);
	}

	private clickHandler(evt: egret.TouchEvent) {
		let self = this;
		let bt = evt.target as Button2;
		switch (bt.hashCode) {
			case self.bt0.hashCode:
				GGlobal.layerMgr.open(UIConst.SANGUO_YITONG_ZLP);
				break;
			case self.bt1.hashCode:
				break;
			case self.bt2.hashCode:
				break;
			case self.bt3.hashCode:
				break;
			case self.battleBt.hashCode:
				GGlobal.modelSanGuoYT.CG_ENTER_SCENE_5801();
				break;
		}
	}

	private awatar: UIRole;
	public updateShow() {
		let self = this;
		let rewardArr = ConfigHelp.makeItemListArr(JSON.parse(Config.xtcs_004[6303].other));
		for (let i = 0; i < self.gridArr.length; i++) {
			let grid = self.gridArr[i];
			grid.isShowEff = true;
			grid.tipEnabled = true;
			grid.vo = rewardArr[i];
		}
		self.roleGroup.visible = false;
		let model = GGlobal.modelSanGuoYT;
		if (model.roleData.id > 0) {
			if (!self.awatar) {
				self.awatar = UIRole.create();
				self.awatar.setPos(270, 250);
			}
			let fashioncfg = Config.sz_739[model.roleData.fashion]
			if (fashioncfg) {
				self.awatar.setBody(fashioncfg.moxing);
				self.awatar.setWeapon(fashioncfg.moxing);
			} else {
				self.awatar.setBody(model.roleData.fashion);
				self.awatar.setWeapon(model.roleData.fashion);
			}
			self.awatar.uiparent = self.displayListContainer;
			self.awatar.onAdd();
		} else {
			self.roleGroup.visible = true;
			if (self.awatar) {
				self.awatar.onRemove();
				self.awatar = null;
			}
		}
		self.battleBt.visible = model.state == 1;
		self.timeLb.visible = model.state != 1;
	}

	protected onShown(): void {
		let self = this;
		IconUtil.setImg(self.backImg, Enum_Path.BACK_URL + "sgyt.png");
		self.updateShow();
		GGlobal.modelSanGuoYT.CG_OPENUI_5819();
	}

	private addListen() {
		let self = this;
		GGlobal.reddot.listen(UIConst.SANGUO_YITONG, self.updateShow, self);
	}

	private removeListen() {
		let self = this;
		GGlobal.reddot.remove(UIConst.SANGUO_YITONG, self.updateShow, self);
	}

	protected onHide(): void {
		let self = this;
		IconUtil.setImg(self.backImg, null);
		ConfigHelp.cleanGridEff(self.gridArr);
		if (self.awatar) {
			self.awatar.onRemove();
			self.awatar = null;
		}
		GGlobal.layerMgr.close(UIConst.SANGUO_YITONG);
	}
}