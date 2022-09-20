class SceneHitBox implements ISceneObject {

	public static create(box3d, scene: MapScene) {
		if (!GGlobal.mapscene.showHitBox) {
			return;
		}
		var ret = new SceneHitBox();
		ret.setBox(box3d);
		scene.addUnit(ret);
	}

	public scene: MapScene;
	public objType = 0;

	public id: number;

	public force = 0;

	public x = 0;
	public y = 0;
	public h = 0;

	public lifetime;

	public shape = new egret.Shape();
	public view: DepSprite = new DepSprite();

	public constructor() {
		this.id = SceneObject.COUNTER++;
		this.view.addChild(this.shape);
	}

	public onAdd() {
		this.lifetime = 0;
		this.scene.unitLayer.depAddChild(this.view);
	}

	public onRemove() {
		this.scene.unitLayer.depRemoveChild(this.view);
	}

	public update(ctx) {
		this.lifetime += ctx.dt;
		this.view.alpha -= 0.04;
		if (this.lifetime >= 800) {
			ctx.d = 1;
			return;
		}
	}

	public onEvent(evt, arg) {

	}

	public setBox(box3d: Box3D) {
		this.shape.graphics.beginFill(0x00ff00, 0.3);
		this.shape.graphics.lineStyle(1, 0);
		this.shape.graphics.moveTo(box3d.x1, box3d.y1);
		this.shape.graphics.lineTo(box3d.x2, box3d.y1);
		this.shape.graphics.lineTo(box3d.x2, box3d.y2);
		this.shape.graphics.lineTo(box3d.x1, box3d.y2);
		this.shape.graphics.lineTo(box3d.x1, box3d.y1);
	}
}