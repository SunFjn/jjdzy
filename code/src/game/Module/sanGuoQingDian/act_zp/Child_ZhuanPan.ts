/**转盘 */
class Child_ZhuanPan extends fairygui.GComponent implements IPanel {

	public img3: fairygui.GImage;
	public img5: fairygui.GImage;
	public img4: fairygui.GImage;
	public img7: fairygui.GImage;
	public img6: fairygui.GImage;
	public img0: fairygui.GImage;
	public img1: fairygui.GImage;
	public img2: fairygui.GImage;
	public imgArrow: fairygui.GImage;
	public btnRank: fairygui.GButton;
	public btnOne: fairygui.GButton;
	public btnTen: fairygui.GButton;
	public lbOne: fairygui.GTextField;
	public lbTen: fairygui.GTextField;
	public labTime: fairygui.GRichTextField;
	public listLog: fairygui.GList;
	public labTip: fairygui.GRichTextField;
	public checkBox: fairygui.GButton;
	public grid6: ViewGrid;
	public grid7: ViewGrid;
	public grid0: ViewGrid;
	public grid1: ViewGrid;
	public grid2: ViewGrid;
	public grid3: ViewGrid;
	public grid4: ViewGrid;
	public grid5: ViewGrid;
	public btnTarget: Button2;
	public zhuanPanImg: fairygui.GLoader;

	private items: ViewGrid[]
	private imgs: fairygui.GImage[]
	private isMovie: boolean = false;

	public static pkg = "sanGuoQingDian";
	public static URL: string = "ui://kdt501v2to1mu";
	public static createInstance(): Child_ZhuanPan {
		return <Child_ZhuanPan><any>(fairygui.UIPackage.createObject("sanGuoQingDian", "Child_ZhuanPan"));
	}

	public static setExtends() {

	}

	public constructor() {
		super();
	}

	protected _viewParent: fairygui.GObject;
	public initView(pParent: fairygui.GObject) {
		let self = this;
		self._viewParent = pParent;
		self.addRelation(self._viewParent, fairygui.RelationType.Size);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		const self = this;
		CommonManager.parseChildren(self, self);
		self.items = []
		self.imgs = []
		for (let i = 0; i < 8; i++) {
			const item: ViewGrid = self[`grid${i}`];
			self.items.push(item);
			const img: fairygui.GImage = self[`img${i}`];
			self.imgs.push(img);
		}
		self.listLog.itemRenderer = self.renderLog;
		self.listLog.callbackThisObj = self;
		self.listLog.touchable = false;
		self["n46"].visible = false;
		self["n47"].visible = false;
	}

	private onOpenTarget() {
		GGlobal.layerMgr.open(UIConst.SG_ZHUANPAN_TARGET_REWARD);
	}

	private vo: Vo_Activity;
	public openPanel(pData?: Vo_Activity) {
		let s = this;
		s.vo = pData;
		s.btnOne.addClickListener(s.onBuyOne, s);
		s.btnTen.addClickListener(s.onBuyTen, s);
		s.btnRank.addClickListener(s.onOpenRank, s);
		s.btnTarget.addClickListener(s.onOpenTarget, s);
		s.checkBox.addClickListener(s.onCheck, s);
		GGlobal.modelSGQD.listen(ModelSGQD.msg_datas_zhuanpan, s.onUpdate, s);
		GGlobal.modelSGQD.listen(ModelSGQD.msg_buy_zhuanpan, s.doMovie, s);
		GGlobal.modelSGQD.listen(ModelSGQD.msg_buy_zhuanpan_fail, s.doFail, s);
		GGlobal.reddot.listen(UIConst.SG_ZHUANPAN, s.onUpdate, s);
		s.listLog.scrollPane.addEventListener(fairygui.ScrollPane.SCROLL_END, s.scrollComp, s);
		Timer.instance.listen(s.updateX, s, 1000);
		GGlobal.modelSGQD.CGOpenUI4121();
		GGlobal.modelActivity.CG_OPENACT(UIConst.SG_ZHUANPAN);
		s.checkBox.selected = ModelSGQD.skipTween;
		s._rota = s.imgArrow.rotation = s._intRota;
		for (let i = 0; i < s.imgs.length; i++) {
			s.imgs[i].visible = false;
		}
		s.isMovie = false;
		s._first = true;
		s.onUpdate();
		IconUtil.setImg(s.zhuanPanImg, Enum_Path.BACK_URL + "zhaunpan.png");
		GGlobal.control.listen(UIConst.SG_ZHUANPAN_TARGET_REWARD, s.checkTargetBtNotice, s);
		GGlobal.modelSGQD.CGOpenUI4121();
	}
	
