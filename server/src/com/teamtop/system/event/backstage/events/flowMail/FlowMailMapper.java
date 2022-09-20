package com.teamtop.system.event.backstage.events.flowMail;

import java.sql.SQLException;

import com.teamtop.util.mybatis.BaseMapper;


public interface FlowMailMapper extends BaseMapper<B_FlowMail> {
	public void updateFlowMailState(B_FlowMail fm) throws SQLException;
	public void updateFlowMailFujianState(B_FlowMail fm) throws SQLException;
}
