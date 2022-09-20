package com.teamtop.system.mail.model;
/**
 * 用于接收查询出来的邮件
 * @author Administrator
 *
 */
public class MailTemp {
	/**
	 * 邮件id
	 */
	private long id;
	/**
	 * 接收者id
	 */
	private long receiverId;
	/**
	 * 时间
	 */
	private int time;
	/**
	 * 邮件读取状态：1:未读。2:已读
	 */
	private int isRead;
	/**
	 * 附件领取状态：1:还有附件没领取。2:附件已领取
	 */
	private int isGetAdj;
	/**
	 * 值
	 */
	private String value;
	
	private String orderBy;
	
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
	public int getTime() {
		return time;
	}
	public void setTime(int time) {
		this.time = time;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public String getOrderBy() {
		return orderBy;
	}
	public void setOrderBy(String orderBy) {
		this.orderBy = orderBy;
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

}
