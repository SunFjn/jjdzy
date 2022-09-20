package com.teamtop.system.crossMine.model;

import java.util.ArrayList;

public class CrossMineZhanBao {

	private long hid;

	private ArrayList<ZhanBao> zhanBaos;

	public CrossMineZhanBao() {
		super();
	}

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public ArrayList<ZhanBao> getZhanBaos() {
		return zhanBaos;
	}

	public void setZhanBaos(ArrayList<ZhanBao> zhanBaos) {
		this.zhanBaos = zhanBaos;
	}

}
