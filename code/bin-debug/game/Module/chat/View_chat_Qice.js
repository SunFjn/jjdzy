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
/**
 * 奇策展示界面
 * @author: lujiahao
 * @date: 2019-10-24 16:47:34
 */
var View_chat_Qice = (function (_super) {
    __extends(View_chat_Qice, _super);
    function View_chat_Qice() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    View_chat_Qice.createInstance = function () {
        return (fairygui.UIPackage.createObject("chat", "View_chat_Qice"));
    };
    View_chat_Qice.prototype.childrenCreated = function () {
        var s = this;
        s.view = fairygui.UIPackage.createObject("chat", "View_chat_Qice").asCom;
        s.contentPane = s.view;
        CommonManager.parseChildren(s.view, s);
        _super.prototype.childrenCreated.call(this);
    };
    //=========================================== API ==========================================
    View_chat_Qice.prototype.onShown = function () {
        var t = this;
        IconUtil.setImg(t.backIcon, Enum_Path.BACK_URL + "chatBg.png");
        IconUtil.setImg(t.backIcon, null);
        IconUtil.setImg(t.sjIcon, null);
        t.refreshData();
    };
    View_chat_Qice.prototype.onHide = function () {
        var t = this;
        IconUtil.setImg1(null, t.sjIcon);
    };
    //===================================== private method =====================================
    View_chat_Qice.prototype.refreshData = function () {
        var t = this;
        var t_data = t._args;
        t.ownerLb.title = "拥有者：" + t_data.name;
        var t_list = t_data.content.split("_");
        var t_id = ~~t_list[0];
        var t_star = ~~t_list[1];
        var t_level = ~~t_list[2];
        var t_power = ~~t_list[3];
        var t_model = GGlobal.modelQice;
        var t_vo = t_model.getVoById(t_id);
        if (t_vo) {
            IconUtil.setImg1(Enum_Path.PIC_URL + t_vo.cfg.pic + ".png", t.sjIcon);
            t.starLb.text = t_star + "";
            var t_levelJie = ~~(t_level / 10);
            var t_levelJi = t_level % 10;
            var t_name = HtmlUtil.font(t_vo.cfg.name, Color.getColorStr(t_vo.cfg.pz));
            var t_levelStr = t_levelJie + "阶" + t_levelJi + "级";
            t.nameLb.title = t_name + "（" + t_levelStr + "）";
            t.powerLb.title = "战力：" + t_power;
        }
    };
    //>>>>end
    View_chat_Qice.URL = "ui://fx4pr5qeeckr2w";
    return View_chat_Qice;
}(UIModalPanel));
__reflect(View_chat_Qice.prototype, "View_chat_Qice");
