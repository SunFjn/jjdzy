package com.teamtop.util.db.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface ColumnLongBlob {
	String field() default "";//默认取类字段名
	String comment();//注释
	boolean isNull() default false;//是否为null,默认不允许
}
