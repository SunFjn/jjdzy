package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Y-217异宝每日奖励表.xlsx
 */
public class Struct_ybreward_217 {
    /**索引id*/
    private int sy;
    /**异宝id*/
    private int id;
    /**名字
	 * Administrator:
	 * 碎片编号：
	 * 402A01
	 * A为种族：
	 * 1.人族
	 * 2.妖族
	 * 3.仙族*/
    private String name;
    /**星级*/
    private int star;
    /**奖励*/
    private int[][] reward;
    /**
     * 索引id
     */
    public int getSy() {
        return sy;
    }
    /**
     * 异宝id
     */
    public int getId() {
        return id;
    }
    /**
     * 名字
	 * Administrator:
	 * 碎片编号：
	 * 402A01
	 * A为种族：
	 * 1.人族
	 * 2.妖族
	 * 3.仙族
     */
    public String getName() {
        return name;
    }
    /**
     * 星级
     */
    public int getStar() {
        return star;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_ybreward_217(int sy,int id,String name,int star,String reward) {
        this.sy = sy;
        this.id = id;
        this.name = name;
        this.star = star;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}