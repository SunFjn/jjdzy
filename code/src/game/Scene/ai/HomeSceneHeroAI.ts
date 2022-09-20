class HomeSceneHeroAI extends HomeScenePlayerAI {
	public constructor() {
		super();
	}

	public aithink(ctx) {
	}

	public update(ctx) {
		super.update(ctx);
	}

	public onAdd() {
		this.role.scene.map.touchEnabled = true;
		this.role.scene.map.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onSceneTouch,this);
	}

	public onRemove() {
		this.role.scene.map.touchEnabled = false;
		this.role.scene.map.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onSceneTouch,this);
	}

	public onEvent(evt, arg) {
	}

	protected onSceneTouch(e:egret.TouchEvent) {
		var view = e.currentTarget;
		this.moveTo(e.localX, e.localY);
	}
}