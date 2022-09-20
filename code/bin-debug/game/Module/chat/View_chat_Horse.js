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
var View_chat_Horse = (function (_super) {
    __extends(View_chat_Horse, _super);
    function View_chat_Horse() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    View_chat_Horse.createInstance = function () {
        return (fairygui.UIPackage.createObject("chat", "View_chat_Horse"));
    };
    View_chat_Horse.prototype.childrenCreated = function () {
        var s = this;
        s.view = fairygui.UIPackage.createObject("chat", "View_chat_Horse").asCom;
        s.contentPane = s.view;
        CommonManager.parseChildren(s.view, s);
        _super.prototype.childrenCreated.call(this);
    };
    //1图鉴2宝物3兵法4异宝5神剑6战甲7天书8武将10神兵
    /**614001 ID _1 星级_1 等阶_37500 战力*/
    View_chat_Horse.prototype.updateShow = function () {
        var self = this;
        var vo = this._args;
        var arr = vo.content.split("_");
        self.ownerLb.text = "拥有者：" + vo.name;
        var cfg = Config.zq_773[arr[1]];
        if (self.awatar) {
            EffectMgr.instance.removeEff(self.awatar);
            self.awatar = null;
        }
        self.awatar = EffectMgr.addEff("body/" + cfg.model + "/ride_st/ani", self.sjIcon.displayObject, self.sjIcon.width / 2, self.sjIcon.height, 1000, -1, true);
        self.powerLb.text = "战力：" + arr[2];
        if (vo.showtype == 16) {
            self.groupStar.visible = true;
            self.starLb.text = (Number(arr[3]) % 1000) + "";
            var lvId = Number(arr[4]) % 100000;
            var nstr = "坐骑·" + cfg.name + "(" + Math.floor(lvId / 10) + "阶" + (lvId % 10) + "级" + ")";
            self.nameLb.text = HtmlUtil.fontNoSize(nstr, Color.getColorStr(cfg.quality));
        }
        else {
            var t_id = ~~arr[3];
            self.groupStar.visible = false;
            var t_jie = ~~(t_id % 1000 / 10);
            var t_ji = t_id % 10;
            var t_str = "\u5E7B\u5316\u5750\u9A91\u00B7" + cfg.name + "(" + t_jie + "\u9636" + t_ji + "\u7EA7)";
            self.nameLb.text = HtmlUtil.font(t_str, Color.getColorStr(cfg.quality));
        }
        self.speedLb.visible = false;
        self.speedLb1.visible = false;
    };
    View_chat_Horse.prototype.onShown = function () {
        var self = this;
        IconUtil.setImg(self.backIcon, Enum_Path.BACK_URL + "chatBg.png");
        self.updateShow();
    };
    View_chat_Horse.prototype.onHide = function () {
        var self = this;
        IconUtil.setImg(self.backIcon, null);
        if (self.awatar) {
            EffectMgr.instance.removeEff(self.awatar);
            self.awatar = null;
        }
    };
    //>>>>end
    View_chat_Horse.URL = "ui://fx4pr5qewa9j2x";
    return View_chat_Horse;
}(UIModalPanel));
__reflect(View_chat_Horse.prototype, "View_chat_Horse");
