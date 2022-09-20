class SceneHpView extends DepSprite implements ISceneObject {
	public h = 0;

	public scene: MapScene;
	public objType = 0;
	public id = "hp0";
	public force = 0;

	public imgText: fairygui.GTextField;
	public imgText1: fairygui.GTextField;

	public dead;

	public timeCounter = 0;

	public static POOL = [];
	public static create(): SceneHpView {
		var pool = SceneHpView.POOL;
		if (pool.length) {
			return pool.shift();
		}
		return new SceneHpView();
	}

	public init(x: number, y: number, dmg, iscrit: boolean = false, isHit: boolean = false, isLianJi = false, isShield: boolean = false) {
		var s = this;
		s.imgText1.visible = false;
		var text: string = "";
		if (!isHit) {
			text = "z";
			s.imgText.font = "ui://jvxpx9emog7992";
			s.dep = 100000001;
		} else if (iscrit) {
			text = "" + dmg;
			if (isShield) {
				s.imgText.font = "ui://jvxpx9emrzhj3eu";
				s.imgText1.font = "ui://jvxpx9emrzhj3eu";
				s.imgText1.text = "D";
				s.dep = 100000001;
				s.imgText1.visible = true;
			} else {
				s.imgText.font = "ui://jvxpx9emog799d";
				if (isLianJi) {
					s.imgText1.text = "L";
					s.imgText1.font = "ui://jvxpx9emog7992";
				} else {
					s.imgText1.text = "t";
					s.imgText1.font = "ui://jvxpx9emog799d";
				}
				s.dep = 100000001;
				s.imgText1.visible = true;
			}
		} else {
			text = "" + dmg;
			if (isShield) {
				s.imgText.font = "ui://jvxpx9emrzhj3eu";
				s.imgText1.font = "ui://jvxpx9emrzhj3eu";
				s.imgText1.text = "D";
				s.dep = 100000001;
				s.imgText1.visible = true;
			} else {
				if (isLianJi) {
					s.imgText1.text = "L";
					s.imgText1.visible = true;
					s.imgText1.font = "ui://jvxpx9emog7992";
				}
				s.imgText.font = "ui://jvxpx9emog7992";
				s.dep = 100000000;
			}
		}

		s.dead = 0;
		s.imgText.text = text;
		s.x = x + MathUtil.rndNum(-40, 40);
		s.y = y + MathUtil.rndNum(-40, 40);
		s.alpha = 1;
		s.anchorOffsetX = this.imgText.textWidth / 2;
		s.anchorOffsetY = 25;

		var arg3 = s.TWEENARG3;
		arg3.x = s.x + 50;
		arg3.alpha = 0;

		egret.Tween.get(s)
			.to(SceneHpView.TWEENARG1, 150, egret.Ease.sineIn)
			.to(SceneHpView.TWEENARG2, 100, egret.Ease.sineOut)
			.to({ y: s.y - 50 }, 400, egret.Ease.sineIn)
			.to(arg3, 500, egret.Ease.sineIn)
			.call(s.onComp, s);
	}

	/**主角被打文字 */
	public init2(x: number, y: number, dmg, iscrit: boolean = false, isHit: boolean = false, isLianJi = false, isShield: boolean = false) {
		var s = this;

		this.dead = 0;
		var text;
		s.imgText1.visible = false;
		if (!isHit) {
			text = 'z';
			s.imgText.font = "ui://jvxpx9emog7992";
		} else if (iscrit) {
			text = "" + dmg;
			if (isShield) {
				s.imgText.font = "ui://jvxpx9emrzhj3ev";
				s.imgText1.font = "ui://jvxpx9emrzhj3ev";
				s.imgText1.text = "S";
				s.dep = 100000001;
				s.imgText1.visible = true;
			} else {
				s.imgText.font = "ui://jvxpx9emog799d";
				if (isLianJi) {
					s.imgText1.text = "L";
					s.imgText1.font = "ui://jvxpx9emog7992";
				} else {
					s.imgText1.text = "t";
					s.imgText1.font = "ui://jvxpx9emog799d";
				}
				s.imgText1.visible = true;
			}
		} else {
			text = "" + dmg;
			if (isShield) {
				s.imgText.font = "ui://jvxpx9emrzhj3ev";
				s.imgText1.font = "ui://jvxpx9emrzhj3ev";
				s.imgText1.text = "S";
				s.dep = 100000001;
				s.imgText1.visible = true;
			} else {
				if (isLianJi) {
					s.imgText1.text = "L";
					s.imgText1.font = "ui://jvxpx9emog7992";
					s.imgText1.visible = true;
				}
				s.imgText.font = "ui://jvxpx9emobg13b3";
			}
		}
		s.imgText.text = text + "";
		s.x = x + MathUtil.rndNum(-40, 40);
		s.y = y + MathUtil.rndNum(-40, 40);
		s.alpha = 1;
		s.anchorOffsetX = s.imgText.textWidth / 2;
		s.anchorOffsetY = 25;

		var arg3 = s.TWEENARG3;
		arg3.x = s.x - 50;
		arg3.alpha = 0.5;

		egret.Tween.get(s)
			.to(SceneHpView.TWEENARG1, 150, egret.Ease.sineIn)
			.to(SceneHpView.TWEENARG2, 100, egret.Ease.sineOut)
			.wait(500)
			.to(arg3, 200)
			.call(s.onComp, s);

		s.dep = 100000000;
	}

	/**少主打人文字 */
	public init3(x: number, y: number, dmg, isHit: boolean = false) {
		var s = this;

		this.dead = 0;
		var text;
		s.imgText1.visible = false;
		if (!isHit) {
			text = 'z';
			s.imgText.font = "ui://jvxpx9emog7992";
		} else {
			text = "" + dmg;
			s.imgText.font = "ui://7gxkx46wkd8fb6y";
		}
		s.imgText.text = text + "";
		s.x = x + MathUtil.rndNum(-40, 40);
		s.y = y + MathUtil.rndNum(-40, 40);
		s.alpha = 1;
		s.anchorOffsetX = s.imgText.textWidth / 2;
		s.anchorOffsetY = 25;

		var arg3 = s.TWEENARG3;
		arg3.x = s.x - 50;
		arg3.alpha = 0.5;

		egret.Tween.get(s)
			.to(SceneHpView.TWEENARG1, 150, egret.Ease.sineIn)
			.to(SceneHpView.TWEENARG2, 100, egret.Ease.sineOut)
			.wait(500)
			.to(arg3, 200)
			.call(s.onComp, s);
		s.dep = 100000000;
	}

	/**主角被麻痹 */
	public init2Dizz(x: number, y: number) {
		var self = this;

		this.dead = 0;
		var text = "D";
		self.imgText1.visible = false;
		self.imgText.text = text;
		self.x = x;
		self.y = y;
		self.alpha = 1;
		self.anchorOffsetX = self.imgText.textWidth / 2;
		self.anchorOffsetY = 25;

		var arg3 = self.TWEENARG3;
		arg3.x = self.x - 50;
		arg3.alpha = 0.5;

		egret.Tween.get(self)
			.to(SceneHpView.TWEENARG1, 150, egret.Ease.sineIn)
			.to(SceneHpView.TWEENARG2, 100, egret.Ease.sineOut)
			.wait(500)
			.to(arg3, 200)
			.call(self.onComp, self);

		self.dep = 100000002;
	}

	/**非主角被麻痹 */
	public initDizz(x: number, y: number) {
		var self = this;

		this.dead = 0;
		var text = "d";
		self.imgText1.visible = false;
		self.imgText.text = text;
		self.x = x;
		self.y = y;
		self.alpha = 1;
		self.anchorOffsetX = self.imgText.textWidth / 2;
		self.anchorOffsetY = 25;

		var arg3 = self.TWEENARG3;
		arg3.x = self.x + 50;
		arg3.alpha = 0.5;

		egret.Tween.get(self)
			.to(SceneHpView.TWEENARG1, 150, egret.Ease.sineIn)
			.to(SceneHpView.TWEENARG2, 100, egret.Ease.sineOut)
			.wait(500)
			.to(arg3, 200)
			.call(self.onComp, self);

		self.dep = 100000002;
	}

	public static CRITEASE(perc: number): number {
		// if(perc == 1) {
		// 	var p = perc * Math.PI;
		// 	var r =  Math.sin(perc * Math.PI);
		// }
		return Math.sin(perc * Math.PI);
	}

	public constructor() {
		super();
		this.id = "hp"+SceneObject.COUNTER++;

		this.imgText = new fairygui.GTextField();
		this.addChild(this.imgText.displayObject);

		this.imgText1 = new fairygui.GTextField();
		this.addChild(this.imgText1.displayObject);
		this.imgText1.setXY(-137, -44);
	}

	public static count: number = 0;
	public static TWEENARG1 = { scaleX: 1.5, scaleY: 1.5 };
	public static TWEENARG2 = { scaleX: 1, scaleY: 1 };
	public TWEENARG3: any = {};
	public onAdd() {
		var self = this;
		self.scaleX = self.scaleY = 1;
		//egret.Tween.get(self).to({scaleX:1,scaleY:1},100,egret.Ease.sineInOut).to({scaleX:0.6,scaleY:0.6},200).wait(500).to({x:self.x+50,alpha:0.5},200).call(self.onComp,self);

		self.dead = 0;
		SceneHpView.count++;
		self.scene.unitLayer.depAddChild(self);
	}

	public onRemove() {
		if (!this.dead) {
			egret.Tween.removeTweens(this);
		}
		SceneHpView.count--;
		this.scene.unitLayer.depRemoveChild(this);
		SceneHpView.POOL.push(this);
	}

	protected onComp() {
		this.dead = 1;
	}

	public update(ctx) {
		ctx.d = this.dead;
	}

	public onEvent(evt, arg) {

	}
}