class RectArea extends AreaBase {
	public constructor() {
		super();
	}

	public x: number;
	public y: number;
	public width: number;
	public height: number;
	public right: number;
	public bottom: number;

	public static pool: any[] = [];

	public checkXY(px: number, py: number): boolean {
		var ret: boolean = px >= this.x && py >= this.y && px <= this.right && py <= this.bottom;
		return ret;
	}

	public reset(px: number, py: number, w: number, h: number): void {
		this.x = px;
		this.y = py;
		this.width = w;
		this.height = h;
		this.right = this.x + w;
		this.bottom = this.y + h;
	}

	public static create(iteminfo: any): RectArea {
		try {
			var jsoninfo: any = JSON.parse(iteminfo.userdata);
			if (jsoninfo.id != undefined) {
				var rect: RectArea = RectArea.pool.length ? RectArea.pool.pop() : new RectArea();
				rect.reset(iteminfo.x, iteminfo.y, iteminfo.width, iteminfo.height);
				rect.areaid = jsoninfo.id;
			}
		} catch (e) {
		}
		return rect;
	}

	public dispose(): void {
		RectArea.pool.push(this);
	}

	public getBound(): egret.Rectangle {
		var ret: egret.Rectangle = new egret.Rectangle();
		ret.x = this.x;
		ret.y = this.y;
		ret.width = this.width;
		ret.height = this.height;
		return ret;
	}

	public getRandomPoint(): egret.Point {
		var ret: egret.Point = new egret.Point();
		ret.x = this.x + Math.random() * this.width;
		ret.y = this.y + Math.random() * this.height;
		return ret;
	}
}