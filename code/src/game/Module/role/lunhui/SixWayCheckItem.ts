/**
 * 套装查看item
 */
class SixWayCheckItem extends fairygui.GComponent{
	public nameLb: fairygui.GRichTextField;
	public proLb: fairygui.GRichTextField;
	public bgImg: fairygui.GLoader;
	public pzImg: fairygui.GLoader;
	public lbContent: fairygui.GRichTextField;
	public lbPower: fairygui.GRichTextField;

	public static URL: string = "ui://ehelf5bhv97gw1y";

	public static createInstance(): SixWayCheckItem {
		return <SixWayCheckItem><any>(fairygui.UIPackage.createObject("lunhui", "SixWayCheckItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		CommonManager.parseChildren(this, this);
	}

	public clean() {
		let s = this;
	}

	public setdata(cfg:Isixdaotz_505) {
		if(!cfg)  return;

		let s = this;
		s.lbPower.text = "战力：" + cfg.power;
		s.nameLb.text = cfg ? ConfigHelp.createColorName(cfg.name + "(" + cfg.num + ")", cfg.pz) : "";
		// let attArr: Array<any> = JSON.parse(cfg.attr);
		// let attstr:string = "";
		// for (let i = 0; i < attArr.length; i++) {
		// 	attstr += Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
		// }
		s.proLb.text = cfg.tips;
		let name:string = "";
		if(cfg.type == 1)
		{
			name = "天道印记";
		}else if(cfg.type == 2)
		{
			name = "人道印记";
		}else if(cfg.type == 3)
		{
			name = "畜生道印记";
		}else if(cfg.type == 4)
		{
			name = "饿鬼道印记";
		}else if(cfg.type == 5)
		{
			name = "地狱道印记";
		}else
		{
			name = "修罗道印记";
		}
		s.lbContent.text = "需装备" + cfg.num + "件" + Color.getColorName(cfg.pz) + "色" + name;
		IconUtil.setImg(s.bgImg, Enum_Path.SIXWAY_URL + "p" + cfg.type +".jpg");
		IconUtil.setImg(s.pzImg, Enum_Path.SIXWAY_URL + "k" + cfg.pz + ".png");
	}
}