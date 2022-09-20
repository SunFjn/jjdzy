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
var ChatShaoZhuSkillGrid = (function (_super) {
    __extends(ChatShaoZhuSkillGrid, _super);
    function ChatShaoZhuSkillGrid() {
        return _super.call(this) || this;
    }
    ChatShaoZhuSkillGrid.createInstance = function () {
        return (fairygui.UIPackage.createObject("chat", "ChatShaoZhuSkillGrid"));
    };
    ChatShaoZhuSkillGrid.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.iconImg = (this.getChild("iconImg"));
        this.lockImg = (this.getChild("lockImg"));
    };
    ChatShaoZhuSkillGrid.prototype.updateShow = function (nameStr, iconStr, isLock) {
        if (isLock === void 0) { isLock = false; }
        var self = this;
        if (isLock) {
            IconUtil.setImg(self.iconImg, null);
        }
        else {
            if (iconStr) {
                IconUtil.setImg(self.iconImg, Enum_Path.SKILL_URL + iconStr + ".png");
            }
            else {
                IconUtil.setImg(self.iconImg, null);
            }
        }
        self.setLock(isLock);
        if (nameStr) {
            self.title = nameStr;
        }
        else {
            self.title = "";
        }
    };
    ChatShaoZhuSkillGrid.prototype.setLock = function (value) {
        this.lockImg.visible = value;
    };
    ChatShaoZhuSkillGrid.URL = "ui://fx4pr5qeewn52k";
    return ChatShaoZhuSkillGrid;
}(fairygui.GLabel));
__reflect(ChatShaoZhuSkillGrid.prototype, "ChatShaoZhuSkillGrid");
