var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**主角*/ var ARPGHero = (function (_super) {
    __extends(ARPGHero, _super);
    function ARPGHero() {
        var _this = _super.call(this) || this;
        _this.lockSID = 0;
        _this.lockLength = 0;
        _this.autoMoveID = -1;
        _this.isAutoMove = false;
        _this.autoMoveType = -1;
        _this.isOnJumpPoint = false;
        _this.lTime = 0;
        _this.moveSynchroTime = 0;
        var self = _this;
        self.objType = UnitType.HERO;
        self.headGroup.touchChildren = self.headGroup.touchEnabled = false;
        return _this;
    }
    ARPGHero.create = function () {
        return new ARPGHero(); //主角不做对象池
    };
    ARPGHero.prototype.initData = function (vo) {
        _super.prototype.initData.call(this, vo);
    };
    ARPGHero.prototype.checkPath = function () {
        var mgr = WorldConfigManager;
        var s = this;
        if (mgr.paths && mgr.paths.length) {
            s.lastTar = WorldConfigManager.getVo();
            if (s.lastTar == null) {
                GameUnitManager.hero.isAutoMove = false;
                return;
            }
            s.lockSID = s.lastTar.tarsysid;
            if (mgr.paths.length == 0) {
                var tempNpc = GameUnitManager.findUnit(s.lockSID, UnitType.NPC);
                if (tempNpc) {
                    s.target = tempNpc;
                    s.lockSID = 0;
                }
                else {
                    s.lockSID = s.lastTar.tarsysid;
                    if (s.lastTar.x >= 0 && s.lastTar.y >= 0) {
                        if (s.lastTar.dis == -1) {
                            s.go(s.lastTar.x, s.lastTar.y, ModelArpgMap.constlockLength);
                            GameUnitManager.hero.isAutoMove = true;
                        }
                        else {
                            s.go(s.lastTar.x, s.lastTar.y);
                            GameUnitManager.hero.isAutoMove = true;
                        }
                    }
                }
            }
            else {
                s.go(s.lastTar.x, s.lastTar.y);
            }
        }
    };
    ARPGHero.prototype.move = function (now) {
        var s = this;
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
            }
            else {
                s.setXY(s.rate * s.dx + s.start_x, s.rate * s.dy + s.start_y);
                if (now - s.moveSynchroTime > 500) {
                    s.moveSynchroTime = now;
                    ModelArpgMap.getInstance().CG_POINT(s.x, s.y);
                }
            }
            SceneManager.checkTransPoint(this);
        }
    };
    ARPGHero.prototype.go = function (tx, ty, dis) {
        if (dis === void 0) { dis = 0; }
        var s = this;
        if (s.moveType == AStar.M_JUMP) {
            return false;
        }
        var nt = egret.getTimer();
        if (nt - s.lTime < 200) {
            return false;
        }
        s.lTime = nt;
        if (tx == 0 && ty == 0) {
            try {
                throw new Error("go(0,0)");
            }
            catch (e) {
            }
        }
        if (s.move_state != Enum_MoveState.STAND && s.move_state != Enum_MoveState.RUN)
            return false;
        if (AStar._grid) {
            var mt = 0;
            if (AStar.checkBlock(s.x, s.y) == true) {
                if (s.move_state != Enum_MoveState.RUN) {
                    if (AStar.checkBlock(tx, ty) == false) {
                        var path = [[tx, ty, AStar.M_WALK]];
                    }
                }
                else {
                    return false;
                }
            }
            else {
                path = AStar.find(s.x, s.y, tx, ty, mt);
            }
            if (path && s.speed) {
                if (dis) {
                    var last;
                    if (path.length > 1) {
                        last = path[path.length - 1];
                        var lastSen = path[path.length - 2];
                        if (MathUtil.dist(last[0], last[1], lastSen[0], lastSen[1]) > dis) {
                            path.pop();
                            var pathRound = Math.atan2(last[1] - lastSen[1], last[0] - lastSen[0]);
                            var disSqrt = Math.sqrt(dis);
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
                var drawpath = path.concat();
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
    };
    ARPGHero.prototype.stopAutonMove = function () {
        this.lockTarget = null;
        this.autoMoveID = -1;
        this.autoMoveType = -1;
        WorldConfigManager.paths = [];
    };
    ARPGHero.prototype.moveEnd = function () {
        this.moveOver();
        GameUnitManager.hideFilter();
        ModelArpgMap.getInstance().CG_STOP_MOVE(this.x, this.y);
        if (this.moveEndFunc && this.moveEndObj) {
            this.moveEndFunc.apply(this.moveEndObj);
        }
        //View_SmallMapPanel.instance.clearPath();
    };
    ARPGHero.prototype.moveOver = function () {
        _super.prototype.moveOver.call(this);
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
        }
        else if (this.lockTarget) {
            // if (this.checkDis(this.lockTarget)) {
            GameUnitManager.hero.lockTarget.interaction();
            // }
            this.lockSID = 0;
        }
    };
    ARPGHero.prototype.checkDis = function (taget) {
        var dis = MathUtil.dist(this.x, this.y, taget.x, taget.y);
        var Len = ModelArpgMap.constlockLength + ModelArpgMap.constlockLengAdd + 30000;
        if (MathUtil.dist(this.x, this.y, taget.x, taget.y) > Len)
            return false;
        else
            return true;
    };
    Object.defineProperty(ARPGHero.prototype, "target", {
        get: function () {
            return this._target;
        },
        set: function (value) {
            var s = this;
            if (!value) {
                if (!(s.lockTarget && (s.lockTarget instanceof ARPGNpc)))
                    s.lockTarget = null;
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
            var dist = ModelArpgMap.constlockLength + ModelArpgMap.constlockLengAdd;
            console.log(MathUtil.dist(s.x, s.y, value.x, value.y));
            if (MathUtil.dist(s.x, s.y, value.x, value.y) <= dist) {
                if (s.move_state == Enum_MoveState.RUN)
                    s.stopGo(); //寻路刚好经过target点击target还会继续走
                value.interaction();
            }
            else {
                s.lockTarget = value;
                s.lockLength = ModelArpgMap.constlockLength;
                if (HomeModel.inHome) {
                    var point = ArpgMap.getInstance().mapBlockLayer.globalToLocal(fairygui.GRoot.mouseX, fairygui.GRoot.mouseY);
                    if (AStar.checkBlock(s.x, s.y) == true) {
                        var targetPoint = void 0;
                        for (var i = 0; i < 100; i++) {
                            point.y += 10 * i;
                            if (point.y > MapManager.mapInfo.height) {
                                break;
                            }
                            if (!AStar.checkBlock(point.x, point.y)) {
                                targetPoint = point;
                                break;
                            }
                        }
                        if (targetPoint)
                            s.go(point.x, point.y, 0);
                    }
                    else {
                        s.go(point.x, point.y, ModelArpgMap.constlockLength);
                    }
                }
                else {
                    s.go(value.x, value.y, ModelArpgMap.constlockLength);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    ARPGHero.prototype.update = function (ctx) {
        _super.prototype.update.call(this, ctx);
        var self = this;
        self.isHero() && CameraManager.wacth(self.x, self.y);
    };
    ARPGHero.prototype.showEffect = function () {
        EffectMgr.addEff("uieff/200013", this.view, 10, 0, 1000, 1000, false);
    };
    ARPGHero.prototype.onAdd = function () {
        _super.prototype.onAdd.call(this);
        var s = this;
        CameraManager.wacth(this.x, this.y);
        s.checkPath();
    };
    ARPGHero.prototype.onRemove = function () {
        _super.prototype.onRemove.call(this);
        var s = this;
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
    };
    ARPGHero.P = [];
    return ARPGHero;
}(ArpgRole));
__reflect(ARPGHero.prototype, "ARPGHero");
