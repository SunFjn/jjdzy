class Box3D {
	public x1 = 0;//left
	public y1 = 0;//front
	public h1 = 0;//bottom

	public x2 = 0;//right
	public y2 = 0;//behine
	public h2 = 0;//top

	protected static _ins: Box3D;
	public static getIns() {
		var ret = Box3D._ins;
		if (!ret) {
			ret = Box3D._ins = new Box3D();
		}
		return ret;
	}

	public static create() {
		var ret: Box3D = new Box3D();
		return ret;
	}

	public setDCXY(dir, cx, cy, ch, x1, y1, h1, x2, y2, h2) {
		var ret: Box3D = this;
		if (dir == 1) {//朝向右边
			ret.x1 = cx + x1;
			ret.y1 = cy + y1;
			ret.h1 = ch + h1;
			ret.x2 = cx + x2;
			ret.y2 = cy + y2;
			ret.h2 = ch + h2;
		} else {//朝向左边
			ret.x1 = cx - x2;
			ret.y1 = cy + y1;
			ret.h1 = ch + h1;
			ret.x2 = cx - x1;
			ret.y2 = cy + y2;
			ret.h2 = ch + h2;
		}
	}

	public hitTest(box3d: Box3D): boolean {
		if (
			this.containsXYZ(box3d.x1, box3d.y1, box3d.h1) ||
			this.containsXYZ(box3d.x2, box3d.y2, box3d.h2)
		) {
			return true;
		}
		return false;
	}

	public containsXYZ(x, y, z): boolean {
		//lefttop
		//leftbottom
		//leftbehine
		//righttop
		//rightbottom
		//rightbehine
		if (
			this.x1 <= x && this.x2 >= x && this.y1 <= y && this.y2 >= y && this.h1 <= z && this.h2 >= z
		) {
			return true;
		}
		return false;
	}

	public constructor() {
	}

	public move(x, y, z) {
		this.x1 += x;
		this.x2 += x;
		this.y1 += y;
		this.y2 += y;
		this.h1 += z;
		this.h2 += z;
	}

	public normalization() {
	}

	public static ROLE3DTESTEnemy(role: SceneCharRole, self: SceneCharRole, box: Box3D) {
		if (role.objType == 1 && role.force && self.force != role.force) {
			return box.containsXYZ(role.x, role.y, role.h);
		}
		return null;
	}
}