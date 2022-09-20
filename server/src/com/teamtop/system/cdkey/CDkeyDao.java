package com.teamtop.system.cdkey;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import com.teamtop.system.cdkey.model.CDkeyData;
import com.teamtop.util.db.orm.OrmSqlUtil;
import com.teamtop.util.mybatis.DaoUtil;
import com.teamtop.util.mybatis.MybatisUtil;

public class CDkeyDao {
	private static CDkeyDao ins = null;

	public static CDkeyDao getIns() {
		if (ins == null) {
			ins = new CDkeyDao();
		}
		return ins;
	}

	private CDkeyDao() {
	}

	public void insertOnDuplicateBatch(Collection<CDkeyData> collection, String[] notInclude, int zoneid)
			throws Exception {
		DaoUtil.insertOnDuplicateBatch(collection, CDkeyData.class, CDkeyMapper.class, zoneid, notInclude,
				DaoUtil.size_100);
	}

	@SuppressWarnings("unchecked")
	public List<CDkeyData> findAllCDkeyData(int zoneid) throws Exception {
		List<CDkeyData> rsList = new ArrayList<CDkeyData>();
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			CDkeyMapper mapper = session.getMapper(CDkeyMapper.class);
			List<Object> findMany = mapper.findAllCDkeyData();
			if (findMany != null) {
				for (Object obj : findMany) {
					Map<String, Object> map = (Map<String, Object>) obj;
					CDkeyData t = OrmSqlUtil.getObjFromDB(map, CDkeyData.class);
					rsList.add(t);
				}
			}
		} finally {
			MybatisUtil.closeSession(session);
		}
		return rsList;
	}

	/**
	 * 根据cdkey更新
	 * 
	 * @param cdkeyData
	 * @param hero
	 * @throws Exception
	 */
	public void update(CDkeyData cdkeyData, int zoneid) throws Exception {
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			CDkeyMapper mapper = session.getMapper(CDkeyMapper.class);
			mapper.updateByCDkey(cdkeyData);
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
	}
}
