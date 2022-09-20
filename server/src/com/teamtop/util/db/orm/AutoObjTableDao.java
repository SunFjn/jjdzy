package com.teamtop.util.db.orm;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.TempVariables;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.mybatis.MybatisUtil;
public class AutoObjTableDao {
	private Logger logger = LoggerFactory.getLogger(AutoObjTableDao.class);
	private static AutoObjTableDao ins = null;

	public static AutoObjTableDao getIns() {
		if (ins == null)
			ins = new AutoObjTableDao();
		return ins;
	}
	public void insert(Object obj,int zoneid) throws SQLException{
		if(obj==null) return;
		String sql = OrmSqlUtil.makeInsert(obj,true);
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			OrmDmlMapper mapper = session.getMapper(OrmDmlMapper.class);
			mapper.insert(sql);
			session.commit();
		}finally{
			session.close();
		}
	}
	public void insert(String sql,int zoneid) throws SQLException{
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			OrmDmlMapper mapper = session.getMapper(OrmDmlMapper.class);
			mapper.insert(sql);
			session.commit();
		}finally{
			session.close();
		}
	}
	public void insertBatch(List<String> sqls,int zoneid) throws SQLException{
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			OrmDmlMapper mapper = session.getMapper(OrmDmlMapper.class);
			for(String sql:sqls){
				mapper.insert(sql);
			}
			session.commit();
		}finally{
			session.close();
		}
	}
	public void update(Object obj,Long rid,int zoneid) throws SQLException{
		if(obj==null) return;
		String sql = OrmSqlUtil.makeUpdate(obj,rid);
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			OrmDmlMapper mapper = session.getMapper(OrmDmlMapper.class);
			mapper.update(sql);
			session.commit();
		}finally{
			session.close();
		}
		
	}
	
	public void updateBatch(List<Object> list,Hero hero){
		TempVariables tempVariables = hero.getTempVariables();
		List<Class<?>> existTableList = null;
		if(tempVariables!=null){
			existTableList = tempVariables.getExistTableList();
		}
		SqlSession session = MybatisUtil.getSession(hero.getZoneid());
		try {
			for(Object obj:list){
				if(obj==null) continue;
				OrmDmlMapper mapper = session.getMapper(OrmDmlMapper.class);
				if(existTableList!=null && existTableList.contains(obj.getClass())){
					String sql = OrmSqlUtil.makeUpdate(obj,hero.getId());
					if(sql!=null){
						mapper.update(sql);
					}
				}else{
					String sql = OrmSqlUtil.makeInsertIntoOnDuplicate(obj,hero.getId());
					if(sql!=null){
						mapper.insertOnDup(sql);
					}
				}
			}
			session.commit();
		}catch(Exception e){
			logger.error(LogTool.exception(e,hero.getId(),hero.getNameZoneid(),"updateBatch err"));
		}finally{
			session.close();
		}
	}
	public <T> T find(Long rid,Class<T> clazz,String tbname,int zoneid) throws SQLException{
		String sql = OrmSqlUtil.makeFind(clazz, rid);
		SqlSession session = MybatisUtil.getSession(zoneid);
		Map<String, Object> rs = null;
		try {
			OrmDmlMapper mapper = session.getMapper(OrmDmlMapper.class);
			rs = mapper.select(sql);
		}finally{
			session.close();
		}
		if(rs==null || rs.size()==0){
			return null;
		}
		T t = null;
		try {
			t = (T) OrmSqlUtil.getObjFromDB(rs, clazz);
		} catch (Exception e) {
			logger.error(LogTool.exception(e,"tbname:"+tbname+",rid:"+rid));
		}
		return t;
		
	}
	
	/*public boolean check(Long rid,String tbname) throws SQLException{
		StringBuilder sb = new StringBuilder();
		sb.append("select count(1) from ").append(tbname).append(" where rid=").append(rid);
		Integer obj = (Integer) sqlMapClient.queryForObject("CTU.check", sb.toString());
		return obj==1?true:false;
	}*/
	public void delete(Long rid,Class<?> clazz){
		
	}
}
