class EffectUtil {
	public constructor() {
	}

	/**
	 *str显示图片
	 *parent母体
	 *fontStr 字体在fairyGui的url
	 *x、y初始的xy轴
	 *flyTime播放的时间
	 *offx动画x轴偏移
	 *offy动画y轴偏移
	 *   */
	public static addFlyImg(str: string, parent, fontStr: string, x: number, y: number, flyTime: number = 600, offx = 0, offy = -60): void {
		var img = new flyImgItem();
		img.x = x;
		img.y = y;
		img.showImg(str, fontStr);
		parent.addChild(img);
		egret.Tween.get(img).to({ x: x + offx, y: y + offy, alpha: 0 }, flyTime).call(function () {
			img.removeFromParent();
			img.showImg("", null);
			img = null;
		});
	}
}

class flyImgItem extends fairygui.GComponent {
	public imgText: fairygui.GTextField;
	public constructor() {
		super();
		this.touchable = false;
		this.imgText = new fairygui.GTextField();
		this.addChild(this.imgText);
	}

	public showImg(char: string, fontStr: string): void {
		this.imgText.font = fontStr;
		this.imgText.text = char;
	}
}