class View_DuanZao_Panel extends UIPanelBase {

	//>>>>start
	public c1: fairygui.Controller;
	public frame: WindowFrame1;
	public tab0: TabButton;
	public tab1: TabButton;
	public tab2: TabButton;
	public tab3: TabButton;
	public grid0: ViewGrid;
	public grid1: ViewGrid;
	public grid2: ViewGrid;
	public grid3: ViewGrid;
	public grid4: ViewGrid;
	public grid5: ViewGrid;
	public grid6: ViewGrid;
	public grid7: ViewGrid;
	public grid8: ViewGrid;
	public grid9: ViewGrid;
	public selectImg: fairygui.GImage;
	public powerLb: fairygui.GLabel;
	public backImg: fairygui.GLoader;
	//>>>>end

	public static URL: string = "ui://pofv8989lqbq0";

	// public tabArr: Array<TabButton> = [];
	public gridArr: Array<ViewGrid> = [];

	private _tabContronller: TabController;

	public constructor() {
		super();
		this.setSkin("DuanZao", "DuanZao_atlas0", "View_DuanZao_Panel");
	}
	protected setExtends() {
		fairygui.UIObjectFactory.setPackageItemExtension(Child_DuanZao_Streng.URL, Child_DuanZao_Streng);
		fairygui.UIObjectFactory.setPackageItemExtension(Child_DuanZao_Stone.URL, Child_DuanZao_Stone);
		fairygui.UIObjectFactory.setPackageItemExtension(Child_DuanZao_UpStar.URL, Child_DuanZao_UpStar);
		fairygui.UIObjectFactory.setPackageItemExtension(Child_DuanZao_ZhuHun.URL, Child_DuanZao_ZhuHun);
		fairygui.UIObjectFactory.setPackageItemExtension(GemBt.URL, GemBt);
	}

	protected initView(): void {
		super.initView();
		let a = this;

		this._tabContronller = new TabController();
		this._tabContronller.initView(this, this.c1);
		this._tabContronller.setPanelClassMap(
			[
				Child_DuanZao_Streng,
				Child_DuanZao_Stone,
				Child_DuanZao_UpStar,
				Child_DuanZao_ZhuHun,
			]
		);

		this._tabContronller.tabChange = this.onTabChange;
		this._tabContronller.tabChangeCaller = this;

		for (let i = 0; i < 10; i++) {
			var grid: ViewGrid = a[`grid${i}`];
			a.gridArr.push(grid);
			grid.addClickListener(a.gridHandle, a);
		}

		a.curGrid = a.gridArr[0];
	}

	private _uidList = [UIConst.DUANZAO_STRENG, UIConst.DUANZAO_STONE, UIConst.DUANZAO_STAR, UIConst.DUANZAO_ZHUHUN];
	private onTabChange(pTabIndex: number, pVo: TabBtnVo): boolean {
		let arr = this._uidList;
		if (!ModuleManager.isOpen(arr[pTabIndex], true)) {
			return false;
		}

		let a = this;
		if (a.curGrid) a.curGrid.choose = false;
		a.curGrid = null;
		a.updateEquip();

		//设置传入页面的参数数据
		pVo.data = a.curGrid.vo;

		return true;
	}

	private curGrid: ViewGrid;
	private gridHandle(event: egret.TouchEvent): void {
		let a = this;
		let grid: ViewGrid = event.target as ViewGrid;
		if (a.curGrid.id == grid.id) return;
		a.selectImg.x = grid.x - 10;
		a.selectImg.y = grid.y - 7;
		a.curGrid = grid;
		a.updateShow();
	}

	public updateShow(): void {
		let a = this;
		let vo: VoEquip = a.curGrid.vo as VoEquip;
		if (!vo)
			return;
		let t_curPanel = this._tabContronller.curPanel;
		if (t_curPanel)
			t_curPanel.openPanel(vo);
	}

