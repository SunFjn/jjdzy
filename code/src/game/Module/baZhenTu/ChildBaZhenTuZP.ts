class ChildBaZhenTuZP extends fairygui.GComponent {

	public btnTong1: fairygui.GButton;
	public btnTong10: fairygui.GButton;
	public labCt: fairygui.GTextField;
	public btnYuan1: Button1;
	public btnYuan10: Button1;
	public labBag: fairygui.GTextField;
	public labTong1: fairygui.GLabel;
	public labTong10: fairygui.GLabel;
	public labYuan1: fairygui.GLabel;
	public labYuan10: fairygui.GLabel;
	public labMust: fairygui.GTextField;
	public btnBag: Button0;
	public imgBg1: fairygui.GLoader;
	public imgBg2: fairygui.GLoader;
	public vChip: fairygui.GLabel;
	public linkLb: fairygui.GRichTextField;
	public progress: fairygui.GProgressBar;
	public gridArr: ViewGrid[];
	public countArr: fairygui.GTextField[];

	private maxCount: number;


	public static URL: string = "ui://xrzn9ppaf8nk3";

	public static createInstance(): ChildBaZhenTuZP {
		return <ChildBaZhenTuZP><any>(fairygui.UIPackage.createObject("baZhenTu", "ChildBaZhenTuZP"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self)
		self.gridArr = [];
		self.countArr = [];
		for (let i = 0; i < 6; ++i) {
			self.gridArr[i] = <ViewGrid><any>(self.getChild("grid" + i));
			self.countArr[i] = <fairygui.GTextField><any>(self.getChild("count" + i));
		}

		self.linkLb.text = HtmlUtil.createLink("概率");
		self.linkLb.addEventListener(egret.TextEvent.LINK, self.openGaiLV, self);
	}

	private openGaiLV(evt: egret.TextEvent) {
		evt.stopPropagation();
		GGlobal.layerMgr.open(UIConst.GAILV, 5);
	}

	public open() {
		const self = this;
		self.eventFunction(1);
		self.setCountArr();
		self.setGridArr();
		self.update();
		GGlobal.modelPlayer.listen(Model_player.FUWEN_UPDATE, self.upFuwen, self);
		GGlobal.modelBaZhenTu.listen(Model_BaZhenTu.BUY, self.update, self);
		GGlobal.modelBaZhenTu.listen(Model_BaZhenTu.OPENUI, self.update, self);
		IconUtil.setImg1(Enum_Path.BAZHENTU_URL + "bg1.png", self.imgBg1);
		IconUtil.setImg1(Enum_Path.BAZHENTU_URL + "bg2.png", self.imgBg2);
	}

	private setGridArr() {
		let data = Config.bztluck_261;
		let temp: ViewGrid;
		let reward: number[];
		let vo;
		for (let key in data) {
			temp = this.gridArr[parseInt(data[key].id) - 1];
			temp.isShowEff = true;
			temp.tipEnabled = true;
			vo = ConfigHelp.makeItem(JSON.parse(data[key].zhanshi)[0]);
			temp.vo = vo;
		}
	}

	private setCountArr() {
		let data = Config.bztluck_261;
		for (let key in data) {
			this.countArr[parseInt(data[key].id) - 1].text = (data[key].xingyunzhi / 10) + "次";
			this.maxCount = data[key].xingyunzhi / 10;
		}
		this.progress.max = this.maxCount;
	}

	private setProgress(count: number) {
		this.progress.value = count % this.maxCount;
	}

	public close() {
		const self = this;
		self.eventFunction(0);
		ConfigHelp.cleanGridEff(self.gridArr);
		GGlobal.modelPlayer.remove(Model_player.FUWEN_UPDATE, self.upFuwen, self);
		GGlobal.modelBaZhenTu.remove(Model_BaZhenTu.BUY, self.update, self);
		GGlobal.modelBaZhenTu.remove(Model_BaZhenTu.OPENUI, self.update, self);
		for (let i = 0; i < 4; i++) {
			this.gridArr[i].clean();
		}
		IconUtil.setImg1(null, self.imgBg1);
		IconUtil.setImg1(null, self.imgBg2);
	}
	eventFunction = (t) => {
		let self = this;
		let event = EventUtil.register;
		event(t, self.btnTong1, EventUtil.TOUCH, self.onTong1, self);
		event(t, self.btnTong10, EventUtil.TOUCH, self.onTong10, self);
		event(t, self.btnYuan1, EventUtil.TOUCH, self.onYuan1, self);
		event(t, self.btnYuan10, EventUtil.TOUCH, self.onYuan10, self);
		event(t, self.btnBag, EventUtil.TOUCH, self.onBag, self);
	}

	private onTong1() {
		Model_BaZhenTu.onTong(1);
	}
	private onTong10() {
		Model_BaZhenTu.onTong(10);
	}

	private onYuan1() {
		Model_BaZhenTu.onYuan(1)
	}
	private onYuan10() {
		Model_BaZhenTu.onYuan(10)
	}

	private onBag() {
		GGlobal.layerMgr.open(UIConst.BAZHENTU_TEMP)
	}

	private update() {
		let s = this;
		Model_BaZhenTu.initCost();


		s.labTong1.text = ConfigHelp.numToStr(Model_BaZhenTu.tong1);
		s.labTong10.text = ConfigHelp.numToStr(Model_BaZhenTu.tong10);

		if (Model_player.voMine.tongbi >= Model_BaZhenTu.tong1) {
			s.labTong1.color = Color.GREENINT;
		} else {
			s.labTong1.color = Color.REDINT;
		}
		if (Model_player.voMine.tongbi >= Model_BaZhenTu.tong10) {
			s.labTong10.color = Color.GREENINT;
		} else {
			s.labTong10.color = Color.REDINT;
		}

		let tongLast = Model_BaZhenTu.tongMax - Model_BaZhenTu.tongCt
		let strCt;
		if (tongLast > 0) {
			strCt = HtmlUtil.fontNoSize(tongLast + "", Color.GREENSTR)
		} else {
			strCt = HtmlUtil.fontNoSize(tongLast + "", Color.REDSTR)
		}
		s.labCt.text = "今日次数：" + strCt + "/" + Model_BaZhenTu.tongMax
		s.labMust.text = "再抽[color=#33dd33]" + (10 - Model_BaZhenTu.yuanCt) + "次[/color]必得高级符文"

		let JDCct = Model_Bag.getItemCount(Model_BaZhenTu.JDCid);
		if (Model_BaZhenTu.freeCt > 0) {
			s.labYuan1.visible = false;
			s.btnYuan1.text = "免费1次"
			s.btnYuan1.checkNotice = true;
		} else {
			s.labYuan1.visible = true;
			s.btnYuan1.text = "鉴定1次"

			if (JDCct == 0) {
				s.labYuan1.icon = CommonManager.getMoneyUrl(Enum_Attr.yuanBao);
				if (Model_player.voMine.yuanbao >= Model_BaZhenTu.yuan1) {
					s.labYuan1.color = Color.GREENINT;
				} else {
					s.labYuan1.color = Color.REDINT;
				}
				s.labYuan1.text = "" + Model_BaZhenTu.yuan1
				s.btnYuan1.checkNotice = false;
			} else {
				let iconObject = this.labYuan1.getChild("icon").asLoader;
				let itemCfg = Config.daoju_204[Model_BaZhenTu.JDCid];
				ImageLoader.instance.loader(Enum_Path.ICON70_URL + itemCfg.icon + ".png", iconObject);
				s.labYuan1.color = Color.GREENINT;
				s.labYuan1.text = JDCct + "/1";
				s.btnYuan1.checkNotice = true;
			}
		}
		if (JDCct < 10) {
			s.labYuan10.icon = CommonManager.getMoneyUrl(Enum_Attr.yuanBao);
			if (Model_player.voMine.yuanbao >= Model_BaZhenTu.yuan10) {
				this.labYuan10.color = Color.GREENINT;
			} else {
				this.labYuan10.color = Color.REDINT;
			}
			s.labYuan10.text = "" + Model_BaZhenTu.yuan10
			s.btnYuan10.checkNotice = false;
		} else {
			let iconObject = this.labYuan10.getChild("icon").asLoader;
			let itemCfg = Config.daoju_204[Model_BaZhenTu.JDCid];
			ImageLoader.instance.loader(Enum_Path.ICON70_URL + itemCfg.icon + ".png", iconObject);
			s.labYuan10.color = Color.GREENINT;
			s.labYuan10.text = JDCct + "/10";
			s.btnYuan10.checkNotice = true;
		}

		s.upFuwen();
		s.labBag.text = "背包符文：" + Model_BaZhenTu.bagArr.length + "/" + Model_BaZhenTu.getBagMax();
		s.setProgress(Model_BaZhenTu.yuanTotalCount);
	}

	private upFuwen() {
		this.vChip.text = ConfigHelp.numToStr(Model_player.voMine.fuwen);
	}
}