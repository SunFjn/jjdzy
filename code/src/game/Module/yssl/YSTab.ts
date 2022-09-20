/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class YSTab extends fairygui.GComponent {

	public c1: fairygui.Controller;
	public n4: fairygui.GImage;
	public img: fairygui.GLoader;
	public n1: fairygui.GImage;
	public n2: fairygui.GImage;
	public imgNotice: fairygui.GImage;
	public lbTitle: fairygui.GRichTextField;

	public static URL: string = "ui://sbm40ly4ln004";

	public static createInstance(): YSTab {
		return <YSTab><any>(fairygui.UIPackage.createObject("yssl", "YSTab"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		CommonManager.parseChildren(this,this);
	}

	public setIdx(i, actId:number){
		let self = this;
		self.idx = i;
		// let labels = ["激活礼","进阶礼","战力礼","寻兽礼"];
		// IconUtil.setImg(self.img, Enum_Path.IMAGE_MODULES_URL+"yssl/i"+i+".png");
		let labels = [];
		if(actId == UIConst.YSSL)
		{
			labels = ["激活礼","进阶礼","战力礼","寻兽礼"];
			IconUtil.setImg(self.img, Enum_Path.IMAGE_MODULES_URL+"yssl/i"+i+".png");
		}else if(actId == UIConst.YUNCHOUWEIWO_QCYL)
		{
			labels = ["奇策激活礼","奇策进阶礼","奇策战力礼","奇策星数礼"];
			IconUtil.setImg(self.img, Enum_Path.IMAGE_MODULES_URL+"ycww/i"+i+".png");
		}
		self.lbTitle.text = labels[i];
	}

	public setSelect(v){
		let s = this;
		s.c1.setSelectedIndex(v?1:0);
	}

	public updateDot(v){
		this.imgNotice.visible = v;
	}
	public idx;
}