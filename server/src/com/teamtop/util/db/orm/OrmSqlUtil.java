package com.teamtop.util.db.orm;

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.system.alarmSystem.AlarmSystemFunction;
import com.teamtop.system.alarmSystem.AlarmType;
import com.teamtop.util.db.annotation.ColumnBigInt;
import com.teamtop.util.db.annotation.ColumnInt;
import com.teamtop.util.db.annotation.ColumnVar;
import com.teamtop.util.db.trans.ObjStrTransUtil;
import com.teamtop.util.db.trans.TransInnerUtil;
import com.teamtop.util.log.LogTool;




/**
 * 自动生成sql语句</br>
 * @author kyle
 *
 */
public class OrmSqlUtil {
	private static Logger logger = LoggerFactory.getLogger(OrmSqlUtil.class);
	private final static String IS = "is";
	private final static String GET = "get";
	private final static String SET = "set";
	private final static String insert_into = "insert into ";
	private final static String replace_into = "replace into ";
	private final static String zk = " (";
	private final static String yk = ")";
	private final static String mk = "(";
	private final static String values = " values (";
	private final static String y = "'";
	private final static String d = ",";
	private final static String update = "update ";
	private final static String set = " set ";
	private final static String dy = "=";
	private final static String where = " where ";
//	private final static String and = " and ";
	private final static String select = "select * from ";
	private final static String delete = "delete from ";
	private final static String varDef= "_varDef_nm";
	private final static String textDef= "_textDef_nm";		
	private final static String dup= " on duplicate key update ";		
	
	public final static int TYPE_ZHENGXING = 1;//数据类型 整型 包括 int biginit
	public final static int TYPE_STR = 2;//数据类型 字符串包括 varchar，text
	/**
	 * 用于自动生成insert和update、select的字段map
	 * key:class,value:fieldxml数组
	 */
	public static Map<Class<?>,FieldXml> fieldXmlMap = new HashMap<Class<?>,FieldXml>();
	/**
	 * 用于出库时自动生成对象的fieldMap
	 * key:class,value:{key:field名字,value:field}
	 */
	public static Map<Class<?>, Map<String,Field>> fieldAutoTransObjMap = new HashMap<Class<?>, Map<String,Field>>();
	/**
	 * 生成insert语句
	 * @param obj
	 * @param clazz 传入的clazz，可能是父类
	 * @param includePriKey 是否需要sql语句包含主键,需要则根据主键值插入，不需要则自增长
	 * @throws Exception
	 */
	public static String makeInsert(Object obj,Class<?> clazz,boolean includePriKey){
		if(obj==null) return null;
		final StringBuilder sb = new StringBuilder();
		final StringBuilder sbVal = new StringBuilder();
		FieldXml fieldXml = getFieldXml(clazz);
		FieldOrm[] fields = fieldXml.getFields();
		sb.append(insert_into).append(fieldXml.getTbname()).append(zk);
		sbVal.append(values);
		Field priField = fieldXml.getPrimaryField();;
		int len = fields.length;
		Object value = null;
		boolean dataTooLong = false;
		for(int i=0;i<len;i++){
			Field field = fields[i].getField();
			if(includePriKey || !field.equals(priField)){
				//field append
				sb.append(field.getName());
				//value append
				value = getValue(field, obj);
				if(value==null){
					sbVal.append(value);
				}else{
					if(value instanceof String){
						final String v = (String) value;
						Map<String, Integer> map = AutoObjTableUtil.fieldLenMap.get(clazz);
						if(map!=null){
							Integer fl = map.get(field.getName());
							if(fl!=null && v.length()>fl){
								//data too long
								dataTooLong = true;
								AlarmSystemFunction.getIns().alarmSend(AlarmType.SAVE_DB, 0, new Object[] { fieldXml.getTbname(), field.getName() });
								logger.warn(LogTool.getmsg("clazz data too long:"+clazz+",field:"+field.getName()+",len:"+v.length()));
							}
						}
					}
					sbVal.append(y).append(value).append(y);
				}
				if(i<len-1){
					sb.append(d);
					sbVal.append(d);
				}else{
					sb.append(yk);
					sbVal.append(yk);
				}
			}
		}
		String sql = sb.append(sbVal.toString()).toString();
		if(dataTooLong){
			logger.warn(LogTool.getmsg("sql:"+sql));
			AutoObjTableUtil.addTooLong(0,sql);
			return sql;
		}else{
			return sql;
		}
	}
	/**
	 * 生成insert语句
	 * @param obj
	 * @param includePriKey 是否需要sql语句包含主键,需要则根据主键值插入，不需要则自增长
	 * @throws Exception
	 */
	public static String makeInsert(Object obj,boolean includePriKey){
		return makeInsert(obj, obj.getClass(), includePriKey);
	}
	
