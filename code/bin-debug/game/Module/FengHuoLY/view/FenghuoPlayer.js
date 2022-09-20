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
var FenghuoPlayer = (function (_super) {
    __extends(FenghuoPlayer, _super);
    function FenghuoPlayer() {
        return _super.call(this) || this;
    }
    FenghuoPlayer.prototype.setWeapon = function () {
    };
    FenghuoPlayer.prototype.setBody = function () {
    };
    FenghuoPlayer.prototype.way = function () {
    };
    FenghuoPlayer.createPlayer = function () {
        return this.pool.length ? this.pool.shift() : new FenghuoPlayer();
    };
    FenghuoPlayer.pool = [];
    return FenghuoPlayer;
}(fairygui.GComponent));
__reflect(FenghuoPlayer.prototype, "FenghuoPlayer");
