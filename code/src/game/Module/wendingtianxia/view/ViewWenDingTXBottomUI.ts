/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewWenDingTXBottomUI extends fairygui.GComponent {

	public n14: fairygui.GImage;
	public n7: fairygui.GImage;
	public n15: fairygui.GImage;
	public n1: Button2;
	public n2: fairygui.GButton;
	public n3: fairygui.GRichTextField;
	public n4: fairygui.GRichTextField;
	public lbCondition: fairygui.GRichTextField;
	public n11: fairygui.GRichTextField;
	public groupNext: fairygui.GGroup;
	public n19: fairygui.GGroup;

	public static URL: string = "ui://gxs8kn67fl2h1";


	private static _inst: ViewWenDingTXBottomUI;
	public static createInstance(): ViewWenDingTXBottomUI {
		if (!this._inst) {
			this._inst = <ViewWenDingTXBottomUI><any>(fairygui.UIPackage.createObject("wendingTX", "ViewWenDingTXBottomUI"));
		}
		return this._inst;
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n14 = <fairygui.GImage><any>(this.getChild("n14"));
		this.n7 = <fairygui.GImage><any>(this.getChild("n7"));
		this.n15 = <fairygui.GImage><any>(this.getChild("n15"));
		this.n1 = <Button2><any>(this.getChild("n1"));
		this.n2 = <fairygui.GButton><any>(this.getChild("n2"));
		this.n3 = <fairygui.GRichTextField><any>(this.getChild("n3"));
		this.n4 = <fairygui.GRichTextField><any>(this.getChild("n4"));
		this.lbCondition = <fairygui.GRichTextField><any>(this.getChild("lbCondition"));
		this.n11 = <fairygui.GRichTextField><any>(this.getChild("n11"));
		this.groupNext = <fairygui.GGroup><any>(this.getChild("groupNext"));
		this.n19 = <fairygui.GGroup><any>(this.getChild("n19"));
	}

	private openRank() {
		if (TimeUitl.cool("ViewWenDingTXBottomUI", 1000)) {
			GGlobal.layerMgr.open(UIConst.WENDINGTX_RANK);
		}
	}

	private _canCrossNext = false;
	private update() {
		let m = GGlobal.modelWenDingTX;
		let s = this;
		if (m.rank > 10)
			this.n3.text = "我的排名：<font color='#15f234'>10+</font>";
		else
			this.n3.text = "我的排名：<font color='#15f234'>" + m.rank + "</font>";
		s.n4.text = "我的积分：<font color='#15f234'>" + m.score + "</font>";
		let cfg = Config.wdtx_260[m.layer];
		let score = cfg.next;
		if (m.kill >= score) {
			s._canCrossNext = true;
			s.lbCondition.text = BroadCastManager.reTxt("击杀<font color='#15f234'>({0}/{1})</font>人后进入下一层", m.kill, score);
		} else {
			s._canCrossNext = false;
			s.lbCondition.text = BroadCastManager.reTxt("击杀<font color='#fe0000'>({0}/{1})</font>人后进入下一层", m.kill, score);
		}
		s.n11.text = m.buff + "";
	}

	private exiteHD() {
		let layar = GGlobal.modelWenDingTX.layer;
		let score;
		if (layar > 0) {
			score = Config.wdtx_260[layar].lose;
		}
		let str;
		if (score > 0) {
			str = "退出后30秒不可进入,是否退出\n本层退出扣除" + score + "积分"
		} else {
			str = "退出后30秒不可进入,是否退出"
		}
		ViewAlert.show(str, Handler.create(this, WenDingTXManager.getInstance().exite), ViewAlert.OKANDCANCEL);
	}

	private checkNotice() {
		this.n1.checkNotice = GGlobal.reddot.checkCondition(UIConst.WENDINGTX, 1) || GGlobal.reddot.checkCondition(UIConst.WENDINGTX, 2)||GGlobal.reddot.checkCondition(UIConst.WENDINGTX, 3);;
	}

	private showNextBtn() {
		let ret = GGlobal.modelWenDingTX.layer + 1;
		this.groupNext.visible = Config.wdtx_260[ret] ? true : false;
	}

	public toShow() {
		let s = this;
		let pat = GGlobal.layerMgr.UI_MainBottom;
		pat.addChild(s);
		s.resetPostion();
		s.showNextBtn();

		s.n1.addClickListener(s.openRank, s);
		s.n2.addClickListener(s.exiteHD, s);
		GGlobal.control.listen(Enum_MsgType.WDTX_LAYER_UPDATE, s.showNextBtn, s);
		GGlobal.reddot.listen(UIConst.WENDINGTX, s.checkNotice, s);
		GGlobal.control.listen(Enum_MsgType.WDTX_MINE_UPDATE, s.update, s);
	}

	public toHide() {
		let s = this;
		GGlobal.control.remove(Enum_MsgType.WDTX_LAYER_UPDATE, s.showNextBtn, s);
		GGlobal.control.remove(Enum_MsgType.WDTX_MINE_UPDATE, s.update, s);
		GGlobal.reddot.remove(UIConst.WENDINGTX, s.checkNotice, s);

		s.n2.removeClickListener(s.exiteHD, s);
		s.n1.removeClickListener(s.openRank, s);

		s._canCrossNext = false;
		s.removeFromParent();
	}

	public resetPostion() {
		let a = this;
		a.setXY((fairygui.GRoot.inst.width - a.width) >> 1, fairygui.GRoot.inst.height - 270);
	}
}