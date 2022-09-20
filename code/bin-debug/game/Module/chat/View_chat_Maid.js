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
var View_chat_Maid = (function (_super) {
    __extends(View_chat_Maid, _super);
    function View_chat_Maid() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    View_chat_Maid.createInstance = function () {
        return (fairygui.UIPackage.createObject("chat", "View_chat_Maid"));
    };
    View_chat_Maid.prototype.childrenCreated = function () {
        var s = this;
        s.view = fairygui.UIPackage.createObject("chat", "View_chat_Maid").asCom;
        s.contentPane = s.view;
        CommonManager.parseChildren(s.view, s);
        _super.prototype.childrenCreated.call(this);
    };
    //1图鉴2宝物3兵法4异宝5神剑6战甲7天书8武将10神兵
    /**614001 ID _1 星级_1 等阶_37500 战力*/
    View_chat_Maid.prototype.updateShow = function () {
        var self = this;
        var vo = this._args;
        var arr = vo.content.split("_");
        self.ownerLb.text = "拥有者：" + vo.name;
        var cfg = Config.shinv_020[arr[0]];
        self.powerLb.text = "战力：" + arr[3];
        self.starLb.text = arr[1] + "";
        var lvId = Number(arr[2]);
        var nstr = cfg.mingzi + "(" + lvId + "级)";
        self.nameLb.text = HtmlUtil.fontNoSize(nstr, Color.getColorStr(cfg.pinzhi));
        IconUtil.setImg(self.sjIcon, Enum_Path.HOMEMAID_URL + cfg.yuanhua + ".png");
    };
    View_chat_Maid.prototype.onShown = function () {
        var self = this;
        IconUtil.setImg(self.backIcon, Enum_Path.BACK_URL + "chatBg.png");
        self.updateShow();
    };
    View_chat_Maid.prototype.onHide = function () {
        var self = this;
        IconUtil.setImg(self.backIcon, null);
        IconUtil.setImg(self.sjIcon, null);
    };
    View_chat_Maid.URL = "ui://fx4pr5qewa9j2x";
    return View_chat_Maid;
}(UIModalPanel));
__reflect(View_chat_Maid.prototype, "View_chat_Maid");
