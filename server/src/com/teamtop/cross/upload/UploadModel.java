package com.teamtop.cross.upload;
/**
 * 上传对象
 * @author Administrator
 *
 */
public class UploadModel {
	private int zoneid;//区号
	private int needNum;//需要上传的数量
	private int realNum;//实际上传的数量
	private int startUploadTime;//开始上传的时间
	
	public int getStartUploadTime() {
		return startUploadTime;
	}
	public void setStartUploadTime(int startUploadTime) {
		this.startUploadTime = startUploadTime;
	}
	public int getZoneid() {
		return zoneid;
	}
	public void setZoneid(int zoneid) {
		this.zoneid = zoneid;
	}
	public int getNeedNum() {
		return needNum;
	}
	public void setNeedNum(int needNum) {
		this.needNum = needNum;
	}
	public void addRealNum(){
		this.realNum++;
	}
	public int getRealNum() {
		return realNum;
	}
	public void setRealNum(int realNum) {
		this.realNum = realNum;
	}
	public UploadModel(int zoneid, int needNum) {
		super();
		this.zoneid = zoneid;
		this.needNum = needNum;
	}
	
	
}
