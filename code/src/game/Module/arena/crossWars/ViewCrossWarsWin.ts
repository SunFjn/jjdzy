class ViewCrossWarsWin extends UIModalPanel {

	public lbTitle: fairygui.GTextField;
	public lbTips: fairygui.GTextField;
	public lbReward: fairygui.GTextField;
	public list: fairygui.GList;
	public btnGet: Button1;
	public btnMobai: Button1;
	public ply0: VCrossWarsWin;
	public ply1: VCrossWarsWin;
	public ply2: VCrossWarsWin;
	public ply3: VCrossWarsWin;
	public ply4: VCrossWarsWin;
	public imgHas: fairygui.GImage;
	public imgMobai: fairygui.GImage;

	public static URL: string = "ui://yqpfulef6wztf";

	private _plyArr: Array<VCrossWarsWin>;

	public static createInstance(): ViewCrossWarsWin {
		return <ViewCrossWarsWin><any>(fairygui.UIPackage.createObject("Arena", "ViewCrossWarsWin"));
	}

	public constructor() {
		super();
		this.loadRes();
	}

	protected childrenCreated(): void {
		let self = this;
		GGlobal.createPack("Arena");
		self.view = fairygui.UIPackage.createObject("Arena", "ViewCrossWarsWin").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		super.childrenCreated();

		self._plyArr = [self.ply0, self.ply1, self.ply2, self.ply3, self.ply4]
		self.list.itemRenderer = self.renderListItem;
		self.list.callbackThisObj = self;
		self.list.setVirtual();
		self.imgHas.visible = false;
	}
	public resetPosition(): void {
		let self = this;
		self.setXY((fairygui.GRoot.inst.width - self.width) >> 1, (fairygui.GRoot.inst.height - self.height) >> 1);
	}
	protected onShown(): void {
		let self = this;
		self.addListen();
		self.update();
		GGlobal.modelCrossWars.CG_OPEN_WINERS()
	}

	protected onHide(): void {
		this.removeListen();
	}

	private addListen(): void {
		let self = this;
		self.btnMobai.addClickListener(self.onMobai, self);
		self.btnGet.addClickListener(self.onGet, self);
		GGlobal.control.listen(Enum_MsgType.CROSSWARS_OPEN_WINERS, self.update, self)
	}

	private removeListen(): void {
		let self = this;
		self.btnMobai.removeClickListener(self.onMobai, self);
		self.btnGet.removeClickListener(self.onGet, self);
		GGlobal.control.remove(Enum_MsgType.CROSSWARS_OPEN_WINERS, self.update, self)
		GGlobal.layerMgr.close(UIConst.CROSS_WARS_WIN);
		self.list.numItems = 0;
	}

	private _winRewardArr: IGridImpl[]
	private update(): void {
		let self = this;
		if (self._winRewardArr == null) {
			self._winRewardArr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(ConfigHelp.getSystemDesc(2403)))
		}
		self.list.numItems = self._winRewardArr.length;

		for (let i = 0; i < self._plyArr.length; i++) {
			let hasData: boolean = false;
			for (let j = 0; j < Model_CrossWars.winPlyArr.length; j++) {
				if ((i + 1) == Model_CrossWars.winPlyArr[j].turn) {
					self._plyArr[i].setVo(Model_CrossWars.winPlyArr[j], i + 1);
					hasData = true;
					break;
				}
			}
			if (!hasData) {
				self._plyArr[i].setVo(null, i + 1);
			}
		}


		if (Model_CrossWars.actStatus == 0) {
			self.imgMobai.visible = Model_CrossWars.winMobai > 0;
			self.btnGet.enabled = self.btnGet.checkNotice = Model_CrossWars.winReward > 0;
			if (Model_CrossWars.winMobai == 0 && Model_CrossWars.winPlyArr.length > 0) {
				self.btnMobai.visible = self.btnMobai.touchable = true;
				self.btnMobai.checkNotice = true;
			} else {
				self.btnMobai.visible = self.btnMobai.touchable = false;
			}
		} else {
			self.btnGet.enabled = self.btnGet.checkNotice = false;
			self.btnMobai.visible = self.btnMobai.touchable = false;
			self.imgMobai.visible = false;
		}
	}

	private renderListItem(index: number, obj: fairygui.GObject): void {
		var item: ViewGrid = obj as ViewGrid;
		item.isShowEff = true;
		item.tipEnabled = true;
		item.vo = this._winRewardArr[index];
	}

	private onMobai(): void {
		if (Model_CrossWars.actStatus == 1) {
			ViewCommonWarn.text("赛事未结束")
			return;
		}
		if (Model_CrossWars.winMobai == 0) {
			GGlobal.modelCrossWars.CG_MOBAI();
		}
	}

	private onGet(): void {
		if (Model_CrossWars.actStatus == 1) {
			ViewCommonWarn.text("赛事未结束")
			return;
		}
		if (Model_CrossWars.winReward > 0) {
			GGlobal.modelCrossWars.CG_GET_FRIST();
		} else {
			ViewCommonWarn.text("没有可领取的奖励")
		}
	}
}