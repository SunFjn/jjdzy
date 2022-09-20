class Item_HOnlyDBFanLi extends fairygui.GComponent {

	public ylq: fairygui.GImage;
	public btnGet: fairygui.GButton;
	public btnGo: fairygui.GButton;
	public desc: fairygui.GTextField;
	public grid0: ViewGrid;
	public count: fairygui.GTextField;
	public lbBack: fairygui.GTextField;
	public noticeImg: fairygui.GImage;

	private VoDatas: Vo_HuoDong;
	private _act: Vo_Activity

	public static URL: string = "ui://mk3gp0vrhndya";

	public constructor() {
		super();
	}


	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		CommonManager.parseChildren(this, this);

		this.btnGo.addClickListener(this.onClickBtnGo, this)
		this.btnGet.addClickListener(this.onClickBtnGet, this)
	}

	private onClickBtnGo() {
		GGlobal.layerMgr.open(UIConst.CHONGZHI);
	}

	private onClickBtnGet() {
		if (this.VoDatas.canCt > 0) {
			GGlobal.modelHuoDOnly.CGDBFanLi_Get8361(this._act.id, this.VoDatas.id);
		} else {
			ViewCommonWarn.text("领取条件不足");
		}
	}

	public clean() {
		this.grid0.tipEnabled = false;
		this.grid0.isShowEff = false;
	}

	public setData(v: Vo_HuoDong, act: Vo_Activity) {
		this.VoDatas = v;
		this._act = act
		let cfg = Config.zshddbfl_315[v.id]
		this.desc.text = "单笔充值[color=#33ff00]" + cfg.je + "[/color]元";
		this.count.visible = true;
		this.count.text = "可充值领奖次数：[color=#33ff00]" + this.VoDatas.hasCt + "[/color]";
		let reward = ConfigHelp.makeItemListArr(cfg.jl);
		this.grid0.tipEnabled = true;
		this.grid0.isShowEff = true;
		this.grid0.vo = reward[0];
		if (reward[0].count >= 199800) {
			this.grid0.lbNum.text = reward[0].count + "";
		}
		let state = this.VoDatas.hasCt == 0;
		this.ylq.visible = (state && this.VoDatas.canCt == 0);
		if (state) {
			this.count.visible = false;
		}
		this.noticeImg.visible = this.VoDatas.canCt > 0;
		this.btnGet.visible = this.VoDatas.canCt > 0;
		this.btnGo.visible = this.VoDatas.hasCt > 0 && this.VoDatas.canCt <= 0;
		//返利
		// let back = Math.floor(cfg.je * 10000 / reward[0].count)
		let back = Math.floor(reward[0].count / cfg.je)
		this.lbBack.text = "返利" + back + "%"
	}
}