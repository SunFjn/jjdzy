class View_NZBZ_Rank extends UIModalPanel {
	public c1: fairygui.Controller;
	public item0: Child_NZBZ_MyRank;
	public item1: Child_Country_Rank;
	public static URL: string = "ui://xzyn0qe3l3h38";

	public constructor() {
		super();
		fairygui.UIObjectFactory.setPackageItemExtension(NZBZ_RankItem.URL, NZBZ_RankItem);
		fairygui.UIObjectFactory.setPackageItemExtension(Child_NZBZ_MyRank.URL, Child_NZBZ_MyRank);
		fairygui.UIObjectFactory.setPackageItemExtension(Child_Country_Rank.URL, Child_Country_Rank);
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		this.view = fairygui.UIPackage.createObject("nzbz", "View_NZBZ_Rank").asCom;
		this.contentPane = this.view;
		this.c1 = this.view.getController("c1");
		this.item0 = <Child_NZBZ_MyRank><any>(this.view.getChild("item0"));
		this.item1 = <Child_Country_Rank><any>(this.view.getChild("item1"));
		super.childrenCreated();
		this.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, this.updateShow, this);
	}

	public updateShow(): void {
		switch (this.c1.selectedIndex) {
			case 0:
				this.item0.show();
				break;
			case 1:
				this.item1.show();
				break;
		}
	}

	protected onShown(): void {
		this.c1.selectedIndex = 0;
		GGlobal.control.listen(Enum_MsgType.NZBZ_RANK_UPDATE, this.updateShow, this);
		GGlobal.modelnzbz.CG_GET_NZBZ_RANK();
		GGlobal.modelnzbz.CG_GET_NZBZ_COUNTRYRANK();
	}

	protected onHide(): void {
		this.item0.hide();
		this.item1.hide();
		GGlobal.control.remove(Enum_MsgType.NZBZ_RANK_UPDATE, this.updateShow, this);
		GGlobal.layerMgr.close(UIConst.NANZHENG_BEIZHAN_RANK);
	}
}