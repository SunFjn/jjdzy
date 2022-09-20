class SceneMoney extends DepSprite implements ISceneObject {

	public img: fairygui.GLoader;
	public lb: egret.TextField;

	public static POOL = [];

	public static create() {
		return SceneMoney.POOL.length ? SceneMoney.POOL.pop() : new SceneMoney();
	}

	public constructor() {
		super();
		this.id = SceneObject.COUNTER++;

		this.img = new fairygui.GLoader();
		this.addChild(this.img.displayObject);
		this.objType = 20;

		this.lb = new egret.TextField();
		this.addChild(this.lb);
		this.lb.y -= 50;
		this.lb.size = 12;
		this.lb.stroke = 1;
	}

	public scene: MapScene;
	public objType;

	public x: number;
	public y: number;
	public h: number;
	public id: number;
	public force: number;

	public d;

	public onAdd() {
		this.state = 0;
		this.d = 0;
		this.scene.unitLayer.depAddChild(this);
	}

	public onRemove() {
		if (this.state == 0) {
			this.scene.unitLayer.depRemoveChild(this);
		}
		if (this.state == 1) {
			egret.Tween.removeTweens(this);
			this.parent.removeChild(this);
		} else if (this.state == 2) {
			this.parent.removeChild(this);
		}
		this.state = 0;
		SceneMoney.POOL.push(this);
	}

	public update(ctx) {
		ctx.d = this.d;
	}

	public onEvent(evt, arg) {
	}

	public setType(type: number = 0) {
		// var cfgAttr = CFG_ATTR;
		// if(!type) {
		// 	type = cfgAttr.yinLiang;
		// }

		// if(type == cfgAttr.yinLiang) {//银两
		// 	this.img.source = "MAINUI_json.Icon_001";
		// 	this.img.x = -20;
		// 	this.img.y = -25;
		// }
		// this.lb.textColor = Color.getColorInt(CFG_ATTR.LIB[type].color);
		// this.lb.text = CFG_ATTR.LIB[type].mingcheng;
		// this.lb.x = -this.lb.textWidth / 2;
	}

	protected state: number;
	//protected static ARG1:any = {};
	protected static ARG2: any = {};
	public tweenToHero() {
		var self = this;
		if (self.state != 0) {
			return;
		}
		var hero = self.scene.getLifeHero();
		if (hero) {
			self.state = 1;
			var matrix = self.$getConcatenatedMatrix();
			self.scene.unitLayer.depRemoveChild(self);
			self.x = matrix.tx;
			self.y = matrix.ty;
			(GGlobal.layerMgr.UI_MainBottom.displayObject as egret.DisplayObjectContainer).addChild(self);

			var heromatrix = hero.view.$getConcatenatedMatrix();

			var arg2 = SceneMoney.ARG2;
			arg2.x = heromatrix.tx;
			arg2.y = heromatrix.ty;

			egret.Tween.get(self).to(arg2, 600, egret.Ease.circInOut).call(this.onTweened, this).play();
		} else {
			this.d = 1;
		}
	}

	protected onTweened() {
		this.d = 1;
		this.state = 2;
	}

}