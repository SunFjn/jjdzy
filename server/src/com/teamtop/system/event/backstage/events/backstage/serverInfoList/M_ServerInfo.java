package com.teamtop.system.event.backstage.events.backstage.serverInfoList;

public class M_ServerInfo {
	/*{"zoneid":2,"alias":"2区","state":2,"port":8002,"v":"V158","ip":"opt003.xmxy.2.net2"}*/
	/**	 * 唯一id	 */
	private long id;
	/**	 * 区号	 */
	private int zoneid;
	/**	 * 平台号	 */
	private String pf;
	/**	 * 区服名称	 */
	private String alias;
	/**	 * 游戏端口号,正式服后端维护	 */
	private int port;
	/**	 * 后台端口号	 */
	private int houtaiport;
	/**	 * 充值端口	 */
	private int rechargeport;
	/**	 * ip地址,正式服后端维护	 */
	private String ip;
	/**	 * 服务器状态	 0维护 1新 2火爆*/
	private int state;
	/**	 * 数据库ip,正式服后端维护	 */
	private String dbip;
	/**	 * 数据库端口	 */
	private int dbport;
	/**	 * 数据库名	 */
	private String dbname;
	/**	 * 数据库user	 */
	private String dbuser;
	/**	 * 数据库密码	 */
	private String dbpwd;
	/**	 * 实际开服时间 时间戳	 */
	private int opentime;
	/**	 * 自动开服标志	 */
	private int autoopen;
	/**	 * 玩家数	 */
	private long playerNum;
	/**	 * 合服区	 */
	private String hefuServer;
	/**	 * 合服时间	 */
	private int hefuTime;
	/**	 * 维护公告	 */
	private String content;
	/**	 * 客户端版本号	 */
	private String clientversion;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public int getZoneid() {
		return zoneid;
	}

	public void setZoneid(int zoneid) {
		this.zoneid = zoneid;
	}

	public String getPf() {
		return pf;
	}

	public void setPf(String pf) {
		this.pf = pf;
	}

	public String getAlias() {
		return alias;
	}

	public void setAlias(String alias) {
		this.alias = alias;
	}

	public int getPort() {
		return port;
	}

	public void setPort(int port) {
		this.port = port;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public int getState() {
		return state;
	}

	public void setState(int state) {
		this.state = state;
	}

	public long getPlayerNum() {
		return playerNum;
	}

	public void setPlayerNum(long playerNum) {
		this.playerNum = playerNum;
	}

	public String getContent() {
		return content == null ? "" : content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public int getHoutaiport() {
		return houtaiport;
	}

	public void setHoutaiport(int houtaiport) {
		this.houtaiport = houtaiport;
	}

	public int getRechargeport() {
		return rechargeport;
	}

	public void setRechargeport(int rechargeport) {
		this.rechargeport = rechargeport;
	}

	public String getDbip() {
		return dbip;
	}

	public void setDbip(String dbip) {
		this.dbip = dbip;
	}

	public int getDbport() {
		return dbport;
	}

	public void setDbport(int dbport) {
		this.dbport = dbport;
	}

	public String getDbname() {
		return dbname;
	}

	public void setDbname(String dbname) {
		this.dbname = dbname;
	}

	public String getDbuser() {
		return dbuser;
	}

	public void setDbuser(String dbuser) {
		this.dbuser = dbuser;
	}

	public String getDbpwd() {
		return dbpwd;
	}

	public void setDbpwd(String dbpwd) {
		this.dbpwd = dbpwd;
	}

	public int getOpentime() {
		return opentime;
	}

	public void setOpentime(int opentime) {
		this.opentime = opentime;
	}

	public int getAutoopen() {
		return autoopen;
	}

	public void setAutoopen(int autoopen) {
		this.autoopen = autoopen;
	}

	public String getClientversion() {
		return clientversion;
	}

	public void setClientversion(String clientversion) {
		this.clientversion = clientversion;
	}

	public String getHefuServer() {
		return hefuServer;
	}

	public void setHefuServer(String hefuServer) {
		this.hefuServer = hefuServer;
	}

	public int getHefuTime() {
		return hefuTime;
	}

	public void setHefuTime(int hefuTime) {
		this.hefuTime = hefuTime;
	}

}

//TODO 自动同步3个字段，发现有改动，就刷新后台
//TODO 写个接口给运维，同步db的数据到缓存。

