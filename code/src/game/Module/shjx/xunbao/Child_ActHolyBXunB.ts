class Child_ActHolyBXunB extends fairygui.GComponent implements IPanel {

	public btnDice: Button1;
	public lbCt: fairygui.GRichTextField;
	public lbQuan: fairygui.GRichTextField;
	public chooseImg: VActHolyBHead;
	public checkBox: fairygui.GButton;
	public imgRoll: fairygui.GLoader;
	public imgBg: fairygui.GLoader;
	public bar: fairygui.GProgressBar;
	public rewardGridArr: ActHolyBXunBGrid[] = [];

	public static URL: string = "ui://4aepcdbwwg9y4n";

	public static createInstance(): Child_ActHolyBXunB {
		return <Child_ActHolyBXunB><any>(fairygui.UIPackage.createObject("shouhunJX", "Child_ActHolyBXunB"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);

		self._gridArr = [];
		for (let i = 0; i < 20; i++) {
			this._gridArr.push(<VActHolyBGrid><any>(self.getChild("grid" + i)))
			if (i < 4) {
				let grid = <ActHolyBXunBGrid><any>(self.getChild("grid0" + i));
				self.rewardGridArr.push(grid);
			}
		}
	}

	public initView(pParent: fairygui.GObject) {

	}
	public openPanel(pData?: any) {
		let s = this;
		let c = GGlobal.control;
		// Timer.instance.listen(s.upTimer, s, 1000);
		c.listen(Enum_MsgType.ACT_HOLYB_XUNBAO, s.upUI, s);
		c.listen(Enum_MsgType.ACT_HOLYB_XUNBAO_MUBIAO, s.updateReward, s);
		c.listen(Enum_MsgType.ACT_HOLYB_XUNBAO_ROLL, s.upRoll, s);
		c.listen(Enum_MsgType.MSG_BAG_ITME_UPDATE, s.upItem, s);
		c.listen(Enum_MsgType.ZERO_RESET, s.zeroReset, s);
		GGlobal.reddot.listen(UIConst.ACTHB_XUNBAO, s.upCheck, s);
		s.btnDice.addClickListener(s.onDice, s);
		s.checkBox.selected = false
		s.upUI();
		s.zeroReset()
		s.chooseImg.upHead()
		IconUtil.setImg(s.imgBg, Enum_Path.BACK_URL + "bg6402.jpg");
	}
	public closePanel(pData?: any) {
		let s = this;
		let c = GGlobal.control;
		c.remove(Enum_MsgType.ACT_HOLYB_XUNBAO, s.upUI, s);
		c.remove(Enum_MsgType.ACT_HOLYB_XUNBAO_ROLL, s.upRoll, s);
		c.remove(Enum_MsgType.MSG_BAG_ITME_UPDATE, s.upItem, s);
		c.remove(Enum_MsgType.ZERO_RESET, s.zeroReset, s);
		GGlobal.reddot.remove(UIConst.ACTHB_XUNBAO, s.upCheck, s);
		c.remove(Enum_MsgType.ACT_HOLYB_XUNBAO_MUBIAO, s.updateReward, s);
		s.btnDice.removeClickListener(s.onDice, s);
		for (let i = 0; i < 20; i++) {
			this._gridArr[i].clean();
			if (i < 4) {
				s.rewardGridArr[i].clean();
			}
		}
		IconUtil.setImg(s.imgBg, null);
	}

	private zeroReset() {
		GGlobal.modelSHXunbao.CG_XUNBAO_OPENUI();
	}

	// private _hid: number
	// private _act: Vo_Activity
	private _gridArr: VActHolyBGrid[]
	private upUI(): void {
		let s = this
		let model = GGlobal.modelSHXunbao
		// s.upTimer();
		s.startIndex = model.xbCurGe;
		s._preGe = model.xbCurGe
		s.upGrid();
		s.lbQuan.text = "第" + model.xbQuan + "圈";
		s.upItem();
		s.setImgXY(s.startIndex)
		this.btnDice.touchable = true;
		s.upCheck();
		s.updateReward();
	}

	private updateReward() {
		let self = this;
		let model = GGlobal.modelSHXunbao
		let curIndex = 0;
		for (let i = 0; i < 4; i++) {
			let state = 0;
			let cfg = Config.shxbmb_268[i + 1]
			if (i < GGlobal.modelSHXunbao.xbMuBiaoArr.length) {
				state = GGlobal.modelSHXunbao.xbMuBiaoArr[i].status;
			}
			if (model.xbQuan % 50 >= cfg.q) {
				curIndex = i + 1;
			}
			self.rewardGridArr[i].setVo(cfg, state);
		}
		let maxcfg = Config.shxbmb_268[4];
		let a = [0, 6, 17, 32, 50];
		let xbQuan = model.xbQuan % maxcfg.q;
		let curCfg: Ishxbmb_268 = Config.shxbmb_268[curIndex];
		let nextCfg: Ishxbmb_268 = Config.shxbmb_268[curIndex + 1];
		if (xbQuan >= maxcfg.q) {//满级
			self.bar.value = maxcfg.q;
		} else {
			let valT = nextCfg.q - (curCfg ? curCfg.q : 0);
			self.bar.value = a[curIndex] + Math.floor((xbQuan - (curCfg ? curCfg.q : 0)) * (a[curIndex + 1] - a[curIndex]) / valT)
		}
		self.bar.max = maxcfg.q;
		self.bar._titleObject.text = xbQuan + "/" + maxcfg.q;
	}

	private upCheck() {
		// let s = this
		// let r = GGlobal.reddot;
		// s.btnTarget.checkNotice = r.checkCondition(UIConst.ACTHB_XUNBAO, 2);
	}

	private upTimer(): void {//周日零点结束
		let date = new Date(Model_GlobalMsg.getServerTime());
		let day = date.getDay();//0-6
		let end
		if (day == 0) {
			end = this.oneDayTime()
		} else {
			end = (7 - day) * 86400000 + this.oneDayTime()
		}
		// this.labTime.text = "剩余时间：" + DateUtil.getMSBySecond4(Math.floor(end / 1000))
	}

	private oneDayTime(): number {
		let ms = Model_GlobalMsg.getServerTime();
		let data = DateUtil.clearHourse(new Date(ms));
		let h0 = data.getTime();
		let ax = 86400000 + h0 - ms;
		return ax
	}

	// private onRank() {
	// 	GGlobal.layerMgr.open(UIConst.ACT_HOLYB_XBRANK)
	// }
	private onTarget() {
		GGlobal.layerMgr.open(UIConst.ACT_HOLYB_XBMUBIAO)
	}

	private onDice() {
		let ct = Model_Bag.getItemCount(Model_SHXunBao.XB_ITEM);
		if (ct <= 0) {
			View_QuickBuy_Panel.show(VoItem.create(Model_SHXunBao.XB_ITEM));
			// ViewCommonWarn.text("道具不足")
			return;
		}
		if (!this.btnDice.touchable) {
			return;
		}
		GGlobal.modelSHXunbao.CG_XUNBAO_ROLL();
		this.btnDice.touchable = false;
	}
	//寻宝动画
	private _eff: Part;
	private upRoll() {
		let s = this;
		let model = GGlobal.modelSHXunbao
		if (s.checkBox.selected) {
			//跳过动画
			// let gird = s._gridArr[s.startIndex]
			// if (gird.vo) {
			// 	AnimationUtil.gridToBag([gird.grid])
			// }
			GGlobal.layerMgr.open(UIConst.ACT_HOLYB_XBSHOW, model.xbRewArr)
			s.upUI()
			return
		}


		let ge = model.xbCurGe - s._preGe
		if (ge < 0) {
			ge += 20;
		}
		s._preGe = model.xbCurGe;
		s.imgRoll.visible = false;
		s._eff = EffectMgr.addEff("uieff/10034", s.displayListContainer, s.imgRoll.x + s.imgRoll.width / 2 + 29, s.imgRoll.y + s.imgRoll.height / 2 + 31, 200, 600, true);
		s._eff.mc.scaleX = 2
		s._eff.mc.scaleY = 2
		if (ge > 6) {
			ge = 6;
		}
		s.imgRoll.url = fairygui.UIPackage.getItemURL("shouhunJX", "roll" + ge)

		setTimeout(function () {
			Timer.instance.listen(s.startEff, s, 200);
		}, 800);

		setTimeout(function () {
			s.imgRoll.visible = true;
		}, 600);
	}
	private _preGe;
	private startIndex;
	private startEff() {
		let s = this
		s.startIndex++;
		if (s.startIndex >= s._gridArr.length) {
			s.startIndex = 0;
		}
		let gird = s._gridArr[s.startIndex]
		if (gird.vo) {
			AnimationUtil.gridToBag([gird.grid])
		}
		gird.vo = null;
		s.setImgXY(s.startIndex)

		if (s.startIndex == 0) {
			s.showEff();
			s.upGrid()
		}

		let ge = GGlobal.modelSHXunbao.xbCurGe
		if (s.startIndex == ge) {//停止
			Timer.instance.remove(s.startEff, s);
			setTimeout(function () {
				// GGlobal.layerMgr.open(UIConst.ACT_HOLYB_XBSHOW, GGlobal.modelActHolyB.xbRewArr)
				s.upUI()
			}, 200);
		} else if (s.startIndex == 0) {
			//停留2秒
			Timer.instance.remove(s.startEff, s);
			setTimeout(function () {
				Timer.instance.listen(s.startEff, s, 200);
			}, 1000);
		}
	}

	private showEff(): void {
		for (let i = 1; i < this._gridArr.length; i++) {
			let gd: ViewGrid = this._gridArr[i].grid;
			gd.alpha = 0;
			EffectMgr.addEff("uieff/10007", gd.displayListContainer, gd.width / 2, gd.height / 2, 400, 400, false);
			egret.Tween.get(gd).to({ alpha: 1 }, 800);
		}
	}

	private setImgXY(cur) {
		let grid = this._gridArr[cur];
		this.chooseImg.setXY(grid.x + 42, grid.y - 36);
	}

	private upGrid() {
		let s = this;
		let model = GGlobal.modelSHXunbao
		s._gridArr[0].vo = null
		for (let i = 0; i < model.xbArr.length; i++) {
			if (i < s.startIndex) {
				s._gridArr[i + 1].vo = null;
			} else {
				s._gridArr[i + 1].vo = model.xbArr[i];

			}
		}
	}

	private upItem() {
		let s = this;
		let ct = Model_Bag.getItemCount(Model_SHXunBao.XB_ITEM)
		s.lbCt.text = "" + ct;
		s.btnDice.checkNotice = ct > 0
	}
}