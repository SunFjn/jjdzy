package com.teamtop.system.global;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.util.db.orm.OrmSqlUtil;
import com.teamtop.util.mybatis.MybatisUtil;

public class GlobalDataDao {

	private static GlobalDataDao ins = null;
	
	public static GlobalDataDao getIns() {
		if (ins == null) {
			ins = new GlobalDataDao();
		}
		return ins;
	}

	public void insert(GlobalData globalData,int zoneid) throws Exception {
		// DaoUtil.insert(globalData, GlobalDataMapper.class, zoneid);
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			GlobalDataMapper mapper = session.getMapper(GlobalDataMapper.class);
			mapper.insertData(globalData);
			session.commit();
		} finally {
			session.close();
		}
	}
	
	public void update(GlobalData globalData,int zoneid) throws Exception {
		// DaoUtil.update(globalData, GlobalDataMapper.class, zoneid);
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			GlobalDataMapper mapper = session.getMapper(GlobalDataMapper.class);
			mapper.updateData(globalData);
			session.commit();
		} finally {
			session.close();
		}
	}
	
	public GlobalData find(int type, int zoneid)throws Exception {
		SqlSession session = MybatisUtil.getSession(zoneid);
		GlobalData data = null;
		try {
			GlobalDataMapper mapper = session.getMapper(GlobalDataMapper.class);
			// Map<String,Object> map = mapper.find(OrmSqlUtil.makeFind(GlobalData.class,
			// "type",type+""));
			// data = OrmSqlUtil.getObjFromDB(map, GlobalData.class);
			data = mapper.findData(OrmSqlUtil.makeFind(GlobalData.class, "type", type + ""));
			return data;
		}finally{
			session.close();
		}
	}
	public List<GlobalData> findMany()throws Exception{
		SqlSession session = MybatisUtil.getSession(GameProperties.getFirstZoneId());
		try {
			GlobalDataMapper mapper = session.getMapper(GlobalDataMapper.class);
			return mapper.findMany();
		}finally{
			MybatisUtil.closeSession(session);
		}
	}
}
