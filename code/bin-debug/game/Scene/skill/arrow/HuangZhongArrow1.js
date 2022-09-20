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
var HuangZhongArrow1 = (function (_super) {
    __extends(HuangZhongArrow1, _super);
    function HuangZhongArrow1() {
        var _this = _super.call(this) || this;
        _this.h = 0;
        _this.force = 0;
        _this.updateFunc = null;
        _this.effInterv = 0;
        _this.lifeTime = 0;
        _this.dieTime = 0;
        _this.id = SceneObject.COUNTER++;
        return _this;
    }
    HuangZhongArrow1.LMDROP = function (arrow, ctx) {
        if (arrow.vd == 1) {
            arrow.h += 20;
            if (arrow.h >= 0) {
                arrow.h = 0;
                arrow.vd = 10; //booming
                arrow.eff.setVal("eff/9015");
                arrow.lifeTime = 0;
                arrow.dieTime = 500;
                arrow.eff.mc.rotation = arrow.vc;
            }
            arrow.x += arrow.va;
            arrow.eff.mc.y = arrow.h;
            arrow.lifeTime = 0;
            arrow.eff.setPec(0);
        }
        else {
            arrow.lifeTime += ctx.dt;
            var perc = arrow.lifeTime / arrow.dieTime;
            arrow.eff.setPec(perc);
            if (perc >= 1) {
                ctx.d = 1;
            }
        }
    };
    HuangZhongArrow1.ZY3FUNC = function (arrow, ctx) {
        arrow.lifeTime += ctx.dt;
        if (arrow.lifeTime >= arrow.dieTime) {
            ctx.d = 1;
        }
        else {
            arrow.x += arrow.va;
            arrow.eff.mc.rotation += arrow.vb;
            var perc = arrow.lifeTime / arrow.effInterv;
            perc = perc - (perc >> 0);
            arrow.eff.setPec(perc);
        }
    };
    HuangZhongArrow1.LIFEONLY = function (arrow, ctx) {
        arrow.lifeTime += ctx.dt;
        if (arrow.lifeTime >= arrow.effInterv) {
            ctx.d = 1;
        }
        else {
            var perc = arrow.lifeTime / arrow.effInterv;
            arrow.eff.setPec(perc);
        }
    };
    HuangZhongArrow1.FORWARD = function (arrow, ctx) {
        arrow.lifeTime += ctx.dt;
        if (arrow.lifeTime >= arrow.dieTime) {
            ctx.d = 1;
        }
        else {
            var perc = arrow.lifeTime / arrow.effInterv;
            if (perc > 1) {
                perc = perc - (perc >> 0);
            }
            arrow.eff.setPec(perc);
        }
        arrow.x += arrow.va;
        arrow.y += arrow.vb;
        //arrow.alpha -= 0.01;
    };
    HuangZhongArrow1.HZ1FUNC = function (arrow, ctx) {
        arrow.lifeTime += ctx.dt;
        if (arrow.lifeTime >= arrow.effInterv) {
            ctx.d = 1;
        }
        else {
            arrow.x += arrow.va;
            arrow.alpha -= arrow.vb;
            var perc = arrow.lifeTime / arrow.effInterv;
            arrow.eff.setPec(perc);
        }
    };
    HuangZhongArrow1.ZGL2FUNC = function (arrow, ctx) {
        arrow.lifeTime += ctx.dt;
        if (arrow.lifeTime >= arrow.effInterv) {
            ctx.d = 1;
        }
        else {
            arrow.eff.mc.scaleX += arrow.va;
            arrow.eff.mc.scaleY = arrow.eff.mc.scaleX;
            arrow.alpha -= 0.01;
            var perc = arrow.lifeTime / arrow.effInterv;
            arrow.eff.setPec(perc);
        }
    };
    // public static ZGLTHUNDERFUNC(arrow:HuangZhongArrow1,ctx) {
    // 	arrow.lifeTime += ctx.dt;
    // 	if(arrow.lifeTime >= arrow.effInterv) {
    // 		ctx.d = 1;
    // 	}else{
    // 		arrow.x += arrow.va;
    // 		arrow.y += arrow.vb;
    // 		arrow.alpha -= 0.025;
    // 		var perc = arrow.lifeTime / arrow.vc;
    // 		perc > 1 && (perc = perc - (perc >> 0));
    // 		arrow.eff.setPec(perc);
    // 		arrow.dep = arrow.y + 1;
    // 	}
    // }
    HuangZhongArrow1.ZGLTHUNDERFUNC2 = function (arrow, ctx) {
        arrow.lifeTime += ctx.dt;
        if (arrow.lifeTime >= arrow.dieTime) {
            ctx.d = 1;
        }
        else {
            arrow.vc += 0.05;
            arrow.vd += 6;
            arrow.ve += 3;
            arrow.x = Math.cos(arrow.vc) * arrow.vd + arrow.va;
            arrow.y = Math.sin(arrow.vc) * arrow.ve + arrow.vb;
            arrow.alpha -= 0.025;
            var perc = arrow.lifeTime / arrow.effInterv;
            perc > 1 && (perc = perc - (perc >> 0));
            arrow.eff.setPec(perc);
            arrow.dep = arrow.y + 1;
        }
    };
    HuangZhongArrow1.CLBOSSFUNC = function (arrow, ctx) {
        arrow.lifeTime += ctx.dt;
        if (arrow.lifeTime >= arrow.dieTime) {
            ctx.d = 1;
        }
        else {
            var perc = arrow.lifeTime / arrow.dieTime;
            perc > 1 && (perc = perc - (perc >> 0));
            arrow.eff.setPec(perc);
            if (perc < 0.75) {
                arrow.eff.mc.y = -Math.sin(Math.PI * perc / 0.75) * 50 - (200 * (1 - perc));
            }
            else {
                arrow.eff.mc.y = perc * (arrow.vd - arrow.vb) + arrow.vb;
            }
            var stagex = perc * (arrow.vc - arrow.va) + arrow.va;
            arrow.x = stagex;
            arrow.dep = arrow.y + 1;
        }
    };
    HuangZhongArrow1.CLBOSSFUNC1 = function (arrow, ctx) {
        arrow.lifeTime += ctx.dt;
        if (arrow.lifeTime >= arrow.dieTime) {
            ctx.d = 1;
        }
        else {
            var perc = arrow.lifeTime / arrow.dieTime;
            perc > 1 && (perc = perc - (perc >> 0));
            arrow.eff.setPec(perc);
            arrow.dep = arrow.y + 1;
        }
    };
    HuangZhongArrow1.prototype.initWithRoleFace = function (role, effid, act, interv, isLoop, offx, h, offy, scaleX) {
        if (interv === void 0) { interv = 500; }
        if (offx === void 0) { offx = 0; }
        if (h === void 0) { h = 0; }
        if (offy === void 0) { offy = 0; }
        if (scaleX === void 0) { scaleX = 1; }
        this.effInterv = interv;
        var eff = this.eff = new Part();
        eff.setAct(act);
        eff.setVal(effid);
        eff.setPec(0);
        this.x = role.x + role.faceDir * offx;
        this.y = role.y + offy;
        this.h = h;
        this.eff.mc.y = this.h;
        this.dep = role.y + 1;
        this.lifeTime = 0;
        eff.mc.scaleX = role.faceDir * scaleX;
        this.addChild(eff.mc);
    };
    HuangZhongArrow1.prototype.initXY = function (effid, act, interv, isLoop, x, y, h, scaleX) {
        if (interv === void 0) { interv = 500; }
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (h === void 0) { h = 0; }
        if (scaleX === void 0) { scaleX = 1; }
        this.effInterv = interv;
        var eff = this.eff = new Part();
        eff.setAct(act);
        eff.setVal(effid);
        eff.setPec(0);
        this.x = x;
        this.y = y;
        this.h = h;
        this.eff.mc.y = this.h;
        this.dep = y + 1;
        eff.mc.scaleX = scaleX;
        this.addChild(eff.mc);
    };
    HuangZhongArrow1.prototype.onAdd = function () {
        if (this.isTopObj) {
            this.scene.view.addChild(this);
        }
        else {
            this.scene.unitLayer.depAddChild(this);
        }
    };
    HuangZhongArrow1.prototype.onRemove = function () {
        if (this.eff) {
            this.eff.setVal(null);
        }
        if (this.isTopObj) {
            this.scene.view.removeChild(this);
        }
        else {
            this.scene.unitLayer.depRemoveChild(this);
        }
        this.scene = null;
    };
    HuangZhongArrow1.prototype.update = function (ctx) {
        if (this.updateFunc) {
            this.updateFunc(this, ctx);
        }
    };
    HuangZhongArrow1.prototype.onEvent = function (evt, arg) {
    };
    HuangZhongArrow1.create = function () {
        var ret = new HuangZhongArrow1();
        return ret;
    };
    return HuangZhongArrow1;
}(DepSprite));
__reflect(HuangZhongArrow1.prototype, "HuangZhongArrow1", ["ISceneObject"]);
