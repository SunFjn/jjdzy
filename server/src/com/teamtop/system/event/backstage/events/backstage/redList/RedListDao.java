package com.teamtop.system.event.backstage.events.backstage.redList;

import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import com.teamtop.cross.CrossZone;
import com.teamtop.util.db.orm.OrmSqlUtil;
import com.teamtop.util.mybatis.MybatisUtil;

/**
 * 红名单数据操作方法类
 * @author hepl
 *
 */
public class RedListDao {
	private static RedListDao ins = null;
	
	public static RedListDao getIns(){
		if(ins == null){
			ins = new RedListDao();
		}
		return ins;
	}
	
	/**
	 * 查找某个玩家账号的红名单信息
	 * @param openid
	 * @return
	 * @throws Exception
	 */
	public M_RedList findByOpenid(String openid) throws Exception{
		SqlSession session = MybatisUtil.getSession(CrossZone.houtai);
		if(session == null){
			return null;
		}
		M_RedList redList = null;
		try {
			RedListMapper mapper = session.getMapper(RedListMapper.class);
			Map<String, Object> map = mapper.findByOpenid(openid);
			if(map != null){
				redList = OrmSqlUtil.getObjFromDB(map, M_RedList.class);
			}
		} finally {
			MybatisUtil.closeSession(session);
		}
		return redList;
	}
}
