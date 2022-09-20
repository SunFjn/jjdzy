package com.teamtop.util.db.autoSql;

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.util.db.annotation.ColumnBigInt;
import com.teamtop.util.db.annotation.ColumnInt;
import com.teamtop.util.db.annotation.ColumnLongBlob;
import com.teamtop.util.db.annotation.ColumnMidBlob;
import com.teamtop.util.db.annotation.ColumnMidText;
import com.teamtop.util.db.annotation.ColumnText;
import com.teamtop.util.db.annotation.ColumnVar;
import com.teamtop.util.db.annotation.Index;
import com.teamtop.util.db.trans.ObjStrTransUtil;
import com.teamtop.util.db.trans.TransInnerUtil;
import com.teamtop.util.log.LogTool;




/**
 * 自动生成sql语句</br>
 * 需要配合使用@ColumnInt,@ColumnBigInt,@ColumnText,@ColumnTinyInt,@ColumnVar,@Index等标记的使用
 * @author kyle
 *
 */
public class AutoSqlUtil {
	private static Logger logger = LoggerFactory.getLogger(AutoSqlUtil.class);
	private final static String IS = "is";
	private final static String GET = "get";
	private final static String SET = "set";
	private final static String insert_into = "insert into ";
	private final static String zk = " (";
	private final static String yk = ")";
	private final static String values = " values (";
	private final static String y = "'";
	private final static String d = ",";
//	private final static String j = "#{";
//	private final static String ydk = "}";
	private final static String update = "update ";
	private final static String set = " set ";
	private final static String dy = "=";
	private final static String where = " where ";
	private final static String and = " and ";
	private final static String select = "select * from ";
	/**
	 * 用于自动生成insert和update、select的字段map
	 * key:class,value:fieldxml数组
	 */
	private static Map<Class<?>,FieldXml> fieldXmlMap = new HashMap<Class<?>,FieldXml>();
	/**
	 * 用于出库时自动生成对象的fieldMap
	 * key:class,value:{key:field名字,value:field}
	 */
	private static Map<Class<?>, Map<String,Field>> fieldAutoTransObjMap = new HashMap<Class<?>, Map<String,Field>>();
	/**
	 * 生成insert语句
	 * @param clazz
	 * @throws Exception
	 */
	public static String makeInsert(Object obj){
		Class<? extends Object> clazz = obj.getClass();
		final StringBuilder sb = new StringBuilder();
		final StringBuilder sbVal = new StringBuilder();
		FieldXml fieldXml = getFieldXml(clazz);
		Field[] fields = fieldXml.getFields();
		sb.append(insert_into).append(toLowerCaseFirstOne(clazz.getSimpleName())).append(zk);
		sbVal.append(values);
		Field[] primaryKeys = fieldXml.getPrimaryKeys();
		Field priField = null;
		if(primaryKeys!=null && primaryKeys.length==1){
			priField = primaryKeys[0];
		}
		int len = fields.length;
		Object value = null;
		for(int i=0;i<len;i++){
			Field field = fields[i];
			if(!field.equals(priField)){
				//field append
				sb.append(field.getName());
				//value append
				value = getValue(field, obj);
				if(value==null){
					sbVal.append(value);
				}else{
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
		return sb.append(sbVal.toString()).toString();
	}
	
	/*public static String makeInsert(Class<? extends Object> clazz){
		final StringBuilder sb = new StringBuilder();
		final StringBuilder sbVal = new StringBuilder();
		FieldXml fieldXml = getFieldXml(clazz);
		Field[] fields = fieldXml.getFields();
		sb.append(insert_into).append(toLowerCaseFirstOne(clazz.getSimpleName())).append(zk);
		sbVal.append(values);
		Field[] primaryKeys = fieldXml.getPrimaryKeys();
		Field priField = null;
		if(primaryKeys!=null && primaryKeys.length==1){
			priField = primaryKeys[0];
		}
		int len = fields.length;
		for(int i=0;i<len;i++){
			Field field = fields[i];
			if(!field.equals(priField)){
				//field append
				sb.append(field.getName());
				//value append
//				sbVal.append("'").append(getValue(field, obj)).append("'");
				sbVal.append(j).append(field.getName()).append(ydk);
				if(i<len-1){
					sb.append(d);
					sbVal.append(d);
				}else{
					sb.append(yk);
					sbVal.append(yk);
				}
			}
		}
		return sb.append(sbVal.toString()).toString();
	}*/
	/**
	 * 生成update语句,根据主键组update
	 * @param clazz
	 * @throws Exception
	 */
	public static String makeUpdate(Object obj){
		Class<?> clazz = obj.getClass();
		final StringBuilder sb = new StringBuilder();
		FieldXml fieldXml = getFieldXml(clazz);
		Field[] fields = fieldXml.getFields();
		sb.append(update).append(toLowerCaseFirstOne(clazz.getSimpleName())).append(set);
		int len = fields.length;
		Object value = null;
		for(int i=0;i<len;i++){
			Field field = fields[i];
			sb.append(field.getName()).append(dy);
			value = getValue(field, obj);
			if(value==null){
				sb.append(value);
			}else{
				sb.append(y).append(value).append(y);
			}
			if(i<len-1){
				sb.append(d);
			}
		}
		Field[] primaryKeys = fieldXml.getPrimaryKeys();
		int priLen = primaryKeys.length;
		sb.append(where);
		for(int i=0;i<priLen;i++){
			Field priKey = primaryKeys[i];
			sb.append(priKey.getName()).append(dy).append(getValue(priKey, obj));
			if(i<priLen-1){
				sb.append(and);
			}
		}
		return sb.toString();
	}
	/**
	 * 生成update语句,根据主键组update
	 * @param clazz
	 * @throws Exception
	 */
	/*public static String makeUpdates(Class<?> clazz){
		final StringBuilder sb = new StringBuilder();
		FieldXml fieldXml = getFieldXml(clazz);
		Field[] fields = fieldXml.getFields();
		sb.append("update ").append(toLowerCaseFirstOne(clazz.getSimpleName())).append(" set ");
		int len = fields.length;
		for(int i=0;i<len;i++){
			Field field = fields[i];
//			sb.append(field.getName()).append("=#{").append(field.getName()).append(ydk);
			Class<?> type = field.getType();
			if (type.isAssignableFrom(List.class) || type.isAssignableFrom(ArrayList.class)) {
				sb.append(field.getName()).append("=#{").append(field.getName()).append(",typeHandler=com.teamtop.util.mybatis.typeHandler.ListTypeHandler}");
			}else if (type.isAssignableFrom(Map.class)||type.isAssignableFrom(HashMap.class)||type.isAssignableFrom(ConcurrentHashMap.class)||type.isAssignableFrom(LinkedHashMap.class)) {
				sb.append(field.getName()).append("=#{").append(field.getName()).append(",typeHandler=com.teamtop.util.mybatis.typeHandler.MapTypeHandler}");
			}else{
				sb.append(field.getName()).append("=#{").append(field.getName()).append(ydk);
			}
			if(i<len-1){
				sb.append(d);
			}
		}
		Field[] primaryKeys = fieldXml.getPrimaryKeys();
		int priLen = primaryKeys.length;
		sb.append(" where ");
		for(int i=0;i<priLen;i++){
			Field priKey = primaryKeys[i];
			sb.append(priKey.getName()).append("=#{").append(priKey.getName()).append(ydk);
			if(i<priLen-1){
				sb.append(" and ");
			}
		}
		return sb.toString();
	}*/
	/**
	 * 生成查找sql,根据主键组select
	 * 根据priKey
	 * @param clazz
	 */
	public static String makeFind(Class<?> clazz,long priKey){
		final StringBuilder sb = new StringBuilder();
		FieldXml fieldXml = getFieldXml(clazz);
		sb.append(select).append(toLowerCaseFirstOne(clazz.getSimpleName())).append(where);
		Field[] primaryKeys = fieldXml.getPrimaryKeys();
		Field field = primaryKeys[0];
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
		sb.append(select).append(toLowerCaseFirstOne(clazz.getSimpleName())).append(where);
		sb.append(strName).append(dy).append(y).append(strValue).append(y);
		return sb.toString();
	}
	/**
	 * 配合mybatis中find的resultType=hashmap时自动转换成对象
	 * @param data 查询到的结果，存放在map中
	 * @param clazz
	 * @return 数据对应的对象
	 * @throws Exception
	 */
	public static <T> T getObjFromDB(Map<String,Object> data,Class<T> clazz) throws Exception{
		if(data==null || data.size()==0) return null;
		Map<String, Field> fieldMap = AutoSqlUtil.getAutoObjField(clazz);
		Iterator<Entry<String, Object>> it = data.entrySet().iterator();
		T t = clazz.newInstance();
		while(it.hasNext()){
			Entry<String, Object> entry = it.next();
			String key = entry.getKey();
			Object value = entry.getValue();
			Field field = fieldMap.get(key);
			Class<?> fieldClazz = field.getType();
			if(value instanceof String && !fieldClazz.isAssignableFrom(String.class)){
				String str = (String) value;
				if(TransInnerUtil.isMapListArr(fieldClazz) || fieldClazz.isArray()){
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
	private static FieldXml getFieldXml(Class<?> clazz){
		FieldXml fieldXml = fieldXmlMap.get(clazz);
		if(fieldXml==null){
			explainFieldXml(clazz);
			fieldXml = fieldXmlMap.get(clazz);
		}
		return fieldXml;
	}
	/**
	 * 获取出库时自动映射对象的filedMap
	 * @param clazz
	 * @return
	 */
	public static Map<String,Field> getAutoObjField(Class<?> clazz){
		Map<String, Field> map = fieldAutoTransObjMap.get(clazz);
		if(map==null){
			explainFieldXml(clazz);
			map = fieldAutoTransObjMap.get(clazz);
		}
		return map;
	}
	
	/**
	 * 解析字段生成xml需要用到的map,配合自动生成sql使用
	 */
	private static void explainFieldXml(Class<?> clazz){
		Field[] declaredFields = clazz.getDeclaredFields();
		final List<Field> fieldList = new ArrayList<Field>();
		final List<Field> indexList = new ArrayList<Field>();
		final List<Field> primaryList = new ArrayList<Field>();
		Map<String, Field> fieldMap = new HashMap<String, Field>();
		for(Field field:declaredFields){
			Annotation[] annotations = field.getAnnotations();
			for (Annotation annotation : annotations) {
				if (annotation instanceof Index) {
					//索引
					Index index = (Index) annotation;
					switch (index.key()){
						case NORMAL:
							indexList.add(field);
							break;
						case PRIMARY:
							primaryList.add(field);
							indexList.add(field);
							break;
						case UNIQUE:
							break;
					}
				}else if(annotation instanceof ColumnBigInt ||annotation instanceof ColumnInt 
						||annotation instanceof ColumnVar 
						|| annotation instanceof ColumnText || annotation instanceof ColumnMidText
						|| annotation instanceof ColumnMidBlob || annotation instanceof ColumnLongBlob) {
					//数据库基本类型
					fieldList.add(field);
					fieldMap.put(field.getName(), field);
				}
			}
		}
		Field[] primaryKeys = new Field[primaryList.size()];
		Field[] indexs = new Field[indexList.size()];
		Field[] fields = new Field[fieldList.size()];
		
		primaryList.toArray(primaryKeys);
		indexList.toArray(indexs);
		fieldList.toArray(fields);
		FieldXml fieldXml = new FieldXml(primaryKeys, indexs, fields);
		fieldXmlMap.put(clazz, fieldXml);
		fieldAutoTransObjMap.put(clazz, fieldMap);
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
	private static String toLowerCaseFirstOne(String s) {
		if (Character.isLowerCase(s.charAt(0)))
			return s;
		else
			return (new StringBuilder())
					.append(Character.toLowerCase(s.charAt(0)))
					.append(s.substring(1)).toString();
	}
}
