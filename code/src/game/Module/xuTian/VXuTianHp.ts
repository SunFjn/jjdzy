class VXuTianHp extends fairygui.GComponent {

	public static POOL = [];
	public static create(): VXuTianHp {
		var pool = VXuTianHp.POOL;
		if (pool.length) {
			return pool.shift();
		}
		return new VXuTianHp();
	}

	public init(x: number, y: number, dmg, iscrit: boolean = false, isHit: boolean = false, isLianJi = false, isShield: boolean = false) {
		var s = this;
		s.imgText1.visible = false;
		var text: string = "";
		if (!isHit) {
			text = "z";
			s.imgText.font = "ui://jvxpx9emog7992";
		} else if (iscrit) {
			text = "" + dmg;
			if (isShield) {
				s.imgText.font = "ui://jvxpx9emrzhj3eu";
				s.imgText1.font = "ui://jvxpx9emrzhj3eu";
				s.imgText1.text = "D";
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
				s.imgText.font = "ui://jvxpx9emrzhj3eu";
				s.imgText1.font = "ui://jvxpx9emrzhj3eu";
				s.imgText1.text = "D";
				s.imgText1.visible = true;
			} else {
				if (isLianJi) {
					s.imgText1.text = "L";
					s.imgText1.visible = true;
					s.imgText1.font = "ui://jvxpx9emog7992";
				}
				s.imgText.font = "ui://jvxpx9emog7992";
			}
		}

		s.imgText.text = text;
		s.x = x + MathUtil.rndNum(-40, 40);
		s.y = y + MathUtil.rndNum(-40, 40);
		s.alpha = 1;

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
	imgText
	imgText1
	public constructor() {
		super();

		this.imgText = new fairygui.GTextField();
		this.addChild(this.imgText);

		this.imgText1 = new fairygui.GTextField();
		this.addChild(this.imgText1);
		this.imgText1.setXY(-137, -44);
	}

	public TWEENARG3: any = {};
	public onAdd(pa) {
		var self = this;
		self.scaleX = self.scaleY = 1;
		pa.addChild(self);
	}

	public onRemove() {
		egret.Tween.removeTweens(this);
		this.parent.removeChild(this);
		VNianShouHp.POOL.push(this);
	}

	protected onComp() {
		this.onRemove()
	}



}