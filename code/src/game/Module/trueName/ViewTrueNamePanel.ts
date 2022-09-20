class ViewTrueNamePanel extends UIModalPanel {

	public frame: fairygui.GLabel;
	public btnSure: fairygui.GButton;
	public btnCancel: fairygui.GButton;
	public lb: fairygui.GTextField;
	public lbName: fairygui.GTextInput;
	public lbCard: fairygui.GTextInput;
	public list: fairygui.GList;

	public static URL: string = "ui://girq9ndul5k50";

	public static createInstance(): ViewTrueNamePanel {
		return <ViewTrueNamePanel><any>(fairygui.UIPackage.createObject("trueName", "ViewTrueNamePanel"));
	}

	public constructor() {
		super();
		this.loadRes("trueName", "trueName_atlas0");
	}

	protected childrenCreated(): void {
		GGlobal.createPack("trueName");
		this.view = fairygui.UIPackage.createObject("trueName", "ViewTrueNamePanel").asCom;
		this.contentPane = this.view;

		this.btnSure = <fairygui.GButton><any>(this.view.getChild("btnSure"));
		this.btnCancel = <fairygui.GButton><any>(this.view.getChild("btnCancel"));
		this.lb = <fairygui.GTextField><any>(this.view.getChild("lb"));
		this.lbName = <fairygui.GTextInput><any>(this.view.getChild("lbName"));
		this.lbCard = <fairygui.GTextInput><any>(this.view.getChild("lbCard"));
		this.list = <fairygui.GList><any>(this.view.getChild("list"));
		this.list.itemRenderer = this.renderItem;
		this.list.callbackThisObj = this;
		super.childrenCreated();
	}
	private _listData: IGridImpl[];
	protected onShown(): void {
		let s = this;
		s.btnSure.addClickListener(s.onSure, s);
		s.btnCancel.addClickListener(s.onCancel, s);
		GGlobal.control.listen(Enum_MsgType.TRUE_NAME_CLOSE, s.onCancel, s)
		s._listData = ConfigHelp.makeItemListArr(JSON.parse(ConfigHelp.getSystemDesc(5901)))
		s.list.numItems = s._listData.length;
		

		if(Model_TrueName.isIdentity){///已经验证过了
			GGlobal.control.notify(Enum_MsgType.TRUE_NAME_CLOSE)
			if(!Model_TrueName.isChenMi && Model_TrueName.rewStatus != 2){///打开奖励
				GGlobal.layerMgr.open(UIConst.TRUE_NAME_REWARD)
			}	
		}else{
			Model_TrueName.getnewuser(Model_TrueName.freshIdentity)
		}
	}

	protected onHide(): void {
		let s = this;
		s.btnSure.removeClickListener(s.onSure, s);
		s.btnCancel.removeClickListener(s.onCancel, s);
		GGlobal.control.remove(Enum_MsgType.TRUE_NAME_CLOSE, s.onCancel, s)
		GGlobal.layerMgr.close(UIConst.TRUE_NAME);
		GGlobal.modelTrueName.openAlert();
		s.list.numItems = 0;
	}

	private onSure() {
		let s = this;
		let n = s.lbName.text
		let c = s.lbCard.text
		//false  是游客
		if(!GGlobal.loginArg.isLogin){
			ViewCommonWarn.text("请您登录后再进行实名认证");
			return;
		}
		if (n == "") {
			ViewCommonWarn.text("请输入您的真实姓名");
			return;
		}
		// var nameReg = /^[\u4E00-\u9FA5]{2,4}$/;
		// if (!nameReg.test(n)) {
		// 	ViewCommonWarn.text("你输入的姓名格式不正确");
		// 	return;
		// }
		if (c == "") {
			ViewCommonWarn.text("请输入您的身份证号码");
			return;
		}
		if (!Model_TrueName.checkIdcard(c)) {
			ViewCommonWarn.text("你输入的身份证格式不正确")
			return;
		}
		GGlobal.modelTrueName.uploadRealNameInfo(n, c);
		GGlobal.modelTrueName.CGTRUE_NAME(n, c)

	}

	private onCancel() {
		this.closeEventHandler(null)
	}

	private renderItem(index: number, obj: fairygui.GObject): void {
		var item: ViewGrid = obj as ViewGrid;
		item.vo = this._listData[index];
	}
}