class BaseSceneUI extends fairygui.GComponent {
	public constructor() {
		super();
		this.width = 640;
		this.initUI();
	}

	protected initUI() {
		let s = this;
		s.btnContainer = fairygui.UIObjectFactory.newObject2(fairygui.ObjectType.Component).asCom;
		this.addChild(s.btnContainer);
		s.LayoutType = fairygui.GroupLayoutType.Horizontal;
		s.resetPosition();
		GGlobal.control.listen(Enum_MsgType.KAIFUDAY_UPDATE, s.kaifuDayUpdate, s);
		GGlobal.control.listen(Enum_MsgType.IOS_OPEN_CHANGE, s.kaifuDayUpdate, s);
		GGlobal.control.listen(Enum_MsgType.ONRESIZE, s.resetPosition, s);
	}

	public LayoutType: number = fairygui.GroupLayoutType.Horizontal;
	public btnContainer: fairygui.GComponent;
	public icons: MainMenuBtn[] = [];
	public addMenuIcon(sid, isNotice?: boolean) {
		let s = this;
		if (s.getIcon(sid) != null) return;
		let tb = Config.tubiao_003[sid];
		let cfg = Config.xitong_001[sid];
		let btn = MainMenuBtn.createInstance();
		btn.loadComplete = Handler.create(s, s.aglin);
		let arr: Vo_Activity[] = GGlobal.modelActivity.getGroup(sid);
		let cfg1: Ihuodong_009;
		if (arr && arr.length > 0) {
			let vo: Vo_Activity = arr[0];
			// cfg1 = GGlobal.modelActivity.gethuodong_009(vo.qs,vo.id);
			cfg1 = Config.huodong_009[vo.index];
		}
		if (sid == UIConst.SHOUCHONG) {
			if (GGlobal.modelRecharge.isFirstGet()) {
				btn.setIcon(cfg.icon + "_2");
			} else {
				btn.setIcon(cfg.icon + "_1");
			}
		} else if (cfg1 && cfg1.dicon > 0) {
			btn.setIcon(cfg1.dicon);
		} else {
			btn.setIcon(cfg.icon + "");
		}
		btn.panelId = sid;
		btn.sortIndex = tb.loc;
		btn.checkNotice = isNotice;
		if (tb.spe == 1) {
			btn.showEff(true);
		}
		s.icons.push(btn);

		// //注册红点关联
		// if (sid == UIConst.QICE_STAR) {
		// 	if (btn) {
		// 		ReddotMgr.ins().register(ReddotEnum.GROUP_QICE, btn.noticeImg);
		// 	}
		// }
	}

	public removeMenuIcon(sid) {
		let s = this;
		let l = s.icons.length;
		for (let i = 0; i < l; i++) {
			let t_icon = s.icons[i];
			if (t_icon.panelId == sid) {
				// ReddotMgr.ins().unregister(t_icon);
				t_icon.uidispose();
				s.icons.splice(i, 1);
				break;
			}
		}
		s.aglin();
	}

	public getIcon(sid): MainMenuBtn {
		let s = this;
		let l = s.icons.length;
		for (let i = 0; i < l; i++) {
			if (s.icons[i].panelId == sid) {
				return s.icons[i];
			}
		}
		return null;
	}

	public setIconNotice(sid, isNotice) {
		let btn = this.getIcon(sid);
		if (btn) btn.checkNotice = isNotice;
	}

	public setIconDisImg(sid, bol) {
		let btn = this.getIcon(sid);
		if (btn) btn.checkDisImg = bol;
	}

	protected _xx = 0;
	protected _yy = 0;
	protected maxCount = 7;
	/**外部加载完成再进行排序*/
	public aglin() {
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
				if (isH) {
					_x += s.icons[i].width;
					if (i == 6) {
						_x = 0;
						_y = 100;
					}
				} else {
					_x = (77 - s.icons[i].width) >> 1;
					_y += s.icons[i].height + 10;
				}
				this.btnContainer.addChild(s.icons[i]);
			}
		}
		this._yy = _y;
		this._xx = _x;
	}

	public resetPosition(): void {
	}

	//特殊的系统没开放需要显示的不做处理，所以仅仅检查时限的活动
	protected kaifuDayUpdate() {
		let s = this;
		let l = s.icons.length;
		for (let i = 0; i < l;) {
			let panelid = s.icons[i].panelId;
			if (!ModuleManager.isOpen(panelid)) {
				s.icons[i].uidispose();
				s.icons.splice(i, 1);
				l = s.icons.length;
			} else {
				i++
			}
		}
	}
}