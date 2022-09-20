class VXuTianHunt extends fairygui.GComponent {

	public grid: ViewGrid;
	public buf: fairygui.GLoader
	public awaUI: fairygui.GLoader

	public static URL: string = "ui://j0lk55yeg53a4";

	public static createInstance(): VXuTianHunt {
		return <VXuTianHunt><any>(fairygui.UIPackage.createObject("xuTian", "VXuTianHunt"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		let s = this;
		CommonManager.parseChildren(s, s);
	}
	public awatar: Part;

	public vo: { type: number, id: number, cfgId: number };
	public cfgWith;
	private _mx;
	public setVo(v: { type: number, id: number, cfgId: number }) {
		let s = this;
		s.vo = v
		if (v.type == 1) {
			s.setVoId(v.cfgId)
		} else {
			s.setVoBuf(v.cfgId)
		}
	}

	private setVoBuf(bufId) {
		let s = this;
		let buf = Config.xtwlbf_776[bufId];
		let bufArr = JSON.parse(buf.buff)[0]
		s._mx = buf.mx
		s._frozen = true;
		s.unFrozen()
		s.buf.url = CommonManager.getUrl("xuTian", "buf" + buf.lx)
		s.buf.visible = true;
		s.grid.visible = false
		s.cfgWith = Config.xtwlmx_776[buf.mx].jl
	}

	public setVoId(huntId) {
		let s = this;
		let hunt = Config.xtwl_776[huntId]
		let item = ConfigHelp.makeItemListArr(JSON.parse(hunt.jl))[0];
		s.grid.vo = item;
		s.grid.visible = true
		s.buf.visible = false;
		s._mx = hunt.mx
		s._frozen = true;
		s.unFrozen()
		s.cfgWith = Config.xtwlmx_776[hunt.mx].jl
	}

	public clean(): void {
		let self = this;
		self.grid.clean()
		if (self.awatar) {
			EffectMgr.instance.removeEff(self.awatar);
			self.awatar = null;
		}
	}
	private _frozen: boolean = false;
	//设置冰冻
	public setFrozen() {
		let s = this;
		if (s._frozen) {
			return;
		}
		s._frozen = true;
		if (s.awatar) {
			EffectMgr.instance.removeEff(s.awatar);
			s.awatar = null;
		}
		if (s.vo.type == 1) {
			s.awatar = EffectMgr.addEff("body/" + s._mx + "/ride_st/ani", s.awaUI.displayObject as fairygui.UIContainer,
				s.width / 2, s.height + 160, 1000, -1, true);
		} else {
			s.awatar = EffectMgr.addEff("body/" + s._mx + "/stand/ani", s.awaUI.displayObject as fairygui.UIContainer,
				s.width / 2, s.height + 100, 1000, -1, true);
			s.awatar.mc.scaleX = s.awatar.mc.scaleY = 2;
		}
	}
	//解除冰冻
	public unFrozen() {
		let s = this;
		if (!s._frozen) {
			return;
		}
		s._frozen = false;
		if (s.awatar) {
			EffectMgr.instance.removeEff(s.awatar);
			s.awatar = null;
		}
		if (s.vo.type == 1) {
			s.awatar = EffectMgr.addEff("body/" + s._mx + "/ride/ani", s.awaUI.displayObject as fairygui.UIContainer,
				s.width / 2, s.height + 160, 1000, -1, true);
		} else {
			s.awatar = EffectMgr.addEff("body/" + s._mx + "/run/ani", s.awaUI.displayObject as fairygui.UIContainer,
				s.width / 2, s.height + 100, 1000, -1, true);
			s.awatar.mc.scaleX = s.awatar.mc.scaleY = 2;
		}
	}
}
