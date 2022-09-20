package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S-267-少主洗练表.xlsx
 */
public class Struct_sonxl_267 {
    /**索引id*/
    private int id;
    /**洗练次数
	 * 结尾为0 则为无上限*/
    private int[][] time;
    /**洗练技能*/
    private int[][] skill;
    /**
     * 索引id
     */
    public int getId() {
        return id;
    }
    /**
     * 洗练次数
	 * 结尾为0 则为无上限
     */
    public int[][] getTime() {
        return time;
    }
    /**
     * 洗练技能
     */
    public int[][] getSkill() {
        return skill;
    }
    public Struct_sonxl_267(int id,String time,String skill) {
        this.id = id;
        this.time = ExcelJsonUtils.toObj(time,int[][].class);
        this.skill = ExcelJsonUtils.toObj(skill,int[][].class);
    }
}