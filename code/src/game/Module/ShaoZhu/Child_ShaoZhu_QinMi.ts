class Child_ShaoZhu_QinMi extends fairygui.GComponent implements ChildShaoZhu {

	public powerLb: fairygui.GLabel;
	public nameImg: fairygui.GLoader;
	public showLb: fairygui.GRichTextField;
	public expbar: fairygui.GProgressBar;
	public levelLb: fairygui.GRichTextField;
	public labAttrCur: fairygui.GRichTextField;
	public imgArrow: fairygui.GImage;
	public labAttrNext: fairygui.GRichTextField;
	public gridArr: ViewGrid[] = [];
	public rewardArr: ViewGrid[] = [];
	public numLbArr: fairygui.GRichTextField[] = [];
	public keyBt: Button1;
	public showGroup: fairygui.GGroup;
	public attGroup: fairygui.GGroup;
	public costGroup: fairygui.GGroup;
	public promptLb: fairygui.GRichTextField;
	public labAttrMax: fairygui.GRichTextField;
	public rewardGroup: fairygui.GGroup;
	public modelIcon: fairygui.GLoader;
	public type: number = 0;
	public static URL: string = "ui://p83wyb2bng03c";

	public static createInstance(): Child_ShaoZhu_QinMi {
		return <Child_ShaoZhu_QinMi><any>(fairygui.UIPackage.createObject("ShaoZhu", "Child_ShaoZhu_QinMi"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.expbar.titleType = fairygui.ProgressTitleType.ValueAndMax;
		for (let i = 0; i < 4; i++) {
			if (i < 2) {
				let grid = <ViewGrid><any>(self.getChild("grid" + i));
				grid.isShowEff = true;
				self.rewardArr.push(grid);
			}
			self.gridArr.push(<ViewGrid><any>(self.getChild("grid0" + i)))
			self.numLbArr.push(<fairygui.GRichTextField><any>(self.getChild("numLb" + i)))
		}
		self.showGroup.visible = false;
		self.keyBt.addClickListener(self.keyHandler, self);
	}

	public vo: Vo_ShaoZhu;
	public setVo(vo: Vo_ShaoZhu) {
		let self = this;
		self.vo = vo;
		self.powerLb.text = vo.qinMiCfg.power + "";
		if (vo.qinMiCfg.show != "0") {
			let rewardArr = ConfigHelp.makeItemListArr(JSON.parse(vo.qinMiCfg.show));
			for (let i = 0; i < self.rewardArr.length; i++) {
				if (i < rewardArr.length) {
					self.rewardArr[i].visible = true;
					self.rewardArr[i].vo = rewardArr[i];
					self.rewardArr[i].tipEnabled = true;
				} else {
					self.rewardArr[i].clean();
					self.rewardArr[i].visible = false;
				}
			}
			self.rewardGroup.visible = true;
		} else {
			self.rewardGroup.visible = false;
		}

		IconUtil.setImg(self.nameImg, "resource/image/son/qm" + Math.floor(vo.qinMiCfg.jie / 100) + ".png");
		self.promptLb.visible = self.costGroup.visible = self.labAttrMax.visible = self.attGroup.visible = false;
		self.levelLb.text = vo.qinMiCfg.jie % 100 + "/" + vo.qinMiCfg.max;
		let bagExp = 0;
		if (vo.starLv <= 0) {
			self.costGroup.visible = false;
			self.promptLb.text = ConfigHelp.reTxt("需激活少主·{0}", [vo.cfg.name]);
			self.promptLb.visible = true;
		} else {
			let arr = JSON.parse(vo.cfg.qm);
			for (let i = 0; i < self.gridArr.length; i++) {
				let itemVo = VoItem.create(arr[i][0]);
				itemVo.count = Model_Bag.getItemCount(itemVo.id);
				self.gridArr[i].isShowEff = true;
				self.gridArr[i].vo = itemVo;
				if (itemVo.count == 1) {
					self.gridArr[i].showText = "1";
				}
				self.gridArr[i].tipEnabled = true;
				self.numLbArr[i].text = "+" + arr[i][1];
				bagExp += itemVo.count * arr[i][1];
			}
			self.costGroup.visible = true;
		}
		if (vo.qinMiCfg.exp == 0) {
			self.expbar.value = 1;
			self.expbar.max = 1;
			self.expbar._titleObject.text = "已满级";
			self.labAttrMax.visible = true;
			self.labAttrMax.text = ConfigHelp.attrString(JSON.parse(vo.qinMiCfg.attr), "+", Color.getColorStr(1), Color.getColorStr(2));
			self.promptLb.text = "亲密度已满";
			self.promptLb.visible = true;
			self.costGroup.visible = false;
		} else {
			self.expbar.value = vo.exp;
			self.expbar.max = vo.qinMiCfg.exp;
			self.attGroup.visible = true;
			self.labAttrCur.text = ConfigHelp.attrString(JSON.parse(vo.qinMiCfg.attr), "+", Color.getColorStr(1), Color.getColorStr(1));
			self.labAttrNext.text = ConfigHelp.attrString(JSON.parse(Config.sonqm_267[vo.qinMiCfg.lv + 1].attr), "+", Color.getColorStr(2), Color.getColorStr(2));
			self.keyBt.checkNotice = bagExp >= vo.qinMiCfg.exp - vo.exp;
		}
		if (self.awatar) {
			EffectMgr.instance.removeEff(self.awatar);
			self.awatar = null;
		}
		if (vo.bodyID > 0 && Config.sonshow_267[vo.bodyID]) {
			if (!self.awatar) {
				self.awatar = EffectMgr.addEff("uieff/" + Config.sonshow_267[vo.bodyID].zs, self.modelIcon.displayObject as fairygui.UIContainer,
					self.modelIcon.width / 2, self.modelIcon.height, 1000, -1, true);
			}
		} else {
			if (!self.awatar) {
				self.awatar = EffectMgr.addEff("uieff/" + vo.cfg.zs, self.modelIcon.displayObject as fairygui.UIContainer,
					self.modelIcon.width / 2, self.modelIcon.height, 1000, -1, true);
			}
		}
	}

	private keyHandler() {
		let self = this;
		let index = 0;
		let arr = JSON.parse(self.vo.cfg.qm);
		for (let i = 0; i < self.gridArr.length; i++) {
			let count = Model_Bag.getItemCount(arr[i][0]);
			if (count > 0) {
				index++;
				break;
			}
		}
		if (index > 0) {
			GGlobal.modelShaoZhu.CG_ADDQINMI_SHAOZHU_5113(self.vo.cfg.id);
		} else {
			ViewCommonWarn.text("道具不足");
		}
	}

	public showText() {
		let self = this;
		if (!self.showGroup.visible) {
			self.showGroup.visible = true;
			let arr = JSON.parse(self.vo.cfg.tips);
			self.showLb.text = arr[Math.floor(Math.random() * arr.length)][0];
			setTimeout(function () {
				self.showGroup.visible = false;
			}, 2000)
		}
	}

	private awatar: Part;
	public open(vo: Vo_ShaoZhu) {
		let self = this;
		self.setVo(vo);
		self.keyBt.addClickListener(self.keyHandler, self);
		GGlobal.control.listen(Enum_MsgType.SHAOZHU_QINMI, self.showText, self);
	}

	public close() {
		let self = this;
		for (let i = 0; i < self.gridArr.length; i++) {
			if (i < self.rewardArr.length) {
				self.rewardArr[i].clean();
			}
			self.gridArr[i].clean();
		}
		self.keyBt.removeClickListener(self.keyHandler, self);
		GGlobal.control.remove(Enum_MsgType.SHAOZHU_QINMI, self.showText, self);
		if (self.awatar) {
			EffectMgr.instance.removeEff(self.awatar);
			self.awatar = null;
		}
	}
}