/**主角*/class ARPGHero extends ArpgRole {
	private static P: Array<ARPGHero> = [];
	public static create(): ARPGHero {
		return new ARPGHero();//主角不做对象池
	}
	public constructor() {
		super();
		let self = this;
		self.objType = UnitType.HERO;
		self.headGroup.touchChildren = self.headGroup.touchEnabled = false;
	}

	_target: ArpgRole;
	lockTarget: ArpgRole;
	lastTar;
	moveType;
	lockSID = 0;
	lockLength = 0;
	autoMoveID = -1;
	isAutoMove = false;
	autoMoveType = -1;
	isOnJumpPoint = false;
	lTime = 0;

	vo: Vo_ArpgPlayer;
	initData(vo) {
		super.initData(vo);
	}

	public checkPath(): void {
		let mgr = WorldConfigManager;
		let s = this;
		if (mgr.paths && mgr.paths.length) {
			s.lastTar = WorldConfigManager.getVo();
			if (s.lastTar == null) {
				GameUnitManager.hero.isAutoMove = false;
				return;
			}
			s.lockSID = s.lastTar.tarsysid;
			if (mgr.paths.length == 0) {
				let tempNpc = GameUnitManager.findUnit(s.lockSID, UnitType.NPC);
				if (tempNpc) {
					s.target = tempNpc;
					s.lockSID = 0;
				} else {
					s.lockSID = s.lastTar.tarsysid;
					if (s.lastTar.x >= 0 && s.lastTar.y >= 0) {
						if (s.lastTar.dis == -1) {
							s.go(s.lastTar.x, s.lastTar.y, ModelArpgMap.constlockLength);
							GameUnitManager.hero.isAutoMove = true;
						} else {
							s.go(s.lastTar.x, s.lastTar.y);
							GameUnitManager.hero.isAutoMove = true;
						}
					}
				}
			} else {
				s.go(s.lastTar.x, s.lastTar.y);
			}
		}
	}

	protected moveSynchroTime = 0;
	protected move(now: number): void {
		let s = this;
		if (s.move_state == Enum_MoveState.RUN) {
			s.rate = (now - s.lastTime) / s.allTime;
			if (s.rate > 1) {
				if (s._route && s._route.length) {
					s.setRoute(s._route);
				}
				else {
					if (s.end_x != 0 && s.end_y != 0) {
						s.setXY(s.end_x, s.end_y);
						s.setMoveState(Enum_MoveState.STAND);
						s.moveType = 0;
					}
					s.moveEnd();
				}
			} else {
				s.setXY(s.rate * s.dx + s.start_x, s.rate * s.dy + s.start_y);
				if (now - s.moveSynchroTime > 500) {
					s.moveSynchroTime = now;
					ModelArpgMap.getInstance().CG_POINT(s.x, s.y);
				}
			}
			SceneManager.checkTransPoint(this);
		}
	}

	public go(tx: number, ty: number, dis: number = 0): boolean {
		let s = this;
		if (s.moveType == AStar.M_JUMP) {
			return false;
		}

		var nt: number = egret.getTimer();
		if (nt - s.lTime < 200) {
			return false;
		}
		s.lTime = nt;

		if (tx == 0 && ty == 0) {
			try {
				throw new Error("go(0,0)");
			} catch (e) {
			}
		}

		if (s.move_state != Enum_MoveState.STAND && s.move_state != Enum_MoveState.RUN) return false;

		if (AStar._grid) {

			var mt: number = 0;
			if (AStar.checkBlock(s.x, s.y) == true) {
				if (s.move_state != Enum_MoveState.RUN) {
					if (AStar.checkBlock(tx, ty) == false) {
						var path: Array<any> = [[tx, ty, AStar.M_WALK]];
					}
				} else {
					return false;
				}
			} else {
				path = AStar.find(s.x, s.y, tx, ty, mt);
			}
			if (path && s.speed) {
				if (dis) {
					var last: Array<any>;
					if (path.length > 1) {
						last = path[path.length - 1];
						var lastSen: Array<any> = path[path.length - 2];
						if (MathUtil.dist(last[0], last[1], lastSen[0], lastSen[1]) > dis) {
							path.pop();
							var pathRound: number = Math.atan2(last[1] - lastSen[1], last[0] - lastSen[0]);
							var disSqrt: number = Math.sqrt(dis);
							path.push([last[0] - disSqrt * Math.cos(pathRound), last[1] - disSqrt * Math.sin(pathRound)]);
						}
						else {
							path.pop();
						}
					}
					else {
						last = path[path.length - 1];
						if (MathUtil.dist(last[0], last[1], s.x, s.y) >= dis + 1000) {
							// path.pop();
							// pathRound = Math.atan2(ty - s.y, tx - s.x);
							// disSqrt = Math.sqrt(dis);
							// path.push([last[0] - disSqrt * Math.cos(pathRound), last[1] - disSqrt * Math.sin(pathRound)]);
							// path.push([last[0] - disSqrt * Math.cos(pathRound), last[1] - disSqrt * Math.sin(pathRound)]);
						}
						else {
							if (s.lockTarget)
								s.lockTarget.interaction();
							return false;
						}
					}
				}

				var drawpath: Array<any> = path.concat();
				drawpath.unshift([s.x, s.y]);
				ModelArpgMap.getInstance().CG_MOVE([path]);
				s.setRoute(path);
				if (CollectManager.isCollecting) {
					CollectManager.end();
				}
				return true;
			}
		}
		return false;
	}


	public stopAutonMove(): void {
		this.lockTarget = null;
		this.autoMoveID = -1;
		this.autoMoveType = -1;
		WorldConfigManager.paths = [];
	}

	protected moveEnd(): void {
		this.moveOver();
		GameUnitManager.hideFilter();
		ModelArpgMap.getInstance().CG_STOP_MOVE(this.x, this.y);
		if (this.moveEndFunc && this.moveEndObj) {
			this.moveEndFunc.apply(this.moveEndObj)
		}
		//View_SmallMapPanel.instance.clearPath();
	}

	protected moveOver(): void {
		super.moveOver();
		if (this.lockSID != 0) {
			if (this.lastTar == null) {
				this.lockSID = 0;
				return;
			}
			var targetNpc = this.target;
			if (targetNpc && targetNpc instanceof ARPGNpc) {
				targetNpc.interaction();
				this.lockSID = 0;
				return;
			}
		} else if (this.lockTarget) {
			// if (this.checkDis(this.lockTarget)) {
			GameUnitManager.hero.lockTarget.interaction();
			// }
			this.lockSID = 0;
		}
	}

	private checkDis(taget: ArpgRole): boolean {
		var dis: number = MathUtil.dist(this.x, this.y, taget.x, taget.y);
		var Len: number = ModelArpgMap.constlockLength + ModelArpgMap.constlockLengAdd + 30000;
		if (MathUtil.dist(this.x, this.y, taget.x, taget.y) > Len)
			return false;
		else
			return true;
	}

	public set target(value: ArpgRole) {
		let s = this;
		if (!value) {
			if (!(s.lockTarget && (s.lockTarget instanceof ARPGNpc))) s.lockTarget = null;
			s.hideFilter();
			return;
		}

		if (value != s) {
			s._target = value;
			if (value instanceof ARPGHero) {
				s.hideFilter();
				return;
			}
		}

		var dist: number = ModelArpgMap.constlockLength + ModelArpgMap.constlockLengAdd;
		console.log(MathUtil.dist(s.x, s.y, value.x, value.y));
		if (MathUtil.dist(s.x, s.y, value.x, value.y) <= dist) {
			if (s.move_state == Enum_MoveState.RUN)
				s.stopGo();//寻路刚好经过target点击target还会继续走

			value.interaction();
		} else {
			s.lockTarget = value;
			s.lockLength = ModelArpgMap.constlockLength;
			if (HomeModel.inHome) {//为了解决穿模型。。
				var point = ArpgMap.getInstance().mapBlockLayer.globalToLocal(fairygui.GRoot.mouseX, fairygui.GRoot.mouseY);
				if (AStar.checkBlock(s.x, s.y) == true) {
					let targetPoint;
					for (let i = 0; i < 100; i++) {
						point.y += 10 * i;
						if (point.y > MapManager.mapInfo.height) {
							break;
						}
						if (!AStar.checkBlock(point.x, point.y)) {
							targetPoint = point;
							break;
						}
					}

					if (targetPoint) s.go(point.x, point.y, 0);
				} else {
					s.go(point.x, point.y, ModelArpgMap.constlockLength);
				}
			} else {
				s.go(value.x, value.y, ModelArpgMap.constlockLength);
			}
		}
	}

	public get target(): ArpgRole {
		return this._target;
	}

	public update(ctx) {
		super.update(ctx);
		let self = this;
		self.isHero() && CameraManager.wacth(self.x, self.y);
	}

	public showEffect() {
		EffectMgr.addEff("uieff/200013", this.view, 10, 0, 1000, 1000, false);
	}

	public onAdd() {
		super.onAdd();
		let s = this;
		CameraManager.wacth(this.x, this.y);
		s.checkPath();
	}

	public onRemove() {
		super.onRemove();
		let s = this;
		s.setXY(0, 0);
		s._target = null;
		s.lockTarget = null;
		s.lastTar = null;

		s.lockSID = 0;
		s.moveType = 0;
		s.lockLength = 0;
		s.autoMoveID = 0;
		s.autoMoveType = -1;
		s.isAutoMove = false;
		s.isOnJumpPoint = false;
		s.lTime = 0;
	}
}