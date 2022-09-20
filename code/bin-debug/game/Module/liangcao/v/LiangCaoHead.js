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
var LiangCaoHead = (function (_super) {
    __extends(LiangCaoHead, _super);
    function LiangCaoHead() {
        var _this = _super.call(this) || this;
        _this.timeUpdate = function () {
            var self = _this;
            var now = Model_GlobalMsg.getServerTime();
            var time = self._time - now;
            if (time >= 0) {
                self.lbState.text = "复活:" + ((time / 1000) >> 0) + "s";
            }
            else {
                self.lbState.text = "<font color='#15f234'>已刷新</font>";
            }
        };
        _this._time = 0;
        _this.setdata = function (idx) {
            var self = _this;
            var data = GGlobal.modelLiangCao.bossData;
            if (data && data[idx]) {
                var item = data[idx];
                var st = item.st;
                var id = item.id;
                var time = item.time;
                var taskst = item.taskst;
                var now = Model_GlobalMsg.getServerTime();
                if (time <= now) {
                    self.lbState.text = "<font color='#15f234'>已刷新</font>";
                }
                self._time = time;
                var imgkey = Config.NPC_200[id].head;
                ImageLoader.instance.loader(RoleUtil.getHeadImg(imgkey + ""), self.headIcon);
                self.imgDeaded.visible = taskst == 1;
                Timer.listen(self.timeUpdate, self, 1000);
            }
        };
        return _this;
    }
    LiangCaoHead.createInstance = function () {
        return (fairygui.UIPackage.createObject("liangcao", "LiangCaoHead"));
    };
    LiangCaoHead.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    LiangCaoHead.prototype.clean = function () {
        Timer.remove(this.timeUpdate, this);
    };
    LiangCaoHead.URL = "ui://mbcu0qc0hd204";
    return LiangCaoHead;
}(fairygui.GComponent));
__reflect(LiangCaoHead.prototype, "LiangCaoHead");
