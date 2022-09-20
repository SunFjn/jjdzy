/**
 * 创建义盟界面
 */
class TYJY_CreatView extends UIModalPanel{
	public bgImg: fairygui.GLoader;
	public frame: WindowFrame1;
	public c1: fairygui.Controller;
	public okBtn: Button1;
	public inputName: fairygui.GTextInput;
	public iconYuanBao: fairygui.GLoader;
	public lb: fairygui.GRichTextField;
	private _cost:number = 0;
	public consumeLb: fairygui.GRichTextField;
	private _count:number = 0;

	public static URL: string = "ui://m2fm2aiyihs7x";

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("taoYuanJieYi", "TYJY_CreatView").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);

		super.childrenCreated();
	}

	protected onShown(): void {
		let self = this;
		let type:number = this._args.type;
		self.c1.selectedIndex = type;
		if(type == 0)//创建界面
		{
			self.frame.text = "创建义盟";
			self.okBtn.text = "创建义盟";
		}else{
			self.frame.text = "修改名字";
			self.okBtn.text = "确定修改";
		}
		self.okBtn.addClickListener(this.onCreate, this);
		self.registerEvent(true);

		IconUtil.setImg(self.bgImg, Enum_Path.TYJY_URL + "bg_2.jpg");

		let cfg:Ixtcs_004 = Config.xtcs_004[7701];
		let id:number = Number(ConfigHelp.SplitStr(cfg.other)[0][0]);
		let v = VoItem.create(id);
		IconUtil.setImg(self.iconYuanBao, Enum_Path.ICON70_URL + v.icon + ".png");
		self._cost = Number(ConfigHelp.SplitStr(cfg.other)[0][2]);
		self.lb.text = self._cost + "";

		let itemVo: VoItem = VoItem.create(410119);
		self._count = Model_Bag.getItemCount(410119);
		let color = self._count >= 1 ? 2 : 6;
		self.consumeLb.text = "消耗：" + HtmlUtil.fontNoSize(itemVo.name, Color.getColorStr(itemVo.quality)) + "x1" +
				HtmlUtil.fontNoSize("(" + self._count + "/1)", Color.getColorStr(color));
	}

	protected onHide(): void {
		GGlobal.layerMgr.close(UIConst.TYJY_CREATE);
		let s = this;
		IconUtil.setImg(s.bgImg, null);
		s.okBtn.removeClickListener(s.onCreate, s);
		IconUtil.setImg(s.iconYuanBao, null);
	}

	private registerEvent(pFlag: boolean): void {
		let self = this;
		EventUtil.register(pFlag, self.inputName, egret.TextEvent.CHANGE, self.onInput, self);
	}

	/**
	 * 创建义盟
	 */
	private onCreate(e: egret.TouchEvent): void {
		if (!Model_GlobalMsg.rename) {
			ViewCommonWarn.text("改名系统维护中");
			return;
		}
		var name = this.inputName.text;
		name = name.replace(/\s+/g, '');//过滤空格
		if (name == "") {
			ViewCommonWarn.text("请输入名称");
			return;
		}
		var len = this.getStrByteLen(name);
		if (len > 12) {
			ViewCommonWarn.text("名字长度不能超过6个汉字或12个英文数字");
			return;
		}
		if (name == GGlobal.model_TYJY.myGangName) {
			ViewCommonWarn.text("义盟名字不可重复");
			return;
		}
		if(this.c1.selectedIndex == 0)//创建义盟
		{
			if (Model_player.voMine.yuanbao < this._cost) {
				ModelChongZhi.guideToRecharge();
				return;
			}
			GGlobal.model_TYJY.CG_CREATE(name);
		}else{//修改名字
			if(this._count <= 0)
			{
				ViewCommonWarn.text("道具不足");
				return;
			}
			GGlobal.model_TYJY.CG_CHANGE_NAME(name);
		}
	}

	private nameReg = /[^0-9a-zA-Z\u4E00-\u9fa50]/g;
	protected onInput(): void {
		var e = this, t = e.inputName.text, n = t.length;
		if (t.length > 0) {
			var o = t.charAt(n - 1)
				, i = o.match(e.nameReg);
			if (null == i)
				return;
			t = t.substr(0, n - 1)
		}
		var n = this.getStrByteLen(t);
		if (t != e.inputName.text) {
			e.inputName.text = t
		}
	}

	protected getStrByteLen(str: string): number {
		var len = str.replace(/[^x00-xFF]/g, '**').length;
		return len
	}
}