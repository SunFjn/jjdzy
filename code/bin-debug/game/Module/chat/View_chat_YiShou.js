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
var View_chat_YiShou = (function (_super) {
    __extends(View_chat_YiShou, _super);
    function View_chat_YiShou() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    View_chat_YiShou.prototype.childrenCreated = function () {
        var s = this;
        s.view = fairygui.UIPackage.createObject("chat", "View_chat_YiShou").asCom;
        s.contentPane = s.view;
        CommonManager.parseChildren(s.view, s);
        _super.prototype.childrenCreated.call(this);
    };
    /**614001 ID _1 星级_1 等阶_37500 战力*/
    View_chat_YiShou.prototype.updateShow = function () {
        var self = this;
        var vo = this._args;
        var arr = vo.content.split("_");
        self.ownerLb.text = "拥有者：" + vo.name;
        var cfg = Config.ysl_752[arr[1]];
        IconUtil.setImg(self.ysIcon, Enum_Path.PIC_URL + cfg.tupian1 + ".png");
        var lvCfg = Config.yssj_752[arr[2]];
        var lv = lvCfg.lv % 10;
        var costArr = JSON.parse(cfg.jihuo);
        var itemVo = VoItem.create(costArr[0][1]);
        self.nameLb.text = HtmlUtil.fontNoSize("异兽·" + cfg.mingzi + "(" + arr[5] + "阶" + lv + "级)", Color.getColorStr(itemVo.quality));
        self.powerLb.text = "战力：" + arr[3];
        var suitCfg = Config.ystz_752[arr[4]];
        self.suitLb.visible = false;
        if (suitCfg) {
            self.suitLb.visible = true;
            self.suitLb.text = suitCfg.miaoshu;
        }
    };
    View_chat_YiShou.prototype.onShown = function () {
        var self = this;
        IconUtil.setImg(self.backIcon, Enum_Path.BACK_URL + "chatBg.png");
        self.updateShow();
    };
    View_chat_YiShou.prototype.onHide = function () {
        var self = this;
        IconUtil.setImg(self.backIcon, null);
        IconUtil.setImg(self.ysIcon, null);
        GGlobal.layerMgr.close(UIConst.CHAT_BAOWU);
    };
    return View_chat_YiShou;
}(UIModalPanel));
__reflect(View_chat_YiShou.prototype, "View_chat_YiShou");
