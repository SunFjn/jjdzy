package com.teamtop.system.crossCommonRank.cross.model;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.TreeSet;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.annotation.JSONField;
import com.alibaba.fastjson.parser.deserializer.PropertyProcessable;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.crossCommonRank.CommonActivityRankHandlerAbs;
import com.teamtop.system.crossCommonRank.CommonRankFunction;
import com.teamtop.system.crossCommonRank.CommonRankSysCache;
import com.teamtop.system.crossCommonRank.model.CommonActivityRank;
import com.teamtop.system.crossCommonRank.model.CommonRankModel;

public class CrossCommonRankCache implements PropertyProcessable {
	/** 系统id */
	@JSONField(ordinal = 1)
	private int sysId = 0;
	/** 期数 */
	@JSONField(ordinal = 2)
	private int qs = 0;
	/** 活动结束时间 */
	@JSONField(ordinal = 3)
	private int endTime = 0;
	/** 排行列表 */
	@JSONField(ordinal = 4)
	private TreeSet<CommonRankModel> rankTreeSet = new TreeSet<>();
	/** 发放奖励时的临时存储排行list 不用入库 */
    private transient List<CommonRankModel> tempRankList = new ArrayList<>();

    public CrossCommonRankCache() {
        // TODO Auto-generated constructor stub
    }

	public CrossCommonRankCache(int sysId) {
		this.sysId = sysId;
	}

	public int getQs() {
		return qs;
	}

	public void setQs(int qs) {
		this.qs = qs;
	}

	public int getEndTime() {
		return endTime;
	}

	public void setEndTime(int endTime) {
		this.endTime = endTime;
	}

	public TreeSet<CommonRankModel> getRankTreeSet() {
		return rankTreeSet;
	}

	public List<CommonRankModel> getTempRankList() {
		return tempRankList;
	}

	public void setRankTreeSet(TreeSet<CommonRankModel> rankTreeSet) {
		this.rankTreeSet = rankTreeSet;
	}

	public void setTempRankList(List<CommonRankModel> tempRankList) {
		this.tempRankList = tempRankList;
	}

	public int getSysId() {
		return sysId;
	}

	public void setSysId(int sysId) {
		this.sysId = sysId;
	}

	@Override
	public Type getType(String name) {
		// TODO Auto-generated method stub
		if ("rankTreeSet".equals(name)) {
			return JSONArray.class;
		}
		return null;
	}

	@Override
	public void apply(String name, Object value) {
		// TODO Auto-generated method stub
		if ("rankTreeSet".equals(name)) {
			if (sysId == 0) {
				sysId = ActivitySysId.GODGENTHISLIFE;
			}
			CommonActivityRankHandlerAbs<CommonActivityRank, CommonRankModel> abs = CommonRankSysCache
					.getActivityRankHandlerAbs(sysId);
			TreeSet<CommonRankModel> rankTreeSet = CommonRankFunction.getIns().jsonStringToRankSet((JSONArray) value,
					abs.getClass());
			this.rankTreeSet = rankTreeSet;
		} else if ("sysId".equals(name)) {
			sysId = ((Integer) value).intValue();
		} else if ("qs".equals(name)) {
			qs = ((Integer) value).intValue();
		} else if ("endTime".equals(name)) {
			endTime = ((Integer) value).intValue();
		}
	}

}
