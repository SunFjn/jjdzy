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
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var RoleStatePlug = (function (_super) {
    __extends(RoleStatePlug, _super);
    function RoleStatePlug() {
        var _this = _super.call(this) || this;
        _this.autoRemove = true;
        return _this;
    }
    RoleStatePlug.create = function (role) {
        var ret = RoleStatePlug.POOL.length ? RoleStatePlug.POOL.pop() : RoleStatePlug.createInstance();
        ret.role = role;
        return ret;
    };
    RoleStatePlug.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "RoleStatePlug"));
    };
    RoleStatePlug.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n0 = (this.getChild("n0"));
    };
    //B:玩家状态 0默认 1死亡 2战斗
    RoleStatePlug.prototype.setState = function (val) {
        if (val == 1) {
            IconUtil.setImg(this.n0, Enum_Path.PIC_URL + "rolefight.png");
        }
        else {
            IconUtil.setImg(this.n0, null);
        }
    };
    RoleStatePlug.prototype.update = function () {
    };
    RoleStatePlug.prototype.onAdd = function () {
        this.setXY(-70, 40);
        this.role.headGroup.addChild(this.displayObject);
    };
    RoleStatePlug.prototype.onRemove = function () {
        var a = this;
        a.role.headGroup.removeChild(a.displayObject);
        RoleStatePlug.POOL.push(this);
    };
    RoleStatePlug.URL = "ui://jvxpx9emsjy23fj";
    RoleStatePlug.POOL = [];
    return RoleStatePlug;
}(fairygui.GComponent));
__reflect(RoleStatePlug.prototype, "RoleStatePlug");