	/**
	 * 生成后台批量插入更新语句的sql语句
	 * @param colls
	 * @return
	 */
	public static String makeBackstagereplaceIntoBatch(Collection<?> colls,boolean hasid){
		if(colls==null) return null;
		final StringBuilder sb = new StringBuilder();
		final StringBuilder sbVal = new StringBuilder();
		FieldXml fieldXml = null;
		FieldOrm[] fields = null;
		Field priField = null;
		Iterator<?> it = colls.iterator();
		Class<? extends Object> clazz = null;
		boolean sbDone = false;
		int k = 0;
		while(it.hasNext()){
			Object next = it.next();
			if(clazz==null){
				clazz = next.getClass();
				fieldXml = getFieldXml(clazz);
				fields = fieldXml.getFields();
				priField = fieldXml.getPrimaryField();
				sb.append(replace_into).append(fieldXml.getTbname()).append(zk);
				sbVal.append(values);
			}
			if(k>0){sbVal.append(d).append(mk);}
			int len = fields.length;
			Object value = null;
			for(int i=0;i<len;i++){
				Field field = fields[i].getField();
				if(!field.equals(priField) || hasid){
					//field append
					if(!sbDone) sb.append(field.getName());
					//value append
					value = getValue(field, next);
					if(value==null){
						sbVal.append(value);
					}else{
						sbVal.append(y).append(value).append(y);
					}
					if(i<len-1){
						if(!sbDone) sb.append(d);
						sbVal.append(d);
					}else{
						if(!sbDone) sb.append(yk);
						sbVal.append(yk);
					}
				}
			}
			if(!sbDone) sbDone = true;
			k++;
		}
		return sb.append(sbVal.toString()).toString();
	}
	
	/**
	 * 生成后台批量插入的sql语句
	 * @param colls
	 * @return
	 */
	public static String makeBackstageInsertBatch(Collection<?> colls,boolean hasid){
		if(colls==null) return null;
		final StringBuilder sb = new StringBuilder();
		final StringBuilder sbVal = new StringBuilder();
		FieldXml fieldXml = null;
		FieldOrm[] fields = null;
		Field priField = null;
		Iterator<?> it = colls.iterator();
		Class<? extends Object> clazz = null;
		boolean sbDone = false;
		int k = 0;
		while(it.hasNext()){
			Object next = it.next();
			if(clazz==null){
				clazz = next.getClass();
				fieldXml = getFieldXml(clazz);
				fields = fieldXml.getFields();
				priField = fieldXml.getPrimaryField();
				sb.append(insert_into).append(fieldXml.getTbname()).append(zk);
				sbVal.append(values);
			}
			if(k>0){sbVal.append(d).append(mk);}
			int len = fields.length;
			Object value = null;
			for(int i=0;i<len;i++){
				Field field = fields[i].getField();
				if(!field.equals(priField) || hasid){
					//field append
					if(!sbDone) sb.append(field.getName());
					//value append
					value = getValue(field, next);
					if(value==null){
						sbVal.append(value);
					}else{
						sbVal.append(y).append(value).append(y);
					}
					if(i<len-1){
						if(!sbDone) sb.append(d);
						sbVal.append(d);
					}else{
						if(!sbDone) sb.append(yk);
						sbVal.append(yk);
					}
				}
			}
			if(!sbDone) sbDone = true;
			k++;
		}
		return sb.append(sbVal.toString()).toString();
	}
	
