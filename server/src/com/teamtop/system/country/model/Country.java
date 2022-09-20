package com.teamtop.system.country.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import com.teamtop.system.country.kingship.model.KingShipModel;
import com.teamtop.util.db.trans.FieldOrder;

/**
 * 国家成员
 *
 */
public class Country {
	/** 国家id */
	@FieldOrder(order = 1)
	private int cid;
	/** 国家名称 */
	@FieldOrder(order = 2)
	private String name;
	/** 国家成员 */
	private List<Long> hidList = new ArrayList<Long>();

	/** 老王位之争 （弃用） **/
	/** 老王位之争各国玩家排名缓存 3个位置 （弃用）**/
	@FieldOrder(order = 3)
	private List<KingShipModel> kingShipModelList;
	/** 当天参与王位之争的成员（弃用） **/
	@FieldOrder(order = 4)
	private Map<Long, KingShipModel> joinKingShipMap;
	/** 皇城侍卫成员 （弃用） **/
	@FieldOrder(order = 5)
	private List<KingShipModel> kingShiplGuardList;

	public Country() {
		super();
	}

	public int getCid() {
		return cid;
	}

	public void setCid(int cid) {
		this.cid = cid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Long> getHidList() {
		return hidList;
	}

	public void setHidList(List<Long> hidList) {
		this.hidList = hidList;
	}

	public List<KingShipModel> getKingShipModelList() {
		return kingShipModelList;
	}

	public void setKingShipModelList(List<KingShipModel> kingShipModelList) {
		this.kingShipModelList = kingShipModelList;
	}

	public List<KingShipModel> getKingShiplGuardList() {
		return kingShiplGuardList;
	}

	public void setKingShiplGuardList(List<KingShipModel> kingShiplGuardList) {
		this.kingShiplGuardList = kingShiplGuardList;
	}

	public Map<Long, KingShipModel> getJoinKingShipMap() {
		return joinKingShipMap;
	}

	public void setJoinKingShipMap(Map<Long, KingShipModel> joinKingShipMap) {
		this.joinKingShipMap = joinKingShipMap;
	}

}
