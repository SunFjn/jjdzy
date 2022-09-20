package com.teamtop.redeploy;

import java.util.ArrayList;
import java.util.List;

public class CommandPro {
	//命令列表
	private List<Command> commandList = new ArrayList<Command>();
	public List<Command> getCommandList() {
		return commandList;
	}
	public void setCommandList(List<Command> commandList) {
		this.commandList = commandList;
	}
}
