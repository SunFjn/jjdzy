package excel.struct;
/**
 * B_335_装备礼包整合.xlsx
 */
public class Struct_zblbzh_335 {
    /**道具id
	 * 备注:
	 * 新增道具，ID按顺序从后面顺延递增
	 * 40XXXX：礼包类道具
	 * 
	 * 410XXX：普通道具
	 *  411XXX：培养丹
	 *  412XXX：属性丹，资质丹 
	 *  413XXX：图鉴
	 *  414XXX：技能书
	 * 
	 * 42XXXX：宝石道具（宝石表）
	 *  421XXX：青木
	 *  422XXX：碧水
	 *  423XXX：朱焰
	 *  424XXX：紫雷
	 * 
	 * 430XXX：神兵
	 *   431XXX：宝物
	 *     4312XX：绿品  4313XX：紫品  4314XX：橙品  4315XX：红品  
	 *   432XXX：天书
	 *   433XXX：兵法
	 *   434XXX：异宝
	 * 
	 * 440XXX：武将
	 *  441XXX：战甲
	 *  
	 * 450XXX：头像
	 * 451XXX：头像框
	 * 
	 * 460XXX：称号*/
    private int id;
    /**名字
	 * 道具不要超过5个字，会超框*/
    private String name;
    /**
     * 道具id
	 * 备注:
	 * 新增道具，ID按顺序从后面顺延递增
	 * 40XXXX：礼包类道具
	 * 
	 * 410XXX：普通道具
	 *  411XXX：培养丹
	 *  412XXX：属性丹，资质丹 
	 *  413XXX：图鉴
	 *  414XXX：技能书
	 * 
	 * 42XXXX：宝石道具（宝石表）
	 *  421XXX：青木
	 *  422XXX：碧水
	 *  423XXX：朱焰
	 *  424XXX：紫雷
	 * 
	 * 430XXX：神兵
	 *   431XXX：宝物
	 *     4312XX：绿品  4313XX：紫品  4314XX：橙品  4315XX：红品  
	 *   432XXX：天书
	 *   433XXX：兵法
	 *   434XXX：异宝
	 * 
	 * 440XXX：武将
	 *  441XXX：战甲
	 *  
	 * 450XXX：头像
	 * 451XXX：头像框
	 * 
	 * 460XXX：称号
     */
    public int getId() {
        return id;
    }
    /**
     * 名字
	 * 道具不要超过5个字，会超框
     */
    public String getName() {
        return name;
    }
    public Struct_zblbzh_335(int id,String name) {
        this.id = id;
        this.name = name;
    }
}