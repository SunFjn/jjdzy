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
var View_Mail_Panel = (function (_super) {
    __extends(View_Mail_Panel, _super);
    function View_Mail_Panel() {
        var _this = _super.call(this) || this;
        _this.setSkin("Mail", "Mail_atlas0", "View_Mail_Panel");
        return _this;
    }
    View_Mail_Panel.prototype.setExtends = function () {
        fairygui.UIObjectFactory.setPackageItemExtension(MailItem.URL, MailItem);
    };
    View_Mail_Panel.prototype.initView = function () {
        _super.prototype.initView.call(this);
        this.list.callbackThisObj = this;
        this.list.itemRenderer = this.renderHandle;
        this.list.setVirtual();
        this.delBt.addClickListener(this.delMailHandle, this);
        this.drawBt.addClickListener(this.keyDrawHandle, this);
        GGlobal.modelMail.openPanel();
    };
    View_Mail_Panel.prototype.renderHandle = function (index, obj) {
        var item = obj;
        item.vo = Model_Mail.mailVoArr[index];
    };
    View_Mail_Panel.prototype.keyDrawHandle = function (event) {
        if (this.drawBt.checkNotice) {
            if (Model_Bag.checkBagCapacity()) {
                GGlobal.modelMail.keyDrawMail();
            }
        }
        else {
            ViewCommonWarn.text("没有可领取的奖励");
        }
    };
    View_Mail_Panel.prototype.delMailHandle = function (event) {
        var arr = Model_Mail.mailVoArr;
        var index = 0;
        for (var i = 0; i < arr.length; i++) {
            var vo = arr[i];
            if ((vo.adjunctState == 0 || vo.adjunctState == 2) && vo.readState == 1) {
                arr.splice(i, 1);
                i--;
                index++;
            }
        }
        if (index > 0) {
            GGlobal.modelMail.keyDelMail();
            GGlobal.control.notify(Enum_MsgType.MAIL_LIST_UPDATE);
            this.updateShow();
        }
        else {
            ViewCommonWarn.text("已无可删除的邮件");
        }
    };
    View_Mail_Panel.prototype.updateShow = function () {
        var arr = Model_Mail.mailVoArr;
        var index = 0;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].adjunctState == 1) {
                this.drawBt.checkNotice = true;
                index++;
                break;
            }
        }
        if (index == 0)
            this.drawBt.checkNotice = false;
        this.list.numItems = arr.length;
    };
    View_Mail_Panel.prototype.onShown = function () {
        this.updateShow();
        GGlobal.control.listen(Enum_MsgType.MAIL_LIST_UPDATE, this.updateShow, this);
    };
    View_Mail_Panel.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.MAIL_PANEL);
        GGlobal.control.remove(Enum_MsgType.MAIL_LIST_UPDATE, this.updateShow, this);
        this.list.numItems = 0;
    };
    View_Mail_Panel.URL = "ui://uwarq7k4lfaz0";
    return View_Mail_Panel;
}(UIPanelBase));
__reflect(View_Mail_Panel.prototype, "View_Mail_Panel");
