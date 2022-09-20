package com.teamtop.system.house.yard.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.util.db.orm.OrmSqlUtil;
import com.teamtop.util.mybatis.DaoUtil;
import com.teamtop.util.mybatis.MybatisUtil;

public class CrossHouseDao {

	private static CrossHouseDao ins;

	public static CrossHouseDao getIns() {
		if (ins == null) {
			ins = new CrossHouseDao();
		}
		return ins;
	}

	@SuppressWarnings("unchecked")
	public List<CrossHouse> findAllData() throws Exception {
		SqlSession session = MybatisUtil.getLocalSession();
		try {
			CrossHouseMapper mapper = session.getMapper(CrossHouseMapper.class);
			List<Object> list = mapper.findAllData();
			List<CrossHouse> datas = new ArrayList<>();
			for (Object obj : list) {
				Map<String, Object> map = (Map<String, Object>) obj;
				CrossHouse t = OrmSqlUtil.getObjFromDB(map, CrossHouse.class);
				datas.add(t);
			}
			return datas;
		} finally {
			MybatisUtil.closeSession(session);
		}
	}

	public void updateBatch(Collection<CrossHouse> collection) throws Exception {
		DaoUtil.insertOnDuplicateBatch(collection, CrossHouse.class, CrossHouseMapper.class,
				GameProperties.getFirstZoneId(), null, DaoUtil.size_100);
	}

	public void truncate(int zoneid) throws Exception {
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			CrossHouseMapper mapper = session.getMapper(CrossHouseMapper.class);
			mapper.truncate();
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
	}

	public void insertData(CrossHouse cHouse) throws Exception {
		DaoUtil.insert(cHouse, CrossHouseMapper.class, GameProperties.getFirstZoneId());
	}
}
