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
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var ItemLog = (function (_super) {
    __extends(ItemLog, _super);
    function ItemLog() {
        return _super.call(this) || this;
    }
    ItemLog.createInstance = function () {
        return (fairygui.UIPackage.createObject("home", "ItemLog"));
    };
    ItemLog.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.lbInfo = (this.getChild("lbInfo"));
    };
    ItemLog.prototype.setdata = function (idx) {
        var self = this;
        var str = '';
        var data = GGlobal.homemodel.logdata[idx];
        str = data[1];
        if (data[0] == 1) {
            str += "前来金库，";
            if (data[3] > 0) {
                str += BroadCastManager.reTxt("被家丁打跑，损失<font color='#FFC344'>{0}</font><font color='#15f234'>(-{1})</font><font color='#FFC344'>府邸币</font>", data[2], data[3]);
            }
            else {
                str += BroadCastManager.reTxt("顺走了<font color='#FFC344'>{0}府邸币</font>", data[2]);
            }
        }
        else {
            str += "借用了天工炉，";
            if (data[2] > 0) {
                str += "<font color='#15f234'>繁荣度+" + data[2] + "</font>";
            }
            else {
                str += "今日繁荣度加成已达上限";
            }
        }
        self.lbInfo.text = str;
    };
    ItemLog.URL = "ui://y0plc878g2m4i";
    return ItemLog;
}(fairygui.GComponent));
__reflect(ItemLog.prototype, "ItemLog");
