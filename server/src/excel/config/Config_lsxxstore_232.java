package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_lsxxstore_232;
public class Config_lsxxstore_232 extends ConfigBase<Struct_lsxxstore_232> {
    private static Config_lsxxstore_232 ins = null;
    public static Config_lsxxstore_232 getIns(){
        if(ins==null){
            ins = new Config_lsxxstore_232();
        }
        return ins;
    }
    private Config_lsxxstore_232(){
        put(1,new Struct_lsxxstore_232(1,"[[1,410001,1000]]","[[4,0,500]]",5));
        put(2,new Struct_lsxxstore_232(2,"[[1,411001,20]]","[[4,0,500]]",10));
        put(3,new Struct_lsxxstore_232(3,"[[1,411001,30]]","[[4,0,750]]",15));
        put(4,new Struct_lsxxstore_232(4,"[[1,412001,5]]","[[4,0,2500]]",20));
        put(5,new Struct_lsxxstore_232(5,"[[1,411003,100]]","[[4,0,2500]]",30));
        put(6,new Struct_lsxxstore_232(6,"[[1,412005,5]]","[[4,0,2500]]",40));
        put(7,new Struct_lsxxstore_232(7,"[[1,411008,100]]","[[4,0,2500]]",50));
        put(8,new Struct_lsxxstore_232(8,"[[1,412013,5]]","[[4,0,2500]]",60));
        put(9,new Struct_lsxxstore_232(9,"[[1,411007,100]]","[[4,0,2500]]",70));
        put(10,new Struct_lsxxstore_232(10,"[[1,412009,10]]","[[4,0,5000]]",80));
        put(11,new Struct_lsxxstore_232(11,"[[1,411005,200]]","[[4,0,5000]]",90));
        put(12,new Struct_lsxxstore_232(12,"[[1,412011,10]]","[[4,0,5000]]",100));
        put(13,new Struct_lsxxstore_232(13,"[[1,411002,200]]","[[4,0,5000]]",120));
        put(14,new Struct_lsxxstore_232(14,"[[1,412003,10]]","[[4,0,5000]]",140));
        put(15,new Struct_lsxxstore_232(15,"[[1,411004,200]]","[[4,0,5000]]",160));
        put(16,new Struct_lsxxstore_232(16,"[[1,412007,10]]","[[4,0,5000]]",180));
        put(17,new Struct_lsxxstore_232(17,"[[1,430001,1]]","[[4,0,37500]]",200));
        put(18,new Struct_lsxxstore_232(18,"[[1,410007,10]]","[[4,0,5000]]",250));
        put(19,new Struct_lsxxstore_232(19,"[[1,413307,1]]","[[4,0,17500]]",300));
        put(20,new Struct_lsxxstore_232(20,"[[1,413308,1]]","[[4,0,17500]]",400));
    }
    public void reset(){
        ins = null;
    }
}