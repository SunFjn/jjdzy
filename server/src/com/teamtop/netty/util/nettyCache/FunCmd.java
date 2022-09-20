package com.teamtop.netty.util.nettyCache;

public class FunCmd {
	private int funid;
	private int cmd;
	private int level;
	private int guanqiaId;
	public int getFunid() {
		return funid;
	}
	public int getCmd() {
		return cmd;
	}
	public int getLevel() {
		return level;
	}

	public int getGuanqiaId() {
		return guanqiaId;
	}

	public FunCmd(int funid, int cmd, int level, int guanqiaId) {
		super();
		this.funid = funid;
		this.cmd = cmd;
		this.level = level;
		this.guanqiaId = guanqiaId;
	}
	
}
