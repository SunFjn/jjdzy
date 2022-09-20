var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var HtmlUtil = (function () {
    function HtmlUtil() {
    }
    HtmlUtil.createLink = function (text, bUnderline, url) {
        if (bUnderline === void 0) { bUnderline = true; }
        if (url === void 0) { url = 'My'; }
        var link = "";
        if (bUnderline) {
            link += "<u>";
            link += "<a href='event:" + url + "'>" + text + "</a>";
            link += "</u>";
        }
        else {
            link += "<a href='event:" + url + "'>" + text + "</a>";
        }
        return link;
    };
    /**
    * font文本
    * @param content 文本内容
    * @param color 颜色
    * @param size 字体大小
    * @return html文本
    */
    HtmlUtil.font = function (content, color, size) {
        if (size === void 0) { size = 0; }
        var colorStr;
        if (typeof color === 'number') {
            colorStr = "#" + Number(color).toString(16);
        }
        else {
            colorStr = color;
        }
        var str = "<font color='" + colorStr;
        if (size) {
            str += "' size ='" + size;
        }
        return str + "'>" + content + "</font>";
    };
    HtmlUtil.fontColorList = function (contents, colors) {
        var text = "";
        for (var i = 0; i < contents.length; i++) {
            text += HtmlUtil.fontNoSize(contents[i], colors[i]);
        }
        return HtmlUtil.HTMLPARSER.parser(text);
    };
    HtmlUtil.link = function (content, event) {
        return "<a href='event:" + event + "'>" + content + "</a>";
    };
    HtmlUtil.underLine = function (content) {
        return "<u>" + content + "</u>";
    };
    HtmlUtil.fontNoSize = function (content, color) {
        return "<font color='" + color + "'>" + content + "</font>";
    };
    HtmlUtil.fontNoColor = function (content, size) {
        return "<font size='" + size + "'>" + content + "</font>";
    };
    HtmlUtil.br = function (content) {
        return "<br>" + content + "</br>";
    };
    HtmlUtil.bold = function (content) {
        return "<b>" + content + "</b>";
    };
    HtmlUtil.makeRowText = function (info) {
        var ret = '';
        var infos = [];
        for (var i = 0; i < info.length; i++) {
            ret += info[i];
            if (i < info.length - 1) {
                ret += "\n";
            }
        }
        return ret;
    };
    HtmlUtil.getRequest = function (url) {
        var theRequest = {};
        var index = url.indexOf("?");
        if (theRequest && index != -1) {
            var str = url.substr(index + 1);
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                var kv = strs[i].split("=");
                theRequest[kv[0]] = kv[1];
            }
        }
        return theRequest;
    };
    HtmlUtil.HTMLPARSER = new egret.HtmlTextParser();
    return HtmlUtil;
}());
__reflect(HtmlUtil.prototype, "HtmlUtil");
