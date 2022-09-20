package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_warstore_222;
public class Config_warstore_222 extends ConfigBase<Struct_warstore_222> {
    private static Config_warstore_222 ins = null;
    public static Config_warstore_222 getIns(){
        if(ins==null){
            ins = new Config_warstore_222();
        }
        return ins;
    }
    private Config_warstore_222(){
        put(1,new Struct_warstore_222(1,"[[1,410002,10]]","[[4,0,500]]",900));
        put(2,new Struct_warstore_222(2,"[[1,431201,1]]","[[4,0,750]]",750));
        put(3,new Struct_warstore_222(3,"[[1,412005,5]]","[[4,0,1250]]",500));
        put(4,new Struct_warstore_222(4,"[[1,431204,1]]","[[4,0,1750]]",400));
        put(5,new Struct_warstore_222(5,"[[1,412013,5]]","[[4,0,1250]]",300));
        put(6,new Struct_warstore_222(6,"[[1,412001,5]]","[[4,0,1250]]",250));
        put(7,new Struct_warstore_222(7,"[[1,413001,1]]","[[4,0,1500]]",200));
        put(8,new Struct_warstore_222(8,"[[1,412003,5]]","[[4,0,1250]]",175));
        put(9,new Struct_warstore_222(9,"[[1,413002,1]]","[[4,0,1500]]",150));
        put(10,new Struct_warstore_222(10,"[[1,412011,5]]","[[4,0,1250]]",125));
        put(11,new Struct_warstore_222(11,"[[1,413003,1]]","[[4,0,4250]]",100));
        put(12,new Struct_warstore_222(12,"[[1,410006,1]]","[[4,0,500]]",90));
        put(13,new Struct_warstore_222(13,"[[1,413004,1]]","[[4,0,4250]]",80));
        put(14,new Struct_warstore_222(14,"[[1,410006,2]]","[[4,0,1000]]",70));
        put(15,new Struct_warstore_222(15,"[[1,413005,1]]","[[4,0,7500]]",60));
        put(16,new Struct_warstore_222(16,"[[1,410006,2]]","[[4,0,1000]]",50));
        put(17,new Struct_warstore_222(17,"[[1,413006,1]]","[[4,0,7500]]",40));
        put(18,new Struct_warstore_222(18,"[[1,410006,5]]","[[4,0,2500]]",30));
        put(19,new Struct_warstore_222(19,"[[1,413007,1]]","[[4,0,17500]]",20));
        put(20,new Struct_warstore_222(20,"[[1,413008,1]]","[[4,0,17500]]",10));
    }
    public void reset(){
        ins = null;
    }
}