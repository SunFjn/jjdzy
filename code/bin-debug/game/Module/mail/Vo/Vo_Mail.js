var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_Mail = (function () {
    function Vo_Mail() {
        /**邮件附件*/
        this.adjunct = [];
    }
    Vo_Mail.prototype.initLib = function (id) {
        this.cfg = Config.mail_206[id];
        this.title = this.cfg.title;
        this.content = this.cfg.content;
        this.paramCall = this.cfg.paramCall;
    };
    /**L:邮件唯一IDI:邮件excel表IDI:时间B:邮件读取状态：0 未读。1 已读B:附件领取状态：0没有附件。1有附件。2附件已领** */
    Vo_Mail.createWithServData = function (data) {
        var ret = new Vo_Mail();
        ret.sid = data[0];
        ret.mailID = data[1];
        if (ret.mailID <= 0) {
            ret.title = data[5];
        }
        else {
            ret.initLib(ret.mailID);
        }
        ret.content = "";
        ret.sendDate = data[2];
        ret.readState = data[3];
        ret.adjunctState = data[4];
        return ret;
    };
    Vo_Mail.convertContentTitleSys = function (ret, str) {
        var splits = str.split("_");
        var ident = Number(splits.shift());
        var cfgInfo = ret.cfg;
        var rep = cfgInfo.content;
        ret.content = BroadCastManager.repText(rep, splits.join("_"), ret.paramCall);
    };
    Vo_Mail.explainAdjuncts = function (datalist) {
        var len = datalist.length;
        var adjs = [];
        for (var i = 0; i < len; i++) {
            var data = datalist[i];
            var adj = this.explainAdjunct(data);
            adjs.push(adj);
        }
        return adjs;
    };
    Vo_Mail.explainAdjunct = function (data) {
        var ret;
        var type = data[0];
        var sysid = data[1];
        var count = data[2];
        if (type == 2) {
            var voequip = VoEquip.create(sysid);
            voequip.count = count;
            ret = voequip;
        }
        else if (type == 1) {
            var voitem = VoItem.create(sysid);
            voitem.count = count;
            ret = voitem;
        }
        else {
            ret = Vo_Currency.create(type);
            ret.count = count;
        }
        return ret;
    };
    return Vo_Mail;
}());
__reflect(Vo_Mail.prototype, "Vo_Mail");