	public updateEquip(): void {
		let a = this;
		let t_tabBtnList = this._tabContronller.tabBtnList;
		for (let i = 0; i < t_tabBtnList.length; i++) {
			t_tabBtnList[i].btn.checkNotice = GGlobal.reddot.checkCondition(UIConst.DUANZAO_STRENG, i);
		}

		Model_DuanZao.strengMinLV = 0;
		Model_DuanZao.gemLv = 0;
		Model_DuanZao.starMinLv = 0;
		var powerNum: number = 0;
		var equipData: any = Model_player.voMine.equipData;
		for (let i = 0; i < a.gridArr.length; i++) {
			let vo: VoEquip = equipData[i];
			a.gridArr[i].vo = vo;
			a.gridArr[i].showEff(true);
			a.gridArr[i].touchable = true;
			if (vo && !a.curGrid) {
				a.curGrid = a.gridArr[i];
			}
			if (!vo) {
				Model_DuanZao.starMinLv = 0;
				Model_DuanZao.strengMinLV = 0;
				continue;
			}
			switch (a.c1.selectedIndex) {
				case 0:
					a.gridArr[i].checkNotice = Model_DuanZao.gridShowNotice_Streng(vo);
					a.gridArr[i].showText = vo.qh + "";
					powerNum += Config.dzqianghua_209[vo.qh].power;
					if (i == 0) {
						Model_DuanZao.strengMinLV = vo.qh
					} else if (vo.qh < Model_DuanZao.strengMinLV) {
						Model_DuanZao.strengMinLV = vo.qh;
					}
					break;
				case 1:
					a.gridArr[i].checkNotice = Model_DuanZao.gridShowNotice_Stone(vo);
					let len = vo.bs.length;
					for (let i = 0; i < len; i++) {
						if (vo.bs[i] > 0) {
							powerNum += Config.dzgem_209[vo.bs[i]].power;
							Model_DuanZao.gemLv += Config.dzgem_209[vo.bs[i]].lv;
						}
					}
					break;
				case 2:
					a.gridArr[i].checkNotice = Model_DuanZao.checkUpStarGridNotice(vo);
					a.gridArr[i].showText = vo.starLv + "";
					if (i == 0) {
						Model_DuanZao.starMinLv = vo.starLv;
					} else if (vo.starLv < Model_DuanZao.starMinLv) {
						Model_DuanZao.starMinLv = vo.starLv;
					}
					break;
				case 3:
					powerNum += Config.dzsoul_209[vo.zhuHunLv].power;
					a.gridArr[i].showText = vo.zhuHunLv + "阶";
					break;
			}
		}

		if (a.c1.selectedIndex == 3) {
			powerNum += Config.dzinsoul_209[1].power * Model_DuanZao.drugArr[0];
			powerNum += Config.dzinsoul_209[2].power * Model_DuanZao.drugArr[1];
			powerNum += Config.dzinsoul_209[3].power * Model_DuanZao.drugArr[2];
			for (let i = 0; i < a.gridArr.length; i++) {
				let equipVo = a.gridArr[i].vo as VoEquip;
				a.gridArr[i].touchable = false;
				a.gridArr[i].checkNotice = false;
				if (i == 0) {
					a.curGrid = a.gridArr[i];
				} else if (equipVo.zhuHunLv < (a.curGrid.vo as VoEquip).zhuHunLv) {
					a.curGrid = a.gridArr[i];
				}
			}
		} else if (a.c1.selectedIndex == 2) {
			powerNum += Model_DuanZao.upstarPower;
			for (let i = 0; i < a.gridArr.length; i++) {
				let equipVo = a.gridArr[i].vo as VoEquip;
				a.gridArr[i].touchable = false;
				a.gridArr[i].checkNotice = false;
				if (i == 0) {
					a.curGrid = a.gridArr[i];
				} else if (equipVo.starLv < (a.curGrid.vo as VoEquip).starLv) {
					a.curGrid = a.gridArr[i];
				}
			}
		}
		a.powerLb.text = powerNum + "";
		if (a.curGrid && a.curGrid.vo) {
			a.curGrid = a.gridArr[(a.curGrid.vo as VoEquip).type];
			if (a.c1.selectedIndex == 3) {
				a.curGrid.checkNotice = Model_DuanZao.checkZhuHunGridNotice(a.curGrid.vo as VoEquip);
			} else if (a.c1.selectedIndex == 2) {
				a.curGrid.checkNotice = Model_DuanZao.checkUpStarGridNotice(a.curGrid.vo as VoEquip);
			}
		}
		a.selectImg.x = a.curGrid.x - 10;
		a.selectImg.y = a.curGrid.y - 7;
		// a.updateShow();
	}

	protected onShown(): void {
		let a = this;
		a._tabContronller.registerEvent(true);

		let t_selectIndex = 0;
		if (a._args)
			t_selectIndex = a._args;
		a._tabContronller.selectedIndex = -1;
		a._tabContronller.selectedIndex = t_selectIndex;
		IconUtil.setImg(a.backImg, Enum_Path.BACK_URL + "forgingbg.jpg");
		GGlobal.reddot.listen(ReddotEvent.CHECK_DAUNZAO, a.onCheckDuanzao, a);
		GGlobal.control.listen(Enum_MsgType.DUANZAO_EFF_UPDATE, a.showEff, a);
	}

	protected onHide(): void {
		let a = this;
		a._tabContronller.registerEvent(false);
		a._tabContronller.close();
		IconUtil.setImg(a.backImg, null);
		GGlobal.layerMgr.close(UIConst.DUANZAO_STRENG);
		GGlobal.reddot.remove(ReddotEvent.CHECK_DAUNZAO, a.onCheckDuanzao, a);
		GGlobal.control.remove(Enum_MsgType.DUANZAO_EFF_UPDATE, a.showEff, a);
		ConfigHelp.cleanGridEff(a.gridArr);
		ConfigHelp.cleanGridEff(a.curGrid)
	}

	private onCheckDuanzao() {
		let self = this;
		self.updateEquip();
		self.updateShow();
	}

	public showEff(posArr: Array<any>): void {
		let t_panel: Child_DuanZao_Streng = <any>this._tabContronller.getTabPanelInstByIndex(0);
		if (t_panel && t_panel.grid) {
			EffectMgr.addEff("uieff/10027", t_panel.grid.displayListContainer, t_panel.grid.width / 2, t_panel.grid.height / 2, 400, 400, false);
		}
	}

	public check_guideTab(arg) {
		return this.c1.selectedIndex == arg;
	}

	public guideTab(arg) {
		let tab = this._tabContronller.getTabBtnByIndex(arg);
		if (tab) {
			GuideStepManager.instance.showGuide(tab, tab.width / 2, tab.height / 2);
		}
	}

	public guide_duanzao_keyStreng(step) {
		let t_panel: Child_DuanZao_Streng = <any>this._tabContronller.getTabPanelInstByIndex(0);
		if (t_panel)
			t_panel.guide_duanzao_keyStreng(step);
	}

	public dispose() {
		if (this._tabContronller)
			this._tabContronller.destroy();
		super.dispose();
	}

	public guideClosePanel(step) {
		let btn = this.closeButton.asButton;
		GuideStepManager.instance.showGuide(btn, btn.width / 2, btn.height / 2, null, true);
		GuideStepManager.instance.showGuide1(step.source.index, btn, 0, btn.height / 2, 180, -250, -35, true);
	}
}