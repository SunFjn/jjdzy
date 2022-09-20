class Magic extends DepSprite implements ISceneObject {
	public constructor() {
		super();
	}

	public effect;
	scene: MapScene;

	/**类别 0:不参与游戏逻辑的东东 1:角色*/
	objType;

	x;
	y;
	h;
	/**id */
	id;
	/**所在势力队伍 */
	force;

	isMine():boolean{return false}


	public static targerID: number;
	public static toX: number;
	public static toY: number;

	public static CITY: number = 1; //主城
	public static FUBEN: number = 2; //副本

	public linkID: number;
	public toX: number;
	public toY: number;
	public door_type: number;				//传送点类型

	public static pool: Array<any> = [];
	public static list: Array<any> = [];

	public parts: Parts;

	private beginTime: number;
	private totalTime: number = 800;
	private isFirst: Boolean = true;
	onAdd() {
		if (this.effect) {
			EffectMgr.instance.removeEff(this.effect);
		}
		// this.effect = EffectMgr.addEff();
	}
	onRemove() { }
	update(ctx) { }
	onEvent(evt, any) { }


	public show(): void {
		// var point = GameScene.mapLayer.globalToLocal(fairygui.GRoot.mouseX, fairygui.GRoot.mouseY);
		// this.global_x = point.x;
		// this.global_y = point.y;
		// if (this.isFirst)
		// 	this.isFirst = false;
		// else {
		// 	super.show();
		// 	this.beginTime = egret.getTimer();
		// 	this.effect.beginTime = egret.getTimer();
		// 	this.visible = true;
		// }
	}

	// public update(now: number): void {
	// 	if (!this.visible)
	// 		return;

	// 	if (now - this.beginTime > this.totalTime)
	// 		this.visible = false;
	// }

	// public renderParts(now: number, delta: number): void {
	// 	this.effect.update(now);
	// }

	// public disposeUnit(): void {
	// 	super.disposeUnit();
	// 	this.isFirst = true;
	// }
}
