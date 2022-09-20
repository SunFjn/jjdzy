/**
 * 洗练排名item
 */
class ItemXiLianRank extends fairygui.GComponent{
	public rankTxt: fairygui.GTextField;
	public nameTxt: fairygui.GTextField;
	public jdTxt: fairygui.GTextField;
	public static URL = "ui://d5y9ngt6cl031o";
	public rankImg: fairygui.GLoader;

	public static createInstance(): ItemXiLianRank {
		return <ItemXiLianRank><any>(fairygui.UIPackage.createObject("actHolyBeast", "ItemXiLianRank"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.rankTxt = <fairygui.GTextField><any>(this.getChild("rankTxt"));
		this.nameTxt = <fairygui.GTextField><any>(this.getChild("nameTxt"));
		this.jdTxt = <fairygui.GTextField><any>(this.getChild("jdTxt"));
		this.rankImg = <fairygui.GLoader><any>(this.getChild("rankImg"));
	}

	 public setData(vo:XiLianRankVO, index:number) {
		 this.rankImg.visible = false;
		 this.rankTxt.visible = false;
		 if (index < 3)
		 {
			 this.rankImg.visible = true;
			 this.rankImg.url = CommonManager.getCommonUrl("rank_" + (index + 1));
		 }else{
			 this.rankTxt.visible = true;
			 this.rankTxt.text = "第" + (index + 1) +"名";
		 }

		 if(!vo)
		 {
			 this.nameTxt.text = "虚位以待";
			 this.jdTxt.text = "";
		 }else{
			 this.nameTxt.text = vo.name;
			 this.jdTxt.text = vo.jdCount + "";
		 }
	 }

}