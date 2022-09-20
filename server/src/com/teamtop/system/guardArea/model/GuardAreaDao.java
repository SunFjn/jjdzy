package com.teamtop.system.guardArea.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.util.db.orm.OrmSqlUtil;
import com.teamtop.util.mybatis.DaoUtil;
import com.teamtop.util.mybatis.MybatisUtil;

public class GuardAreaDao {
	private static GuardAreaDao ins;

	public static GuardAreaDao getIns() {
		if (ins == null) {
			ins = new GuardAreaDao();
		}
		return ins;
	}

	public GuardAreaDao() {
	}

	/**
	 * 查找所有数据
	 * 
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public List<GuardArea> findAllData() throws Exception {
		SqlSession session = MybatisUtil.getLocalSession();
		try {
			GuardAreaMapper mapper = session.getMapper(GuardAreaMapper.class);
			List<Object> list = mapper.findAllData();
			List<GuardArea> datas = new ArrayList<GuardArea>();
			for (Object obj : list) {
				Map<String, Object> map = (Map<String, Object>) obj;
				GuardArea t = OrmSqlUtil.getObjFromDB(map, GuardArea.class);
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
	public void updateDataBatch(Collection<GuardArea> collection) throws Exception {
		DaoUtil.insertOnDuplicateBatch(collection, GuardArea.class, GuardAreaMapper.class,
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
			GuardAreaMapper mapper = session.getMapper(GuardAreaMapper.class);
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
	public void insertData(GuardArea data) throws Exception {
		DaoUtil.insert(data, GuardAreaMapper.class, GameProperties.getFirstZoneId());
	}
}
