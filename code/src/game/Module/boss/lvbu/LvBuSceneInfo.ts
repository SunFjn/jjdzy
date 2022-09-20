/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class LvBuSceneInfo extends fairygui.GComponent {
	public lbMyhurt: fairygui.GRichTextField;
	public lbBest: fairygui.GRichTextField;
	public lbTime: fairygui.GRichTextField;
	public btn: fairygui.GButton;
	private n15: fairygui.GGroup;
	private n13: fairygui.GGroup;

	public static URL: string = "ui://47jfyc6eqcylw";

	public static createInstance(): LvBuSceneInfo {
		return <LvBuSceneInfo><any>(fairygui.UIPackage.createObject("Boss", "LvBuSceneInfo"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);


		this.lbMyhurt = <fairygui.GRichTextField><any>(this.getChild("lbMyhurt"));
		this.lbBest = <fairygui.GRichTextField><any>(this.getChild("lbBest"));
		this.lbTime = <fairygui.GRichTextField><any>(this.getChild("lbTime"));
		this.btn = <fairygui.GButton><any>(this.getChild("btn"));
		this.n15 = <fairygui.GGroup><any>(this.getChild("n15"));
		this.n15.x += GGlobal.layerMgr.offx;
		this.n13 = <fairygui.GGroup><any>(this.getChild("n13"));
		this.n13.x += GGlobal.layerMgr.offx;
		this.setXY(fairygui.GRoot.inst.width - this.width, 350);
	}

	public timeUpdate() {
		var data = JSON.parse(ConfigHelp.getSystemDesc(1091));
		var t = Model_GlobalMsg.getServerTime();
		var nowData = new Date(t);
		var hour = nowData.getHours();
		var min = nowData.getMinutes();
		var sec = nowData.getSeconds();
		var nextIndex: number = -1;
		for (var i = 0; i < 3; i++) {
			if (hour == data[i][0]) {
				nextIndex = i;
				break;
			}
		}
		if (nextIndex == -1) {
			var time = 0;
		} else {
			time = (data[nextIndex][1] - min + 30) * 60 - sec;
		}
		this.lbTime.text = TimeUitl.getRemainingTime(time * 1000, 0, { minute: "分", second: "秒" });
	}

	private openRank() {
		GGlobal.layerMgr.open(UIConst.LVBURANK, 1);
	}

	private updateMyHurt() {
		var m = GGlobal.modelBoss;
		var d = m.rankData;
		if (d.length) {
			this.lbMyhurt.text = "<font color='#ffc334'>自己：</font>" + ConfigHelp.getYiWanText(m.myHurt) +
				"       <font color='#ffc334'>1st:</font>" + d[0][1] + "   " + ConfigHelp.getYiWanText(d[0][2]);
		} else {
			this.lbMyhurt.text = "<font color='#ffc334'>自己：</font>" + ConfigHelp.getYiWanText(m.myHurt);
		}
	}

	public onopen() {
		MainUIController.addChildToUI(LvBuSceneInfo.instance, 1);
		this.updateMyHurt();
		GGlobal.control.listen(Enum_MsgType.RANK_UPDATE, this.updateMyHurt, this);
		Timer.instance.listen(this.timeUpdate, this, 1000);
		this.btn.addClickListener(this.openRank, this)
	}

	public onclose() {
		MainUIController.removeUI(LvBuSceneInfo.instance);
		GGlobal.control.remove(Enum_MsgType.RANK_UPDATE, this.updateMyHurt, this);
		Timer.instance.remove(this.timeUpdate, this);
		this.btn.removeClickListener(this.openRank, this)
	}

	private static _instance: LvBuSceneInfo;
	public static get instance(): LvBuSceneInfo {
		if (!LvBuSceneInfo._instance) LvBuSceneInfo._instance = LvBuSceneInfo.createInstance();
		return LvBuSceneInfo._instance;
	}
}