package com.teamtop.system.mail.model;

import com.teamtop.util.db.trans.FieldOrder;

/**
 * 邮件附件
 * @author Administrator
 *
 */
public class MailAdjunct {
//	/**
//	 * 邮件id
//	 */
//	private long mailId;
	/**
	 * 系统id
	 */
	@FieldOrder(order = 1)
	private int sysId;
	/**
	 * 唯一id,默认填0
	 */
	@FieldOrder(order = 2)
	private long unitId;
	/**
	 * 类型
	 */
	@FieldOrder(order = 3)
	private int type;
	/**
	 * 数量
	 */
	@FieldOrder(order = 4)
	private int num;
//	/**
//	 * 到期时间
//	 */
//	private int expiredTime;

	public MailAdjunct() {}
	
	public MailAdjunct(int sysId, long unitId, int type, int num,
			int bind, int expiredTime) {
		super();
		this.sysId = sysId;
		this.unitId = unitId;
		this.type = type;
		this.num = num;
//		this.expiredTime = expiredTime;
	}

//	public long getMailId() {
//		return mailId;
//	}
//	public void setMailId(long mailId) {
//		this.mailId = mailId;
//	}
	public int getSysId() {
		return sysId;
	}
	public void setSysId(int sysId) {
		this.sysId = sysId;
	}
	public long getUnitId() {
		return unitId;
	}
	public void setUnitId(long unitId) {
		this.unitId = unitId;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public int getNum() {
		return num;
	}
	public void setNum(int num) {
		this.num = num;
	}
}
