class AreaBase {
	public constructor() {
	}

	public type: string;
	public areaid: string;
	public ident: number = 0;
	public userData: any;

	public static createIndex: number = 0;
	public checkXY(px: number, py: number): boolean {
		return false;
	}

	public static create(info: any): AreaBase {
		var ret: AreaBase;
		if (info.userdata == null || info.userdata == "") {
		} if (info.type == "rect") {
			ret = RectArea.create(info);
		} else if (info.type == "point") {
			ret = CircleArea.create(info);
		}
		if (ret) {
			ret.ident = AreaBase.createIndex++;
			ret.userData = info;
		}
		return ret;
	}

	public dispose(): void {
	}

	public getBound(): egret.Rectangle {
		return null;
	}

	public getRandomPoint(): egret.Point {
		return null;
	}

	public getCenter(): egret.Point {
		return null;
	}
}