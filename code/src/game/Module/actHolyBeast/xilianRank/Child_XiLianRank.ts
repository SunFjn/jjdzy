/**
 * 洗练排名
 */
class Child_XiLianRank extends fairygui.GComponent implements IActHolyBeast {
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
	public item2: ItemXiLianRank1;
	public item3: ItemXiLianRank1;
	public item4: ItemXiLianRank2;
	public item5: ItemXiLianRank2;
	public c1: fairygui.Controller;
	private container: EmptyComp;
	public btnGo: Button0;
	private _hid: number
	public static URL: string = "ui://d5y9ngt6cl031l";

	public static createInstance(): Child_XiLianRank {
		return <Child_XiLianRank><any>(fairygui.UIPackage.createObject("actHolyBeast", "Child_XiLianRank"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.list = <fairygui.GList><any>(this.getChild("list"));
		this.bpList = <fairygui.GList><any>(this.getChild("bpList"));
		this.c1 = this.getController("c1");
		this.bg = <fairygui.GLoader><any>(this.getChild("bg"));
		this.myRankTxt = <fairygui.GRichTextField><any>(this.getChild("myRankTxt"));
		this.myAuthenTxt = <fairygui.GRichTextField><any>(this.getChild("myAuthenTxt"));
		this.sbTxt = <fairygui.GRichTextField><any>(this.getChild("sbTxt"));
		this.bpTxt = <fairygui.GRichTextField><any>(this.getChild("bpTxt"));
		this.timeTxt = <fairygui.GRichTextField><any>(this.getChild("timeTxt"));
		this.nameTxt = <fairygui.GRichTextField><any>(this.getChild("nameTxt"));
		this.authenTxt = <fairygui.GRichTextField><any>(this.getChild("authenTxt"));
		this.item2 = <ItemXiLianRank1><any>(this.getChild("item2"));
		this.item3 = <ItemXiLianRank1><any>(this.getChild("item3"));
		this.item4 = <ItemXiLianRank2><any>(this.getChild("item4"));
		this.item5 = <ItemXiLianRank2><any>(this.getChild("item5"));
		this.container = <EmptyComp><any>(this.getChild("container"));
		this.btnGo = <Button0><any>(this.getChild("btnGo"));

		this.list.itemRenderer = this.itemRender;
		this.list.callbackThisObj = this;

		this.bpList.itemRenderer = this.itemRender1;
		this.bpList.callbackThisObj = this;

		this.item2.setVO(2);
		this.item3.setVO(3);
		this.item4.setVO(4);
		this.item5.setVO(5);
	}

	private static _instance: Child_XiLianRank
	public static get instance(): Child_XiLianRank {
		if (Child_XiLianRank._instance == null) {
			Child_XiLianRank._instance = Child_XiLianRank.createInstance();
		}
		return Child_XiLianRank._instance;
	}

	public show(p: fairygui.GComponent, id): void {
		let self = this;
		self._hid = id;
		p.addChild(self);
		self.setXY(0, 257);
		IconUtil.setImg(self.bg, "resource/image/pic/bg6.jpg");
		let cfg = Config.shxlpm_268[1];
		self._awards = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
		self.list.numItems = self._awards.length;

		self._bigAwards = JSON.parse(cfg.reward1);
		self.bpList.numItems = self._bigAwards.length;

		// GGlobal.modelEightLock.CG4571(id);
		GGlobal.control.listen(Enum_MsgType.ACT_HOLYB_XILIAN_RANK, self.onUpdate, self);
		self.onUpdate();

		self.btnGo.addClickListener(self.goHandler, self);
	}

	/**注销事件 */
	public disposePanel(): void {
		let self = this;
		if (self.parent) {
			self.parent.removeChild(self);
		}
		IconUtil.setImg(self.bg, null);
		self.list.numItems = 0;
		self.bpList.numItems = 0;
		GGlobal.control.remove(Enum_MsgType.ACT_HOLYB_XILIAN_RANK, self.onUpdate, self);
		self.container.setUIRole(null);
		self.btnGo.removeClickListener(self.goHandler, self);
		Timer.instance.remove(self.onTick, self);
	}

	public dispose() {
		Child_XiLianRank._instance = null;
		super.dispose();
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
		if (this._firstVO && this._firstVO.jdCount >= Config.xtcs_004[5704].num) {
			bol = true;
		}
		let item: XiLianListGrid = obj as XiLianListGrid;
		item.setVo(this._bigAwards[idx], bol);
	}


	private _firstVO: XiLianRankVO;
	/**更新数据 */
	private onUpdate() {
		let self = this;
		this.item2.setData();
		this.item3.setData();
		const end = Model_ActHolyBeast.endTime;
		const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
		const timeRemain = end - servTime;
		if (timeRemain > 0) {
			if (timeRemain >= 24 * 60 * 60 * 1000) {
				self.timeTxt.text = "剩余时间：" + DateUtil.getMSBySecond5(end - servTime);
			} else {
				self.timeTxt.text = "剩余时间：" + DateUtil.getMSBySecond4(end - servTime);
			}
			Timer.instance.listen(self.onTick, self, 1000);
		} else {
			self.timeTxt.text = "剩余时间：活动已结束";
			self.btnGo.visible = false;
		}

		let color0 = Model_ActHolyBeast.myjdCount >= Config.xtcs_004[5703].num ? 2 : 6;
		let color1 = Model_ActHolyBeast.myjdCount >= Config.xtcs_004[5704].num ? 2 : 6;
		self.sbTxt.text = "上榜条件：" + HtmlUtil.fontNoSize("圣兽洗练" + Config.xtcs_004[5703].num + "次", Color.getColorStr(color0));
		self.bpTxt.text = "大奖条件：" + HtmlUtil.fontNoSize("圣兽洗练" + Config.xtcs_004[5704].num + "次", Color.getColorStr(color1));

		if (!Model_ActHolyBeast.rankData || Model_ActHolyBeast.rankData.length <= 0) {
			self.c1.selectedIndex = 0;
		} else {
			self.c1.selectedIndex = 1;
			self._firstVO = Model_ActHolyBeast.rankData[0];
			self.nameTxt.text = self._firstVO.name;
			self.authenTxt.text = "圣兽洗练：" + self._firstVO.jdCount + "次";
			if (Model_ActHolyBeast.myRank == 1) {
				self.nameTxt.color = Color.GREENINT;
				self.nameTxt.bold = true;
			} else {
				self.nameTxt.color = Color.WHITEINT;
			}

			if (Model_ActHolyBeast.modId > 1000 && Model_ActHolyBeast.modId < 100000) {
				var mx = Config.sz_739[Model_ActHolyBeast.modId].moxing;
				self.container.setUIRole(mx);
			} else {
				self.container.setUIRole(Model_ActHolyBeast.modId);
			}
		}

		if (Model_ActHolyBeast.myRank == 0 || Model_ActHolyBeast.myRank > 20 || Model_ActHolyBeast.myjdCount < Config.xtcs_004[5703].num) {
			self.myRankTxt.text = "我的排名：未上榜";
		} else {
			self.myRankTxt.text = "我的排名：" + Model_ActHolyBeast.myRank;
		}

		self.myAuthenTxt.text = "圣兽洗练：" + Model_ActHolyBeast.myjdCount;

		self.bpList.numItems = self._bigAwards.length;
	}

	/**活动时间刷新 */
	private onTick() {
		const end = Model_ActHolyBeast.endTime;
		const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
		const timeRemain = end - servTime;
		if (end - servTime > 0) {
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

	/**前往按钮事件 */
	private goHandler() {
		GGlobal.layerMgr.open(UIConst.SHJX);
	}
}