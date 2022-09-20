/**
 * 少主祈愿排名
 */
class ChildShaoZhuQYRank extends fairygui.GComponent {
	public bg: fairygui.GLoader;
	public myRankTxt: fairygui.GRichTextField;
	public myAuthenTxt: fairygui.GRichTextField;
	public sbTxt: fairygui.GRichTextField;
	public bpTxt: fairygui.GRichTextField;
	public timeTxt: fairygui.GTextField;
	public nameTxt: fairygui.GTextField;
	public authenTxt: fairygui.GTextField;
	public list: fairygui.GList;
	public bpList: fairygui.GList;
	public item2: ItemShaoZhuQyRank1;
	public item3: ItemShaoZhuQyRank1;
	public item4: ItemShaoZhuQyRank2;
	public item5: ItemShaoZhuQyRank2;
	public c1: fairygui.Controller;
	private container: EmptyComp;
	public btnGo: Button0;
	public static URL: string = "ui://w5ll6n5jfoqs1v";

	private static _instance: ChildShaoZhuQYRank;
	public static get instance(): ChildShaoZhuQYRank {
		if (!this._instance) {
			this._instance = <ChildShaoZhuQYRank><any>(fairygui.UIPackage.createObject("shaozhuAct", "ChildShaoZhuQYRank"));
		}
		return this._instance;
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);

		self.list.itemRenderer = self.itemRender;
		self.list.callbackThisObj = self;

		self.bpList.itemRenderer = self.itemRender1;
		self.bpList.callbackThisObj = self;

		self.item2.setVO(2);
		self.item3.setVO(3);
		self.item4.setVO(4);
		self.item5.setVO(5);
	}

	public show(): void {
		IconUtil.setImg(this.bg, "resource/image/pic/bg7.jpg");
		let self = this;
		let cfg = Config.szqypm_272[1];
		self._awards = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
		self.list.numItems = self._awards.length;

		self._bigAwards = JSON.parse(cfg.big);
		self.bpList.numItems = self._bigAwards.length;

		// GGlobal.modelEightLock.CG4571(UIConst.SHAOZHU_QY_RANK);
		GGlobal.modelShaoZhuAct.CG_OPEN_UI();
		GGlobal.control.listen(UIConst.SHAOZHU_QY_RANK, self.onUpdate, self);

		self.btnGo.addClickListener(self.goHandler, self);
	}

	/**销毁 */
	public disposePanel(): void {
		IconUtil.setImg(this.bg, null);
		let self = this;
		self.list.numItems = 0;
		self.bpList.numItems = 0;
		GGlobal.control.remove(UIConst.SHAOZHU_QY_RANK, self.onUpdate, self);
		self.onUpdate();
		self.container.setUIRole(null);
		self.btnGo.removeClickListener(self.goHandler, self);
		Timer.instance.remove(this.onTick, this);
	}

	private _awards = [];
	private _bigAwards = [];
	private itemRender(idx, obj) {
		let item: ViewGrid = obj as ViewGrid;
		item.isShowEff = true;
		item.tipEnabled = true;
		item.vo = this._awards[idx];
	}

	private itemRender1(idx, obj) {
		var bol: boolean = false;
		if (this._firstVO && this._firstVO.jdCount >= Config.xtcs_004[6204].num) {
			bol = true;
		}
		let item: QiYuanListGrid = obj as QiYuanListGrid;
		item.setVo(this._bigAwards[idx], bol);
	}

	private _firstVO: QiYuanRankVO;
	/**更新数据 */
	private onUpdate() {
		let self = this;
		this.item2.setData();
		this.item3.setData();
		const end = ModelShaoZhuAct.endTime;
		const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
		const timeRemain = end - servTime;
		if (timeRemain > 0) {
			if (timeRemain >= 24 * 60 * 60 * 1000) {
				self.timeTxt.text = "剩余时间：" + DateUtil.getMSBySecond5(end - servTime);
			} else {
				self.timeTxt.text = "剩余时间：" + DateUtil.getMSBySecond4(end - servTime);
			}
			Timer.instance.listen(this.onTick, this, 1000);
		} else {
			this.timeTxt.text = "剩余时间：活动已结束";
			this.btnGo.visible = false;
		}

		let color0 = ModelShaoZhuAct.myjdCount >= Config.xtcs_004[6203].num ? 2 : 6;
		let color1 = ModelShaoZhuAct.myjdCount >= Config.xtcs_004[6204].num ? 2 : 6;
		this.sbTxt.text = "上榜条件：" + HtmlUtil.fontNoSize("祈愿" + Config.xtcs_004[6203].num + "次", Color.getColorStr(color0));
		this.bpTxt.text = "大奖条件：" + HtmlUtil.fontNoSize("祈愿" + Config.xtcs_004[6204].num + "次", Color.getColorStr(color1));

		if (!ModelShaoZhuAct.rankData || ModelShaoZhuAct.rankData.length <= 0) {
			self.c1.selectedIndex = 0;
		} else {
			self.c1.selectedIndex = 1;
			self._firstVO = ModelShaoZhuAct.rankData[0];
			self.nameTxt.text = self._firstVO.name;
			self.authenTxt.text = "祈愿：" + self._firstVO.jdCount + "次";
			if (ModelShaoZhuAct.myRank == 1) {
				self.nameTxt.color = Color.GREENINT;
				self.nameTxt.bold = true;
			} else {
				self.nameTxt.color = Color.WHITEINT;
			}

			if (ModelShaoZhuAct.modId > 1000 && ModelShaoZhuAct.modId < 100000) {
				var mx = Config.sz_739[ModelShaoZhuAct.modId].moxing;
				self.container.setUIRole(mx);
			} else {
				self.container.setUIRole(ModelShaoZhuAct.modId);
			}
		}

		if (ModelShaoZhuAct.myRank == 0 || ModelShaoZhuAct.myRank > 20 || ModelShaoZhuAct.myjdCount < Config.xtcs_004[6203].num) {
			self.myRankTxt.text = "我的排名：未上榜";
		} else {
			self.myRankTxt.text = "我的排名：" + ModelShaoZhuAct.myRank;
		}

		self.myAuthenTxt.text = "祈愿：" + ModelShaoZhuAct.myjdCount + "次";

		self.bpList.numItems = self._bigAwards.length;
	}

	private onTick() {
		const end = ModelShaoZhuAct.endTime;
		const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
		const timeRemain = end - servTime;
		if (timeRemain > 0) {
			if (timeRemain >= 24 * 60 * 60 * 1000) {
				this.timeTxt.text = "剩余时间：" + DateUtil.getMSBySecond5(end - servTime);
			} else {
				this.timeTxt.text = "剩余时间：" + DateUtil.getMSBySecond4(end - servTime);
			}
			this.btnGo.visible = true;
		} else {
			this.timeTxt.text = "剩余时间：活动已结束";
			Timer.instance.remove(this.onTick, this);
			this.btnGo.visible = false;
		}
	}

	private goHandler() {
		GGlobal.layerMgr.open(UIConst.SHAOZHU_QIYUAN);
	}
}