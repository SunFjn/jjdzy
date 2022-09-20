class ViewRankPanel extends UIPanelBase {

	// public imgBg: fairygui.GLoader;
	public listTab: fairygui.GList;
	public listData: fairygui.GList;
	public labRankMy: fairygui.GRichTextField;
	public labLevelMy: fairygui.GTextField;
	public imgRank: fairygui.GImage;
	public imgNameBg: fairygui.GImage;
	public labName: fairygui.GTextField;
	public labTips: fairygui.GTextField;
	public gPlayer: fairygui.GGroup;
	public imgNo: fairygui.GImage;
	public imgDi: fairygui.GImage;
	public imgNo1: fairygui.GImage;
	public gvip: ChildRankItem;
	public labNoVip: fairygui.GTextField;
	public imgTitle: fairygui.GLoader;
	public imgCountry: fairygui.GLoader;

	public static URL: string = "ui://y2wvab26mq9u0";

	private awatar: UIRole = null;
	private _index: number;
	private _vo: any;

	public static createInstance(): ViewRankPanel {
		return <ViewRankPanel><any>(fairygui.UIPackage.createObject("rank", "ViewRankPanel"));
	}

	public constructor() {
		super();
		this.setSkin("rank", "rank_atlas0", "ViewRankPanel");
	}
	protected setExtends() {
		fairygui.UIObjectFactory.setPackageItemExtension(ChildRank.URL, ChildRank);
		fairygui.UIObjectFactory.setPackageItemExtension(ChildRankItem.URL, ChildRankItem);
	}

	protected initView(): void {
		super.initView();
		let self = this;
		self.listTab.itemRenderer = self.renderTab;
		self.listTab.callbackThisObj = self;
		self.listTab.setVirtual();

		self.listData.itemRenderer = self.renderData;
		self.listData.callbackThisObj = self;
		self.listData.setVirtual();
		self._index = self.displayListContainer.getChildIndex(self.imgDi.displayObject)
	}

	protected onShown(): void {
		let self = this;
		self.addListen();
		self.updateView();
	}

	protected onHide(): void {
		let self = this;
		self.removeListen();
		self.removeR()
	}

	private addListen(): void {
		let self = this;
		self.listTab.addEventListener(fairygui.ItemEvent.CLICK, self.selectPage, self);
		GGlobal.control.listen(Enum_MsgType.RANK_UPDATE, self.upSelectData, self)
	}

	private removeListen(): void {
		let self = this;
		self.listTab.removeEventListener(fairygui.ItemEvent.CLICK, self.selectPage, self);
		GGlobal.control.remove(Enum_MsgType.RANK_UPDATE, self.upSelectData, self)
		GGlobal.layerMgr.close(UIConst.RANK);
		if (self._selectdVo) {
			self._selectdVo = null
		}
	}

	private updateView(): void {
		let self = this;
		var index = 0;
		if (self._args) {
			index = self._args;
		}
		self.listTab.numItems = Model_Rank.rankTabArr.length;
		self.listTab.selectedIndex = index;
		self.listTab.scrollToView(index);
		self.upSelect(Model_Rank.rankTabArr[index]);
	}

	private _selectdVo: any
	private selectPage(e: fairygui.ItemEvent) {
		var btn: fairygui.GButton = e.itemObject as fairygui.GButton
		this.upSelect(btn.data);
	}

	private upSelect(v): void {
		let self = this;
		self._selectdVo = v;
		GGlobal.modelRank.CG_GET_RANK_LIST(v.TYPE)
		self.upSelectData();
	}

	private _dataList: Array<VoRank>
	private _dataFirst: VoRank;
	private _dataMy: VoRank;
	private upSelectData(): void {
		let self = this;
		var vo = self._selectdVo;
		self._vo = vo;
		self._dataList = Model_Rank.rankData[vo.TYPE];
		self._dataMy = null;
		if (self._dataList) {
			for (let i = 0; i < self._dataList.length; i++) {
				if (self._dataList[i].plyId == Model_player.voMine.id) {
					self._dataMy = self._dataList[i];
					break;
				}
			}
		}
		if (self._dataList && self._dataList[0]) {
			self._dataFirst = self._dataList[0];
		} else {
			self._dataFirst = null
		}
		self.listData.numItems = 19;
		self.listData.scrollToView(0);
		//第一名
		self.removeR();
		if (self._dataFirst == null) {
			self.gPlayer.visible = false;
			self.imgRank.visible = false;
			self.imgNo.visible = true;
			self.imgNo1.visible = true;
			self.imgTitle.visible = false;
			self.imgCountry.visible = false;
		} else {
			var rankCfg = Config.paihangbang_711[vo.TYPE]
			if (rankCfg.ONE > 0) {
				self.imgTitle.visible = true;
				ImageLoader.instance.loader(Enum_Path.TITLE_URL + Config.chenghao_702[rankCfg.ONE].picture + ".png", self.imgTitle);
			} else {
				self.imgTitle.visible = false;
			}
			var country = self._dataFirst.showCoun == 0 ? self._dataFirst.country : 0;
			if (country > 0) {
				self.imgCountry.url = CommonManager.getCommonUrl("country" + country);
				self.imgCountry.visible = true;
			} else {
				self.imgCountry.visible = false;
			}
			self.createR();
			let fscfg = Config.sz_739[self._dataFirst.job];
			let moxing = 0;
			if (fscfg) {
				moxing = fscfg.moxing;
				self.awatar.setBody(moxing);
				self.awatar.setWeapon(self._dataFirst.job);
			} else {
				moxing = self._dataFirst.job;
				self.awatar.setBody(moxing);
				self.awatar.setWeapon(moxing);
			}
			self.awatar.setGodWeapon(self._dataFirst.godWeapon);
			self.awatar.setHorseId(self._dataFirst.horseId);
			if (self._dataFirst.horseId) {
				self.awatar.setScaleXY(0.8, 0.8);
			} else {
				self.awatar.setScaleXY(1.4, 1.4);
			}
			self.awatar.uiparent = self.displayListContainer;
			self.awatar.onAdd();
			self.imgNo.visible = false;
			self.imgNo1.visible = false;
			self.gPlayer.visible = true;
			self.imgRank.visible = true;
			self.labName.text = "<font color='#f2be0a'>" + Model_GuanXian.getJiangXianStr1(self._dataFirst.guanxian) + "</font>   " + self._dataFirst.name;
			if (vo.TYPE == 1 && self._dataFirst) {
				self.gvip.setTxt(Model_Rank.setRankTxt(self._dataFirst) + "(" + self._dataFirst.lunhui + "世轮回)", self.imgNameBg);
			} else {
				self.gvip.setTxt(Model_Rank.setRankTxt(self._dataFirst) + "    " + Model_Rank.setPowerTxt(self._dataFirst), self.imgNameBg);
			}
			self.gvip.lbVip.text = ConfigHelp.getVipShow(self._dataFirst.vip);;
			if (self._dataFirst.vip > 0) {
				self.gvip.visible = true;
				self.labNoVip.text = ""
			} else {
				self.gvip.visible = false;
				// self.labNoVip.text = Model_Rank.setRankTxt(self._dataFirst) + "    " + Model_Rank.setPowerTxt(self._dataFirst)
				if (vo.TYPE == 1 && self._dataFirst) {
					self.labNoVip.text = Model_Rank.setRankTxt(self._dataFirst) + "(" + self._dataFirst.lunhui + "世轮回)";
				} else {
					self.labNoVip.text = Model_Rank.setRankTxt(self._dataFirst) + "    " + Model_Rank.setPowerTxt(self._dataFirst);
				}
			}
		}
		//我的
		self.labRankMy.text = "我的排行：" + (self._dataMy ? self._dataMy.rank : "暂未上榜");
		self.labLevelMy.text = self._dataMy ? "我的" + Model_Rank.setMyInfoTxt(self._dataMy) + "(" + self._dataMy.lunhui + "世轮回)" : "";
	}

	private renderTab(index: number, obj: fairygui.GObject): void {
		var btn: fairygui.GButton = obj as fairygui.GButton;
		btn.text = Model_Rank.rankTabArr[index].NAME;
		btn.data = Model_Rank.rankTabArr[index];
	}

	private renderData(index: number, obj: fairygui.GObject): void {
		let self = this;
		var child: ChildRank = obj as ChildRank;
		child.setVo(self._dataList ? self._dataList[index + 1] : null, index + 2, self._vo);
	}

	private createR() {
		let self = this;
		if (!self.awatar) {
			self.awatar = UIRole.create();
			self.awatar.setPos(self.imgDi.x, self.imgDi.y - 30);
			// self.awatar.setScaleXY(1.4, 1.4);
		}
	}

	private removeR() {
		let self = this;
		if (self.awatar) {
			self.awatar.onRemove();
			self.awatar = null;
		}
	}
}