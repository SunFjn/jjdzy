/**场景掉落物品 */
class SceneDropCtrl extends MsgCenter {
	/**战斗结束场景掉落物品 参数 {"id":npcId, "drop":[[B:类型I:idS:数量]]}*/
	public static MSG_SCENE_DROP: string = "MSG_SCENE_DROP";

	/**拾捡完毕 参数是掉落的数据*/
	public static MSG_DROP_END: string = "MSG_DROP_END";

	public constructor() {
		super();
	}

	protected static _inst: SceneDropCtrl;
	public static get instance(): SceneDropCtrl {
		if (!SceneDropCtrl._inst) {
			SceneDropCtrl._inst = new SceneDropCtrl();
		}
		return SceneDropCtrl._inst;
	}

	public scene: MapScene;
	public onEnter(scene: MapScene): void {
		this.scene = scene;
		this.listen(SceneDropCtrl.MSG_SCENE_DROP, this.dropGoods, this);
	}

	public onEixt(): void {
		this.hasExcute = 0;
		this.roleList = {};
		this.scene = null;
		this.extraGoods=[];
		this.remove(SceneDropCtrl.MSG_SCENE_DROP, this.dropGoods, this);
	}

	protected roleList = {}
	/**添加掉落的怪物 */
	public addRole(role: SceneCharRole): void {
		this.roleList[role.enemyid] = role;
	}

	/**添加掉落的怪物 */
	public removeRole(role: SceneCharRole): void {
		if (this.roleList[role.enemyid]) {
			this.roleList[role.enemyid] = null;
			delete this.roleList[role.enemyid];
		}
	}

	/**不需要直接飞向主角的掉落道具*/
	public extraGoods = [];
	public dropExtraGoods(arg) {
		var x = arg.x;
		var y = arg.y;
		var info = arg.drop;
		let drops: any[] = [];
		var len = info.length;
		var drop;
		var sy;
		var count = 1;
		for (var i = 0; i < len; i++) {
			if (info[i][0] == Enum_Attr.ITEM) {
				count = info[i][2];
			}
			if (info[i][0] == Enum_Attr.EQUIP) {
				count = info[i][2];
			} else {
				count = count > 2 ? 2 : count;
			}
			for (var j = 0; j < count; j++) {
				drop = SceneDropGoods.create();
				drop.init(x + i * 60, y + i * 70, info[i]);
				drop.dep = 20000;
				drops.push(drop);
				this.scene.addUnit(drop);
			}
		}
		this.alignByXY(x,y, drops);
		if (len > 0) {
			for (let i = 0; i < len; i++) { 
				var yy = drops[i].y + 50;
				egret.Tween.get(drops[i]).to({ y: yy }, 800, this.eazyout);
			}
		}
		this.extraGoods = this.extraGoods.concat(drops);
	}

	private hasExcute = 0;
	public extraToHero() {
		var self = this;
		if(this.hasExcute)return;
		self.hasExcute = 1;
		let len = self.extraGoods.length;
		let drops = self.extraGoods;
		if (len > 0) {
			let hero = this.scene.getLifeHero();
			for (let i = 0; i < len; i++) {
				let good = drops[i];
				if (hero) {
					let scene = this.scene;
					good.dep = 20000;
					egret.Tween.get(good).to({ x: hero.x-50, y: hero.y-50 }, 150, egret.Ease.sineIn).call(this.tweenEnd, this, [good]);
				}
			}
		}
	}

	tweenEnd(good){
		if(good){
			this.scene.removeUnit(good);
		}
	}

	public dropGoods(arg): void {
		var id = arg.id;
		var info = arg.drop;
		var enemy: SceneCharRole = this.roleList[id];
		if (!enemy) {
			return;
		}
		this.removeRole(enemy);
		let drops: any[] = [];
		var len = info.length;
		var drop;
		var sy;
		var count = 1;
		for (var i = 0; i < len; i++) {
			if (info[i][0] == Enum_Attr.ITEM) {
				count = info[i][2];
			}
			if (info[i][0] == Enum_Attr.EQUIP) {
				count = info[i][2];
			} else {
				count = count > 2 ? 2 : count;
			}
			for (var j = 0; j < count; j++) {
				drop = SceneDropGoods.create();
				drop.init(enemy.x + i * 60, enemy.y + i * 70, info[i]);
				drops.push(drop);
				this.scene.addUnit(drop);
			}
		}
		this.align(enemy, drops);
		var self = this;
		len = drops.length;
		if (len > 0) {
			for (let i = 0; i < len; i++) {
				var yy = drops[i].y + 50;
				egret.Tween.get(drops[i]).to({ y: yy }, 800, this.eazyout).wait(500 + i * 50).call(self.tweenRole, self, [drops[i], i == len - 1, info]);
			}
		} else {
			SceneDropCtrl.instance.notify(SceneDropCtrl.MSG_DROP_END, drop)
		}
	}

	eazyout(t, b, c, d) {
		let e = 7.5625;
		if ((t /= d) < (1 / 2.75)) {
			return c * (e * t * t) + b;
		} else if (t < (2 / 2.75)) {
			return c * (e * (t -= (1.5 / 2.75)) * t + .75) + b;
		} else if (t < (2.5 / 2.75)) {
			return c * (e * (t -= (2.25 / 2.75)) * t + .9375) + b;
		} else {
			return c * (e * (t -= (2.625 / 2.75)) * t + .984375) + b;
		}
	}

	protected align(enemy: SceneCharRole, drop: any[]): void {
		var len = drop.length + 1;
		var q = Math.sqrt(len);
		var row = Math.ceil(q);//行
		row = Math.floor(row / 2) * 2;
		var interX = 70;//间隔像素
		var interY = 70;
		var ep = Math.floor(row / 2);//中心点
		var sx = enemy.x - ep * interX;
		var sy = enemy.y - ep * interY;
		for (var i = 0; i < drop.length; i++) {
			drop[i].x = sx + (i % row) * interX;
			drop[i].y = sy + ((i / row) >> 0) * interY;
		}
	}

	protected alignByXY(x,y, drop: any[]): void {
		var len = drop.length + 1;
		var q = Math.sqrt(len);
		var row = Math.ceil(q);//行
		row = Math.floor(row / 2) * 2;
		var interX = 70;//间隔像素
		var interY = 70;
		var ep = Math.floor(row / 2);//中心点
		var sx = x - ep * interX;
		var sy = y - ep * interY;
		for (var i = 0; i < drop.length; i++) {
			drop[i].x = sx + (i % row) * interX;
			drop[i].y = sy + ((i / row) >> 0) * interY;
		}
	}

	public tweenRole(good: SceneDropGoods, isEnd: boolean, drop): void {
		let hero = this.scene.getLifeHero();
		if (hero) {
			let scene = this.scene;
			good.dep = 10000;
			egret.Tween.get(good).to({ x: hero.x-50, y: hero.y-50 }, 150, egret.Ease.sineIn).call(this.onItemToRoled, this, [good, isEnd, drop]);
		}
		this.extraToHero();
	}

	private onItemToRoled(good, isEnd, drop) {
		this.scene.removeUnit(good);
		if (isEnd) {
			setTimeout(function () {
				SceneDropCtrl.instance.notify(SceneDropCtrl.MSG_DROP_END, drop);
			}, 200);
		}
	}

}