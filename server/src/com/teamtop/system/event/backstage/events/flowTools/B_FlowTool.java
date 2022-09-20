package com.teamtop.system.event.backstage.events.flowTools;

/**
 * 道具流水（道具/装备）
 * @author hepl
 *
 */
public class B_FlowTool {
	/**
	 * 唯一id
	 */
	private long id;
	/**
	 * 角色id
	 */
	private long hid;
	/**
	 * 消耗类型
	 */
	private int useType;
	/**
	 * 道具系统id
	 */
	private int sysid;
	/**
	 * 道具名称
	 */
	private String name;
	/**
	 * 道具数量
	 */
	private int num;
	/**
	 * 增加或减少，0增加，1减少
	 */
	private int isadd;
	/**
	 * 操作原因
	 */
	private int reason;
	/**
	 * 区号
	 */
	private int zoneid;
	/**
	 * 操作时间
	 */
	private int operateTime;
	/**
	 * 剩余数量
	 */
	private int totalNum;
	/**
	 * 平台代码 
	 */
	private String pfcode;
	/**
	 * 注册系统
	 */
	private String usesys;
	
	
	
	public int getTotalNum() {
		return totalNum;
	}
	public void setTotalNum(int totalNum) {
		this.totalNum = totalNum;
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
	public int getSysid() {
		return sysid;
	}
	public void setSysid(int sysid) {
		this.sysid = sysid;
	}
	public int getNum() {
		return num;
	}
	public void setNum(int num) {
		this.num = num;
	}
	public int getIsadd() {
		return isadd;
	}
	public void setIsadd(int isadd) {
		this.isadd = isadd;
	}
	public int getReason() {
		return reason;
	}
	public void setReason(int reason) {
		this.reason = reason;
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
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPfcode() {
		return pfcode;
	}
	public void setPfcode(String pfcode) {
		this.pfcode = pfcode;
	}
	public String getUsesys() {
		return usesys;
	}
	public void setUsesys(String usesys) {
		this.usesys = usesys;
	}
	
	public int getUseType() {
		return useType;
	}
	public void setUseType(int useType) {
		this.useType = useType;
	}
	public B_FlowTool(){
		
	}
	
	public B_FlowTool(long hid,int useType, int sysid, int num, int isadd, int reason, int zoneid, int operateTime){
		this.hid = hid;
		this.useType=useType;
		this.sysid = sysid;
		this.num = num;
		this.isadd = isadd;
		this.reason = reason;
		this.zoneid = zoneid;
		this.operateTime = operateTime;
	}
	
}
