class MapDecoration {
	public constructor() {
	}
	sortIdx;
	dead;
	col;//在第几屏显示
	isSleep = 1;
	x = 0;
	y = 0;
	offx = 0;
	cx = 0;
	speed = 0;
	rebornTime = 0;
	pic: fairygui.GLoader;
	parent;
	add(data, parent, i) {
		let s = this;
		s.sortIdx = i;
		s.dead = 0;
		if (!s.pic) {
			s.pic = new fairygui.GLoader();
		}
		s.parent = parent;
		parent.addChildAt(s.pic.displayObject, i);
		ImageLoader.instance.loader("resource/map/decoration/" + data.a + ".png", s.pic);
		s.x = data.x + GGlobal.layerMgr.offx;
		s.y = data.y;
		s.col = data.c;
		s.speed = data.t;
		s.rebornTime = egret.getTimer();
	}

	canCreate(x) {
		let s = this;
		let mx = s.x;
		let ix = Math.abs(x) % 1600;
		if (mx >= ix && mx <= ix + 640) {
			return true;
		}
		return false;
	}

	checkSleep() {
		let mx = this.pic.x;
		if (mx > GGlobal.layerMgr.offx-200) {
			return false;
		}
		return true;
	}

	move(x) {
		let s = this;
		if (s.dead) return;
		let now = egret.getTimer();
		if (s.isSleep) {
			if (s.canCreate(x)) {
				s.active();
				let offx = 640 + GGlobal.layerMgr.offx;
				if (x < offx && s.x < offx) {//首屏的话哈哈哈
					s.pic.setXY(s.x, s.y);
				} else {
					s.pic.setXY(offx, s.y);
				}
			}
		} else {
			if (s.checkSleep()) {
				s.sleep();
			} else {
				let x = s.pic.x - s.speed * (now - s.rebornTime) / 1000;
				s.rebornTime = now;
				s.pic.setXY(x, s.y);
			}
		}
	}

	active() {
		let s = this;
		s.isSleep = 0;
		if (!s.pic) {
			s.pic = new fairygui.GLoader();
		}
		s.rebornTime = egret.getTimer();
		s.parent.addChildAt(s.pic.displayObject, s.sortIdx);
	}

	sleep() {
		let s = this;
		s.isSleep |= 1;
		if (this.pic && this.pic.displayObject && this.pic.displayObject.parent) {
			this.pic.displayObject.parent.removeChild(this.pic.displayObject);
		}
	}

	dispose() {
		if (this.dead) return;
		this.dead = 1;
		this.col = -1;
		this.isSleep = 1;
		if (this.pic) {
			this.pic.removeFromParent();
		}
	}

	getChild() {
		return this.pic.displayObject;
	}
}