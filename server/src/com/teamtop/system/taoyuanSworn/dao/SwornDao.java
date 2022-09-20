package com.teamtop.system.taoyuanSworn.dao;

import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import com.teamtop.system.taoyuanSworn.model.Sworn;
import com.teamtop.util.db.orm.OrmSqlUtil;
import com.teamtop.util.mybatis.DaoUtil;
import com.teamtop.util.mybatis.MybatisUtil;

public class SwornDao {
	private static SwornDao ins = null;

	public static SwornDao getIns() {
		if (ins == null) {
			ins = new SwornDao();
		}
		return ins;
	}

	
	/**获取桃园结义id*/
	public Sworn getSwornByHid(long hid) throws Exception {
		int zoneid = MybatisUtil.getZoneid(hid);
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			SwornMapper mapper = session.getMapper(SwornMapper.class);
			Map<String, Object> obj = mapper.getSwornByHid(hid);
			Sworn sworn = OrmSqlUtil.getObjFromDB(obj, Sworn.class);
			return sworn;
		} finally {
			MybatisUtil.closeSession(session);
		}
	}
	
	/**更新结义信息*/
	public void updateSwornByHid(long hid,Sworn sworn) throws Exception {
		int zoneid = MybatisUtil.getZoneid(hid);
		DaoUtil.update(sworn, SwornMapper.class, zoneid);
	}
//	public void updateSwornByHid(long hid,Sworn sworn) throws Exception {
//		int zoneid = MybatisUtil.getZoneid(hid);
//		DaoUtil.update(sworn, SwornMapper.class, zoneid);
//	}
}
