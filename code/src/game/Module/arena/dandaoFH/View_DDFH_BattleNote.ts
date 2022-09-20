class View_DDFH_BattleNote extends UIModalPanel {

	public noteLb: fairygui.GRichTextField;

	public static URL: string = "ui://me1skowljs6lj";
	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let a = this;
		a.view = fairygui.UIPackage.createObject("Arena", "View_DDFH_BattleNote").asCom;
		a.contentPane = a.view;
		a.noteLb = <fairygui.GRichTextField><any>(a.view.getChild("noteLb"));
		super.childrenCreated();
	}

	//B:战斗结果：0：失败，1：胜利U:玩家名字I:获得积分
	private updateShow(): void {
		let str: string = "";
		let arr = Model_DDFH.battleGroupArr;
		for (let i = 0; i < arr.length; i++) {
			if (i == 0) {
				if (arr[i][0] == 1) {
					str += HtmlUtil.fontNoSize("战胜了", Color.getColorStr(2)) + HtmlUtil.fontNoSize(arr[i][1], Color.getColorStr(3)) + ",获得了" + arr[i][2] + "积分";
				} else {
					str += HtmlUtil.fontNoSize("不敌", Color.getColorStr(6)) + HtmlUtil.fontNoSize(arr[i][1], Color.getColorStr(3)) + ",获得了" + arr[i][2] + "积分";
				}
			} else {
				if (arr[i][0] == 1) {
					str += "\n" + HtmlUtil.fontNoSize("战胜了", Color.getColorStr(2)) + HtmlUtil.fontNoSize(arr[i][1], Color.getColorStr(3)) + ",获得了" + arr[i][2] + "积分";
				} else {
					str += "\n" + HtmlUtil.fontNoSize("不敌", Color.getColorStr(6)) + HtmlUtil.fontNoSize(arr[i][1], Color.getColorStr(3)) + ",获得了" + arr[i][2] + "积分";
				}
			}
		}
		this.noteLb.text = str;
	}

	protected onShown(): void {
		GGlobal.modelddfh.CG_DANDAOFH_BATTLEGROUP();
		GGlobal.control.listen(Enum_MsgType.DANDAO_FUHUI_BATTLEGROUP, this.updateShow, this);
	}

	protected onHide(): void {
		GGlobal.layerMgr.close(UIConst.DANDAO_FUHUI_BATTLENOTE);
		GGlobal.control.remove(Enum_MsgType.DANDAO_FUHUI_BATTLEGROUP, this.updateShow, this);
	}
}