class ArenaExit extends fairygui.GComponent{
	public constructor() {
		super();
		var lb:fairygui.GLabel = new fairygui.GLabel();
		lb.text = "竞技场\n退出";
		this.addChild(lb);

		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchT, this);

		this.x = App.stage.stageWidth - 80;
		this.y = 550;
	}

	protected onTouchT(e) {
		// GGlobal.modelScene.returnMainScene();
	}
}