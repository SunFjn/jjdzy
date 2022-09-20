package com.teamtop.system.event.backstage.events.flowMail;

/**
 * 邮件流水
 * @author hepl
 *
 */
public class B_FlowMail {
	//邮件id
	private long id;
	//接收人id
	private long receiverId;
	//接收者
	private String receiver;
	/**	 * 邮件读取状态：参考 MailConst.MAIL_READ	 */
	private int isRead;
	/**	 * 附件领取状态：参考 MailConst.ADJ_STATE_0	 */
	private int isGetAdj;
	//内容
	private String content;
	//流水记录时间
	private int time;
	//元宝数量
	private int yuanbao;
	//铜币数量
	private int coin;
	//附件内容
	private String fujian;
	//区号
	private int zoneid;
	//发送时间
	private int sendTime;
	// 邮件类型
	private String mailType;
	
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public int getZoneid() {
		return zoneid;
	}
	public void setZoneid(int zoneid) {
		this.zoneid = zoneid;
	}
	public String getFujian() {
		return fujian;
	}
	public void setFujian(String fujian) {
		this.fujian = fujian;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getReceiverId() {
		return receiverId;
	}
	public void setReceiverId(long receiverId) {
		this.receiverId = receiverId;
	}
	public String getReceiver() {
		return receiver;
	}
	public void setReceiver(String receiver) {
		this.receiver = receiver;
	}
	public int getSendTime() {
		return sendTime;
	}
	public void setSendTime(int sendTime) {
		this.sendTime = sendTime;
	}
	public int getIsRead() {
		return isRead;
	}
	public void setIsRead(int isRead) {
		this.isRead = isRead;
	}
	public int getIsGetAdj() {
		return isGetAdj;
	}
	public void setIsGetAdj(int isGetAdj) {
		this.isGetAdj = isGetAdj;
	}
	public int getTime() {
		return time;
	}
	public void setTime(int time) {
		this.time = time;
	}
	public int getCoin() {
		return coin;
	}
	public void setCoin(int coin) {
		this.coin = coin;
	}
	public int getYuanbao() {
		return yuanbao;
	}
	public void setYuanbao(int yuanbao) {
		this.yuanbao = yuanbao;
	}
	public String getMailType() {
		return mailType;
	}
	public void setMailType(String mailType) {
		this.mailType = mailType;
	}
}
