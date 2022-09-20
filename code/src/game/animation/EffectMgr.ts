class EffectMgr {
	public constructor() {
	}

	public eff: EffectMgr;

	public list: Part[] = [];
	public invalid: number = 0;
	public timeout: number;

	/** 添加一个特效
	 * @KEY 例如：eff/zy_3
	 * @parent 容器
	 * @x @y 位置
	 * @interval 特效单次播放时间（毫秒）
	 * @time 特效生命时长(毫秒),如果为-1则认为无限时(需要手动移除！)
	 * @repeat 是否重复播放
	 * @act 资源中的动作名字，一般用1，具体可以到 resource/model/eff/文件夹下面的JSON文件查看动作名
	 */
	public static addEff(key: string, parent: egret.DisplayObjectContainer, x = 0, y = 0, interval = 1000, time: number = -1, repeat: boolean = true, act: any = 1, partType: PartType = PartType.MC): Part {
		var ret = this.instance.addEff1(key, parent, x, y, interval, time, repeat, act, partType);
		return ret;
	}
	public static instance: EffectMgr;

	public addEff1(key: string, parent: egret.DisplayObjectContainer, x: number, y: number, interval: number, time: number, repeat: boolean, act: any, partType: PartType): Part {
		let ids: Array<string>;
		let id: string = null;
		if (partType == PartType.DB) {
			console.log("11111111111111111111111");
			ids = key.split("/");
			id = ids[1];
		}
		var ret = Part.create(partType);
		ret.act = act;
		if (id) {
			ret.setVal(key, id);
		} else {
			ret.setVal(key);
		}
		ret.aniInterv = interval;
		ret.startTime = egret.getTimer();
		ret.repeat = repeat;
		if (time != -1) {
			ret.endTime = ret.startTime + time;
		} else {
			ret.endTime = Number.MAX_VALUE;
		}

		if (this.list.length == 0) {
			Timer.instance.listen(this.update, this, 100);
			if (this.timeout) {
				clearTimeout(this.timeout);
				this.timeout = 0;
			}
		}
		ret.mc.x = x;
		ret.mc.y = y;
		parent.addChild(ret.mc);
		this.list.push(ret);

		return ret;
	}

	public removeEff(eff: Part) {
		var self = this;
		var index = self.list.indexOf(eff);
		if (index != -1) {
			self.list[index] = null;
			if (!(self.invalid & 1)) {
				self.invalid |= 1;
				self.timeout = setTimeout(function () {
					ArrayUitl.cleannull(self.list);
					if (self.list.length == 0) {
						Timer.instance.remove(self.update, self);
					}
					self.invalid = 0;
					clearTimeout(self.timeout);
					self.timeout = 0;
				}, 1000);
			}
		}
		if (eff.mc.parent) {
			eff.mc.parent.removeChild(eff.mc);
		}
		eff.dispose();
	}

	private last = 0;
	public update(e: egret.Event) {
		var now = egret.getTimer();
		if (now - this.last >= 70) {
			this.last = now;
		}
		var list = this.list;
		for (var i = 0, len = list.length; i < len; i++) {
			var part = list[i];
			if (!part) {
				continue;
			}
			if (now > part.endTime) {
				this.removeEff(part);
				continue;
			}
			var perc = (now - part.startTime) / part.aniInterv;
			if (perc > 1) {
				if (part.repeat) {
					perc = perc - (perc >> 0);
				} else {
					perc = 1;
				}
			}
			part.setPec(perc);
		}
	}

}