	/**
	 * 生成后台流水的日志格式，格式为：表名,字段名=字段值,字段名=字段值...
	 * @param obj
	 * @return
	 */
	public static String makeBackstageLogformat(Object obj){
		if(obj == null) return null;
		final StringBuilder sb = new StringBuilder();
		FieldXml fieldXml = null;
		FieldOrm[] fields = null;
		Field priField = null;
		Class<? extends Object> clazz = null;
		clazz = obj.getClass();
		fieldXml = getFieldXml(clazz);
		fields = fieldXml.getFields();
		priField = fieldXml.getPrimaryField();
		sb.append(fieldXml.getTbname()).append(d);
		int len = fields.length;
		Object value = null;
		for(int i=0;i<len;i++){
			Field field = fields[i].getField();
			if(!field.equals(priField)){
				//field append
				sb.append(field.getName()).append(dy);
				//value append
				value = getValue(field, obj);
				sb.append(value);
				if(i<len-1){
					sb.append(d);
				}
			}
		}
		
		return sb.toString();
	}
	
	public static String makeUpdate(Object obj,Class<?> clazz){
		if(obj==null) return null;
		final StringBuilder sb = new StringBuilder();
		FieldXml fieldXml = getFieldXml(clazz);
		FieldOrm[] fields = fieldXml.getFields();
		Field priField = fieldXml.getPrimaryField();
		sb.append(update).append(fieldXml.getTbname()).append(set);
		int len = fields.length;
		Object value = null;
		Object priKey = null;
		boolean dataTooLong = false;
		int dou = 0;
		for(int i=0;i<len;i++){
			FieldOrm fo = fields[i];
			Field field = fo.getField();
			value = getValue(field, obj);
			if(field.equals(priField)){
				priKey = value;
				continue;
			}
			if(value!=null){
				if(value instanceof String){
					final String v = (String) value;
					Map<String, Integer> map = AutoObjTableUtil.fieldLenMap.get(clazz);
					if(map!=null){
						Integer fl = map.get(field.getName());
						if(fl!=null && v.length()>fl){
							//data too long
							dataTooLong = true;
							logger.warn(LogTool.getmsg("clazz data too long:"+clazz+",field:"+field.getName()+",len:"+v.length()));
						}
					}
				}
				if(dou>0){
					sb.append(d);
				}
				sb.append(field.getName()).append(dy);
				sb.append(y).append(value).append(y);
				dou++;
			}else {
				if(dou>0){
					sb.append(d);
				}
				sb.append(field.getName()).append(dy);
				sb.append("null");
				dou++;
			}
		}
//		Field priField = getPriField(clazz);
//		Field[] primaryKeys = fieldXml.getPrimaryKeys();
//		int priLen = primaryKeys.length;
		sb.append(where);
		/*for(int i=0;i<1;i++){
			Field priKey = primaryKeys[i];
			sb.append(priKey.getName()).append(dy).append(getValue(priKey, obj));
			if(i<priLen-1){
				sb.append(and);
			}
		}*/
		sb.append(priField.getName()).append(dy).append(y).append(priKey).append(y);
		if(priKey==null){
			logger.warn(LogTool.getmsg("sql update prikey is null:"+sb.toString()));
		}
		if(dataTooLong){
			logger.warn(LogTool.getmsg("sql:"+sb.toString()));
			AutoObjTableUtil.addTooLong(priKey,sb.toString());
			return null;
		}else{
			return sb.toString();
		}
	}
	/**
	 * 生成update语句,根据主键组update
	 * @param clazz
	 * @param rid
	 * @throws Exception
	 */
//	public static String makeUpdate(Object obj){
//		return makeUpdate(obj, obj.getClass());
//	}
	
