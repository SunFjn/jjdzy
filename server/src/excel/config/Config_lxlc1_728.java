package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_lxlc1_728;
public class Config_lxlc1_728 extends ConfigBase<Struct_lxlc1_728> {
    private static Config_lxlc1_728 ins = null;
    public static Config_lxlc1_728 getIns(){
        if(ins==null){
            ins = new Config_lxlc1_728();
        }
        return ins;
    }
    private Config_lxlc1_728(){
        put(1,new Struct_lxlc1_728(1,1,"[[1,410019,1],[1,410006,2],[1,410005,2],[1,400024,2]]",5001));
        put(2,new Struct_lxlc1_728(2,2,"[[1,410019,2],[1,410006,2],[1,410005,2],[1,400024,2]]",5002));
        put(3,new Struct_lxlc1_728(3,3,"[[1,432002,1],[1,410006,3],[1,410005,5],[1,400025,2]]",5003));
        put(4,new Struct_lxlc1_728(4,4,"[[1,410019,3],[1,410006,3],[1,410005,5],[1,400025,2]]",5004));
        put(5,new Struct_lxlc1_728(5,5,"[[1,434004,1],[1,410006,5],[1,410005,10],[1,400026,2]]",5005));
        put(6,new Struct_lxlc1_728(6,6,"[[1,410019,5],[1,410006,5],[1,410005,10],[1,400026,2]]",5006));
        put(7,new Struct_lxlc1_728(7,7,"[[1,431224,1],[1,410006,10],[1,410005,20],[1,400027,2]]",5007));
    }
    public void reset(){
        ins = null;
    }
}