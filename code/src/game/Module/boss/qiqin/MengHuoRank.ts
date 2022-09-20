/** s is an automatically generated class by FairyGUI. Please do not modify it. **/
class MengHuoRank extends UIModalPanel {

	public c1: fairygui.Controller;
	public frame: fairygui.GLabel;
	public n1: fairygui.GImage;
	public list: fairygui.GList;
	public n4: fairygui.GImage;
	public lbMine: fairygui.GRichTextField;
	public n6: fairygui.GButton;
	public n7: fairygui.GButton;
	public lbT: fairygui.GRichTextField;

	public static URL: string = "ui://47jfyc6eee1116";

	public static createInstance(): MengHuoRank {
		return <MengHuoRank><any>(fairygui.UIPackage.createObject("Boss", "MengHuoRank"));
	}

	public constructor() {
		super();
		this.loadRes("Boss", "Boss_atlas0");
	}

	protected childrenCreated(): void {
		let s = this;
		GGlobal.createPack("Boss");
		this.view = fairygui.UIPackage.createObject("Boss", "MengHuoRank").asCom;
		this.contentPane = this.view;
		this.c1 = this.view.getController("c1");
		this.frame = <fairygui.GLabel><any>(this.view.getChild("frame"));
		this.n1 = <fairygui.GImage><any>(this.view.getChild("n1"));
		this.list = <fairygui.GList><any>(this.view.getChild("list"));
		this.n4 = <fairygui.GImage><any>(this.view.getChild("n4"));
		this.lbMine = <fairygui.GRichTextField><any>(this.view.getChild("lbMine"));
		this.n6 = <fairygui.GButton><any>(this.view.getChild("n6"));
		this.n7 = <fairygui.GButton><any>(this.view.getChild("n7"));
		this.lbT = <fairygui.GRichTextField><any>(this.view.getChild("lbT"));

		s.resetPosition();

		s.list.itemRenderer = s.onRender;
		s.list.callbackThisObj = s;
		super.childrenCreated();
	}

	private onRender(index, obj) {
		let s = this;
		var data = s.sourced[index];
		var item: MengHuoItem = obj as MengHuoItem;
		item.setdata(index + 1, data, s.page);
	}

	public setdata() {
		let s = this;
		var m = GGlobal.modelBoss;
		s.page = s.c1.selectedIndex;
		let idx = s.page;
		s.sourced = m.mhRankdata[idx];
		s.lbT.text = ["排名                   名字                     伤害                   奖励", "排名                   势力                     伤害                   奖励"][idx];
		s.list.numItems = s.sourced.length;
		var rk = "未上榜";
		var d = s.sourced;
		if (s.page == 1) {
			s.lbMine.text = "我的势力：<font color='" + Color.TEXT_YELLOW + "'>" + Model_Country.getCountryName(Model_player.voMine.country) + "</font>";
		} else {
			let hurt = m.myHurt;
			var nm = Model_player.voMine.name;
			for (var i = 0; i < d.length; i++) {
				if (String(d[i][0]).split(".")[0] == nm) {
					rk = (i + 1) + "";
					hurt = d[i][1];
					break;
				}
			}
			if (s.type == 0) {
				s.lbMine.text = "我的排名：<font color='" + Color.TEXT_YELLOW + "'>" + rk + "</font>";
			} else {
				s.lbMine.text = "我的排名：<font color='" + Color.TEXT_YELLOW + "'>" + rk + "</font>" + "               我的伤害：<font color='" + Color.TEXT_YELLOW + "'>" + ConfigHelp.getYiWanText(hurt) + "</font>";
			}
		}
	}

	private page: number = 0;
	private type: number = 0;
	private sourced: any[];
	protected onShown() {
		let s = this;
		if (s._args) {
			var id = s._args.id;
			s.type = s._args.type;
		}
		if (s.type == 0) {
			GGlobal.modelBoss.CG_MHRANK_1703(id);
			GGlobal.control.listen(Enum_MsgType.MH_RANK, s.setdata, s);
		} else {
			GGlobal.modelBoss.CG_MHRANK1_1713(id);
			GGlobal.control.listen(Enum_MsgType.MH_RANK, s.setdata, s);
		}
		s.setdata();

		s.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, s.setdata, s);
		s.page = s.c1.selectedIndex;
		s.c1.setSelectedIndex(0);
	}

	protected onHide() {
		let s = this;
		s.list.numItems = 0;
		var tp = s._args;
		if (tp == 0) {
			GGlobal.control.remove(Enum_MsgType.MH_RANK, s.setdata, s);
		}
		s.c1.removeEventListener(fairygui.StateChangeEvent.CHANGED, s.setdata, s);
		GGlobal.layerMgr.close(UIConst.MHRANK);
	}
}