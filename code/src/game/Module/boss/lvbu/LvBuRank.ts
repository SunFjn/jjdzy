/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class LvBuRank extends UIModalPanel {

	public frame: fairygui.GComponent;
	public list: fairygui.GList;
	public lbMine: fairygui.GRichTextField;

	public static URL: string = "ui://47jfyc6eqcyl10";

	public constructor() {
		super();
		this.loadRes();
	}

	protected childrenCreated(): void {
		let s = this;
		GGlobal.createPack("Boss");
		this.view = fairygui.UIPackage.createObject("Boss", "LvBuRank").asCom;
		this.contentPane = this.view;
		this.frame = <fairygui.GLabel><any>(this.view.getChild("frame"));
		this.list = <fairygui.GList><any>(this.view.getChild("list"));
		this.lbMine = <fairygui.GRichTextField><any>(this.view.getChild("lbMine"));
		s.resetPosition();

		s.list.itemRenderer = s.onRender;
		s.list.callbackThisObj = s;

		super.childrenCreated();
		this.resetPosition();
		this.list.itemRenderer = this.onRender;
		this.list.callbackThisObj = this;
	}

	private onRender(index, obj) {
		var data = this.sourced[index];
		var item: LvBuItem = obj as LvBuItem;
		item.setdata(data);
	}

	public setdata() {
		var m = GGlobal.modelBoss;
		this.sourced = m.rankData;
		this.list.numItems = this.sourced.length;
		var rk = "未上榜";
		var d = this.sourced;
		var nm = Model_player.voMine.name;
		for (var i = 0; i < d.length; i++) {
			if (Model_player.isMine(d[i][1])) {
				rk = d[i][0];
				break;
			}
		}
		this.lbMine.text = "<font color='" + Color.WHITESTR + "'>我的排名：</font>" + rk ;
	}

	private sourced: any[];
	protected onShown() {
		var tp = this._args;
		if (tp == 0) {
			GGlobal.modelBoss.CG_LBRANK_1501();
			GGlobal.control.listen(Enum_MsgType.RANK_UPDATE, this.setdata, this);
		} else {
			this.setdata();
		}
	}

	protected onHide() {
		this.list.numItems = 0;
		var tp = this._args;
		if (tp == 0) {
			GGlobal.control.remove(Enum_MsgType.RANK_UPDATE, this.setdata, this);
		}
		GGlobal.layerMgr.close(UIConst.LVBURANK);
	}

	public resetPosition(): void {
		this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, (fairygui.GRoot.inst.height - this.height) >> 1);
	}

}