/**
 * 鉴定排名item
 */
class ItemAuthenRank extends fairygui.GComponent{
	public rankTxt: fairygui.GTextField;
	public nameTxt: fairygui.GTextField;
	public jdTxt: fairygui.GTextField;
	public static URL = "ui://hincjqblze8t1s";
	public rankImg: fairygui.GLoader;

	public constructFromXML(xml) {
		super.constructFromXML(xml);
		CommonManager.parseChildren(this, this);
	}

	 public setData(vo:AuthenRankVO, index:number) {
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