class DepSprite extends egret.DisplayObjectContainer {
	public constructor() {
		super();
	}

	public dep = 0;
	public list: Array<DepSprite> = [];

	public childIndex = -1;

	/**NULL计数器dirtyCount */
	protected dc = 0;

	public depAddChild(sp: DepSprite) {
		var list = this.list;
		if (this.dc) {
			ArrayUitl.cleannull(list);
			this.dc = 0;
		}
		var rightindex = list.length - 1;
		var leftindex = 0;
		var minIndex = (leftindex + rightindex) / 2 >> 0;
		while (leftindex < rightindex) {
			var min = list[minIndex];
			if (sp.dep > min.dep) {
				leftindex = minIndex + 1;
			} else if (sp.dep < min.dep) {
				rightindex = minIndex - 1;
			} else {
				break;
			}
			minIndex = (leftindex + rightindex) / 2 >> 0;
		}
		super.addChildAt(sp, minIndex);
		ArrayUitl.insert(list, sp, minIndex);
		sp.childIndex = minIndex;
	}

	public depRemoveChild(sp: DepSprite) {
		super.removeChild(sp);
		var index = this.list.indexOf(sp);
		this.list[index] = null;

		this.dc++;
		if (this.dc >= 5) {
			ArrayUitl.cleannull(this.list);
			this.dc = 0;
		}
	}

	public sortChild() {
		var list = this.list;
		list.sort(this.sortFunc);
		var len = list.length;
		for (var i = 0; i < len;) {
			var sp: DepSprite = list[i];
			if (sp) {
				if (this.$children.indexOf(sp) != i) {
					sp.childIndex = i;
					this.setChildIndex(sp, i);
				}
				i++;
			} else {
				len--;
			}
		}
	}

	public sortFunc(a: DepSprite, b: DepSprite): number {
		if (!a) {
			return 1;
		}
		if (!b) {
			return -1;
		}
		return a.dep - b.dep;
	}
}