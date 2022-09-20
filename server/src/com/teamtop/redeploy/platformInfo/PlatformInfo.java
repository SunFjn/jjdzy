package com.teamtop.redeploy.platformInfo;

/**
 * 平台域名
 * @author hzp
 *
 */
public class PlatformInfo {

	/**
	 * 唯一id
	 */
	private long id;
	/**
	 * 平台
	 */
	private String pf;
	/**
	 * 平台域名
	 */
	private String pfIp;
	/**
	 * 端口
	 */
	private int port;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getPf() {
		return pf;
	}

	public void setPf(String pf) {
		this.pf = pf;
	}

	public String getPfIp() {
		return pfIp;
	}

	public void setPfIp(String pfIp) {
		this.pfIp = pfIp;
	}

	public int getPort() {
		return port;
	}

	public void setPort(int port) {
		this.port = port;
	}

}
