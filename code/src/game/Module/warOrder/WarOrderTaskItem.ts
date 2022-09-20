/** This is an automatically generated class by FairyGUI. Please do not modify it. **/


class WarOrderTaskItem extends fairygui.GComponent {
	//注意：start和end之间的属性是脚本自动修改，在这之间插入的代码会被删除，不要在start和end之间添加代码
	//>>>>start
	public stateCtrl: fairygui.Controller;
	public tfTitle: fairygui.GRichTextField;
	public itemList: fairygui.GList;
	public btnGo: Button0;
	public btnGet: Button1;
	public imageGet: fairygui.GImage;
	public tfCt: fairygui.GRichTextField;
	public img: fairygui.GLoader;
	public tfContent: fairygui.GRichTextField;
	public tfCs: fairygui.GRichTextField;
	static pkg = "warOrder";
	//>>>>end
	public static URL: string = "ui://5xptxudgp5ib5";

	public static createInstance(): WarOrderTaskItem {
		return <WarOrderTaskItem>(fairygui.UIPackage.createObject("warOrder", "WarOrderTaskItem"));
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let t = this;
		CommonManager.parseChildren(t, t);

		this.itemList.itemRenderer = this.onItemRender;
		this.itemList.callbackThisObj = this;
	}

	private _curData: VoWarOrderTask;
	private _curActVo: Vo_Activity;
	private _type;//1是每日任务  2 每周任务

	//=========================================== API ==========================================
	public setData(pData: VoWarOrderTask, actVo: Vo_Activity, type) {
		let t = this;
		t._curData = pData;
		t._curActVo = actVo;
		t._type = type;
		if (pData) {
			let t_countStr = "";
			let t_color = Color.REDSTR;
			if (pData.curCount >= pData.cfg.cs) {
				t_color = Color.GREENSTR;
			}
			t.tfContent.text = pData.cfg.name;
			t.tfCs.text = ConfigHelp.reTxt(HtmlUtil.font("({0}/{1})", t_color), pData.curCount, pData.cfg.cs);
			t.tfTitle.text = pData.cfg.title
			t.stateCtrl.selectedIndex = pData.state;
			t.tfCt.text = "";

			IconUtil.setImg(t.img, Enum_Path.RYXZ_URL + pData.cfg.icon + ".png");
			t.itemList.numItems = pData.rewardList.length;
			t.registerEvent(true);
		}
		else {
			t.registerEvent(false);
		}
	}


	public clean() {
		let t = this
		super.clean()
		t.registerEvent(false);
		t.itemList.numItems = 0;
		IconUtil.setImg(t.img, null);
	}
	//===================================== private method =====================================
	private onItemRender(pIndex: number, pItem: ViewGrid) {
		if (!this._curData)
			return;
		let t_list = this._curData.rewardList;
		if (!t_list)
			return;
		pItem.isShowEff = true
		pItem.tipEnabled = true
		pItem.vo = (t_list[pIndex]);
	}

	private registerEvent(pFlag: boolean) {
		let t = this;
		EventUtil.register(pFlag, t.btnGo, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
		EventUtil.register(pFlag, t.btnGet, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
	}

	//======================================== handler =========================================
	private onBtnClick(e: egret.TouchEvent) {
		let t = this
		if (!t._curData)
			return;
		switch (e.currentTarget) {
			case t.btnGo:
				GGlobal.layerMgr.close(UIConst.WAR_ORDER);
				GGlobal.layerMgr.close(UIConst.WAR_ORDER_HD);
				GGlobal.layerMgr.open(t._curData.cfg.open);
				break;
			case t.btnGet:
				if (t._type == 1) {
					GGlobal.modelWarOrder.CG12259(t._curData.type, t._curData.taskId, 0, t._curActVo.groupId);
				} else {
					GGlobal.modelWarOrder.CG12255(t._curData.type, t._curData.taskId, 0, t._curActVo.groupId);
				}
				break;
		}
	}
}