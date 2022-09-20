class View_MapPanel extends UIModalPanel {

	public mapName: fairygui.GRichTextField;

	public static URL: string = "ui://jvxpx9em73mn3e1";
	public constructor() {
		super();
		this.loadRes();
	}

	protected childrenCreated(): void {
		let s = this;
		s.isShowMask = false;
		s.isShowOpenAnimation = false;
		s.view = fairygui.UIPackage.createObject("common", "View_MapPanel").asCom;
		s.contentPane = s.view;
		this.mapName = <fairygui.GRichTextField><any>(s.view.getChild("mapName"));
		this.touchable = false;
		super.childrenCreated();
	}

	public updateShow() {
		let s = this;
		if (s._mapName) {
			s.mapName.text = s._mapName;
		} else {
			let mapcfg = Config.map_200[GGlobal.sceneID];
			if (mapcfg && mapcfg.name != "0") {
				s.mapName.text = mapcfg.name;
			} else {
				s.mapName.text = "";
			}
		}
		s.y = 250;
	}

	public resetPosition(): void {
		super.resetPosition();
		this.y = 250;
	}

	private _mapName;
	protected onShown(): void {
		let self = this;
		if (self._args) {
			self._mapName = self._args.mapName;
			self.mapName.strokeColor = 0x000000;
			self.mapName.stroke = self._args.stroke ? 1 : 0;
		}else{
			self.mapName.stroke = 0;
		}
		self.updateShow();
		GGlobal.control.listen(Enum_MsgType.ONRESIZE, self.resetPosition, self);
	}

	protected onHide(): void {
		let self = this;
		self._mapName = null;
		GGlobal.layerMgr.close(UIConst.MAP);
		GGlobal.control.remove(Enum_MsgType.ONRESIZE, self.resetPosition, self);
	}

	public static show() {
		let mapcfg = Config.map_200[GGlobal.sceneID];
		if (mapcfg && mapcfg.name != "0") {
			if (GGlobal.layerMgr.isOpenView(UIConst.MAP)) {
				GGlobal.layerMgr.getView(UIConst.MAP).updateShow();
			} else {
				GGlobal.layerMgr.open(UIConst.MAP);
			}
		} else {
			GGlobal.layerMgr.close2(UIConst.MAP);
		}
	}
}