package com.teamtop.system.mail.model;

import com.teamtop.util.cache.CacheModel;
import com.teamtop.util.db.trans.FieldOrder;
/**
 * 邮件
 * @author Administrator
 *
 */
public class Mail extends CacheModel {
	/**
	 * id
	 */
	@FieldOrder(order = 1)
	private long id;
	/**
	 * 接收者id
	 */
	@FieldOrder(order = 2)
	private long receiverId;
	/**
	 * 接收者
	 */
	@FieldOrder(order = 3)
	private String receiver;
	/**
	 * 邮件内容  数据由“_”分开
	 */
	@FieldOrder(order = 4)
	private String content;
	/**
	 * 邮件标识：由表决定,excel表中的ID
	 */
	@FieldOrder(order = 5)
	private int flag;
	/**
	 * 发送时间
	 */
	@FieldOrder(order = 6)
	private int sendTime;
	/**
	 * 邮件读取状态：参考 MailConst.MAIL_READ
	 */
	@FieldOrder(order = 7)
	private int isRead;
	/**
	 * 附件领取状态：参考 MailConst.ADJ_STATE_0
	 */
	@FieldOrder(order = 8)
	private int isGetAdj;
	/**
	 * 附件，数据库字符串长度500，小鲜肉定了不超过30个附件
	 */
	@FieldOrder(order = 9)
	private MailAdjunct[] mailAdjuncts;
	/**
	 * 元宝数量
	 */
	@FieldOrder(order = 10)
	private int yuanbao;
	/**
	 * 铜币数量
	 */
	@FieldOrder(order = 11)
	private int coin;
	
	/** 邮件标题 */
	@FieldOrder(order = 12)
	private String title;

	public Mail(){}

	public Mail(long senderId, String sender, long receiverId,
			String receiver, String title, String content, int type, int flag,
			int sendTime, int adjunctFlag, int isRead,int isGetAdj,
			MailAdjunct[] mailAdjuncts,int yuanbao,int coin) {
		super();
		this.receiverId = receiverId;
		this.receiver = receiver;
		this.content = content;
		this.flag = flag;
		this.sendTime = sendTime;
		this.isRead = isRead;
		this.isGetAdj=isGetAdj;
		this.mailAdjuncts = mailAdjuncts;
		this.yuanbao=yuanbao;
		this.coin=coin;
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
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public int getFlag() {
		return flag;
	}
	public void setFlag(int flag) {
		this.flag = flag;
	}
	public int getSendTime() {
		return sendTime;
	}
	public void setSendTime(int sendTime) {
		this.sendTime = sendTime;
	}
	public MailAdjunct[] getMailAdjuncts() {
		return mailAdjuncts;
	}
	public void setMailAdjuncts(MailAdjunct[] mailAdjuncts) {
		this.mailAdjuncts = mailAdjuncts;
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

	public int getYuanbao() {
		return yuanbao;
	}

	public void setYuanbao(int yuanbao) {
		this.yuanbao = yuanbao;
	}

	public int getCoin() {
		return coin;
	}

	public void setCoin(int coin) {
		this.coin = coin;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

}
