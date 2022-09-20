package com.teamtop.system.event.serverEvent;

public class Smodel {
	private String className;
	private String desc;
	private String pf;
	public Smodel(String className, String desc, String pf) {
		super();
		this.className = className;
		this.desc = desc;
		this.pf = pf;
	}
	public String getClassName() {
		return className;
	}
	public String getDesc() {
		return desc;
	}
	public String getPf() {
		return pf;
	}
}
