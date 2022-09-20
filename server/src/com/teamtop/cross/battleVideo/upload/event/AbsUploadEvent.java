package com.teamtop.cross.battleVideo.upload.event;

import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.http.HttpHeaders;

import java.io.File;

public abstract class AbsUploadEvent {
	public abstract File getFile(HttpHeaders headers);
	
	public void afterUpload(ChannelHandlerContext ctx){
		
	}
}
