package com.teamtop.system.crossWenDingTianXia.model;

import java.util.List;
import java.util.Map;

import com.teamtop.system.NPC.NPC;

public class CrossWenDingTianXiaRoom {

	private int roomID;//房间ID  TODO 这里要改为scene唯一ID
	private List<CrossWenDingTianXiaScoreRank> rankList;
	private long hidYuXi;//玉玺持有者ID
	private int iconYuXi;//玉玺持有者头像ID
	private int frameYuXi;//玉玺持有者头像框
	private String nameYuXi;//玉玺持有者名字
	private Map<Integer ,Map<Long ,NPC>> npcMap;
	private Map<Integer, Integer> sceneUnitIdMap;//副本唯一ID  key:楼层  value:唯一ID
	
	public int getRoomID() {
		return roomID;
	}
	public void setRoomID(int roomID) {
		this.roomID = roomID;
	}
	public List<CrossWenDingTianXiaScoreRank> getRankList() {
		return rankList;
	}
	public void setRankList(List<CrossWenDingTianXiaScoreRank> rankList) {
		this.rankList = rankList;
	}
	public long getHidYuXi() {
		return hidYuXi;
	}
	public void setHidYuXi(long hidYuXi) {
		this.hidYuXi = hidYuXi;
	}
	public Map<Integer, Map<Long, NPC>> getNpcMap() {
		return npcMap;
	}
	public void setNpcMap(Map<Integer, Map<Long, NPC>> npcMap) {
		this.npcMap = npcMap;
	}
	public int getIconYuXi() {
		return iconYuXi;
	}
	public void setIconYuXi(int iconYuXi) {
		this.iconYuXi = iconYuXi;
	}
	public int getFrameYuXi() {
		return frameYuXi;
	}
	public void setFrameYuXi(int frameYuXi) {
		this.frameYuXi = frameYuXi;
	}
	public String getNameYuXi() {
		return nameYuXi;
	}
	public void setNameYuXi(String nameYuXi) {
		this.nameYuXi = nameYuXi;
	}
	public Map<Integer, Integer> getSceneUnitIdMap() {
		return sceneUnitIdMap;
	}
	public void setSceneUnitIdMap(Map<Integer, Integer> sceneUnitIdMap) {
		this.sceneUnitIdMap = sceneUnitIdMap;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		CrossWenDingTianXiaRoom model = (CrossWenDingTianXiaRoom) obj;
		if(this.roomID != model.getRoomID()){
			return false;
		}
		return true;
	}
}
