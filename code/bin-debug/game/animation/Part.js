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
var Part = (function (_super) {
    __extends(Part, _super);
    function Part(type) {
        if (type === void 0) { type = PartType.MC; }
        var _this = _super.call(this) || this;
        _this.dep = 0;
        _this.body = null;
        _this.act = 0;
        _this.actDic = null;
        if (type == PartType.MC) {
            //序列帧
            _this.mc = new egret.MovieClip();
        }
        else if (type == PartType.DB) {
            //龙骨
            _this.mc = new egret.Sprite();
            console.log("创建龙骨！");
        }
        _this.partType = type;
        return _this;
    }
    Part.create = function (partType) {
        if (partType === void 0) { partType = PartType.MC; }
        var ret = Part.POOL.length ? Part.POOL.pop() : new Part(partType);
        ret.partType = partType;
        if (true) {
            ret.isDispose = null;
        }
        return ret;
    };
    Part.prototype.setVal = function (v, body) {
        if (body === void 0) { body = null; }
        // if((v as string).indexOf("/eff/")){
        // 	console.log("2222222");
        // }
        var self = this;
        var action;
        if (this.partType == PartType.DB && v) {
            var vlist = v.split("/");
            v = vlist[0] + "/" + vlist[1];
            action = vlist[2];
            if (action == "ani") {
                action = "idle";
            }
        }
        if (v != self.val) {
            if (self.res) {
                var useindex = self.res.useParts.indexOf(self);
                self.res.useParts.splice(useindex, 1);
                //GGlobal.mcMgr.reduceRes(this.val);
                GGlobal.resMgr.reduceRes(self.val);
            }
            self.val = v;
            if (v) {
                //this.res = GGlobal.mcMgr.refRes(v);
                if (self.body == null || self.body == undefined || self.body != body) {
                    if (this.type != Parts.T_WEAPON) {
                        //龙骨动画 武器和人物一起了
                        if (this.partType == PartType.DB) {
                            console.log("需要加载龙骨" + v);
                        }
                        self.res = GGlobal.resMgr.refRes(v, this.partType);
                        self.res.useParts.push(this);
                        self.buildmc();
                    }
                }
            }
            else {
                self.res = null;
                self.mc.visible = false;
                self.mc.scaleX = self.mc.scaleY = 1;
                self.mc.x = self.mc.y = 0;
            }
        }
        else {
            if (this.partType == PartType.DB) {
                if (this.dbDis) {
                    this.dbDis.animation.play(this.actTran(action));
                }
            }
        }
    };
    Part.prototype.setAct = function (v) {
        if (this.act != v) {
            this.act = v;
            this.buildmc();
            if (this.partType == PartType.DB && this.body) {
                console.log("this.body" + this.body);
            }
        }
    };
    Part.prototype.setPec = function (v) {
        //v时间 进度
        var self = this;
        if (self.mc instanceof egret.MovieClip) {
            if (self.res && self.res.ready && self.mc.movieClipData.frames.length > 0) {
                var curFrame = 1 + (v * self.mc.$totalFrames) >> 0;
                //this.mc.currentFrame = curFrame;
                if (self._curFrm != curFrame) {
                    try {
                        if (self.mc.$movieClipData.frames[curFrame - 1] && self.mc.$movieClipData.getTextureByFrame(curFrame)) {
                            self.mc.gotoAndStop(curFrame);
                        }
                        self._curFrm = curFrame;
                    }
                    catch (e) {
                        console.error("资源报错：" + e + self.res.jsonUrl);
                    }
                }
            }
        }
        if (self.mc instanceof egret.Sprite) {
            if (this.dbDis && this.dbDis.armature && this.dbDis.armature.clock.contains(this.dbDis.armature) == false) {
                this.dbDis.armature.clock.add(this.dbDis.armature);
            }
            // this.dbDis.animation.play(this.actTran(this.act));
        }
    };
    Part.prototype.buildmc = function () {
        if (this.mc instanceof egret.MovieClip) {
            if (this.res && this.res.factory) {
                // this.act  对应 1.受击2.浮空3.受击倒地4.死亡5.起身 */
                var movieClipData = this.res.factory.generateMovieClipData(this.act);
                try {
                    this.mc.movieClipData = movieClipData;
                    this.mc.visible = true;
                }
                catch (e) {
                }
            }
            else {
            }
        }
        else if (this.mc instanceof egret.Sprite) {
            if (this.res && this.res.dbfactory) {
                // this.act  对应 1.受击2.浮空3.受击倒地4.死亡5.起身 */
                if (this.dbDis) {
                    this.dbDis.animation.play(this.actTran(this.act));
                    this.dbDis.armature.clock.add(this.dbDis.armature);
                    // console.log("this.act="+this.act);
                    return;
                }
                this.dbDis = this.res.dbfactory.buildArmatureDisplay("armatureName");
                this.dbDis.animation.play(this.actTran(this.act));
                this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFormStage, this);
                try {
                    this.mc.addChild(this.dbDis);
                    this.mc.visible = true;
                }
                catch (e) {
                }
            }
            else {
            }
        }
    };
    Part.prototype.actTran = function (act) {
        if (this.actDic == null) {
            this.actDic = {
                attack01: "attack",
                attack02: "attack1",
                attack03: "attack",
                fire: "hurt",
                hurt: "hurt",
                ice: "hurt",
                jump: "run",
                posion: "die",
                ride: "取消坐骑动作",
                ride_st: "取消坐骑动作",
                run: "run", rush: "attack",
                skill_01: "skill3",
                skill_02: "skill1",
                skill_03: "skill2",
                skill_04: "skill1",
                stand: "idle",
                thunder: "hurt",
                use_01: "win1",
                use_02: "win1"
            };
        }
        return this.actDic[act];
    };
    Part.prototype.dispose = function () {
        var self = this;
        if (true) {
            if (self.isDispose) {
                console.error("错误的释放PART:" + self.val);
            }
            self.isDispose = true;
        }
        if (this.dbDis) {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFormStage, this);
            // this.dbDis.animation.stop();
            // this.dbDis.animation.reset();
            // this.dbDis.animation.returnToPool();
            this.dbDis.armature.clock.remove(this.dbDis.armature);
            // this.dbDis.dbClear();
            // if (this.dbDis.parent) this.dbDis.parent.removeChild(this.dbDis);
            this.dbDis = null;
        }
        self.removeBreak = null;
        self.parts = null;
        if (self.refThis && self.refKey) {
            self.refThis[self.refKey] = null;
            self.refThis = null;
            self.refKey = null;
        }
        self.mc.visible = false;
        self.mc.scaleX = self.mc.scaleY = 1;
        self.mc.x = this.mc.y = 0;
        self.setVal(null, null);
        this.body = null;
        //self.mc.currentFrameLabel = null;
        self.dep = 0;
        Part.POOL.push(self);
        this.partType = 1;
    };
    Part.prototype.setVisible = function (v) {
        this.mc.visible = v;
        this.visible = v;
    };
    Part.prototype.getMC = function () {
        return this.mc;
    };
    Part.prototype.onRemoveFormStage = function (event) {
        if (this.dbDis) {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFormStage, this);
            // this.dbDis.animation.stop();
            // this.dbDis.animation.reset();
            // this.dbDis.animation.returnToPool();
            this.dbDis.armature.clock.remove(this.dbDis.armature);
            // this.dbDis.dbClear();
            // if (this.dbDis.parent) this.dbDis.parent.removeChild(this.dbDis);
            this.dbDis = null;
        }
    };
    //作为特效时的数据 ---]
    Part.POOL = [];
    return Part;
}(egret.DisplayObject));
__reflect(Part.prototype, "Part");
/**
 *部件类型
 */
var PartType;
(function (PartType) {
    PartType[PartType["MC"] = 1] = "MC";
    PartType[PartType["DB"] = 2] = "DB"; //龙骨
})(PartType || (PartType = {}));
