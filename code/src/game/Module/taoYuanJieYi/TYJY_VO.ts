class TYJY_VO {
	public gangId:number = 0;//义盟id
	public gangNum:number = 0;
	public gangName:string = "";//义盟名字
	public status:number = 0;//4.取消申请 3.申请加入 2申请已满 1已满员
	public power:number = 0;//战力
	public dage:string = "";

	public constructor() {
	}

	public readGangMsg(data: BaseBytes){
		this.gangId = data.readLong();
		this.gangNum = data.readInt();
		this.gangName = data.readUTF();
		this.status = data.readByte();
		this.power = data.readLong();
		this.dage = data.readUTF();
	}

	public playerId:number = 0;//玩家id
	public playerName:string = "";//玩家名字
	public offLine:number = 0;//玩家离线时间 =0在线，>0离线时间(秒)
	//头像id
	public headId: number = 0;
	//头像框
	public frameId: number = 0;
	public position: number = 0;//地位标识：1.大哥 2.二哥 3.三弟
	public playerLv:number = 0;//玩家等级
	public readMemberMsg(data: BaseBytes){
		this.playerId = data.readLong();
		this.playerName = data.readUTF();
		this.offLine = data.readInt();
		this.headId = data.readInt();
		this.frameId = data.readInt();
		this.position = data.readByte();
		this.playerVip = data.readByte();
		this.playerLv = data.readInt();
		this.playerPower = data.readLong();
	}

	public playerPower:number = 0;//玩家战力
	public playerVip:number = 0;//玩家vip
	public readApplyMsg(data: BaseBytes){
		this.playerId = data.readLong();
		this.playerName = data.readUTF();
		this.headId = data.readInt();
		this.frameId = data.readInt();
		this.playerPower = data.readLong();
		this.playerVip = data.readByte();
	}
}