package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_war_222;
public class Config_war_222 extends ConfigBase<Struct_war_222> {
    private static Config_war_222 ins = null;
    public static Config_war_222 getIns(){
        if(ins==null){
            ins = new Config_war_222();
        }
        return ins;
    }
    private Config_war_222(){
        put(1,new Struct_war_222(1,"[[1000,9999]]","[[-100,-80],[-60,-40],[-30,-20]]"));
        put(2,new Struct_war_222(2,"[[700,999]]","[[-60,-40],[-30,-20],[-15,-10]]"));
        put(3,new Struct_war_222(3,"[[500,699]]","[[-40,-30],[-25,-15],[-10,-5]]"));
        put(4,new Struct_war_222(4,"[[200,499]]","[[-25,-15],[-10,-5],[5,10]]"));
        put(5,new Struct_war_222(5,"[[100,199]]","[[-10,-5],[-3,-1],[5,10]]"));
        put(6,new Struct_war_222(6,"[[50,99]]","[[-5,-4],[-3,-1],[5,10]]"));
        put(7,new Struct_war_222(7,"[[20,49]]","[[-2,-1],[5,10],[20,50]]"));
        put(8,new Struct_war_222(8,"[[10,19]]","[[-2,-1],[5,10],[20,50]]"));
        put(9,new Struct_war_222(9,"[[6,9]]","[[-2,-1],[5,10],[20,50]]"));
        put(10,new Struct_war_222(10,"[[5,5]]","[[-1,-1],[1,5],[6,10]]"));
        put(11,new Struct_war_222(11,"[[4,4]]","[[1,3],[4,7],[8,10]]"));
        put(12,new Struct_war_222(12,"[[3,3]]","[[1,1],[2,2],[3,5]]"));
        put(13,new Struct_war_222(13,"[[2,2]]","[[2,3],[4,5],[6,7]]"));
        put(14,new Struct_war_222(14,"[[1,1]]","[[3,4],[5,6],[7,8]]"));
    }
    public void reset(){
        ins = null;
    }
}