/**
 * 护送奖励Item
 */
class EscortRewardItem extends fairygui.GComponent{
	public item: ViewGrid;
	public itemName: fairygui.GRichTextField;
	public itemNum: fairygui.GTextField;
	public interNum: fairygui.GTextField;

	public static URL: string = "ui://lnw94ki2lnitk";

	public static createInstance(): EscortRewardItem {
		return <EscortRewardItem><any>(fairygui.UIPackage.createObject("ShaoZhuEscort", "EscortRewardItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}

	public setdata(data:IGridImpl,index:number,num:number = 0)
	{
		let self = this;
		if(!data)   return;

		self.item.isShowEff = true;
		self.item.tipEnabled = true;
		self.item.vo = data;
		self.item.showText = "";
		self.itemName.text = HtmlUtil.fontNoSize(data.name,Color.getColorStr(data.quality));
		self.itemNum.text = data.count + "";
		if(num && num > 0)
		{
			self.interNum.text = "(-" + num + ")";
		}else{
			self.interNum.text = "";
		}
	}
}