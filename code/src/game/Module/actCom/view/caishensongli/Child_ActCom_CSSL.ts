/**
 * 新活动-财神送礼
 */
class Child_ActCom_CSSL extends fairygui.GComponent implements IPanel{
	public reward0: ViewGrid;
	public reward1: ViewGrid;
	public reward2: ViewGrid;
	public reward3: ViewGrid;
	public reward4: ViewGrid;
	public reward5: ViewGrid;
	public reward6: ViewGrid;
	public reward7: ViewGrid;
	public reward8: ViewGrid;
	public reward9: ViewGrid;
	public reward10: ViewGrid;
	public reward11: ViewGrid;
	public labTime: fairygui.GRichTextField;
	public labDraw: fairygui.GRichTextField;
	public labRecharge: fairygui.GRichTextField;
	public labTips: fairygui.GRichTextField;
	public qyBtn: Button1;
	private _rewardArr: ViewGrid[];
	private _vo: Vo_Activity;
	public bgImg: fairygui.GLoader;

	public static URL: string = "ui://scvzi2gqw89c1";

	/** 设置包名（静态属性） */
	public static pkg = "ActCom_CSSL";

	public static createInstance(): Child_ActCom_CSSL {
		return <Child_ActCom_CSSL><any>(fairygui.UIPackage.createObject("ActCom_CSSL", "Child_ActCom_CSSL"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
	}

	initView(pParent: fairygui.GObject) {
		let self = this;
		self._rewardArr = [self.reward0, self.reward1, self.reward2, self.reward3, self.reward4, self.reward5, self.reward6, self.reward7, self.reward8, self.reward9, self.reward10, self.reward11];
	}

	openPanel(pData?: any) {
		let self = this;
		self._vo = pData;
		IconUtil.setImg(self.bgImg, Enum_Path.ACTCOM_URL + "caishensongli.jpg");
		GGlobal.modelActivity.CG_OPENACT(self._vo.id);
		GGlobal.control.listen(UIConst.ACTCOM_CSSL, self.updateView, self);
		Timer.instance.listen(self.onUpdate, self);
		self.qyBtn.addClickListener(self.onQiYuan, self);

		let rewardCfg = Config.xtcs_004[7902];
		let showArr = [];
		if (rewardCfg) {
			showArr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(rewardCfg.other));
		}
		let len: number = self._rewardArr.length;
		for (let i = 0; i < len; i++) {
			let v = self._rewardArr[i]
			v.visible = true;
			v.isShowEff = true;
			v.tipEnabled = true;
			v.vo = showArr[i];
		}

		let cfg:Ixtcs_004 = Config.xtcs_004[7901];
		if(cfg)
		{
			self.labTips.text = "活动期间每充值<font color='#15f234'>" + cfg.num + "元</font>可抽奖1次(上不封顶)";
		}

		self.updateView();
	}

	closePanel(pData?: any) {
		let self = this;
		self.disposePanel();
	}

	private disposePanel() {
		let self = this;
		Timer.instance.remove(self.onUpdate, self);
		self.qyBtn.removeClickListener(self.onQiYuan, self);
		IconUtil.setImg(self.bgImg, null);
		GGlobal.control.remove(UIConst.ACTCOM_CSSL, self.updateView, self);
	}

	private updateView(rewards:IGridImpl[] = null) {
		let self = this;
		let model = GGlobal.modelCaiShenSongLli;
		self.labRecharge.text = "再充值<font color='#15f234'>" + model.recharge + "元</font>可抽奖1次";
		if (model.lottery > 0) {
			self.labDraw.text = "抽奖次数：<font color='#15f234'>" + model.lottery + "</font>";
			self.qyBtn.checkNotice = true;
		} else {
			self.labDraw.text = "抽奖次数：<font color='#ed1414'>" + model.lottery + "</font>";
			self.qyBtn.checkNotice = false;
		}

		if(rewards)
		{
			View_Reward_Show4.show(UIConst.ACTCOM_CSSL, "再來一次", Handler.create(self, () => {
				GGlobal.modelCaiShenSongLli.CG_TURN();
			}), rewards, () => {
				let t_color = Color.GREENSTR;
				if (GGlobal.modelCaiShenSongLli.lottery <= 0)
					t_color = Color.REDSTR;
				let t_countStr = HtmlUtil.font(GGlobal.modelCaiShenSongLli.lottery + "", t_color);
				return `抽奖剩余次数：${t_countStr}`;
			}, self);
		}
	}

	private onUpdate() {
		const end = this._vo ? this._vo.end : 0;
		const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
		if (end - servTime > 0) {
			this.labTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getMSBySecond4(end - servTime) + "</font>";
		} else {
			this.labTime.text = "00:00:00";
		}
	}

	/**
	 * 祈愿按钮
	 */
	private onQiYuan(): void {
		let model = GGlobal.modelCaiShenSongLli;
		if(model.lottery <= 0)
		{
			ViewCommonWarn.text("抽奖次数不足");
			return;
		}
		model.CG_TURN();
	}
}