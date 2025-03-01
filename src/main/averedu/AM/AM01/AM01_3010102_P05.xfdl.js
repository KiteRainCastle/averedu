(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("form");
            this.set_titletext("휴직/복직/퇴직 상세");
            if (Form == this.constructor)
            {
                this._setFormPosition(820,580);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("dsMaster", this);
            obj.set_enableevent("true");
            obj.set_preload("true");
            obj.set_updatecontrol("true");
            obj.set_useclientlayout("true");
            obj._setContents("<ColumnInfo><Column id=\"SABEON\" type=\"STRING\" size=\"256\"/><Column id=\"SEQ\" type=\"STRING\" size=\"256\"/><Column id=\"BALRYEONG_GBCD\" type=\"STRING\" size=\"256\"/><Column id=\"BALRYEONG_FRDT\" type=\"STRING\" size=\"256\"/><Column id=\"BALRYEONG_TODT\" type=\"STRING\" size=\"256\"/><Column id=\"GYEYEOL_CD\" type=\"STRING\" size=\"256\"/><Column id=\"DEPT_CD\" type=\"STRING\" size=\"256\"/><Column id=\"JIKJONG_GBCD\" type=\"STRING\" size=\"256\"/><Column id=\"JIKGEUP_GBCD\" type=\"STRING\" size=\"256\"/><Column id=\"JIKWI_GBCD\" type=\"STRING\" size=\"256\"/><Column id=\"HOBONG_GBCD\" type=\"STRING\" size=\"256\"/><Column id=\"GYEYEOLHU_CD\" type=\"STRING\" size=\"256\"/><Column id=\"BUSEOHU_DEPT_CD\" type=\"STRING\" size=\"256\"/><Column id=\"JIKJONGHU_GBCD\" type=\"STRING\" size=\"256\"/><Column id=\"JIKGEUPHU_GBCD\" type=\"STRING\" size=\"256\"/><Column id=\"JIKWIHU_GBCD\" type=\"STRING\" size=\"256\"/><Column id=\"HOBONGHU_GBCD\" type=\"STRING\" size=\"256\"/><Column id=\"BOJIK_DEPT_CD\" type=\"STRING\" size=\"256\"/><Column id=\"BOJIK_GBCD\" type=\"STRING\" size=\"256\"/><Column id=\"BOJIK_REBEL\" type=\"STRING\" size=\"256\"/><Column id=\"WICHOK_WIWONHOE_CD\" type=\"STRING\" size=\"256\"/><Column id=\"WICHOK_JIKCHAEK_CD\" type=\"STRING\" size=\"256\"/><Column id=\"SIHAENG_GIGWAN_CD\" type=\"STRING\" size=\"256\"/><Column id=\"INSA_MYEONGRYEONG_NO\" type=\"STRING\" size=\"256\"/><Column id=\"HAWI_MYEONGRYEONG_NO\" type=\"STRING\" size=\"256\"/><Column id=\"CHEORI_DT\" type=\"DATE\" size=\"256\"/><Column id=\"CHEORIJA\" type=\"STRING\" size=\"256\"/><Column id=\"WEP_SUJEONG_DT\" type=\"DATE\" size=\"256\"/><Column id=\"WEP_SUJEONG_IP\" type=\"STRING\" size=\"256\"/><Column id=\"DEPT_MJOR\" type=\"STRING\" size=\"256\"/><Column id=\"UNIV_GUBN\" type=\"STRING\" size=\"256\"/><Column id=\"JEONGONG_CD\" type=\"STRING\" size=\"256\"/><Column id=\"JEONGONGHU_CD\" type=\"STRING\" size=\"256\"/><Column id=\"CHEORI_GUBUN_YN\" type=\"STRING\" size=\"256\"/><Column id=\"BOJIK_YN\" type=\"STRING\" size=\"256\"/><Column id=\"DAEPYO_BOJIK_GUBUN_CD\" type=\"STRING\" size=\"256\"/><Column id=\"JAEJIK_GBCD\" type=\"STRING\" size=\"256\"/><Column id=\"ASMT_NAME\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_input", this);
            obj.set_useclientlayout("false");
            obj.set_updatecontrol("true");
            obj.set_enableevent("true");
            obj.set_loadkeymode("keep");
            obj.set_loadfiltermode("keep");
            obj.set_reversesubsum("false");
            obj._setContents("<ColumnInfo><Column id=\"SABEON\" type=\"STRING\" size=\"10\"/><Column id=\"SEONGMYEONG\" type=\"STRING\" size=\"20\"/><Column id=\"SEONGMYEONG_HANMUN\" type=\"STRING\" size=\"20\"/><Column id=\"SEONGMYEONG_YEONGMUN\" type=\"STRING\" size=\"50\"/><Column id=\"JUMIN_NO\" type=\"STRING\" size=\"65532\"/><Column id=\"BIRTH_DT\" type=\"STRING\" size=\"8\"/><Column id=\"GENDER\" type=\"STRING\" size=\"2\"/><Column id=\"GUKJEOK_GBCD\" type=\"STRING\" size=\"8\"/><Column id=\"JAEJIK_GBCD\" type=\"STRING\" size=\"6\"/><Column id=\"JIKWON_GBCD\" type=\"STRING\" size=\"6\"/><Column id=\"IMYONG_FRDT\" type=\"STRING\" size=\"8\"/><Column id=\"IMYONG_TODT\" type=\"STRING\" size=\"8\"/><Column id=\"IMYONG_DT\" type=\"STRING\" size=\"8\"/><Column id=\"IMYONG_GBCD\" type=\"STRING\" size=\"2\"/><Column id=\"JIKJONG_GBCD\" type=\"STRING\" size=\"6\"/><Column id=\"JIKGEUP_GBCD\" type=\"STRING\" size=\"6\"/><Column id=\"JIKGEUP_IMYONG_DT\" type=\"STRING\" size=\"8\"/><Column id=\"GYEYEOL_CD\" type=\"STRING\" size=\"6\"/><Column id=\"DEPT_CD\" type=\"STRING\" size=\"6\"/><Column id=\"JEONGONG_CD\" type=\"STRING\" size=\"6\"/><Column id=\"JEONGONG_DVSN\" type=\"STRING\" size=\"30\"/><Column id=\"BALRYEONG_DT\" type=\"STRING\" size=\"20\"/><Column id=\"BOJIK_CD\" type=\"STRING\" size=\"10\"/><Column id=\"BOJIK_DEPT_CD\" type=\"STRING\" size=\"20\"/><Column id=\"BOJIK_IMYONG_DT\" type=\"STRING\" size=\"8\"/><Column id=\"JEONGNYEON_BOJANG_CD\" type=\"STRING\" size=\"1\"/><Column id=\"GYEYAKJE_GUBUN_YN\" type=\"STRING\" size=\"1\"/><Column id=\"JIKWI_GBCD\" type=\"STRING\" size=\"6\"/><Column id=\"JIKWI_DT\" type=\"STRING\" size=\"8\"/><Column id=\"HOBONG_GBCD\" type=\"STRING\" size=\"6\"/><Column id=\"HOBONG_SEUNGGEUP_MM\" type=\"STRING\" size=\"2\"/><Column id=\"GEUB_DATE\" type=\"STRING\" size=\"8\"/><Column id=\"HYUJIK_GBCD\" type=\"STRING\" size=\"8\"/><Column id=\"HYUJIK_FRDT\" type=\"STRING\" size=\"8\"/><Column id=\"HYUJIK_TODT\" type=\"STRING\" size=\"8\"/><Column id=\"TOEJIK_GBCD\" type=\"STRING\" size=\"8\"/><Column id=\"TOEJIK_DT\" type=\"STRING\" size=\"8\"/><Column id=\"DAMDANG_GWAMOK\" type=\"STRING\" size=\"500\"/><Column id=\"SISU\" type=\"BIGDECIMAL\" size=\"22\"/><Column id=\"CHOEJONG_HAKRYEOK_GUKGA_GBCD\" type=\"STRING\" size=\"6\"/><Column id=\"CHOEJONG_HAKRYEOK_GBCD\" type=\"STRING\" size=\"6\"/><Column id=\"CHWIDEUK_YYYY\" type=\"STRING\" size=\"4\"/><Column id=\"CHOEJONG_HAKWI_NM\" type=\"STRING\" size=\"50\"/><Column id=\"HAKSA_HAKWI_GUKGA_GBCD\" type=\"STRING\" size=\"10\"/><Column id=\"BACH_SCHL\" type=\"STRING\" size=\"20\"/><Column id=\"THIS_SCHL_YN\" type=\"STRING\" size=\"1\"/><Column id=\"CHOEJONG_JEONGONG_NM\" type=\"STRING\" size=\"50\"/><Column id=\"HAKRYEOK\" type=\"STRING\" size=\"1\"/><Column id=\"SEUNGGEUP_DT\" type=\"STRING\" size=\"8\"/><Column id=\"YEONGEUM_GAIP_YN\" type=\"STRING\" size=\"1\"/><Column id=\"SADAE_BOHEOM_YN\" type=\"STRING\" size=\"1\"/><Column id=\"CONT_YEAR\" type=\"BIGDECIMAL\" size=\"22\"/><Column id=\"SEON_YUMU\" type=\"STRING\" size=\"6\"/><Column id=\"TRAN_CHCK\" type=\"STRING\" size=\"2\"/><Column id=\"WEBB_YUMU\" type=\"STRING\" size=\"2\"/><Column id=\"SOSOK_NM\" type=\"STRING\" size=\"65532\"/><Column id=\"BOJIK_NM\" type=\"STRING\" size=\"65532\"/><Column id=\"JIKWI_NM\" type=\"STRING\" size=\"65532\"/><Column id=\"GYOGWAMOK_NM\" type=\"BIGDECIMAL\" size=\"22\"/><Column id=\"JIKGEUP_NM\" type=\"STRING\" size=\"65532\"/><Column id=\"JIKJONG_NM\" type=\"STRING\" size=\"65532\"/><Column id=\"GYEONGRYEOK_GBCD\" type=\"STRING\" size=\"10\"/><Column id=\"GYEONGRYEOK_FRDT\" type=\"STRING\" size=\"8\"/><Column id=\"HAEDANG_GIGWAN\" type=\"STRING\" size=\"160\"/><Column id=\"GYEONGRYEOK_JIKWI_NM\" type=\"STRING\" size=\"160\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsGrdBalryeong", this);
            obj._setContents("<ColumnInfo><Column id=\"CODE\" type=\"STRING\" size=\"32\"/><Column id=\"CODE_NM\" type=\"STRING\" size=\"32\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsBalryeong", this);
            obj._setContents("<ColumnInfo><Column id=\"CODE\" type=\"STRING\" size=\"32\"/><Column id=\"CODE_NM\" type=\"STRING\" size=\"32\"/><Column id=\"REF_2\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsJaejik", this);
            obj._setContents("<ColumnInfo><Column id=\"CODE\" type=\"STRING\" size=\"32\"/><Column id=\"CODE_NM\" type=\"STRING\" size=\"32\"/></ColumnInfo>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Button("btnClose","750",null,"60","25",null,"10",null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("닫기");
            obj.set_cssclass("btn_WF_Crud");
            this.addChild(obj.name, obj);

            obj = new Div("divSearch","10","10",null,"69","10",null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_cssclass("div_WF_SearchBox");
            obj.set_text("");
            this.addChild(obj.name, obj);

            obj = new Static("Static01","-39","9","118","22",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("0");
            obj.set_cssclass("sta_WF_SearchLbl");
            obj.set_text("직원번호");
            obj.set_textAlign("right");
            this.divSearch.addChild(obj.name, obj);

            obj = new Edit("edtSearchSabeon","89","9","140","22",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("1");
            obj.set_autoselect("true");
            obj.set_readonly("true");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("Static01_02_00","0","0","27","47",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("2");
            obj.set_text("27");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("Static01_01_00_00_01","20","0","320","9",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("3");
            obj.set_text("9");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            obj.set_font("normal 8pt/normal \"Arial\"");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("Static01_02_00_00_00","79","1","10","67",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("4");
            obj.set_text("10");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("Static01_01_00_00_01_00","20","58","320","9",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("5");
            obj.set_text("9");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            obj.set_font("normal 8pt/normal \"Arial\"");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("Static01_02_01_01","229","6","56","60",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("6");
            obj.set_text("← 56 →");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("Static01_00","297","9","48","22",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("7");
            obj.set_cssclass("sta_WF_SearchLbl");
            obj.set_text("성명");
            obj.set_textAlign("right");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("Static01_02_00_00_00_00","344","1","10","67",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("8");
            obj.set_text("10");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            this.divSearch.addChild(obj.name, obj);

            obj = new Edit("edtSearchSawonNm","354","9","90","22",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("9");
            obj.set_autoselect("true");
            obj.set_password("false");
            obj.set_readonly("true");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("Static01_02_01_01_00","444","6","56","60",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("10");
            obj.set_text("← 56 →");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("Static01_00_00","475","9","98","22",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("11");
            obj.set_cssclass("sta_WF_SearchLbl");
            obj.set_text("주민등록번호");
            obj.set_textAlign("right");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("Static01_02_00_00_00_00_00","574","1","10","37",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("12");
            obj.set_text("10");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            this.divSearch.addChild(obj.name, obj);

            obj = new MaskEdit("mdtSearchResNo","584","9","126","22",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("13");
            obj.set_enable("true");
            obj.set_format("######-#######");
            obj.set_type("string");
            obj.set_readonly("true");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("Static01_01_00_00_02","0","31",null,"5","0",null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("14");
            obj.set_text("5");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            obj.set_font("normal 6pt/normal \"Arial\"");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("Static01_01","-39","37","118","22",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("15");
            obj.set_cssclass("sta_WF_SearchLbl");
            obj.set_text("직종/직급");
            obj.set_textAlign("right");
            this.divSearch.addChild(obj.name, obj);

            obj = new Edit("edtSearchJikjong","89","36","140","22",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("16");
            obj.set_autoselect("true");
            obj.set_readonly("true");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("Static01_00_01","476","36","48","22",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("17");
            obj.set_cssclass("sta_WF_SearchLbl");
            obj.set_text("소속");
            obj.set_textAlign("right");
            this.divSearch.addChild(obj.name, obj);

            obj = new Edit("edtSearchSosok","535","36","175","22",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("18");
            obj.set_autoselect("true");
            obj.set_password("false");
            obj.set_readonly("true");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("Static01_00_02","257","36","88","22",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("19");
            obj.set_cssclass("sta_WF_SearchLbl");
            obj.set_text("재직상태");
            obj.set_textAlign("right");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("Static01_02_00_00_00_00_00_00","525","31","10","37",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("20");
            obj.set_text("10");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            this.divSearch.addChild(obj.name, obj);

            obj = new Combo("cboSearchJaejik","354","36","90","22",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("21");
            obj.set_codecolumn("CODE");
            obj.set_datacolumn("CODE_NM");
            obj.set_innerdataset("dsJaejik");
            obj.set_readonly("true");
            obj.set_text("");
            obj.set_value("1");
            obj.set_index("0");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("Static01","210","79","100","45",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("↑\r\n45\r\n↓");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            obj.set_font("normal 7pt/normal \"Arial\"");
            this.addChild(obj.name, obj);

            obj = new Static("stc_09_00","10","100","125","22",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("휴/복/퇴직 발령 목록");
            obj.set_cssclass("sta_WF_Title02");
            this.addChild(obj.name, obj);

            obj = new Static("staRowCnt","137","99","93","24",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_text("[총 <fc v=\'red\'><b v=\'true\'>0 </b></fc>건]");
            obj.set_usedecorate("true");
            this.addChild(obj.name, obj);

            obj = new Static("Static01_01_00_00","0","117",null,"8","0",null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_text("8");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            obj.set_font("normal 8pt/normal \"Arial\"");
            this.addChild(obj.name, obj);

            obj = new Button("btnSave",null,"92","55","25","10",null,null,null,null,null,this);
            obj.set_taborder("6");
            obj.set_text("저장");
            obj.set_cssclass("btn_WF_Crud");
            this.addChild(obj.name, obj);

            obj = new Static("Static01_02_00_00_00_00","0","0","10",null,null,"0",null,null,null,null,this);
            obj.set_taborder("7");
            obj.set_text("10");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            this.addChild(obj.name, obj);

            obj = new Static("Static01_02_00_00_00_00_00",null,"0","10",null,"0","0",null,null,null,null,this);
            obj.set_taborder("8");
            obj.set_text("10");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            this.addChild(obj.name, obj);

            obj = new Static("Static01_01_00_00_00","0","0",null,"10","0",null,null,null,null,null,this);
            obj.set_taborder("9");
            obj.set_text("10");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            obj.set_font("normal 8pt/normal \"Arial\"");
            this.addChild(obj.name, obj);

            obj = new Static("Static01_01_00_00_00_00","0",null,null,"10","0","0",null,null,null,null,this);
            obj.set_taborder("10");
            obj.set_text("10");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            obj.set_font("normal 8pt/normal \"Arial\"");
            this.addChild(obj.name, obj);

            obj = new Button("btnCancel",null,"92","55","25","70",null,null,null,null,null,this);
            obj.set_taborder("11");
            obj.set_text("취소");
            obj.set_cssclass("btn_WF_Crud");
            this.addChild(obj.name, obj);

            obj = new Button("btnDel",null,"92","55","25","130",null,null,null,null,null,this);
            obj.set_taborder("12");
            obj.set_text("삭제");
            obj.set_cssclass("btn_WF_Crud");
            this.addChild(obj.name, obj);

            obj = new Button("btnNew",null,"92","55","25","190",null,null,null,null,null,this);
            obj.set_taborder("13");
            obj.set_text("신규");
            obj.set_cssclass("btn_WF_Crud");
            this.addChild(obj.name, obj);

            obj = new Static("stc_09_00_01","10","345","155","22",null,null,null,null,null,null,this);
            obj.set_taborder("14");
            obj.set_text("휴/복/퇴직 발령정보");
            obj.set_cssclass("sta_WF_Title02");
            this.addChild(obj.name, obj);

            obj = new Static("Static01_01_00_00_01","0","362",null,"8","0",null,null,null,null,null,this);
            obj.set_taborder("15");
            obj.set_text("8");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            obj.set_font("normal 8pt/normal \"Arial\"");
            this.addChild(obj.name, obj);

            obj = new Static("Static01_00","210","335","100","35",null,null,null,null,null,null,this);
            obj.set_taborder("16");
            obj.set_text("↑\r\n35\r\n↓");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            obj.set_font("normal 7pt/normal \"Arial\"");
            this.addChild(obj.name, obj);

            obj = new Static("stc_13","10","369","800","28",null,null,null,null,null,null,this);
            obj.set_taborder("17");
            obj.set_cssclass("sta_WF_DetailBg");
            this.addChild(obj.name, obj);

            obj = new Static("stc_12","330","369","110","28",null,null,null,null,null,null,this);
            obj.set_taborder("18");
            obj.set_text("발령시작일");
            obj.set_cssclass("sta_WF_DetailTi");
            this.addChild(obj.name, obj);

            obj = new Static("stc_12_00_00_02_01_00_00_00","570","369","110","28",null,null,null,null,null,null,this);
            obj.set_taborder("19");
            obj.set_text("발령종료일");
            obj.set_cssclass("sta_WF_DetailTi");
            this.addChild(obj.name, obj);

            obj = new Static("stc_41","10","396","800","28",null,null,null,null,null,null,this);
            obj.set_taborder("20");
            obj.set_cssclass("sta_WF_DetailBg");
            this.addChild(obj.name, obj);

            obj = new Calendar("calBalryeongToDt","682","372","126","22",null,null,null,null,null,null,this);
            obj.set_taborder("21");
            obj.set_readonly("false");
            obj.set_enable("true");
            this.addChild(obj.name, obj);

            obj = new Calendar("calBalryeongFrDt","442","372","126","22",null,null,null,null,null,null,this);
            obj.set_taborder("22");
            obj.set_readonly("false");
            obj.set_enable("true");
            obj.set_cssclass("point");
            this.addChild(obj.name, obj);

            obj = new Static("stc_12_00","10","396","110","28",null,null,null,null,null,null,this);
            obj.set_taborder("23");
            obj.set_text("발령구분");
            obj.set_cssclass("sta_WF_DetailTi");
            this.addChild(obj.name, obj);

            obj = new Static("stc_12_01","10","369","110","28",null,null,null,null,null,null,this);
            obj.set_taborder("24");
            obj.set_text("재직구분");
            obj.set_cssclass("sta_WF_DetailTi");
            this.addChild(obj.name, obj);

            obj = new Combo("cboBalryeong","122","399","204","22",null,null,null,null,null,null,this);
            obj.set_taborder("25");
            obj.set_codecolumn("CODE");
            obj.set_datacolumn("CODE_NM");
            obj.set_readonly("false");
            obj.set_innerdataset("dsBalryeong");
            obj.set_cssclass("point");
            obj.set_text("");
            obj.set_value("1");
            obj.set_index("0");
            this.addChild(obj.name, obj);

            obj = new Grid("grdMaster","10","125",null,"210","10",null,null,null,null,null,this);
            obj.set_taborder("26");
            obj.set_binddataset("dsMaster");
            obj.set_autofittype("col");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"35\" band=\"left\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"254\"/></Columns><Rows><Row size=\"30\" band=\"head\"/><Row size=\"30\"/></Rows><Band id=\"head\"><Cell text=\"NO\"/><Cell col=\"1\" text=\"발령구분\"/><Cell col=\"2\" text=\"시작일\"/><Cell col=\"3\" text=\"종료일\"/><Cell col=\"4\" text=\"발령정보\"/></Band><Band id=\"body\"><Cell expr=\"expr:(dataset.getRowType(currow)) == &apos;2&apos; ? &apos;+&apos;:(dataset.getRowType(currow)) == &apos;4&apos; ? &apos;U&apos;:currow+1\"/><Cell col=\"1\" text=\"bind:BALRYEONG_GBCD\" combodataset=\"dsGrdBalryeong\" combocodecol=\"CODE\" combodatacol=\"CODE_NM\" displaytype=\"combotext\"/><Cell col=\"2\" text=\"bind:BALRYEONG_FRDT\" displaytype=\"date\" calendardateformat=\"yyyy-MM-dd\"/><Cell col=\"3\" text=\"bind:BALRYEONG_TODT\" displaytype=\"date\" calendardateformat=\"yyyy-MM-dd\"/><Cell col=\"4\" text=\"bind:ANNC_INFO\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Radio("rdoJaejik","122","372","204","22",null,null,null,null,null,null,this);
            obj.set_taborder("27");
            obj.set_codecolumn("codecolumn");
            obj.set_datacolumn("datacolumn");
            obj.set_direction("vertical");
            obj.set_enable("true");
            obj.set_readonly("true");
            var rdoJaejik_innerdataset = new nexacro.NormalDataset("rdoJaejik_innerdataset", obj);
            rdoJaejik_innerdataset._setContents("<ColumnInfo><Column id=\"codecolumn\" size=\"256\"/><Column id=\"datacolumn\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"codecolumn\">20</Col><Col id=\"datacolumn\">휴직</Col></Row><Row><Col id=\"codecolumn\">30</Col><Col id=\"datacolumn\">퇴직</Col></Row><Row><Col id=\"codecolumn\">10</Col><Col id=\"datacolumn\">복직</Col></Row></Rows>");
            obj.set_innerdataset(rdoJaejik_innerdataset);
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",820,580,this,function(p){});
            obj.set_mobileorientation("landscape");
            obj.set_description("휴직/복직/퇴직 상세");
            this.addLayout(obj.name, obj);
            
            // BindItem Information
            obj = new BindItem("item0","divSearch.form.edtSearchSabeon","value","ds_input","SABEON");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item2","divSearch.form.edtSearchSawonNm","value","ds_input","SEONGMYEONG");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item1","divSearch.form.mdtSearchResNo","value","ds_input","JUMIN_NO");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item3","calBalryeongToDt","value","dsMaster","BALRYEONG_TODT");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item11","divSearch.form.edtSearchSosok","value","ds_input","SOSOK_NM");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item10","calBalryeongFrDt","value","dsMaster","BALRYEONG_FRDT");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item6","cboBalryeong","value","dsMaster","BALRYEONG_GBCD");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item9","divSearch.form.cboSearchJaejik","value","ds_input","GYEYAKJE_GUBUN_YN");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item4","rdoJaejik","value","dsMaster","JAEJIK_GBCD");
            this.addChild(obj.name, obj);
            obj.bind();
            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {
            this._addPreloadList("data","","dsMaster");
        };
        
        // User Script
        this.registerScript("AM01_3010102_P05.xfdl", function() {
        /**********************************************************************
        * FormID(화면   ID명): AM01_3010102_P05.xfdl(휴직/복직/퇴직 상세)
        * 작 성         일 명: jiback
        * 작 성         일 자: 2022/08/19
        * 변 경         일 자:
        * 변 경         자 명:
        * 변경 및 수정 로그 : 일자별로 변경자 및 변경사항을 간략히 기술
        */
        /**********************************************************************
                01. 전처리 공통 함수 선언
        ***********************************************************************/
        /**********************************************************************
                02. 폼 변수 정의
        ***********************************************************************/
        this.lvchkColidDs   = "BALRYEONG_FRDT$BALRYEONG_GBCD";                        // 필수 입력사항 칼럼ID  예)  "commSmcd$commName"
        this.lvchkColNameDs = "발령시작일$발령구분";
        /**********************************************************************
                03. 폼 로드 및 닫을때(폼이 포커스 갈때)
        ***********************************************************************/
        /**
         * 기능 : 폼 로드 완료후 초기값 Setting
         */
        this.form_onload = function(obj,e)
        {
            //폼에 공통으로 로드시 사용하는 함수.
            this.gfn_formOnload(obj.e);
            //사용자 화면  초기화 함수
            this.fn_formInit();
        };

        /**********************************************************************
                04. 공통 코드 및 콤보 데이타 조회
        ***********************************************************************/
        this.fn_formInit = function()
        {
            var strDs    = "dsBalryeong|dsGrdBalryeong|dsJaejik";                    // 데이터를 받을 데이터셋리스트     예) "DS_CODE01|DS_CODE02|DS_CODE03"
            var strLgcd  = "00211|00211|00208";                           // 공통코드 중분류 코드, 데이터셋 개수와 같아야 한다. 예) "Z01|Z02|Z03"
            var strComb  = "S|X|X";                                   // 콤보옵션 (T:전체, S:선택, N:공백, X:해당사항없음)
            var strOptn  = "";                                      // 조건문 " AND COMM_IT02 = '" + vip + "'|||";
            var svcId    = "Init";

                // gfn_CmmnMultiComboLoad(데이터셋 리스트, 대분류코드 , 콤보 옵션);
                // 서비스 ID : 코드 조회 실행 후 CALLBACK 함수 지정.

            this.gfn_CmmnMultiComboLoad(strDs
                                      , strLgcd
                                      , strComb
                                      , strOptn
                                      , svcId);
        };

        this.fn_PostformInit = function()
        {
        	this.ds_input.copyData(this.getOwnerFrame().data);

        	var jikjongNm = this.ds_input.getColumn(0,"JIKJONG_NM");
        	var jikgeupNm = this.ds_input.getColumn(0,"JIKGEUP_NM");

        	this.divSearch.form.edtSearchJikjong.set_value(jikjongNm+"/"+jikgeupNm);

        	this.fn_Ret();
        };

        /**
         * 기능 : 콜백함수(후처리)
         */
        this.fn_callBack = function(sSvcId,nErrorCode, sErrorMsg)
        {
            this.gfn_clearSortAll(this.grdMaster);
            if(nErrorCode != 0)
            {
                this.gfn_alert(sErrorMsg,"에러정보","","error");
                return false;
            }else
            {
                /*sSvcId (Transaction Id)*/
                switch(sSvcId)
                {
                    case "Init":
                            this.fn_PostformInit();
                        break;
                    case "Ret":
                            this.fn_PostRet();
                        break;
                    case "Save":
                            this.fn_PostSave();
                        break;
                    case "Del":
                            this.fn_PostDel();
                        break;
                    default:
                        break;
                }
            }
        };

        /**********************************************************************
                05. 조회 함수 선언(마스터 함수)
        ***********************************************************************/
        /**
         * 기능 : 마스터 조회 실행
         */
        this.fn_Ret = function()
        {
            var strSvc      = "Ret";
            var strUrl      = "/prj/AM/AM01/Retrieve_3010101_P05.do";
            var strInDs     = "ds_input=ds_input";
            var strOutDs    = "dsMaster=dsMaster";
            var strArg      = "";
            var GBV_MENUID    = objApp.gv_cutPrgId;
            if(! this.gfn_isNull(this.gfn_trim(GBV_MENUID)))
            {
            	strArg += "GBV_MENUID=" + GBV_MENUID + " " + strArg;
            }
            var strCallBack = "fn_callBack";    //공백일시 기본 fn_callBack
            var strASync    = true;             //생략이나 공백일시에는 ASync=true,싱크시는 false로
            this.gfn_Transaction(strSvc
                               , strUrl
                               , strInDs
                               , strOutDs
                               , strArg
                               , strCallBack
                               , strASync);
        };

        /**
         * 기능 : 조회 후 실행
         */
        this.fn_PostRet = function()
        {
            this.gfn_getRowCount(this.staRowCnt,this.dsMaster);
        };

        /**********************************************************************
                06. 추가 함수 선언
        ***********************************************************************/
        /**
         * 기능 : 추가 전 실행(기본체크사항)
         */
        this.fn_PreNew = function()
        {
        	var isNew = false;
        	for(var i=0; i<this.dsMaster.rowcount; i++)
        	{
        		if(this.dsMaster.getRowType(i) == 2) {
        			isNew = true;
        		}
        	}

        	if(isNew == true) {
        		this.alert("이미 추가되었습니다. 확인바랍니다.");
        		return false;
        	}

        	return true;
        };

        /**
         * 기능 : 마스터 추가 실행
         */
        this.fn_New = function()
        {
            if(!this.fn_PreNew())
            {
                return false;
            }
        	this.rdoJaejik.set_readonly(false);
        	this.calBalryeongFrDt.set_readonly(false);  //발령시작일
        	this.calBalryeongToDt.set_readonly(false);  //발령종료일
        	this.cboBalryeong.set_readonly(false);  	//발령구분

        	var sabeon = this.ds_input.getColumn(0,"SABEON");                   //사번
        	var jaejikGbcd = this.rdoJaejik.value;        						//재직구분
        	var balryeongGbcd = this.cboBalryeong.value;  						//발령구분
        	var gyeyeolCd = this.ds_input.getColumn(0,"GYEYEOL_CD");            //계열
        	var deptCd = this.ds_input.getColumn(0,"DEPT_CD");                  //부서
        	var jeongongCd = this.ds_input.getColumn(0,"JEONGONG_CD");          //전공
        	var jikjongGbcd= this.ds_input.getColumn(0,"JIKJONG_GBCD");         //직종
        	var jikgeupGbcd = this.ds_input.getColumn(0,"JIKGEUP_GBCD");        //직급

            var nRow = this.dsMaster.addRow();
        	this.dsMaster.setColumn(nRow,"SABEON",sabeon);
        	this.dsMaster.setColumn(nRow,"BALRYEONG_GBCD",balryeongGbcd);
        	this.dsMaster.setColumn(nRow,"GYEYEOL_CD",gyeyeolCd);
        	this.dsMaster.setColumn(nRow,"DEPT_CD",deptCd);
        	this.dsMaster.setColumn(nRow,"JEONGONG_CD",jeongongCd);
        	this.dsMaster.setColumn(nRow,"JIKJONG_GBCD",jikjongGbcd);
        	this.dsMaster.setColumn(nRow,"JIKGEUP_GBCD",jikgeupGbcd);
        	this.dsMaster.setColumn(nRow,"JAEJIK_GBCD",jaejikGbcd);
        };

        /**********************************************************************
                07. 삭제 함수 선언
        ***********************************************************************/
        /**
         * 기능 : 삭제 버튼 실행
         */
        this.fn_PreDel = function()
        {
            //멀티삭제용도
            if(this.dsMaster.rowcount < 1)
            {
                this.gfn_alert("삭제할 데이터가 없습니다.","삭제정보","","warning");
                return false;
            }

            var result = this.gfn_confirm( "현재선택행을 삭제하시겠습니까?", "삭제정보","","question" );
            if(result == 0)
            {
                return false;
            }

            //개별삭제시
            this.dsMaster.deleteRow(this.dsMaster.rowposition);
            return true;
        };

        /**
         * 기능 : Row 삭제 또는 Transaction 삭제 처리
         */
        this.fn_Del = function()
        {
            if(!this.fn_PreDel())
            {
                return false;
            }
            var strSvc      = "Del";
            var strUrl      = "/prj/AM/AM01/Delete_3010101_P05.do";
            var strInDs     = "dsMaster=dsMaster:u";
            var strOutDs    = "";
            var strArg      = "";
        	var GBV_MENUID    = objApp.gv_cutPrgId;
            if(! this.gfn_isNull(this.gfn_trim(GBV_MENUID)))
            {
            	strArg += "GBV_MENUID=" + GBV_MENUID + " " + strArg;
            }
            var strCallBack = "fn_callBack";    //공백일시 기본 fn_callBack
            var strASync    = true;                                   //샏략이나 공백일시에는 ASync=true,싱크시는 false로
            this.gfn_Transaction(strSvc
                               , strUrl
                               , strInDs
                               , strOutDs
                               , strArg
                               , strCallBack
                               , strASync);
        };

        this.fn_PostDel = function()
        {
            this.gfn_getRowCount(this.staRowCnt,this.dsMaster);
        };

        /**********************************************************************
                08. 저장 함수 선언
        ***********************************************************************/
        /**
         * 기능 : 저장 전 실행
         */
        this.fn_PreSave = function()
        {
            if(!this.gfn_isUpdate(this.dsMaster))
            {
                this.gfn_alert("변경된 이력이 없습니다.","저장정보","","question");
                return false;
            }

            // 필수 입력사항 체크 =>grid 필수항목체크할거냐:true,일반 컴포넌트에 필수항목을 할거냐false)
            var chkFocusFlg = false;
            var result      = this.gfn_cmmnChkEssentialItem(this.dsMaster, this.lvchkColidDs, this.lvchkColNameDs, "", chkFocusFlg, this);

            if (result[0] != "success")
            {
                this.gfn_alert(result[0],"저장정보","","question");
                this.dsMaster.set_rowposition(result[1]); //데이터셋 변경
                return false;
        	}

        	var result = this.gfn_confirm( "저장 하시겠습니까?", "저장","", "question" );
        	if(result == 0)
        	{
        		return false;
        	}
        	return true;

        };

        /**
         * 기능 : 저장 실행
         */
        this.fn_Save = function()
        {
            if(!this.fn_PreSave())
            {
                return false;
            }
            var strSvc      = "Save";
            var strUrl      = "/prj/AM/AM01/Save_3010101_P05.do";
            var strInDs     = "ds_input=ds_input:a ";
                strInDs    += "dsMaster=dsMaster:u";
            var strOutDs    = "dsMaster=dsMaster";
            var strArg      = "";
            var GBV_MENUID    = objApp.gv_cutPrgId;
            if(! this.gfn_isNull(this.gfn_trim(GBV_MENUID)))
            {
            	strArg += "GBV_MENUID=" + GBV_MENUID + " " + strArg;
            }
            var strCallBack = "fn_callBack";    //공백일시 기본 fn_callBack
            var strASync    = true;             //샏략이나 공백일시에는 ASync=true,싱크시는 false로
            this.gfn_Transaction(strSvc
                               , strUrl
                               , strInDs
                               , strOutDs
                               , strArg
                               , strCallBack
                               , strASync);
        };
        /**
         *      기능 : 저장시 후처리
         */
        this.fn_PostSave = function()
        {
            this.gfn_getRowCount(this.staRowCnt,this.dsMaster);
        };

        /**********************************************************************
                14. 기타 Control Event
        ***********************************************************************/
        /**
         *      그리드멀티 소트정열
         */
        this.grdMaster_onheaddblclick = function(obj,e)
        {
            this.gfn_gridSort(obj,e);
        };

        /**
          * 닫을시 사용자가 변경유무를 체크(공통처리)
         **/
        this.fn_beforeclose = function()
        {
            return this.gfn_isUpdate(this.dsMaster);
        };

        // 팝업 종료
        this.btnClose_onclick = function(obj,e)
        {
        	this.close("CLOSE");
        };

        // 취소버튼 클릭시
        this.fn_Cancel = function(obj,e)
        {
        	this.dsMaster.reset();
        	this.dsMaster.applyChange();
        };

        this.fn_SetFiterBalryeongGbcd = function(balryeongGbcd)
        {
        	if (balryeongGbcd == '10') {
        		this.dsBalryeong.set_filterstr("REF_2 == null || CODE == '0700'");
        	} else {
        		this.dsBalryeong.set_filterstr("REF_2 == null || REF_2 == '"+balryeongGbcd+"'");
        	}
        }

        this.dsMaster_onrowposchanged = function(obj,e)
        {
        	this.fn_SetFiterBalryeongGbcd(obj.getColumn(e.newrow, 'JAEJIK_GBCD'));
        };

        this.rdoJaejik_onitemchanged = function(obj,e)
        {
        	this.fn_SetFiterBalryeongGbcd(e.postvalue);
        	this.cboBalryeong.set_index(0);
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onclose",this.form_onclose,this);
            this.addEventHandler("onload",this.form_onload,this);
            this.btnClose.addEventHandler("onclick",this.btnClose_onclick,this);
            this.divSearch.form.edtSearchSabeon.addEventHandler("onkeydown",this.divSearch_edtSearchDancheCd_onkeydown,this);
            this.divSearch.form.edtSearchSawonNm.addEventHandler("onkeydown",this.divSearch_edtSearchDancheCd_onkeydown,this);
            this.divSearch.form.edtSearchJikjong.addEventHandler("onkeydown",this.divSearch_edtSearchDancheCd_onkeydown,this);
            this.divSearch.form.edtSearchSosok.addEventHandler("onkeydown",this.divSearch_edtSearchDancheCd_onkeydown,this);
            this.btnSave.addEventHandler("onclick",this.fn_Save,this);
            this.btnCancel.addEventHandler("onclick",this.fn_Cancel,this);
            this.btnDel.addEventHandler("onclick",this.fn_Del,this);
            this.btnNew.addEventHandler("onclick",this.fn_New,this);
            this.cboBalryeong.addEventHandler("onitemchanged",this.cboBojik_onitemchanged,this);
            this.rdoJaejik.addEventHandler("onitemchanged",this.rdoJaejik_onitemchanged,this);
            this.dsMaster.addEventHandler("onrowposchanged",this.dsMaster_onrowposchanged,this);
        };
        this.loadIncludeScript("AM01_3010102_P05.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
