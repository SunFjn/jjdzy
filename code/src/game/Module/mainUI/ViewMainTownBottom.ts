class ViewMainTownBottom extends BaseSceneUI {
	public constructor() {
		super();
	}

	protected initUI(): void {
		super.initUI();

		this.btnContainer.setXY(4, 8);
		this.btnContainer.setScale(0.9, 0.9);
		this.LayoutType = fairygui.GroupLayoutType.Horizontal;
		this.resetPosition();
	}

	public resetPosition(): void {
		// this.setXY(30, fairygui.GRoot.inst.height - 90 - ViewMainBottomUI.instance.height);
		this.setXY(10, fairygui.GRoot.inst.height - 90 - 121);
	}

	public static _instance: ViewMainTownBottom;
	public static get instance(): ViewMainTownBottom {
		if (!ViewMainTownBottom._instance) ViewMainTownBottom._instance = new ViewMainTownBottom();
		return ViewMainTownBottom._instance;
	}

	//特殊的系统没开放需要显示的不做处理，所以仅仅检查时限的活动
	protected kaifuDayUpdate() {

	}

	/**外部加载完成再进行排序*/
	public aglin() {
		// super.aglin();
		let s = this;
		s.icons.sort(function (a, b) { return a.sortIndex > b.sortIndex ? 1 : -1 });
		let l = s.icons.length;
		let isH = s.LayoutType == fairygui.GroupLayoutType.Horizontal;
		let _x = 0;
		let _y = 0;
		for (let i = 0; i < l; i++) {
			s.icons[i].setXY(_x, _y);
			let mapcfg = Config.map_200[GGlobal.sceneID];
			if (mapcfg && String(mapcfg.icon).indexOf(s.icons[i].panelId + "") != -1) {
				if (s.icons[i].parent) {
					this.btnContainer.removeChild(s.icons[i]);
				}
			} else {
				_x += s.icons[i].width;
				if (i == 7) {
					_x = 0;
					_y = -100;
				}
				this.btnContainer.addChild(s.icons[i]);
			}
		}
		this._yy = _y;
		this._xx = _x;
	}
}