class RoadItem extends fairygui.GComponent {
	public item1: ItemGQDetail;
	public item2: ItemGQDetail;
	public item3: ItemGQDetail;
	public head: ViewHead;
	public loader: fairygui.GLoader;

	/**item */
	private itemArr: ItemGQDetail[];
	/**数据 */
	private voDatas: RoadItemVO[];
	/**当前所在list 的item的序号 */
	private index: number;

	/**当前的头像所在的位置 */
	private curPos: number;

	/**当前头像需要移动到达的位置 */
	private pos: number;

	/**是否需要播放动画 */
	private isNeedPlayAnimation: boolean = false;

	private posArr = [{ x: 40, y: 120 }, { x: 180, y: 285 }, { x: 430, y: 150 }, { x: -209, y: 150 }, { x: 630, y: 50 }];

	public static URL: string = "ui://qxuksu69ir1y2h";

	public static createInstance(): RoadItem {
		return <RoadItem><any>(fairygui.UIPackage.createObject("guanqiaMap", "RoadItem"));
	}

	public constructor() {
		super();
		this.displayObject.addEventListener(egret.Event.ADDED_TO_STAGE, this.onShown, this);
		this.displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onHidden, this);

	}

	private onShown() {
		GGlobal.modelGuanQia.listen(ModelGuanQia.msg_moveTween, this.moveTween, this);
	}

	private onHidden() {
		GGlobal.modelGuanQia.remove(ModelGuanQia.msg_moveTween, this.moveTween, this);
	}


	private moveTween(arg) {
		this.index = arg.index; //当前的item
		this.pos = arg.pos;
		if (this.voDatas[0].index == this.index) {
			let toPos;
			if (this.pos === 0) { //从视图外面到达左边的位置
				this.head.setXY(this.posArr[3].x, this.posArr[3].y);
				toPos = this.posArr[0];
			} else if (this.pos == 1) {	//从左边到达中间的位置
				toPos = this.posArr[1];
			} else if (this.pos == 2) {	//从中间到达右边的位置  
				toPos = this.posArr[2];
			}
			egret.Tween.get(this.head).to({ x: toPos.x, y: toPos.y }, 1000).call(() => {
				//GGlobal.modelGuanQia.notify(ModelGuanQia.msg_addEffect); 
				GGlobal.layerMgr.close2(UIConst.GUANQIAMAP);
			}, this);
		}
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		this.itemArr = [];

		this.itemArr[0] = this.item1;
		this.itemArr[1] = this.item2;
		this.itemArr[2] = this.item3;
	}

	public setData(data) {
		let self = this;
		IconUtil.setImg(self.loader, "resource/image/back/chuangGuanBg.jpg");
		self.isNeedPlayAnimation = false;
		self.voDatas = (data as RoadItemVO[]);
		self.setVisible(3, false);
		self.setVisible(self.voDatas.length, true);
		self.setHeadPos();
		self.playAnimation();
	}

	private playAnimation() {
		this.releaseAnimation(false);
		if (ModelGuanQia.hasPassed()) {
			for (let i = 0; i < this.voDatas.length; i++) {
				if (this.voDatas[i].ID == ModelGuanQia.curGQID + 1) {
					this.itemArr[i].setGuard(true);
				}
			}
		}
	}

	/**根据数据的长度设置item显示的个数 */
	private setVisible(length: number, isVisible) {
		for (let i = 0; i < length; i++) {
			this.itemArr[i].visible = isVisible;
		}
	}

	private setHeadPos() {
		this.head.visible = false;
		for (let i = 0; i < this.voDatas.length; i++) {
			this.itemArr[i].setData(this.voDatas[i]);
			if (this.voDatas[i].ID == ModelGuanQia.curGQID) {
				this.head.visible = true;
				if ((this.voDatas[i].ID) == ModelGuanQia.curGQID - 1) {
					this.isNeedPlayAnimation = true;
				}
				this.head.setXY(this.posArr[i].x, this.posArr[i].y);
				this.head.setdata(Model_Setting.headId);
			}
		}
	}

	public clean() {
		let self = this;
		self.releaseAnimation(false);
		IconUtil.setImg(self.loader, "resource/image/back/chuangGuanBg.jpg");
		for (let i = 0; i < this.itemArr.length; i++) {
			self.itemArr[i].clean();
		}
	}

	private releaseAnimation(isRelease: boolean) {
		for (let i = 0; i < this.itemArr.length; i++) {
			this.itemArr[i].setGuard(isRelease);
		}
	}
}