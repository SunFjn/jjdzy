class RoleEffctPlayerPlug {
	public constructor() {
	}

	private static POOL: Array<RoleEffctPlayerPlug> = [];
	public static create() {
		var pool = this.POOL;
		return pool.length ? pool.shift() : new RoleEffctPlayerPlug();
	}

	public autoRemove = 1;//自动移除

	public list: Array<Part> = [];
	public role: SceneCharRole;

	public onAdd() {
	}

	public onRemove() {
		this.role = null;
		var list = this.list;
		var len = list.length;
		if (len > 0) {
			for (var i = list.length - 1; i >= 0; i--) {
				var part = list[i];
				if (part.mc.parent) {
					part.mc.parent.removeChild(part.mc);
				}
				part.dispose();
			}
			list.length = 0;
		}
	}

	public update(ctx) {
		var list = this.list;
		var len = list.length;
		var del = 0;
		for (var i = 0, len = list.length; i < len; i++) {
			var part = list[i];
			part.startTime += ctx.dt;
			var perc = part.startTime / part.aniInterv;
			if (part.repeat) {
				perc = perc - (perc >> 0);
			}
			part.setPec(perc);
			if (part.endTime <= part.startTime) {
				list[i] = null;
				if (part.mc.parent) {
					part.mc.parent.removeChild(part.mc);
				}
				part.dispose();
				del++;
			}
		}
		if (del) {
			ArrayUitl.cleannull(list);
			if (list.length == 0) {//没有特效可播放了
				ctx.d = 1;
			}
		}
	}

	public addEff(key: string, x: number, y: number, interval: number, time: number = -1, repeat = false, act = 1): Part {
		var part = Part.create();
		part.act = act;
		part.setVal(key);
		part.aniInterv = interval;
		part.startTime = 0;
		part.repeat = repeat;
		if (time < 0) {
			time = 9999999999;
		}
		part.endTime = time;

		part.mc.x = x;
		part.mc.y = y;
		this.role.view.addChild(part.mc);
		part.setVal(key);
		part.setAct(act);
		this.list.push(part);
		return part;
	}

	public addEff1(key: string, x: number, y: number, interval: number, time: number = -1, repeat = false, act = 1): Part {
		var part = Part.create();
		part.act = act;
		part.setVal(key);
		part.aniInterv = interval;
		part.startTime = 0;
		part.repeat = repeat;
		if (time < 0) {
			time = 9999999999;
		}
		part.endTime = time;

		part.mc.x = this.role.view.x + x;
		part.mc.y = this.role.view.y + y;
		this.role.scene.map.addChild(part.mc);
		part.setVal(key);
		part.setAct(act);
		this.list.push(part);
		return part;
	}

	public onEvent(evt, arg) {
		var evtsc = EVT_SC;
		if (evt == evtsc.EVT_STACT || evt == evtsc.EVT_THROW) {
			var removed;
			var list = this.list;
			for (var i = 0, len = list.length; i < list.length; i++) {
				var eff = list[i];
				if (eff.removeBreak) {
					eff.dispose();
					list[i] = null;
					if (eff.mc.parent) {
						eff.mc.parent.removeChild(eff.mc);
						removed = 1;
					}
				}
			}
			if (removed) {
				ArrayUitl.cleannull(list);
			}
		}
	}
}