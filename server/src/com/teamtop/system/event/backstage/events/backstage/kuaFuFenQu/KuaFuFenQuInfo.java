package com.teamtop.system.event.backstage.events.backstage.kuaFuFenQu;

/**
 * 跨服分组
 * @author hzp
 *
 */
public class KuaFuFenQuInfo {

	/** 中央服编号*/
	private int centralIndex;

	/** 域名*/
	private String centralIp;

	/** 端口*/
	private int centralPort;

	/** 范围*/
	private String numRange;

	/** 平台好*/
	private String pf;

	public int getCentralIndex() {
		return centralIndex;
	}

	public void setCentralIndex(int centralIndex) {
		this.centralIndex = centralIndex;
	}

	public String getCentralIp() {
		return centralIp;
	}

	public void setCentralIp(String centralIp) {
		this.centralIp = centralIp;
	}

	public int getCentralPort() {
		return centralPort;
	}

	public void setCentralPort(int centralPort) {
		this.centralPort = centralPort;
	}

	public String getNumRange() {
		return numRange;
	}

	public void setNumRange(String numRange) {
		this.numRange = numRange;
	}

	public String getPf() {
		return pf;
	}

	public void setPf(String pf) {
		this.pf = pf;
	}

}
