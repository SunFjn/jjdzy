var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var HomeScenePlayerAI = (function () {
    function HomeScenePlayerAI() {
        /**0 stand 1:move*/
        this.state = 0;
        this.moveInterv = 0;
        /**自动移除 */
        this.autoRemove = 1;
        this.top = 425;
        this.bottom = 800;
        this.thinkLeft = 100;
        this.thinkRight = 1500;
        this.thinkTop = 450;
        this.thinkBottom = 600;
    }
    HomeScenePlayerAI.prototype.aithink = function (ctx) {
        if (this.state == 0) {
            this.moveInterv -= ctx.dt;
            if (this.moveInterv <= 0) {
                this.moveTo(MathUtil.rndNum(this.thinkLeft, this.thinkRight), MathUtil.rndNum(this.thinkTop, this.thinkBottom));
            }
        }
    };
    HomeScenePlayerAI.prototype.update = function (ctx) {
        this.aithink(ctx);
        var self = this;
        if (self.state == 1) {
            var now = egret.getTimer();
            var perc = (now - self.starttime) / self.moveTime;
            if (perc > 1) {
                perc = 1;
                self.state = 0;
                self.role.move_state = 0;
                self.role.invalid |= 1;
                this.moveInterv = MathUtil.rndNum(3000, 7000);
            }
            self.role.x = self.sx + self.lenx * perc;
            self.role.y = self.sy + self.leny * perc;
        }
    };
    HomeScenePlayerAI.prototype.moveTo = function (dx, dy) {
        dy = Math.max(this.top, Math.min(this.bottom, dy));
        var self = this;
        self.state = 1;
        self.starttime = egret.getTimer();
        self.sx = self.role.x;
        self.sy = self.role.y;
        self.lenx = dx - self.role.x;
        self.leny = dy - self.role.y;
        self.role.move_state = 1;
        self.role.faceX(dx);
        self.role.invalid |= 1;
        self.moveTime = MoveUtil.distSqrt(self.role.x, self.role.y, dx, dy) * 30 / self.role.movespeed;
    };
    HomeScenePlayerAI.prototype.onAdd = function () {
        this.moveInterv = MathUtil.rndNum(3000, 7000);
    };
    HomeScenePlayerAI.prototype.onRemove = function () {
    };
    return HomeScenePlayerAI;
}());
__reflect(HomeScenePlayerAI.prototype, "HomeScenePlayerAI");
