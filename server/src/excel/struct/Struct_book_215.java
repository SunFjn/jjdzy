package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * T_215_天书表.xlsx
 */
public class Struct_book_215 {
    /**天书id*/
    private int id;
    /**名字*/
    private String name;
    /**图标*/
    private int icon;
    /**原画*/
    private int pic;
    /**品质
	 * jingyu:
	 * 
	 * 123456
	 * 白绿蓝紫橙红*/
    private int pin;
    /**属性*/
    private int[][] attr;
    /**升星属性*/
    private int[][] starattr;
    /**战力*/
    private int power;
    /**升星战力*/
    private int starpower;
    /**道具技能
	 * jingyu:
	 * 
	 * 读技能表id
	 * */
    private int skill;
    /**激活（升星）道具*/
    private int[][] item;
    /**激活（升星）提升属性丹上限*/
    private int max;
    /**升星上限*/
    private int star;
    /**
     * 天书id
     */
    public int getId() {
        return id;
    }
    /**
     * 名字
     */
    public String getName() {
        return name;
    }
    /**
     * 图标
     */
    public int getIcon() {
        return icon;
    }
    /**
     * 原画
     */
    public int getPic() {
        return pic;
    }
    /**
     * 品质
	 * jingyu:
	 * 
	 * 123456
	 * 白绿蓝紫橙红
     */
    public int getPin() {
        return pin;
    }
    /**
     * 属性
     */
    public int[][] getAttr() {
        return attr;
    }
    /**
     * 升星属性
     */
    public int[][] getStarattr() {
        return starattr;
    }
    /**
     * 战力
     */
    public int getPower() {
        return power;
    }
    /**
     * 升星战力
     */
    public int getStarpower() {
        return starpower;
    }
    /**
     * 道具技能
	 * jingyu:
	 * 
	 * 读技能表id
	 * 
     */
    public int getSkill() {
        return skill;
    }
    /**
     * 激活（升星）道具
     */
    public int[][] getItem() {
        return item;
    }
    /**
     * 激活（升星）提升属性丹上限
     */
    public int getMax() {
        return max;
    }
    /**
     * 升星上限
     */
    public int getStar() {
        return star;
    }
    public Struct_book_215(int id,String name,int icon,int pic,int pin,String attr,String starattr,int power,int starpower,int skill,String item,int max,int star) {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.pic = pic;
        this.pin = pin;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.starattr = ExcelJsonUtils.toObj(starattr,int[][].class);
        this.power = power;
        this.starpower = starpower;
        this.skill = skill;
        this.item = ExcelJsonUtils.toObj(item,int[][].class);
        this.max = max;
        this.star = star;
    }
}