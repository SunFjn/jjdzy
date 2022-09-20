class Door implements ISceneObject {
	public constructor() {
		this.objType = UnitType.PORTAL;
		this.view = new DepSprite();
		this.view.touchEnabled = this.view.touchChildren = false;
	}

	public effect: Part;
	public view: DepSprite;
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

	public mapid: number;

	public static pool: Array<any> = [];
	public static list: Door[] = [];

	onEvent(evt, any) { }
	public onAdd(): void {
		let self = this;
		if (self.effect) {
			EffectMgr.instance.removeEff(self.effect);
		}
		self.effect = EffectMgr.addEff("uieff/transpoint", self.view, 0, 0, 1000);
		self.effect.touchEnabled = false;
		self.effect.getMC().touchEnabled = false;
		ArpgMap.getInstance().mainLayer.depAddChild(self.view);
	}

	public update(ctx): void {
	}

	public onRemove(): void {
		let self = this;
		if (self.effect) {
			EffectMgr.instance.removeEff(self.effect);
		}
		self.effect = null;
		ArpgMap.getInstance().mainLayer.depRemoveChild(self.view);
		let idx = Door.list.indexOf(self);
		if (idx > -1) Door.list.splice(idx, 1);
		Pool.recover("Door", self);
	}

	static create(x, y, mapid) {
		let ret: Door = Pool.getItemByClass("Door", Door);
		ret.x = ret.view.x = x;
		ret.y = ret.view.y = y;
		ret.mapid = mapid;
		if (Door.list.indexOf(ret) == -1) Door.list.push(ret);
		return ret;
	}
}
