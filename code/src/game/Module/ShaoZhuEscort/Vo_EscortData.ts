/**
 * 护送基础数据
 */
class Vo_EscortData {
	/**玩家id */
	public playerId:number = 0;
	/**玩家名字 */
	public playerName:string = "";
	/**护送少主武将 */
	public guardId:number = 0;
	/**战力 */
	public power:number = 0;
	/**头像id，没有则为0 */
	public headID:number = 0;
	/**头像框 */
	public frameID:number = 0;
	/**国家 */
	public country:number = 0;
	/**剩余时间 */
	public timeRemain:number = 0;
	/**状态：0：不可拦截，1：可拦截 */
	public state:number = 0;
	public constructor() {
	}

	public initDate(data: BaseBytes) {
		let self = this;
		self.playerId = data.readLong();
		self.playerName = data.readUTF();
		self.guardId = data.readInt();
		self.power = data.readLong();
		self.headID = data.readInt();
		self.frameID = data.readInt();
		self.country = data.readInt();
		self.timeRemain = data.readInt();
		self.state = data.readByte();
	}
}