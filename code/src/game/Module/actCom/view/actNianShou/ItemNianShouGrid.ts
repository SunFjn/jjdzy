class ItemNianShouGrid extends fairygui.GComponent {

	public grid: ViewGrid;
	public bar: fairygui.GProgressBar;
	public lb: fairygui.GTextField;

	public static URL: string = "ui://ht2966i4dsufc";

	public static createInstance(): ItemNianShouGrid {
		return <ItemNianShouGrid><any>(fairygui.UIPackage.createObject("actComNianShou", "ItemNianShouGrid"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
		s.grid.addClickListener(s.onGrid, s);
	}

	public setVo(v: { idx: number, id: number, time: number }) {
		let s = this;
		s._v = v;
		s._type = 1
		let nsCfg = Config.nian_299[v.id];
		s.grid.isShowEff = true;
		s.grid.tipEnabled = true
		s.grid.vo = ConfigHelp.makeItemListArr(JSON.parse(nsCfg.reward))[0];
		s._max = nsCfg.time
		s.setBarTxt();
		s.bar.visible = true;
		s.lb.visible = false
		if (v.time > 0) {
			GGlobal.model_ActNianShou.listen(Model_ActNianShou.uptime_ns_rew, s.upTime, s);
		} else {
			GGlobal.model_ActNianShou.remove(Model_ActNianShou.uptime_ns_rew, s.upTime, s);
		}
	}

	private upTime() {
		let s = this;
		s.setBarTxt();
	}

	private _v: { idx: number, id: number, time: number };
	private _max
	private _type = 0
	public set vo(v: { idx: number, id: number, time: number }) {
		let s = this;
		s._v = v;
		s._type = 0
		if (v) {
			let nsCfg = Config.nian_299[v.id];
			s.grid.isShowEff = true;
			s.grid.tipEnabled = false
			s.grid.vo = ConfigHelp.makeItemListArr(JSON.parse(nsCfg.reward))[0];
			s._max = nsCfg.time
			s.setBarTxt();
			s.bar.visible = true;
		} else {
			s.grid.isShowEff = false;
			s.grid.tipEnabled = false
			s.grid.vo = null;
			s.bar.visible = false;
		}
		if (v && v.time > 0) {
			GGlobal.model_ActNianShou.listen(Model_ActNianShou.uptime_ns_rew, s.upTime, s);
		} else {
			GGlobal.model_ActNianShou.remove(Model_ActNianShou.uptime_ns_rew, s.upTime, s);
		}
		s.lb.visible = v ? false : true
	}

	private setBarTxt() {
		let s = this;
		s.bar.max = s._max
		s.bar.value = s._v.time
		if (s._v.time > 0) {
			s.grid.checkNotice = false;
			s.bar._titleObject.text = this.getMSBySecond4(s._v.time);
		} else {
			s.grid.checkNotice = s._type == 0 ? true : false;
			s.bar._titleObject.text = "00:00:00";
		}
	}

	/**例如：1天1时1分1秒 */
	public getMSBySecond4(second: number, division: string = null): string {
		var result: string = "";
		var day: number = Math.floor(second / (3600 * 24));
		if (day > 0) {
			result = day + "天";
		}
		var h: number = second % (3600 * 24);
		if (h == 0) {
			return result;
		}

		var hour: number = Math.floor(h / 3600);
		if (hour > 0) {
			if (hour >= 10) {
				result += hour + "时";
			} else {
				result += hour + "时";//去掉0
			}
		}
		var min: number = Math.floor(h % 3600);

		if (min == 0) return result;

		var minu: number = Math.floor(min / 60);
		if (minu > 0) {
			if (minu >= 10) {
				result += minu + "分";
			} else {
				result += "0" + minu + "分";
			}
		}

		var sec: number = Math.floor(min % 60);
		if (day > 0) return result;

		var secon: number = sec;
		if (secon >= 10) {
			result += secon + "秒";
		} else {
			result += "0" + secon + "秒";
		}
		return result;

	}

	public clean() {
		super.clean();
		let s = this;
		s.grid.clean();
		GGlobal.model_ActNianShou.remove(Model_ActNianShou.uptime_ns_rew, s.upTime, s);
	}

	private onGrid() {
		let s = this;
		if (!s._v) {
			return;
		}
		if (s._type == 1) {
			return;
		}
		GGlobal.layerMgr.open(UIConst.ACTCOM_NIANSHOU_ALERT, s._v)
	}
}