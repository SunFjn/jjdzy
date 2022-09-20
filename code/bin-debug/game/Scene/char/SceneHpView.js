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
var SceneHpView = (function (_super) {
    __extends(SceneHpView, _super);
    function SceneHpView() {
        var _this = _super.call(this) || this;
        _this.h = 0;
        _this.objType = 0;
        _this.id = "hp0";
        _this.force = 0;
        _this.timeCounter = 0;
        _this.TWEENARG3 = {};
        _this.id = "hp" + SceneObject.COUNTER++;
        _this.imgText = new fairygui.GTextField();
        _this.addChild(_this.imgText.displayObject);
        _this.imgText1 = new fairygui.GTextField();
        _this.addChild(_this.imgText1.displayObject);
        _this.imgText1.setXY(-137, -44);
        return _this;
    }
    SceneHpView.create = function () {
        var pool = SceneHpView.POOL;
        if (pool.length) {
            return pool.shift();
        }
        return new SceneHpView();
    };
    SceneHpView.prototype.init = function (x, y, dmg, iscrit, isHit, isLianJi, isShield) {
        if (iscrit === void 0) { iscrit = false; }
        if (isHit === void 0) { isHit = false; }
        if (isLianJi === void 0) { isLianJi = false; }
        if (isShield === void 0) { isShield = false; }
        var s = this;
        s.imgText1.visible = false;
        var text = "";
        if (!isHit) {
            text = "z";
            s.imgText.font = "ui://jvxpx9emog7992";
            s.dep = 100000001;
        }
        else if (iscrit) {
            text = "" + dmg;
            if (isShield) {
                s.imgText.font = "ui://jvxpx9emrzhj3eu";
                s.imgText1.font = "ui://jvxpx9emrzhj3eu";
                s.imgText1.text = "D";
                s.dep = 100000001;
                s.imgText1.visible = true;
            }
            else {
                s.imgText.font = "ui://jvxpx9emog799d";
                if (isLianJi) {
                    s.imgText1.text = "L";
                    s.imgText1.font = "ui://jvxpx9emog7992";
                }
                else {
                    s.imgText1.text = "t";
                    s.imgText1.font = "ui://jvxpx9emog799d";
                }
                s.dep = 100000001;
                s.imgText1.visible = true;
            }
        }
        else {
            text = "" + dmg;
            if (isShield) {
                s.imgText.font = "ui://jvxpx9emrzhj3eu";
                s.imgText1.font = "ui://jvxpx9emrzhj3eu";
                s.imgText1.text = "D";
                s.dep = 100000001;
                s.imgText1.visible = true;
            }
            else {
                if (isLianJi) {
                    s.imgText1.text = "L";
                    s.imgText1.visible = true;
                    s.imgText1.font = "ui://jvxpx9emog7992";
                }
                s.imgText.font = "ui://jvxpx9emog7992";
                s.dep = 100000000;
            }
        }
        s.dead = 0;
        s.imgText.text = text;
        s.x = x + MathUtil.rndNum(-40, 40);
        s.y = y + MathUtil.rndNum(-40, 40);
        s.alpha = 1;
        s.anchorOffsetX = this.imgText.textWidth / 2;
        s.anchorOffsetY = 25;
        var arg3 = s.TWEENARG3;
        arg3.x = s.x + 50;
        arg3.alpha = 0;
        egret.Tween.get(s)
            .to(SceneHpView.TWEENARG1, 150, egret.Ease.sineIn)
            .to(SceneHpView.TWEENARG2, 100, egret.Ease.sineOut)
            .to({ y: s.y - 50 }, 400, egret.Ease.sineIn)
            .to(arg3, 500, egret.Ease.sineIn)
            .call(s.onComp, s);
    };
    /**主角被打文字 */
    SceneHpView.prototype.init2 = function (x, y, dmg, iscrit, isHit, isLianJi, isShield) {
        if (iscrit === void 0) { iscrit = false; }
        if (isHit === void 0) { isHit = false; }
        if (isLianJi === void 0) { isLianJi = false; }
        if (isShield === void 0) { isShield = false; }
        var s = this;
        this.dead = 0;
        var text;
        s.imgText1.visible = false;
        if (!isHit) {
            text = 'z';
            s.imgText.font = "ui://jvxpx9emog7992";
        }
        else if (iscrit) {
            text = "" + dmg;
            if (isShield) {
                s.imgText.font = "ui://jvxpx9emrzhj3ev";
                s.imgText1.font = "ui://jvxpx9emrzhj3ev";
                s.imgText1.text = "S";
                s.dep = 100000001;
                s.imgText1.visible = true;
            }
            else {
                s.imgText.font = "ui://jvxpx9emog799d";
                if (isLianJi) {
                    s.imgText1.text = "L";
                    s.imgText1.font = "ui://jvxpx9emog7992";
                }
                else {
                    s.imgText1.text = "t";
                    s.imgText1.font = "ui://jvxpx9emog799d";
                }
                s.imgText1.visible = true;
            }
        }
        else {
            text = "" + dmg;
            if (isShield) {
                s.imgText.font = "ui://jvxpx9emrzhj3ev";
                s.imgText1.font = "ui://jvxpx9emrzhj3ev";
                s.imgText1.text = "S";
                s.dep = 100000001;
                s.imgText1.visible = true;
            }
            else {
                if (isLianJi) {
                    s.imgText1.text = "L";
                    s.imgText1.font = "ui://jvxpx9emog7992";
                    s.imgText1.visible = true;
                }
                s.imgText.font = "ui://jvxpx9emobg13b3";
            }
        }
        s.imgText.text = text + "";
        s.x = x + MathUtil.rndNum(-40, 40);
        s.y = y + MathUtil.rndNum(-40, 40);
        s.alpha = 1;
        s.anchorOffsetX = s.imgText.textWidth / 2;
        s.anchorOffsetY = 25;
        var arg3 = s.TWEENARG3;
        arg3.x = s.x - 50;
        arg3.alpha = 0.5;
        egret.Tween.get(s)
            .to(SceneHpView.TWEENARG1, 150, egret.Ease.sineIn)
            .to(SceneHpView.TWEENARG2, 100, egret.Ease.sineOut)
            .wait(500)
            .to(arg3, 200)
            .call(s.onComp, s);
        s.dep = 100000000;
    };
    /**少主打人文字 */
    SceneHpView.prototype.init3 = function (x, y, dmg, isHit) {
        if (isHit === void 0) { isHit = false; }
        var s = this;
        this.dead = 0;
        var text;
        s.imgText1.visible = false;
        if (!isHit) {
            text = 'z';
            s.imgText.font = "ui://jvxpx9emog7992";
        }
        else {
            text = "" + dmg;
            s.imgText.font = "ui://7gxkx46wkd8fb6y";
        }
        s.imgText.text = text + "";
        s.x = x + MathUtil.rndNum(-40, 40);
        s.y = y + MathUtil.rndNum(-40, 40);
        s.alpha = 1;
        s.anchorOffsetX = s.imgText.textWidth / 2;
        s.anchorOffsetY = 25;
        var arg3 = s.TWEENARG3;
        arg3.x = s.x - 50;
        arg3.alpha = 0.5;
        egret.Tween.get(s)
            .to(SceneHpView.TWEENARG1, 150, egret.Ease.sineIn)
            .to(SceneHpView.TWEENARG2, 100, egret.Ease.sineOut)
            .wait(500)
            .to(arg3, 200)
            .call(s.onComp, s);
        s.dep = 100000000;
    };
    /**主角被麻痹 */
    SceneHpView.prototype.init2Dizz = function (x, y) {
        var self = this;
        this.dead = 0;
        var text = "D";
        self.imgText1.visible = false;
        self.imgText.text = text;
        self.x = x;
        self.y = y;
        self.alpha = 1;
        self.anchorOffsetX = self.imgText.textWidth / 2;
        self.anchorOffsetY = 25;
        var arg3 = self.TWEENARG3;
        arg3.x = self.x - 50;
        arg3.alpha = 0.5;
        egret.Tween.get(self)
            .to(SceneHpView.TWEENARG1, 150, egret.Ease.sineIn)
            .to(SceneHpView.TWEENARG2, 100, egret.Ease.sineOut)
            .wait(500)
            .to(arg3, 200)
            .call(self.onComp, self);
        self.dep = 100000002;
    };
    /**非主角被麻痹 */
    SceneHpView.prototype.initDizz = function (x, y) {
        var self = this;
        this.dead = 0;
        var text = "d";
        self.imgText1.visible = false;
        self.imgText.text = text;
        self.x = x;
        self.y = y;
        self.alpha = 1;
        self.anchorOffsetX = self.imgText.textWidth / 2;
        self.anchorOffsetY = 25;
        var arg3 = self.TWEENARG3;
        arg3.x = self.x + 50;
        arg3.alpha = 0.5;
        egret.Tween.get(self)
            .to(SceneHpView.TWEENARG1, 150, egret.Ease.sineIn)
            .to(SceneHpView.TWEENARG2, 100, egret.Ease.sineOut)
            .wait(500)
            .to(arg3, 200)
            .call(self.onComp, self);
        self.dep = 100000002;
    };
    SceneHpView.CRITEASE = function (perc) {
        // if(perc == 1) {
        // 	var p = perc * Math.PI;
        // 	var r =  Math.sin(perc * Math.PI);
        // }
        return Math.sin(perc * Math.PI);
    };
    SceneHpView.prototype.onAdd = function () {
        var self = this;
        self.scaleX = self.scaleY = 1;
        //egret.Tween.get(self).to({scaleX:1,scaleY:1},100,egret.Ease.sineInOut).to({scaleX:0.6,scaleY:0.6},200).wait(500).to({x:self.x+50,alpha:0.5},200).call(self.onComp,self);
        self.dead = 0;
        SceneHpView.count++;
        self.scene.unitLayer.depAddChild(self);
    };
    SceneHpView.prototype.onRemove = function () {
        if (!this.dead) {
            egret.Tween.removeTweens(this);
        }
        SceneHpView.count--;
        this.scene.unitLayer.depRemoveChild(this);
        SceneHpView.POOL.push(this);
    };
    SceneHpView.prototype.onComp = function () {
        this.dead = 1;
    };
    SceneHpView.prototype.update = function (ctx) {
        ctx.d = this.dead;
    };
    SceneHpView.prototype.onEvent = function (evt, arg) {
    };
    SceneHpView.POOL = [];
    SceneHpView.count = 0;
    SceneHpView.TWEENARG1 = { scaleX: 1.5, scaleY: 1.5 };
    SceneHpView.TWEENARG2 = { scaleX: 1, scaleY: 1 };
    return SceneHpView;
}(DepSprite));
__reflect(SceneHpView.prototype, "SceneHpView", ["ISceneObject"]);
