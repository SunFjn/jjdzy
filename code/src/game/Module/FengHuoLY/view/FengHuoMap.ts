/** sf is an automatically generated class by FairyGUI. Please do not modify it. **/
class FengHuoMap extends fairygui.GComponent {
	public mapBg1: fairygui.GLoader;
	public mapBg2: fairygui.GLoader;
	public mapBg3: fairygui.GLoader;
	public id2: ItemCity;
	public id1: ItemCity;
	public id3: ItemCity;
	public n20: fairygui.GLoader;
	public imgSafe1: fairygui.GImage;
	public lbServer1: fairygui.GTextField;
	public safe1: fairygui.GGroup;
	public n23: fairygui.GLoader;
	public imgSafe2: fairygui.GImage;
	public lbServer2: fairygui.GTextField;
	public safe2: fairygui.GGroup;
	public n40: fairygui.GLoader;
	public imgSafe3: fairygui.GImage;
	public lbServer3: fairygui.GTextField;
	public safe3: fairygui.GGroup;
	public id6: ItemCity;
	public id5: ItemCity;
	public id7: ItemCity;
	public id4: ItemCity;
	public id8: ItemCity;
	public id9: ItemCity;
	public id10: ItemCity;

	public static URL: string = "ui://edvdots4heu9w1q";

	public static createInstance(): FengHuoMap {
		return <FengHuoMap><any>(fairygui.UIPackage.createObject("FengHuoLY", "FengHuoMap"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let sf = this;
		this.mapBg1 = <fairygui.GLoader><any>(this.getChild("mapBg1"));
		this.mapBg2 = <fairygui.GLoader><any>(this.getChild("mapBg2"));
		this.mapBg3 = <fairygui.GLoader><any>(this.getChild("mapBg3"));
		this.id2 = <ItemCity><any>(this.getChild("id2"));
		this.id1 = <ItemCity><any>(this.getChild("id1"));
		this.id3 = <ItemCity><any>(this.getChild("id3"));
		this.n20 = <fairygui.GLoader><any>(this.getChild("n20"));
		this.imgSafe1 = <fairygui.GImage><any>(this.getChild("imgSafe1"));
		this.lbServer1 = <fairygui.GTextField><any>(this.getChild("lbServer1"));
		this.safe1 = <fairygui.GGroup><any>(this.getChild("safe1"));
		this.n23 = <fairygui.GLoader><any>(this.getChild("n23"));
		this.imgSafe2 = <fairygui.GImage><any>(this.getChild("imgSafe2"));
		this.lbServer2 = <fairygui.GTextField><any>(this.getChild("lbServer2"));
		this.safe2 = <fairygui.GGroup><any>(this.getChild("safe2"));
		this.n40 = <fairygui.GLoader><any>(this.getChild("n40"));
		this.imgSafe3 = <fairygui.GImage><any>(this.getChild("imgSafe3"));
		this.lbServer3 = <fairygui.GTextField><any>(this.getChild("lbServer3"));
		this.safe3 = <fairygui.GGroup><any>(this.getChild("safe3"));
		this.id6 = <ItemCity><any>(this.getChild("id6"));
		this.id5 = <ItemCity><any>(this.getChild("id5"));
		this.id7 = <ItemCity><any>(this.getChild("id7"));
		this.id4 = <ItemCity><any>(this.getChild("id4"));
		this.id8 = <ItemCity><any>(this.getChild("id8"));
		this.id9 = <ItemCity><any>(this.getChild("id9"));
		this.id10 = <ItemCity><any>(this.getChild("id10"));

		sf.cityDic = {};
		for (let i = 1; i < 11; i++) {
			sf.cityDic[i] = sf["id" + i];
			sf.cityDic[i].initCFG(i);
		}
	}
	public cityDic;
	public enter() {
		let sf = this;
		IconUtil.setImg(sf.mapBg1, Enum_Path.BACK_URL + "fenghuolangyan1.jpg");
		IconUtil.setImg(sf.mapBg2, Enum_Path.BACK_URL + "fenghuolangyan2.jpg");
		IconUtil.setImg(sf.mapBg3, Enum_Path.BACK_URL + "fenghuolangyan3.jpg");
		IconUtil.setImg(sf.n40, Enum_Path.IMAGE_MODULES_URL + "fenghuolangyan/tazi.png");
		IconUtil.setImg(sf.n20, Enum_Path.IMAGE_MODULES_URL + "fenghuolangyan/tazi.png");
		IconUtil.setImg(sf.n23, Enum_Path.IMAGE_MODULES_URL + "fenghuolangyan/tazi.png");
	}

	public exite() {
		let sf = this;
		IconUtil.setImg(sf.mapBg1, null);
		IconUtil.setImg(sf.mapBg2, null);
		IconUtil.setImg(sf.mapBg3, null);
		IconUtil.setImg(sf.n40, null);
		IconUtil.setImg(sf.n20, null);
		IconUtil.setImg(sf.n23, null);
		for (let i = 1; i < 11; i++) {
			sf.cityDic[i].resetView();
		}
	}
}