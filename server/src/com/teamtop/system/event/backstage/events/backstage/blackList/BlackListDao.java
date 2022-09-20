package com.teamtop.system.event.backstage.events.backstage.blackList;

import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import com.teamtop.cross.CrossZone;
import com.teamtop.util.db.orm.OrmSqlUtil;
import com.teamtop.util.mybatis.MybatisUtil;

/**
 * 黑名单数据操作方法类
 * @author hepl
 *
 */
public class BlackListDao {
	private static BlackListDao ins = null;
	
	public static BlackListDao getIns(){
		if(ins == null){
			ins = new BlackListDao();
		}
		return ins;
	}
	
	/**
	 * 查找某个玩家账号的黑名单信息
	 * @param openid
	 * @return
	 * @throws Exception
	 */
	public M_BlackList findByOpenid(String openid) throws Exception{
		SqlSession session = MybatisUtil.getSession(CrossZone.houtai);
		if(session == null){
			return null;
		}
		M_BlackList redList = null;
		try {
			BlackListMapper mapper = session.getMapper(BlackListMapper.class);
			Map<String, Object> map = mapper.findByOpenid(openid);
			if(map != null){
				redList = OrmSqlUtil.getObjFromDB(map, M_BlackList.class);
			}
		} finally {
			MybatisUtil.closeSession(session);
		}
		return redList;
	}

	public void insert(M_BlackList m_BlackList) throws Exception {
		SqlSession session = MybatisUtil.getSession(CrossZone.houtai);
		if (session == null) {
			return;
		}
		try {
			BlackListMapper mapper = session.getMapper(BlackListMapper.class);
			long id = mapper.insert(m_BlackList);
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
	}

	public void update(M_BlackList m_BlackList) throws Exception {
		SqlSession session = MybatisUtil.getSession(CrossZone.houtai);
		if (session == null) {
			return;
		}
		try {
			BlackListMapper mapper = session.getMapper(BlackListMapper.class);
			mapper.updateData(m_BlackList);
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
	}

}
