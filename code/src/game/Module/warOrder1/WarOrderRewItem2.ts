class WarOrderRewItem2 extends fairygui.GComponent {
	//注意：start和end之间的属性是脚本自动修改，在这之间插入的代码会被删除，不要在start和end之间添加代码
	//>>>>start
	public item0: ViewGrid;
	public item1: ViewGrid;
	public tfIndex: fairygui.GRichTextField;
	public lbNo0: fairygui.GImage;
	public lbNo1: fairygui.GImage;
	//>>>>end
	public static URL: string = "ui://89er3bo3e7lco";

	public static createInstance(): WarOrderRewItem2 {
		return <WarOrderRewItem2><any>(fairygui.UIPackage.createObject("warOrder1", "WarOrderRewItem2"));
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let t = this;
		CommonManager.parseChildren(t, t);
	}

	_curData
	public updata(pData: VoWarOrderReward) {
		let t = this;
		if (!pData) {
			return
		}
		t._curData = pData
		t.tfIndex.text = ConfigHelp.reTxt("第{0}级", pData.cfg.lv)

		if (pData.rewardList0[0]) {
			t.item0.tipEnabled = true;
			t.item0.isShowEff = true;
			this.item0.vo = pData.rewardList0[0];
			t.item0.visible = true
			t.lbNo0.visible = false;
		} else {
			t.item0.visible = false
			t.lbNo0.visible = true;
		}

		if (pData.rewardList1[0]) {
			t.item1.tipEnabled = true;
			t.item1.isShowEff = true;
			t.item1.vo = pData.rewardList1[0];
			t.item1.visible = true
			t.lbNo1.visible = false;
		} else {
			t.item1.visible = false
			t.lbNo1.visible = true;
		}
	}

}