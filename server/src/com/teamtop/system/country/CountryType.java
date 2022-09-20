package com.teamtop.system.country;

public enum CountryType {
	
	WEI_COUNTRY(1, "魏"),

	SHU_COUNTRY(2, "蜀"),

	WU_COUNTRY(3, "吴");
	
	private int countryType;
	
	private String countryName;
	
	private CountryType(int countryType, String countryName) {
		this.countryType = countryType;
		this.countryName = countryName;
	}

	public int getCountryType() {
		return countryType;
	}

	public void setCountryType(int countryType) {
		this.countryType = countryType;
	}

	public String getCountryName() {
		return countryName;
	}

	public void setCountryName(String countryName) {
		this.countryName = countryName;
	}

	public static CountryType getCountryTypeEnum(int ctype) {
		for (CountryType type : values()) {
			if (type.getCountryType() == ctype) {
				return type;
			}
		}
		return null;
	}

}
