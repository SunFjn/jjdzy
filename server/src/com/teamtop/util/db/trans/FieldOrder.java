package com.teamtop.util.db.trans;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
/**
 * 配合ObjStrTransUtil使用，用于标记field的顺序和类型
 * @author kyle
 *
 */
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface FieldOrder {
	int order();//field的顺序
}
