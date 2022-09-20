package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_sgzljin_332;
public class Config_sgzljin_332 extends ConfigBase<Struct_sgzljin_332> {
    private static Config_sgzljin_332 ins = null;
    public static Config_sgzljin_332 getIns(){
        if(ins==null){
            ins = new Config_sgzljin_332();
        }
        return ins;
    }
    private Config_sgzljin_332(){
        put(1001,new Struct_sgzljin_332(1001,44,"[[4,0,168000],[1,451027,1]]",1));
        put(1002,new Struct_sgzljin_332(1002,44,"[[4,0,168000],[1,450013,1]]",2));
        put(1003,new Struct_sgzljin_332(1003,44,"[[4,0,168000],[1,451010,1]]",3));
        put(1004,new Struct_sgzljin_332(1004,44,"[[4,0,168000],[1,450012,1]]",4));
        put(1005,new Struct_sgzljin_332(1005,44,"[[4,0,168000],[1,451015,1]]",5));
        put(1006,new Struct_sgzljin_332(1006,44,"[[4,0,168000],[1,450032,1]]",6));
        put(1007,new Struct_sgzljin_332(1007,44,"[[4,0,168000],[1,450018,1]]",7));
    }
    public void reset(){
        ins = null;
    }
}