	/**
	 * 获取批量更新的sql，sql为insert into xx on duplicate key update xx=values(xxx)
	 * @param colls
	 * @param include 需要更新的字段名字，主键依然会update
	 * @return 
	 */
	public static String makeInsertIntoOnDuplicateFromInclude(Collection<?> colls,String[] include){
		//INSERT INTO arena (chestReward,chestRewardStr,rid) VALUES $upStr$ on duplicate key update chestReward = VALUES(chestReward),chestRewardStr = VALUES(chestRewardStr)
		if(colls==null || include == null) return null;
		final StringBuilder sb = new StringBuilder();
		final StringBuilder sbVal = new StringBuilder();
		final StringBuilder sbDup = new StringBuilder();
		FieldXml fieldXml = null;
		FieldOrm[] fields = null;
		Field priField = null;
		Iterator<?> it = colls.iterator();
		Class<? extends Object> clazz = null;
		boolean sbDone = false;
		int k = 0;
		while(it.hasNext()){
			Object next = it.next();
			if(clazz==null){
				clazz = next.getClass();
				fieldXml = getFieldXml(clazz);
				fields = fieldXml.getFields();
				priField = fieldXml.getPrimaryField();
				if(include!=null && include.length>0){
					//有例外
					List<FieldOrm> calcFields = new ArrayList<FieldOrm>();
					for(FieldOrm fieldOrm:fields){
						boolean match = false;
						for(String str:include){
							if(str.equals(fieldOrm.getField().getName()) || 
									fieldOrm.getField().equals(priField)){
								match = true;
								break;
							}
						}
						if(match){
							calcFields.add(fieldOrm);
						}
					}
					if(calcFields.size()>0){
						fields = new FieldOrm[calcFields.size()];
						calcFields.toArray(fields);
					}
				}
				sb.append(insert_into).append(fieldXml.getTbname()).append(zk);
				sbVal.append(values);
				sbDup.append(dup);
			}
			if(k>0){sbVal.append(d).append(mk);}
			int len = fields.length;
			Object value = null;
			for(int i=0;i<len;i++){
				Field field = fields[i].getField();
				//field append
				if(!sbDone){
					String name = field.getName();
					sb.append(name);
					//chestReward = VALUES(chestReward)
					sbDup.append(name).append("=VALUES(").append(name).append(")");
				}
				//value append
				value = getValue(field, next);
				if(value==null){
					sbVal.append(value);
				}else{
					sbVal.append(y).append(value).append(y);
				}
				if(i<len-1){
					if(!sbDone){
						sb.append(d);
						sbDup.append(d);
					}
					sbVal.append(d);
				}else{
					if(!sbDone){
						sb.append(yk);
					}
					sbVal.append(yk);
				}
			}
			if(!sbDone) sbDone = true;
			k++;
		}
		return sb.append(sbVal.toString()).append(sbDup.toString()).toString();
	}
	public static String makeInsertIntoOnDuplicate(Object obj,long hid){
		//INSERT INTO arena (chestReward,chestRewardStr,rid) VALUES $upStr$ on duplicate key update chestReward = VALUES(chestReward),chestRewardStr = VALUES(chestRewardStr)
		if(obj==null) return null;
		boolean dataTooLong = false;
		final StringBuilder sb = new StringBuilder();
		final StringBuilder sbVal = new StringBuilder();
		final StringBuilder sbDup = new StringBuilder();
		FieldXml fieldXml = null;
		FieldOrm[] fields = null;
		boolean sbDone = false;
		Class<? extends Object> clazz = obj.getClass();
		fieldXml = getFieldXml(clazz);
		fields = fieldXml.getFields();
		Field priField = fieldXml.getPrimaryField();
		sb.append(insert_into).append(fieldXml.getTbname()).append(zk);
		sbVal.append(values);
		sbDup.append(dup);
		int len = fields.length;
		Object value = null;
		for(int i=0;i<len;i++){
			Field field = fields[i].getField();
			//field append
			if(!sbDone){
				String name = field.getName();
				sb.append(name);
				//chestReward = VALUES(chestReward)
				sbDup.append(name).append("=VALUES(").append(name).append(")");
			}
			//value append
			if(field.equals(priField)){
				value = hid;
			}else{
				value = getValue(field, obj);
				if(value instanceof String){
					final String v = (String) value;
					Map<String, Integer> map = AutoObjTableUtil.fieldLenMap.get(clazz);
					if(map!=null){
						Integer fl = map.get(field.getName());
						if(fl!=null && v.length()>fl){
							//data too long
							dataTooLong = true;
							logger.warn(LogTool.getmsg("clazz data too long:"+clazz+",field:"+field.getName()+",len:"+v.length()));
						}
					}
				}
			}
			if(value==null){
				sbVal.append(value);
			}else{
				sbVal.append(y).append(value).append(y);
			}
			if(i<len-1){
				if(!sbDone){
					sb.append(d);
					sbDup.append(d);
				}
				sbVal.append(d);
			}else{
				if(!sbDone){
					sb.append(yk);
				}
				sbVal.append(yk);
			}
		}
		if(!sbDone) sbDone = true;
		if(dataTooLong){
			logger.warn(LogTool.getmsg("sql data too long:"+sb.toString()));
			AutoObjTableUtil.addTooLong(hid,sb.toString());
			return null;
		}
		return sb.append(sbVal.toString()).append(sbDup.toString()).toString();
	}
	
