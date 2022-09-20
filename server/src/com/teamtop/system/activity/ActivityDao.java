package com.teamtop.system.activity;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import com.alibaba.fastjson.JSON;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.alarmSystem.AlarmSystemFunction;
import com.teamtop.system.alarmSystem.AlarmType;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.mybatis.MybatisUtil;

public class ActivityDao {

	private static ActivityDao activityDao;

	public ActivityDao() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ActivityDao getIns() {
		if (activityDao == null) {
			activityDao = new ActivityDao();
		}
		return activityDao;
	}

	public List<ActivityData> findHeroAct(long hid, int zoneid) {
		SqlSession session = MybatisUtil.getSession(zoneid);
		List<ActivityData> list = new ArrayList<>();
		try {
			ActivityMapper mapper = session.getMapper(ActivityMapper.class);
			list = mapper.findHeroAct(hid);
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
		return list;
	}

	public void insertData(Hero hero, ActivityData data) {
		int zoneid = hero.getZoneid();
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			// StringBuilder sql = new StringBuilder();
			// sql.append("insert into activityData (hid,indexId,actId,periods,actStr)
			// values(");
			// sql.append(data.getHid()).append(",").append(data.getIndexId()).append(",");
			// sql.append(data.getActId()).append(",").append(data.getPeriods()).append(",'");
			// sql.append(data.getActStr()).append("')");
			ActivityMapper mapper = session.getMapper(ActivityMapper.class);
			data.setInsertActStr(JSON.toJSONString(data));
			mapper.insertData(data);
			session.commit();
		} catch (Exception e) {
			String errMsg = LogTool.exception(e, hero.getId(), hero.getNameZoneid(), "insertData activity table err, actId="+data.getActId()+", periods="+data.getPeriods());
			AlarmSystemFunction.getIns().alarmSend(AlarmType.SAVE_DB, hero.getId(), new Object[] { "activity", errMsg });
			throw e;
		} finally {
			MybatisUtil.closeSession(session);
		}
	}

	/** 保存玩家活动数据 */
	public void saveActData(Hero hero, Map<Integer, ActivityData> activityDataMap) {
		int zoneid = hero.getZoneid();
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			ActivityMapper mapper = session.getMapper(ActivityMapper.class);
			// 批量
			StringBuilder sql = new StringBuilder();
			StringBuilder sbVal = new StringBuilder();
			StringBuilder sbDup = new StringBuilder();
			sql.append("insert into activityData (id,hid,indexId,actId,periods,actStr)  ");
			sbVal.append("values(");
			sbDup.append(" on duplicate key update ");
			Iterator<ActivityData> iterator = activityDataMap.values().iterator();
			boolean first = true;
			for (; iterator.hasNext();) {
				ActivityData data = iterator.next();
				if (first) {
					first = false;
				} else {
					sbVal.append(",(");
				}
				sbVal.append(data.getId()).append(",").append(data.getHid()).append(",").append(data.getIndexId())
						.append(",").append(data.getActId()).append(",").append(data.getPeriods()).append(",'")
						.append(JSON.toJSONString(data)).append("')");
			}
			sbDup.append("indexId=VALUES(indexId),").append("actStr=VALUES(actStr);");
			sql.append(sbVal.toString()).append(sbDup.toString()).toString();
			mapper.saveActData(sql.toString());
			session.commit();
		} catch (Exception e) {
			String errMsg = LogTool.exception(e, hero.getId(), hero.getNameZoneid(), "saveActData activity table err");
			AlarmSystemFunction.getIns().alarmSend(AlarmType.SAVE_DB, hero.getId(), new Object[] { "activity", errMsg });
			throw e;
		} finally {
			MybatisUtil.closeSession(session);
		}

	}

	/**
	 * 删除玩家活动数据
	 * @param hero
	 * @param actId 活动id
	 * @param periods 期数
	 */
	public void deleteAct(Hero hero, int actId, int periods) {
		SqlSession session = MybatisUtil.getSession(hero.getZoneid());
		try {
			ActivityMapper mapper = session.getMapper(ActivityMapper.class);
			StringBuilder sql = new StringBuilder();
			sql.append("delete from activityData Where hid=").append(hero.getId()).append(" and actId=").append(actId)
					.append(" and periods=").append(periods).append(";");
			mapper.deleteAct(sql.toString());
			session.commit();
		} catch (Exception e) {
			String errMsg = LogTool.exception(e, hero.getId(), hero.getNameZoneid(), "deleteAct activity table err, actId="+actId+", periods="+periods);
			AlarmSystemFunction.getIns().alarmSend(AlarmType.SAVE_DB, hero.getId(), new Object[] { "activity", errMsg });
			throw e;
		}finally {
			MybatisUtil.closeSession(session);
		}
	}

	/**
	 * 删除对应活动数据(GM调用)
	 * 
	 * @param hero
	 * @param actId   活动id
	 * @param periods 期数
	 */
	public void deleteActGM(int actId) {
		SqlSession session = MybatisUtil.getSession(GameProperties.getFirstZoneId());
		try {
			ActivityMapper mapper = session.getMapper(ActivityMapper.class);
			StringBuilder sql = new StringBuilder();
			sql.append("delete from activityData Where ").append("actId=").append(actId).append(";");
			mapper.deleteAct(sql.toString());
			session.commit();
		} catch (Exception e) {
			LogTool.error(e, this, "deleteAct");
		} finally {
			MybatisUtil.closeSession(session);
		}
	}

	/** 清除玩家所有活动数据 */
	public void deleteAll(Hero hero) {
		SqlSession session = MybatisUtil.getSession(hero.getZoneid());
		try {
			ActivityMapper mapper = session.getMapper(ActivityMapper.class);
			StringBuilder sql = new StringBuilder();
			sql.append("delete from activityData Where hid=").append(hero.getId()).append(";");
			mapper.deleteAct(sql.toString());
			session.commit();
		} catch (Exception e) {
			String errMsg = LogTool.exception(e, hero.getId(), hero.getNameZoneid(), "deleteAll activity table err");
			AlarmSystemFunction.getIns().alarmSend(AlarmType.SAVE_DB, hero.getId(), new Object[] { "activity", errMsg });
			throw e;
		}finally {
			MybatisUtil.closeSession(session);
		}
	}

	public void deleteAct(List<Long> list, int actId, int periods) {
		StringBuilder sql = new StringBuilder();
		sql.append("delete from activityData Where hid in (");
		int size = list.size();
		for (int i = 0; i < size; i++) {
			if (i == 0) {
				sql.append(list.get(i));
			} else {
				sql.append(",").append(list.get(i));
			}
		}
		sql.append(") and actId=").append(actId).append(" and periods=").append(periods).append(";");
		for(int zoneid : GameProperties.zoneids) {			
			SqlSession session = MybatisUtil.getSession(zoneid);
			ActivityMapper mapper = session.getMapper(ActivityMapper.class);
			try {
				mapper.deleteAct(sql.toString());
				session.commit();
			} catch (Exception e) {
				String errMsg = LogTool.exception(e, "deleteAct activity table err, actId="+actId+", periods="+periods);
				AlarmSystemFunction.getIns().alarmSend(AlarmType.SAVE_DB, 0, new Object[] { "activity", errMsg });
				throw e;
			}finally {
				MybatisUtil.closeSession(session);
			}
		}
	}

}
