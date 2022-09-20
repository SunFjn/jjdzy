/**关卡界面右边容器  放置活动预告 功能开放*/
class ViewMainUIRightTipContainer extends fairygui.GComponent {
	public constructor() {
		super();
		GGlobal.control.listen(Enum_MsgType.ONRESIZE, this.setPosition, this);
	}

	private static inst: ViewMainUIRightTipContainer;
	public static getInstance(): ViewMainUIRightTipContainer {
		if (!this.inst) this.inst = new ViewMainUIRightTipContainer();
		return this.inst;
	}

	public setPosition() {
		this.setXY(fairygui.GRoot.inst.width + GGlobal.layerMgr.offx - this.maxWidth, ViewMainTopUI1.instance.height + GGlobal.layerMgr.uiAlign + ViewMainTopUI2.instance.height + 20);
	}

	public maxWidth = 150;
	public itemVec: fairygui.GComponent[] = [];
	public addCompnent(item: fairygui.GComponent, inHead?: boolean) {
		if (this.itemVec.indexOf(item) >= 0) return;
		if (inHead) {
			this.itemVec.unshift(item);
		} else {
			this.itemVec.push(item);
		}
		this.addChild(item);
		this.adjust();
	}

	public removeCompnent(item: fairygui.GComponent) {
		let idx = this.itemVec.indexOf(item);
		if (idx < 0) return;
		this.itemVec.splice(idx, 1);
		item.removeFromParent();
		this.adjust();
	}

	public adjust() {
		let vec = this.itemVec;
		let j = vec.length;
		var startY = 0;
		this.maxWidth = 0;
		for (let i = 0; i < j; i++) {
			let itrem = vec[i];
			let itemWidth = itrem.initWidth;
			this.maxWidth = itemWidth > this.maxWidth ? itemWidth : this.maxWidth;
			let itemx = (this.maxWidth - itemWidth) >> 1;
			itrem.setXY(itemx, startY);
			startY += itrem.height;
			startY += 5;
		}
		this.setPosition();
	}
}