/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewQMBossRnk extends UIModalPanel {

	public frame: fairygui.GComponent;
	public list: fairygui.GList;
	public lbMine: fairygui.GRichTextField;

	public static URL: string = "ui://47jfyc6egs0dt";

	public static createInstance(): ViewQMBossRnk {
		return <ViewQMBossRnk><any>(fairygui.UIPackage.createObject("Boss", "ViewQMBossRnk"));
	}

	public constructor() {
		super();
		fairygui.UIObjectFactory.setPackageItemExtension(QMBossRnk.URL, QMBossRnk);
		this.loadRes("Boss", "Boss_atlas0");
	}

	protected childrenCreated(): void {
		GGlobal.createPack("Boss");
		let s = this;
		s.view = fairygui.UIPackage.createObject("Boss", "ViewQMBossRnk").asCom;
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
		var item: QMBossRnk = obj as QMBossRnk;
		var d = this.dta;
		item.setdata(d[index]);
	}


	private dta: any[] = [];
	private update() {
		var m = GGlobal.modelBoss;
		if (Config.all_221[m.curEnterId].single == 1) {
			let name = Model_player.voMine.name
			this.dta = [[1, name, GGlobal.modelBoss.myHurt]];
			this.list.numItems = this.dta.length;
			this.lbMine.text = "我的排名：" + 1 + "              我的伤害：" + ConfigHelp.getYiWanText(GGlobal.modelBoss.myHurt);
		} else {
			this.dta = GGlobal.modelBoss.rankData;
			this.list.numItems = this.dta.length;
			if (!this.dta.length) {
				this.lbMine.text = "";
			} else {
				var rk = "未上榜";
				var d = this.dta;
				var nm = Model_player.voMine.name;
				for (var i = 0; i < d.length; i++) {
					if (Model_player.isMine(d[i][1])) {
						rk = d[i][0];
						break;
					}
				}
				this.lbMine.text = "我的排名：" + rk + "              我的伤害：" + ConfigHelp.getYiWanText(GGlobal.modelBoss.myHurt);
			}
		}
	}

	protected onShown() {
		this.update();
		GGlobal.control.listen(Enum_MsgType.MSG_QMBOSS_RANKUPDATE, this.update, this);
		GGlobal.control.listen(Enum_MsgType.MSG_QMBOSS_DANJI_BOSSXUE, this.update, this);
	}

	protected onHide() {
		GGlobal.control.remove(Enum_MsgType.MSG_QMBOSS_RANKUPDATE, this.update, this);
		GGlobal.control.remove(Enum_MsgType.MSG_QMBOSS_DANJI_BOSSXUE, this.update, this);
		GGlobal.layerMgr.close(UIConst.QMBOSSRANK);
	}
}