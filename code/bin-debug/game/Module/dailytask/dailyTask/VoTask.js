var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var VoTask = (function () {
    function VoTask() {
        this.id = 0;
        //0不可 1可令 2领完
        this.state = 0;
        this.progress = 0;
        this.sortIndex = 0;
    }
    VoTask.prototype.initLib = function () {
        var s = this;
        s.name = s.lib.name;
        s.condition = s.lib.open;
        s.huoyuedu = s.lib.add;
        s.max = 1;
        s.award = s.lib.award;
        s.icon = s.lib.icon;
        s.link = s.lib.nextto;
    };
    VoTask.prototype.update = function () {
        this.sortIndex = this.lib.px;
        if (this.state == 1) {
            this.sortIndex = this.sortIndex - 1000;
        }
        else if (this.state == 2) {
            this.sortIndex = this.sortIndex + 1000;
        }
    };
    return VoTask;
}());
__reflect(VoTask.prototype, "VoTask");
