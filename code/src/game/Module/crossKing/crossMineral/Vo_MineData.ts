class Vo_MineData {
	/**I:矿配置id */
	public cfgID = 0;
	/**矿主id */
	public mineID = 0;
	/**已被顺次数 */
	public mySteal = 0;
	/**已被抢次数I */
	public myLoot = 0;
	/**剩余采集时间 */
	public times = 0;
	/**角色信息 */
	public roleArr: Vo_MineRole[] = [];
	/**物品信息 */
	public itemArr: any[] = [];
	/**顺手物品信息 */
	public stealItemArr: any[] = [];
	/**抢夺物品信息 */
	public lootItemArr: any[] = [];
	public cfg: Ikfkz_275;
	public constructor() {
	}

	public initLib(value) {
		this.cfgID = value;
		this.cfg = Config.kfkz_275[value];
	}

	public static create(cfgID): Vo_MineData {
		let vo = new Vo_MineData();
		vo.initLib(cfgID);
		return vo;
	}
}

class Vo_MineRole {
	/**L:矿工id::: */
	public roleId = 0;
	/**矿工名字L */
	public roleName = "";
	/**矿工战力*/
	public power = 0;
	/**矿工国家*/
	public country = 0;
	/**矿工头像*/
	public headID = 0;
	/**矿工头像框*/
	public frameID = 0;
	public constructor() {
	}

	/**L:矿工idU:矿工名字L:矿工战力B:矿工国家I:矿工头像I:矿工头像框 */
	public initDate(data: BaseBytes) {
		let self = this;
		self.roleId = data.readLong();
		self.roleName = data.readUTF();
		self.power = data.readLong();
		self.country = data.readByte();
		self.headID = data.readInt();
		self.frameID = data.readInt();
	}
}