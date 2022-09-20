package com.teamtop.util.LoggerAppender;

import ch.qos.logback.core.encoder.LayoutWrappingEncoder;

public class MyEncoder<E> extends LayoutWrappingEncoder<E>{
	public String getLayout(E e){
		return super.layout.doLayout(e);
	}
}
