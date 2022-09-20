class Child_GodWeapon_DuanZao extends fairygui.GComponent {

	public godBt: Button2;
	public btnBuy1: Button0;
	public btnBuy10: Button1;
	public expBar: fairygui.GProgressBar;
	public gird0: VGodWeaponPoint;
	public gird3: VGodWeaponPoint;
	public gird2: VGodWeaponPoint;
	public gird1: VGodWeaponPoint;
	public vres1: ViewResource;
	public vres10: ViewResource;
	public list: fairygui.GList;
	public checkBox: fairygui.GButton;
	public labTip: fairygui.GRichTextField;
	public labPoint: fairygui.GRichTextField;
	public hightLb: fairygui.GRichTextField;
	public drugCount: fairygui.GRichTextField;
	public gridArr: VGodWeaponPoint[] = [];
	private dzItem: VoItem;
	private _cost1: number = 0;
	private _cost10: number = 0;
	private effImg: fairygui.GLoader;
	private t0: fairygui.Transition;
	public tipsBg: fairygui.GImage;
	public tips: fairygui.GRichTextField;
	public tipsGroup: fairygui.GGroup;
	public vresG1: fairygui.GGroup;
	public vresG10: fairygui.GGroup;
	public discount1: fairygui.GTextField;
	public discount10: fairygui.GTextField;
	private _disCost1:number = 0;
	private _disCost10:number = 0;


	public static URL: string = "ui://zyx92gzwm4uj45";

	public static createInstance(): Child_GodWeapon_DuanZao {
		return <Child_GodWeapon_DuanZao><any>(fairygui.UIPackage.createObject("wuJiang", "Child_GodWeapon_DuanZao"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
		s.t0 = s.getTransition("t0");
		s.gridArr = [s.gird0, s.gird1, s.gird2, s.gird3];
		s.list.itemRenderer = s.renderItem;
		s.list.callbackThisObj = s;
		s.list.setVirtualAndLoop();
		s.list.touchable = false
		s.dzItem = VoItem.create(Model_ZSGodWeapon.duanzaoC);
	}

	type: number;
	private _first = false
	public onOpen() {
		let s = this;
		Model_ZSGodWeapon.getDaZaoData();
		s.addListen();
		s.update();
		s.checkSBZKShow();
		if(GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_SBZK))
		{
			GGlobal.modelActivity.CG_OPENACT(UIConst.ACTCOM_SBZK);
		}
	}

	public onClose() {
		let s = this;
		s.removeListen();
		s._first = false;
	}

	private onGodBt() {
		let self = this;
		if (self.godBt.checkNotice) {
			GGlobal.modelGodWeapon.CG_GodWeapon_makeWuqi_7863(0, 1);
		} else {
			View_CaiLiao_GetPanel.show(VoItem.create(Model_ZSGodWeapon.shenjiangC));
		}
	}

	private addListen(): void {
		let self = this;
		self.btnBuy1.addClickListener(self.onBuy1, self);
		self.btnBuy10.addClickListener(self.onBuy10, self);
		self.checkBox.addClickListener(self.onCheck, self);
		self.godBt.addClickListener(self.onGodBt, self);
		Timer.instance.listen(self.scrollComp1, self, 100);
		self.btnBuy1.touchable = self.btnBuy10.touchable = true;
		let key = Model_player.voMine.id + "_ZSGodWeaponCheck"
		let val = egret.localStorage.getItem(key);
		Model_ZSGodWeapon.skipTween = val == "1" ? true : false;
		self.checkBox.selected = Model_ZSGodWeapon.skipTween;
		self.vres10.setType(1);
		self.vres1.setType(1);
		GGlobal.reddot.listen(UIConst.ZS_GODWEAPON, self.update, self);
		GGlobal.control.listen(UIConst.ZS_GODWEAPON_DUANZAO, self.playEff, self);
		GGlobal.control.listen(UIConst.ZS_GODWEAPON_REWARD, self.updateButton, self);
		GGlobal.control.listen(Enum_MsgType.ACTIVITY_LOGIN_SEND, self.checkSBZKShow, self);
		GGlobal.control.listen(Enum_MsgType.ACTIVITY_ACTOPENSTATE, self.checkSBZKShow, self);
		if (!self.eff) {
			self.eff = EffectMgr.addEff("uieff/10050", self.effImg.displayObject as fairygui.UIContainer, self.effImg.width / 2, self.effImg.height / 2, 1000, -1, true);
		}
		self.t0.setPaused(false);
		GGlobal.control.listen(UIConst.ACTCOM_SBZK, self.checkSBZKShow, self);
	}

	private updateButton() {
		let self = this;
		self.btnBuy1.touchable = self.btnBuy10.touchable = true;
	}

	private removeListen(): void {
		let self = this;
		self.btnBuy1.removeClickListener(self.onBuy1, self);
		self.btnBuy10.removeClickListener(self.onBuy10, self);
		self.checkBox.removeClickListener(self.onCheck, self);
		self.godBt.removeClickListener(self.onGodBt, self);
		for (let i = 0; i < 4; i++) {
			self.gridArr[i].clean();
		}
		Timer.instance.remove(self.scrollComp1, self);
		self.list.numItems = 0
		if (self.eff) {
			EffectMgr.instance.removeEff(self.eff);
			self.eff = null;
		}
		GGlobal.reddot.remove(UIConst.ZS_GODWEAPON, self.update, self);
		GGlobal.control.remove(UIConst.ZS_GODWEAPON_DUANZAO, self.playEff, self);
		GGlobal.control.remove(UIConst.ZS_GODWEAPON_REWARD, self.updateButton, self);
		GGlobal.control.remove(Enum_MsgType.ACTIVITY_LOGIN_SEND, self.checkSBZKShow, self);
		GGlobal.control.remove(Enum_MsgType.ACTIVITY_ACTOPENSTATE, self.checkSBZKShow, self);
		GGlobal.control.remove(UIConst.ACTCOM_SBZK, self.checkSBZKShow, self);
	}
	private eff: Part;
	private showArr: IGridImpl[];
	private update() {
		let self = this;
		//奖励展示
		let arr = Model_ZSGodWeapon.daZaoArr[Model_ZSGodWeapon.qishu - 1];
		let cfg = Config.sbdzzs_750[Model_ZSGodWeapon.qishu];
		let curIndex = 0;
		let curIndex1 = 0;
		let pointMax = 0;
		let num = Model_ZSGodWeapon.dazaoNum;
		if (cfg) {
			self.showArr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(cfg.jiangli));
		} else {
			self.showArr = [];
		}
		self.list.numItems = self.showArr.length;
		for (let i = 0; i < self.gridArr.length; i++) {
			if (i < arr.length) {
				self.gridArr[i].setVo(ConfigHelp.makeItemListArr(JSON.parse(arr[i].jiangli))[0], arr[i].cishu);
				pointMax = arr[i].cishu;
				if (Model_ZSGodWeapon.dazaoNum >= arr[i].cishu) {
					curIndex = i;
					curIndex1 = i + 1;
				}
			}
		}
		let pointArr = [0, 150, 650, 1350, 2000];
		if (num >= pointMax) {//满级
			self.expBar.value = 2000;
		} else {
			let valT = arr[curIndex + 1].cishu - (arr[curIndex] ? arr[curIndex].cishu : 0);
			self.expBar.value = pointArr[curIndex1] + Math.floor((num - (arr[curIndex] ? arr[curIndex].cishu : 0)) * (pointArr[curIndex1 + 1] - pointArr[curIndex1]) / valT)
		}
		self.expBar.max = 2000;
		self.expBar._titleObject.text = Model_ZSGodWeapon.dazaoNum + "/" + pointMax;
		//花费
		if (self._cost1 == 0) {
			self._cost1 = Number(JSON.parse(ConfigHelp.getSystemDesc(6730))[0][2]);
		}
		if (self._cost10 == 0) {
			self._cost10 = Number(JSON.parse(ConfigHelp.getSystemDesc(6731))[0][2]);
		}
		let count = Model_Bag.getItemCount(Model_ZSGodWeapon.duanzaoC);
		if (count > 0) {
			ImageLoader.instance.loader(Enum_Path.ICON70_URL + self.dzItem.icon + ".png", self.vres1.getChild("icon").asLoader);
			self.vres1.text = "" + count + "/1"
			self.vres1.color = Color.WHITEINT;
			self.btnBuy1.checkNotice = true;
		} else {
			self.vres1.icon = CommonManager.getMoneyUrl(Enum_Attr.yuanBao)
			self.vres1.text = "" + self._cost1
			if (Model_player.voMine.yuanbao >= this._cost1) {
				self.vres1.color = Color.GREENINT;
			} else {
				self.vres1.color = Color.REDINT;
			}
			self.btnBuy1.checkNotice = false;
		}
		if (count > 9) {
			ImageLoader.instance.loader(Enum_Path.ICON70_URL + self.dzItem.icon + ".png", self.vres10.getChild("icon").asLoader);
			self.vres10.text = count + "/10"
			self.vres10.color = Color.WHITEINT;
			self.btnBuy10.checkNotice = true;
		} else {
			self.vres10.icon = CommonManager.getMoneyUrl(Enum_Attr.yuanBao)
			self.vres10.text = "" + self._cost10
			if (Model_player.voMine.yuanbao >= self._cost10) {
				self.vres10.color = Color.GREENINT;
			} else {
				self.vres10.color = Color.REDINT;
			}
			self.btnBuy10.checkNotice = false;
		}

		let count1 = Model_Bag.getItemCount(Model_ZSGodWeapon.shenjiangC);
		self.drugCount.color = count1 > 0 ? Color.getColorInt(2) : Color.getColorInt(6);
		self.godBt.checkNotice = count1 > 0;
		self.drugCount.text = count1 + "/1";
		self.hightLb.text = "再打造" + HtmlUtil.fontNoSize(Model_ZSGodWeapon.hightNum + "次", Color.getColorStr(2)) + "必出高级奖励\n使用神匠锤必出神兵"
	}

	private playEff(dropArr: any) {
		let self = this;
		if (self.eff) {
			EffectMgr.instance.removeEff(self.eff);
			self.eff = null;
		}
		self.t0.setPaused(true);
		self.eff = EffectMgr.addEff("uieff/10051", self.effImg.displayObject as fairygui.UIContainer, self.effImg.width / 2, self.effImg.height / 2, 1000, -1, true);
		let times = setTimeout(function () {
			clearTimeout(times);
			if (self.eff) {
				EffectMgr.instance.removeEff(self.eff);
				self.eff = null;
			}
			self.t0.setPaused(false);
			if (!self.eff) {
				self.eff = EffectMgr.addEff("uieff/10050", self.effImg.displayObject as fairygui.UIContainer, self.effImg.width / 2, self.effImg.height / 2, 1000, -1, true);
			}
			GGlobal.layerMgr.open(UIConst.ZS_GODWEAPON_REWARD, dropArr);
		}, 1000);
	}

	private onBuy1(): void {
		let self = this;
		let count = Model_Bag.getItemCount(Model_ZSGodWeapon.duanzaoC)
		if (count > 0) {
			GGlobal.modelGodWeapon.CG_GodWeapon_makeWuqi_7863(0, 0);
			self.btnBuy1.touchable = self.btnBuy10.touchable = false;
		} else {
			if(GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_SBZK))
			{
				if (Model_player.voMine.yuanbao < self._disCost1) {
					ModelChongZhi.guideToRecharge();
					return;
				}
			}else{
				if (Model_player.voMine.yuanbao < self._cost1) {
					ModelChongZhi.guideToRecharge();
					return;
				}
			}
			GGlobal.modelGodWeapon.CG_GodWeapon_makeWuqi_7863(0, 0);
			self.btnBuy1.touchable = self.btnBuy10.touchable = false;
		}
	}

	private onBuy10(): void {
		let self = this;
		let count = Model_Bag.getItemCount(Model_ZSGodWeapon.duanzaoC)
		if (count > 9) {
			GGlobal.modelGodWeapon.CG_GodWeapon_makeWuqi_7863(1, 0);
			self.btnBuy1.touchable = self.btnBuy10.touchable = false;
		} else {
			if(GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_SBZK))
			{
				if (Model_player.voMine.yuanbao < self._disCost10) {
					ModelChongZhi.guideToRecharge();
					return;
				}
			}else{
				if (Model_player.voMine.yuanbao < self._cost10) {
					ModelChongZhi.guideToRecharge();
					return;
				}
			}
			GGlobal.modelGodWeapon.CG_GodWeapon_makeWuqi_7863(1, 0);
			self.btnBuy1.touchable = self.btnBuy10.touchable = false;
		}
	}

	private renderItem(index: number, obj: fairygui.GComponent): void {
		var v: ViewGrid = obj as ViewGrid
		v.isShowEff = true;
		v.vo = this.showArr[index];
	}

	private onCheck(e) {
		Model_ZSGodWeapon.skipTween = this.checkBox.selected
		let key = Model_player.voMine.id + "_ZSGodWeaponCheck"
		let val = Model_ZSGodWeapon.skipTween ? "1" : "0";
		egret.localStorage.setItem(key, val);
	}

	private scrollComp1() {
		let s = this;
		let pos = s.list.scrollPane.posX + 5;
		s.list.scrollPane.setPosX(pos, true);
	}

	public getSelectJob() {
		return 0;
	}

	/**
	 * 检查神兵折扣活动是否开启
	 */
	public checkSBZKShow()
	{
		let itemNum:number = Model_Bag.getItemCount(Model_ZSGodWeapon.duanzaoC);
		if(GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_SBZK))
		{
			this.tipsGroup.visible = true;
			if(itemNum > 0)
			{
				this.vres1.visible = true;
				this.vresG1.visible = false;
			}else{
				this.vres1.visible = true;
				this.vresG1.visible = true;
			}
			if(itemNum > 9)
			{
				this.vres10.visible = true;
				this.vresG10.visible = false;
			}else{
				this.vres10.visible = true;
				this.vresG10.visible = true;
			}
			if(!this.vresG1.visible && !this.vresG10.visible)   return;
			
			let curCfg:Isbzk_281 = Model_ZSGodWeapon.getIsbzk_281(GGlobal.model_actCom.forgeNum);
			let nextCfg:Isbzk_281;
			if(curCfg)
			{
				nextCfg = Config.sbzk_281[curCfg.id + 1];
			}
			if(nextCfg)
			{
				let arr = JSON.parse(nextCfg.time);
				let count:number = arr[0][0] - GGlobal.model_actCom.forgeNum;
				if(curCfg.off >= 100)
				{
					this.tips.text = "打造" + HtmlUtil.fontNoSize(String(count), Color.YELLOWSTR)+"次后可享" + HtmlUtil.font(String(nextCfg.off / 10) + "折", Color.getColorStr(6), 22)+ "优惠";
				}else{
					this.tips.text = "当前打造享" + HtmlUtil.font(String(curCfg.off / 10) + "折", Color.getColorStr(6), 22) + "优惠\n打造" + HtmlUtil.fontNoSize(String(count), Color.YELLOWSTR)+"次后可享" + HtmlUtil.font(String(nextCfg.off / 10) + "折", Color.getColorStr(6), 22)+ "优惠";
				}
				let arr1 = JSON.parse(curCfg.time);
				let count1:number = arr1[0][1] - GGlobal.model_actCom.forgeNum;
				if(count1 >= 10)
				{
					this._disCost10 = Math.ceil(this._cost10 * (curCfg.off / 100));
					this.discount10.text = "(" + this._disCost10 + ")";
				}else{
					let one:number = this._cost10 / 10;
					let total:number = one * count1 * (curCfg.off / 100) + one * (10 - count1) * (nextCfg.off / 100);
					this._disCost10 = Math.ceil(total);
					this.discount10.text = "(" + this._disCost10 + ")";
				}
			}else{//满级
				this.tips.text = "已享最高折扣" + HtmlUtil.font(String(curCfg.off / 10) + "折", Color.getColorStr(6), 22) + "优惠";
				this._disCost10 = Math.ceil(this._cost10 * (curCfg.off / 100));
				this.discount10.text = "(" + this._disCost10 + ")";
			}
			this._disCost1 = Math.ceil(this._cost1 * (curCfg.off / 100));
			this.discount1.text = "(" + this._disCost1 + ")";
		}else{
			this.vres1.visible = true;
			this.vres10.visible = true;
			this.tipsGroup.visible = false;
			this.vresG1.visible = false;
			this.vresG10.visible = false;
		}
	}
}