	/**
	 * 获取批量更新的sql，sql为insert into xx on duplicate key update xx=values(xxx)
	 * @param colls
	 * @param notInclude 不需要更新的字段名字，如果传入了主键，主键依然会update
	 * @return 
	 */
	public static String makeInsertIntoOnDuplicate(Collection<?> colls,String[] notInclude,Class<?> clazz){
		//INSERT INTO arena (chestReward,chestRewardStr,rid) VALUES $upStr$ on duplicate key update chestReward = VALUES(chestReward),chestRewardStr = VALUES(chestRewardStr)
		if(colls==null) return null;
		final StringBuilder sb = new StringBuilder();
		final StringBuilder sbVal = new StringBuilder();
		final StringBuilder sbDup = new StringBuilder();
		FieldXml fieldXml = null;
		FieldOrm[] fields = null;
		Field priField = null;
		Iterator<?> it = colls.iterator();
		boolean sbDone = false;
		int k = 0;
		fieldXml = getFieldXml(clazz);
		fields = fieldXml.getFields();
		priField = fieldXml.getPrimaryField();
		if(notInclude!=null && notInclude.length>0){
			//有例外
			List<FieldOrm> calcFields = new ArrayList<FieldOrm>();
			for(FieldOrm fieldOrm:fields){
				boolean match = false;
				for(String str:notInclude){
					if(str.equals(fieldOrm.getField().getName())){
						match = true;
						if(fieldOrm.getField().equals(priField)){
							//不能传入主键
							match = false;
						}
						break;
					}
				}
				if(!match){
					calcFields.add(fieldOrm);
				}
			}
			if(calcFields.size()>0){
				fields = new FieldOrm[calcFields.size()];
				calcFields.toArray(fields);
			}
		}
		sb.append(insert_into).append(fieldXml.getTbname()).append(zk);
		sbVal.append(values);
		sbDup.append(dup);
		while(it.hasNext()){
			Object next = it.next();
			if(k>0){sbVal.append(d).append(mk);}
			int len = fields.length;
			Object value = null;
			for(int i=0;i<len;i++){
				Field field = fields[i].getField();
				//field append
				if(!sbDone){
					String name = field.getName();
					sb.append(name);
					//chestReward = VALUES(chestReward)
					sbDup.append(name).append("=VALUES(").append(name).append(")");
				}
				//value append
				value = getValue(field, next);
				if(value==null){
					sbVal.append(value);
				}else{
					sbVal.append(y).append(value).append(y);
				}
				if(i<len-1){
					if(!sbDone){
						sb.append(d);
						sbDup.append(d);
					}
					sbVal.append(d);
				}else{
					if(!sbDone){
						sb.append(yk);
					}
					sbVal.append(yk);
				}
			}
			if(!sbDone) sbDone = true;
			k++;
		}
		return sb.append(sbVal.toString()).append(sbDup.toString()).toString();
	}
	
