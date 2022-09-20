class CircleArea extends AreaBase {
	public constructor() {
		super();
	}

	public x: number;
	public y: number;
	public radius: number;

	public powerradius: number;

	public static pool: any[] = [];

	public checkXY(px: number, py: number): boolean {
		var subx: number = this.x - px;
		var suby: number = this.y - py;
		var ret: boolean = (subx * subx + suby * suby) <= this.powerradius;
		return ret;
	}

	public reset(px: number, py: number, r: number): void {
		this.x = px;
		this.y = py;
		this.radius = r;
		this.powerradius = r * r;
	}

	public static create(iteminfo: any): CircleArea {
		try {
			var jsoninfo: any = JSON.parse(iteminfo.userdata);
			if (jsoninfo.id) {
				var circle: CircleArea = CircleArea.pool.length ? CircleArea.pool.pop() : new CircleArea();
				circle.reset(iteminfo.x, iteminfo.y, iteminfo.radius);
				circle.areaid = jsoninfo.id;
			}
		} catch (e) {
		}
		return circle;
	}

	public dispose(): void {
		CircleArea.pool.push(this);
	}

	public getBound(): egret.Rectangle {
		var ret: egret.Rectangle = new egret.Rectangle();
		ret.x = this.x - this.radius;
		ret.y = this.y - this.radius;
		ret.width = this.radius * 2;
		ret.height = this.radius * 2;
		return ret;
	}

	public getCenter(): egret.Point {
		var point: egret.Point = new egret.Point();
		point.x = this.x;
		point.y = this.y;
		return point;
	}
}