	public closePanel() {
		let s = this;
		s.btnOne.removeClickListener(s.onBuyOne, s)
		s.btnTen.removeClickListener(s.onBuyTen, s)
		s.btnTarget.removeClickListener(s.onOpenTarget, s)
		s.btnRank.removeClickListener(s.onOpenRank, s)
		s.checkBox.removeClickListener(s.onCheck, s)
		s.listLog.scrollPane.removeEventListener(fairygui.ScrollPane.SCROLL_END, s.scrollComp, s);
		Timer.instance.remove(s.updateX, s);
		GGlobal.modelSGQD.remove(ModelSGQD.msg_datas_zhuanpan, s.onUpdate, s);
		GGlobal.modelSGQD.remove(ModelSGQD.msg_buy_zhuanpan, s.doMovie, s);
		GGlobal.modelSGQD.remove(ModelSGQD.msg_buy_zhuanpan_fail, s.doFail, s);
		GGlobal.reddot.remove(UIConst.SG_ZHUANPAN, s.onUpdate, s);
		for (let i = 0; i < s.items.length; i++) {
			s.items[i].vo = null
			s.items[i].tipEnabled = false;
			s.items[i].showEff(false);
		}
		egret.Tween.removeTweens(s.imgArrow);
		Timer.instance.remove(s.doMovie1, s);
		GGlobal.control.remove(UIConst.SG_ZHUANPAN_TARGET_REWARD, s.checkTargetBtNotice, s);
		s.listLog.numItems = 0
		IconUtil.setImg(s.zhuanPanImg, null);
		clearTimeout(s._timeOut)
	}

	private checkTargetBtNotice() {
		this.btnTarget.checkNotice = false;
		for (let i = 0; i < ModelSGQD.zpRewardArr.length; i++) {
			if (ModelSGQD.zpRewardArr[i].state == 1) {
				this.btnTarget.checkNotice = true;
				break;
			}
		}
	}

