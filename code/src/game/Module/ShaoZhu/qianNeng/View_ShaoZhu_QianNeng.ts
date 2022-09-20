class View_ShaoZhu_QianNeng extends UIModalPanel {

	public frame: fairygui.GLabel;
	public list: fairygui.GList;
	public powerLb: fairygui.GLabel;
	public imgBg: fairygui.GLoader;
	public lbLv: fairygui.GRichTextField;
	public lbLv1: fairygui.GRichTextField;
	public lbName: fairygui.GRichTextField;
	public lbAttr: fairygui.GRichTextField;
	public imgMax: fairygui.GImage;
	public btnUp: Button1;
	public vRes: ViewResource;
	public lbRes: fairygui.GRichTextField;
	public btnGrid0: BtnQianNeng;
	public btnGrid1: BtnQianNeng;

	public static URL: string = "ui://p83wyb2bo89h2d";

	public static createInstance(): View_ShaoZhu_QianNeng {
		return <View_ShaoZhu_QianNeng><any>(fairygui.UIPackage.createObject("ShaoZhu", "View_ShaoZhu_QianNeng"));
	}

	curItem: ShaoZhuGrid
	imgGArr: fairygui.GImage[]
	imgLArr: fairygui.GImage[]
	lineArr: fairygui.GLoader[]
	lbArr: fairygui.GRichTextField[]
	lbBgArr: fairygui.GLoader[]
	itRes: VoItem

	_sz: Vo_ShaoZhu
	_qn: Vo_QianNeng

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("ShaoZhu", "View_ShaoZhu_QianNeng").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		super.childrenCreated();
		self.list.itemRenderer = self.renderHandler;
		self.list.callbackThisObj = self;
		self.imgGArr = []
		self.imgLArr = []
		self.lineArr = []
		self.lbArr = []
		self.lbBgArr = []
		for (let i = 0; i < 8; i++) {
			self.imgGArr.push(self["imgG" + i]);
			self.imgLArr.push(self["imgL" + i]);
			if (i < 7) {
				self.lineArr.push(self["img" + i]);
			}
			self.lbArr.push(self["lb" + i]);
			self.lbBgArr.push(self["lbBg" + i]);
		}
	}

	private _lisDat: Vo_ShaoZhu[]
	protected onShown(): void {
		let self = this;
		let m = GGlobal.model_QianNeng
		self._lisDat = [];
		let arr = GGlobal.modelShaoZhu.shaoZhuArr
		for (let i = 0; i < arr.length; i++) {
			if (arr[i].starcfg.next <= 0) {//已满星
				self._lisDat.push(arr[i])
			}
		}
		let selIndex = 0
		if (self._args) {
			for (let i = 0; i < self._lisDat.length; i++) {
				if (self._lisDat[i].shaozhuID == self._args) {
					selIndex = i;
					break;
				}
			}
		}
		self._sz = self._lisDat[selIndex];
		self.list.numItems = self._lisDat.length;

		m.CG_OPENUI_5133();
		self.upView();
		self.registerEvent(true);
		IconUtil.setImg(self.imgBg, Enum_Path.SHAOZHU_URL + "qnBg.jpg");
	}

	protected onHide(): void {
		let self = this;
		self.registerEvent(false);
		if (self.curItem) {
			self.curItem.choose(false);
			self.curItem = null;
		}
		self.list.numItems = 0;
		IconUtil.setImg(self.imgBg, null);
	}

	private registerEvent(pFlag: boolean): void {
		let m = GGlobal.model_QianNeng
		let r = GGlobal.reddot;
		let self = this;
		m.register(pFlag, Model_QianNeng.OPENUI, self.upView, self);
		EventUtil.register(pFlag, self.list, fairygui.ItemEvent.CLICK, self.onListClick, self);
		EventUtil.register(pFlag, self.btnUp, egret.TouchEvent.TOUCH_TAP, self.onUp, self);
		EventUtil.register(pFlag, self.btnGrid0, egret.TouchEvent.TOUCH_TAP, self.onGrid0, self);
		EventUtil.register(pFlag, self.btnGrid1, egret.TouchEvent.TOUCH_TAP, self.onGrid1, self);
		GGlobal.reddot.register(pFlag, UIConst.SHAOZHU_QIANNENG, self.upRed, self);
	}

	private upRed() {
		let self = this;
		self.list.numItems = self._lisDat.length;
	}

	private renderHandler(index: number, obj: ShaoZhuGrid) {
		let self = this;
		let sz = this._lisDat[index]
		obj.setVo(sz);
		if (!self.curItem && self._sz.shaozhuID == sz.shaozhuID) {
			self.curItem = obj;
			self.curItem.choose(true);
		}
		obj.noticeImg.visible = GGlobal.reddot.checkCondition(UIConst.SHAOZHU_QIANNENG, sz.shaozhuID);
	}

	private onListClick(evt: fairygui.ItemEvent) {
		let self = this;
		let item = evt.itemObject as ShaoZhuGrid;
		if (self.curItem && self.curItem.hashCode == item.hashCode) return;
		if (self.curItem) self.curItem.choose(false);
		item.choose(true);
		self.curItem = item;
		self._sz = item.vo
		self.upView();
	}

	private upView() {
		let s = this;
		let m = GGlobal.model_QianNeng;
		let model = GGlobal.modelShaoZhu;
		let qn: Vo_QianNeng = m.qianNObj[s._sz.shaozhuID]
		if (!qn) {
			return;
			// qn = Vo_QianNeng.createVo(s._sz.shaozhuID)
		}
		s._qn = qn
		//战力
		s.powerLb.text = qn.cfg.power + "";
		//重
		let chong = Math.floor(qn.qianNId % 100000 / 10)
		//等级
		let level = Math.floor(qn.qianNId % 10)
		//重数
		s.lbLv.text = "d" + chong + "c";
		s.lbLv1.text = "d" + chong + "c";

		//丹药
		let ct0 = 0;
		let ct1 = 0;
		for (let i = 0; i < qn.danArr.length; i++) {
			let dan = qn.danArr[i]
			if (dan.ty == Model_QianNeng.TYPE_DAN0) {
				ct0 = dan.ct
			}
			else if (dan.ty == Model_QianNeng.TYPE_DAN1) {
				ct1 = dan.ct
			}
		}
		s.btnGrid0.text = ct0 + "/" + qn.cfg.max1;
		s.btnGrid1.text = ct1 + "/" + qn.cfg.max2;

		let hasCt0 = Model_Bag.getItemCount(Model_QianNeng.EAT_DAN0)
		let hasCt1 = Model_Bag.getItemCount(Model_QianNeng.EAT_DAN1)
		s.btnGrid0.checkNotice = (hasCt0 > 0 && ct0 < qn.cfg.max1)
		s.btnGrid1.checkNotice = (hasCt1 > 0 && ct1 < qn.cfg.max2)

		let nextCfg = Config.sonqn_267[qn.cfg.next]
		let nextAttr = nextCfg ? JSON.parse(nextCfg.attr) : null;
		s.lbAttr.text = ConfigHelp.attrString(JSON.parse(qn.cfg.attr), "+", null, null, nextAttr, Color.GREENSTR);

		if (nextCfg == null) {//最大等级
			s.imgMax.visible = true;
			s.btnUp.visible = false;
			s.vRes.visible = false;
			s.lbRes.text = "";
		} else {
			s.imgMax.visible = false;
			s.btnUp.visible = true;
			s.vRes.visible = true;

			s.itRes = ConfigHelp.makeItemListArr(JSON.parse(qn.cfg.consume))[0] as VoItem;
			let hasCt = Model_Bag.getItemCount(s.itRes.id)
			s.lbRes.text = HtmlUtil.fontNoSize(s.itRes.name, Color.getColorStr(s.itRes.quality))
			s.vRes.setItemId(s.itRes.id)
			s.vRes.setLb(hasCt, s.itRes.count);
			s.btnUp.checkNotice = (qn.act && hasCt >= s.itRes.count)
			if (level == 8) {
				s.btnUp.text = "突破"
			} else {
				s.btnUp.text = "冲穴"
			}
		}
		//下一重属性
		let nextChongId = s._sz.shaozhuID * 100000 + (chong + 1) * 10
		let nextChongCfg = Config.sonqn_267[nextChongId]
		let nextStr = nextChongCfg ? "(+" + (nextChongCfg.jc / 1000) + "%)" : ""
		s.lbName.text = s._sz.cfg.name + "升星基础属性+" + (qn.cfg.jc / 1000) + "%" + HtmlUtil.fontNoSize(nextStr, Color.GREENSTR)

		//展示
		for (let i = 0; i < 8; i++) {
			if (level > i) {
				s.lbArr[i].color = 0xffffff;
				s.imgGArr[i].visible = false;
				s.imgLArr[i].visible = true;
				s.lbBgArr[i].url = "ui://p83wyb2bo89h3v"
			} else {
				s.lbArr[i].color = 0x9AB1DE;
				s.imgGArr[i].visible = true;
				s.imgLArr[i].visible = false;
				s.lbBgArr[i].url = "ui://p83wyb2bo89h3u"
			}
			if (i == 7) continue;
			if (level > i + 1) {
				s.lineArr[i].url = "ui://p83wyb2bo89h3t"//亮条
			} else {
				s.lineArr[i].url = "ui://p83wyb2bo89h3w"//灰条
			}
		}
	}

	private onUp() {
		let s = this;
		if (!s._sz) {
			return;
		}
		if (!s._qn.act) {
			ViewCommonWarn.text("少主未激活");
			return;
		}
		if (!s.btnUp.checkNotice) {
			View_CaiLiao_GetPanel.show(s.itRes)
			return;
		}
		GGlobal.model_QianNeng.CG_UP_LEVEL_5135(s._sz.shaozhuID);
	}

	private onGrid0() {
		let s = this;
		if (!s._qn) {
			return;
		}
		if (!s._qn.act) {
			ViewCommonWarn.text("少主未激活");
			return;
		}
		let it: VoItem = VoItem.create(Model_QianNeng.EAT_DAN0);
		GGlobal.layerMgr.open(UIConst.SHAOZHU_QIANNENG_DAN, [this._sz, it]);
	}

	private onGrid1() {
		let s = this;
		if (!s._qn) {
			return;
		}
		if (!s._qn.act) {
			ViewCommonWarn.text("少主未激活");
			return;
		}
		let it: VoItem = VoItem.create(Model_QianNeng.EAT_DAN1);
		GGlobal.layerMgr.open(UIConst.SHAOZHU_QIANNENG_DAN, [this._sz, it]);
	}
}