class AreaBatch extends AreaBase {
	public areas: any[] = [];

	public top: number = 0;
	public left: number = 0;
	public bottom: number = 0;
	public right: number = 0;

	public static pool: any[] = [];
	public constructor() {
		super();
	}

	public addArea(area: AreaBase): void {
		var areaBound: egret.Rectangle = area.getBound();
		if (areaBound.left < this.left) {
			this.left = areaBound.left;
		}
		if (areaBound.right > this.right) {
			this.right = areaBound.right;
		}

		if (areaBound.top < this.top) {
			this.top = areaBound.top;
		}
		if (areaBound.bottom > this.bottom) {
			this.bottom = areaBound.bottom;
		}

		this.areas.push(area);
	}

	public reset(): void {
		this.left = this.top = Number.MAX_VALUE;
		this.right = this.bottom = Number.MIN_VALUE;
	}

	public checkXY(px: number, py: number): boolean {
		var ret: boolean;
		if (px >= this.left && px < this.right && py >= this.top && py < this.bottom) {
			for (var i = 0; i < this.areas.length; i++) {
				let area = this.areas[i];
				if (area.checkXY(px, py) == true) {
					ret = true;
					break;
				}
			}
		}
		return ret;
	}

	/**
	 * @param px
	 * @param py 
	 * @return null不在区域内 
	 */
	public getZoneData(px: number, py: number): any {
		var ret: any;
		if (px >= this.left && px < this.right && py >= this.top && py < this.bottom) {
			for (var i = 0; i < this.areas.length; i++) {
				let area: AreaBase = this.areas[i];
				if (area.checkXY(px, py) == true) {
					ret = area.userData;
					if (ret == null) {
						ret = {};
					}
					break;
				}
			}
		}
		return ret;
	}

	public static createWithTypeID(id: string): AreaBatch {
		var ret: AreaBatch = AreaBatch.pool.length ? AreaBatch.pool.pop() : new AreaBatch();
		ret.reset();
		ret.areaid = id;
		return ret;
	}

	public dispose(): void {
		for (var i = 0; i < this.areas.length; i++) {
			let area: AreaBase = this.areas[i];
			area.dispose();
		}
		this.areas.length = 0;
		AreaBatch.pool.push(this);
	}

	public getCenter(): egret.Point {
		var ret: egret.Point;
		if (this.areas.length == 1) {
			ret = (this.areas[0] as AreaBase).getCenter();
		}
		return ret;
	}
}