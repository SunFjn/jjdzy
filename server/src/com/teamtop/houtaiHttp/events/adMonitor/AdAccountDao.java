package com.teamtop.houtaiHttp.events.adMonitor;

import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import com.teamtop.util.db.orm.OrmSqlUtil;
import com.teamtop.util.mybatis.DaoUtil;
import com.teamtop.util.mybatis.MybatisUtil;

/**
 * 广告号账号数据操作类（中央服）
 * @author hepl
 *
 */
public class AdAccountDao {

	private static AdAccountDao ins = null;
	
	public static AdAccountDao getIns(){
		if(ins == null){
			ins = new AdAccountDao();
		}
		return ins;
	}
	
	public void insert(M_AdAccount adAccount, int zoneid) throws Exception{
		DaoUtil.insert(adAccount, AdAccountMapper.class, zoneid);
	}
	
	/**
	 * 
	 * @param openid
	 * @param zoneid
	 * @return
	 * @throws Exception
	 */
	public M_AdAccount findByOpenid(String openid, int zoneid) throws Exception{
		SqlSession session = MybatisUtil.getSession(zoneid);
		try{
			AdAccountMapper mapper = session.getMapper(AdAccountMapper.class);
			Map<String, Object> map = mapper.findByOpenid(openid);
			if(map == null){
				return null;
			}
			return OrmSqlUtil.getObjFromDB(map, M_AdAccount.class);
		} finally {
			session.close();
		}
	}
	
	/**
	 * 根据账号删除广告号信息
	 * @param openid
	 * @param zoneid
	 * @throws Exception
	 */
	public void delByOpenid(String openid, int zoneid) throws Exception{
		SqlSession session = MybatisUtil.getSession(zoneid);
		try{
			AdAccountMapper mapper = session.getMapper(AdAccountMapper.class);
			mapper.delByOpenid(openid);
			session.commit();
		} finally {
			session.close();
		}
	}
}
