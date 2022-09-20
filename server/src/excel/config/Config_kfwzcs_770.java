package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_kfwzcs_770;
public class Config_kfwzcs_770 extends ConfigBase<Struct_kfwzcs_770> {
    private static Config_kfwzcs_770 ins = null;
    public static Config_kfwzcs_770 getIns(){
        if(ins==null){
            ins = new Config_kfwzcs_770();
        }
        return ins;
    }
    private Config_kfwzcs_770(){
        put(1,new Struct_kfwzcs_770(1,"[[4,0,500]]"));
        put(2,new Struct_kfwzcs_770(2,"[[4,0,500]]"));
        put(3,new Struct_kfwzcs_770(3,"[[4,0,500]]"));
        put(4,new Struct_kfwzcs_770(4,"[[4,0,500]]"));
        put(5,new Struct_kfwzcs_770(5,"[[4,0,500]]"));
        put(6,new Struct_kfwzcs_770(6,"[[4,0,500]]"));
        put(7,new Struct_kfwzcs_770(7,"[[4,0,500]]"));
        put(8,new Struct_kfwzcs_770(8,"[[4,0,500]]"));
        put(9,new Struct_kfwzcs_770(9,"[[4,0,500]]"));
        put(10,new Struct_kfwzcs_770(10,"[[4,0,500]]"));
        put(11,new Struct_kfwzcs_770(11,"[[4,0,500]]"));
        put(12,new Struct_kfwzcs_770(12,"[[4,0,500]]"));
        put(13,new Struct_kfwzcs_770(13,"[[4,0,500]]"));
        put(14,new Struct_kfwzcs_770(14,"[[4,0,500]]"));
        put(15,new Struct_kfwzcs_770(15,"[[4,0,500]]"));
        put(16,new Struct_kfwzcs_770(16,"[[4,0,500]]"));
        put(17,new Struct_kfwzcs_770(17,"[[4,0,500]]"));
        put(18,new Struct_kfwzcs_770(18,"[[4,0,500]]"));
        put(19,new Struct_kfwzcs_770(19,"[[4,0,500]]"));
        put(20,new Struct_kfwzcs_770(20,"[[4,0,500]]"));
        put(21,new Struct_kfwzcs_770(21,"[[4,0,1000]]"));
        put(22,new Struct_kfwzcs_770(22,"[[4,0,1000]]"));
        put(23,new Struct_kfwzcs_770(23,"[[4,0,1500]]"));
        put(24,new Struct_kfwzcs_770(24,"[[4,0,1500]]"));
        put(25,new Struct_kfwzcs_770(25,"[[4,0,2000]]"));
        put(26,new Struct_kfwzcs_770(26,"[[4,0,2000]]"));
        put(27,new Struct_kfwzcs_770(27,"[[4,0,2000]]"));
        put(28,new Struct_kfwzcs_770(28,"[[4,0,2000]]"));
        put(29,new Struct_kfwzcs_770(29,"[[4,0,2500]]"));
        put(30,new Struct_kfwzcs_770(30,"[[4,0,2500]]"));
        put(31,new Struct_kfwzcs_770(31,"[[4,0,3000]]"));
        put(32,new Struct_kfwzcs_770(32,"[[4,0,3000]]"));
        put(33,new Struct_kfwzcs_770(33,"[[4,0,3000]]"));
    }
    public void reset(){
        ins = null;
    }
}