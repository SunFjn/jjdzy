class MainMenuBtn extends fairygui.GButton {
	public noticeImg: fairygui.GImage;
	public kfIcon: fairygui.GImage;
	public disImg: fairygui.GImage;
	public static URL: string = "ui://7gxkx46wmp9n4";

	public static createInstance(): MainMenuBtn {
		return <MainMenuBtn><any>(fairygui.UIPackage.createObject("MainUI", "MainMenuBtn"));
	}

	public constructor() {
		super();
	}

	public sortIndex: number = 0;
	public panelId: number = 0;
	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		this.noticeImg = <fairygui.GImage><any>(this.getChild("noticeImg"));
		this.kfIcon = <fairygui.GImage><any>(this.getChild("kfIcon"));
		this.disImg = <fairygui.GImage><any>(this.getChild("disImg"));
		this.checkNotice = false;
		this.checkDisImg = false;
		this.addClickListener(this.openPanelHandle, this);
	}

	public loadComplete: Handler;
	public setIcon(icon: string) {
		ImageLoader.instance.loader(Enum_Path.MAINUI_URL + icon + ".png", this._iconObject.asLoader, this.loadComplete)
	}

	private iconEff: Part;
	public showEff(value: boolean) {
		let s = this;
		if (value) {
			if (!s.iconEff) {
				let cfg = Config.tubiao_003[s.panelId];
				if (s.panelId == UIConst.WUSHENGLIST || s.panelId == UIConst.QUNYINGBANG) {
					s.iconEff = EffectMgr.addEff("uieff/10023", s.displayListContainer, 53, 42, 1000, -1, true);
				} else if (cfg.area == 3) {
					s.iconEff = EffectMgr.addEff("uieff/10021", s.displayListContainer, 70 / 2, 73 / 2, 1000, -1, true);
				} else {
					s.iconEff = EffectMgr.addEff("uieff/10021", s.displayListContainer, 84 / 2, 88 / 2, 1000, -1, true);
				}
			}
		} else {
			if (s.iconEff) {
				EffectMgr.instance.removeEff(s.iconEff);
				s.iconEff = null;
			}
		}
	}

	private _checkNotice: boolean = false;
	public set checkNotice(value: boolean) {
		this.noticeImg.visible = value;
		this._checkNotice = value;
	}

	public get checkNotice(): boolean {
		return this._checkNotice;
	}

	private _checkDisImg: boolean = false;
	public set checkDisImg(value: boolean) {
		this.disImg.visible = value;
		this._checkDisImg = value;
	}

	public get checkDisImg(): boolean {
		return this._checkDisImg;
	}

	private openPanelHandle(): void {
		if (!GGlobal.layerMgr.limitByFB(this.panelId)) {
			return;
		}
		if (GGlobal.layerMgr.isOpenView(this.panelId)) {
			GGlobal.layerMgr.close2(this.panelId);
		} else {
			if (this.panelId == UIConst.MAINTOWN) {
				GGlobal.layerMgr.closeAllPanel();
			} else if (this.panelId == UIConst.CROSS_KING && !ModuleManager.isOpen(UIConst.CROSS_KING)) {
				GGlobal.layerMgr.open(UIConst.CROSS_TEAM);
				return;
			} else if (this.panelId == UIConst.HOME) {
				if (HomeModel.isTimeIn()) {
					ViewCommonWarn.text("府邸数据重置中,0:06开启");
					return;
				}
				GGlobal.homemodel.CG_House_gotoYard_11101(Model_player.voMine.id);
				// GGlobal.homemodel.test(HomeModel.HOME_YARD_MAP);
				return;
			}
			GGlobal.layerMgr.open(this.panelId);
		}
	}

	public uidispose() {
		//clear effect
		this.showEff(false);
		if (this.parent)
			this.parent.removeChild(this);
	}

	public setKF(v: boolean): void {
		this.kfIcon.visible = v
	}

}