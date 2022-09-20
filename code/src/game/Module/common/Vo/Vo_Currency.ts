class Vo_Currency implements IGridImpl {
	public constructor() {
	}

	public static create(type: number): Vo_Currency {
		var ret: Vo_Currency = new Vo_Currency();
		ret.initLib(type);
		return ret;
	}

	sid: number;
	id: number;
	icon: string;
	quality: number;
	count: number = 1;
	cfg: any;
	type: number;
	useType: number;
	name: string;
	gType: number;
	level: number;
	/**标识 1额外0默认*/
	extra: number;
	tipEnable: boolean;
	showEffect: boolean = false;
	paixu: number;

	showCount: boolean = false;

	get qColor(): number {
		return Color.QUALITYCOLOR[this.quality];
	}

	public initLib(type: number): void {
		this.gType = Number(type);
		this.cfg = Config.jssx_002[type];
		this.name = this.cfg.name;
		this.quality = this.cfg.color;
		this.icon = this.cfg.icon;
		this.cfg = Config.daoju_204[type];
		this.id = this.cfg.id;

		if (this.quality >= 5) {
			this.showEffect = true;
		}
	}
}