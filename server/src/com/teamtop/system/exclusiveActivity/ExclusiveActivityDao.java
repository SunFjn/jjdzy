package com.teamtop.system.exclusiveActivity;

import org.apache.ibatis.session.SqlSession;

import com.teamtop.system.alarmSystem.AlarmSystemFunction;
import com.teamtop.system.alarmSystem.AlarmType;
import com.teamtop.system.exclusiveActivity.model.ExclusiveActivityData;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.mybatis.MybatisUtil;

public class ExclusiveActivityDao {

	private static ExclusiveActivityDao dao;

	private ExclusiveActivityDao() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ExclusiveActivityDao getDao() {
		if (dao == null) {
			dao = new ExclusiveActivityDao();
		}
		return dao;
	}

	public ExclusiveActivityData findHeroExAct(long hid, int zoneid) {
		SqlSession session = MybatisUtil.getSession(zoneid);
		ExclusiveActivityData data = null;
		try {
			ExclusiveActivityMapper mapper = session.getMapper(ExclusiveActivityMapper.class);
			data = mapper.findHeroExAct(hid);
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
		return data;
	}

	/** 保存玩家活动数据 */
	public void saveExActData(Hero hero, ExclusiveActivityData data) {
		int zoneid = hero.getZoneid();
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			ExclusiveActivityMapper mapper = session.getMapper(ExclusiveActivityMapper.class);
			// 批量
			StringBuilder sql = new StringBuilder();
			StringBuilder sbVal = new StringBuilder();
			StringBuilder sbDup = new StringBuilder();
			sql.append("insert into exclusiveActivityData (hid,exActivityStr,exActOpenStateStr)  ");
			sbVal.append("values(");
			sbDup.append(" on duplicate key update ");
			sbVal.append(data.getHid()).append(",'").append(data.getExActivityStr()).append("','")
						.append(data.getExActOpenStateStr()).append("')");
			sbDup.append("exActivityStr=VALUES(exActivityStr),").append("exActOpenStateStr=VALUES(exActOpenStateStr);");
			sql.append(sbVal.toString()).append(sbDup.toString()).toString();
			mapper.saveExActData(sql.toString());
			session.commit();
		} catch (Exception e) {
			String errMsg = LogTool.exception(e, hero.getId(), hero.getNameZoneid(), "saveExActData exclusiveActivityData table err");
			AlarmSystemFunction.getIns().alarmSend(AlarmType.SAVE_DB, hero.getId(),
					new Object[] { "exActivity", errMsg });
			throw e;
		} finally {
			MybatisUtil.closeSession(session);
		}

	}

}
