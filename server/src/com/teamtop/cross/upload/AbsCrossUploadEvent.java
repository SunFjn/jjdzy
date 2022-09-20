package com.teamtop.cross.upload;

import io.netty.channel.Channel;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.netty.util.NettyWrite;
/**
 * 上传事件基类
 */
public abstract class AbsCrossUploadEvent {
	//上传的系统id
	private int id;
	//上传的系统名字
	private String name;
	//允许上传的最后时间
	private int deadline;
	//正在进行的上传map
	private Map<Integer, UploadModel> processMap = new ConcurrentHashMap<Integer,UploadModel>();
	//已经完成上传的map
	private Map<Integer, UploadModel> finishMap = new ConcurrentHashMap<Integer,UploadModel>();
	//是否已经准备完成
//	private boolean ready;
	private int tellUploadCmd;
	
	public AbsCrossUploadEvent(UploadEnum ue, int tellUploadCmd) {
		super();
		this.id = ue.ordinal();
		this.name = ue.name();
		this.tellUploadCmd = tellUploadCmd;
	}
	
	public int getId() {
		return id;
	}

	public abstract void dataRecieve(Channel channel,CrossData crossData);
	
	public void tellUpload(int zoneid){
		CrossData crossData = new CrossData();
		crossData.putObject(CrossEnum.zoneid, zoneid);
		NettyWrite.writeXData(CrossCache.getChannel(zoneid), tellUploadCmd,crossData);
	}
//	public boolean isReady() {
//		return ready;
//	}
	public void ready(){
//		ready = true;
		UploadCache.addCrossUploadEvent(this);
	}
	public void addModel(UploadModel uploadModel){
		processMap.put(uploadModel.getZoneid(), uploadModel);
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getDeadline() {
		return deadline;
	}
	public void setDeadline(int deadline) {
		this.deadline = deadline;
	}
	public Map<Integer, UploadModel> getProcessMap() {
		return processMap;
	}
	public void setProcessMap(Map<Integer, UploadModel> processMap) {
		this.processMap = processMap;
	}
	public Map<Integer, UploadModel> getFinishMap() {
		return finishMap;
	}
	public void setFinishMap(Map<Integer, UploadModel> finishMap) {
		this.finishMap = finishMap;
	}
	public void addFinish(UploadModel uploadModel){
		finishMap.put(uploadModel.getZoneid(), uploadModel);
	}
}
