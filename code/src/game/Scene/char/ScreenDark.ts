class ScreenDark extends DepSprite implements ISceneObject {

	public x = 0;
	public y = 0;
	public h = 0;

	/** 1:通常角色(主角 怪物等) 10:岩石 20:掉落货币*/
	public objType = 0;

	public scene: MapScene;
	public id = 0;

	public static COUNTER = 0;

	/**所在势力队伍 */
	public force = 0;

	public scale: number = 1;

	protected static _ins: ScreenDark;
	public static ins(): ScreenDark {
		if (!this._ins) {
			this._ins = new ScreenDark();
		}
		return this._ins;
	}

	public shp: fairygui.GGraph;
	public constructor() {
		super();
		this.id = SceneObject.COUNTER++;
		this.shp = new fairygui.GGraph();
		this.shp.drawRect(0, 0, 0, 0, 0.7);
		this.addChild(this.shp.displayObject);
	}

	public static show(time = 1500) {
		var instance = ScreenDark.ins();
		if (instance.parent) {
			GGlobal.mapscene.removeUnit(instance);
		}
		instance.show(time);
	}

	public remainLife = 0;
	public show(time) {
		egret.Tween.removeTweens(this);
		if (!this.parent) {
			GGlobal.mapscene.addUnit(this);
			this.alpha = 0;
			egret.Tween.get(this).to({ alpha: 1 }, 200);
		}
		if (time > this.remainLife) {
			this.remainLife = time;
		}
		let sc = 1 / LayerManager.getFullScreenSc();
		this.shp.setSize(App.stage.stageWidth + 4, App.stage.stageHeight + 4);
		this.shp.setScale(sc, sc);
		this.shp.setXY(-2, -2);
	}

	public map: ScrollMap;
	public onAdd() {
		this.map = GGlobal.mapscene.map;
		GGlobal.mapscene.unitLayer.depAddChild(this);

		this.x = this.map.focusx - App.stage.stageWidth / 2;
	}

	public onRemove() {
		GGlobal.mapscene.unitLayer.depRemoveChild(this);
	}

	public update(ctx) {
		var oldtime = this.remainLife;
		this.remainLife -= ctx.dt;
		this.x = this.map.focusx - App.stage.stageWidth / 2;
		if (this.remainLife <= 0) {
			ctx.d = 1;
		} else {
			if (oldtime >= 200 && this.remainLife < 200) {
				egret.Tween.get(this).to({ alpha: 0 }, 200);
			}
		}
	}

	public onEvent(evt, arg) {

	}
}