/**
 * 轮回系统
 */
class Child_LunHui extends fairygui.GComponent implements IPanel{

	private _itemVo: VoItem;
	private _costArr;

	public powerLb: fairygui.GLabel;
	public lunhuiBtn: Button1;
	public linkLb: fairygui.GRichTextField;
	public list: fairygui.GList;
	public numIcon: fairygui.GLoader;
	public nextAtt: fairygui.GRichTextField;
	public curAtt: fairygui.GRichTextField;
	public upGroup: fairygui.GGroup;
	public maxAtt: fairygui.GRichTextField;
	public jihuoLb: fairygui.GTextField;
	public maxTips: fairygui.GGroup;
	public costLb: fairygui.GRichTextField;

	public static URL: string = "ui://ehelf5bhh2o6k";

	public constructor() {
		super();
	}

	public static createInstance(): Child_LunHui {
		return <Child_LunHui><any>(fairygui.UIPackage.createObject("lunhui", "Child_LunHui"));
	}

	protected _viewParent: fairygui.GObject;
	initView(pParent: fairygui.GObject) {
		this._viewParent = pParent;
		this.addRelation(this._viewParent, fairygui.RelationType.Size);
	}

	openPanel(pData?: any) {
		this.onShown();
	}

	closePanel(pData?: any) {
		this.onHide();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let a = this;
		CommonManager.parseChildren(a, a);
		a.linkLb.text = HtmlUtil.createLink("玩法说明");
		a.linkLb.addEventListener(egret.TextEvent.LINK, a.openGaiLV, a);

		a.list.callbackThisObj = a;
		a.list.itemRenderer = a.renderHandler;
	}

	private openGaiLV(evt: egret.TextEvent) {
		GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.LUNHUI)
	}

	private renderHandler(index: number, obj: LunHuiGrid) {
		obj.setVo(this.rewardArr[index]);
	}

	/**
	 * 轮回按钮点击事件
	 */
	private lunhuiHandle(): void {
		let a = this;
		var count = Model_Bag.getItemCount(a._itemVo.id);
		if (count < a._costArr[0][2]) {
			View_CaiLiao_GetPanel.show(VoItem.create(a._itemVo.id));
			return;
		}
		if (a.lunhuiBtn.checkNotice) {
			GGlobal.modellh.CG_LUNHUI();
		} else {
			let cfg = Config.lunhui_274[Model_player.voMine.reincarnationLevel];
			if (cfg.next <= 0) {
				ViewCommonWarn.text("已满级");
			} else {
				ViewCommonWarn.text("等级不足");
			}
		}
	}

	private rewardArr: IGridImpl[];
	/**
	 * 更新轮回信息
	 */
	public updateShow(): void {
		let a = this;
		a.lunhuiBtn.visible = false;
		a.upGroup.visible = false;
		a.maxAtt.visible = false;
		a.maxTips.visible = false;
		a.jihuoLb.visible = false;

		let cfg = Config.lunhui_274[Model_player.voMine.reincarnationLevel];
		a.powerLb.text = cfg.power + "";
		let nextcfg = Config.lunhui_274[cfg.next];
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
				a.checkBtnRedDot();
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
			a.checkBtnRedDot();
		}
		if (cfg.lv > 0) {
			a.lunhuiBtn.visible = true;
			a.upGroup.visible = true;
			a.curAtt.text = attstr;
			a.nextAtt.text = attstr1;
			a.jihuoLb.visible = true;
			a.jihuoLb.text = cfg.lv + "级可轮回";
			if (Model_player.voMine.level >= cfg.lv) {
				a.jihuoLb.color = Color.GREENINT;
			} else {
				a.jihuoLb.color = Color.REDINT;
			}
			a.costLb.visible = true;
			a._costArr = JSON.parse(cfg.conmuse);
			a._itemVo = VoItem.create(a._costArr[0][1]);
			let count: number = Model_Bag.getItemCount(a._costArr[0][1]);
			let color = count >= a._costArr[0][2] ? 2 : 6;
			a.costLb.text = "消耗：" + HtmlUtil.fontNoSize(a._itemVo.name, Color.getColorStr(a._itemVo.quality)) + "x" + a._costArr[0][2] +
				HtmlUtil.fontNoSize("(" + count + "/" + a._costArr[0][2] + ")", Color.getColorStr(color));
		} else {//已满级
			a.maxAtt.visible = true;
			a.maxAtt.text = attstr;
			a.maxTips.visible = true;
			a.costLb.visible = false;
		}
		a.numIcon.url = CommonManager.getUrl("lunhui", "icon" + cfg.id);
		a.rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
		a.list.numItems = a.rewardArr.length;
	}

	/**
	 * 更新按钮红点状态
	 */
	public checkBtnRedDot() {
		let a = this;
		a.lunhuiBtn.checkNotice = Model_LunHui.checkLunHuiNotice();
	}

	public onShown(): void {
		let a = this;
		a.updateShow();
		a.lunhuiBtn.addClickListener(a.lunhuiHandle, a);
		GGlobal.reddot.listen(ReddotEvent.CHECK_LUNHUI, a.updateShow, a);
		GGlobal.modelPlayer.listen(Model_player.MSG_HERO_LEVEL, a.checkBtnRedDot, this);
		GGlobal.control.listen(Enum_MsgType.LUNHUI_DATA_UPDATE, a.updateShow, a);
	}

	public onHide(): void {
		let a = this;
		a.lunhuiBtn.removeClickListener(a.lunhuiHandle, a);
		GGlobal.reddot.remove(ReddotEvent.CHECK_LUNHUI, a.updateShow, a);
		GGlobal.modelPlayer.remove(Model_player.MSG_HERO_LEVEL, a.checkBtnRedDot, this);
		GGlobal.control.remove(Enum_MsgType.LUNHUI_DATA_UPDATE, a.updateShow, a);
		a.list.numItems = 0;
	}
}