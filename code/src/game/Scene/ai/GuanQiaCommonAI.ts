class GuanQiaCommonAI extends CommonAICtrl {

	private static P:GuanQiaCommonAI[] = [];
	public static create() {
		var pool = GuanQiaCommonAI.P;
		return pool.length ? pool.pop() : new GuanQiaCommonAI();
	}

	public constructor() {
		super();
	}

	public onEvent(evt, arg) {
		if(evt == EVT_SC.EVT_THROW) {
			if(this.role.curhp <= 0) {
				this.drop();
			}
		}
		super.onEvent(evt, arg);
	}

	protected drop() {
		var item = SceneMoney.create();
		item.scene = this.role.scene;
		item.x = this.role.x;
		item.y = this.role.y;
		item.dep = -1;
		item.setType();
		this.role.scene.addUnit(item);
	}

	public onRemove() {
		//千万不要 super.onRemove()! 因为GUANQIAAI也有对象池
		GuanQiaCommonAI.P.push(this);
	}
}