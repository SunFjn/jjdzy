package com.teamtop.util.mybatis;

import com.teamtop.util.db.annotation.ColumnInt;
import com.teamtop.util.db.annotation.ColumnVar;
import com.teamtop.util.db.annotation.Index;
import com.teamtop.util.db.annotation.IndexEnum;
import com.teamtop.util.db.trans.FieldOrder;

/**
 * 数据库配置<br/>
 * 用于服务器启动时加载数据库地址
 * @author Administrator
 *
 */
public class DataBaseProp {
	/**
	 * zoneid
	 */
	@FieldOrder(order=1)
	private int zoneid;
	/**
	 * url
	 */
	@FieldOrder(order=2)
	private String url;
	/**
	 * user
	 */
	@FieldOrder(order=3)
	private String user;
	/**
	 * password
	 */
	@FieldOrder(order=4)
	private String pwd;
	/**
	 * dbname
	 */
	private String dbname;
	
	public String getDbname() {
		return dbname;
	}
	public void setDbname(String dbname) {
		this.dbname = dbname;
	}
	public int getZoneid() {
		return zoneid;
	}
	public void setZoneid(int zoneid) {
		this.zoneid = zoneid;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}
	public String getPwd() {
		return pwd;
	}
	public void setPwd(String pwd) {
		this.pwd = pwd;
	}
	public DataBaseProp(int zoneid, String url, String user, String pwd) {
		super();
		this.zoneid = zoneid;
		this.url = url;
		this.user = user;
		this.pwd = pwd;
	}
	public DataBaseProp() {
		super();
	}
	
	
}
