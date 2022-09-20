package com.teamtop.system.event.useAddEvent;
/**
 * 邮件信息
 * @author Administrator
 *
 */
public class MailInfo {
	/**
	 * 邮件ID
	 */
	private int mailId;
	/**
	 * 邮件内容
	 */
	private Object[] mailContent;
	public int getMailId() {
		return mailId;
	}
	public Object[] getMailContent() {
		return mailContent;
	}
	/**
	 * 邮件信息
	 * @param mailId 邮件ID
	 * @param mailContent 邮件内容
	 */
	public MailInfo(int mailId, Object[] mailContent) {
		super();
		this.mailId = mailId;
		this.mailContent = mailContent;
	}
	
}
