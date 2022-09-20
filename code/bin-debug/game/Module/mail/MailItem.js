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
var MailItem = (function (_super) {
    __extends(MailItem, _super);
    function MailItem() {
        return _super.call(this) || this;
    }
    MailItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("Mail", "MailItem"));
    };
    MailItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.titleLb = (this.getChild("titleLb"));
        this.timeLb = (this.getChild("timeLb"));
        this.mailImg = (this.getChild("mailImg"));
        this.drawImg = (this.getChild("drawImg"));
        this.drawBt = (this.getChild("drawBt"));
        this.drawBt.addClickListener(this.drawHandle, this);
        this.addClickListener(this.contentHandle, this);
    };
    MailItem.prototype.contentHandle = function () {
        if (this.vo.content) {
            GGlobal.layerMgr.open(UIConst.MAIL_CONTENT, this.vo);
        }
        else {
            GGlobal.modelMail.getMailContent(this.vo.sid);
        }
    };
    MailItem.prototype.drawHandle = function (event) {
        event.stopPropagation();
        if (this.vo.adjunctState == 1 && Model_Bag.checkBagCapacity()) {
            GGlobal.modelMail.drawMail(this.vo.sid);
        }
    };
    Object.defineProperty(MailItem.prototype, "vo", {
        get: function () {
            return this.data;
        },
        set: function (vo) {
            this.data = vo;
            this.titleLb.text = vo.title;
            this.timeLb.text = DateUtil.getYMDHMS(vo.sendDate);
            if (vo.readState == 1) {
                this.mailImg.url = "ui://uwarq7k4k8ozl";
            }
            else {
                this.mailImg.url = "ui://uwarq7k4k8ozj";
            }
            this.drawImg.visible = vo.adjunctState == 2;
            this.drawBt.visible = vo.adjunctState == 1;
        },
        enumerable: true,
        configurable: true
    });
    MailItem.URL = "ui://uwarq7k4lfaz1";
    return MailItem;
}(fairygui.GComponent));
__reflect(MailItem.prototype, "MailItem");