	/**
	 * 获取批量insert的sql，sql为insert into xx
	 * @param colls
	 * @param notInclude 不需要更新的字段名字，如果传入了主键，主键依然会update
	 * @return 
	 */
	public static String makeInsertIntoBatch(Collection<?> colls,Class<?> clazz){
		//INSERT INTO arena (chestReward,chestRewardStr,rid) VALUES $upStr$ on duplicate key update chestReward = VALUES(chestReward),chestRewardStr = VALUES(chestRewardStr)
		if(colls==null) return null;
		final StringBuilder sb = new StringBuilder();
		final StringBuilder sbVal = new StringBuilder();
		FieldXml fieldXml = null;
		FieldOrm[] fields = null;
		Iterator<?> it = colls.iterator();
		boolean sbDone = false;
		int k = 0;
		fieldXml = getFieldXml(clazz);
		fields = fieldXml.getFields();
		sb.append(insert_into).append(fieldXml.getTbname()).append(zk);
		sbVal.append(values);
		while(it.hasNext()){
			Object next = it.next();
			if(k>0){sbVal.append(d).append(mk);}
			int len = fields.length;
			Object value = null;
			for(int i=0;i<len;i++){
				Field field = fields[i].getField();
				//field append
				if(!sbDone){
					String name = field.getName();
					sb.append(name);
					//chestReward = VALUES(chestReward)
				}
				//value append
				value = getValue(field, next);
				if(value==null){
					sbVal.append(value);
				}else{
					sbVal.append(y).append(value).append(y);
				}
				if(i<len-1){
					if(!sbDone){
						sb.append(d);
					}
					sbVal.append(d);
				}else{
					if(!sbDone){
						sb.append(yk);
					}
					sbVal.append(yk);
				}
			}
			if(!sbDone) sbDone = true;
			k++;
		}
		return sb.append(sbVal.toString()).toString();
	}
	
	/**
	 * 生成update语句,根据主键组update
	 * @param clazz
	 * @param rid
	 * @throws Exception
	 */
	public static String makeUpdate(Object obj,Long rid){
		if(obj==null) return null;
		Class<?> clazz = obj.getClass();
		final StringBuilder sb = new StringBuilder();
		FieldXml fieldXml = getFieldXml(clazz);
		FieldOrm[] fields = fieldXml.getFields();
		Field priField = fieldXml.getPrimaryField();
		sb.append(update).append(fieldXml.getTbname()).append(set);
		int len = fields.length;
		Object value = null;
		boolean dataTooLong = false;
		boolean isPri = false;
		int dou = 0;
		for(int i=0;i<len;i++){
			FieldOrm fo = fields[i];
			Field field = fo.getField();
			if(!isPri && field.equals(priField)){
//				value = rid;
				//2016年6月1日 星期三 不set主键了
				isPri = true;
				continue;
			}else{
				value = getValue(field, obj);
			}
			if(value!=null){
				if(value instanceof String){
					final String v = (String) value;
					Map<String, Integer> map = AutoObjTableUtil.fieldLenMap.get(clazz);
					if(map!=null){
						Integer fl = map.get(field.getName());
						if(fl!=null && v.length()>fl){
							//data too long
							dataTooLong = true;
							logger.warn(LogTool.getmsg("clazz data too long:"+clazz+",field:"+field.getName()+",len:"+v.length()));
						}
					}
				}
				if(dou>0){
					sb.append(d);
				}
				sb.append(field.getName()).append(dy);
				sb.append(y).append(value).append(y);
				dou++;
			}
		}
//		Field priField = getPriField(clazz);
//		Field[] primaryKeys = fieldXml.getPrimaryKeys();
//		int priLen = primaryKeys.length;
		sb.append(where);
		/*for(int i=0;i<1;i++){
			Field priKey = primaryKeys[i];
			sb.append(priKey.getName()).append(dy).append(getValue(priKey, obj));
			if(i<priLen-1){
				sb.append(and);
			}
		}*/
		sb.append(" hid").append(dy).append(rid);
		if(dataTooLong){
			logger.warn(LogTool.getmsg("sql:"+sb.toString()));
			AutoObjTableUtil.addTooLong(rid,sb.toString());
			return null;
		}else{
			return sb.toString();
		}
	}
	
