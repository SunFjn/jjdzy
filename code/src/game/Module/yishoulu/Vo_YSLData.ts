/**
 * 异兽录基础数据
 */
class Vo_YSLData {
	/**异兽id */
	public ysId: number = 0;
	/**异兽录升级表等级lv */
	public lvUpId: number = 0;
	/**异兽录套装表等级lv */
	public suitId: number = 0;
	/**当前经验 */
	public exp: number = 0;
	/**阶数 */
	public jie: number = 0;
	public cfg: Iysl_752;

	public constructor() {
	}

	public initDate(data: BaseBytes) {
		let self = this;
		self.ysId = data.readByte();
		self.lvUpId = data.readInt();
		self.exp = data.readInt();
		self.suitId = data.readInt();
		self.jie = data.readInt();
		self.cfg = Config.ysl_752[self.ysId];
		self.skillLv = self.ysId * 1000;
		self.initEquip(self.ysId);
	}

	public skillLv = 1000;
	public equipArr: Vo_YiShouEquip[] = [];
	public initEquip(cfgID: number) {
		let self = this;
		self.equipArr = [];
		for (let i = 1; i <= 4; i++) {
			if (Config.ystfzb_752[cfgID * 100 + i]) {
				let vo = Vo_YiShouEquip.create(cfgID * 100 + i);
				self.equipArr.push(vo);
			}
		}
	}
}