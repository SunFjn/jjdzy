package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S_750_专属神兵-专属表.xlsx
 */
public class Struct_sbzs_750 {
    /**专属id
	 * 
	 * AXXX
	 * A=武将职业  A要支持两位数
	 * XXX=等级
	 * 
	 * 2：诸葛亮
	 * 4：马超
	 * 5：陆逊
	 * 6：张飞
	 * 7：关羽
	 * 8：夏侯渊
	 * 9：孙姬
	 * 10：许褚
	 * 11：吕蒙
	 * 12：吕布
	 * 13：黄忠
	 * 15：曹操
	 * 51：神·诸葛
	 * 52：神·赵云
	 * 53：神·貂蝉
	 * */
    private int id;
    /**升级条件
	 * 
	 * [[a,b],[c,d]]
	 * a：武将id
	 * b：武将星级
	 * c：神兵id
	 * d：神兵星级*/
    private int[][] tiaojian;
    /**属性*/
    private int[][] shuxing;
    /**战力*/
    private int zhanli;
    /**技能提升伤害
	 * 
	 * [[a,b]]
	 * a：技能id
	 * b：属性十万分比
	 * 
	 * 实际加成=b/100000
	 * 比如：b为100，则实际加成 0.001*/
    private int[][] jineng;
    /**
     * 专属id
	 * 
	 * AXXX
	 * A=武将职业  A要支持两位数
	 * XXX=等级
	 * 
	 * 2：诸葛亮
	 * 4：马超
	 * 5：陆逊
	 * 6：张飞
	 * 7：关羽
	 * 8：夏侯渊
	 * 9：孙姬
	 * 10：许褚
	 * 11：吕蒙
	 * 12：吕布
	 * 13：黄忠
	 * 15：曹操
	 * 51：神·诸葛
	 * 52：神·赵云
	 * 53：神·貂蝉
	 * 
     */
    public int getId() {
        return id;
    }
    /**
     * 升级条件
	 * 
	 * [[a,b],[c,d]]
	 * a：武将id
	 * b：武将星级
	 * c：神兵id
	 * d：神兵星级
     */
    public int[][] getTiaojian() {
        return tiaojian;
    }
    /**
     * 属性
     */
    public int[][] getShuxing() {
        return shuxing;
    }
    /**
     * 战力
     */
    public int getZhanli() {
        return zhanli;
    }
    /**
     * 技能提升伤害
	 * 
	 * [[a,b]]
	 * a：技能id
	 * b：属性十万分比
	 * 
	 * 实际加成=b/100000
	 * 比如：b为100，则实际加成 0.001
     */
    public int[][] getJineng() {
        return jineng;
    }
    public Struct_sbzs_750(int id,String tiaojian,String shuxing,int zhanli,String jineng) {
        this.id = id;
        this.tiaojian = ExcelJsonUtils.toObj(tiaojian,int[][].class);
        this.shuxing = ExcelJsonUtils.toObj(shuxing,int[][].class);
        this.zhanli = zhanli;
        this.jineng = ExcelJsonUtils.toObj(jineng,int[][].class);
    }
}