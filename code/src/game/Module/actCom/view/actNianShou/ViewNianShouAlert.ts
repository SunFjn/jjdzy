class ViewNianShouAlert extends UIModalPanel {

	public frame: fairygui.GLabel;
	public vgrid: ItemNianShouGrid;
	public btn: Button1;
	public lbtip: fairygui.GRichTextField;
	public lb: fairygui.GRichTextField;
	public img: fairygui.GLoader;
	public imgYWC: fairygui.GImage;

	public static URL: string = "ui://ht2966i4dsufa";

	public static createInstance(): ViewNianShouAlert {
		return <ViewNianShouAlert><any>(fairygui.UIPackage.createObject("actComNianShou", "ViewNianShouAlert"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let s = this;
		s.view = fairygui.UIPackage.createObject("actComNianShou", "ViewNianShouAlert").asCom;
		s.contentPane = s.view;
		CommonManager.parseChildren(s.view, s);
		super.childrenCreated();
		s.btn.addClickListener(s.onReward, s);
	}

	private _ns: { idx: number, id: number, time: number };
	private _cost;

	protected onShown(): void {
		let s = this;
		s._ns = s._args;
		s.vgrid.setVo(s._args)
		s.imgYWC.visible = false;

		if (s._ns.time <= 0) {
			s.img.visible = false;
			s.lb.text = "";
			s._cost = 0
			s.btn.checkNotice = true;
			GGlobal.model_ActNianShou.remove(Model_ActNianShou.uptime_ns_rew, s.upTime, s);
		} else {
			GGlobal.model_ActNianShou.listen(Model_ActNianShou.uptime_ns_rew, s.upTime, s);
			s.img.visible = true;
			IconUtil.setImg(s.img, Enum_Path.ICON70_URL + Enum_Attr.yuanBao + ".png");
			//消耗
			let cfg = Config.nian_299[s._ns.id]
			s._cost = Number(JSON.parse(cfg.consume)[0][2]);
			s.lb.text = s._cost + ""
			s.btn.checkNotice = false;
		}
		s.upTime();
		s.btn.visible = true;
		GGlobal.model_ActNianShou.listen(Model_ActNianShou.get_ns_reward, s.upGet, s);
	}

	private upTime() {
		let s = this;
		if (s._ns.time <= 0) {
			s.btn.text = "免费开启";
		} else {
			s.btn.text = "直接开启";
		}
	}

	protected onHide(): void {
		let s = this;
		s.vgrid.clean();
		IconUtil.setImg(s.img, null);
		GGlobal.model_ActNianShou.remove(Model_ActNianShou.get_ns_reward, s.upGet, s);
		GGlobal.model_ActNianShou.remove(Model_ActNianShou.uptime_ns_rew, s.upTime, s);
	}

	private upGet() {
		let s = this;
		s.btn.visible = false;
		s.imgYWC.visible = true;
		s.lb.text = "";
		s.img.visible = false;
	}

	private onReward() {
		let s = this;
		if (!s._ns) {
			return;
		}
		if (s._ns.time > 0 && Model_player.voMine.yuanbao < s._cost) {
			ModelChongZhi.guideToRecharge(Handler.create(self, function () {
				s.doHideAnimation();
			}));
			return;
		}
		let yb = s._ns.time > 0 ? 1 : 0
		GGlobal.model_ActNianShou.CG_GET_REWARD_11559(s._ns.idx, yb);
	}
}