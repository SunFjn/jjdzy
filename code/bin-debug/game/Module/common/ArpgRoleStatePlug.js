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
var ArpgRoleStatePlug = (function (_super) {
    __extends(ArpgRoleStatePlug, _super);
    function ArpgRoleStatePlug() {
        var _this = _super.call(this) || this;
        _this.autoRemove = true;
        _this._state = 0;
        /**
         * 1 战斗中
         * 2 已死亡
        */
        _this.setState = function (st) {
            var self = _this;
            self._state = st;
            var url;
            var x = 0, y = 0;
            switch (st) {
                case 1:
                    url = "rolefight"; //战斗中
                    IconUtil.setImg(self.imgState, Enum_Path.PIC_URL + url + ".png");
                    break;
                case 2:
                    url = "roledead"; //死亡
                    IconUtil.setImg(self.imgState, Enum_Path.PIC_URL + url + ".png");
                    break;
                case 3:
                    url = "collecting"; //采集标志
                    IconUtil.setImg(self.imgState, Enum_Path.PIC_URL + url + ".png");
                    break;
                case 4:
                    url = "godst"; //金库标志
                    IconUtil.setImg(self.imgState, Enum_Path.PIC_URL + url + ".png");
                    y = -130;
                    break;
                case 0:
                    url = "";
                    IconUtil.setImg(self.imgState, null);
                    break;
            }
            _this.imgState.setXY(x, y);
        };
        return _this;
    }
    ArpgRoleStatePlug.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "ArpgRoleStatePlug"));
    };
    ArpgRoleStatePlug.create = function (role) {
        var temp = ArpgRoleStatePlug.POOL.length ? ArpgRoleStatePlug.POOL.pop() : ArpgRoleStatePlug.createInstance();
        temp.role = role;
        return temp;
    };
    ArpgRoleStatePlug.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.imgState = (this.getChild("imgState"));
    };
    ArpgRoleStatePlug.prototype.update = function (opt) {
    };
    ArpgRoleStatePlug.prototype.onAdd = function () {
        this.setXY(-70, 40);
        this.role.headGroup.addChild(this.displayObject);
    };
    ArpgRoleStatePlug.prototype.onRemove = function () {
        var a = this;
        a._state = 0;
        IconUtil.setImg(a.imgState, null);
        a.role.headGroup.removeChild(a.displayObject);
        ArpgRoleStatePlug.POOL.push(this);
    };
    ArpgRoleStatePlug.URL = "ui://jvxpx9eme7fg3gm";
    ArpgRoleStatePlug.POOL = [];
    return ArpgRoleStatePlug;
}(fairygui.GComponent));
__reflect(ArpgRoleStatePlug.prototype, "ArpgRoleStatePlug");
