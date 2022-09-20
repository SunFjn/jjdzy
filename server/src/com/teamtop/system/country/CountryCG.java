package com.teamtop.system.country;
import com.teamtop.system.hero.Hero;

/**
 * CountryCG.java
 * 国家
 */
public class CountryCG{

	private static CountryCG ins = null;

	public static CountryCG getIns(){
		if(ins == null){
			ins = new CountryCG();
		}
		return ins;
	}

	/**
	 * 随机国家 1471
	 */
	public void randomCountry(Hero hero, Object[] datas){
		CountryManager.getIns().randomCountry(hero);
	} 
	/**
	 * 国家捐献 1473
	 */
	public void countryDonation(Hero hero, Object[] datas){
		CountryManager.getIns().countryDonation(hero);
	} 
	/**
	 * 捐献(铜钱、元宝) 1475
	 * @param type| 捐献类型1：铜钱2：元宝| byte
	 */
	public void donation(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		CountryManager.getIns().donation(hero, type);
	} 
	/**
	 * 选择国家 1477
	 * @param countryType| 国家类型| byte
	 */
	public void selectCountry(Hero hero, Object[] datas){
		int countryType = (byte)datas[0];
		CountryManager.getIns().selectCountry(hero, countryType);
	} 
	/**
	 * 打开界面 1479
	 */
	public void openUI(Hero hero, Object[] datas){
		CountryManager.getIns().openUI(hero);
	} 
}