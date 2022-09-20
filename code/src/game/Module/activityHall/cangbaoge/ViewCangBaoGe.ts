/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewCangBaoGe extends UIPanelBase {
	public frame: frame4;
	public bgLun: fairygui.GLoader;
	public lbLog: fairygui.GRichTextField;
	public g0: CBGGrid;
	public g11: CBGGrid;
	public g1: CBGGrid;
	public g10: CBGGrid;
	public g2: CBGGrid;
	public g6: CBGGrid;
	public g7: CBGGrid;
	public g5: CBGGrid;
	public g8: CBGGrid;
	public g4: CBGGrid;
	public g9: CBGGrid;
	public g3: CBGGrid;
	public btnOne: Button0;
	public lbOne: fairygui.GRichTextField;
	public iconYuanBao: fairygui.GLoader;
	public iconYuanBao1: fairygui.GLoader;
	public lbTen: fairygui.GRichTextField;
	public btnTen: Button0;
	public btnRank: Button0;
	public imgKua: fairygui.GImage;
	public lbOne0: fairygui.GRichTextField;
	public lbTen0: fairygui.GRichTextField;
	public expBar: fairygui.GProgressBar;
	public lbDesc: fairygui.GRichTextField;
	public lbTip: fairygui.GRichTextField;
	public labTime: fairygui.GRichTextField;
	public icon0: fairygui.GComponent;
	public lb0: fairygui.GRichTextField;
	public v0: fairygui.GGroup;
	public icon1: fairygui.GComponent;
	public lb1: fairygui.GRichTextField;
	public v1: fairygui.GGroup;
	public icon2: fairygui.GComponent;
	public lb2: fairygui.GRichTextField;
	public v2: fairygui.GGroup;
	public icon3: fairygui.GComponent;
	public lb3: fairygui.GRichTextField;
	public v3: fairygui.GGroup;
	public gridFirst: ViewGrid;
	public firstGroup: fairygui.GGroup;
	public t0: fairygui.Transition;
	public linkLb: fairygui.GRichTextField;
	public checkBox: fairygui.GButton;
	public tipsGroup: fairygui.GGroup;
	public vresG1: fairygui.GGroup;
	public vresG10: fairygui.GGroup;
	public discount1: fairygui.GTextField;
	public discount10: fairygui.GTextField;
	public tips: fairygui.GRichTextField;
	private _disCost1:number = 0;
	private _disCost10:number = 0;

	public static URL: string = "ui://1tr9e6d8m0yoy";
	public static createInstance(): ViewCangBaoGe {
		return <ViewCangBaoGe><any>(fairygui.UIPackage.createObject("cangbaoge", "ViewCangBaoGe"));
	}

	public constructor() {
		super();
		this.setSkin("cangbaoge", "cangbaoge_atlas0", "ViewCangBaoGe");
	}
	protected setExtends() {
		fairygui.UIObjectFactory.setPackageItemExtension(CBGGrid.URL, CBGGrid);
		fairygui.UIObjectFactory.setPackageItemExtension(VCangBaoGeRank.URL, VCangBaoGeRank);
		fairygui.UIObjectFactory.setPackageItemExtension(VCangBaoGeRank1.URL, VCangBaoGeRank1);
	}

	private one;
	private ten;
	private girds: CBGGrid[] = [];
	protected initView(): void {
		super.initView();
		let s = this;
		for (let i = 0; i < 12; i++) {
			let grid: CBGGrid = s["g" + i];
			s.girds.push(grid);
			if (i < 4) {
				s["icon" + i].vo = null;
				s["lb" + i].text = "";
			}
			grid.setvo(null, i % 3 == 0);
		}
		s.lbTip.text = "每次寻宝增加" + ConfigHelp.getSystemNum(3502) + "幸运值";
		s.one = JSON.parse(ConfigHelp.getSystemDesc(3503))[0][2];
		s.lbOne0.text = "" + s.one;
		s.ten = JSON.parse(ConfigHelp.getSystemDesc(3504))[0][2];
		s.lbTen0.text = "" + s.ten;
		let sysParam = JSON.parse(ConfigHelp.getSystemDesc(3506));
		let extra = sysParam[0][2];
		let extraStr = Vo_attr.getAttrName(sysParam[0][0]);
		s.lbOne.text = "购买" + extra + extraStr;
		s.lbTen.text = "购买" + (extra * 10) + extraStr;
		s.gridFirst.vo = ConfigHelp.makeItemListArr(JSON.parse(ConfigHelp.getSystemDesc(3505)))[0];
		s.updateMoney();
		s.linkLb.text = HtmlUtil.createLink("概率");
		s.linkLb.addEventListener(egret.TextEvent.LINK, s.openGaiLV, s);
	}

	private openGaiLV(evt: egret.TextEvent) {
		evt.stopPropagation();
		GGlobal.layerMgr.open(UIConst.GAILV, 2);
	}

	private upReward() {
		let qs = GGlobal.modelActivityHall.cbg_qs
		if (qs == 0) {
			return;
		}
		let s = this;
		let rew = ConfigHelp.getSystemDesc(4100 + qs);
		let arr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(rew));
		for (let i = 0; i < 12; i++) {
			let grid: CBGGrid = s.girds[i];
			grid.setvo(arr[i], i % 3 == 0);
		}

		let arr2 = Model_ActivityHall.getCbg2Arr(qs);

		let lib = Config.cbg2_729;
		let cfgv: Icbg2_729;
		for (let i = 0; i < 4; i++) {
			let icon = ConfigHelp.makeItemListArr(JSON.parse(arr2[i].jiangli))[0];
			s["icon" + i].vo = icon;
			s["icon" + i].tipEnabled = true;
			s["lb" + i].text = "幸运值：" + lib[i + 1].xingyunzhi;
			if (i == 3) {
				cfgv = arr2[i]
				var bigAward = ConfigHelp.getItemColorName(icon.id);
			}
		}
		s.expBar.max = cfgv.xingyunzhi;
		s.lbDesc.setVar("tname", bigAward).flushVars();
	}

	private updateMoney() {
		let s = this;
		let money = Model_player.voMine.yuanbao;
		let count = Model_Bag.getItemCount(410029);
		if (count > 0) {
			s.lbOne0.text = count + "/1";
			s.iconYuanBao.url = "ui://1tr9e6d8vong16";
			s.lbOne0.color = Color.GREENINT;
		} else {
			s.lbOne0.text = s.one + "";
			s.iconYuanBao.url = "ui://jvxpx9embwmw3y";
			s.lbOne0.color = money >= s.one ? Color.GREENINT : Color.REDINT;
		}
		if (count > 9) {
			s.lbTen0.text = count + "/10";
			s.iconYuanBao1.url = "ui://1tr9e6d8vong16";
			s.lbTen0.color = Color.GREENINT;
		} else {
			s.lbTen0.text = s.ten + "";
			s.iconYuanBao1.url = "ui://jvxpx9embwmw3y";
			s.lbTen0.color = money >= s.ten ? Color.GREENINT : Color.REDINT;
		}
	}

	private type;
	private callBack;
	private awards;
	private updateWithServerData(awards) {
		this.isRunning = true;
		this.selCount = (Math.random() * 12) >> 0;
		this.awards = awards;
		if (Model_ActivityHall.skipTween) {
			this.doResult();
		} else {
			egret.Tween.get(this).to({ "selCount": this.selCount + 20 }, 1500).call(this.doResult);
		}

	}

	private doResult() {
		this.clearSel();
		this.isRunning = false;
		this.btnTen.enabled = true;
		this.btnOne.enabled = true;

		let awArr = ConfigHelp.makeItemListArr(this.awards)
		for (let i = 0; i < awArr.length; i++) {
			let v = awArr[i];
			v.extra = (this.awards[i][3] == 1 ? 5 : 0)
		}
		View_Reward_Show2.show(UIConst.CANGBAOGE, this.type, this.callBack, awArr, this.one, this.ten, 410029)
		this.initServerData();
		GGlobal.modelActivityHall.CG_CBG_INFO_2731();
	}
	private _selCount;
	private lastGrid;
	public set selCount(val) {
		this._selCount = Math.ceil(val);
		let nowIndex = this._selCount % 12;
		if (this.lastGrid) this.lastGrid.showBgEffect(false);
		this.girds[nowIndex].showBgEffect(true);
		this.lastGrid = this.girds[nowIndex];
	}

	public get selCount() {
		return this._selCount;
	}

	private clearSel() {
		for (let i = 0; i < 12; i++) {
			this.girds[i].showBgEffect(false);
		}
	}

	private initServerData() {
		let s = this;
		let m = GGlobal.modelActivityHall;
		let hasFree = m.freeCount > 0;
		if (hasFree) {
			s.btnOne.text = "免费一次";
			s.lbOne0.visible = s.iconYuanBao.visible = false;
		} else {
			s.btnOne.text = "寻宝一次";
			s.lbOne0.visible = s.iconYuanBao.visible = true;
		}
		let count = Model_Bag.getItemCount(410029);
		s.btnOne.checkNotice = m.freeCount > 0 || count > 0;
		s.btnTen.checkNotice = count > 9;
		s.expBar.value = m.cbg_luckVal;
		this.firstGroup.visible = m.isfirst;
		let str = "";
		let log = m.cbg_log;
		for (let i = 0; i < log.length; i++) {
			if (i < 7) {
				str += "<font color='#15f234'>" + log[i][0] + "</font>获得" + HtmlUtil.fontNoSize(log[i][1].name, Color.QUALITYCOLORH[log[i][1].quality]) + "\n";
			}
		}
		this.lbLog.text = str;
		this.updateMoney();
		this.upReward();
		this.checkRank();
	}

	private onClickOne() {
		let m = GGlobal.modelActivityHall;
		let money = Model_player.voMine.yuanbao;
		let count = Model_Bag.getItemCount(410029);
		let cost = this.one;
		if(GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_SJZK))
		{
			cost = this._disCost1;
		}
		if (count == 0) {
			// if (money < this.one && m.freeCount == 0) {
			if (money < cost && m.freeCount == 0) {
				ModelChongZhi.guideToRecharge();
				return;
			}
		}
		GGlobal.modelActivityHall.CG_CBG_CJ_2733(0);
		this.btnTen.enabled = false;
		this.btnOne.enabled = false;
		this.type = 1;
		this.callBack = Handler.create(this, this.onClickOne);
	}

	private onClicktTen() {
		let money = Model_player.voMine.yuanbao;
		let count = Model_Bag.getItemCount(410029);
		let cost = this.ten;
		if(GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_SJZK))
		{
			cost = this._disCost10;
		}
		if (count < 10) {
			// if (money < this.ten) {
			if (money < cost) {
				ModelChongZhi.guideToRecharge();
				return;
			}
		}
		GGlobal.modelActivityHall.CG_CBG_CJ_2733(1);
		this.btnTen.enabled = false;
		this.btnOne.enabled = false;
		this.type = 10;
		this.callBack = Handler.create(this, this.onClicktTen);
	}

	private setServerData(obj) {
		let type = obj.type;
		if (type == 1) {
			this.initServerData();
		} else {
			this.updateWithServerData(obj.awards);
		}
	}

	protected onShown() {
		let s = this;
		s.btnOne.addClickListener(s.onClickOne, s);
		s.btnTen.addClickListener(s.onClicktTen, s);
		s.btnRank.addClickListener(s.onClickRank, s);
		s.checkBox.addClickListener(s.onCheck, s);
		let key = Model_player.voMine.id + "CangBaoGeCheck"
		let val = egret.localStorage.getItem(key);
		Model_ActivityHall.skipTween = val == "1" ? true : false;
		s.checkBox.selected = Model_ActivityHall.skipTween;
		GGlobal.modelActivityHall.CG_CBG_INFO_2731();
		GGlobal.reddot.listen(UIConst.CANGBAOGE, s.initServerData, s);
		GGlobal.reddot.listen(UIConst.CANGBAOGE_RANK, s.checkRank, s);
		GGlobal.reddot.listen(UIConst.CANGBAOGE_RANK2, s.checkRank, s);
		GGlobal.control.listen(UIConst.CANGBAOGE, s.setServerData, s);
		GGlobal.control.listen(Enum_MsgType.MSG_BAG_ITME_UPDATE, s.updateMoney, s);
		for (let i = 0; i < 12; i++) {
			let grid: CBGGrid = this["g" + i];
			grid.setEffect(true);
		}
		s.updateMoney();
		IconUtil.setImg(s.bgLun, Enum_Path.BACK_URL + "cangbaoge.jpg");

		let actSta = s.actStatus();
		if (actSta == 1) {
			s.btnRank.visible = true;
			s.labTime.visible = true;
			s.imgKua.visible = false;

			Timer.instance.listen(s.onTimer, s, 1000);
			s.onTimer()

		} else if (actSta == 2) {
			s.btnRank.visible = true;
			s.labTime.visible = true;
			s.imgKua.visible = true;

			Timer.instance.listen(s.onTimer, s, 1000);
			s.onTimer()
		} else if (actSta == 3) {
			s.btnRank.visible = true;
			s.labTime.visible = true;
			s.imgKua.visible = false
			s.labTime.text = "已结束"
			Timer.instance.remove(s.onTimer, s);
		} else if (actSta == 4) {
			s.btnRank.visible = false;
			s.labTime.visible = false;
			s.imgKua.visible = false
			s.labTime.text = ""
			Timer.instance.remove(s.onTimer, s);
		} else {//未开启
			s.btnRank.visible = false;
			s.labTime.visible = false;
			s.imgKua.visible = false
			s.labTime.text = ""
			Timer.instance.remove(s.onTimer, s);
		}
		Model_ActivityHall.cbgStatus = actSta;
		GGlobal.control.listen(Enum_MsgType.ACTIVITY_LOGIN_SEND, this.checkSJZKShow, this);
		GGlobal.control.listen(Enum_MsgType.ACTIVITY_ACTOPENSTATE, this.checkSJZKShow, this);
		GGlobal.control.listen(UIConst.ACTCOM_SJZK, this.checkSJZKShow, this);
		this.checkSJZKShow();
		if(GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_SJZK))
		{
			GGlobal.modelActivity.CG_OPENACT(UIConst.ACTCOM_SJZK);
		}
	}
	//0开服前关闭  1开服前开启    2开服后开启   3开服后未开启-显示下期排名  4开服后未开启  关闭
	private _act: Vo_Activity;
	private actStatus() {
		this._act = null;
		if (Model_ActivityHall.cbgIsKuaF()) {
			let actArr = GGlobal.modelActivity.getGroup(UIConst.CANGBAOGE);
			actArr = actArr ? actArr : [];
			const servTime = (Model_GlobalMsg.getServerTime() / 1000) >> 0;
			for (let i = 0; i < actArr.length; i++) {
				let ac = actArr[i];
				if (ac.id == UIConst.CANGBAOGE_RANK2) {
					if ((ac.end - servTime > 0) && (servTime - ac.start > 0)) {
						this._act = ac
						return 2;
					} else if ((servTime - ac.end < 86400) && (servTime - ac.start > 0)) {
						return 3;//一天内显示下一期
					}
				}
			}
			return 4
		} else {
			if (Model_ActivityHall.isOlderServ()) {
				return 0
			} else {
				if (Model_ActivityHall.newCbgnoKuaF()) {
					return 0
				} else {
					return 0
				}
			}
		}
	}

	private isRunning = false;
	protected onHide() {
		let s = this;
		IconUtil.setImg(s.bgLun, null);
		s.btnOne.removeClickListener(s.onClickOne, s);
		s.btnTen.removeClickListener(s.onClicktTen, s);
		s.btnRank.removeClickListener(s.onClickRank, s);
		s.checkBox.removeClickListener(s.onCheck, s);
		GGlobal.layerMgr.close(UIConst.CANGBAOGE);
		GGlobal.reddot.remove(UIConst.CANGBAOGE, s.initServerData, s);
		GGlobal.reddot.remove(UIConst.CANGBAOGE_RANK, s.checkRank, s);
		GGlobal.reddot.remove(UIConst.CANGBAOGE_RANK2, s.checkRank, s);
		GGlobal.control.remove(UIConst.CANGBAOGE, s.setServerData, s);
		GGlobal.control.remove(Enum_MsgType.MSG_BAG_ITME_UPDATE, s.updateMoney, s);
		s.btnTen.touchable = true;
		s.btnOne.touchable = true;
		for (let i = 0; i < 12; i++) {
			let grid: CBGGrid = this["g" + i];
			grid.setEffect(false);
		}
		Timer.instance.remove(s.onTimer, s);
		GGlobal.control.remove(Enum_MsgType.ACTIVITY_LOGIN_SEND, this.checkSJZKShow, this);
		GGlobal.control.remove(Enum_MsgType.ACTIVITY_ACTOPENSTATE, this.checkSJZKShow, this);
		GGlobal.control.remove(UIConst.ACTCOM_SBZK, this.checkSJZKShow, this);
	}

	public guide_draw(step) {
		let self = this;
		GuideStepManager.instance.showGuide(self.btnOne, self.btnOne.width / 2, self.btnOne.height / 2);
		GuideStepManager.instance.showGuide1(step.source.index, self.btnOne, self.btnOne.width / 2, 0, -90, -106, -100);
		if (self.btnOne.parent) self.btnOne.parent.setChildIndex(self.btnOne, self.btnOne.parent.numChildren - 1);
	}

	public guideClosePanel(step) {
		let btn = this.closeButton.asButton;
		GuideStepManager.instance.showGuide(btn, btn.width / 2, btn.height / 2, null, true);
		GuideStepManager.instance.showGuide1(step.source.index, btn, 0, btn.height / 2, 180, -250, -35, true);
	}

	private onClickRank() {
		if (Model_ActivityHall.isOlderServ()) {
			if (Model_ActivityHall.cbgIsKuaF()) {
				GGlobal.layerMgr.open(UIConst.CANGBAOGE_RANK2_OLDER);
			} else {
				GGlobal.layerMgr.open(UIConst.CANGBAOGE_RANK_OLDER);
			}
		} else {
			if (Model_ActivityHall.cbgIsKuaF()) {
				GGlobal.layerMgr.open(UIConst.CANGBAOGE_RANK2);
			} else {
				GGlobal.layerMgr.open(UIConst.CANGBAOGE_RANK);
			}
		}
	}

	private checkRank() {
		this.btnRank.checkNotice = GGlobal.reddot.checkCondition(UIConst.CANGBAOGE_RANK) || GGlobal.reddot.checkCondition(UIConst.CANGBAOGE_RANK2);
	}

	private onCheck(e) {
		Model_ActivityHall.skipTween = this.checkBox.selected
		let key = Model_player.voMine.id + "CangBaoGeCheck"
		let val = Model_ActivityHall.skipTween ? "1" : "0";
		egret.localStorage.setItem(key, val);
	}

	private onTimer() {
		if (this._act) {
			let d = Math.ceil((this._act.end * 1000 - Model_GlobalMsg.getServerTime()) / 1000);
			if (d <= 0) {
				this.labTime.text = "已结束"
			} else {
				this.labTime.text = DateUtil.getMSBySecond4(d) + "结束"
			}
		} else {
			let d = GGlobal.modelActivityHall.cbgEndT;
			if (d == 0) {
				this.labTime.text = ""
				return;
			}
			GGlobal.modelActivityHall.cbgEndT--;
			if (d < 0) {
				this.labTime.text = "已结束"
			} else {
				this.labTime.text = DateUtil.getMSBySecond4(d) + "结束"
			}
		}
	}

	/**
	 * 检查神将折扣活动是否开启
	 */
	public checkSJZKShow()
	{
		if(GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_SJZK))
		{
			let money = Model_player.voMine.yuanbao;
			let count = Model_Bag.getItemCount(410029);
			this.tipsGroup.visible = true;
			let curCfg:Iherooff_287 = Model_ActivityHall.getIherooff_287(GGlobal.model_actCom.treasure);
			if(count > 0 || GGlobal.modelActivityHall.freeCount > 0 || curCfg.off >= 100)
			{
				this.vresG1.visible = false;
			}else{
				this.vresG1.visible = true;
			}
			if(count > 9 || curCfg.off >= 100)
			{
				this.vresG10.visible = false;
			}else{
				this.vresG10.visible = true;
			}
			// if(!this.vresG1.visible && !this.vresG10.visible)   return;
			
			let nextCfg:Iherooff_287;
			if(curCfg)
			{
				nextCfg = Config.herooff_287[curCfg.id + 1];
			}
			if(nextCfg)
			{
				let arr = JSON.parse(nextCfg.time);
				let count:number = arr[0][0] - GGlobal.model_actCom.treasure;
				if(curCfg.off >= 100)
				{
					this.tips.text = "寻宝" + HtmlUtil.fontNoSize(String(count), Color.YELLOWSTR)+"次后可享" + HtmlUtil.font(String(nextCfg.off / 10) + "折", Color.getColorStr(6), 22)+ "优惠";
				}else{
					this.tips.text = "当前寻宝享" + HtmlUtil.font(String(curCfg.off / 10) + "折", Color.getColorStr(6), 22) + "优惠\n打造" + HtmlUtil.fontNoSize(String(count), Color.YELLOWSTR)+"次后可享" + HtmlUtil.font(String(nextCfg.off / 10) + "折", Color.getColorStr(6), 22)+ "优惠";
				}
				let arr1 = JSON.parse(curCfg.time);
				let count1:number = arr1[0][1] - GGlobal.model_actCom.treasure;
				if(count1 >= 10)
				{
					this._disCost10 = Math.ceil(this.ten * (curCfg.off / 100));
					this.discount10.text = "(" + this._disCost10 + ")";
				}else{
					let one:number = this.ten / 10;
					let total:number = one * count1 * (curCfg.off / 100) + one * (10 - count1) * (nextCfg.off / 100);
					this._disCost10 = Math.ceil(total);
					this.discount10.text = "(" + this._disCost10 + ")";
				}
			}else{//满级
				this.tips.text = "已享最高折扣" + HtmlUtil.font(String(curCfg.off / 10) + "折", Color.getColorStr(6), 22) + "优惠";
				this._disCost10 = Math.ceil(this.ten * (curCfg.off / 100));
				this.discount10.text = "(" + this._disCost10 + ")";
			}
			this._disCost1 = Math.ceil(this.one * (curCfg.off / 100));
			this.discount1.text = "(" + this._disCost1 + ")";
		}else{
			this.tipsGroup.visible = false;
			this.vresG1.visible = false;
			this.vresG10.visible = false;
		}
	}
}