	private _costOne: number = 0;
	private _costTen: number = 0;
	private _act: Vo_Activity
	private _first = true;
	private onUpdate() {
		let s = this;
		s.btnTarget.checkNotice = GGlobal.reddot.checkCondition(UIConst.SG_ZHUANPAN, 0);
		var voAct = null;
		var group = GGlobal.modelActivity.getGroup(UIConst.SANGUOQD);
		for (let i = 0, len = group.length; i < len; i++) {
			const act = group[i];
			if (act.id == UIConst.SG_ZHUANPAN) {
				let time = (Model_GlobalMsg.getServerTime() / 1000) >> 0;
				if ((act.end - time > 0) && (time - act.start > 0)) {
					voAct = act;
					break;
				}
			}
		}
		if (!voAct) {
			return;
		}
		ModelSGQD.zpQs = voAct.qs
		s._act = voAct
		let str = ""
		let len = ModelSGQD.zpLogArr ? ModelSGQD.zpLogArr.length : 0;

		if (len > 3 && this._first) {
			this._first = false
			s.listLog.setVirtualAndLoop();
			s.listLog.numItems = len
			s.listLog.scrollPane.scrollDown(1, true);
		} else {
			s.listLog.numItems = len
		}

		if (s._costOne == 0) {
			s._costOne = ConfigHelp.SplitStr(ConfigHelp.getSystemDesc(4601))[0][2];
			this.lbOne.text = "" + s._costOne
		}

		if (s._costTen == 0) {
			s._costTen = ConfigHelp.SplitStr(ConfigHelp.getSystemDesc(4602))[0][2];
			this.lbTen.text = "" + s._costTen
		}

		let cfg = Config.sghlzp_261[voAct.qs]
		var arr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(cfg.show))
		for (let i = 0; i < arr.length; i++) {
			this.items[i].vo = arr[i]
			this.items[i].tipEnabled = true;
			this.items[i].showEff(true);
		}
		s.updateX();
		s.upCost();
	}

	private upCost() {
		if (Model_player.voMine.yuanbao < this._costTen) {
			this.lbTen.color = Color.REDINT;
		} else {
			this.lbTen.color = Color.GREENINT;
		}
		if (Model_player.voMine.yuanbao < this._costOne) {
			this.lbOne.color = Color.REDINT;
		} else {
			this.lbOne.color = Color.GREENINT;
		}
	}

	private onBuyOne(e) {
		if (this.isMovie) {
			return;
		}
		if (Model_player.voMine.yuanbao < this._costOne) {
			ModelChongZhi.guideToRecharge()
			return;
		}
		GGlobal.modelSGQD.CGBuy4123(1)
		this.isMovie = true;
	}

	private onBuyTen(e) {
		if (this.isMovie) {
			return;
		}
		if (Model_player.voMine.yuanbao < this._costTen) {
			ModelChongZhi.guideToRecharge()
			return;
		}
		GGlobal.modelSGQD.CGBuy4123(2)
		this.isMovie = true;
	}

	private onOpenRank(e) {
		GGlobal.layerMgr.open(UIConst.SG_ZHUANPAN_REWARD)
	}

	private onCheck(e) {
		ModelSGQD.skipTween = this.checkBox.selected
	}

	private updateX(): void {
		if (this._act) {
			var d = this._act.getSurTime();
			if (d < 0) {
				this.labTime.text = "剩余时间：已结束"
			} else {
				this.labTime.text = "剩余时间：" + DateUtil.getMSBySecond4(d)
			}
		}
		else {
			this.labTime.text = "剩余时间："
		}
	}

	private _rota
	private _intRota = 206
	private _tween: egret.Tween
	private doMovie() {
		if (!ModelSGQD.skipTween) {
			this.isMovie = true;
			if (ModelSGQD.zpBuyArr.length > 0) {
				var igrid: IGridImpl = ModelSGQD.zpBuyArr[ModelSGQD.zpBuyArr.length - 1].item
				var scrTo = -1;
				var endRot = 0;
				for (let i = 0; i < 8; i++) {
					if (igrid.id == this.items[i].vo.id) {
						scrTo = i;
						break;
					}
				}
				if (scrTo == -1) {
					scrTo = 0;
				}
				endRot = Math.floor((this._rota - this._intRota) / 360) * 360 + 22.5 + scrTo * 45 + 360 * 2 + this._intRota
				this._tween = egret.Tween.get(this.imgArrow).to({ rotation: endRot }, 1000).call(this.closeHand, this, [endRot]);
				Timer.instance.listen(this.doMovie1, this, 50);
				this.doMovie1();
			}
		} else {
			this.isMovie = false;
		}
		this.upCost();
	}

	private doFail() {
		this.isMovie = false;
	}

	private closeHand(endRot) {
		this._rota = endRot
		Timer.instance.remove(this.doMovie1, this);
		this.doMovie1();
		this.isMovie = false;
	}

	private doMovie1() {
		let index = Math.floor((this.imgArrow.rotation - this._intRota) % 360 / 45)
		for (let i = 0; i < this.imgs.length; i++) {
			if (index == i) {
				this.imgs[i].visible = true;
			} else {
				this.imgs[i].visible = false;
			}
		}
	}

	private renderLog(index: number, obj: fairygui.GComponent) {
		let v: VZhuanPanLab = obj as VZhuanPanLab;
		v.vo = ModelSGQD.zpLogArr[index]
	}
	private _timeOut
	private scrollComp() {
		let s = this;
		clearTimeout(s._timeOut)
		s._timeOut = setTimeout(function () {
			s.listLog.scrollPane.scrollDown(1, true);
		}, 1000);
	}
}
