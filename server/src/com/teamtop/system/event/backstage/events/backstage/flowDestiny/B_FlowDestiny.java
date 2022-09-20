package com.teamtop.system.event.backstage.events.backstage.flowDestiny;
/**
 * 符文流水
 * 
 * @author hepl
 *
 */
public class B_FlowDestiny {
	
	/**
	 * 唯一id
	 */
	private long id;
	/**
	 * 角色id
	 */
	private long hid;
	/**
	 * 类型  增加或减少，0增加，1减少 2升级 3被吞噬
	 */
	private int useType;
	/**
	 * 符文系统id
	 */
	private int sysid;
	/**
	 * 符文名称
	 */
	private String name;
	/**
	 * 区号
	 */
	private int zoneid;
	/**
	 * 操作时间
	 */
	private int operateTime;
	
	
	
	public B_FlowDestiny() {
		super();
	}
	
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public int getUseType() {
		return useType;
	}
	public void setUseType(int useType) {
		this.useType = useType;
	}
	public int getSysid() {
		return sysid;
	}
	public void setSysid(int sysid) {
		this.sysid = sysid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getZoneid() {
		return zoneid;
	}
	public void setZoneid(int zoneid) {
		this.zoneid = zoneid;
	}
	public int getOperateTime() {
		return operateTime;
	}
	public void setOperateTime(int operateTime) {
		this.operateTime = operateTime;
	}
	
	

}
