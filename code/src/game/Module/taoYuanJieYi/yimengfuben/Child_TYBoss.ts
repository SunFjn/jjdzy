/**
 * 义盟副本子界面
 */
class Child_TYBoss extends fairygui.GComponent implements IPanel{
	public c1: fairygui.Controller;
	public expBar: fairygui.GProgressBar;
	public lowBtn: Button0;
	public highBtn: Button1;
	public nameLb: fairygui.GRichTextField;
	public challengeBtn: Button1;
	public vres: ViewResource;
	public getImg: fairygui.GImage;
	public lowItem:TYJY_BossItem;
	public highItem:TYJY_BossItem;
	public tipsLb: fairygui.GRichTextField;
	public labTime: fairygui.GRichTextField;
	private _cost:number = 0;

	public static URL: string = "ui://m2fm2aiyvfmxz";

	public static createInstance(): Child_TYBoss {
		return <Child_TYBoss><any>(fairygui.UIPackage.createObject("taoYuanJieYi", "Child_TYBoss"));
	}

	public constructor() {
		super();
	}

	protected _viewParent: fairygui.GObject;
	initView(pParent: fairygui.GObject) {
		this._viewParent = pParent;
		this.addRelation(this._viewParent, fairygui.RelationType.Size);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);

		self.vres.setType(1);
	}

	openPanel(pData?: any) {
		let self = this;
		GGlobal.model_TYJY.CG_OPEN_TYBOSSUI();
		GGlobal.control.listen(UIConst.TYJY_YMFB, self.updateView, self);
		self.lowBtn.addClickListener(self.onLow, self);
		self.highBtn.addClickListener(self.onHigh, self);
		self.challengeBtn.addClickListener(self.onChallenge, self);
		self.lowItem.setData(0);
		self.highItem.setData(1);
	}

	closePanel() {
		this.onHide();
	}

	protected onHide() {
		let self = this;
		GGlobal.control.remove(UIConst.TYJY_YMFB, self.updateView, self);
		self.lowBtn.removeClickListener(self.onLow, self);
		self.highBtn.removeClickListener(self.onHigh, self);
		self.challengeBtn.removeClickListener(self.onChallenge, self);
		self.lowItem.clean();
		self.highItem.clean();
		Timer.instance.remove(self.onUpdate, self);
	}

	/**
	 * 更新页面数据
	 */
	private updateView()
	{
		let model = GGlobal.model_TYJY;
		let s = this;
		Timer.instance.listen(s.onUpdate, s, 1000);
		if(Model_TYJY.curBossID == 0)//未开启
		{
			let value:number = model.bossPro;
			let total:number = Config.xtcs_004[7702].num;
			s.expBar.max = total;
			s.expBar.value = value;
			s.expBar._titleObject.text = value + "/" + total;
			if(value >= total)
			{
				s.c1.selectedIndex = 1;
				s.lowBtn.checkNotice = true;
				s.highBtn.checkNotice = true;

				s.vres.icon = CommonManager.getMoneyUrl(Enum_Attr.yuanBao);
				let cfg:Ityjyboss_251 = Config.tyjyboss_251[343002];
				s._cost = Number(ConfigHelp.SplitStr(cfg.consume)[0][2]);
				s.vres.text = "" + s._cost;
				if (Model_player.voMine.yuanbao >= s._cost) {
					s.vres.color = Color.GREENINT;
				} else {
					s.vres.color = Color.REDINT;
				}
			}else{
				s.c1.selectedIndex = 0;
				s.tipsLb.text = "每日总共完成" + total + "个义盟任务可选择一个boss开启";
			}
		}else{//开启
			s.getImg.visible = false;
			s.challengeBtn.visible = false;
			s.challengeBtn.checkNotice = false;
			s.c1.selectedIndex = 2;
			if(Model_TYJY.curBossID == 343001)
			{
				s.nameLb.text = model.bossOpenByPlayer + "开启了低级BOSS";
			}else{
				s.nameLb.text = model.bossOpenByPlayer + "开启了高级BOSS";
			}
			if(model.bossGet == 0)
			{
				s.challengeBtn.visible = true;
				s.challengeBtn.text = "挑战BOSS";
			}else if(model.bossGet == 1)//可领取
			{
				s.challengeBtn.visible = true;
				s.challengeBtn.text = "领取奖励";
				s.challengeBtn.checkNotice = true;
			}else{//已领取
				s.getImg.visible = true;
			}
		}
	}

	private onUpdate() {
		let model = GGlobal.model_TYJY;
		const end = model.bossTime ? model.bossTime : 0;
		if (end > 0) {
			this.labTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getMSBySecond4(end) + "</font>";
		} else {
			this.labTime.text = "00:00:00";
		}
	}

	/**
	 * 低级开启
	 */
	private onLow(e: egret.TouchEvent): void {
		GGlobal.layerMgr.open(UIConst.TYJY_BOSSTIPS);
	}

	/**
	 * 高级开启
	 */
	private onHigh(e: egret.TouchEvent): void {
		if (Model_player.voMine.yuanbao < this._cost) {
			ViewCommonWarn.text("元宝不足");
			return;
		}
		GGlobal.model_TYJY.CG_OPEN_BOSS(343002);
	}

	/**
	 * 挑战BOSS
	 */
	private onChallenge(e: egret.TouchEvent): void {
		if(GGlobal.model_TYJY.bossGet == 0)
		{
			if (GGlobal.sceneType == SceneCtrl.TAOYUANJIEYI) return;
			
			GGlobal.model_TYJY.CG_CHALLENGE_BOSS();
		}else{
			GGlobal.model_TYJY.CG_GET_BOSSREWARD();
		}
	}
}