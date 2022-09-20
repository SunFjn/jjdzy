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
/**场景掉落物品 */
var SceneDropCtrl = (function (_super) {
    __extends(SceneDropCtrl, _super);
    function SceneDropCtrl() {
        var _this = _super.call(this) || this;
        _this.roleList = {};
        /**不需要直接飞向主角的掉落道具*/
        _this.extraGoods = [];
        _this.hasExcute = 0;
        return _this;
    }
    Object.defineProperty(SceneDropCtrl, "instance", {
        get: function () {
            if (!SceneDropCtrl._inst) {
                SceneDropCtrl._inst = new SceneDropCtrl();
            }
            return SceneDropCtrl._inst;
        },
        enumerable: true,
        configurable: true
    });
    SceneDropCtrl.prototype.onEnter = function (scene) {
        this.scene = scene;
        this.listen(SceneDropCtrl.MSG_SCENE_DROP, this.dropGoods, this);
    };
    SceneDropCtrl.prototype.onEixt = function () {
        this.hasExcute = 0;
        this.roleList = {};
        this.scene = null;
        this.extraGoods = [];
        this.remove(SceneDropCtrl.MSG_SCENE_DROP, this.dropGoods, this);
    };
    /**添加掉落的怪物 */
    SceneDropCtrl.prototype.addRole = function (role) {
        this.roleList[role.enemyid] = role;
    };
    /**添加掉落的怪物 */
    SceneDropCtrl.prototype.removeRole = function (role) {
        if (this.roleList[role.enemyid]) {
            this.roleList[role.enemyid] = null;
            delete this.roleList[role.enemyid];
        }
    };
    SceneDropCtrl.prototype.dropExtraGoods = function (arg) {
        var x = arg.x;
        var y = arg.y;
        var info = arg.drop;
        var drops = [];
        var len = info.length;
        var drop;
        var sy;
        var count = 1;
        for (var i = 0; i < len; i++) {
            if (info[i][0] == Enum_Attr.ITEM) {
                count = info[i][2];
            }
            if (info[i][0] == Enum_Attr.EQUIP) {
                count = info[i][2];
            }
            else {
                count = count > 2 ? 2 : count;
            }
            for (var j = 0; j < count; j++) {
                drop = SceneDropGoods.create();
                drop.init(x + i * 60, y + i * 70, info[i]);
                drop.dep = 20000;
                drops.push(drop);
                this.scene.addUnit(drop);
            }
        }
        this.alignByXY(x, y, drops);
        if (len > 0) {
            for (var i_1 = 0; i_1 < len; i_1++) {
                var yy = drops[i_1].y + 50;
                egret.Tween.get(drops[i_1]).to({ y: yy }, 800, this.eazyout);
            }
        }
        this.extraGoods = this.extraGoods.concat(drops);
    };
    SceneDropCtrl.prototype.extraToHero = function () {
        var self = this;
        if (this.hasExcute)
            return;
        self.hasExcute = 1;
        var len = self.extraGoods.length;
        var drops = self.extraGoods;
        if (len > 0) {
            var hero = this.scene.getLifeHero();
            for (var i = 0; i < len; i++) {
                var good = drops[i];
                if (hero) {
                    var scene = this.scene;
                    good.dep = 20000;
                    egret.Tween.get(good).to({ x: hero.x - 50, y: hero.y - 50 }, 150, egret.Ease.sineIn).call(this.tweenEnd, this, [good]);
                }
            }
        }
    };
    SceneDropCtrl.prototype.tweenEnd = function (good) {
        if (good) {
            this.scene.removeUnit(good);
        }
    };
    SceneDropCtrl.prototype.dropGoods = function (arg) {
        var id = arg.id;
        var info = arg.drop;
        var enemy = this.roleList[id];
        if (!enemy) {
            return;
        }
        this.removeRole(enemy);
        var drops = [];
        var len = info.length;
        var drop;
        var sy;
        var count = 1;
        for (var i = 0; i < len; i++) {
            if (info[i][0] == Enum_Attr.ITEM) {
                count = info[i][2];
            }
            if (info[i][0] == Enum_Attr.EQUIP) {
                count = info[i][2];
            }
            else {
                count = count > 2 ? 2 : count;
            }
            for (var j = 0; j < count; j++) {
                drop = SceneDropGoods.create();
                drop.init(enemy.x + i * 60, enemy.y + i * 70, info[i]);
                drops.push(drop);
                this.scene.addUnit(drop);
            }
        }
        this.align(enemy, drops);
        var self = this;
        len = drops.length;
        if (len > 0) {
            for (var i_2 = 0; i_2 < len; i_2++) {
                var yy = drops[i_2].y + 50;
                egret.Tween.get(drops[i_2]).to({ y: yy }, 800, this.eazyout).wait(500 + i_2 * 50).call(self.tweenRole, self, [drops[i_2], i_2 == len - 1, info]);
            }
        }
        else {
            SceneDropCtrl.instance.notify(SceneDropCtrl.MSG_DROP_END, drop);
        }
    };
    SceneDropCtrl.prototype.eazyout = function (t, b, c, d) {
        var e = 7.5625;
        if ((t /= d) < (1 / 2.75)) {
            return c * (e * t * t) + b;
        }
        else if (t < (2 / 2.75)) {
            return c * (e * (t -= (1.5 / 2.75)) * t + .75) + b;
        }
        else if (t < (2.5 / 2.75)) {
            return c * (e * (t -= (2.25 / 2.75)) * t + .9375) + b;
        }
        else {
            return c * (e * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    };
    SceneDropCtrl.prototype.align = function (enemy, drop) {
        var len = drop.length + 1;
        var q = Math.sqrt(len);
        var row = Math.ceil(q); //行
        row = Math.floor(row / 2) * 2;
        var interX = 70; //间隔像素
        var interY = 70;
        var ep = Math.floor(row / 2); //中心点
        var sx = enemy.x - ep * interX;
        var sy = enemy.y - ep * interY;
        for (var i = 0; i < drop.length; i++) {
            drop[i].x = sx + (i % row) * interX;
            drop[i].y = sy + ((i / row) >> 0) * interY;
        }
    };
    SceneDropCtrl.prototype.alignByXY = function (x, y, drop) {
        var len = drop.length + 1;
        var q = Math.sqrt(len);
        var row = Math.ceil(q); //行
        row = Math.floor(row / 2) * 2;
        var interX = 70; //间隔像素
        var interY = 70;
        var ep = Math.floor(row / 2); //中心点
        var sx = x - ep * interX;
        var sy = y - ep * interY;
        for (var i = 0; i < drop.length; i++) {
            drop[i].x = sx + (i % row) * interX;
            drop[i].y = sy + ((i / row) >> 0) * interY;
        }
    };
    SceneDropCtrl.prototype.tweenRole = function (good, isEnd, drop) {
        var hero = this.scene.getLifeHero();
        if (hero) {
            var scene = this.scene;
            good.dep = 10000;
            egret.Tween.get(good).to({ x: hero.x - 50, y: hero.y - 50 }, 150, egret.Ease.sineIn).call(this.onItemToRoled, this, [good, isEnd, drop]);
        }
        this.extraToHero();
    };
    SceneDropCtrl.prototype.onItemToRoled = function (good, isEnd, drop) {
        this.scene.removeUnit(good);
        if (isEnd) {
            setTimeout(function () {
                SceneDropCtrl.instance.notify(SceneDropCtrl.MSG_DROP_END, drop);
            }, 200);
        }
    };
    /**战斗结束场景掉落物品 参数 {"id":npcId, "drop":[[B:类型I:idS:数量]]}*/
    SceneDropCtrl.MSG_SCENE_DROP = "MSG_SCENE_DROP";
    /**拾捡完毕 参数是掉落的数据*/
    SceneDropCtrl.MSG_DROP_END = "MSG_DROP_END";
    return SceneDropCtrl;
}(MsgCenter));
__reflect(SceneDropCtrl.prototype, "SceneDropCtrl");
