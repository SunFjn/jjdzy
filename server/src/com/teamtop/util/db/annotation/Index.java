package com.teamtop.util.db.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 索引标注
 * @author kyle
 *
 */
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Index {
	String name() default "";//默认key的名字为index_类字段名
	IndexEnum key() default IndexEnum.NORMAL; 
}
