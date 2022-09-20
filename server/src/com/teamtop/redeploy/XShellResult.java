package com.teamtop.redeploy;
/**
 * xshell的执行返回
 * @author Administrator
 *
 */
public class XShellResult {
	private int exitValue;
	private String printInfo;
	public int getExitValue() {
		return exitValue;
	}
	public void setExitValue(int exitValue) {
		this.exitValue = exitValue;
	}
	public String getPrintInfo() {
		return printInfo;
	}
	public void setPrintInfo(String printInfo) {
		this.printInfo = printInfo;
	}
	public XShellResult(int exitValue, String printInfo) {
		super();
		this.exitValue = exitValue;
		this.printInfo = printInfo;
	}
	
}
