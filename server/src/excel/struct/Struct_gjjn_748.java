package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * G_748_国家技能.xlsx
 */
public class Struct_gjjn_748 {
    /**技能id*/
    private int id;
    /**位置
	 * Windows 用户:
	 * 
	 * 列表位置
	 * 1表示在列表第一个*/
    private int wz;
    /**图标*/
    private int icon;
    /**属性
	 * Windows 用户:
	 * 
	 * 
	 * 经验和铜钱填0*/
    private int[][] attr;
    /**在线经验
	 * Windows 用户:
	 * 
	 * 
	 * 此处的在线经验为：在线单个小怪的经验增加*/
    private int zxjy;
    /**在线铜钱
	 * Windows 用户:
	 * 
	 * 
	 * 此处的在线铜钱为：在线单个小怪的铜钱增加*/
    private int zxtq;
    /**离线经验
	 * Windows 用户:
	 * 
	 * 此处的离线经验为：离线每小时经验*/
    private int lxjy;
    /**离线铜钱
	 * Windows 用户:
	 * 
	 * 此处的离线铜钱为：离线每小时铜线*/
    private int lxtq;
    /**战力*/
    private int power;
    /**激活和升级条件
	 * Windows 用户:
	 * 
	 * 
	 * 没有激活/升级条件时填0
	 * 
	 * 具体数值：技能总等级*/
    private int tj;
    /**下一级id*/
    private int next;
    /**下一级消耗*/
    private int[][] consume;
    /**
     * 技能id
     */
    public int getId() {
        return id;
    }
    /**
     * 位置
	 * Windows 用户:
	 * 
	 * 列表位置
	 * 1表示在列表第一个
     */
    public int getWz() {
        return wz;
    }
    /**
     * 图标
     */
    public int getIcon() {
        return icon;
    }
    /**
     * 属性
	 * Windows 用户:
	 * 
	 * 
	 * 经验和铜钱填0
     */
    public int[][] getAttr() {
        return attr;
    }
    /**
     * 在线经验
	 * Windows 用户:
	 * 
	 * 
	 * 此处的在线经验为：在线单个小怪的经验增加
     */
    public int getZxjy() {
        return zxjy;
    }
    /**
     * 在线铜钱
	 * Windows 用户:
	 * 
	 * 
	 * 此处的在线铜钱为：在线单个小怪的铜钱增加
     */
    public int getZxtq() {
        return zxtq;
    }
    /**
     * 离线经验
	 * Windows 用户:
	 * 
	 * 此处的离线经验为：离线每小时经验
     */
    public int getLxjy() {
        return lxjy;
    }
    /**
     * 离线铜钱
	 * Windows 用户:
	 * 
	 * 此处的离线铜钱为：离线每小时铜线
     */
    public int getLxtq() {
        return lxtq;
    }
    /**
     * 战力
     */
    public int getPower() {
        return power;
    }
    /**
     * 激活和升级条件
	 * Windows 用户:
	 * 
	 * 
	 * 没有激活/升级条件时填0
	 * 
	 * 具体数值：技能总等级
     */
    public int getTj() {
        return tj;
    }
    /**
     * 下一级id
     */
    public int getNext() {
        return next;
    }
    /**
     * 下一级消耗
     */
    public int[][] getConsume() {
        return consume;
    }
    public Struct_gjjn_748(int id,int wz,int icon,String attr,int zxjy,int zxtq,int lxjy,int lxtq,int power,int tj,int next,String consume) {
        this.id = id;
        this.wz = wz;
        this.icon = icon;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.zxjy = zxjy;
        this.zxtq = zxtq;
        this.lxjy = lxjy;
        this.lxtq = lxtq;
        this.power = power;
        this.tj = tj;
        this.next = next;
        this.consume = ExcelJsonUtils.toObj(consume,int[][].class);
    }
}