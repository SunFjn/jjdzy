/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewShuXing extends UIModalPanel {


	public frame: fairygui.GComponent;
	public content: lstLabel;

	public static URL: string = "ui://3tzqotadltpm18";

	public static createInstance(): ViewShuXing {
		return <ViewShuXing><any>(fairygui.UIPackage.createObject("role", "ViewShuXing"));
	}

	public constructor() {
		super();
		fairygui.UIObjectFactory.setPackageItemExtension(lstLabel.URL, lstLabel);
		this.loadRes();
		this.isShowOpenAnimation = false;
	}

	protected childrenCreated(): void {
		this.view = fairygui.UIPackage.createObject("role", "ViewShuXing").asCom;
		this.contentPane = this.view;
		this.frame = <fairygui.GComponent><any>(this.view.getChild("frame"));
		this.content = <lstLabel><any>(this.view.getChild("content"));
		super.childrenCreated();
	}

	protected onShown() {
		let lhCfg = Config.lunhui_274[Model_player.voMine.reincarnationLevel];
		var sblue = Color.getColorStr(Color.WHITE);
		var green = Color.getColorStr(Color.GREEN);
		var blue = Color.getColorStr(Color.BLUE);
		var voMine = Model_player.voMine;
		var str = "";
		str += "<font color='" + sblue + "'>等级：</font>" + "<font color='" + green + "'>" + voMine.level + "</font>" + "\n";
		var lb = Config.lv_200[voMine.level]
		if (lb)
			str += "<font color='" + sblue + "'>经验：</font>" + "<font color='" + green + "'>" + voMine.exp + "/" + (lb.exp * (1 + lhCfg.exp / 100)) + "</font>" + "\n";
			// str += "<font color='" + sblue + "'>经验：</font>" + "<font color='" + green + "'>" + voMine.exp + "/" + lb.exp + "</font>" + "\n";
		else
			str += "<font color='" + sblue + "'>经验：</font>" + "<font color='" + green + "'>" + voMine.exp + "/" + lb.exp + "</font>" + "\n";
		let baseAttrs = [102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 301, 302, 303, 304, 305, 306, 307, 308];
		let j = baseAttrs.length;
		for (let i = 0; i < j; i++) {
			str += this.createLabel(baseAttrs[i],i==(j-1));
		}

		this.content.setText(str);
		this.content.reScroll();

		this.resetPosition();
	}

	private createLabel(idx, isend = false) {
		let cfg =  Config.jssx_002[idx];
		if (!cfg) {return "";}
		var colorStr = Color.getColorStr(cfg.color);
		var white = Color.getColorStr(Color.WHITE);
		let name = Vo_attr.getAttrName(idx);
		let ret = "<font color='" + white + "'>" + name + "：</font>";
		let mine = Model_player.voMine;
		let value = mine[Enum_Attr.roleAttributes[idx]];
		let needFiexd = Config.jssx_002[idx].type==2;
		if (needFiexd)
			value = Number(value * 100).toFixed(2) + "%";
		ret += "<font color='" + colorStr + "'>" + value + "</font>";
		if (!isend) ret += "\n";
		return ret;
	}

	private setvv(v) {
		let f = Math.ceil(v * 100);
		f = f / 100;
		return f;
	}
	protected onHide() {
		GGlobal.layerMgr.close(UIConst.ROLESHUXING);
	}

	public resetPosition(): void {
		this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, (fairygui.GRoot.inst.height - this.height) >> 1);
	}
}