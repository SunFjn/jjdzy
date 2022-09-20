class Item_ActCom_Rank extends fairygui.GComponent {
	public rankTxt: fairygui.GTextField;
	public nameTxt: fairygui.GTextField;
	public jdTxt: fairygui.GTextField;
	public rankImg: fairygui.GLoader;

	public static URL: string = "ui://qz5r0meldsdy4";
	public static createInstance(): Item_ActCom_Rank {
		return <Item_ActCom_Rank><any>(fairygui.UIPackage.createObject("ActCom_SystemRank", "Item_ActCom_Rank"));
	}

	public constructFromXML(xml) {
		super.constructFromXML(xml);
		CommonManager.parseChildren(this, this);
	}

	public setData(vo: Vo_SystemRank, index: number) {
		this.rankImg.visible = false;
		this.rankTxt.visible = false;
		if (index < 3) {
			this.rankImg.visible = true;
			this.rankImg.url = CommonManager.getCommonUrl("rank_" + (index + 1));
		} else {
			this.rankTxt.visible = true;
			this.rankTxt.text = "第" + (index + 1) + "名";
		}
		if (!vo) {
			this.nameTxt.text = "虚位以待";
			this.jdTxt.text = "";
		} else {
			this.nameTxt.text = vo.name;
			this.jdTxt.text = vo.count + "";
		}
	}

}