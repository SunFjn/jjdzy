/**
 * @author: lujiahao 
 * @date: 2019-09-26 10:18:02 
 */
class QxzlMapGUI extends fairygui.GComponent {

	//>>>>start
	public loaderBg: fairygui.GLoader;
	public item0: QxzlCityItem;
	public item1: QxzlCityItem;
	public item2: QxzlCityItem;
	public item10: QxzlCityItem;
	public item9: QxzlCityItem;
	public item15: QxzlCityItem;
	public item11: QxzlCityItem;
	public item14: QxzlCityItem;
	public item13: QxzlCityItem;
	public item12: QxzlCityItem;
	public item8: QxzlCityItem;
	public item7: QxzlCityItem;
	public item6: QxzlCityItem;
	public item5: QxzlCityItem;
	public item4: QxzlCityItem;
	public item3: QxzlCityItem;
	public role: RoleCom;
	//>>>>end

	public static URL:string = "ui://6d8dzzdgems45";

	public static createInstance():QxzlMapGUI {
		return <QxzlMapGUI><any>(fairygui.UIPackage.createObject("qxzl","QxzlMapGUI"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		CommonManager.parseChildren(this, this);
		let t = this;
		t.role.touchable = false;
	}

	//=========================================== API ==========================================
	//===================================== private method =====================================
	//======================================== handler =========================================
}