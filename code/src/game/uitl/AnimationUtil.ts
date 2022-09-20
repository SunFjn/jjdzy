class AnimationUtil {
	public constructor() {
	}

	/**
	 * grids 格子
	 * t 时间
	*/
	public static gridToBag(grids: fairygui.GObject[], pVoList: IGridImpl[] = null, t = 1000, pShowBg:boolean = true, ease = egret.Ease.backIn) {
		let len = grids.length;
		let retPos = ViewMainBottomUI.instance.getBagRootPos();
		for (let i = 0; i < len; i++) {
			let g: ViewGrid = ViewGrid.create();
			g.bg.visible = pShowBg;
			let source = grids[i];
			if (source instanceof ViewGrid) {
				g.vo = source.vo;
			}
			else {
				if (pVoList) {
					g.vo = pVoList[i];
				}
				else
					continue;
			}
			let startPos = source.localToRoot();
			g.setXY(startPos.x, startPos.y);
			GGlobal.layerMgr.UI_Message.addChild(g);
			egret.Tween.get(g).to({ x: retPos.x, y: retPos.y }, t, ease).call(this.clearGrid, this, [g]);;
		}
	}

	public static clearGrid(g: ViewGrid) {
		if (g && g.parent) {
			g.removeFromParent();
			g.disposePanel();
		}
	}

	/**
	 * grids 格子
	 * t 时间
	*/
	public static grid2ToBag(grids: ViewGrid2[], t = 1500, ease = egret.Ease.backIn) {
		let len = grids.length;
		let retPos = ViewMainBottomUI.instance.getBagRootPos();
		let ax = GGlobal
		for (let i = 0; i < len; i++) {
			let g: ViewGrid2 = ViewGrid2.create();
			let source = grids[i];
			g.vo = source.vo;
			let startPos = source.localToRoot();
			g.setXY(startPos.x - GGlobal.layerMgr.offx, startPos.y);
			GGlobal.layerMgr.UI_Message.addChild(g);
			egret.Tween.get(g).to({ x: retPos.x - GGlobal.layerMgr.offx, y: retPos.y }, t, ease).call(this.clearGrid2, this, [g]);;
		}
	}

	public static clearGrid2(g: ViewGrid2) {
		if (g && g.parent) {
			g.disposeGrid();
		}
	}

	//==============
}