	@SuppressWarnings("unused")
	private static boolean isFieldCanNull(Field field){
		boolean canNull = false;
		Annotation[] annotations = field.getAnnotations();
		for(Annotation annotation:annotations){
			if(annotation instanceof ColumnBigInt){
				//数据库基本类型
				ColumnBigInt col = (ColumnBigInt) annotation;
				canNull = col.isNull();
			}else if(annotation instanceof ColumnInt){
				//数据库基本类型
				ColumnInt col = (ColumnInt) annotation;
				canNull = col.isNull();
			}else if( annotation instanceof ColumnVar){
				//数据库基本类型
				ColumnVar col = (ColumnVar) annotation;
				canNull = col.isNull();
			}
		}
		return canNull;
	}
	/**
	 * 获取字段长度
	 * @param field
	 * @return
	 */
	public static int getFieldLen(Field field){
		int len = 0;
		Annotation[] annotations = field.getAnnotations();
		for(Annotation annotation:annotations){
			if(annotation instanceof ColumnBigInt){
				//数据库基本类型
				ColumnBigInt col = (ColumnBigInt) annotation;
				len = col.len();
			}else if(annotation instanceof ColumnInt){
				//数据库基本类型
				ColumnInt col = (ColumnInt) annotation;
				len = col.len();
			}else if( annotation instanceof ColumnVar){
				//数据库基本类型
				ColumnVar col = (ColumnVar) annotation;
				len = col.len();
			}
		}
		return len;
	}
	
	/**
	 * 生成查找sql,根据主键组select
	 * 根据priKey
	 * @param clazz
	 */
	public static String makeFind(Class<?> clazz,long priKey){
		final StringBuilder sb = new StringBuilder();
		FieldXml fieldXml = getFieldXml(clazz);
		sb.append(select).append(fieldXml.getTbname()).append(where);
		Field field = fieldXml.getPrimaryField();
		sb.append(field.getName()).append(dy).append(priKey);
		return sb.toString();
	}
	/**
	 * 生成删除一条记录的sql，根据主键
	 * @param clazz
	 * @param priKey 主键，一般为id
	 */
	public static String makeDelOne(Class<?> clazz,long priKey){
		final StringBuilder sb = new StringBuilder();
		FieldXml fieldXml = getFieldXml(clazz);
		sb.append(delete).append(fieldXml.getTbname()).append(where);
		Field field = fieldXml.getPrimaryField();
		sb.append(field.getName()).append(dy).append(priKey);
		return sb.toString();
	}
	/**
	 * 生成查找sql,根据某个字符串select
	 * @param clazz
	 * @param strName 某个字符串字段名
	 * @param strValue 对应的值
	 */
	public static String makeFind(Class<?> clazz,String strName,String strValue){
		final StringBuilder sb = new StringBuilder();
		FieldXml fieldXml = getFieldXml(clazz);
		sb.append(select).append(fieldXml.getTbname()).append(where);
		sb.append(strName).append(dy).append(y).append(strValue).append(y);
		return sb.toString();
	}
	
	public static <T> T getObjFromDB(Map<String,Object> data,Class<T> clazz,T t) throws Exception{
		if(data==null || data.size()==0) return null;
		Map<String, Field> fieldMap = getAutoObjField(clazz);
		Iterator<Entry<String, Object>> it = data.entrySet().iterator();
		while(it.hasNext()){
			Entry<String, Object> entry = it.next();
			String key = entry.getKey();
			Object value = entry.getValue();
			Field field = fieldMap.get(key);
			if(field==null) continue;
			Class<?> fieldClazz = field.getType();
			if(value instanceof String){
				if(varDef.equals(value) || textDef.equals(value)){
					//default value by init insert
					continue;
				}
			}
			if(value instanceof String && !fieldClazz.isAssignableFrom(String.class)){
				String str = (String) value;
				if(ObjStrTransUtil.isMapListArr(fieldClazz) || fieldClazz.isArray()){
					// 是map list arr set
					value = ObjStrTransUtil.getMapListObj(str, field);
				}else{
					value = ObjStrTransUtil.toObj(str, fieldClazz);
				}
			}
			Method method = clazz.getMethod(
					SET + toUpperCaseFirstOne(field.getName()), fieldClazz);
			method.invoke(t, value);
		}
		return t;
	}
	/**
	 * 配合mybatis中find的resultType=hashmap时自动转换成对象
	 * @param data 查询到的结果，存放在map中
	 * @param clazz
	 * @return 数据对应的对象
	 * @throws Exception
	 */
	public static <T> T getObjFromDB(Map<String,Object> data,Class<T> clazz) throws Exception{
		return getObjFromDB(data, clazz, clazz.newInstance());
	}
	
