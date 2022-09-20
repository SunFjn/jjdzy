package com.teamtop.util.mail;
/**
 * 发送的内容
 * @author Administrator
 *
 */
public class QQContent {
	private String title;
	private String content;
	public String getTitle() {
		return title;
	}
	public String getContent() {
		return content;
	}
	public QQContent(String title, String content) {
		super();
		this.title = title;
		this.content = content;
	}
	
	
}
