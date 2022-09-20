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
var View_CaiLiao_GetPanel = (function (_super) {
    __extends(View_CaiLiao_GetPanel, _super);
    function View_CaiLiao_GetPanel() {
        var _this = _super.call(this) || this;
        _this.iconArr = [];
        _this.childrenCreated();
        return _this;
    }
    View_CaiLiao_GetPanel.prototype.childrenCreated = function () {
        var a = this;
        a.view = fairygui.UIPackage.createObject("common", "View_CaiLiao_GetPanel").asCom;
        a.contentPane = a.view;
        a.grid = (a.view.getChild("grid"));
        a.list = (a.view.getChild("list"));
        a.list.callbackThisObj = a;
        a.list.itemRenderer = a.renderHandler;
        a.list.foldInvisibleItems = true;
        _super.prototype.childrenCreated.call(this);
    };
    View_CaiLiao_GetPanel.prototype.OnList = function (evt) {
        evt.stopPropagation();
        var iconLb = evt.itemObject;
        GGlobal.layerMgr.closeAllPanel(true);
        var uiId = iconLb.data.id;
        var uiP = iconLb.data.p;
        if (uiId == UIConst.NANZHENG_BEIZHAN && Model_player.voMine.country == 0) {
            GGlobal.layerMgr.open(UIConst.COUNTRY_SELECT);
        }
        else if (uiId == UIConst.SJMJ1) {
            if (ModuleManager.isOpen(uiId, true)) {
                if (GGlobal.sceneType != SceneCtrl.GUANQIA || GGlobal.modelFengHuoLY.inActivity) {
                    ViewCommonWarn.text("副本中不可加入");
                    return;
                }
                if (Model_CrossTeam.teamId > 0) {
                    ViewCommonWarn.text("请先退出跨服组队");
                    return;
                }
                if (uiP) {
                    GGlobal.modelSJMJ.isGetOpen = true;
                    GGlobal.modelSJMJ.isGetID = uiP;
                }
                GGlobal.layerMgr.open(uiId);
            }
        }
        else if (uiId == UIConst.DISCOUNT_SHOP) {
            if (ModelEightLock.getActVo(UIConst.DISCOUNT_SHOP1)) {
                GGlobal.layerMgr.open(UIConst.CHAOZHIFL, UIConst.DISCOUNT_SHOP1);
            }
            else {
                GGlobal.layerMgr.open(UIConst.CHAOZHIFL, UIConst.DISCOUNT_SHOP);
            }
        }
        else if (uiId == UIConst.SYSTEM_ZHI_GOU) {
            if (Model_GlobalMsg.kaifuDay > 7) {
                GGlobal.layerMgr.open(UIConst.ZHI_GOU, { day: 99, type: 0 });
            }
            else {
                GGlobal.layerMgr.open(UIConst.SYSTEM_ZHI_GOU, { day: 99, type: 0 });
            }
        }
        else {
            GGlobal.layerMgr.open(uiId, uiP);
        }
    };
    View_CaiLiao_GetPanel.prototype.renderHandler = function (index, obj) {
        var a = this;
        var iconLb = obj;
        var uiId = a.iconArr[index][0];
        var d = { id: uiId, p: a.iconArr[index][3] };
        iconLb.data = d;
        iconLb.getChild("icon").visible = a.iconArr[index][1] == 1;
        iconLb.text = HtmlUtil.underLine(a.iconArr[index][2]);
        iconLb.visible = true;
        if (uiId == UIConst.DISCOUNT_SHOP || uiId == UIConst.DISCOUNT_SHOP1) {
            if (Model_GlobalMsg.kaifuDay == a.iconArr[index][3]) {
            }
            else {
                if (Model_GlobalMsg.kaifuDay > 7) {
                    var date = new Date(Model_GlobalMsg.getServerTime());
                    var weekDay = date.getDay();
                    if (weekDay == 0)
                        weekDay = 7;
                    iconLb.visible = weekDay == a.iconArr[index][3];
                }
                else {
                    iconLb.visible = false;
                }
            }
        }
    };
    View_CaiLiao_GetPanel.prototype.updateShow = function () {
        var a = this;
        if (!a._args)
            return;
        var vo = a._args;
        a.frame.text = vo.name;
        a.grid.vo = vo;
        a.iconArr = vo.wayArr;
        a.list.numItems = a.iconArr.length;
    };
    View_CaiLiao_GetPanel.prototype.onShown = function () {
        var a = this;
        a.updateShow();
        a.list.addEventListener(fairygui.ItemEvent.CLICK, a.OnList, a);
    };
    View_CaiLiao_GetPanel.prototype.onHide = function () {
        var a = this;
        GGlobal.layerMgr.close(UIConst.CAILIAO_GET);
        a.list.removeEventListener(fairygui.ItemEvent.CLICK, a.OnList, a);
        a.list.numItems = 0;
    };
    View_CaiLiao_GetPanel.show = function (vo) {
        if (vo.wayArr.length <= 0) {
            ViewCommonWarn.text("缺少道具：" + HtmlUtil.fontNoSize(vo.name, Color.getColorStr(vo.quality)));
        }
        else {
            GGlobal.layerMgr.open(UIConst.CAILIAO_GET, vo);
        }
    };
    View_CaiLiao_GetPanel.URL = "ui://jvxpx9emhzfc9g";
    return View_CaiLiao_GetPanel;
}(UIModalPanel));
__reflect(View_CaiLiao_GetPanel.prototype, "View_CaiLiao_GetPanel");
