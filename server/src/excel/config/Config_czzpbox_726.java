package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_czzpbox_726;
public class Config_czzpbox_726 extends ConfigBase<Struct_czzpbox_726> {
    private static Config_czzpbox_726 ins = null;
    public static Config_czzpbox_726 getIns(){
        if(ins==null){
            ins = new Config_czzpbox_726();
        }
        return ins;
    }
    private Config_czzpbox_726(){
        put(1,new Struct_czzpbox_726(1,25000,"[[1,411001,5]]"));
        put(2,new Struct_czzpbox_726(2,50000,"[[1,411002,5]]"));
        put(3,new Struct_czzpbox_726(3,75000,"[[1,411003,5]]"));
        put(4,new Struct_czzpbox_726(4,100000,"[[1,411008,5]]"));
        put(5,new Struct_czzpbox_726(5,150000,"[[1,411007,5]]"));
        put(6,new Struct_czzpbox_726(6,200000,"[[1,411005,5]]"));
        put(7,new Struct_czzpbox_726(7,300000,"[[1,411001,10]]"));
        put(8,new Struct_czzpbox_726(8,400000,"[[1,411002,10]]"));
        put(9,new Struct_czzpbox_726(9,500000,"[[1,411003,10]]"));
        put(10,new Struct_czzpbox_726(10,600000,"[[1,411008,10]]"));
        put(11,new Struct_czzpbox_726(11,750000,"[[1,411007,10]]"));
        put(12,new Struct_czzpbox_726(12,1000000,"[[1,411005,10]]"));
    }
    public void reset(){
        ins = null;
    }
}