class Vo_ArpgPlayer {
	/**将衔*/
	jiangXian = 0;
	/**称号*/
	title = 0;
	/** vip等级 */
	viplv = 0;
	/** 玩家唯一ID */
	id: number;
	/** 职业*/
	job: number;
	/** 国家 1魏国2蜀国3吴国*/
	country: number;
	/** 玩家名字 */
	name: string;
	/** 主角色等级 */
	level: number;
	/** 用来保存玩家所操作的场景单位 */
	sceneChar: SceneCharRole;
	/** 皮肤*/
	body: number;
	/** 武器*/
	weapon: number = 0;
	/** 神兵*/
	godWeapon: number = 0;
	_shiZhuang: number;
	shouhun = 0;
	horseId = 0;

	zs = 0;
	state = 0;//场景状态  0：正常，1：战斗，2：冻结 预留
	route;
	tongbi;
	yuanbao;
	system_id;
	type;
	hp = 1;
	maxHp = 1;

	dir;
	speed;

	setBody(v) {
		let fscfg = Config.sz_739[v];
		let moxing = 0;
		if (fscfg) {
			this.body = fscfg.moxing;
		} else {
			this.body = v;
		}
	}

	setShouHun(v) {
		this.shouhun = v;
	}

	setHorseId(v) {
		this.horseId = v;
	}

	setWeapon(v) {
		let fscfg = Config.sz_739[v];
		let moxing = 0;
		if (fscfg) {
			this.weapon = fscfg.moxing;
		} else {
			this.weapon = v;
		}
	}

	setHp(hp) {
		this.hp = hp;
	}

	isMineID() {
		return Model_player.isMineID(this.id);
	}

	static create(): Vo_ArpgPlayer {
		return new Vo_ArpgPlayer();
		// return Pool.getItemByClass("Vo_ArpgPlayer", Vo_ArpgPlayer);
	}
}