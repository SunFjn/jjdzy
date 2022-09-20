class View_FunctionNotice_Panel extends UIModalPanel {
	public iconImg: fairygui.GLoader;

	public static URL: string = "ui://7gxkx46w73mn6e";

	public constructor() {
		super();
		this.loadRes();
	}

	protected childrenCreated(): void {
		let s = this;
		s.view = fairygui.UIPackage.createObject("MainUI", "View_FunctionNotice_Panel").asCom;
		s.contentPane = s.view;
		this.iconImg = <fairygui.GLoader><any>(s.view.getChild("iconImg"));
		super.childrenCreated();
		s.addClickListener(s.doHideAnimation, s);
	}

	protected onShown(): void {

	}

	protected onHide(): void {
		GGlobal.layerMgr.close(UIConst.FUNCTIONNOTICE);
		this.tweenHandler();
	}

	private tweenHandler() {
		let s = this;
		let point = s.localToRoot(s.iconImg.x - GGlobal.layerMgr.offx, s.iconImg.y);
		let image = new fairygui.GLoader();
		image.x = point.x;
		image.y = point.y;
		image.url = "ui://7gxkx46w73mn6g";
		GGlobal.layerMgr.UI_OFFLINE.addChild(image);
		let point1 = ViewMainUIBottomUI1.instance.localToRoot(ViewMainUIBottomUI1.instance.angerSkill.x - GGlobal.layerMgr.offx,
			ViewMainUIBottomUI1.instance.angerSkill.y);
		// let num = Math.sqrt(ConfigHelp.dist(point.x, point.y, point1.x, point1.y));
		// if (num < 200) num = 200;
		// if (num > 400) num = 400;
		egret.Tween.get(image).to({ x: point1.x, y: point1.y }, 500).call(function () {
			Model_player.voMine.setAutoSkill(!Model_player.voMine.autoSkill);
			ViewMainUIBottomUI1.instance.updateAuto();
			GGlobal.layerMgr.UI_OFFLINE.removeChild(image);
		}, this).play();
	}
}