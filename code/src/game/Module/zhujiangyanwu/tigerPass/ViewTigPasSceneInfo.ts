class ViewTigPasSceneInfo extends fairygui.GComponent {

	public lbTime: fairygui.GRichTextField;
	public lbInfo: fairygui.GRichTextField;
	public lbBestInfo: fairygui.GRichTextField;
	public n37: fairygui.GGroup;

	public static URL: string = "ui://7a366usafxj42r";

	public static createInstance(): ViewTigPasSceneInfo {
		return <ViewTigPasSceneInfo><any>(fairygui.UIPackage.createObject("zjyw", "ViewTigPasSceneInfo"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;

		this.lbTime = <fairygui.GRichTextField><any>(this.getChild("lbTime"));
		this.lbInfo = <fairygui.GRichTextField><any>(this.getChild("lbInfo"));
		this.lbBestInfo = <fairygui.GRichTextField><any>(this.getChild("lbBestInfo"));

		s.n37 = <fairygui.GGroup><any>(s.getChild("n37"));
		s.n37.x += GGlobal.layerMgr.offx;
		s.setXY(0, 350);
	}

	private updateMyHurt() {
		let s1 = '';
		let s = this;
		let m = GGlobal.modelTigerPass;
		let d = m.batRank;
		if(!d){
			s.lbBestInfo.text = ""
			s.lbInfo.text = ""
			return;
		}
		let empName = null
		let emHurt = null
		for (let i = 0; i < d.length; i++) {
			if (d[i].name != Model_player.voMine.name) {
				empName = d[i].name
				emHurt = d[i].hurt
			}
		}

		s1 += "自己：" + ConfigHelp.getYiWanText(m.myHurt);
		s.lbInfo.text = s1;
		s1 = "";
		if (empName)
			s1 = "雇佣帮手：" + empName + "  " + ConfigHelp.getYiWanText(emHurt);
		else
			s1 = "";	
		s.lbBestInfo.text = s1;
	}
	private _time = 120
	private timeUpdate() {
		let s = this;
		s.pveTime--
		this.lbTime.text = DateUtil.getMSBySecond4(s.pveTime);
	}
	
	public onOpen() {
		let s = this;
		MainUIController.addChildToUI(s, 1);
		s.updateMyHurt();
		GGlobal.modelTigerPass.listen(Model_TigerPass.msg_datas_hurt, s.updateMyHurt, s);
		Timer.instance.listen(s.timeUpdate, s, 1000);

		const id = GGlobal.modelTigerPass.curId;
		const cfg = Config.hlg_323[id];
		s.pveTime = cfg.time;
	}
	pveTime

	public onClose() {
		let s = this;
		MainUIController.removeUI(s);
		GGlobal.modelTigerPass.remove(Model_TigerPass.msg_datas_hurt, s.updateMyHurt, s);
		Timer.instance.remove(s.timeUpdate, s);
	}

	private static _instance: ViewTigPasSceneInfo;
	public static get instance(): ViewTigPasSceneInfo {
		if (!ViewTigPasSceneInfo._instance) ViewTigPasSceneInfo._instance = ViewTigPasSceneInfo.createInstance();
		return ViewTigPasSceneInfo._instance;
	}
}