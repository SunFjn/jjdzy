package com.teamtop.system.crossAttackCity.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.db.orm.OrmSqlUtil;
import com.teamtop.util.mybatis.DaoUtil;
import com.teamtop.util.mybatis.MybatisUtil;

public class AttackCityDao {
	private static AttackCityDao ins;

	public static AttackCityDao getIns() {
		if (ins == null) {
			ins = new AttackCityDao();
		}
		return ins;
	}

	public AttackCityDao() {
	}

	/**
	 * 查找所有数据
	 * 
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public List<AttackCity> findAllData() throws Exception {
		SqlSession session = MybatisUtil.getLocalSession();
		try {
			AttackCityMapper mapper = session.getMapper(AttackCityMapper.class);
			List<Object> list = mapper.findAllData();
			List<AttackCity> datas = new ArrayList<AttackCity>();
			for (Object obj : list) {
				Map<String, Object> map = (Map<String, Object>) obj;
				AttackCity t = OrmSqlUtil.getObjFromDB(map, AttackCity.class);
				datas.add(t);
			}
			return datas;
		} finally {
			MybatisUtil.closeSession(session);
		}
	}

	/**
	 * 批量更新数据
	 * 
	 * @param collection
	 * @throws Exception
	 */
	public void updateDataBatch(Collection<AttackCity> collection) throws Exception {
		DaoUtil.insertOnDuplicateBatch(collection, AttackCity.class, AttackCityMapper.class,
				GameProperties.getFirstZoneId(), null, DaoUtil.size_100);
	}

	/**
	 * 清空
	 * 
	 * @param zoneid
	 * @throws Exception
	 */
	public void truncate(int zoneid) throws Exception {
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			AttackCityMapper mapper = session.getMapper(AttackCityMapper.class);
			mapper.truncate();
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
	}

	/**
	 * 插入数据
	 * 
	 * @param data
	 * @throws Exception
	 */
	public void insertData(AttackCity data) throws Exception {
		DaoUtil.insert(data, AttackCityMapper.class, GameProperties.getFirstZoneId());
	}

	/**
	 * @param info
	 * @throws Exception
	 * @date
	 */
	public void updateInfo(AttackCityLocal data) throws Exception {
		long hid = data.getHid();
		int zoneid = CommonUtil.getZoneIdById(hid);
		DaoUtil.update(data, AttackCityMapper.class, zoneid);
	}

	/**
	 * @param hid
	 * @return
	 * @throws Exception
	 */
	public AttackCityLocal findAttackCityLocal(long hid) throws Exception {
		int zoneid = CommonUtil.getZoneIdById(hid);
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			AttackCityMapper mapper = session.getMapper(AttackCityMapper.class);
			Object obj = mapper.findAttackCityLocal(hid);
			Map<String, Object> map = (Map<String, Object>) obj;
			AttackCityLocal t = OrmSqlUtil.getObjFromDB(map, AttackCityLocal.class);
			return t;
		}finally {
			MybatisUtil.closeSession(session);
		}
	}
}
