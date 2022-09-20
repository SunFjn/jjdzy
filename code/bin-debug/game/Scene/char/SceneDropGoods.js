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
var SceneDropGoods = (function (_super) {
    __extends(SceneDropGoods, _super);
    function SceneDropGoods() {
        var _this = _super.call(this) || this;
        _this.x = 0;
        _this.y = 0;
        _this.h = 0;
        /** 1:通常角色(主角 怪物等) 10:岩石*/
        _this.objType = 0;
        _this.id = 0;
        /**所在势力队伍 */
        _this.force = 0;
        var s = _this;
        s.id = SceneObject.COUNTER++;
        var view = SceneDropView.createInstance();
        s.addChild(view.displayObject);
        s.qualityBG = view.n0;
        s.lb = view.n1;
        s.img = view.n2;
        return _this;
    }
    SceneDropGoods.create = function () {
        var pool = SceneDropGoods.POOL;
        if (pool.length) {
            return pool.shift();
        }
        return new SceneDropGoods();
    };
    SceneDropGoods.prototype.init = function (x, y, arg) {
        this.x = x - this.img.width / 2;
        this.y = y - this.img.height / 2;
        this.dep = this.y;
        var icon;
        var type = arg[0];
        var id = arg[1];
        var name = "";
        var color = 2;
        if (type == Enum_Attr.ITEM) {
            var lib = Config.daoju_204[id];
            icon = lib.icon;
            name = ConfigHelp.getItemColorName(id);
            color = lib.quality;
        }
        else if (type == Enum_Attr.EQUIP) {
            lib = Config.zhuangbei_204[id];
            icon = lib.icon;
            color = lib.q;
            name = ConfigHelp.getItemColorName(id);
        }
        else {
            lib = Config.jssx_002[type];
            name = HtmlUtil.fontNoSize(lib.name, Color.getColorStr(lib.color));
            icon = lib.icon;
            color = lib.color;
        }
        ImageLoader.instance.loader(Enum_Path.ICON70_URL + icon + ".png", this.img);
        ImageLoader.instance.loader(Enum_Path.BACK_URL + "iconbg" + color + ".png", this.qualityBG);
        this.lb.text = name;
        // this.lb.x = (this.img.width - this.lb.textWidth) / 2;
    };
    SceneDropGoods.prototype.update = function (ctx) {
    };
    SceneDropGoods.prototype.onAdd = function () {
        this.scene.unitLayer.depAddChild(this);
    };
    SceneDropGoods.prototype.onRemove = function () {
        egret.Tween.removeTweens(this);
        if (this.scene) {
            this.scene.unitLayer.depRemoveChild(this);
        }
        if (SceneDropGoods.POOL.indexOf(this) == -1) {
            SceneDropGoods.POOL.push(this);
        }
        else {
            if (true) {
                throw new Error("重复释放了掉落物品。");
            }
        }
    };
    SceneDropGoods.prototype.onEvent = function (evt, arg) {
        if (arg === void 0) { arg = null; }
    };
    SceneDropGoods.POOL = [];
    return SceneDropGoods;
}(DepSprite));
__reflect(SceneDropGoods.prototype, "SceneDropGoods", ["ISceneObject"]);
