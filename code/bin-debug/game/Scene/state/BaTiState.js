var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**霸体状态*/
var BaTiState = (function () {
    function BaTiState() {
        this.lifeTime = 0;
        this.maxTime = 1000;
    }
    BaTiState.create = function () {
        var p = BaTiState.POOL;
        if (p.length) {
            return p.shift();
        }
        return new BaTiState();
    };
    BaTiState.prototype.update = function (ctx) {
        this.lifeTime += ctx.dt;
        if (this.lifeTime >= this.maxTime) {
            ctx.d = 1;
        }
    };
    BaTiState.prototype.onAdd = function () {
        this.lifeTime = 0;
        this.maxTime = Config.changshu_101[2].num / 100;
        this.role.immuneHSt++;
        this.role.view.alpha = 0.75;
    };
    BaTiState.prototype.onRemove = function () {
        this.role.immuneHSt--;
        this.role.view.alpha = 1;
        this.role = null;
        this.maxTime = 1000;
        BaTiState.POOL.push(this);
    };
    BaTiState.prototype.onEvent = function (evt, arg) {
    };
    BaTiState.POOL = [];
    return BaTiState;
}());
__reflect(BaTiState.prototype, "BaTiState");
