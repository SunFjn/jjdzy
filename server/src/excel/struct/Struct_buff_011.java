package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * B_011_buff表.xlsx
 */
public class Struct_buff_011 {
    /**buff的ID*/
    private int ID;
    /**触发类型
	 * 1.技能触发（普攻，技能，神技）
	 * 2.死亡后触发
	 * 3.入场时必定触发*/
    private int cf;
    /**BUFF效果类型
	 * 1.属性buff
	 * 2.复活buff
	 * 3.沉默buff
	 * 4.暴击buff*/
    private int type;
    /**BUFF类型
	 * 1.即刻生效
	 * 2.持续生效
	 * */
    private int shunxu;
    /**buff效果
	 * [[效果定义类型，值]]
	 * 效果定义：角色属性表
	 * 
	 * */
    private int[][] xiaoguo;
    /**效果成长*/
    private int[][] cz;
    /**触发概率
	 * 十万分比*/
    private int gl;
    /**概率成长
	 * 十万分比*/
    private int cz1;
    /**持续时间（毫秒）*/
    private int shijian;
    /**CD（毫秒）*/
    private int cd;
    /**时间成长（毫秒）*/
    private int sjcz;
    /**
     * buff的ID
     */
    public int getID() {
        return ID;
    }
    /**
     * 触发类型
	 * 1.技能触发（普攻，技能，神技）
	 * 2.死亡后触发
	 * 3.入场时必定触发
     */
    public int getCf() {
        return cf;
    }
    /**
     * BUFF效果类型
	 * 1.属性buff
	 * 2.复活buff
	 * 3.沉默buff
	 * 4.暴击buff
     */
    public int getType() {
        return type;
    }
    /**
     * BUFF类型
	 * 1.即刻生效
	 * 2.持续生效
	 * 
     */
    public int getShunxu() {
        return shunxu;
    }
    /**
     * buff效果
	 * [[效果定义类型，值]]
	 * 效果定义：角色属性表
	 * 
	 * 
     */
    public int[][] getXiaoguo() {
        return xiaoguo;
    }
    /**
     * 效果成长
     */
    public int[][] getCz() {
        return cz;
    }
    /**
     * 触发概率
	 * 十万分比
     */
    public int getGl() {
        return gl;
    }
    /**
     * 概率成长
	 * 十万分比
     */
    public int getCz1() {
        return cz1;
    }
    /**
     * 持续时间（毫秒）
     */
    public int getShijian() {
        return shijian;
    }
    /**
     * CD（毫秒）
     */
    public int getCd() {
        return cd;
    }
    /**
     * 时间成长（毫秒）
     */
    public int getSjcz() {
        return sjcz;
    }
    public Struct_buff_011(int ID,int cf,int type,int shunxu,String xiaoguo,String cz,int gl,int cz1,int shijian,int cd,int sjcz) {
        this.ID = ID;
        this.cf = cf;
        this.type = type;
        this.shunxu = shunxu;
        this.xiaoguo = ExcelJsonUtils.toObj(xiaoguo,int[][].class);
        this.cz = ExcelJsonUtils.toObj(cz,int[][].class);
        this.gl = gl;
        this.cz1 = cz1;
        this.shijian = shijian;
        this.cd = cd;
        this.sjcz = sjcz;
    }
}