	private static Object getValue(Field field,Object obj){
		Method method = null;
		Object invoke = null;
		try {
			if (obj.getClass().isAssignableFrom(boolean.class)) {
				// boolean
				method = obj.getClass().getMethod(IS + toUpperCaseFirstOne(field.getName()));
			} else {
				method = obj.getClass().getMethod(GET + toUpperCaseFirstOne(field.getName()));
			}
			invoke = method.invoke(obj);
			if (invoke != null && (!TransInnerUtil.isBaseType(invoke) || TransInnerUtil.isMapListArrSet(invoke))) {
				invoke = ObjStrTransUtil.toStr(invoke);
			}
		}catch (Exception e) {
			logger.error(LogTool.exception(e));
		}
		return invoke;
	}
	
	/**
	 * 获取clazz对应的FieldXml，配合自动生成sql使用<br/>
	 * 使用一个map来储存calzz对应的FieldXml，在获取的时候若值为null,则解析此Class,并放入缓存。
	 * @param clazz Class<?>
	 * @return FieldXml
	 */
	public static FieldXml getFieldXml(Class<?> clazz){
		FieldXml fieldXml = fieldXmlMap.get(clazz);
		return fieldXml;
	}
	/**
	 * 获取出库时自动映射对象的filedMap
	 * @param clazz
	 * @return
	 */
	public static Map<String,Field> getAutoObjField(Class<?> clazz){
		return fieldAutoTransObjMap.get(clazz);
	}
	/**
	 * 首字母转大写 若原来已经是首字母大写则直接返回原字符串
	 * 
	 * @param s
	 *            字符串
	 * @return 转换后的首字母大写字符串
	 */
	private static String toUpperCaseFirstOne(String s) {
		if (Character.isUpperCase(s.charAt(0)))
			return s;
		else
			return (new StringBuilder())
					.append(Character.toUpperCase(s.charAt(0)))
					.append(s.substring(1)).toString();
	}
	/**
	 * 首字母转小写
	 * @param s
	 * @return
	 */
	@SuppressWarnings("unused")
	private static String toLowerCaseFirstOne(String s) {
		if (Character.isLowerCase(s.charAt(0)))
			return s;
		else
			return (new StringBuilder())
					.append(Character.toLowerCase(s.charAt(0)))
					.append(s.substring(1)).toString();
	}
	/**
	 * 根据类名生成默认的insert sql语句，使用固定默认值插入
	 * @param tb
	 * @param rid
	 * @return
	 */
	public static String makeDefaultInsert(NewTb tb,long rid){
		String className = tb.getClassName();
		final StringBuilder sb = new StringBuilder();
		final StringBuilder sbVal = new StringBuilder();
		sb.append("insert into ").append(tb.getTbName()).append(" (");
		try { 
			Class<?> clazz = Class.forName(className);
			FieldXml fieldXml = getFieldXml(clazz);
			Field priField = fieldXml.getPrimaryField();
			sb.append(priField.getName());
			sbVal.append(rid);
			FieldOrm[] fields = fieldXml.getFields();
			for(FieldOrm fo:fields){
				Field field = fo.getField();
				if(!field.equals(priField)){
					if(!fo.isIsnull()){
						sb.append(",").append(field.getName());
						sbVal.append(",'");
						if(fo.getType()==TYPE_ZHENGXING){
							sbVal.append(0);
						}else if(fo.getType()==TYPE_STR){
							sbVal.append(textDef);
						}else{
							
						}
						sbVal.append("'");
					}
				}
			}
			sb.append(")").append(" values(").append(sbVal.toString()).append(")");
			return sb.toString();
		} catch (ClassNotFoundException e) {
			logger.error(LogTool.exception(e));
			return null;
		}
	}
}
