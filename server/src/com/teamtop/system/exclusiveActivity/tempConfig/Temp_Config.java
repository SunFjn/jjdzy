package com.teamtop.system.exclusiveActivity.tempConfig;

import org.codehaus.jackson.annotate.JsonSubTypes;
import org.codehaus.jackson.annotate.JsonTypeInfo;

@JsonTypeInfo(use = JsonTypeInfo.Id.CLASS, include = JsonTypeInfo.As.PROPERTY, property = "@class")
@JsonSubTypes({ @JsonSubTypes.Type(name = "Temp_Config_zshddbcz_315", value = Temp_Config_zshddbcz_315.class),
		@JsonSubTypes.Type(name = "Temp_Config_zshdzssd_315", value = Temp_Config_zshdzssd_315.class),
		@JsonSubTypes.Type(name = "Temp_Config_zshddbfl_315", value = Temp_Config_zshddbfl_315.class),
		@JsonSubTypes.Type(name = "Temp_Config_zshdybfl_315", value = Temp_Config_zshdybfl_315.class),
		@JsonSubTypes.Type(name = "Temp_Config_zshdljcz_315", value = Temp_Config_zshdljcz_315.class), })
public abstract class Temp_Config {

	public abstract void setConfig();

	public abstract void setTemp_Config();

}
