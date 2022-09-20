/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ChildYuanBaoFL extends fairygui.GComponent implements ICZFLView {
	public lbTitle: fairygui.GRichTextField;
	public lst: fairygui.GList;
	public lbTime: fairygui.GRichTextField;
	public imgPic: fairygui.GLoader;
	public static URL: string = "ui://qzsojhcrlwai2";

	public static createInstance(): ChildYuanBaoFL {
		return <ChildYuanBaoFL><any>(fairygui.UIPackage.createObject("chaozhifanli", "ChildYuanBaoFL"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;

		s.lbTitle = <fairygui.GRichTextField><any>(s.getChild("lbTitle"));
		s.lst = <fairygui.GList><any>(s.getChild("lst"));
		s.lbTime = <fairygui.GRichTextField><any>(s.getChild("lbTime"));
		s.imgPic = <fairygui.GLoader><any>(s.getChild("imgPic"));
		s.lst.setVirtual();
		s.lst.callbackThisObj = s;
		s.lst.itemRenderer = s.renderHD;
	}

	private dta;
	private renderHD(idx, obj) {
		let item: CailLiaoIt = obj as CailLiaoIt;
		if (ModelEightLock.originalDatas[UIConst.YUANBAOFANLI1]) {
			item.setdata(this.dta[idx], 2);
		} else {
			item.setdata(this.dta[idx], 1);
		}
	}

	public updateX() {
		let t = Model_GlobalMsg.getServerTime();
		let t1 = TimeUitl.getZeroTime23h59m59s(t);
		this.lbTime.text = "活动时间：" + DateUtil.getHMSBySecond(((t1 - t) / 1000) >> 0);
	}

	private update() {
		let s = this;
		let m = GGlobal.modelCZFL;
		s.dta = m.yuanbaoDta;
		s.lst.numItems = s.dta.length;
	}

	private lastWeek = -1;
	public open() {
		let s = this;
		IconUtil.setImg(s.imgPic, Enum_Path.PIC_URL + "yuanbaofanli.jpg");
		GGlobal.control.listen(Enum_MsgType.YUANBAOFANLI, s.update, s);
		GGlobal.control.listen(Enum_MsgType.YUANBAOFL_KF, s.update, s);
		Timer.instance.listen(s.updateX, s, 1000);
		if (ModelEightLock.originalDatas[UIConst.YUANBAOFANLI1]) {
			GGlobal.modelEightLock.CG4571(UIConst.YUANBAOFANLI1)
		} else {
			GGlobal.modelCZFL.CG_OPEN_3031();
		}
	}

	public close() {
		let s = this;
		IconUtil.setImg(s.imgPic, null);
		GGlobal.control.remove(Enum_MsgType.YUANBAOFANLI, s.update, s);
		GGlobal.control.remove(Enum_MsgType.YUANBAOFL_KF, s.update, s);
		Timer.instance.remove(s.updateX, s);
		s.lst.numItems = 0;
	}
}