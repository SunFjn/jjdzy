package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_warbot_222;
public class Config_warbot_222 extends ConfigBase<Struct_warbot_222> {
    private static Config_warbot_222 ins = null;
    public static Config_warbot_222 getIns(){
        if(ins==null){
            ins = new Config_warbot_222();
        }
        return ins;
    }
    private Config_warbot_222(){
        put(1,new Struct_warbot_222(1,"[[1000,99999]]","[[223001]]","战神",100000,1004,2001,9,100));
        put(2,new Struct_warbot_222(2,"[[500,999]]","[[223002]]","战神",100000,1004,2001,9,100));
        put(3,new Struct_warbot_222(3,"[[200,499]]","[[223003]]","战神",500000,1004,2001,9,100));
        put(4,new Struct_warbot_222(4,"[[100,199]]","[[223004]]","战神",1000000,1004,2001,9,150));
        put(5,new Struct_warbot_222(5,"[[50,99]]","[[223005]]","战神",3000000,1004,2001,9,150));
        put(6,new Struct_warbot_222(6,"[[20,49]]","[[223006]]","战神",7500000,1004,2001,9,150));
        put(7,new Struct_warbot_222(7,"[[4,19]]","[[223007]]","战神",15000000,1004,2001,9,200));
        put(10,new Struct_warbot_222(10,"[[3,3]]","[[223008]]","战神",20000000,1004,2001,9,200));
        put(11,new Struct_warbot_222(11,"[[2,2]]","[[223009]]","战神",20000000,1004,2001,9,200));
        put(12,new Struct_warbot_222(12,"[[1,1]]","[[223010]]","战神",20000000,1004,2001,9,200));
    }
    public void reset(){
        ins = null;
    }
}