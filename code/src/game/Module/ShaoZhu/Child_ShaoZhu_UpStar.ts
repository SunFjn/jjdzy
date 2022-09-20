class Child_ShaoZhu_UpStar extends fairygui.GComponent implements ChildShaoZhu {

	public powerLb: fairygui.GLabel;
	public starPowerLb: fairygui.GLabel;
	public szBt: Button2;
	public labStar: fairygui.GTextField;
	public labAttrCur: fairygui.GRichTextField;
	public labAttrNext: fairygui.GRichTextField;
	public labAttrMax: fairygui.GRichTextField;
	public imgArrow: fairygui.GImage;
	public costLb: fairygui.GRichTextField;
	public upBt: Button1;
	public smLb: fairygui.GRichTextField;
	public boxMax: fairygui.GGroup;
	public costGroup: fairygui.GGroup;
	public battleBt: Button2;
	public showBt: Button2;
	public qianNengBt: Button2;
	private awatar: Part;
	public type: number = 0;
	public nameLb: fairygui.GLabel;


	/**奖励的数据 */
	private rewardData: any[];

	private starData: any[];

	/**领取的奖励 id */
	private rewardId: number;

	public static URL: string = "ui://p83wyb2bh7p86";

	//升星奖励部分
	public rewardList: fairygui.GList;
	public rewardDesc: fairygui.GTextField;
	public getRewardBtn: Button1;
	public rewardGroup: fairygui.GGroup;
	public yilingqu: fairygui.GImage;
	public modelIcon: fairygui.GLoader;

	public static createInstance(): Child_ShaoZhu_UpStar {
		return <Child_ShaoZhu_UpStar><any>(fairygui.UIPackage.createObject("ShaoZhu", "Child_ShaoZhu_UpStar"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.smLb.text = HtmlUtil.createLink("玩法说明", true, "sm");
		self.smLb.addEventListener(egret.TextEvent.LINK, self.openHandler, self);
		self.szBt.addClickListener(self.openSZHandler, self);
		self.upBt.addClickListener(self.upShaoZhuHandler, self);
		self.battleBt.addClickListener(self.battleHandler, self);
		self.showBt.addClickListener(self.showHandler, self);
		self.qianNengBt.addClickListener(self.onQianNeng, self);
		self.rewardList.setVirtual();
		self.rewardList.callbackThisObj = self;
		self.rewardList.itemRenderer = self.itemRenderer;
		self.getRewardBtn.text = "领取";
	}

	private itemRenderer(index: number, item: ViewGrid) {
		let data = this.rewardData[index];
		item.tipEnabled = true;
		item.isShowEff = true;
		item.vo = data;
	}

	private showHandler() {
		GGlobal.modelchat.CG_CHAT_SHOW_DATA(11, this.vo.shaozhuID);
	}


	private onQianNeng() {
		GGlobal.layerMgr.open(UIConst.SHAOZHU_QIANNENG, this.vo.shaozhuID);
	}

	private battleHandler() {
		let self = this;
		if (self.vo.shaozhuID == Model_player.voMine.shaozhuID) {
			GGlobal.modelShaoZhu.CG_BATTLE_SHAOZHU_5109(0);
		} else {
			GGlobal.modelShaoZhu.CG_BATTLE_SHAOZHU_5109(self.vo.shaozhuID);
		}
	}

	private upShaoZhuHandler() {
		let self = this;
		if (self.upBt.checkNotice) {
			if (self.vo.starLv == 0) {
				GGlobal.modelShaoZhu.CG_JIHUO_SHAOZHU_5103(self.vo.shaozhuID);
			} else {
				GGlobal.modelShaoZhu.CG_UPSTAR_SHAOZHU_5105(self.vo.shaozhuID);
			}
		} else {
			let costArr = JSON.parse(self.vo.starcfg.conmuse);
			View_CaiLiao_GetPanel.show(VoItem.create(costArr[0][1]))
		}
	}

	private openHandler(event: egret.TextEvent) {
		event.stopPropagation();
		GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.SHAOZHU)
	}

	/**打开少主时装 */
	private openSZHandler() {
		GGlobal.layerMgr.open(UIConst.SHAOZHU_FASHION, this.vo);
	}

	public vo: Vo_ShaoZhu;
	public setVo(vo: Vo_ShaoZhu) {
		let self = this;
		self.vo = vo;
		let attArr0 = [];
		let attArr1 = [], nextcfg = Config.sonstar_267[vo.starcfg.next];
		self.imgArrow.visible = false;
		self.labAttrMax.visible = false;
		self.labAttrCur.visible = false;
		self.labAttrNext.visible = false;
		self.nameLb.text = vo.cfg.name;
		if (vo.starcfg.attr == "0") {
			self.powerLb.text = "0";
			attArr1 = JSON.parse(nextcfg.attr);
			self.labAttrMax.text = ConfigHelp.attrString(attArr1, "+", "#f1f1f1", "#15f234");
			self.labAttrMax.visible = true;
			self.starPowerLb.text = nextcfg.power + "";
			self.upBt.text = "激活";
		} else {
			attArr0 = JSON.parse(vo.starcfg.attr);
			self.upBt.text = "升星";
			if (nextcfg) {
				attArr1 = JSON.parse(nextcfg.attr);
				self.labAttrCur.text = ConfigHelp.attrString(attArr0, "+", "#f1f1f1", "#f1f1f1");
				self.labAttrNext.text = ConfigHelp.attrString(attArr1, "+", "#15f234", "#15f234");
				self.imgArrow.visible = self.labAttrNext.visible = self.labAttrCur.visible = true;
				self.starPowerLb.text = (nextcfg.power - vo.starcfg.power) + "";
			} else {
				self.labAttrMax.text = ConfigHelp.attrString(attArr0, "+", "#f1f1f1", "#15f234");
				self.labAttrMax.visible = true;
			}
			self.powerLb.text = vo.starcfg.power + "";
		}

		self.labStar.text = ConfigHelp.getStarFontStr(vo.starLv);
		self.costGroup.visible = false;
		self.boxMax.visible = false;
		if (vo.starcfg.next <= 0) {
			self.boxMax.visible = true;
			self.qianNengBt.visible = true;
			self.qianNengBt.checkNotice = GGlobal.reddot.checkCondition(UIConst.SHAOZHU_QIANNENG, 0)
		} else {
			self.qianNengBt.visible = false;
			let costArr = JSON.parse(vo.starcfg.conmuse);
			self.costGroup.visible = true;
			let itemVo = VoItem.create(costArr[0][1]);
			let count = Model_Bag.getItemCount(costArr[0][1])
			let color = count >= costArr[0][2] ? 2 : 6;
			self.costLb.text = "消耗：" + HtmlUtil.fontNoSize(itemVo.name, Color.getColorStr(itemVo.quality)) + "x" + costArr[0][2] +
				HtmlUtil.fontNoSize("(" + count + "/" + costArr[0][2] + ")", Color.getColorStr(color));
			self.upBt.checkNotice = count >= costArr[0][2];
		}
		self.szBt.checkNotice = GGlobal.modelShaoZhu.checkFashionNotice(vo);
		self.battleBt.icon = vo.shaozhuID != Model_player.voMine.shaozhuID ? "ui://p83wyb2bh7p85" : "ui://p83wyb2bewn5w";
		self.battleBt.visible = vo.starLv > 0;
		self.battleBt.checkNotice = Model_player.voMine.shaozhuID <= 0 && vo.starLv > 0;
		self.showBt.visible = vo.starLv > 0;
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
		self.setRewardState();
		self.changeStarData();
		self.setChildIndex(self.showBt, 9999);
	}

	public open(vo: Vo_ShaoZhu) {
		let self = this;
		self.setVo(vo);
		self.setRewardState();
		self.getRewardBtn.addClickListener(self.onClickRewardBtn, self);
		GGlobal.control.listen(Enum_MsgType.SHAOZHUSTAR, self.setRewardState, self);
		GGlobal.control.listen(Enum_MsgType.SHAOZHUSTARUPDATE, self.updateState, self);
	}

	public close() {
		let self = this;
		if (self.awatar) {
			EffectMgr.instance.removeEff(self.awatar);
			self.awatar = null;
		}
		self.getRewardBtn.removeClickListener(self.onClickRewardBtn, self);
		GGlobal.control.remove(Enum_MsgType.SHAOZHUSTAR, self.setRewardState, self);
		GGlobal.control.remove(Enum_MsgType.SHAOZHUSTARUPDATE, self.updateState, self);
		self.rewardList.numItems = 0;
	}

	//===========升星奖励部分
	private onClickRewardBtn() {
		GGlobal.modelShaoZhu.CG_GET_STAR_REWARD(this.rewardId);
	}
	/**根据当前星级改变升星领取奖励的状态数据 */
	private changeStarData() {
		let self = this;
		let rewardVO = Model_ShaoZhu.upStarRewardVo;
		if (Config.sonstar_267[self.vo.starcfg.id].reward != "0") {
			if (rewardVO) {
				for (let i = 0; i < rewardVO.vo.length; i++) {
					if (rewardVO.vo[i].id == self.vo.starcfg.id && rewardVO.vo[i].state == 0) {//升级到可以领取的等级
						rewardVO.vo[i].state = 1;
						self.setRewardState();
						break;
					}
				}
			}
		}
	}

	private setRewardState() {
		let self = this;
		let vo = Model_ShaoZhu.upStarRewardVo;
		if (!vo) return;
		let tempVO: any[] = [];
		for (let key = 0; key < vo.vo.length; key++) {
			let type = (vo.vo[key].id / 1000) >> 0;
			if (type == ((self.vo.starcfg.id / 1000) >> 0)) {//找到对应的奖励
				tempVO.push(vo.vo[key]);
			}
		}
		let curData: any;
		self.setBtnState(false);
		for (let key = 0; key < tempVO.length; key++) {//找到需要显示的奖励
			if (tempVO[key].state == 1) {//能够领取奖励
				curData = tempVO[key];
				self.setBtnState(true);
				curData = Config.sonstar_267[curData.id];
				self.rewardId = curData.id
				self.setRewardUI(curData, tempVO[key].state);
				return;
			}
		}
		if (!curData) {//如果没有就显示当前的奖励
			if (self.vo.starcfg.id >= tempVO[tempVO.length - 1].id) {
				curData = Config.sonstar_267[tempVO[tempVO.length - 1].id];
			} else {
				curData = Config.sonstar_267[self.vo.starcfg.id];
			}
			self.setRewardUI(curData, tempVO[tempVO.length - 1].state);
		}
	}

	private setRewardUI(data, state = 0) {
		let self = this;
		let isMaxLevel = data.next == 0;
		self.yilingqu.visible = isMaxLevel && state == 2
		self.getRewardBtn.visible = state != 2 || (!isMaxLevel && state == 2);
		let reward;
		if (data.star == 0) {
			reward = data.reward;
		} else if (state == 1) {
			reward = Config.sonstar_267[data.id].reward;
		} else {
			reward = Config.sonstar_267[data.star].reward;
		}
		if (reward != '0') {
			self.rewardGroup.visible = true;
			let temp = JSON.parse(reward);
			self.rewardData = ConfigHelp.makeItemListArr(temp);
			self.rewardList.numItems = self.rewardData.length;
		}
		if (state == 1) {
			self.rewardDesc.text = (data.id % 1000 == 0 ? 15 : data.id % 1000) + "星奖励";
		} else {
			self.rewardDesc.text = (data.star % 1000 == 0 ? 15 : data.star % 1000) + "星奖励";
		}
	}

	private setBtnState(state: boolean) {
		this.getRewardBtn.grayed = !state;
		this.getRewardBtn.touchable = state;
		this.getRewardBtn.noticeImg.visible = state;
		GGlobal.reddot.setCondition(UIConst.SHAOZHU, 123 + this.vo.shaozhuID, state);
	}

	private updateState(arg) {
		let self = this;
		let rewardVO = Model_ShaoZhu.upStarRewardVo;
		for (let key = 0; key < rewardVO.vo.length; key++) {
			let id = rewardVO.vo[key].id
			if (id == arg.index) {
				rewardVO.vo[key].state = arg.state;
				self.setRewardState();
				GGlobal.reddot.notify(UIConst.SHAOZHU);
				break;
			}
		}
	}
}