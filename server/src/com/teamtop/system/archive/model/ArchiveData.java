package com.teamtop.system.archive.model;

import java.util.Map;
import java.util.Set;

/**
 * 图鉴数据
 * 
 * @author hzp
 *
 */
public class ArchiveData {

	/**
	 * 玩家id
	 */
	private long hid;

	/**
	 * 图鉴
	 */
	private Map<Integer, ArchiveModel> archiveMap;

	/**
	 * 套装信息
	 */
	private Set<Integer> archiveSetList;

	/**
	 * 战力
	 */
	private int strength;

	public ArchiveData() {
		// TODO Auto-generated constructor stub
	}

	public ArchiveData(long hid, Map<Integer, ArchiveModel> archiveMap, Set<Integer> archiveSetList) {
		super();
		this.hid = hid;
		this.archiveMap = archiveMap;
		this.archiveSetList = archiveSetList;
	}

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public Map<Integer, ArchiveModel> getArchiveMap() {
		return archiveMap;
	}

	public void setArchiveMap(Map<Integer, ArchiveModel> archiveMap) {
		this.archiveMap = archiveMap;
	}

	public Set<Integer> getArchiveSetList() {
		return archiveSetList;
	}

	public void setArchiveSetList(Set<Integer> archiveSetList) {
		this.archiveSetList = archiveSetList;
	}

	public int getStrength() {
		return strength;
	}

	public void setStrength(int strength) {
		this.strength = strength;
	}

}
