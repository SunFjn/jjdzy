class View_XingTu_Panel extends fairygui.GComponent implements IPanel {

	//>>>>start
	public powerLb: fairygui.GLabel;
	public xingTuBack: fairygui.GImage;
	public iconImg: fairygui.GLoader;
	public iconImg0: fairygui.GImage;
	public iconImg1: fairygui.GImage;
	public iconImg2: fairygui.GImage;
	public iconImg3: fairygui.GImage;
	public iconImg4: fairygui.GImage;
	public iconImg5: fairygui.GImage;
	public iconImg6: fairygui.GImage;
	public lb0: fairygui.GImage;
	public lb1: fairygui.GImage;
	public lb6: fairygui.GImage;
	public lb5: fairygui.GImage;
	public lb2: fairygui.GImage;
	public lb4: fairygui.GImage;
	public lb3: fairygui.GImage;
	public iconLbImg: fairygui.GLoader;
	public curAtt: fairygui.GRichTextField;
	public nextAtt: fairygui.GRichTextField;
	public maxGroup: fairygui.GGroup;
	public upBt: Button0;
	public labCount: ViewResource;
	public btGroup: fairygui.GGroup;
	public upGroup: fairygui.GGroup;
	public list: fairygui.GList;
	public jihuoLb: fairygui.GRichTextField;
	public levelLb: fairygui.GRichTextField;
	//>>>>end

	public iconImgArr: Array<fairygui.GImage> = [];

	public static URL: string = "ui://c7onhgk8t2re7";

	public static createInstance(): View_XingTu_Panel {
		return <View_XingTu_Panel><any>(fairygui.UIPackage.createObject("Skill", "View_XingTu_Panel"));
	}

	public constructor() {
		super();
	}

	protected _viewParent: fairygui.GObject;
	initView(pParent: fairygui.GObject) {
		this._viewParent = pParent;
		this.addRelation(this._viewParent, fairygui.RelationType.Size);
	}

	openPanel(pData?: any) {
		this.open();
	}

	closePanel(pData?: any) {
		this.close();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		for (let i = 0; i < 7; i++) {
			var iconImg0 = self["iconImg" + i];
			self.iconImgArr.push(iconImg0);
		}
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.renderHandle;
		self.list.addEventListener(fairygui.ItemEvent.CLICK, self.listHandle, self);
		Model_XingTu.getXingTuArr();
		GGlobal.modelxt.CG_OPEN_XINGTU();
	}

	private listHandle(event: fairygui.ItemEvent): void {
		let a = this;
		let tab: XingTuTab = event.itemObject as XingTuTab;
		if (a.curItem && a.curItem.vo.type == tab.vo.type) return;
		if (a.curItem) a.curItem.selected = false;
		tab.selected = true;
		a.curItem = tab;
		a.updateXingTuShow();
	}

	private OnGet() {
		View_CaiLiao_GetPanel.show(VoItem.create(9));
	}

	private upHandle(): void {
		let a = this;
		if (a.upBt.checkNotice) {
			GGlobal.modelxt.CG_XINGTU_UPGRADE(a.curItem.vo.type);
		} else {
			let xingtuID: number = Model_XingTu.xingtuIDArr[a.curItem.vo.type - 1];
			let cfg = Config.xingtu_706[xingtuID];
			if (cfg.next > 0) {
				a.OnGet();
			} else {
				ViewCommonWarn.text("已满级");
			}
		}
	}

	public renderHandle(index: number, obj: fairygui.GObject): void {
		let a = this;
		let tab: XingTuTab = obj as XingTuTab;
		tab.setVo(Model_XingTu.xingtuArr[index]);
		tab.checkNotice = Model_XingTu.checkTabNotice(tab.vo.type);
		if (!a.curItem && index == 0) {
			tab.selected = true;
			a.curItem = tab;
		}
	}

	private curItem: XingTuTab;
	public updateShow(): void {
		let a = this;
		a.list.numItems = Model_XingTu.xingtuArr.length;
		a.updateXingTuShow();
	}

	public updateXingTuShow(): void {
		let a = this;
		if (!a.curItem) return;
		let xingtuID: number = Model_XingTu.xingtuIDArr[a.curItem.vo.type - 1];
		let jie: number = Math.floor(xingtuID % 100000 / 100);
		let level: number = xingtuID % 100;
		let cfg = Config.xingtu_706[xingtuID];
		a.levelLb.text = jie + "阶";
		a.powerLb.text = cfg.fight + "";
		let str: string = a.curItem.vo.lv;
		let arr = str.split(",");
		for (let i = 0; i < a.iconImgArr.length; i++) {
			if (i < level) {
				a.iconImgArr[i].grayed = false;
			} else {
				a.iconImgArr[i].grayed = true;
			}
		}
		if (jie <= 0) {
			a.iconImg.grayed = true;
		} else {
			a.iconImg.grayed = false;
		}
		IconUtil.setImg(a.iconImg, Enum_Path.IMAGE_URL + "xingtu/icon_" + a.curItem.vo.type + ".png");
		IconUtil.setImg(a.iconLbImg, Enum_Path.IMAGE_URL + "xingtu/icon_title_" + a.curItem.vo.type + ".png");
		if (Model_player.voMine.zsID >= a.curItem.vo.condition) {
			a.jihuoLb.visible = false;
			a.upGroup.visible = true;
			a.maxGroup.visible = false;
			a.btGroup.visible = true;
			let nextcfg = Config.xingtu_706[cfg.next];
			let attstr: string = "";
			let attstr1: string = "";
			if (cfg.attr != "0") {
				let attArr: Array<any> = JSON.parse(cfg.attr);
				if (nextcfg) {
					let attArr1: Array<any> = JSON.parse(nextcfg.attr);
					for (let i = 0; i < attArr.length; i++) {
						if (i == 0) {
							attstr += Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
							attstr1 += Vo_attr.getShowStr(attArr[i][0], attArr1[i][1]);
						} else {
							attstr += "\n" + Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
							attstr1 += "\n" + Vo_attr.getShowStr(attArr[i][0], attArr1[i][1]);
						}
					}
					this.showAtt(cfg);

				} else {
					for (let i = 0; i < attArr.length; i++) {
						if (i == 0) {
							attstr += Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
							attstr1 += "已满阶";
						} else {
							attstr += "\n" + Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
							attstr1 += "\n" + "已满阶";
						}
					}
					a.maxGroup.visible = true;
					a.btGroup.visible = false;
				}
			} else {
				let attArr1: Array<any> = JSON.parse(nextcfg.attr);
				for (let i = 0; i < attArr1.length; i++) {
					if (i == 0) {
						attstr += Vo_attr.getShowStr(attArr1[i][0], 0);
						attstr1 += Vo_attr.getShowStr(attArr1[i][0], attArr1[i][1]);
					} else {
						attstr += "\n" + Vo_attr.getShowStr(attArr1[i][0], 0);
						attstr1 += "\n" + Vo_attr.getShowStr(attArr1[i][0], attArr1[i][1]);
					}
				}
				this.showAtt(cfg);
			}
			a.curAtt.text = attstr;
			a.nextAtt.text = attstr1;

		} else {
			a.powerLb.text = "0";
			a.upGroup.visible = false;
			a.jihuoLb.text = Config.zhuansheng_705[a.curItem.vo.condition].lv + "激活";
			a.jihuoLb.visible = true;
		}
	}

	public showAtt(cfg) {
		let a = this;
		let costArr = JSON.parse(cfg.need);
		a.labCount.setImgUrl(costArr[0][0])
		if (Model_player.voMine.xinghun >= costArr[0][2]) {
			a.upBt.checkNotice = true;
			a.labCount.setCount(HtmlUtil.fontNoSize(ConfigHelp.numToStr(Model_player.voMine.xinghun) + "/" + ConfigHelp.numToStr(costArr[0][2]), Color.getColorStr(1)));
		} else {
			a.upBt.checkNotice = false;
			a.labCount.setCount(HtmlUtil.fontNoSize(ConfigHelp.numToStr(Model_player.voMine.xinghun) + "/" + ConfigHelp.numToStr(costArr[0][2]), Color.getColorStr(6)));
		}
	}

	protected open(): void {
		let a = this;
		a.updateShow();
		a.upBt.addClickListener(a.upHandle, a);
		GGlobal.reddot.listen(ReddotEvent.CHECK_XINGTU, a.updateShow, a);
	}

	protected close(): void {
		let a = this;
		if (a.curItem) {
			a.curItem.selected = false;
			a.curItem = null;
		}
		IconUtil.setImg(a.iconImg, null);
		IconUtil.setImg(a.iconLbImg, null);
		a.upBt.removeClickListener(a.upHandle, a);
		GGlobal.reddot.remove(ReddotEvent.CHECK_XINGTU, a.updateShow, a);
		a.list.numItems = 0;
	}
}