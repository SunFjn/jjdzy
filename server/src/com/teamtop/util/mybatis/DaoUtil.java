package com.teamtop.util.mybatis;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import com.teamtop.system.hero.HeroMapper;
import com.teamtop.util.db.orm.OrmSqlUtil;
/**
 * DAO工具，提供基本的查找，插入和更新方法，用于各自dao类不用控制事务和转换
 * @author Administrator
 *
 */
public class DaoUtil {
	public static final int batchSize = 1;
	/**
	 * 使用insert on duplicate的插入次数
	 */
//	public static final int insertOnDupSize = 300;
	public static final int size_30 = 30;
	public static final int size_50 = 50;
	public static final int size_100 = 100;
	public static final int size_200 = 200;
	public static final int size_300 = 300;
	
	@SuppressWarnings("unchecked")
	public static <T> void insert(T t,Class<?> clazz,int zoneid) throws Exception {
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			BaseMapper<T> mapper = (BaseMapper<T>) session.getMapper(clazz);
			mapper.insert(t);
			session.commit();
		}finally{
			MybatisUtil.closeSession(session);
		}
	}
	/**
	 * 更新一个对象 
	 * @param t
	 * @param zoneid
	 * @throws Exception
	 */
	public static <T> void update(T t,int zoneid) throws Exception{
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			HeroMapper mapper = session.getMapper(HeroMapper.class);
			String makeUpdate = OrmSqlUtil.makeUpdate(t,t.getClass());
			mapper.update(makeUpdate);
			session.commit();
		}finally{
			MybatisUtil.closeSession(session);
		}
	}
	@SuppressWarnings("unchecked")
	public static <T> void update(T t,Class<?> clazz,int zoneid) throws Exception {
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			BaseMapper<T> mapper = (BaseMapper<T>) session.getMapper(clazz);
			String makeUpdate = OrmSqlUtil.makeUpdate(t,t.getClass());
			mapper.update(makeUpdate);
			session.commit();
		}finally{
			MybatisUtil.closeSession(session);
		}
	}
	@SuppressWarnings("unchecked")
	public static <T> void update(T t,Class<?> tClazz,Class<?> mapperClazz,int zoneid) throws Exception {
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			BaseMapper<T> mapper = (BaseMapper<T>) session.getMapper(mapperClazz);
			String makeUpdate = OrmSqlUtil.makeUpdate(t,tClazz);
			mapper.update(makeUpdate);
			session.commit();
		}finally{
			MybatisUtil.closeSession(session);
		}
	}
	@SuppressWarnings("unchecked")
	/**
	 * 批量更新<br/>
	 * 会根据设定数量x，在update多条数据后commit一次
	 * @param collection 待更新集合
	 * @param tClazz 一般为T的class，也可以是T的父类的class
	 * @param mapperClazz mapper的Class
	 * @param zoneid 区号
	 * @throws Exception
	 */
	public static <T> void updateBatch(Collection<T> collection,Class<?> tClazz,Class<?> mapperClazz,int zoneid) throws Exception {
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			BaseMapper<T> mapper = (BaseMapper<T>) session.getMapper(mapperClazz);
			int count = 0;
			Iterator<T> it = collection.iterator();
			while(it.hasNext()){
				T t = it.next();
				String makeUpdate = OrmSqlUtil.makeUpdate(t,tClazz);
				mapper.update(makeUpdate);
				count++;
				if(count>=batchSize){
					session.commit();
					count = 0;
				}
			}
			if(count>0){
				session.commit();
			}
		}finally{
			MybatisUtil.closeSession(session);
		}
	}
	/**
	 * 批量更新<br/>
	 * 会根据设定数量x，在update多条数据后commit一次
	 * @param collection 待更新集合
	 * @param mapperClazz mapper的Class
	 * @param zoneid 区号
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public static <T> void insertOnDuplicateBatch(Collection<T> collection,Class<?> tClazz,Class<?> mapperClazz,int zoneid,String[] notInclude,int batchTimes) throws Exception {
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			BaseMapper<T> mapper = (BaseMapper<T>) session.getMapper(mapperClazz);
			int count = 0;
			Iterator<T> it = collection.iterator();
			List<T> list = new ArrayList<T>();
			while(it.hasNext()){
				T t = it.next();
				list.add(t);
				count++;
				if(count>=batchTimes){
					String sql = OrmSqlUtil.makeInsertIntoOnDuplicate(list,notInclude,tClazz);
					mapper.insertOnDuplicateBatch(sql);
					session.commit();
					count = 0;
					list.clear();
				}
			}
			if(count>0){
				String sql = OrmSqlUtil.makeInsertIntoOnDuplicate(list,notInclude,tClazz);
				mapper.insertOnDuplicateBatch(sql);
				session.commit();
				list.clear();
			}
		}finally{
			MybatisUtil.closeSession(session);
		}
	}
	
	/**
	 * 批量更新<br/>
	 * 会根据设定数量x，在update多条数据后commit一次
	 * @param collection 待更新集合
	 * @param mapperClazz mapper的Class
	 * @param zoneid 区号
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public static <T> void insertOnDuplicateBatchFromInclude(Collection<T> collection,Class<?> mapperClazz,int zoneid,String[] include,int batchTimes) throws Exception {
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			BaseMapper<T> mapper = (BaseMapper<T>) session.getMapper(mapperClazz);
			int count = 0;
			Iterator<T> it = collection.iterator();
			List<T> list = new ArrayList<T>();
			while(it.hasNext()){
				T t = it.next();
				list.add(t);
				count++;
				if(count>=batchTimes){
					String sql = OrmSqlUtil.makeInsertIntoOnDuplicateFromInclude(list,include);
					mapper.insertOnDuplicateBatch(sql);
					session.commit();
					count = 0;
					list.clear();
				}
			}
			if(count>0){
				String sql = OrmSqlUtil.makeInsertIntoOnDuplicateFromInclude(list,include);
				mapper.insertOnDuplicateBatch(sql);
				session.commit();
				list.clear();
			}
		}finally{
			MybatisUtil.closeSession(session);
		}
	}
	
	@SuppressWarnings("unchecked")
	/**
	 * 查找单条数据
	 * @param key id
	 * @param clazz mapper的Class
	 * @param tclass 数据对应的Class
	 * @param zoneid 区号
	 * @return 转换后的obj
	 * @throws Exception
	 */
	public static <T> T find(long id,Class<?> clazz,Class<T> tclass,int zoneid) throws Exception {
		SqlSession session = MybatisUtil.getSession(zoneid);
		T t = null;
		try {
			BaseMapper<T> mapper = (BaseMapper<T>) session.getMapper(clazz);
			Map<String,Object> map = mapper.find(OrmSqlUtil.makeFind(tclass, id));
			t = OrmSqlUtil.getObjFromDB(map, tclass);
			return t;
		}finally{
			MybatisUtil.closeSession(session);
		}
	}
	@SuppressWarnings("unchecked")
	/***
	 * 查找多个，适用于多条数据，根据hid查找
	 * @param hid hid
	 * @param mapperClazz Mapper的class
	 * @param tclazz T的class
	 * @param zoneid 区id
	 * @return 以List形式返回对象T的集合
	 * @throws Exception
	 */
	public static <T> List<T> findMany(long hid,Class<?> mapperClazz,Class<T> tclazz,int zoneid) throws Exception {
		SqlSession session = MybatisUtil.getSession(zoneid);
		List<T> rsList = null;
		try {
			BaseMapper<T> mapper = (BaseMapper<T>) session.getMapper(mapperClazz);
			List<Object> findMany = mapper.findMany(hid);
			if(findMany!=null){
				for(Object obj:findMany){
					if(rsList==null) rsList = new ArrayList<T>();
					Map<String,Object> map = (Map<String, Object>) obj;
					T t = OrmSqlUtil.getObjFromDB(map, tclazz);
					rsList.add(t);
				}
			}
		}finally{
			MybatisUtil.closeSession(session);
		}
		return rsList;
	}
	
	
	
	@SuppressWarnings("unchecked")
	/***
	 * 查找多个，适用于多条数据，根据多条hid查找
	 * @param hid hid
	 * @param mapperClazz Mapper的class
	 * @param tclazz T的class
	 * @param zoneid 区id
	 * @return 以List形式返回对象T的集合
	 * @throws Exception
	 */
	public static <T> List<T> findManyByMany(List<Long> hids,Class<?> mapperClazz,Class<T> tclazz,int zoneid) throws Exception {
		SqlSession session = MybatisUtil.getSession(zoneid);
		List<T> rsList = null;
		try {
			BaseMapper<T> mapper = (BaseMapper<T>) session.getMapper(mapperClazz);
			List<Object> findMany = mapper.findManyByMany(hids);
			if(findMany!=null){
				for(Object obj:findMany){
					if(rsList==null) rsList = new ArrayList<T>();
					Map<String,Object> map = (Map<String, Object>) obj;
					T t = OrmSqlUtil.getObjFromDB(map, tclazz);
					rsList.add(t);
				}
			}
		}finally{
			MybatisUtil.closeSession(session);
		}
		return rsList;
	}
	@SuppressWarnings("unchecked")
	/**
	 * 删除一条记录
	 * @param id 主键id
	 * @param mapperClazz mapper的class
	 * @param tclass 对象的class
	 * @param zoneid 区号
	 * @throws Exception
	 */
	public static <T> void delOne(long id,Class<?> mapperClazz,Class<T> tclass,int zoneid) throws Exception{
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			BaseMapper<T> mapper = (BaseMapper<T>) session.getMapper(mapperClazz);
			String sql = OrmSqlUtil.makeDelOne(tclass, id);
			mapper.delOne(sql);
			session.commit();
		}finally{
			MybatisUtil.closeSession(session);
		}
	}
	/**
	 * 查询某个表的全部内容
	 * @param hid
	 * @param mapperClazz
	 * @param tclazz
	 * @param zoneid
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public static <T> List<T> findAllHeroUnit(Class<?> mapperClazz,Class<T> tclazz,int zoneid) throws Exception {
		SqlSession session = MybatisUtil.getSession(zoneid);
		List<T> rsList = null;
		try {
			BaseMapper<T> mapper = (BaseMapper<T>) session.getMapper(mapperClazz);
			List<Object> AllMany = mapper.findAllHeroUnit();
			if(AllMany!=null){
				for(Object obj:AllMany){
					if(rsList==null) rsList = new ArrayList<T>();
					Map<String,Object> map = (Map<String, Object>) obj;
					T t = OrmSqlUtil.getObjFromDB(map, tclazz);
					rsList.add(t);
				}
			}
		}finally{
			MybatisUtil.closeSession(session);
		}
		return rsList;
		
	}

	
}
