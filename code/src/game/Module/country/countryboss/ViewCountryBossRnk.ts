class ViewCountryBossRnk extends UIModalPanel {

	public frame: fairygui.GComponent;
	public list: fairygui.GList;
	public lbMine: fairygui.GRichTextField;

	public static URL: string = "ui://uwzc58njofde2l";

	public static createInstance(): ViewCountryBossRnk {
		return <ViewCountryBossRnk><any>(fairygui.UIPackage.createObject("country", "ViewCountryBossRnk"));
	}

	public constructor() {
		super();
		fairygui.UIObjectFactory.setPackageItemExtension(CountryBossRnk.URL, CountryBossRnk);
		this.loadRes("country", "country_atlas0");
	}

	protected childrenCreated(): void {
		GGlobal.createPack("country");
		let s = this;
		s.view = fairygui.UIPackage.createObject("country", "ViewCountryBossRnk").asCom;
		s.contentPane = s.view;

		this.frame = <fairygui.GLabel><any>(s.view.getChild("frame"));
		this.list = <fairygui.GList><any>(s.view.getChild("list"));
		this.lbMine = <fairygui.GRichTextField><any>(s.view.getChild("lbMine"));
		this.list.callbackThisObj = this;
		this.list.itemRenderer = this.renderHandle;
		this.list.setVirtual();
		super.childrenCreated();
	}
	private renderHandle(index: number, obj: fairygui.GObject): void {
		var item: CountryBossRnk = obj as CountryBossRnk;
		var d = this.dta;
		item.setdata(d[index], index);
	}


	private dta: any[] = [];
	private update() {
		this.dta = GGlobal.modelCtryBoss.battleInfo.others;
		this.list.numItems = this.dta.length;
		if (!this.dta.length) {
			this.lbMine.text = "";
		} else {
			var rk = "未上榜";
			var d = this.dta;
			var nm = Model_player.voMine.name;
			for (var i = 0; i < d.length; i++) {
				if (Model_player.isMine(d[i].name)) {
					rk = (i + 1) + "";
					break;
				}
			}
			this.lbMine.text = "我的排名：" + rk + "              我的伤害：" + ConfigHelp.getYiWanText(GGlobal.modelCtryBoss.battleInfo.myDamage);
		}
	}

	protected onShown() {
		this.update();
		GGlobal.modelCtryBoss.listen(ModelCtryBoss.msg_batInfo, this.update, this);
	}

	protected onHide() {
		GGlobal.modelCtryBoss.remove(ModelCtryBoss.msg_batInfo, this.update, this);
		GGlobal.layerMgr.close(UIConst.COUNTRYBOSS_RANK1);
		this.list.numItems = 0;
	}
}