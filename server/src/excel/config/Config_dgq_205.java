package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_dgq_205;
public class Config_dgq_205 extends ConfigBase<Struct_dgq_205> {
    private static Config_dgq_205 ins = null;
    public static Config_dgq_205 getIns(){
        if(ins==null){
            ins = new Config_dgq_205();
        }
        return ins;
    }
    private Config_dgq_205(){
        put(1,new Struct_dgq_205(1,"[[1,5]]","[[1,431201,1]]"));
        put(2,new Struct_dgq_205(2,"[[6,10]]","[[1,431204,1]]"));
        put(3,new Struct_dgq_205(3,"[[11,20]]","[[1,440003,1]]"));
        put(4,new Struct_dgq_205(4,"[[21,30]]","[[1,440001,1]]"));
        put(5,new Struct_dgq_205(5,"[[31,50]]","[[1,431202,1]]"));
        put(6,new Struct_dgq_205(6,"[[51,80]]","[[1,440005,1]]"));
        put(7,new Struct_dgq_205(7,"[[81,100]]","[[1,430001,1]]"));
        put(8,new Struct_dgq_205(8,"[[101,150]]","[[1,432001,1]]"));
        put(9,new Struct_dgq_205(9,"[[151,200]]","[[1,434001,1]]"));
        put(10,new Struct_dgq_205(10,"[[201,250]]","[[1,441001,1]]"));
        put(11,new Struct_dgq_205(11,"[[251,300]]","[[1,431203,1]]"));
        put(12,new Struct_dgq_205(12,"[[301,350]]","[[1,433003,1]]"));
        put(13,new Struct_dgq_205(13,"[[351,400]]","[[1,471003,1]]"));
        put(14,new Struct_dgq_205(14,"[[401,450]]","[[1,471001,1]]"));
        put(15,new Struct_dgq_205(15,"[[451,500]]","[[4,0,4000]]"));
        put(16,new Struct_dgq_205(16,"[[501,550]]","[[4,0,5000]]"));
        put(17,new Struct_dgq_205(17,"[[551,600]]","[[4,0,5000]]"));
        put(18,new Struct_dgq_205(18,"[[601,650]]","[[4,0,6000]]"));
        put(19,new Struct_dgq_205(19,"[[651,700]]","[[4,0,6000]]"));
        put(20,new Struct_dgq_205(20,"[[701,750]]","[[4,0,8000]]"));
        put(21,new Struct_dgq_205(21,"[[751,800]]","[[4,0,8000]]"));
        put(22,new Struct_dgq_205(22,"[[801,850]]","[[4,0,10000]]"));
        put(23,new Struct_dgq_205(23,"[[851,900]]","[[4,0,12000]]"));
        put(24,new Struct_dgq_205(24,"[[901,950]]","[[4,0,12000]]"));
        put(25,new Struct_dgq_205(25,"[[951,1200]]","[[4,0,14000]]"));
        put(26,new Struct_dgq_205(26,"[[1201,1500]]","[[4,0,14000]]"));
        put(27,new Struct_dgq_205(27,"[[1501,1800]]","[[4,0,14000]]"));
        put(28,new Struct_dgq_205(28,"[[1801,2000]]","[[4,0,14000]]"));
    }
    public void reset(){
        ins = null;
    }
}