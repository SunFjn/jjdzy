/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class BossZCItem extends fairygui.GComponent {


	public n28: fairygui.GImage;
	public n27: fairygui.GLoader;
	public n36: fairygui.GImage;
	public n17: fairygui.GLoader;
	public crossImg: fairygui.GImage;
	public headIcon: fairygui.GLoader;
	public n15: fairygui.GImage;
	public nameLb: fairygui.GRichTextField;
	public n29: fairygui.GList;
	public n32: fairygui.GImage;
	public resLb: fairygui.GRichTextField;
	public groupEnter: fairygui.GGroup;
	public enterBt: fairygui.GButton;
	public n34: fairygui.GImage;
	public timeLb: fairygui.GRichTextField;
	public groupTime: fairygui.GGroup;
	public n137: fairygui.GImage;
	public cdLb: fairygui.GRichTextField;
	public groupCD: fairygui.GGroup;
	public n43: fairygui.GImage;
	public lbKiller: fairygui.GRichTextField;
	public groupKiller: fairygui.GGroup;

	public static URL: string = "ui://47jfyc6eppyw2z";

	public static createInstance(): BossZCItem {
		return <BossZCItem><any>(fairygui.UIPackage.createObject("Boss", "BossZCItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.n29.callbackThisObj = self;
		self.n29.itemRenderer = self.itemRender;
		self.n29.setVirtual();
	}

	private awards: IGridImpl[];
	private itemRender(idx, obj) {
		let item: ViewGrid = obj as ViewGrid;
		item.vo = this.awards[idx];
		item.tipEnabled = true;
		item.showEff(true);
	}

	private enterHD() {
		let m = GGlobal.modelBossZc;
		m.entranceCloseTime = this._endTime;
		m.sceneState = this._state;
		m.CGenterWarScene(this._idx);
	}

	public clean() {
		this.n29.numItems = 0;
		this.enterBt.removeClickListener(this.enterHD, this);
		IconUtil.setImg(this.headIcon, null);
		IconUtil.setImg(this.n27, null);
	}

	public updateX() {
		let nextTime = '';
		let nextFresh = '';
		let self = this;
		let state = self._state;
		let now = Model_GlobalMsg.getServerTime();
		let min = new Date(now).getMinutes();
		if (now >= self._cdTime) {
			self.cdLb.text = "";
			self.groupCD.visible = false;
		} else {
			let t = self._cdTime - now;
			t = (t / 1000) >> 0;
			self.cdLb.text = "进入CD：" + t + "秒";
			self.cdLb.text = BroadCastManager.reTxt("进入CD：{0}秒", t);
		}

		if (state == 0) {//准备时间的倒计时
			if (self._endTime <= now) {
				self.timeLb.color = Color.REDINT;
				self.timeLb.text = "入口已开启";
				Model_BossZC.data_valid = 1;
			} else {
				let limt = self._endTime - now;
				self.groupKiller.visible = self._killer != "";
			}
		} else if (state == 1) {//入口关闭的倒计时
			if (self._endTime <= now) {
				self.resLb.text = "Boss已刷新";
				Model_BossZC.data_valid = 1;
			} else {
				let limt = self._endTime - now;
				self.resLb.text = "进入时间：" + DateUtil.getHMSBySecond2((limt / 1000) >> 0);
			}
		} else if (state == 2) {//入口关闭的倒计时
			self.timeLb.color = Color.REDINT;
			self.timeLb.text = "入口已关闭";
		} else if (state == 3) {
			if (min ==38) {
				Model_BossZC.data_valid = 1;
			}
		}
	}

	private setState(st) {
		let self = this;
		let now = Model_GlobalMsg.getServerTime();
		switch (st) {
			case 0://等待刷新
				self.enterBt.visible = false;
				self.groupEnter.visible = false;
				self.groupTime.visible = false;
				self.timeLb.color = Color.GREENINT;
				self.groupCD.visible = false;
				break;
			case 1://准备时间
				self.enterBt.visible = true;
				self.groupEnter.visible = true;
				self.groupTime.visible = false;
				self.groupCD.visible = now < self._cdTime;
				break;
			case 2://PK时间
				self.enterBt.visible = false;
				self.groupEnter.visible = false;
				self.groupTime.visible = true;
				self.groupCD.visible = false;
				self.timeLb.color = 0xfe0000;
				self.timeLb.text = "入口已关闭";
				break;
			case 3://抢夺BOSS
				self.enterBt.visible = false;
				self.groupEnter.visible = true;
				self.groupTime.visible = true;
				self.resLb.text = "BOSS已刷新";
				self.groupCD.visible = false;
				self.timeLb.color = 0xfe0000;
				self.timeLb.text = "入口已关闭";
				break;
			case 4://重新刷新BOSS
				self.groupTime.visible = false;
				self.enterBt.visible = true;
				self.groupEnter.visible = true;
				self.resLb.text = "BOSS已刷新";
				self.groupCD.visible = now < self._cdTime;
				break;
		}
	}

	private _idx;
	private _endTime;
	private _cdTime;
	private _state;
	private _nextDta;
	private _killer = "";
	public setdata(data, type) {
		let self = this;
		self._idx = data[0];
		let id = self._idx;
		let st = self._state = data[2];
		self._endTime = data[1];
		self._cdTime = data[3];
		self._nextDta = data[5];
		self._killer = data[6];
		let isFirstKill = data[7];
		let cfg = Config.bosszc_010[id];
		if (isFirstKill) {
			self.n17.url = "ui://jvxpx9ems62s3fu";
			self.awards = ConfigHelp.makeItemListArr(JSON.parse(cfg.first));
			self.n29.numItems = self.awards.length;
		} else {
			self.n17.url = "ui://jvxpx9emppyw3ey";
			self.awards = ConfigHelp.makeItemListArr(JSON.parse(cfg.zhanshi));
			self.n29.numItems = self.awards.length;
		}

		self.cdLb.text = "";
		self.timeLb.text = "";
		self.resLb.text = "";
		self.lbKiller.text = "击杀:" + self._killer;
		let now = Model_GlobalMsg.getServerTime();
		self.groupKiller.visible = false;
		self.setState(st);

		self.crossImg.visible = type == 2;

		self.enterBt.addClickListener(self.enterHD, self);

		let bossCfg = Config.NPC_200[cfg.id];
		self.nameLb.text = cfg.mingzi;
		self.nameLb.color = Color.getColorInt(cfg.pinzhi);
		IconUtil.setImg(self.headIcon, RoleUtil.getHeadRole(bossCfg.head + ""));
		IconUtil.setImg(self.n27, Enum_Path.PIC_URL + "bosszc" + cfg.pinzhi + ".jpg");
		self.updateX();
	}
}