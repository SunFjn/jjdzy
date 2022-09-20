/**
 * 成就树面板
 * @author: lujiahao 
 * @date: 2019-11-20 17:22:19 
 */
class ChildCJS extends fairygui.GComponent implements IPanel {

	//>>>>start
	public bgLoader: fairygui.GLoader;
	public tfDate: fairygui.GRichTextField;
	public btnReward: Button1;
	public btnTarget: Button0;
	public btnLast: Button4;
	public btnNext: Button4;
	public tfLayer: fairygui.GRichTextField;
	public iconItem0: CJSIconItem;
	public iconItem1: CJSIconItem;
	public iconItem2: CJSIconItem;
	public iconItem3: CJSIconItem;
	public iconItem4: CJSIconItem;
	public iconItem5: CJSIconItem;
	public iconItem6: CJSIconItem;
	public iconItem7: CJSIconItem;
	public iconItem8: CJSIconItem;
	public iconItem9: CJSIconItem;
	public iconItem10: CJSIconItem;
	public iconItem11: CJSIconItem;
	//>>>>end

	public static URL: string = "ui://ehocr0vupwnz1";

	/** 设置包名（静态属性） */
	public static pkg = "actCJS";
	/** 绑定ui的方法（静态方法） */
	public static setExtends() {
		//子类ui组件的绑定放在这里，此类就不用绑定了，在上层已经自动实现
		let f = fairygui.UIObjectFactory.setPackageItemExtension;
		// f(ChildCJS.URL, ChildCJS);
		f(CJSIconItem.URL, CJSIconItem);
		// f(ViewTaskCJS.URL, ViewTaskCJS);
		f(CJSTaskItem.URL, CJSTaskItem);
		// f(ViewRewardCJS.URL, ViewRewardCJS);
		f(CJSRewardItem.URL, CJSRewardItem);
	}

	private _curActVo: Vo_Activity;
	private _curLayer = 1;
	private _iconItemList: CJSIconItem[] = [];

	public static createInstance(): ChildCJS {
		return <ChildCJS><any>(fairygui.UIPackage.createObject("actCJS", "ChildCJS"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let t = this;
		CommonManager.parseChildren(t, t);

		for (let i = 0; i < 12; i++) {
			let t_iconItem = t.getChild("iconItem" + i);
			t._iconItemList.push(<CJSIconItem>t_iconItem);
		}
	}

	protected _viewParent: fairygui.GObject;
	initView(pParent: fairygui.GObject) {
		this._viewParent = pParent;
		this.addRelation(this._viewParent, fairygui.RelationType.Size);
	}

	openPanel(pData?: any) {
		let t = this;
		let t_model = GGlobal.modelCJS;
		t.registerEvent(true);

		GGlobal.modelActivity.CG_OPENACT(UIConst.ACTCOM_CJS);
		t_model.CG_AchievementTree_openFloorUI_10571();

		t.tfDate.text = "";
		t._curActVo = pData;

		if (t._curActVo) {
			if (!Timer.instance.has(this.onDateUpdate, this))
				Timer.instance.listen(this.onDateUpdate, this);
		}

		t.refreshDataByLayer(t_model.curLayer);

		IconUtil.setImg(t.bgLoader, Enum_Path.BACK_URL + "cjs_bg.jpg");
	}

	closePanel(pData?: any) {
		let t = this;
		t.registerEvent(false);
		IconUtil.setImg(t.bgLoader, null);
		Timer.instance.remove(t.onDateUpdate, t);
	}

	public dispose() {
		let t = this;
		super.dispose();
	}
	//=========================================== API ==========================================
	//===================================== private method =====================================
	private refreshDataByLayer(pLayer: number) {
		let t = this;
		let t_model = GGlobal.modelCJS;
		t._curLayer = pLayer;
		if (t._curActVo) {
			let t_taskList = t_model.getTaskVoListByQsAndLayer(t._curActVo.qs, pLayer);
			let t_completeCount = 0;
			let t_maxCount = 0;
			if (t_taskList) {
				for (let i = 0; i < t._iconItemList.length; i++) {
					let t_item = t._iconItemList[i];
					let t_vo = t_taskList[i];
					t_item.setData(t_vo);
				}

				t_maxCount = t_taskList.length;
				for (let v of t_taskList) {
					if (v.state == 1)
						t_completeCount++;
				}
			}

			t.btnLast.visible = pLayer > 1;
			let t_maxLayer = t_model.getMaxLayerByQs(t._curActVo.qs);
			t.btnNext.visible = pLayer < t_maxLayer && pLayer < t_model.curLayer + 1;

			let t_strLayer = ConfigHelp.NumberToChinese(t._curLayer);
			t.tfLayer.text = `第${t_strLayer}层`;
		}
		else {
		}
	}

	/** 刷新时间 */
	private onDateUpdate() {
		let t_dateStr = "";
		if (this._curActVo) {
			let t_end = this._curActVo.end; //s
			const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0; //s

			let t_remainS = t_end - servTime;
			if (t_remainS > 0) {
				if (t_remainS < 24 * 60 * 60) {
					//小于24小时
					t_dateStr = DateUtil2.formatUsedTime(t_remainS, "活动剩余时间：hh小时uu分ss秒");
				}
				else {
					t_dateStr = DateUtil2.formatUsedTime(t_remainS, "活动剩余时间：dd天hh小时");
				}
			}
			else {
				t_dateStr = HtmlUtil.font("活动已经结束", Color.REDSTR);
			}
		}
		this.tfDate.text = t_dateStr;
	}

	private registerEvent(pFlag: boolean) {
		let t = this;

		GGlobal.control.register(pFlag, Enum_MsgType.CJS_UPDATE, t.onUpdate, t);

		EventUtil.register(pFlag, t.btnLast, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
		EventUtil.register(pFlag, t.btnNext, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
		EventUtil.register(pFlag, t.btnReward, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
		EventUtil.register(pFlag, t.btnTarget, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);

		if (pFlag) {
			ReddotMgr.ins().register(UIConst.ACTCOM_CJS + "|" + 1, t.btnReward.noticeImg);
		}
		else {
			ReddotMgr.ins().unregister(t.btnReward.noticeImg);
		}
	}

	//======================================== handler =========================================
	private onUpdate() {
		let t = this;
		let t_model = GGlobal.modelCJS;
		t.refreshDataByLayer(t_model.curLayer);
	}

	private onBtnClick(e: egret.TouchEvent) {
		let t = this;
		let t_model = GGlobal.modelCJS;
		if (!t._curActVo)
			return;
		switch (e.currentTarget) {
			case t.btnLast:
				{
					let t_layer = t._curLayer - 1;
					t_layer = t_layer < 1 ? 1 : t_layer;
					if (t_layer == t._curLayer)
						return;
					t.refreshDataByLayer(t_layer);
				}
				break;
			case t.btnNext:
				{
					let t_layer = t._curLayer + 1;
					let t_maxLayer = t_model.getMaxLayerByQs(t._curActVo.qs);
					t_layer = t_layer > t_maxLayer ? t_maxLayer : t_layer;
					if (t_layer == t._curLayer)
						return;
					t.refreshDataByLayer(t_layer);
				}
				break;
			case t.btnReward:
				GGlobal.layerMgr.open(UIConst.ACTCOM_CJS_REWARD);
				break;
			case t.btnTarget:
				GGlobal.layerMgr.open(UIConst.ACTCOM_CJS_TASK, { layer: t._curLayer });
				break;
		}
	}
}