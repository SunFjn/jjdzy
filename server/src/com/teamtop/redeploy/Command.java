package com.teamtop.redeploy;
/**
 * 执行命令
 * @author Administrator
 *
 */
public class Command {
	/**
	 * 命令类型 close check cmd
	 */
	private String type;
	/**
	 * 内容，分别对应类型不一样
	 */
	private String content;
	private String result;
	
	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	
	
}
