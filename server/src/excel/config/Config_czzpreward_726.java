package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_czzpreward_726;
public class Config_czzpreward_726 extends ConfigBase<Struct_czzpreward_726> {
    private static Config_czzpreward_726 ins = null;
    public static Config_czzpreward_726 getIns(){
        if(ins==null){
            ins = new Config_czzpreward_726();
        }
        return ins;
    }
    private Config_czzpreward_726(){
        put(1,new Struct_czzpreward_726(1,"[[1,401049,1]]",1660,1));
        put(2,new Struct_czzpreward_726(2,"[[1,411001,10]]",8340,0));
        put(3,new Struct_czzpreward_726(3,"[[1,411002,10]]",8340,0));
        put(4,new Struct_czzpreward_726(4,"[[1,410006,1]]",3340,1));
        put(5,new Struct_czzpreward_726(5,"[[1,411008,10]]",8340,0));
        put(6,new Struct_czzpreward_726(6,"[[1,411003,10]]",8340,0));
        put(7,new Struct_czzpreward_726(7,"[[1,410019,1]]",3340,1));
        put(8,new Struct_czzpreward_726(8,"[[1,411007,10]]",16660,0));
        put(9,new Struct_czzpreward_726(9,"[[1,411005,10]]",8340,0));
        put(10,new Struct_czzpreward_726(10,"[[1,410011,1]]",8300,0));
        put(11,new Struct_czzpreward_726(11,"[[1,410010,1]]",8340,0));
        put(12,new Struct_czzpreward_726(12,"[[1,410009,1]]",16660,0));
    }
    public void reset(){
        ins = null;
    }
}