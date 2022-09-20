/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ChildBingFa extends fairygui.GComponent {

	public useImg: fairygui.GImage;
	public bwIcon: fairygui.GLoader;
	public drugBt: Button2;
	public useBt: Button2;
	public list: fairygui.GList;
	public powerLb: fairygui.GLabel;
	public nameLb: fairygui.GLabel;
	public starLb: fairygui.GTextField;
	public curAtt: fairygui.GRichTextField;
	public nextAtt: fairygui.GRichTextField;
	public attGroup: fairygui.GGroup;
	public upStarBt: Button0;
	public costLb: fairygui.GRichTextField;
	public upStarGroup: fairygui.GGroup;
	public maxGroup: fairygui.GGroup;
	public drugCount: fairygui.GRichTextField;
	public skillDes: fairygui.GRichTextField;
	public showAtt: fairygui.GRichTextField;
	public t0: fairygui.Transition;
	public lbTip: fairygui.GRichTextField;
	public showBt: fairygui.GButton;
	public starPowerLb: fairygui.GTextField;
	public promptLb0: fairygui.GLabel;
	public jueXingBt: Button2;

	public static URL: string = "ui://3tzqotadqqvu23";
	public static createInstance(): ChildBingFa {
		return <ChildBingFa><any>(fairygui.UIPackage.createObject("role", "Child_BaoWu"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		var sf = this;
		CommonManager.parseChildren(sf, sf);
		sf.promptLb0.text = "兵法效果";
		sf.list.callbackThisObj = sf;
		sf.list.itemRenderer = sf.listRender;
		sf.list.setVirtual();
		sf.list.addEventListener(fairygui.ItemEvent.CLICK, sf.itemClickHandle, sf);
		sf.showBt.addClickListener(sf.showHandler, sf);
		sf.jueXingBt.addClickListener(sf.OnJueXing, sf);
	}

	private OnJueXing() {
		GGlobal.layerMgr.open(UIConst.JUEXING, UIConst.BINGFA);
	}

	private showHandler() {
		let vo = this._vo;
		if (vo) {
			GGlobal.modelchat.CG_CHAT_SHOW_DATA(3, vo.id);
		}
	}

	private curItem: BingfaItem;
	private itemClickHandle(event: fairygui.ItemEvent): void {
		var self = this;
		var item: BingfaItem = event.itemObject as BingfaItem;
		this.selectedId = item.vo.id;
		if (self.curItem) self.curItem.setChoose(false);
		self.curItem = item;
		self.curItem.setChoose(true);
		var m = GGlobal.modelBingFa;
		this._vo = item.vo;
		Model_GlobalMsg.selectID = 0;
		this.update();
	}

	private DrugHandler() {
		GGlobal.layerMgr.open(UIConst.BINGFA_DRUG);
	}

	private starHandler() {
		var i = this._vo.item[0][1];
		var count = Model_Bag.getItemCount(i);
		if (count < 1) {
			View_CaiLiao_GetPanel.show(VoItem.create(i));
			return;
		}
		GGlobal.modelBingFa.CG_ACTIVE_903(this._vo.id);
	}

	private selectedId = 0;
	private listRender(index, obj) {
		let self = this;
		var item: BingfaItem = obj as BingfaItem;
		if (Model_GlobalMsg.selectID > 0 && Model_GlobalMsg.selectID == this._data[index].id) {
			if (self.curItem) self.curItem.setChoose(false);
			self.curItem = item;
			self._vo = self._data[index];
			self.selectedId = self._vo.id;
			item.setVo(self._vo, true, self.selectedId);
		} else if (!self.curItem && index == 0) {
			if (self.curItem) self.curItem.setChoose(false);
			self.curItem = item;
			self._vo = self._data[index];
			self.selectedId = self._vo.id;
			item.setVo(self._vo, true, self.selectedId);
		} else {
			item.setVo(self._data[index], true, self.selectedId);
		}
		item.sindex = index;
	}

	//升级 激活返回
	private acitBackHandler(arg) {
		this.update();
	}

	public drugUpdate() {
		var m = GGlobal.modelBingFa;
		this.drugCount.text = m.drugCount + "/" + m.getDrugCount();
	}

	private _data: any[];
	private _vo: VoBingFa;
	public update() {
		var sf = this;
		var m = GGlobal.modelBingFa;
		sf._data = m.data;
		sf.list.numItems = m.data.length;
		if (Model_GlobalMsg.selectID > 0) {
			for (let i = 0; i < m.data.length; i++) {
				if (Model_GlobalMsg.selectID == m.data[i].id) {
					sf.list.scrollToView(i, false);
					break;
				}
			}
		}
		sf.updateView();
	}
	private bwEff: Part;
	public static nickVo: VoBingFa;
	private updateView() {
		let sf = this;
		let m = GGlobal.modelBingFa;
		let data = m.data;
		let vo = ChildBingFa.nickVo = sf._vo;
		sf.nameLb.text = HtmlUtil.fontNoSize(vo.name, Color.getColorStr(vo.pin));
		sf.powerLb.text = vo.power + "";
		let star = vo.star;
		sf.skillDes.text = "";
		sf.skillDes.visible = false;
		sf.lbTip.text = "可提升兵法属性丹吞噬上限：" + HtmlUtil.fontNoSize(vo.max + "", Color.getColorStr(5));
		sf.starLb.text = ConfigHelp.getStarFontStr(star);
		sf.drugCount.text = m.drugCount + "/" + m.getDrugCount();
		let attstr0: string = "";
		let attstr1: string = "";
		sf.attGroup.visible = false;
		sf.showAtt.visible = true;
		sf.maxGroup.visible = false;
		sf.upStarGroup.visible = true;
		let maxLevel = vo.starMax;
		if (star >= 1) {
			if (star < maxLevel) {
				sf.attGroup.visible = true;
				sf.showAtt.visible = false;
				sf.curAtt.text = ConfigHelp.attrString(vo.totalAttr, "+", "#f1f1f1", "#f1f1f1");
				sf.nextAtt.text = ConfigHelp.attrString(vo.totalNextAttr, "+", "#f1f1f1", "#15f234");
				sf.starPowerLb.text = (Config.bookstar_213[Config.bookstar_213[vo.pin * 1000 + vo.star].next].power - Config.bookstar_213[vo.pin * 1000 + vo.star].power) + "";
			} else if (star == maxLevel) {
				sf.showAtt.text = ConfigHelp.attrString(vo.totalAttr, "+", "#f1f1f1", "#15f234");
				sf.upStarBt.checkNotice = false;
				sf.maxGroup.visible = true;
				sf.upStarGroup.visible = false;
			}
		} else {
			sf.showAtt.text = ConfigHelp.attrString(vo.totalAttr, "+", "#f1f1f1", "#15f234");
			sf.starPowerLb.text = Config.bookstar_213[vo.pin * 1000 + 1].power + "";
		}
		IconUtil.setImg(sf.bwIcon, Enum_Path.PIC_URL + vo.pic + ".png");
		if (sf.bwEff) {
			EffectMgr.instance.removeEff(sf.bwEff);
			sf.bwEff = null;
		}
		if (vo.lib.tptx > 0) {
			if (!sf.bwEff) {
				sf.bwEff = EffectMgr.addEff("uieff/" + vo.lib.tptx, sf.bwIcon.displayObject as fairygui.UIContainer, sf.bwIcon.width / 2, sf.bwIcon.height / 2, 1000, -1, true);
			}
		}
		var i = vo.item[0][1];
		var ci = vo.item[0][2];
		var count = Model_Bag.getItemCount(i);
		var str = "消耗：" + ConfigHelp.getItemColorName(i) + "x" + ci;
		if (count >= ci)
			str += "<font color='" + Color.getColorStr(Color.GREEN) + "'>(" + count + "/" + ci + ")</font>"
		else
			str += "<font color='" + Color.getColorStr(Color.RED) + "'>(" + count + "/" + ci + ")</font>"
		sf.costLb.text = str;
		sf.upStarBt.text = vo.star == 0 ? "激活" : "升星";
		sf.showBt.visible = vo.star > 0;
		sf.checkBingFa();
		sf.updateJuexing();
	}

	private updateJuexing() {
		let self = this;
		self.jueXingBt.visible = Model_JueXing.checkOpenJuexing(UIConst.BINGFA);
		self.jueXingBt.checkNotice = GGlobal.reddot.checkCondition(UIConst.JUEXING, 5);
	}

	private setDefalt() {
		var m = GGlobal.modelBingFa;
		this._vo = m.data[0];
	}

	private checkBingFa() {
		if (!this._vo) return;
		var f = GGlobal.reddot;
		this.drugBt.checkNotice = f.checkCondition(UIConst.BINGFA, 1)
		if (this._vo.star < this._vo.starMax) {
			var i = this._vo.item[0][1];
			var count = Model_Bag.getItemCount(i);
			this.upStarBt.checkNotice = count > 0;
		} else {
			this.upStarBt.checkNotice = false;
		}
	}

	private openUI() {
		this.setDefalt();
		this.update();
	}

	public open() {
		var sf = this;
		var m = GGlobal.modelBingFa;
		m.CG_INFO_901();
		m.listen(Model_BingFa.DRUG_UP, sf.drugUpdate, sf);
		m.listen(Model_BingFa.OPENUI, sf.openUI, sf);
		m.listen(Model_BingFa.LVLUP, sf.acitBackHandler, sf);

		GGlobal.reddot.listen(ReddotEvent.CHECK_BINGFA, sf.checkBingFa, sf);
		GGlobal.reddot.listen(UIConst.JUEXING, sf.updateJuexing, sf);
		sf.upStarBt.addClickListener(sf.starHandler, sf);
		sf.drugBt.addClickListener(sf.DrugHandler, sf);

		sf.checkBingFa();
	}

	public hide() {
		var sf = this;
		var m = GGlobal.modelBingFa;
		GGlobal.reddot.remove(ReddotEvent.CHECK_BINGFA, sf.checkBingFa, sf);
		GGlobal.reddot.remove(UIConst.JUEXING, sf.updateJuexing, sf);
		m.remove(Model_BingFa.OPENUI, sf.openUI, sf);
		m.remove(Model_BingFa.DRUG_UP, sf.drugUpdate, sf);
		m.remove(Model_BingFa.LVLUP, sf.acitBackHandler, sf);
		sf.upStarBt.removeClickListener(sf.starHandler, sf);
		sf.drugBt.removeClickListener(sf.DrugHandler, sf);
		if (sf.curItem) sf.curItem.setChoose(false);
		sf.curItem = null;
		IconUtil.setImg(this.bwIcon, null);
		sf.list.numItems = 0;
		Model_GlobalMsg.selectID = 0;
		if (sf.bwEff) {
			EffectMgr.instance.removeEff(sf.bwEff);
			sf.bwEff = null;
		}
	}
}