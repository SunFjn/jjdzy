package com.teamtop.system.openDaysSystem;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import com.alibaba.fastjson.JSON;
import com.teamtop.system.alarmSystem.AlarmSystemFunction;
import com.teamtop.system.alarmSystem.AlarmType;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.mybatis.MybatisUtil;

public class OpenDaysSystemDao {

	private static OpenDaysSystemDao dao;

	private OpenDaysSystemDao() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized OpenDaysSystemDao getDao() {
		if (dao == null) {
			dao = new OpenDaysSystemDao();
		}
		return dao;
	}

	public List<AbsOpenDaysSystemModel> findHeroOpSys(long hid, int zoneid) {
		SqlSession session = MybatisUtil.getSession(zoneid);
		List<AbsOpenDaysSystemModel> list = new ArrayList<>();
		try {
			OpenDaysSystemMapper mapper = session.getMapper(OpenDaysSystemMapper.class);
			list = mapper.findHeroOpSys(hid);
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
		return list;
	}

	public void insertData(Hero hero, AbsOpenDaysSystemModel data) {
		int zoneid = hero.getZoneid();
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			// StringBuilder sql = new StringBuilder();
			// sql.append("insert into activityData (hid,indexId,actId,periods,actStr)
			// values(");
			// sql.append(data.getHid()).append(",").append(data.getIndexId()).append(",");
			// sql.append(data.getActId()).append(",").append(data.getPeriods()).append(",'");
			// sql.append(data.getActStr()).append("')");
			OpenDaysSystemMapper mapper = session.getMapper(OpenDaysSystemMapper.class);
			data.setInsertActStr(JSON.toJSONString(data));
			mapper.insertData(data);
			session.commit();
		} catch (Exception e) {
			String errMsg = LogTool.exception(e, hero.getId(), hero.getNameZoneid(),
					"insertData openDaysSystem table err, uid=" + data.getUid() + ", qs=" + data.getQs());
			AlarmSystemFunction.getIns().alarmSend(AlarmType.SAVE_DB, hero.getId(),
					new Object[] { "openDaysSystem", errMsg });
			throw e;
		} finally {
			MybatisUtil.closeSession(session);
		}
	}

	/** 保存玩家活动数据 */
	public void saveOpSysData(Hero hero, Map<Integer, AbsOpenDaysSystemModel> activityDataMap) {
		int zoneid = hero.getZoneid();
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			OpenDaysSystemMapper mapper = session.getMapper(OpenDaysSystemMapper.class);
			// 批量
			StringBuilder sql = new StringBuilder();
			StringBuilder sbVal = new StringBuilder();
			StringBuilder sbDup = new StringBuilder();
			sql.append("insert into openDaysSystem (id,hid,uid,sysid,qs,opSysStr)  ");
			sbVal.append("values(");
			sbDup.append(" on duplicate key update ");
			Iterator<AbsOpenDaysSystemModel> iterator = activityDataMap.values().iterator();
			boolean first = true;
			for (; iterator.hasNext();) {
				AbsOpenDaysSystemModel data = iterator.next();
				if (first) {
					first = false;
				} else {
					sbVal.append(",(");
				}
				sbVal.append(data.getId()).append(",").append(data.getHid()).append(",").append(data.getUid())
						.append(",").append(data.getSysid()).append(",").append(data.getQs()).append(",'")
						.append(JSON.toJSONString(data)).append("')");
			}
			sbDup.append("opSysStr=VALUES(opSysStr);");
			sql.append(sbVal.toString()).append(sbDup.toString()).toString();
			mapper.saveOpSysData(sql.toString());
			session.commit();
		} catch (Exception e) {
			String errMsg = LogTool.exception(e, hero.getId(), hero.getNameZoneid(), "saveOpSysData openDaysSystem table err");
			AlarmSystemFunction.getIns().alarmSend(AlarmType.SAVE_DB, hero.getId(),
					new Object[] { "openDaysSystem", errMsg });
			throw e;
		} finally {
			MybatisUtil.closeSession(session);
		}

	}
	
	public void updateData(Hero hero, AbsOpenDaysSystemModel data) {
		int zoneid = hero.getZoneid();
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			OpenDaysSystemMapper mapper = session.getMapper(OpenDaysSystemMapper.class);
			// 批量
			StringBuilder sql = new StringBuilder();
			StringBuilder sbVal = new StringBuilder();
			StringBuilder sbDup = new StringBuilder();
			sql.append("insert into openDaysSystem (id,hid,uid,sysid,qs,opSysStr)  ");
			sbVal.append("values(");
			sbDup.append(" on duplicate key update ");
			sbVal.append(data.getId()).append(",").append(data.getHid()).append(",").append(data.getUid()).append(",")
					.append(data.getSysid()).append(",").append(data.getQs()).append(",'")
					.append(JSON.toJSONString(data)).append("')");
			sbDup.append("opSysStr=VALUES(opSysStr);");
			sql.append(sbVal.toString()).append(sbDup.toString()).toString();
			mapper.saveOpSysData(sql.toString());
			session.commit();
		} catch (Exception e) {
			String errMsg = LogTool.exception(e, hero.getId(), hero.getNameZoneid(), "updateData openDaysSystem table err");
			AlarmSystemFunction.getIns().alarmSend(AlarmType.SAVE_DB, hero.getId(),
					new Object[] { "openDaysSystem", errMsg });
			throw e;
		} finally {
			MybatisUtil.closeSession(session);
		}
	}

}
