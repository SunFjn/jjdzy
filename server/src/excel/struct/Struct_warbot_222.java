package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S_222_三国战神机器人表.xlsx
 */
public class Struct_warbot_222 {
    /**索引*/
    private int id;
    /**排名*/
    private int[][] rank;
    /**怪物*/
    private int[][] monster;
    /**名字*/
    private String name;
    /**战力*/
    private int power;
    /**头像*/
    private int head;
    /**头像框*/
    private int headk;
    /**职业*/
    private int job;
    /**等级*/
    private int lv;
    /**
     * 索引
     */
    public int getId() {
        return id;
    }
    /**
     * 排名
     */
    public int[][] getRank() {
        return rank;
    }
    /**
     * 怪物
     */
    public int[][] getMonster() {
        return monster;
    }
    /**
     * 名字
     */
    public String getName() {
        return name;
    }
    /**
     * 战力
     */
    public int getPower() {
        return power;
    }
    /**
     * 头像
     */
    public int getHead() {
        return head;
    }
    /**
     * 头像框
     */
    public int getHeadk() {
        return headk;
    }
    /**
     * 职业
     */
    public int getJob() {
        return job;
    }
    /**
     * 等级
     */
    public int getLv() {
        return lv;
    }
    public Struct_warbot_222(int id,String rank,String monster,String name,int power,int head,int headk,int job,int lv) {
        this.id = id;
        this.rank = ExcelJsonUtils.toObj(rank,int[][].class);
        this.monster = ExcelJsonUtils.toObj(monster,int[][].class);
        this.name = name;
        this.power = power;
        this.head = head;
        this.headk = headk;
        this.job = job;
        this.lv = lv;
    }
}