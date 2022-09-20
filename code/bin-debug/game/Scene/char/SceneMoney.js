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
var SceneMoney = (function (_super) {
    __extends(SceneMoney, _super);
    function SceneMoney() {
        var _this = _super.call(this) || this;
        _this.id = SceneObject.COUNTER++;
        _this.img = new fairygui.GLoader();
        _this.addChild(_this.img.displayObject);
        _this.objType = 20;
        _this.lb = new egret.TextField();
        _this.addChild(_this.lb);
        _this.lb.y -= 50;
        _this.lb.size = 12;
        _this.lb.stroke = 1;
        return _this;
    }
    SceneMoney.create = function () {
        return SceneMoney.POOL.length ? SceneMoney.POOL.pop() : new SceneMoney();
    };
    SceneMoney.prototype.onAdd = function () {
        this.state = 0;
        this.d = 0;
        this.scene.unitLayer.depAddChild(this);
    };
    SceneMoney.prototype.onRemove = function () {
        if (this.state == 0) {
            this.scene.unitLayer.depRemoveChild(this);
        }
        if (this.state == 1) {
            egret.Tween.removeTweens(this);
            this.parent.removeChild(this);
        }
        else if (this.state == 2) {
            this.parent.removeChild(this);
        }
        this.state = 0;
        SceneMoney.POOL.push(this);
    };
    SceneMoney.prototype.update = function (ctx) {
        ctx.d = this.d;
    };
    SceneMoney.prototype.onEvent = function (evt, arg) {
    };
    SceneMoney.prototype.setType = function (type) {
        // var cfgAttr = CFG_ATTR;
        // if(!type) {
        // 	type = cfgAttr.yinLiang;
        // }
        if (type === void 0) { type = 0; }
        // if(type == cfgAttr.yinLiang) {//银两
        // 	this.img.source = "MAINUI_json.Icon_001";
        // 	this.img.x = -20;
        // 	this.img.y = -25;
        // }
        // this.lb.textColor = Color.getColorInt(CFG_ATTR.LIB[type].color);
        // this.lb.text = CFG_ATTR.LIB[type].mingcheng;
        // this.lb.x = -this.lb.textWidth / 2;
    };
    SceneMoney.prototype.tweenToHero = function () {
        var self = this;
        if (self.state != 0) {
            return;
        }
        var hero = self.scene.getLifeHero();
        if (hero) {
            self.state = 1;
            var matrix = self.$getConcatenatedMatrix();
            self.scene.unitLayer.depRemoveChild(self);
            self.x = matrix.tx;
            self.y = matrix.ty;
            GGlobal.layerMgr.UI_MainBottom.displayObject.addChild(self);
            var heromatrix = hero.view.$getConcatenatedMatrix();
            var arg2 = SceneMoney.ARG2;
            arg2.x = heromatrix.tx;
            arg2.y = heromatrix.ty;
            egret.Tween.get(self).to(arg2, 600, egret.Ease.circInOut).call(this.onTweened, this).play();
        }
        else {
            this.d = 1;
        }
    };
    SceneMoney.prototype.onTweened = function () {
        this.d = 1;
        this.state = 2;
    };
    SceneMoney.POOL = [];
    //protected static ARG1:any = {};
    SceneMoney.ARG2 = {};
    return SceneMoney;
}(DepSprite));
__reflect(SceneMoney.prototype, "SceneMoney", ["ISceneObject"]);
