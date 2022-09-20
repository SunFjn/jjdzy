package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * W_211_武将表.xlsx
 */
public class Struct_hero_211 {
    /**职业*/
    private int type;
    /**名称*/
    private String name;
    /**武将激活（升星）
	 * 1,道具ID,数量*/
    private int[][] activation;
    /**技能列表ID*/
    private int[][] skills;
    /**激活属性*/
    private int[][] attr;
    /**基础战力*/
    private int power;
    /**升星属性*/
    private int[][] starattr;
    /**升星战力*/
    private int starpower;
    /**属性丹上限
	 * 每升1星+X属性丹上限*/
    private int max1;
    /**资质丹上限
	 * 每升1星提升X资质丹上限*/
    private int max2;
    /**品质*/
    private int pinzhi;
    /**升星上限*/
    private int star;
    /**是否是神将*/
    private int godhero;
    /**激活需要红将星级*/
    private int jh;
    /**天赋技能*/
    private int skill;
    /**buffid*/
    private int buffid;
    /**
     * 职业
     */
    public int getType() {
        return type;
    }
    /**
     * 名称
     */
    public String getName() {
        return name;
    }
    /**
     * 武将激活（升星）
	 * 1,道具ID,数量
     */
    public int[][] getActivation() {
        return activation;
    }
    /**
     * 技能列表ID
     */
    public int[][] getSkills() {
        return skills;
    }
    /**
     * 激活属性
     */
    public int[][] getAttr() {
        return attr;
    }
    /**
     * 基础战力
     */
    public int getPower() {
        return power;
    }
    /**
     * 升星属性
     */
    public int[][] getStarattr() {
        return starattr;
    }
    /**
     * 升星战力
     */
    public int getStarpower() {
        return starpower;
    }
    /**
     * 属性丹上限
	 * 每升1星+X属性丹上限
     */
    public int getMax1() {
        return max1;
    }
    /**
     * 资质丹上限
	 * 每升1星提升X资质丹上限
     */
    public int getMax2() {
        return max2;
    }
    /**
     * 品质
     */
    public int getPinzhi() {
        return pinzhi;
    }
    /**
     * 升星上限
     */
    public int getStar() {
        return star;
    }
    /**
     * 是否是神将
     */
    public int getGodhero() {
        return godhero;
    }
    /**
     * 激活需要红将星级
     */
    public int getJh() {
        return jh;
    }
    /**
     * 天赋技能
     */
    public int getSkill() {
        return skill;
    }
    /**
     * buffid
     */
    public int getBuffid() {
        return buffid;
    }
    public Struct_hero_211(int type,String name,String activation,String skills,String attr,int power,String starattr,int starpower,int max1,int max2,int pinzhi,int star,int godhero,int jh,int skill,int buffid) {
        this.type = type;
        this.name = name;
        this.activation = ExcelJsonUtils.toObj(activation,int[][].class);
        this.skills = ExcelJsonUtils.toObj(skills,int[][].class);
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.power = power;
        this.starattr = ExcelJsonUtils.toObj(starattr,int[][].class);
        this.starpower = starpower;
        this.max1 = max1;
        this.max2 = max2;
        this.pinzhi = pinzhi;
        this.star = star;
        this.godhero = godhero;
        this.jh = jh;
        this.skill = skill;
        this.buffid = buffid;
    }
}