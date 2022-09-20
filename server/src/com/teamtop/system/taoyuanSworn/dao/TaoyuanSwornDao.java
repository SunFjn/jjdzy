package com.teamtop.system.taoyuanSworn.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.system.alarmSystem.AlarmSystemFunction;
import com.teamtop.system.alarmSystem.AlarmType;
import com.teamtop.system.taoyuanSworn.TaoyuanSwornSysCache;
import com.teamtop.system.taoyuanSworn.model.TaoyuanSworn;
import com.teamtop.util.db.orm.OrmSqlUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.mybatis.DaoUtil;
import com.teamtop.util.mybatis.MybatisUtil;

public class TaoyuanSwornDao {
	private static TaoyuanSwornDao dao;

	private TaoyuanSwornDao() {
	}

	public static synchronized TaoyuanSwornDao getDao() {
		if (dao == null) {
			dao = new TaoyuanSwornDao();
		}
		return dao;
	}
	
	public void insert(TaoyuanSworn t) throws Exception {
		try {			
			DaoUtil.insert(t, TaoyuanSwornMapper.class, t.getZoneid());
			TaoyuanSwornSysCache.addTaoyuanSworn(t);
		} catch (Exception e) {
			Long hid = t.getMember().entrySet().iterator().next().getKey();
			String errMsg = LogTool.exception(e, hid, "insert taoyuanSworn table err name" + t.getName());
			AlarmSystemFunction.getIns().alarmSend(AlarmType.SAVE_DB, hid, new Object[] { "taoyuanSworn", errMsg });
			throw e;
		}
	}
	
	public void update(TaoyuanSworn t) throws Exception {
		try {
			DaoUtil.update(t, t.getZoneid());
		} catch (Exception e) {
			Long hid = t.getMember().entrySet().iterator().next().getKey();
			String errMsg = LogTool.exception(e, hid, "update taoyuanSworn table err name" + t.getName());
			AlarmSystemFunction.getIns().alarmSend(AlarmType.SAVE_DB, hid, new Object[] { "taoyuanSworn", errMsg });
			throw e;
		}
	}

	public void delete(TaoyuanSworn t) throws Exception {
		try {
			DaoUtil.delOne(t.getId(), TaoyuanSwornMapper.class, TaoyuanSworn.class, t.getZoneid());
		} catch (Exception e) {
			Long hid = t.getMember().entrySet().iterator().next().getKey();
			String errMsg = LogTool.exception(e, hid, "delete taoyuanSworn table err name" + t.getName());
			AlarmSystemFunction.getIns().alarmSend(AlarmType.SAVE_DB, hid, new Object[] { "taoyuanSworn", errMsg });
			throw e;
		}
	}

//	@SuppressWarnings("unchecked")
//	public TaoyuanSworn find(long id) throws Exception{
//		SqlSession session = MybatisUtil.getLocalSession();
//		try {
//			TaoyuanSwornMapper mapper = session.getMapper(TaoyuanSwornMapper.class);
//			Object obj = mapper.find(id);
//			Map<String,Object> map = (Map<String, Object>) obj;
//			TaoyuanSworn t = OrmSqlUtil.getObjFromDB(map, TaoyuanSworn.class);
//			return t;
//		}finally{
//			MybatisUtil.closeSession(session);
//		}
//	}
	
	@SuppressWarnings("unchecked")
	public List<TaoyuanSworn> findAll() throws Exception{
		List<TaoyuanSworn> datas = new ArrayList<TaoyuanSworn>();
		List<Integer> zoneids = GameProperties.zoneids;
		for(Integer zoneid : zoneids) {
			SqlSession session = MybatisUtil.getSession(zoneid);
			try {
				TaoyuanSwornMapper mapper = session.getMapper(TaoyuanSwornMapper.class);
				List<Object> list = mapper.findAll();
				for(Object obj:list){
					Map<String,Object> map = (Map<String, Object>) obj;
					TaoyuanSworn t = OrmSqlUtil.getObjFromDB(map, TaoyuanSworn.class);
					datas.add(t);
				}
			}finally{
				MybatisUtil.closeSession(session);
			}
		}
		return datas;
	}

}
