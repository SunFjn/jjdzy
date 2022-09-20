class ArpgPlayer extends ArpgRole {
	public constructor() {
		super();
		this.objType = UnitType.PLAYER;
	}

	static list = {};
	public onAdd() {
		super.onAdd();
		ArpgPlayer.list[this.id] = this;
	}

	public onRemove() {
		delete ArpgPlayer.list[this.id];
		super.onRemove();
		Pool.recover("ArpgPlayer", this);
	}

	public setXY(xx, yy, force = false) {
		this.x = xx;
		this.y = yy;
		if (force) {
			this.view.x = this.x;
			this.view.y = this.y;
		}
	}
}