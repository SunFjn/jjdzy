class MoveUtil {
	public constructor() {
	}

	public static nextPointRet: egret.Point = new egret.Point();
	/**返回的对象请勿持久使用*/
	public static getNextPoint(sx: number, sy: number, dx: number, dy: number, speed: number, near: number = 0) {
		var subx: number = dx - sx;
		var suby: number = dy - sy;
		var nowfar: number = Math.sqrt(subx * subx + suby * suby);

		if (nowfar < near) {
			return null;
		}

		var angle: number = Math.atan2(suby, subx);
		if (near > nowfar - speed) {
			var retx: number = dx - Math.cos(angle) * near;
			var rety: number = dy - Math.sin(angle) * near;
		} else {
			var retx: number = sx + Math.cos(angle) * speed;
			var rety: number = sy + Math.sin(angle) * speed;
		}
		var ret = MoveUtil.nextPointRet;
		ret.x = retx;
		ret.y = rety;
		return ret;
	}

	public static dist(sx: number, sy: number, dx: number, dy: number): number {
		var subx = sx - dx;
		var suby = sy - dy;
		var ret: number = subx * subx + suby * suby;
		return ret;
	}

	public static caculateWay(sx: number, sy: number, ex: number, ey: number): number {
		var subx = ex - sx;
		var suby = ey - sy;
		var a: number = Math.atan2(suby, subx);
		var b: number = (a + Math.PI * (2.625)) % (Math.PI * 2);
		var d: number = Math.floor(b / (Math.PI / 4));
		return d;
	}

	public static distSqrt(sx: number, sy: number, dx: number, dy: number): number {
		var subx = sx - dx;
		var suby = sy - dy;
		var ret: number = Math.sqrt(subx * subx + suby * suby);
		return ret;
	}

	public static getNext(cur: number, dist: number, speed: number): number {
		speed = dist - cur > 0 ? speed : -speed;
		var next = cur + speed;
		if (speed > 0 && next > dist) {
			next = dist;
		} else if (speed < 0 && next < dist) {
			next = dist;
		}
		return next;
	}

	public static caculateAngle(x2, y2, x1, y1) {
		let ret = Math.atan2((y2 - y1) , (x2 - x1))*180/Math.PI;
		return ret; 
	}

}