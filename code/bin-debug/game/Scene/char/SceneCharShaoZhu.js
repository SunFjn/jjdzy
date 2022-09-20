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
var SceneCharShaoZhu = (function (_super) {
    __extends(SceneCharShaoZhu, _super);
    function SceneCharShaoZhu() {
        var _this = _super.call(this) || this;
        /** 0:怪物角色 1:英雄角色 会用于计算伤害*/ _this.charType = 0;
        _this.movespeed = 9;
        /** -1:朝向左 1:朝向右 */
        _this.faceDir = 1;
        _this.aniTime = 0;
        _this.aniInterv = 1000;
        _this.invalid = 0; // |1：皮肤有更新
        _this.skillList = [];
        _this.plugs = [];
        _this.plugCtx = {};
        _this.body = 1; //皮肤
        _this.attack_state = 0;
        _this.move_state = 0;
        _this.masterID = 0;
        var self = _this;
        self.objType = 2;
        self.view = new DepSprite();
        self.parts = new Parts();
        self.view.addChild(self.parts);
        var shadow = self.shadow = new StaticPart();
        shadow.setVal("s/1");
        shadow.setAct(4);
        self.view.addChild(shadow.mc);
        var body = new Part(PartType.DB);
        body.type = 1;
        body.dep = 5;
        self.parts.addPart(body);
        return _this;
    }
    SceneCharShaoZhu.create = function () {
        var pool = SceneCharShaoZhu.PP;
        return pool.length ? pool.pop() : new SceneCharShaoZhu();
    };
    SceneCharShaoZhu.prototype.update = function (ctx) {
        var self = this;
        var skillList = self.skillList;
        var len = skillList.length;
        for (var i = 0; i < len; i++) {
            var skill = skillList[i];
            var newcd = skill.remaincd - ctx.dt;
            if (newcd < 0) {
                newcd = 0;
            }
            skill.remaincd = newcd;
        }
        var len = self.plugs.length;
        var plugArg = self.plugCtx;
        var plugDirty = 0;
        for (var i = 0; i < len; i++) {
            var plug = self.plugs[i];
            if (!plug) {
                plugDirty++;
                continue;
            }
            plugArg.d = 0;
            plugArg.dt = ctx.dt;
            plug.update(plugArg);
            if (plugArg.d) {
                self.plugs[i] = null;
                plug.onRemove();
                plugDirty++;
            }
            else {
            }
        }
        if (plugDirty) {
            ArrayUitl.cleannull(self.plugs);
        }
        if (self.x < self.scene.left) {
            self.x = self.scene.left + self.force;
        }
        else if (self.x > self.scene.right) {
            self.x = self.scene.right - self.force;
        }
        //updateViewPos
        self.view.x = self.x;
        self.view.y = self.y;
        self.updateState();
        self.aniTime += ctx.dt;
        var perc = self.aniTime / self.aniInterv;
        self.parts.perc = perc;
        self.view.dep = self.y;
    };
    SceneCharShaoZhu.prototype.updateState = function () {
        var s = this;
        var invalid = s.invalid;
        if (invalid) {
            if (invalid & 1) {
                s.updateAction();
            }
            if (invalid & 2) {
                s.updateWay();
            }
            s.invalid = 0;
        }
    };
    SceneCharShaoZhu.prototype.updateAction = function () {
        var self = this;
        var urlkey;
        var actkey = 1;
        var body = self.body;
        if (self.attack_state) {
            if (self.attack_index > 40) {
                urlkey = "body/" + body + "/stand/ani";
            }
            else {
                urlkey = "body/" + body + "/attack_01/ani";
            }
        }
        else {
            if (self.move_state) {
                urlkey = "body/" + body + "/run/ani";
            }
            else {
                urlkey = "body/" + body + "/stand/ani";
            }
            self.parts.ptype = Parts.DIS_REAPEAT;
        }
        if (urlkey) {
            self.parts.setPart(1, urlkey);
        }
        self.parts.setVal(actkey);
    };
    SceneCharShaoZhu.prototype.updateWay = function () {
        var s = this;
        s.parts.scaleY = s.scale;
        if (s.faceDir == 1) {
            s.parts.scaleX = s.scale;
        }
        else {
            s.parts.scaleX = -1 * s.scale;
        }
    };
    SceneCharShaoZhu.prototype.playSkill = function (skillLog, dmgProxy) {
        if (dmgProxy === void 0) { dmgProxy = null; }
        var s = this;
        if (!dmgProxy) {
            if (skillLog.dmgProxy) {
                skillLog.dmgProxy.executeNewTask(skillLog.skill, s, s.scene);
            }
            else {
                dmgProxy = DamageProxy.createByClient(skillLog.skill, s, s.scene);
                skillLog.dmgProxy = dmgProxy;
            }
        }
        Model_battle.hurtRoleArr1 = [];
        s.addPlug(skillLog);
        s.curSkill = skillLog;
        if (Model_battle.battleId > 0 && s.masterID == Model_player.voMine.id) {
            GGlobal.modelbattle.CG_PLAYER_USESKILL(s.curSkill.skill.id);
        }
    };
    SceneCharShaoZhu.prototype.setBody = function (v) {
        var s = this;
        if (s.body != v) {
            s.body = v;
            s.invalid |= 1;
        }
    };
    SceneCharShaoZhu.prototype.addPlug = function (plug) {
        this.plugs.push(plug);
        plug.onAdd();
    };
    SceneCharShaoZhu.prototype.removePlug = function (plug) {
        var s = this;
        var index = s.plugs.indexOf(plug);
        if (true) {
            if (index == -1) {
                throw new Error("plugIndexError");
            }
        }
        s.plugs[index] = null;
        plug.onRemove();
    };
    SceneCharShaoZhu.prototype.onAdd = function () {
        var s = this;
        s.invalid |= 1;
        s.scene.unitLayer.depAddChild(s.view);
        s.view.visible = true;
    };
    SceneCharShaoZhu.prototype.onRemove = function () {
        var s = this;
        if (s.curSkill) {
            s.removePlug(s.curSkill);
        }
        for (var i = s.plugs.length - 1; i >= 0; i--) {
            var plug = s.plugs[i];
            if (plug && plug.autoRemove) {
                s.removePlug(plug);
            }
        }
        s.skillList = [];
        s.scene.unitLayer.depRemoveChild(s.view);
        s.view.alpha = 1;
        s.view.dep = -1;
        s.h = 0;
        s.invalid |= 255;
        s.parts.setPart(1, null);
        if (SceneCharShaoZhu.PP.indexOf(this) == -1)
            SceneCharShaoZhu.PP.push(this);
    };
    SceneCharShaoZhu.PP = [];
    return SceneCharShaoZhu;
}(SceneCharRole));
__reflect(SceneCharShaoZhu.prototype, "SceneCharShaoZhu");
