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
var View_chat_TuJian = (function (_super) {
    __extends(View_chat_TuJian, _super);
    function View_chat_TuJian() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    View_chat_TuJian.prototype.childrenCreated = function () {
        var s = this;
        s.view = fairygui.UIPackage.createObject("chat", "View_chat_TuJian").asCom;
        s.contentPane = s.view;
        CommonManager.parseChildren(s.view, s);
        _super.prototype.childrenCreated.call(this);
    };
    /**810001 id_1001 星级_3001  等级_12500战力 */
    View_chat_TuJian.prototype.updateShow = function () {
        var s = this;
        var vo = this._args;
        var arr = vo.content.split("_");
        var cfg = Config.picture_005[arr[0]];
        if (cfg) {
            IconUtil.setImg(s.iconImg, Enum_Path.TUJIAN_URL + cfg.pic + ".jpg");
            IconUtil.setImg(s.colorImg, Enum_Path.TUJIAN_URL + "bg" + cfg.quality + ".png");
            s.levelLb.text = Config.piclv_005[arr[2]].lv + "";
            s.nameLb.text = cfg.name;
            var starstr = "";
            var starcfg = Config.picstar_005[arr[1]];
            var starNum = Math.floor(starcfg.lv / 5);
            var starNum1 = starcfg.lv % 5;
            for (var i = 0; i < 5; i++) {
                if (i < starNum1) {
                    starstr += "" + (starNum + 1);
                }
                else {
                    starstr += "" + starNum;
                }
            }
            s.starLb.text = starstr;
            s.ownerLb.text = "拥有者：" + vo.name;
            s.tjNameLb.text = HtmlUtil.fontNoSize("【" + cfg.name + "·图鉴】", Color.getColorStr(cfg.quality));
            s.powerLb.text = "战力：" + arr[3];
        }
    };
    View_chat_TuJian.prototype.onShown = function () {
        IconUtil.setImg(this.backIcon, Enum_Path.BACK_URL + "chatBg.png");
        this.updateShow();
    };
    View_chat_TuJian.prototype.onHide = function () {
        var self = this;
        IconUtil.setImg(this.backIcon, null);
        IconUtil.setImg(self.iconImg, null);
        IconUtil.setImg(self.colorImg, null);
        GGlobal.layerMgr.close(UIConst.CHAT_TUJIAN);
    };
    View_chat_TuJian.URL = "ui://fx4pr5qewjpa23";
    return View_chat_TuJian;
}(UIModalPanel));
__reflect(View_chat_TuJian.prototype, "View_chat_TuJian");
