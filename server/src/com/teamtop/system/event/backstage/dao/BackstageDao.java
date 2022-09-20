package com.teamtop.system.event.backstage.dao;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;

import org.apache.ibatis.session.SqlSession;

import com.teamtop.util.db.orm.OrmSqlUtil;
import com.teamtop.util.mybatis.MybatisUtil;
/**
 * 公共的后台dao
 * @author Administrator
 *
 */
public class BackstageDao {
	public static int batchSize = 200;//后台批量插入一次性插入的数量控制
	/**
	 * 批量插入，适用于流水
	 * @param colls 根据zoneid作为key记录的流水集合
	 * @throws Exception
	 */
	public static <T> void insertBatch(ConcurrentHashMap<Integer, ConcurrentLinkedQueue<T>> colls) throws Exception {
		Iterator<Entry<Integer, ConcurrentLinkedQueue<T>>> it0 = colls.entrySet().iterator();
		while(it0.hasNext()){
			Entry<Integer, ConcurrentLinkedQueue<T>> next = it0.next();
			insertBatch(next.getValue(), next.getKey());
			it0.remove();
		}
	}
	/**
	 * 批量插入，适用于流水
	 * @param colls 根据zoneid作为key记录的流水集合
	 * @throws Exception
	 */
	public static <T> void insertBatchHasId(ConcurrentHashMap<Integer, ConcurrentLinkedQueue<T>> colls) throws Exception {
		Iterator<Entry<Integer, ConcurrentLinkedQueue<T>>> it0 = colls.entrySet().iterator();
		while(it0.hasNext()){
			Entry<Integer, ConcurrentLinkedQueue<T>> next = it0.next();
			insertBatchHasId(next.getValue(), next.getKey());
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
	public static <T> void insertOnDuplicateBatch(Collection<T> collection,Class<?> tClazz,int zoneid,String[] notInclude,int batchTimes) throws Exception {
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			BackstageMapper mapper = session.getMapper(BackstageMapper.class);
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
	 * 批量插入更新，适用于流水
	 * @param collection 对象集合
	 * @param zoneid 区id
	 * @throws Exception
	 */
	public static <T> void replaceIntoBatchHasId(Collection<T> colls,int zoneid) throws Exception {
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			if(session!=null){
				BackstageMapper mapper = session.getMapper(BackstageMapper.class);
				int count = 0;
				Iterator<T> it = colls.iterator();
				List<T> list = new ArrayList<T>();
				while(it.hasNext()){
					T t = it.next();
					list.add(t);
					count++;
					if(count>=batchSize){
						String sql = OrmSqlUtil.makeBackstagereplaceIntoBatch(list,true);
						mapper.insertBatch(sql);
						session.commit();
						count = 0;
						list.clear();
					}
				}
				if(count>0){
					String sql = OrmSqlUtil.makeBackstagereplaceIntoBatch(list,true);
					mapper.insertBatch(sql);
					session.commit();
					count = 0;
					list.clear();
				}
			}
		}finally{
			colls.clear();
			MybatisUtil.closeSession(session);
		}
	}
	
	
	/**
	 * 批量插入，适用于流水
	 * @param collection 对象集合
	 * @param zoneid 区id
	 * @throws Exception
	 */
	public static <T> void insertBatchHasId(Collection<T> colls,int zoneid) throws Exception {
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			if(session!=null){
				BackstageMapper mapper = session.getMapper(BackstageMapper.class);
				int count = 0;
				Iterator<T> it = colls.iterator();
				List<T> list = new ArrayList<T>();
				while(it.hasNext()){
					T t = it.next();
					list.add(t);
					count++;
					if(count>=batchSize){
						String sql = OrmSqlUtil.makeBackstageInsertBatch(list,true);
						mapper.insertBatch(sql);
						session.commit();
						count = 0;
						list.clear();
					}
				}
				if(count>0){
					String sql = OrmSqlUtil.makeBackstageInsertBatch(list,true);
					mapper.insertBatch(sql);
					session.commit();
					count = 0;
					list.clear();
				}
			}
		}finally{
			colls.clear();
			MybatisUtil.closeSession(session);
		}
	}
	/**
	 * 批量插入，适用于流水
	 * @param collection 对象集合
	 * @param zoneid 区id
	 * @throws Exception
	 */
	public static <T> void insertBatch(Collection<T> colls,int zoneid) throws Exception {
		SqlSession session = MybatisUtil.getSession(zoneid);
		if(session==null) return;
		try {
			BackstageMapper mapper = session.getMapper(BackstageMapper.class);
			int count = 0;
			Iterator<T> it = colls.iterator();
			List<T> list = new ArrayList<T>();
			while(it.hasNext()){
				T t = it.next();
				list.add(t);
				count++;
				if(count>=batchSize){
					String sql = OrmSqlUtil.makeBackstageInsertBatch(list,false);
					mapper.insertBatch(sql);
					session.commit();
					count = 0;
					list.clear();
				}
			}
			if(count>0){
				String sql = OrmSqlUtil.makeBackstageInsertBatch(list,false);
				mapper.insertBatch(sql);
				session.commit();
				count = 0;
				list.clear();
			}
		}finally{
			colls.clear();
			MybatisUtil.closeSession(session);
		}
	}
	/**
	 * 根据特定的sql插入数据表
	 * @param sql 指定的sql，一般用OrmSqlUtil.makeInsertIntoOnDuplicate组成
	 * @param zoneid
	 * @throws Exception
	 */
	public static <T> void insertWithSql(String sql, int zoneid) throws Exception{
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			BackstageMapper mapper = session.getMapper(BackstageMapper.class);
			mapper.insertBatch(sql);
			session.commit();
		}finally{
			MybatisUtil.closeSession(session);
		}
	}
}
