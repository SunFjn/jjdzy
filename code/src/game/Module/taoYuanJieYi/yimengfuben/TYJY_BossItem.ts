/**
 * 桃园boss item
 */
class TYJY_BossItem extends fairygui.GComponent{
	public bgImg: fairygui.GLoader;
	public list: fairygui.GList;
	private _listdata;
	private uiRole: UIRole;

	public static URL: string = "ui://m2fm2aiyvfmx10";

	public static createInstance(): TYJY_BossItem {
		return <TYJY_BossItem><any>(fairygui.UIPackage.createObject("taoYuanJieYi", "TYJY_BossItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		CommonManager.parseChildren(this, this);

		this.list.callbackThisObj = this;
		this.list.itemRenderer = this.itemRender;
	}

	public clean() {
		let s = this;
		IconUtil.setImg(s.bgImg, null);
		s.list.numItems = 0;

		if (this.uiRole) {
            this.uiRole.onRemove();
            this.uiRole = null;
        }
	}

	public setData(type:number)
	{
		let s = this;
		let cfg:Ityjyboss_251;
		if(type == 0)//低级
		{
			IconUtil.setImg(this.bgImg, Enum_Path.TYJY_URL + "low.jpg");
			cfg = Config.tyjyboss_251[343001];
			s._listdata = ConfigHelp.makeItemListArr(cfg.reward);
		}else{//高级
			IconUtil.setImg(this.bgImg, Enum_Path.TYJY_URL + "high.jpg");
			cfg = Config.tyjyboss_251[343002];
			s._listdata = ConfigHelp.makeItemListArr(cfg.reward);
		}
		s.list.numItems = s._listdata.length;

		let boss:INPC_200 = Config.NPC_200[cfg.id];
		if (!s.uiRole) {
            s.uiRole = UIRole.create();
            s.uiRole.uiparent = s.displayListContainer;
            s.uiRole.setPos(180, 230);
            s.uiRole.setScaleXY(1, 1);
        }
        s.uiRole.setBody(boss.mod);
        if (boss.weapon) {
            s.uiRole.setWeapon(boss.mod);
        } else {
            s.uiRole.setWeapon(null);
        }
        s.uiRole.onAdd();
	}

	private itemRender(idx,obj){
		let item:ViewGrid = obj as ViewGrid;
		item.isShowEff = true;
		item.tipEnabled = true;
		item.vo = this._listdata[idx];
	}
}