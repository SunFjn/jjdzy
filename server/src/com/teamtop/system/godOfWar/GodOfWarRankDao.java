package com.teamtop.system.godOfWar;

import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.alibaba.fastjson.JSON;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.system.alarmSystem.AlarmSystemFunction;
import com.teamtop.system.alarmSystem.AlarmType;
import com.teamtop.system.godOfWar.model.GodOfWarRank;
import com.teamtop.util.db.orm.OrmSqlUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.mybatis.DaoUtil;
import com.teamtop.util.mybatis.MybatisUtil;

public class GodOfWarRankDao {

	private static GodOfWarRankDao ins = null;

	public static GodOfWarRankDao getIns() {
		if (ins == null) {
			ins = new GodOfWarRankDao();
		}
		return ins;
	}

	public void insert(GodOfWarRank t, long heroId, int zoneid) throws Exception {
		try {
			DaoUtil.insert(t, GodOfWarRankMapper.class, zoneid);
		} catch (Exception e) {
			String errMsg = LogTool.exception(e, heroId, "", "insert godOfWarRank table err");
			AlarmSystemFunction.getIns().alarmSend(AlarmType.SAVE_DB, heroId, new Object[] { "godOfWarRank", errMsg });
			throw e;
		}
	}

	public void update(GodOfWarRank t) throws Exception {
		try {			
			DaoUtil.update(t, GodOfWarRankMapper.class, GameProperties.zoneids.get(0));
		} catch (Exception e) {
			String errMsg = LogTool.exception(e, t.getHid(), t.getName(), "update godOfWarRank table err");
			AlarmSystemFunction.getIns().alarmSend(AlarmType.SAVE_DB, t.getHid(), new Object[] { "godOfWarRank", errMsg });
			throw e;
		}
	}

	public GodOfWarRank find(long key) throws Exception {
		return DaoUtil.find(key, GodOfWarRankMapper.class, GodOfWarRank.class, GameProperties.zoneids.get(0));
	}

	public void delete(GodOfWarRank godOfWarRank) throws Exception {
		try {			
			DaoUtil.delOne(godOfWarRank.getHid(), GodOfWarRankMapper.class, GodOfWarRank.class,
					GameProperties.zoneids.get(0));
		} catch (Exception e) {
			String errMsg = LogTool.exception(e, godOfWarRank.getHid(), godOfWarRank.getName(), "delete godOfWarRank table err");
			AlarmSystemFunction.getIns().alarmSend(AlarmType.SAVE_DB, godOfWarRank.getHid(), new Object[] { "godOfWarRank", errMsg });
			throw e;
		}
	}

	@SuppressWarnings("unchecked")
	public List<GodOfWarRank> findAllGodOfWarRank(int zoneid) throws Exception {
		List<GodOfWarRank> rsList = null;
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			GodOfWarRankMapper mapper = session.getMapper(GodOfWarRankMapper.class);
			List<Object> findMany = mapper.findAll();
			if (findMany != null) {
				for (Object obj : findMany) {
					if (rsList == null)
						rsList = new ArrayList<GodOfWarRank>();
					LinkedHashMap<String, Object> map = (LinkedHashMap<String, Object>) obj;
					GodOfWarRank t = OrmSqlUtil.getObjFromDB(map, GodOfWarRank.class);
					rsList.add(t);
				}
			}
		} finally {
			MybatisUtil.closeSession(session);
		}
		if(rsList==null) {
			rsList = new ArrayList<GodOfWarRank>();
		}
		return rsList;
	}

	public void insertOnDuplicateBatch(Collection<GodOfWarRank> collection, String[] notInclude, int zoneid)
			throws Exception {
		try {			
			DaoUtil.insertOnDuplicateBatch(collection, GodOfWarRank.class, GodOfWarRankMapper.class, zoneid, notInclude,
					DaoUtil.size_100);
		} catch (Exception e) {
			if(collection!=null) {				
				String errMsg = LogTool.exception(e, "insertOnDuplicateBatch godOfWarRank table err, zoneid="+zoneid+", data="+JSON.toJSONString(collection));
				AlarmSystemFunction.getIns().alarmSend(AlarmType.SAVE_DB, 0, new Object[] { "godOfWarRank", errMsg });
			}
			throw e;
		}
	}

}
