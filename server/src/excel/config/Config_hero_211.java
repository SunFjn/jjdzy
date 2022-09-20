package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_hero_211;
public class Config_hero_211 extends ConfigBase<Struct_hero_211> {
    private static Config_hero_211 ins = null;
    public static Config_hero_211 getIns(){
        if(ins==null){
            ins = new Config_hero_211();
        }
        return ins;
    }
    private Config_hero_211(){
        put(1,new Struct_hero_211(1,"赵云","[[1,440001,1]]","[[100105],[100106],[100107],[100108]]","[[102,160000],[103,4000],[104,2000],[109,1000]]",75000,"[[102,160000],[103,4000],[104,2000],[109,1000]]",75000,30,1,3,50,0,0,0,0));
        put(2,new Struct_hero_211(2,"诸葛亮","[[1,440002,1]]","[[100205],[100206],[100207],[100208]]","[[102,480000],[103,12000],[104,6000],[109,3000]]",225000,"[[102,480000],[103,12000],[104,6000],[109,3000]]",225000,50,1,4,50,0,0,0,0));
        put(3,new Struct_hero_211(3,"貂蝉","[[1,440003,1]]","[[100305],[100306],[100307],[100308]]","[[102,160000],[103,4000],[104,2000],[109,1000]]",75000,"[[102,160000],[103,4000],[104,2000],[109,1000]]",75000,30,1,3,50,0,0,0,0));
        put(14,new Struct_hero_211(14,"张辽","[[1,440005,1]]","[[110905],[110906],[110907],[110908]]","[[102,160000],[103,4000],[104,2000],[109,1000]]",75000,"[[102,160000],[103,4000],[104,2000],[109,1000]]",75000,30,2,3,50,0,0,0,0));
        put(5,new Struct_hero_211(5,"陆逊","[[1,440012,1]]","[[100505],[100506],[100507],[100508]]","[[102,480000],[103,12000],[104,6000],[109,3000]]",225000,"[[102,480000],[103,12000],[104,6000],[109,3000]]",225000,50,2,4,50,0,0,0,0));
        put(8,new Struct_hero_211(8,"夏侯渊","[[1,440008,1]]","[[110205],[110206],[110207],[110208]]","[[102,480000],[103,12000],[104,6000],[109,3000]]",225000,"[[102,480000],[103,12000],[104,6000],[109,3000]]",225000,50,2,4,50,0,0,0,0));
        put(9,new Struct_hero_211(9,"孙姬","[[1,440009,1]]","[[110105],[110106],[110107],[110108]]","[[102,960000],[103,24000],[104,12000],[109,6000]]",450000,"[[102,960000],[103,24000],[104,12000],[109,6000]]",450000,100,2,5,50,0,0,0,0));
        put(13,new Struct_hero_211(13,"黄忠","[[1,440004,1]]","[[110805],[110806],[110807],[110808]]","[[102,960000],[103,24000],[104,12000],[109,6000]]",450000,"[[102,960000],[103,24000],[104,12000],[109,6000]]",450000,100,3,5,50,0,0,0,0));
        put(11,new Struct_hero_211(11,"吕蒙","[[1,440011,1]]","[[110405],[110406],[110407],[110408]]","[[102,960000],[103,24000],[104,12000],[109,6000]]",450000,"[[102,960000],[103,24000],[104,12000],[109,6000]]",450000,100,3,5,50,0,0,0,0));
        put(4,new Struct_hero_211(4,"马超","[[1,440006,1]]","[[100405],[100406],[100407],[100408]]","[[102,960000],[103,24000],[104,12000],[109,6000]]",450000,"[[102,960000],[103,24000],[104,12000],[109,6000]]",450000,100,3,5,50,0,0,0,0));
        put(10,new Struct_hero_211(10,"许褚","[[1,440013,1]]","[[110305],[110306],[110307],[110308]]","[[102,2560000],[103,64000],[104,32000],[109,16000]]",1200000,"[[102,2560000],[103,64000],[104,32000],[109,16000]]",1200000,160,4,6,50,0,0,0,0));
        put(6,new Struct_hero_211(6,"张飞","[[1,440007,1]]","[[110605],[110606],[110607],[110608]]","[[102,2560000],[103,64000],[104,32000],[109,16000]]",1200000,"[[102,2560000],[103,64000],[104,32000],[109,16000]]",1200000,160,4,6,50,0,0,0,0));
        put(7,new Struct_hero_211(7,"关羽","[[1,440014,1]]","[[110705],[110706],[110707],[110708]]","[[102,2560000],[103,64000],[104,32000],[109,16000]]",1200000,"[[102,2560000],[103,64000],[104,32000],[109,16000]]",1200000,160,10,6,50,0,0,0,0));
        put(12,new Struct_hero_211(12,"吕布","[[1,440010,1]]","[[110505],[110506],[110507],[110508]]","[[102,2560000],[103,64000],[104,32000],[109,16000]]",1200000,"[[102,2560000],[103,64000],[104,32000],[109,16000]]",1200000,180,12,6,50,0,0,0,0));
        put(15,new Struct_hero_211(15,"曹操","[[1,440015,1]]","[[111005],[111006],[111007],[111008]]","[[102,3200000],[103,80000],[104,40000],[109,20000]]",1500000,"[[102,3200000],[103,80000],[104,40000],[109,20000]]",1500000,250,12,7,50,0,0,0,0));
        put(18,new Struct_hero_211(18,"司马懿","[[1,440018,1]]","[[111035],[111036],[111037],[111038]]","[[102,2560000],[103,64000],[104,32000],[109,16000]]",1200000,"[[102,2560000],[103,64000],[104,32000],[109,16000]]",1200000,160,10,6,50,0,0,0,0));
        put(51,new Struct_hero_211(51,"神·诸葛","[[1,440051,1]]","[[112035],[112036],[112037],[112038]]","[[102,7200000],[103,120000],[104,90000],[109,30000]]",3000000,"[[102,7200000],[103,120000],[104,90000],[109,30000]]",3000000,0,0,8,1,1,10,112030,100001));
        put(52,new Struct_hero_211(52,"神·赵云","[[1,440052,1]]","[[113035],[113036],[113037],[113038]]","[[102,7200000],[103,120000],[104,90000],[109,30000]]",3000000,"[[102,7200000],[103,120000],[104,90000],[109,30000]]",3000000,0,0,8,1,1,12,113030,100002));
        put(53,new Struct_hero_211(53,"神·貂蝉","[[1,440053,1]]","[[114035],[114036],[114037],[114038]]","[[102,7200000],[103,120000],[104,90000],[109,30000]]",3000000,"[[102,7200000],[103,120000],[104,90000],[109,30000]]",3000000,0,0,8,1,1,12,114030,100003));
        put(54,new Struct_hero_211(54,"神·吕布","[[1,440054,1]]","[[115035],[115036],[115037],[115038]]","[[102,7200000],[103,120000],[104,90000],[109,30000]]",3000000,"[[102,7200000],[103,120000],[104,90000],[109,30000]]",3000000,0,0,8,1,1,12,115030,100004));
    }
    public void reset(){
        ins = null;
    }
}